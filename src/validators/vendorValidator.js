const { body } = require("express-validator");

const vendorCategories = [
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
];

/**
 * Create Vendor Validator
 */
const createVendorValidator = [
  body("vendorName")
    .trim()
    .notEmpty()
    .withMessage("Vendor name is required.")
    .isLength({ max: 150 })
    .withMessage(
      "Vendor name cannot exceed 150 characters.",
    ),

  body("category")
    .notEmpty()
    .withMessage("Vendor category is required.")
    .isIn(vendorCategories)
    .withMessage("Invalid vendor category."),

  body("ownerName")
    .trim()
    .notEmpty()
    .withMessage("Owner name is required.")
    .isLength({ max: 100 })
    .withMessage(
      "Owner name cannot exceed 100 characters.",
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required."),

  body("address")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage(
      "Address cannot exceed 300 characters.",
    ),

  body("priceRange")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Price range must be zero or greater.",
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage(
      "Description cannot exceed 1000 characters.",
    ),

  body("availability")
    .optional()
    .isBoolean()
    .withMessage(
      "Availability must be true or false.",
    ),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage(
      "Rating must be between 0 and 5.",
    ),
];

/**
 * Update Vendor Validator
 */
const updateVendorValidator = [
  body("vendorName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Vendor name cannot be empty.")
    .isLength({ max: 150 })
    .withMessage(
      "Vendor name cannot exceed 150 characters.",
    ),

  body("category")
    .optional()
    .isIn(vendorCategories)
    .withMessage("Invalid vendor category."),

  body("ownerName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Owner name cannot be empty.")
    .isLength({ max: 100 })
    .withMessage(
      "Owner name cannot exceed 100 characters.",
    ),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty."),

  body("address")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage(
      "Address cannot exceed 300 characters.",
    ),

  body("priceRange")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Price range must be zero or greater.",
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage(
      "Description cannot exceed 1000 characters.",
    ),

  body("availability")
    .optional()
    .isBoolean()
    .withMessage(
      "Availability must be true or false.",
    ),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage(
      "Rating must be between 0 and 5.",
    ),
];

module.exports = {
  createVendorValidator,
  updateVendorValidator,
};