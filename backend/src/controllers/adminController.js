const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Order = require('../models/Order');
const Dispute = require('../models/Dispute');
const Transaction = require('../models/Transaction');

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalTickets, activeListings, soldTickets, pendingTickets, totalOrders, openDisputes] = await Promise.all([
      User.countDocuments(), Ticket.countDocuments(), Ticket.countDocuments({ status: 'approved' }),
      Ticket.countDocuments({ status: 'sold' }), Ticket.countDocuments({ status: 'pending' }),
      Order.countDocuments(), Dispute.countDocuments({ status: { $in: ['open', 'investigating'] } })
    ]);
    const rev = await Order.aggregate([
      { $match: { paymentStatus: { $in: ['held', 'released'] } } },
      { $group: { _id: null, totalRevenue: { $sum: '$platformFee' }, totalVolume: { $sum: '$amount' } } }
    ]);
    const r = rev[0] || { totalRevenue: 0, totalVolume: 0 };
    const d7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [recentOrders, recentUsers] = await Promise.all([
      Order.countDocuments({ createdAt: { $gte: d7 } }), User.countDocuments({ createdAt: { $gte: d7 } })
    ]);
    res.json({ success: true, stats: { totalUsers, totalTickets, activeListings, soldTickets, pendingTickets, totalOrders, openDisputes, totalRevenue: r.totalRevenue, totalVolume: r.totalVolume, recentOrders, recentUsers } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = {};
    if (search) query.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];
    const total = await User.countDocuments(query);
    const users = await User.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, total, pages: Math.ceil(total / limit), users });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getAllTickets = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    const total = await Ticket.countDocuments(query);
    const tickets = await Ticket.find(query).populate('seller', 'name email avatar').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, total, pages: Math.ceil(total / limit), tickets });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.approveTicket = async (req, res) => {
  try {
    const { status, verificationNotes } = req.body;
    if (!['approved', 'rejected'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status, verificationNotes, verifiedBy: req.user.id, verifiedAt: new Date() }, { new: true });
    if (!ticket) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, ticket });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getDisputes = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) query.status = status;
    const disputes = await Dispute.find(query).populate('raisedBy', 'name email').populate('against', 'name email').populate('order').sort({ createdAt: -1 });
    res.json({ success: true, count: disputes.length, disputes });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.resolveDispute = async (req, res) => {
  try {
    const { status, resolution, adminNotes } = req.body;
    const dispute = await Dispute.findByIdAndUpdate(req.params.id, { status, resolution, adminNotes, resolvedBy: req.user.id, resolvedAt: new Date() }, { new: true });
    if (!dispute) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, dispute });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getRevenue = async (req, res) => {
  try {
    const d30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const dailyRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: d30 }, paymentStatus: { $in: ['held', 'released'] } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, revenue: { $sum: '$platformFee' }, volume: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    const typeBreakdown = await Ticket.aggregate([
      { $match: { status: 'sold' } },
      { $group: { _id: '$type', count: { $sum: 1 }, volume: { $sum: '$sellingPrice' } } }
    ]);
    res.json({ success: true, dailyRevenue, typeBreakdown });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
