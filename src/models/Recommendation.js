const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Venue",
        "Vendor",
        "Booking",
        "Budget",
        "Guest",
        "Checklist",
        "Invitation",
        "Media",
        "Payment",
        "General",
      ],
      default: "General",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    source: {
      type: String,
      enum: ["AI", "System", "Manual"],
      default: "System",
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    isDismissed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

recommendationSchema.index({
  user: 1,
  wedding: 1,
  createdAt: -1,
});

module.exports = mongoose.model(
  "Recommendation",
  recommendationSchema,
);