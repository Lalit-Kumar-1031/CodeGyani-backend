const mongoose = require("mongoose");
const { Schema } = mongoose;

const batchSchema = new Schema(
    {
        trainingId: {
            type: Schema.Types.ObjectId,
            ref: "Training",
            required: true,
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed", "cancelled"],
            default: "upcoming",
        },
        maxSeats: {
            type: Number,
            required: true,
            min: 1,
        },
        seatsFilled: {
            type: Number,
            default: 0,
            min: 0,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        durationOfWeeks: {
            type: Number,
            required: true,
            min: 1,
        },
        batchTimings: {
            type: String, // e.g. "Mon-Fri, 7-9 PM"
            required: true,
        },
    },
    { timestamps: true }
);

batchSchema.index({ courseId: 1, trainingId: 1 });

module.exports = mongoose.model("Batch", batchSchema);