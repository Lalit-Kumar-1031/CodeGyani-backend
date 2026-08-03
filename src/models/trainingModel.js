const mongoose = require("mongoose");
const { Schema } = mongoose;

const trainingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    customId: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String, // e.g. "6 months" — keep as string unless you want strict week/day counts
      required: true,
    },
    fee: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    onBoaredBy: {
      type: String,
      required: true
    },
    onBoaredByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

module.exports = mongoose.model("Training", trainingSchema);