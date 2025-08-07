const Complaint = require('../models/complaint.model');
const path = require('path');

// Submit a new complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { category, message } = req.body;
    
    if (!category || !message) {
      return res.status(400).send('Please provide category and message');
    }
    
    await Complaint.create({
      category,
      message
    });
    
    res.redirect('/'); // Redirect back to home page after submission
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).send('Server error');
  }
};

// Get complaints submission form
exports.getComplaintForm = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/complaint.html'));
};
