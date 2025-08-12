const Complaint = require('../models/complaint.model');
const path = require('path');

// Get admin page
exports.getAdminPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
};

// Verify password and redirect to admin page
exports.verifyAndRedirect = (req, res) => {
  const { password } = req.body;
  
  // Verify admin password
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send('Invalid password. Access denied.');
  }
  
  // If password is correct, redirect to admin page
  res.redirect('/admin');
};

// Get all complaints (requires password verification)
exports.getComplaints = async (req, res) => {
  try {
    const { password } = req.body;
    
    // Verify admin password
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ error: 'Invalid password' });
    }
    
    // Get all complaints sorted by date
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    
    console.log(`Admin accessed complaints list. Found ${complaints.length} complaints`);
    res.json({ complaints });
  } catch (error) {
    console.error('Error retrieving complaints:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
