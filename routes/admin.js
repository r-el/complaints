const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin page route
router.get('/admin', adminController.getAdminPage);

// Admin login route (from home page form)
router.post('/admin/login', adminController.verifyAndRedirect);

// Admin API to get complaints (with password verification)
router.post('/api/admin/complaints', adminController.getComplaints);

module.exports = router;
