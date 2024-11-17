const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

exports.isAuthenticated = async (req, res, next) => {
  try {
    // Extract token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    console.log(token);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Find the user
    req.user = await User.findById(decoded.id);
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized: User not found" });

    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

//check for the admin validity
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin")
    return res.status(403).json({ message: "Forbidden" });
  next();
};
