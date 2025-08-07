// Middleware to verify admin password
exports.verifyAdminPassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send('Invalid password. Access denied.');
  }
  
  // If password is correct, proceed to next middleware/route
  next();
};

// Middleware to check if user is authenticated admin (for API calls)
exports.requireAdminAuth = (req, res, next) => {
  // For now, we'll use a simple session-based approach
  // In production, you'd use JWT tokens or proper session management
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
  
  if (!adminKey || adminKey !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Admin authentication required' });
  }
  
  next();
};
