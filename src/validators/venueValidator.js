const { body } = require("express-validator");

const venueTypes = [
    "Convention Hall",
    "Marriage Hall",
    "Temple",
    "Church",
    "Mosque",
    "Beach",
    "Garden",
    "Hotel",
    "Resort",
    "Outdoor",
    "Other",
];

const availabilityStatuses = [
    "Available",
    "Booked",
    "Maintenance",
];

const createVenueValidator = [
    body("venueName")
        .trim()
        .notEmpty()
        .withMessage("Venue name is required.")
        .bail()
        .isLength({ max: 150 })
        .withMessage(
            "Venue name cannot exceed 150 characters.",
        ),

    body("venueType")
        .optional()
        .isIn(venueTypes)
        .withMessage("Invalid venue type."),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required.")
        .isLength({ max: 300 })
        .withMessage(
            "Address cannot exceed 300 characters.",
        ),

    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required.")
        .isLength({ max: 100 })
        .withMessage(
            "City cannot exceed 100 characters.",
        ),

    body("state")
        .trim()
        .notEmpty()
        .withMessage("State is required.")
        .isLength({ max: 100 })
        .withMessage(
            "State cannot exceed 100 characters.",
        ),

    body("pincode")
        .trim()
        .notEmpty()
        .withMessage("Pincode is required.")
        .matches(/^[0-9]{6}$/)
        .withMessage(
            "Pincode must contain exactly 6 digits.",
        ),

    body("capacity")
        .notEmpty()
        .withMessage("Capacity is required.")
        .isInt({ min: 1 })
        .withMessage(
            "Capacity must be at least 1.",
        ),

    body("pricePerDay")
        .notEmpty()
        .withMessage(
            "Price per day is required.",
        )
        .isFloat({ min: 0 })
        .withMessage(
            "Price per day cannot be negative.",
        ),

    body("contactPerson")
        .trim()
        .notEmpty()
        .withMessage(
            "Contact person is required.",
        )
        .isLength({ max: 100 })
        .withMessage(
            "Contact person cannot exceed 100 characters.",
        ),

    body("contactNumber")
        .trim()
        .notEmpty()
        .withMessage(
            "Contact number is required.",
        )
        .matches(/^[0-9+\-\s()]{7,20}$/)
        .withMessage(
            "Invalid contact number.",
        ),

    body("email")
        .optional({ checkFalsy: true })
        .trim()
        .isEmail()
        .withMessage("Invalid email address.")
        .normalizeEmail(),

    body("facilities")
        .optional()
        .isArray()
        .withMessage(
            "Facilities must be an array.",
        ),

    body("facilities.*")
        .optional()
        .isString()
        .withMessage(
            "Each facility must be a string.",
        )
        .trim(),

    body("images")
        .optional()
        .isArray()
        .withMessage(
            "Images must be an array.",
        ),

    body("images.*")
        .optional()
        .isString()
        .withMessage(
            "Each image must be a string.",
        )
        .trim(),

    body("description")
        .optional()
        .isString()
        .withMessage(
            "Description must be a string.",
        )
        .trim()
        .isLength({ max: 1000 })
        .withMessage(
            "Description cannot exceed 1000 characters.",
        ),

    body("availabilityStatus")
        .optional()
        .isIn(availabilityStatuses)
        .withMessage(
            "Invalid availability status.",
        ),

    body("rating")
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage(
            "Rating must be between 0 and 5.",
        ),
];

const updateVenueValidator = [
    body("venueName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Venue name cannot be empty.",
        )
        .isLength({ max: 150 })
        .withMessage(
            "Venue name cannot exceed 150 characters.",
        ),

    body("venueType")
        .optional()
        .isIn(venueTypes)
        .withMessage("Invalid venue type."),

    body("address")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Address cannot be empty.",
        )
        .isLength({ max: 300 })
        .withMessage(
            "Address cannot exceed 300 characters.",
        ),

    body("city")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "City cannot be empty.",
        ),

    body("state")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "State cannot be empty.",
        ),

    body("pincode")
        .optional()
        .trim()
        .matches(/^[0-9]{6}$/)
        .withMessage(
            "Pincode must contain exactly 6 digits.",
        ),

    body("capacity")
        .optional()
        .isInt({ min: 1 })
        .withMessage(
            "Capacity must be at least 1.",
        ),

    body("pricePerDay")
        .optional()
        .isFloat({ min: 0 })
        .withMessage(
            "Price per day cannot be negative.",
        ),

    body("contactPerson")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Contact person cannot be empty.",
        ),

    body("contactNumber")
        .optional()
        .trim()
        .matches(/^[0-9+\-\s()]{7,20}$/)
        .withMessage(
            "Invalid contact number.",
        ),

    body("email")
        .optional({ checkFalsy: true })
        .trim()
        .isEmail()
        .withMessage("Invalid email address.")
        .normalizeEmail(),

    body("facilities")
        .optional()
        .isArray()
        .withMessage(
            "Facilities must be an array.",
        ),

    body("facilities.*")
        .optional()
        .isString()
        .withMessage(
            "Each facility must be a string.",
        )
        .trim(),

    body("images")
        .optional()
        .isArray()
        .withMessage(
            "Images must be an array.",
        ),

    body("images.*")
        .optional()
        .isString()
        .withMessage(
            "Each image must be a string.",
        )
        .trim(),

    body("description")
        .optional()
        .isString()
        .withMessage(
            "Description must be a string.",
        )
        .trim()
        .isLength({ max: 1000 })
        .withMessage(
            "Description cannot exceed 1000 characters.",
        ),

    body("availabilityStatus")
        .optional()
        .isIn(availabilityStatuses)
        .withMessage(
            "Invalid availability status.",
        ),

    body("rating")
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage(
            "Rating must be between 0 and 5.",
        ),
];

module.exports = {
    createVenueValidator,
    updateVenueValidator,
};