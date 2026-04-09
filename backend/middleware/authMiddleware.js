const jwt = require("jsonwebtoken");

// In production, use environment variables (process.env.JWT_SECRET)
const JWT_SECRET = "NLV_SUPER_SECRET_KEY";

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided or invalid format." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized token!" });
    req.user = decoded; // { email, role }
    next();
  });
};

module.exports = verifyAdmin;