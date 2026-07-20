const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    verificationType: {
        type: String,
        enum: ['mobileNumber', 'email'],
        required: true
    },
    verificationValue: {
        type: String,
        required: true
    },
    referenceId: {
        type: String,
        unique: true,
        required: true
    },
    otpHash: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true
    });


const OTP = mongoose.model('Otp', otpSchema);

module.exports = OTP;