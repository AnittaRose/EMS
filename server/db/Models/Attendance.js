// const mongoose = require("mongoose");

// const attendanceSchema = new mongoose.Schema({
//   employeeId: { type: String, required: true },
//   date: { type: String, required: true }, // YYYY-MM-DD format
//   status: { type: String, enum: ["Present", "Absent"], required: true },
// });

// module.exports = mongoose.model("Attendance", attendanceSchema);


const mongoose = require('mongoose');

// Attendance Schema to track daily attendance of employees
const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employe',  // Referencing the Employee model
    required: true,
  },
  date: {
    type: String,  // Date in YYYY-MM-DD format
    required: true,
  },
  status: {
    type: String,
    default: 'present',  // Track attendance status (can be present or absent)
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
