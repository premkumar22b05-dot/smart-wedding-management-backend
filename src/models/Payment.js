const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: [true, "Wedding is required"],
      index: true,
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
      index: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
      index: true,
    },

    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      default: null,
      index: true,
    },

    paymentTitle: {
      type: String,
      required: [true, "Payment title is required"],
      trim: true,
      maxlength: [
        100,
        "Payment title cannot exceed 100 characters",
      ],
    },

    paymentType: {
      type: String,
      required: [true, "Payment type is required"],
      enum: [
        "Booking Payment",
        "Advance Payment",
        "Partial Payment",
        "Full Payment",
        "Balance Payment",
        "Refund",
        "Other",
      ],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be greater than zero"],
    },

    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: [
        "Cash",
        "UPI",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "Bank Transfer",
        "Cheque",
        "Online",
      ],
    },

    transactionId: {
      type: String,
      trim: true,
      default: null,
    },

    paymentStatus: {
      type: String,
      required: true,
      enum: [
        "Pending",
        "Processing",
        "Paid",
        "Completed",
        "Failed",
        "Refunded",
      ],
      default: "Pending",
      index: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "Notes cannot exceed 500 characters",
      ],
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

/**
 * Frequently used indexes.
 */
paymentSchema.index({
  createdBy: 1,
  createdAt: -1,
});

paymentSchema.index({
  wedding: 1,
  paymentDate: -1,
});

paymentSchema.index({
  booking: 1,
  paymentDate: -1,
});

paymentSchema.index({
  paymentStatus: 1,
});

module.exports = mongoose.model(
  "Payment",
  paymentSchema,
);
