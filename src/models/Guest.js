const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: [true, "Wedding is required"],
      index: true,
    },

    guestName: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
      maxlength: [100, "Guest name cannot exceed 100 characters"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    relation: {
      type: String,
      required: [true, "Relation is required"],
      enum: [
        "Groom Family",
        "Bride Family",
        "Friend",
        "Colleague",
        "Relative",
        "Other",
      ],
    },

    guestType: {
      type: String,
      required: true,
      enum: ["VIP", "Family", "Friend", "General"],
      default: "General",
    },

    invitationStatus: {
      type: String,
      enum: ["Not Sent", "Sent", "Accepted", "Declined"],
      default: "Not Sent",
    },

    attendanceStatus: {
      type: String,
      enum: ["Pending", "Attending", "Not Attending"],
      default: "Pending",
    },

    foodPreference: {
      type: String,
      enum: ["Vegetarian", "Non Vegetarian", "Vegan", "Other"],
      default: "Vegetarian",
    },

    numberOfGuests: {
      type: Number,
      default: 1,
      min: [1, "Number of guests must be at least 1"],
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created By is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Frequently used queries
guestSchema.index({ createdBy: 1, createdAt: -1 });
guestSchema.index({ wedding: 1, guestName: 1 });
guestSchema.index({ attendanceStatus: 1 });
guestSchema.index({ invitationStatus: 1 });

module.exports = mongoose.model("Guest", guestSchema);