const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAdminAuth } = require('../middleware/auth');

// Admin dashboard route  
router.get('/admin/dashboard', adminController.getAdminDashboard);

// Protected API routes for admin (require authentication)
router.get('/api/complaints', requireAdminAuth, adminController.getAllComplaints);

module.exports = router;
