const { body } = require("express-validator");

const relationTypes = [
  "Groom Family",
  "Bride Family",
  "Friend",
  "Colleague",
  "Relative",
  "Other",
];

const guestTypes = [
  "VIP",
  "Family",
  "Friend",
  "General",
];

const invitationStatuses = [
  "Not Sent",
  "Sent",
  "Accepted",
  "Declined",
];

const attendanceStatuses = [
  "Pending",
  "Attending",
  "Not Attending",
];

const foodPreferences = [
  "Vegetarian",
  "Non Vegetarian",
  "Vegan",
  "Other",
];

/**
 * CREATE GUEST VALIDATOR
 */
const createGuestValidator = [
  body("wedding")
    .exists()
    .withMessage("Wedding is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid Wedding ID."),

  body("guestName")
    .exists()
    .withMessage("Guest name is required.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Guest name cannot be empty."),

  body("phone")
    .exists()
    .withMessage("Phone number is required.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty."),

  body("email")
    .optional({ nullable: true })
    .trim()
    .isEmail()
    .withMessage("Invalid email address."),

  body("relation")
    .exists()
    .withMessage("Relation is required.")
    .bail()
    .isIn(relationTypes)
    .withMessage("Invalid relation type."),

  body("guestType")
    .optional()
    .isIn(guestTypes)
    .withMessage("Invalid guest type."),

  body("invitationStatus")
    .optional()
    .isIn(invitationStatuses)
    .withMessage("Invalid invitation status."),

  body("attendanceStatus")
    .optional()
    .isIn(attendanceStatuses)
    .withMessage("Invalid attendance status."),

  body("foodPreference")
    .optional()
    .isIn(foodPreferences)
    .withMessage("Invalid food preference."),

  body("numberOfGuests")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Number of guests must be at least 1.",
    ),

  body("notes")
    .optional()
    .trim(),
];

/**
 * UPDATE GUEST VALIDATOR
 */
const updateGuestValidator = [
  body("wedding")
    .optional()
    .isMongoId()
    .withMessage("Invalid Wedding ID."),

  body("guestName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Guest name cannot be empty."),

  body("phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty."),

  body("email")
    .optional({ nullable: true })
    .trim()
    .isEmail()
    .withMessage("Invalid email address."),

  body("relation")
    .optional()
    .isIn(relationTypes)
    .withMessage("Invalid relation type."),

  body("guestType")
    .optional()
    .isIn(guestTypes)
    .withMessage("Invalid guest type."),

  body("invitationStatus")
    .optional()
    .isIn(invitationStatuses)
    .withMessage("Invalid invitation status."),

  body("attendanceStatus")
    .optional()
    .isIn(attendanceStatuses)
    .withMessage("Invalid attendance status."),

  body("foodPreference")
    .optional()
    .isIn(foodPreferences)
    .withMessage("Invalid food preference."),

  body("numberOfGuests")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Number of guests must be at least 1.",
    ),

  body("notes")
    .optional()
    .trim(),
];

module.exports = {
  createGuestValidator,
  updateGuestValidator,
};