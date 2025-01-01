const mongoose = require('mongoose');
// import { create } from "./Employe";

const departmentSchema = {
    departmentName: String, // Required
    shortName: String,      // Optional or Required based on rules
    description: String,    // Optional
  };
const Department = mongoose.model("Department",departmentSchema);

module.exports = Department;