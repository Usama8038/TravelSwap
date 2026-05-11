const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500,
    default: ''
  }
}, {
  timestamps: true
});

reviewSchema.index({ reviewee: 1 });
reviewSchema.index({ order: 1 }, { unique: true });

// Update user rating after saving a review
reviewSchema.post('save', async function() {
  const Review = this.constructor;
  const stats = await Review.aggregate([
    { $match: { reviewee: this.reviewee } },
    { $group: { _id: '$reviewee', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);

  if (stats.length > 0) {
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(this.reviewee, {
      'ratings.average': Math.round(stats[0].avgRating * 10) / 10,
      'ratings.count': stats[0].count
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
