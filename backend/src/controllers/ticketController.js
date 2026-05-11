const Ticket = require('../models/Ticket');

// @desc    Get all approved tickets (with search/filter)
// @route   GET /api/tickets
exports.getTickets = async (req, res) => {
  try {
    const { source, destination, type, date, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;

    const query = { status: 'approved', travelDate: { $gte: new Date() } };

    if (source) query.source = new RegExp(source, 'i');
    if (destination) query.destination = new RegExp(destination, 'i');
    if (type) query.type = type;
    if (date) {
      const searchDate = new Date(date);
      query.travelDate = {
        $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
        $lte: new Date(searchDate.setHours(23, 59, 59, 999))
      };
    }
    if (minPrice || maxPrice) {
      query.sellingPrice = {};
      if (minPrice) query.sellingPrice.$gte = Number(minPrice);
      if (maxPrice) query.sellingPrice.$lte = Number(maxPrice);
    }

    let sortObj = { createdAt: -1 };
    if (sort === 'price_asc') sortObj = { sellingPrice: 1 };
    if (sort === 'price_desc') sortObj = { sellingPrice: -1 };
    if (sort === 'date_asc') sortObj = { travelDate: 1 };
    if (sort === 'date_desc') sortObj = { travelDate: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Ticket.countDocuments(query);
    const tickets = await Ticket.find(query)
      .populate('seller', 'name avatar ratings')
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: tickets.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      tickets
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('seller', 'name avatar ratings totalSales createdAt');
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });

    // Increment views
    ticket.views += 1;
    await ticket.save();

    res.json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create ticket listing
// @route   POST /api/tickets
exports.createTicket = async (req, res) => {
  try {
    req.body.seller = req.user.id;
    const ticket = await Ticket.create(req.body);
    res.status(201).json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
exports.updateTicket = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });

    if (ticket.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (ticket.status === 'sold') {
      return res.status(400).json({ success: false, message: 'Cannot update a sold ticket' });
    }

    ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });

    if (ticket.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (ticket.status === 'sold') {
      return res.status(400).json({ success: false, message: 'Cannot delete a sold ticket' });
    }

    await ticket.deleteOne();
    res.json({ success: true, message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get seller's own tickets
// @route   GET /api/tickets/my-listings
exports.getMyListings = async (req, res) => {
  try {
    const tickets = await Ticket.find({ seller: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: tickets.length, tickets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
