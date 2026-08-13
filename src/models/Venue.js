const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
    {
        venueName: {
            type: String,
            required: [true, "Venue name is required."],
            trim: true,
            maxlength: [150, "Venue name cannot exceed 150 characters."],
        },

        venueType: {
            type: String,
            enum: [
                "Convention Hall",
                "Marriage Hall",
                "Temple",
                "Church",
                "Mosque",
                "Beach",
                "Garden",
                "Hotel",
                "Resort",
                "Outdoor",
                "Other",
            ],
            default: "Convention Hall",
        },

        address: {
            type: String,
            required: [true, "Address is required."],
            trim: true,
            maxlength: [300, "Address cannot exceed 300 characters."],
        },

        city: {
            type: String,
            required: [true, "City is required."],
            trim: true,
            maxlength: [100, "City cannot exceed 100 characters."],
        },

        state: {
            type: String,
            required: [true, "State is required."],
            trim: true,
            maxlength: [100, "State cannot exceed 100 characters."],
        },

        pincode: {
            type: String,
            required: [true, "Pincode is required."],
            trim: true,
            match: [/^[0-9]{6}$/, "Pincode must contain exactly 6 digits."],
        },

        capacity: {
            type: Number,
            required: [true, "Capacity is required."],
            min: [1, "Capacity must be at least 1."],
        },

        pricePerDay: {
            type: Number,
            required: [true, "Price per day is required."],
            min: [0, "Price per day cannot be negative."],
        },

        contactPerson: {
            type: String,
            required: [true, "Contact person is required."],
            trim: true,
            maxlength: [100, "Contact person cannot exceed 100 characters."],
        },

        contactNumber: {
            type: String,
            required: [true, "Contact number is required."],
            trim: true,
            maxlength: [20, "Contact number cannot exceed 20 characters."],
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
            match: [
                /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address.",
            ],
        },

        facilities: {
            type: [String],
            default: [],
        },

        images: {
            type: [String],
            default: [],
        },

        description: {
            type: String,
            trim: true,
            default: "",
            maxlength: [
                1000,
                "Description cannot exceed 1000 characters.",
            ],
        },

        availabilityStatus: {
            type: String,
            enum: ["Available", "Booked", "Maintenance"],
            default: "Available",
        },

        rating: {
            type: Number,
            default: 0,
            min: [0, "Rating cannot be below 0."],
            max: [5, "Rating cannot exceed 5."],
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Created By is required."],
            immutable: true,
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
venueSchema.index({ createdBy: 1 });
venueSchema.index({ city: 1 });
venueSchema.index({ venueType: 1 });
venueSchema.index({ availabilityStatus: 1 });
venueSchema.index({ createdBy: 1, city: 1 });

/*
 * Virtual ID
 */
venueSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

/*
 * JSON configuration
 */
venueSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Venue", venueSchema);