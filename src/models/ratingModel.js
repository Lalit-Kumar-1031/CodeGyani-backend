const mongoose = require("mongoose");
const { Schema } = mongoose;

const ratingSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course", // without this you can't tell which course a rating belongs to
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// One rating per user per course
ratingSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("Rating", ratingSchema);