const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  against: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reason: {
    type: String,
    enum: ['invalid_ticket', 'wrong_details', 'no_transfer', 'fraud', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  evidence: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['open', 'investigating', 'resolved', 'closed'],
    default: 'open'
  },
  resolution: {
    type: String,
    default: ''
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

disputeSchema.index({ status: 1 });
disputeSchema.index({ order: 1 });

module.exports = mongoose.model('Dispute', disputeSchema);
