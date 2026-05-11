const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['bus'],
    required: true,
    default: 'bus'
  },
  source: {
    type: String,
    required: [true, 'Source city is required'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Destination city is required'],
    trim: true
  },
  travelDate: {
    type: Date,
    required: [true, 'Travel date is required']
  },
  travelTime: {
    type: String,
    required: [true, 'Travel time is required']
  },
  operator: {
    type: String,
    default: ''
  },
  seatNumber: {
    type: String,
    default: ''
  },
  pnr: {
    type: String,
    required: [true, 'PNR/Booking reference is required']
  },
  originalPrice: {
    type: Number,
    required: [true, 'Original price is required'],
    min: 0
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling price is required'],
    min: 0
  },
  aiSuggestedPrice: {
    type: Number,
    default: null
  },
  ticketImage: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: '',
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'sold', 'expired', 'rejected', 'cancelled'],
    default: 'pending'
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  fraudScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  verificationNotes: {
    type: String,
    default: ''
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  verifiedAt: {
    type: Date,
    default: null
  },
  views: {
    type: Number,
    default: 0
  },
  savedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for search
ticketSchema.index({ source: 'text', destination: 'text', operator: 'text' });
ticketSchema.index({ type: 1, status: 1, travelDate: 1 });
ticketSchema.index({ seller: 1 });

// Auto-mark as urgent if travel date is within 48 hours
ticketSchema.pre('save', function(next) {
  const hoursUntilTravel = (new Date(this.travelDate) - new Date()) / (1000 * 60 * 60);
  if (hoursUntilTravel <= 48 && hoursUntilTravel > 0) {
    this.isUrgent = true;
  }
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);
