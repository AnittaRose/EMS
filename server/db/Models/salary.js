// const mongoose = require('mongoose');

// const salarySchema = new mongoose.Schema({
//   employeeId: { type: String, required: true },
//   amount: { type: Number, required: true },
//   month: { type: String, required: true },
//   year: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ['Salary Credit', 'Salary not credited', 'Pending'],  // Add more statuses as needed
//     required: true,
//   },
// });

// const Salary = mongoose.model('Salary', salarySchema);

// module.exports = Salary;
const mongoose = require('mongoose');

// SalaryPayment Schema
const salaryPaymentSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee', // Reference to the Employee model
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    salaryPaid: {
      type: Number,
      required: true,
    },
    details: {
      baseSalary: {
        type: Number,
        required: true,
      },
      additions: {
        type: Number,
        required: true,
      },
      deductions: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('SalaryPayment', salaryPaymentSchema);
