const express = require("express");
const verifyAdmin = require("../middleware/authMiddleware");
const { adminSignup, adminLogin, getDashboardStats, getInquiries, deleteInquiry } = require("../controllers/adminController");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.get("/dashboard-stats", verifyAdmin, getDashboardStats);
router.get("/inquiries", verifyAdmin, getInquiries);
router.delete("/inquiries/:id", verifyAdmin, deleteInquiry);

module.exports = router;