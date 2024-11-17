const express = require('express');
const { registerAdmin, loginAdmin, getAssignments, updateAssignmentStatus } = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

//api endpoints for various functionalities related to the admin.
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/assignments', isAuthenticated, isAdmin, getAssignments);
router.post('/assignments/:id', isAuthenticated, isAdmin, updateAssignmentStatus);

module.exports = router;
