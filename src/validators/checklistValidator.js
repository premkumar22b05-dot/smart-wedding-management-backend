const { body } = require("express-validator");

const checklistCategories = [
  "Venue",
  "Catering",
  "Photography",
  "Decoration",
  "Invitation",
  "Guest",
  "Jewellery",
  "Transportation",
  "Other",
];

const checklistPriorities = [
  "Low",
  "Medium",
  "High",
];

const checklistStatuses = [
  "Pending",
  "In Progress",
  "Completed",
];

/**
 * CREATE CHECKLIST VALIDATOR
 */
const createChecklistValidator = [
  body("wedding")
    .exists()
    .withMessage("Wedding is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid Wedding ID."),

  body("taskName")
    .exists()
    .withMessage("Task name is required.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Task name cannot be empty.")
    .isLength({ max: 150 })
    .withMessage(
      "Task name cannot exceed 150 characters."
    ),

  body("category")
    .exists()
    .withMessage("Category is required.")
    .bail()
    .isIn(checklistCategories)
    .withMessage("Invalid checklist category."),

  body("priority")
    .optional()
    .isIn(checklistPriorities)
    .withMessage("Invalid priority."),

  body("dueDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid due date."),

  body("status")
    .optional()
    .isIn(checklistStatuses)
    .withMessage("Invalid checklist status."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "Notes cannot exceed 500 characters."
    ),
];

/**
 * UPDATE CHECKLIST VALIDATOR
 */
const updateChecklistValidator = [
  body("wedding")
    .optional()
    .isMongoId()
    .withMessage("Invalid Wedding ID."),

  body("taskName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Task name cannot be empty.")
    .isLength({ max: 150 })
    .withMessage(
      "Task name cannot exceed 150 characters."
    ),

  body("category")
    .optional()
    .isIn(checklistCategories)
    .withMessage("Invalid checklist category."),

  body("priority")
    .optional()
    .isIn(checklistPriorities)
    .withMessage("Invalid priority."),

  body("dueDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid due date."),

  body("status")
    .optional()
    .isIn(checklistStatuses)
    .withMessage("Invalid checklist status."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "Notes cannot exceed 500 characters."
    ),
];

module.exports = {
  createChecklistValidator,
  updateChecklistValidator,
};