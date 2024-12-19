const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String, },
    department: { type: String },
    role: { type: String },
    salary: { type: Number },
    joinDate: { type: Number },
    password:{type:String },
    user_type: {
        type: Schema.Types.ObjectId, // Reference to another schema
        ref: 'user_type' // Refers to the 'UserType' model
    },
    count: { type: Number, default: 0 }
});

module.exports =mongoose.model("Employee",employeeSchema);
