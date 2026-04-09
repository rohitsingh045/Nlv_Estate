const Inquiry = require("../models/Inquiry");

const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, Email, and Phone are required." });
    }

    const newInquiry = await Inquiry.create({ name, email, phone, message });
    res.status(201).json({ message: "Inquiry saved successfully", inquiry: newInquiry });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    res.status(500).json({ error: "Failed to submit inquiry" });
  }
};

module.exports = { submitInquiry };