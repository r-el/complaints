const express = require("express");
const path = require("path");
require("dotenv").config();
const connectDB = require("./db/connect");

// Import routes
const indexRoutes = require("./routes/index");
const complaintsRoutes = require("./routes/complaints");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRoutes);
app.use("/", complaintsRoutes);
app.use("/", adminRoutes);

// Server startup function
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Start server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  startServer();
}

module.exports = app;
