const mongoose = require("mongoose");
const { Schema } = mongoose;

const batchReportingSchema = new Schema(
  {
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    dateOfReporting: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

batchReportingSchema.index({ batchId: 1 });

module.exports = mongoose.model("BatchReporting", batchReportingSchema);