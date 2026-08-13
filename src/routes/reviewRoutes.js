const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
    create,
    getAll,
    getByVendor,
    getById,
    update,
    remove,
} = require("../controllers/reviewController");

const {
    createReviewValidator,
    updateReviewValidator,
} = require("../validators/reviewValidator");

/**
 * ============================================
 * Review Routes
 * ============================================
 */

// Create review
router.post(
    "/",
    authenticate,
    createReviewValidator,
    create,
);

// Get current user's reviews
router.get(
    "/",
    authenticate,
    getAll,
);

// Get published reviews for a vendor
router.get(
    "/vendor/:vendorId",
    authenticate,
    getByVendor,
);

// Get review by ID
router.get(
    "/:id",
    authenticate,
    getById,
);

// Update review
router.put(
    "/:id",
    authenticate,
    updateReviewValidator,
    update,
);

// Delete review
router.delete(
    "/:id",
    authenticate,
    remove,
);

module.exports = router;