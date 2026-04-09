const jwt = require("jsonwebtoken");
const Inquiry = require("../models/Inquiry");
const Admin = require("../models/Admin");

// In production, use env variables
const JWT_SECRET = "NLV_SUPER_SECRET_KEY";

const adminSignup = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existingAdmin = Admin.findByEmail(email);
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const newAdmin = Admin.create({ email, password });
  const token = jwt.sign({ email: newAdmin.email, role: "admin" }, JWT_SECRET, { expiresIn: "1d" });

  res.status(201).json({ token, message: "Admin created successfully!" });
};

const adminLogin = (req, res) => {
  const { email, password } = req.body;

  const admin = Admin.findByEmail(email);

  if (admin && admin.password === password) {
    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    return res.json({ token, message: "Login successful!" });
  }

  return res.status(401).json({ message: "Invalid email or password" });
};

const getDashboardStats = (req, res) => {
  const inquiriesList = Inquiry.findAll();
  res.json({
    totalUsers: 150, // This could come from a Users model
    totalProperties: 24, // This could come from a Properties model
    recentInquiries: inquiriesList.length
  });
};

const getInquiries = (req, res) => {
  const inquiriesList = Inquiry.findAll();
  res.json(inquiriesList);
};

const deleteInquiry = (req, res) => {
  const { id } = req.params;
  const deleted = Inquiry.deleteById(id);
  
  if (deleted) {
    res.json({ message: "Inquiry deleted successfully", deletedId: id });
  } else {
    res.status(404).json({ message: "Inquiry not found" });
  }
};

module.exports = { adminSignup, adminLogin, getDashboardStats, getInquiries, deleteInquiry };