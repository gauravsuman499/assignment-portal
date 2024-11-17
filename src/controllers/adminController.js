const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');

// Admin Registration
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({ name, email, password: hashedPassword, role: 'Admin' });
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, role: 'Admin' });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View Assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ adminId: req.user.id }).populate('userId', 'name');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept or Reject Assignment
exports.updateAssignmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const assignment = await Assignment.findByIdAndUpdate(id, { status }, { new: true });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    res.status(200).json({ message: 'Assignment updated', assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
