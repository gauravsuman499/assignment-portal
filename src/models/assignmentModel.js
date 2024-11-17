const mongoose = require('mongoose');


//schema for assignment
const assignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
