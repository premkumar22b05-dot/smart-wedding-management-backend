const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema(
    {
        groomName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        brideName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        weddingDate: {
            type: Date,
            required: true,
        },

        venue: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 200,
        },

        weddingType: {
            type: String,
            enum: [
                "Hindu",
                "Christian",
                "Muslim",
                "Reception",
                "Engagement",
                "Other",
            ],
            default: "Hindu",
        },

        budget: {
            type: Number,
            default: 0,
            min: 0,
        },

        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: 2000,
        },

        status: {
            type: String,
            enum: [
                "Planning",
                "Confirmed",
                "Completed",
                "Cancelled",
            ],
            default: "Planning",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    },
);

/**
 * Efficiently retrieve weddings
 * belonging to a specific user.
 */
weddingSchema.index({
    createdBy: 1,
    createdAt: -1,
});

module.exports = mongoose.model(
    "Wedding",
    weddingSchema,
);
