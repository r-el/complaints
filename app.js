const express = require("express");
const path = require("path");
require("dotenv").config();
const connectDB = require('./db/connect');
const complaintsRoutes = require('./routes/complaints');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000; // Default port
const HOST = process.env.HOST || "localhost"; // Default host

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger (placed early)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, "public")));

// Root route serves the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Feature routes
app.use('/', complaintsRoutes);
app.use('/', adminRoutes);

// Helper function to start server (not auto-invoked in tests)
async function startServer() {
  await connectDB();
  return app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

// Only start if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer().catch(err => {
    console.error('Failed to start server:', err);
  });
}

module.exports = { app, startServer }; // Export both for flexibility in tests
