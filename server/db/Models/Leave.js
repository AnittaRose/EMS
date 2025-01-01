const mongoose = require('mongoose');

// Leave Schema for the leave requests
const LeaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to Employee model
    required: true,
  },
  leaveType: {
    type: String,
    enum: ['Sick Leave', 'Personal Leave', 'Maternity Leave', 'Emergency Leave', 'Casual Leave'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
  },
  Days:{
    type: String,
  },
  status: {
    type: String,
    enum: ['applied', 'approved', 'pending', 'rejected'], // Consistent values
    default: 'applied',
  },
});

module.exports = mongoose.model('Leave', LeaveSchema);
