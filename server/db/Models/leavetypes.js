const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema({
    leaveType: { type: String, required: true },
});

const leaveTypes =
  mongoose.models['leaveType'] || mongoose.model('leaveType', leaveTypeSchema);

module.exports = leaveTypes;