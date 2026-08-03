const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "active", "completed", "cancelled", "dropped"],
      default: "pending",
    },
    collegeRollNo: {
      type: String,
      trim: true,
    },
    collegeName: {
      type: String,
      trim: true,
    },
    gst: {
      type: String, // GSTIN if registration is under a company/business for invoicing
      trim: true,
    },
    dateOfRegisteration: {
      type: Date,
      default: Date.now,
    },
    qualificationCourse: {
      type: String, // e.g. "B.Tech CSE", "MCA"
      trim: true,
    },
    educationYear: {
      type: String, // e.g. "2024" or "3rd Year" — string keeps it flexible
      trim: true,
    },
    registerationFee: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

// Prevent the same user registering twice for the same batch
registrationSchema.index({ userId: 1, batchId: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);