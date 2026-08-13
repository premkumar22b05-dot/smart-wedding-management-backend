const { body } = require("express-validator");

/**
 * ============================================
 * Create Wedding Validator
 * ============================================
 */
const createWeddingValidator = [
    body("groomName")
        .trim()
        .notEmpty()
        .withMessage(
            "Groom name is required.",
        ),

    body("brideName")
        .trim()
        .notEmpty()
        .withMessage(
            "Bride name is required.",
        ),

    body("weddingDate")
        .notEmpty()
        .withMessage(
            "Wedding date is required.",
        )
        .isISO8601()
        .withMessage(
            "Invalid wedding date.",
        ),

    body("venue")
        .trim()
        .notEmpty()
        .withMessage(
            "Venue is required.",
        ),

    body("weddingType")
        .optional()
        .isIn([
            "Hindu",
            "Christian",
            "Muslim",
            "Reception",
            "Engagement",
            "Other",
        ])
        .withMessage(
            "Invalid wedding type.",
        ),

    body("budget")
        .optional()
        .isNumeric()
        .withMessage(
            "Budget must be a number.",
        )
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error(
                    "Budget cannot be negative.",
                );
            }

            return true;
        }),

    body("description")
        .optional()
        .isString()
        .withMessage(
            "Description must be text.",
        )
        .trim(),

    body("status")
        .optional()
        .isIn([
            "Planning",
            "Confirmed",
            "Completed",
            "Cancelled",
        ])
        .withMessage(
            "Invalid wedding status.",
        ),
];

/**
 * ============================================
 * Update Wedding Validator
 * ============================================
 */
const updateWeddingValidator = [
    body("groomName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Groom name cannot be empty.",
        ),

    body("brideName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Bride name cannot be empty.",
        ),

    body("weddingDate")
        .optional()
        .isISO8601()
        .withMessage(
            "Invalid wedding date.",
        ),

    body("venue")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Venue cannot be empty.",
        ),

    body("weddingType")
        .optional()
        .isIn([
            "Hindu",
            "Christian",
            "Muslim",
            "Reception",
            "Engagement",
            "Other",
        ])
        .withMessage(
            "Invalid wedding type.",
        ),

    body("budget")
        .optional()
        .isNumeric()
        .withMessage(
            "Budget must be a number.",
        )
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error(
                    "Budget cannot be negative.",
                );
            }

            return true;
        }),

    body("description")
        .optional()
        .isString()
        .withMessage(
            "Description must be text.",
        )
        .trim(),

    body("status")
        .optional()
        .isIn([
            "Planning",
            "Confirmed",
            "Completed",
            "Cancelled",
        ])
        .withMessage(
            "Invalid wedding status.",
        ),
];

module.exports = {
    createWeddingValidator,
    updateWeddingValidator,
};