const { body } = require("express-validator");

const budgetCategories = [
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
];

/**
 * CREATE BUDGET VALIDATOR.
 */
const createBudgetValidator = [
  body("wedding")
    .exists()
    .withMessage("Wedding is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid Wedding ID."),

  body("category")
    .exists()
    .withMessage("Category is required.")
    .bail()
    .isIn(budgetCategories)
    .withMessage("Invalid budget category."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "Description cannot exceed 500 characters.",
    ),

  body("allocatedAmount")
    .exists()
    .withMessage("Allocated amount is required.")
    .bail()
    .isFloat({ min: 0 })
    .withMessage(
      "Allocated amount must be a non-negative number.",
    ),

  body("spentAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Spent amount must be a non-negative number.",
    ),

  body("spentAmount").custom((value, { req }) => {
    if (
      value !== undefined &&
      req.body.allocatedAmount !== undefined &&
      Number(value) > Number(req.body.allocatedAmount)
    ) {
      throw new Error(
        "Spent amount cannot exceed allocated amount.",
      );
    }

    return true;
  }),
];

/**
 * UPDATE BUDGET VALIDATOR.
 */
const updateBudgetValidator = [
  body("wedding")
    .optional()
    .isMongoId()
    .withMessage("Invalid Wedding ID."),

  body("category")
    .optional()
    .isIn(budgetCategories)
    .withMessage("Invalid budget category."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "Description cannot exceed 500 characters.",
    ),

  body("allocatedAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Allocated amount must be a non-negative number.",
    ),

  body("spentAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Spent amount must be a non-negative number.",
    ),

  body("remainingAmount").not().exists().withMessage(
    "Remaining amount is calculated automatically.",
  ),

  body("createdBy").not().exists().withMessage(
    "CreatedBy cannot be modified.",
  ),
];

module.exports = {
  createBudgetValidator,
  updateBudgetValidator,
};