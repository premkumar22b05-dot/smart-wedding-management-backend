const mongoose = require("mongoose");

const weddingMediaSchema = new mongoose.Schema(
    {
        wedding: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wedding",
            required: true,
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        mediaType: {
            type: String,
            enum: ["Image", "Video"],
            required: true,
        },

        url: {
            type: String,
            required: true,
            trim: true,
        },

        title: {
            type: String,
            trim: true,
            default: "",
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        category: {
            type: String,
            enum: [
                "Pre Wedding",
                "Wedding",
                "Reception",
                "Engagement",
                "Family",
                "Friends",
                "Other",
            ],
            default: "Wedding",
        },

        isFavorite: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

weddingMediaSchema.index({
    wedding: 1,
    createdAt: -1,
});

module.exports = mongoose.model(
    "WeddingMedia",
    weddingMediaSchema,
);