const Complaint = require("../models/complaint.model");
const path = require("path");

// Get admin dashboard page
exports.getAdminDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin.html"));
};

// API endpoint to get all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error("Error getting complaints:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// API endpoint to delete a specific complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    
    if (!deletedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ error: "Server error" });
  }
};
