const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // --------------------------------------------------
    // WEDDING
    // --------------------------------------------------
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
      index: true,
    },

    // --------------------------------------------------
    // CREATED BY
    // --------------------------------------------------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // --------------------------------------------------
    // VENDOR
    // --------------------------------------------------
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    },

    // --------------------------------------------------
    // VENUE
    // --------------------------------------------------
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      default: null,
    },

    // --------------------------------------------------
    // BOOKING TYPE
    // --------------------------------------------------
    bookingType: {
      type: String,
      required: true,
      enum: [
        "Venue",
        "Photography",
        "Catering",
        "Decoration",
        "Makeup",
        "Music",
        "Transportation",
        "Other",
      ],
      trim: true,
    },

    // --------------------------------------------------
    // SERVICE NAME
    // --------------------------------------------------
    serviceName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    // --------------------------------------------------
    // BOOKING DATE
    // --------------------------------------------------
    bookingDate: {
      type: Date,
      required: true,
    },

    // --------------------------------------------------
    // EVENT DATE
    // --------------------------------------------------
    eventDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          if (!this.bookingDate || !value) {
            return true;
          }

          return value >= this.bookingDate;
        },
        message: "Event date cannot be earlier than booking date.",
      },
    },

    // --------------------------------------------------
    // TOTAL AMOUNT
    // --------------------------------------------------
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative."],
    },

    // --------------------------------------------------
    // ADVANCE AMOUNT
    // --------------------------------------------------
    advanceAmount: {
      type: Number,
      default: 0,
      min: [0, "Advance amount cannot be negative."],
      validate: {
        validator: function (value) {
          return value <= this.amount;
        },
        message: "Advance amount cannot exceed total amount.",
      },
    },

    // --------------------------------------------------
    // BOOKING STATUS
    // --------------------------------------------------
    bookingStatus: {
      type: String,
      enum: [
        "Requested",
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ],
      default: "Requested",
      index: true,
    },

    // --------------------------------------------------
    // PAYMENT STATUS
    // --------------------------------------------------
    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
      index: true,
    },

    // --------------------------------------------------
    // PAYMENT DETAILS
    // --------------------------------------------------
    paymentDetails: {
      transactionId: {
        type: String,
        trim: true,
        default: "",
        maxlength: 100,
      },

      paidAmount: {
        type: Number,
        default: 0,
        min: [0, "Paid amount cannot be negative."],
        validate: {
          validator: function (value) {
            return value <= this.amount;
          },
          message: "Paid amount cannot exceed total amount.",
        },
      },

      paymentDate: {
        type: Date,
        default: null,
      },
    },

    // --------------------------------------------------
    // NOTES
    // --------------------------------------------------
    notes: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

// ======================================================
// AUTOMATIC PAYMENT STATUS
// ======================================================

bookingSchema.pre("save", function (next) {
  const totalAmount = Number(this.amount || 0);
  const paidAmount = Number(
    this.paymentDetails?.paidAmount || 0,
  );

  if (paidAmount <= 0) {
    this.paymentStatus = "Pending";
  } else if (paidAmount < totalAmount) {
    this.paymentStatus = "Partial";
  } else {
    this.paymentStatus = "Paid";
  }

  next();
});

// ======================================================
// INDEXES
// ======================================================

bookingSchema.index({
  createdBy: 1,
  createdAt: -1,
});

bookingSchema.index({
  wedding: 1,
  eventDate: 1,
});

bookingSchema.index({
  vendor: 1,
});

bookingSchema.index({
  venue: 1,
});

bookingSchema.index({
  bookingStatus: 1,
});

bookingSchema.index({
  paymentStatus: 1,
});

bookingSchema.index({
  eventDate: 1,
});

module.exports = mongoose.model("Booking", bookingSchema);