const express = require('express');
const router = express.Router();
const complaintsController = require('../controllers/complaintsController');

// Public routes
router.get('/complaint', complaintsController.getComplaintForm);
router.post('/submit', complaintsController.submitComplaint);

module.exports = router;
