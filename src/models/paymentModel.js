const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        registrationId: {
            type: Schema.Types.ObjectId,
            ref: "Registration", // links payment to the specific registration it settles
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            default: "INR",
            uppercase: true,
        },
        paymentGateway: {
            type: String,
            enum: ["razorpay", "stripe", "payu", "cashfree", "other"],
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ["upi", "card", "netbanking", "wallet", "emi", "other"],
            required: true,
        },
        paymentDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed", "refunded"],
            default: "pending",
        },
        inVoiceUrl: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

paymentSchema.index({ userId: 1 });
paymentSchema.index({ registrationId: 1 });

module.exports = mongoose.model("Payment", paymentSchema);