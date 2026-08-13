const { body } = require("express-validator");

const createReviewValidator = [
    body("wedding")
        .notEmpty()
        .withMessage("Wedding is required.")
        .isMongoId()
        .withMessage("Invalid wedding ID."),

    body("vendor")
        .notEmpty()
        .withMessage("Vendor is required.")
        .isMongoId()
        .withMessage("Invalid vendor ID."),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required.")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5."),

    body("title")
        .optional()
        .isString()
        .withMessage("Review title must be text.")
        .trim()
        .isLength({ max: 150 })
        .withMessage("Review title cannot exceed 150 characters."),

    body("comment")
        .optional()
        .isString()
        .withMessage("Review comment must be text.")
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Review comment cannot exceed 1000 characters."),
];

const updateReviewValidator = [
    body("rating")
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5."),

    body("title")
        .optional()
        .isString()
        .trim()
        .isLength({ max: 150 })
        .withMessage("Review title cannot exceed 150 characters."),

    body("comment")
        .optional()
        .isString()
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Review comment cannot exceed 1000 characters."),

    body("status")
        .optional()
        .isIn(["Pending", "Published", "Rejected"])
        .withMessage("Invalid review status."),
];

module.exports = {
    createReviewValidator,
    updateReviewValidator,
};