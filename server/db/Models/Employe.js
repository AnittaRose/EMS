
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const employeeSchema = new mongoose.Schema({
//     employeeName: { type: String },
//     email: { type: String },
//     department: { type: String },
//     role: { type: String },
//     salary: { type: Number }, // Base salary
//     additions: { type: Number, default: 0 }, // Additional salary
//     deductions: { type: Number, default: 0 }, // Deductions
//     totalSalary: { type: Number, default: 0 }, // Calculated total salary
//     joinDate: { type: String },
//     password: { type: String },
//     password_token: String,
//     user_type: {
//         type: Schema.Types.ObjectId,
//         ref: 'user_type'
//     },
//     count: { type: Number, default: 0 },
// });

// employeeSchema.methods.addAddition = function (amount) {
//     this.additions += amount;
//     this.totalSalary = this.salary + this.additions - this.deductions;
// };
// employeeSchema.methods.addDeduction = function(amount) {
//     this.deductions = (this.deductions || 0) + amount; // Safely update deductions
// };
// employeeSchema.methods.calculateTotalSalary = function() {
//     return this.salary + this.additions - this.deductions;
// };


// module.exports = mongoose.model("Employee", employeeSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    employeeName: { type: String },
    email: { type: String },
    department: { type: String },
    role: { type: String },
    salary: { type: Number }, // Base salary (permanent)
    additions: { type: Number, default: 0 }, // Additions per month
    deductions: { type: Number, default: 0 }, // Deductions per month
    totalSalary: { type: Number, default: 0 }, // Total salary including base, additions, deductions
    joinDate: { type: String },
    password: { type: String },
    user_type: {
        type: Schema.Types.ObjectId,
        ref: 'user_type'
    },
    count: { type: Number, default: 0 },
    salaryHistory: [{ // Monthly salary history
        month: { type: String },
        year: { type: String },
        salaryPaid: { type: Number },
        status: { type: String, default: 'Paid' } // Payment status
    }],
});

module.exports = mongoose.model("Employee", employeeSchema);
