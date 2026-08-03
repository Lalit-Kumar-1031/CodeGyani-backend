const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    customId: {
      type: String, // human-readable course code, e.g. "DS-101"
      required: true,
      unique: true,
      trim: true,
    },
    trainingId: {
      type: Schema.Types.ObjectId,
      ref: "Training",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String, // consider a CourseCategory ref later if categories grow/change often
      required: true,
      trim: true,
    },
    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },
    curriculum: {
      type: [String], // or Schema.Types.Mixed / a separate CourseModule collection if each module needs its own fields
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

courseSchema.index({ trainingId: 1 });

module.exports = mongoose.model("Course", courseSchema);