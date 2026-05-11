const Order = require('../models/Order');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const PLATFORM_FEE_PERCENT = 5;

// @desc    Create order (buy ticket) with Escrow Protection
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { ticketId, paymentMethod = 'card' } = req.body;
    const EscrowService = require('../services/EscrowService');

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });
    if (ticket.status !== 'approved') return res.status(400).json({ success: false, message: 'Ticket is not available' });
    if (ticket.seller.toString() === req.user.id) return res.status(400).json({ success: false, message: 'Cannot buy your own ticket' });

    const platformFee = Math.round(ticket.sellingPrice * PLATFORM_FEE_PERCENT / 100);
    const sellerEarnings = ticket.sellingPrice - platformFee;

    // 1. Lock Funds in Escrow
    const escrowResult = await EscrowService.lockFunds(req.user.id, ticketId, ticket.sellingPrice);

    // 2. Create Order Record
    const order = await Order.create({
      buyer: req.user.id,
      seller: ticket.seller,
      ticket: ticketId,
      amount: ticket.sellingPrice,
      platformFee,
      sellerEarnings,
      paymentMethod,
      paymentStatus: 'held', // Funds are held in Escrow
      status: 'confirmed'
    });

    // Update user stats
    await User.findByIdAndUpdate(req.user.id, { $inc: { totalPurchases: 1 } });
    await User.findByIdAndUpdate(ticket.seller, { $inc: { totalSales: 1 } });

    // 3. Trigger Asynchronous Operator Verification & Escrow Release
    // In a real system, this would be a webhook or background worker.
    setTimeout(async () => {
      try {
        const releaseResult = await EscrowService.verifyAndRelease(escrowResult.transactionId);
        if (releaseResult.success) {
          order.paymentStatus = 'released';
          order.completedAt = new Date();
          await order.save();
        } else {
          order.status = 'cancelled';
          order.paymentStatus = 'refunded';
          await order.save();
        }
      } catch (err) {
        console.error('Escrow Release Error:', err.message);
      }
    }, 2000); // Simulate 2 second delay for Operator API

    res.status(201).json({ 
      success: true, 
      order, 
      escrowId: escrowResult.transactionId,
      message: 'Funds secured in Escrow. Awaiting Operator API Verification.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get buyer's purchases
// @route   GET /api/orders/my-purchases
exports.getMyPurchases = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate('ticket')
      .populate('seller', 'name avatar ratings')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get seller's sales
// @route   GET /api/orders/my-sales
exports.getMySales = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user.id })
      .populate('ticket')
      .populate('buyer', 'name avatar')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Confirm order completion
// @route   POST /api/orders/:id/confirm
exports.confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.buyer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    order.status = 'completed';
    order.paymentStatus = 'released';
    order.completedAt = new Date();
    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
