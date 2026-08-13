const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        wedding: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wedding",
            required: true,
        },

        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        title: {
            type: String,
            trim: true,
            maxlength: 150,
            default: "",
        },

        comment: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: "",
        },

        status: {
            type: String,
            enum: ["Pending", "Published", "Rejected"],
            default: "Published",
        },
    },
    {
        timestamps: true,
    },
);

/*
 * One user can review a vendor only once
 * for the same wedding.
 */
reviewSchema.index(
    {
        user: 1,
        wedding: 1,
        vendor: 1,
    },
    {
        unique: true,
    },
);

module.exports = mongoose.model("Review", reviewSchema);