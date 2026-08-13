const { validationResult } = require("express-validator");

const reviewService = require("../services/reviewService");

/**
 * ============================================
 * Create Review
 * ============================================
 */
const create = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const userId = req.user?.id || req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const review =
            await reviewService.createReview(
                req.body,
                userId,
            );

        return res.status(201).json({
            success: true,
            message: "Review created successfully.",
            review,
        });
    } catch (error) {
        console.error(
            "CREATE REVIEW ERROR:",
            error,
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * ============================================
 * Get My Reviews
 * ============================================
 */
const getAll = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const reviews =
            await reviewService.getAllReviews(
                userId,
            );

        return res.status(200).json({
            success: true,
            count: reviews.length,
            reviews,
        });
    } catch (error) {
        console.error(
            "GET REVIEWS ERROR:",
            error,
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * ============================================
 * Get Reviews By Vendor
 * ============================================
 */
const getByVendor = async (req, res) => {
    try {
        const reviews =
            await reviewService.getReviewsByVendor(
                req.params.vendorId,
            );

        return res.status(200).json({
            success: true,
            count: reviews.length,
            reviews,
        });
    } catch (error) {
        console.error(
            "GET VENDOR REVIEWS ERROR:",
            error,
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * ============================================
 * Get Review By ID
 * ============================================
 */
const getById = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;

        const review =
            await reviewService.getReviewById(
                req.params.id,
                userId,
            );

        return res.status(200).json({
            success: true,
            review,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * ============================================
 * Update Review
 * ============================================
 */
const update = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const userId = req.user?.id || req.user?._id;

        const review =
            await reviewService.updateReview(
                req.params.id,
                req.body,
                userId,
            );

        return res.status(200).json({
            success: true,
            message: "Review updated successfully.",
            review,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * ============================================
 * Delete Review
 * ============================================
 */
const remove = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;

        await reviewService.deleteReview(
            req.params.id,
            userId,
        );

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully.",
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    create,
    getAll,
    getByVendor,
    getById,
    update,
    remove,
};