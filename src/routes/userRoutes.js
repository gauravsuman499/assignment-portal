const express = require("express");
const {
  registerUser,
  loginUser,
    uploadAssignment,
    getAllAdmins,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

//various api endpoints related to the user.
router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/upload", isAuthenticated, uploadAssignment);
router.get("/admins", isAuthenticated, getAllAdmins);

module.exports = router;
