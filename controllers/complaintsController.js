const Complaint = require('../models/complaint.model');
const path = require('path');

// Get complaint form page
exports.getComplaintForm = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/complaint.html'));
};

// Submit a new complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { category, message } = req.body;
    
    // Validate input
    if (!category || !message) {
      return res.status(400).send('Please provide category and message');
    }
    
    // Create new complaint
    await Complaint.create({
      category,
      message
    });
    
    console.log('New complaint submitted:', { category, message });
    res.redirect('/'); // Redirect back to home page after submission
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).send('Server error');
  }
};
