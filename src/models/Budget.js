const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: [true, "Wedding is required"],
      index: true,
    },

    category: {
      type: String,
      required: [true, "Budget category is required"],
      enum: [
        "Venue",
        "Catering",
        "Photography",
        "Decoration",
        "Makeup",
        "Music",
        "Transportation",
        "Invitation",
        "Jewellery",
        "Other",
      ],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    allocatedAmount: {
      type: Number,
      required: [true, "Allocated amount is required"],
      min: [0, "Allocated amount cannot be negative"],
    },

    spentAmount: {
      type: Number,
      default: 0,
      min: [0, "Spent amount cannot be negative"],
    },

    remainingAmount: {
      type: Number,
      default: 0,
      min: [0, "Remaining amount cannot be negative"],
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
 * Automatically calculate remaining amount.
 */
budgetSchema.pre("save", function (next) {
  const allocated = Number(this.allocatedAmount || 0);
  const spent = Number(this.spentAmount || 0);

  if (spent > allocated) {
    return next(
      new Error("Spent amount cannot exceed allocated amount."),
    );
  }

  this.remainingAmount = allocated - spent;

  next();
});

/**
 * Frequently used query indexes.
 */
budgetSchema.index({ createdBy: 1, createdAt: -1 });
budgetSchema.index({ wedding: 1, category: 1 });

module.exports = mongoose.model("Budget", budgetSchema);