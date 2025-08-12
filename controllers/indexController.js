const path = require('path');

// Get home page
exports.getHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
};
