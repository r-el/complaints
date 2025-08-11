const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAdminAuth, verifyAdminPassword } = require('../middleware/auth');

// Admin dashboard route  
router.get('/admin/dashboard', adminController.getAdminDashboard);

// Admin login verification (from home page form)
router.post('/admin/login', verifyAdminPassword, (req, res) => {
  // If password verification passes, redirect to dashboard
  res.redirect('/admin/dashboard');
});

// Protected API routes for admin (require authentication)
router.get('/api/complaints', requireAdminAuth, adminController.getAllComplaints);
router.delete('/api/complaints/:id', requireAdminAuth, adminController.deleteComplaint);

module.exports = router;
