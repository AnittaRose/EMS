const mongoose = require('mongoose');

const UserTypeSchema = new mongoose.Schema({
  user_type: { type: String, required: true },
});

const UserType =
  mongoose.models['user_type'] || mongoose.model('user_type', UserTypeSchema);

module.exports = UserType;
