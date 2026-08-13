const { body } = require("express-validator");

const bookingTypes = [
  "Venue",
  "Photography",
  "Catering",
  "Decoration",
  "Makeup",
  "Music",
  "Transportation",
  "Other",
];

const bookingStatuses = [
  "Requested",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

/**
 * CREATE BOOKING VALIDATOR
 */
const createBookingValidator = [
  body("wedding")
    .exists()
    .withMessage("Wedding is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid Wedding ID."),

  body("vendor")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Vendor ID."),

  body("venue")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Venue ID."),

  body("bookingType")
    .exists()
    .withMessage("Booking type is required.")
    .bail()
    .isIn(bookingTypes)
    .withMessage("Invalid booking type."),

  body("serviceName")
    .exists()
    .withMessage("Service name is required.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Service name cannot be empty."),

  body("bookingDate")
    .exists()
    .withMessage("Booking date is required.")
    .bail()
    .isISO8601()
    .withMessage("Invalid booking date."),

  body("eventDate")
    .exists()
    .withMessage("Event date is required.")
    .bail()
    .isISO8601()
    .withMessage("Invalid event date."),

  body("eventDate").custom((value, { req }) => {
    if (
      req.body.bookingDate &&
      new Date(value) < new Date(req.body.bookingDate)
    ) {
      throw new Error(
        "Event date cannot be earlier than booking date.",
      );
    }

    return true;
  }),

  body("amount")
    .exists()
    .withMessage("Amount is required.")
    .bail()
    .isFloat({ min: 0 })
    .withMessage(
      "Amount must be greater than or equal to 0.",
    ),

  body("advanceAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Advance amount must be greater than or equal to 0.",
    )
    .custom((value, { req }) => {
      if (
        req.body.amount !== undefined &&
        Number(value) > Number(req.body.amount)
      ) {
        throw new Error(
          "Advance amount cannot exceed total amount.",
        );
      }

      return true;
    }),

  body("paymentDetails.paidAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Paid amount must be greater than or equal to 0.",
    )
    .custom((value, { req }) => {
      if (
        req.body.amount !== undefined &&
        Number(value) > Number(req.body.amount)
      ) {
        throw new Error(
          "Paid amount cannot exceed total amount.",
        );
      }

      return true;
    }),

  body("bookingStatus")
    .optional()
    .isIn(bookingStatuses)
    .withMessage("Invalid booking status."),

  body("paymentDetails.transactionId")
    .optional()
    .trim(),

  body("paymentDetails.paymentDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid payment date."),

  body("notes")
    .optional()
    .trim(),
];

/**
 * UPDATE BOOKING VALIDATOR
 */
const updateBookingValidator = [
  body("wedding")
    .optional()
    .isMongoId()
    .withMessage("Invalid Wedding ID."),

  body("vendor")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Vendor ID."),

  body("venue")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Venue ID."),

  body("bookingType")
    .optional()
    .isIn(bookingTypes)
    .withMessage("Invalid booking type."),

  body("serviceName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Service name cannot be empty."),

  body("bookingDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid booking date."),

  body("eventDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid event date."),

  body("amount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Amount must be greater than or equal to 0.",
    ),

  body("advanceAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Advance amount must be greater than or equal to 0.",
    ),

  body("paymentDetails.paidAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Paid amount must be greater than or equal to 0.",
    ),

  body("bookingStatus")
    .optional()
    .isIn(bookingStatuses)
    .withMessage("Invalid booking status."),

  body("paymentDetails.transactionId")
    .optional()
    .trim(),

  body("paymentDetails.paymentDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid payment date."),

  body("notes")
    .optional()
    .trim(),
];

module.exports = {
  createBookingValidator,
  updateBookingValidator,
};
