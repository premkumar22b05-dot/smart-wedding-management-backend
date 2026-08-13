const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: function () {
        return ["Bride", "Groom"].includes(this.role);
      },
    },

    role: {
      type: String,
      enum: [
        "Admin",
        "Bride",
        "Groom",
        "Planner",
        "Vendor",
        "Guest",
        "User",
      ],
      default: "User",
    },

    // Vendor Service Type
    vendorType: {
      type: String,
      enum: [
        "Venue",
        "Catering",
        "Photography",
        "Videography",
        "Decoration",
        "Makeup",
        "Mehendi",
        "Music",
        "DJ",
        "Wedding Planner",
        "Invitation",
        "Florist",
        "Transportation",
        "Entertainment",
        "Other",
      ],
      required: function () {
        return this.role === "Vendor";
      },
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);