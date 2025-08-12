const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Home page route
router.get('/', indexController.getHomePage);

module.exports = router;
