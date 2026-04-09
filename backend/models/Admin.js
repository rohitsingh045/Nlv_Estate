const adminsDB = [
  {
    id: "1",
    email: "adminNLV123@nlv.com",
    password: "admin@#1234",
    date: new Date().toISOString()
  }
];

class Admin {
  static create(adminData) {
    const newAdmin = {
      id: Date.now().toString(),
      ...adminData,
      date: new Date().toISOString()
    };
    adminsDB.push(newAdmin);
    return newAdmin;
  }

  static findByEmail(email) {
    return adminsDB.find(admin => admin.email === email);
  }
}

module.exports = Admin;