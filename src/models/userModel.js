const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    customId: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User']
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User