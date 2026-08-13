const { body } = require("express-validator");

const paymentTypes = [
  "Booking Payment",
  "Advance Payment",
  "Partial Payment",
  "Full Payment",
  "Balance Payment",
  "Refund",
  "Other",
];

const paymentMethods = [
  "Cash",
  "UPI",
  "Credit Card",
  "Debit Card",
  "Net Banking",
  "Bank Transfer",
  "Cheque",
  "Online",
];

const paymentStatuses = [
  "Pending",
  "Processing",
  "Paid",
  "Completed",
  "Failed",
  "Refunded",
];

/**
 * CREATE PAYMENT VALIDATOR.
 */
const createPaymentValidator = [
  body("wedding")
    .exists()
    .withMessage("Wedding ID is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid Wedding ID."),

  body("booking")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Booking ID."),

  body("vendor")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Vendor ID."),

  body("venue")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Venue ID."),

  body("paymentTitle")
    .exists()
    .withMessage("Payment title is required.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Payment title cannot be empty.")
    .isLength({ max: 100 })
    .withMessage(
      "Payment title cannot exceed 100 characters.",
    ),

  body("paymentType")
    .exists()
    .withMessage("Payment type is required.")
    .bail()
    .isIn(paymentTypes)
    .withMessage("Invalid payment type."),

  body("amount")
    .exists()
    .withMessage("Payment amount is required.")
    .bail()
    .isFloat({ min: 1 })
    .withMessage(
      "Payment amount must be greater than zero.",
    ),

  body("paymentMethod")
    .exists()
    .withMessage("Payment method is required.")
    .bail()
    .isIn(paymentMethods)
    .withMessage("Invalid payment method."),

  body("transactionId")
    .optional({ nullable: true })
    .trim(),

  body("paymentStatus")
    .optional()
    .isIn(paymentStatuses)
    .withMessage("Invalid payment status."),

  body("paymentDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid payment date."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "Notes cannot exceed 500 characters.",
    ),
];

/**
 * UPDATE PAYMENT VALIDATOR.
 */
const updatePaymentValidator = [
  body("wedding")
    .optional()
    .isMongoId()
    .withMessage("Invalid Wedding ID."),

  body("booking")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Booking ID."),

  body("vendor")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Vendor ID."),

  body("venue")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Venue ID."),

  body("paymentTitle")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Payment title cannot be empty.")
    .isLength({ max: 100 })
    .withMessage(
      "Payment title cannot exceed 100 characters.",
    ),

  body("paymentType")
    .optional()
    .isIn(paymentTypes)
    .withMessage("Invalid payment type."),

  body("amount")
    .optional()
    .isFloat({ min: 1 })
    .withMessage(
      "Payment amount must be greater than zero.",
    ),

  body("paymentMethod")
    .optional()
    .isIn(paymentMethods)
    .withMessage("Invalid payment method."),

  body("transactionId")
    .optional({ nullable: true })
    .trim(),

  body("paymentStatus")
    .optional()
    .isIn(paymentStatuses)
    .withMessage("Invalid payment status."),

  body("paymentDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid payment date."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "Notes cannot exceed 500 characters.",
    ),
];

module.exports = {
  createPaymentValidator,
  updatePaymentValidator,
};