const mongoose = require("mongoose");

const checklistSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: [true, "Wedding is required"],
      index: true,
    },

    taskName: {
      type: String,
      required: [true, "Task name is required"],
      trim: true,
      maxlength: [150, "Task name cannot exceed 150 characters"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Venue",
        "Catering",
        "Photography",
        "Decoration",
        "Invitation",
        "Guest",
        "Jewellery",
        "Transportation",
        "Other",
      ],
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    dueDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
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
  }
);

// Frequently used queries
checklistSchema.index({
  createdBy: 1,
  createdAt: -1,
});

checklistSchema.index({
  wedding: 1,
  dueDate: 1,
});

checklistSchema.index({
  status: 1,
});

checklistSchema.index({
  priority: 1,
});

module.exports = mongoose.model("Checklist", checklistSchema);