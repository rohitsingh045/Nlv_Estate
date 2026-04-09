const jwt = require("jsonwebtoken");
const Inquiry = require("../models/Inquiry");
const Admin = require("../models/Admin");

// In production, use env variables
const JWT_SECRET = process.env.JWT_SECRET || "NLV_SUPER_SECRET_KEY";

const adminSignup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = await Admin.create({ email, password });
    const token = jwt.sign({ email: newAdmin.email, role: "admin" }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token, message: "Admin created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && admin.password === password) {
      const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
      return res.json({ token, message: "Login successful!" });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const inquiriesCount = await Inquiry.countDocuments();
    res.json({
      totalUsers: 150, // This could come from a Users model
      totalProperties: 24, // This could come from a Properties model
      recentInquiries: inquiriesCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getInquiries = async (req, res) => {
  try {
    const inquiriesList = await Inquiry.find().sort({ date: -1 });
    res.json(inquiriesList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteInquiry = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Inquiry.findByIdAndDelete(id);
    
    if (deleted) {
      res.json({ message: "Inquiry deleted successfully", deletedId: id });
    } else {
      res.status(404).json({ message: "Inquiry not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { adminSignup, adminLogin, getDashboardStats, getInquiries, deleteInquiry };