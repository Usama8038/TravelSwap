const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  platformFee: {
    type: Number,
    default: 0
  },
  sellerEarnings: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'held', 'released', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    default: ''
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'wallet', 'upi'],
    default: 'card'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'disputed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  transferredAt: {
    type: Date,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

orderSchema.index({ buyer: 1 });
orderSchema.index({ seller: 1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model('Order', orderSchema);
