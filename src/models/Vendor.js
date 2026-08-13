const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: [true, "Vendor name is required."],
      trim: true,
      maxlength: [150, "Vendor name cannot exceed 150 characters."],
    },

    category: {
      type: String,
      required: [true, "Vendor category is required."],
      enum: [
        "Venue",
        "Photography",
        "Videography",
        "Catering",
        "Decoration",
        "Florist",
        "Makeup & Beauty",
        "Bridal Wear",
        "Groom Wear",
        "Jewellery",
        "Mehendi",
        "Invitation",
        "Music & DJ",
        "Entertainment",
        "Transportation",
        "Wedding Cake",
        "Event Planner",
        "Other",
      ],
    },

    ownerName: {
      type: String,
      required: [true, "Owner name is required."],
      trim: true,
      maxlength: [100, "Owner name cannot exceed 100 characters."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
    },

    address: {
      type: String,
      trim: true,
      default: "",
      maxlength: [300, "Address cannot exceed 300 characters."],
    },

    priceRange: {
      type: Number,
      default: 0,
      min: [0, "Price range cannot be negative."],
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "Description cannot exceed 1000 characters."],
    },

    availability: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0."],
      max: [5, "Rating cannot exceed 5."],
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Added By is required."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/*
 * Indexes
 */
vendorSchema.index({ addedBy: 1 });
vendorSchema.index({ category: 1 });
vendorSchema.index({ vendorName: 1 });
vendorSchema.index({ availability: 1 });

/*
 * Virtual ID
 */
vendorSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

/*
 * JSON configuration
 */
vendorSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Vendor", vendorSchema);