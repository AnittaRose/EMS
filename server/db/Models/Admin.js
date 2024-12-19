const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    user_type: {
        type: Schema.Types.ObjectId, // Reference to another schema
        ref: 'user_type' // Refers to the 'UserType' model
    }
});

// Prevent overwriting the model
const Access = mongoose.models['EMSCONTROLLER'] || mongoose.model('EMSCONTROLLER', accessSchema);

module.exports = Access;
