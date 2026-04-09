// In a real application, you would use Mongoose for MongoDB.
// Example: const mongoose = require("mongoose");
// For now, we are using an array-based model that mimics traditional DB operations.

const inquiriesDB = [];

class Inquiry {
  static create({ name, email, phone, message }) {
    const newInquiry = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      message,
      date: new Date().toISOString()
    };
    inquiriesDB.push(newInquiry);
    return newInquiry;
  }

  static findAll() {
    return inquiriesDB.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  static deleteById(id) {
    const index = inquiriesDB.findIndex(inquiry => inquiry.id === id);
    if (index !== -1) {
      return inquiriesDB.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = Inquiry;