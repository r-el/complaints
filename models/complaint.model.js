const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['food', 'equipment', 'orders', 'other']
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
