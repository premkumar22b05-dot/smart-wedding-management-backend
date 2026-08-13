const Review = require("../models/Review");

/**
 * ============================================
 * Create Review
 * ============================================
 */
const createReview = async (data, userId) => {
    const existingReview = await Review.findOne({
        user: userId,
        wedding: data.wedding,
        vendor: data.vendor,
    });

    if (existingReview) {
        throw new Error(
            "You have already reviewed this vendor for this wedding.",
        );
    }

    const review = new Review({
        ...data,
        user: userId,
    });

    await review.save();

    return await Review.findById(review._id)
        .populate("user", "name email role")
        .populate(
            "wedding",
            "groomName brideName weddingDate budget status",
        )
        .populate(
            "vendor",
            "vendorName category ownerName phone email priceRange rating",
        );
};

/**
 * ============================================
 * Get All Reviews
 * ============================================
 */
const getAllReviews = async (userId) => {
    return await Review.find({
        user: userId,
    })
        .populate(
            "wedding",
            "groomName brideName weddingDate budget status",
        )
        .populate(
            "vendor",
            "vendorName category ownerName phone email priceRange rating",
        )
        .sort({
            createdAt: -1,
        });
};

/**
 * ============================================
 * Get Reviews By Vendor
 * ============================================
 */
const getReviewsByVendor = async (vendorId) => {
    return await Review.find({
        vendor: vendorId,
        status: "Published",
    })
        .populate("user", "name role")
        .populate(
            "wedding",
            "groomName brideName weddingDate",
        )
        .sort({
            createdAt: -1,
        });
};

/**
 * ============================================
 * Get Review By ID
 * ============================================
 */
const getReviewById = async (reviewId, userId) => {
    const review = await Review.findOne({
        _id: reviewId,
        user: userId,
    })
        .populate("user", "name email role")
        .populate(
            "wedding",
            "groomName brideName weddingDate budget status",
        )
        .populate(
            "vendor",
            "vendorName category ownerName phone email priceRange rating",
        );

    if (!review) {
        throw new Error("Review not found.");
    }

    return review;
};

/**
 * ============================================
 * Update Review
 * ============================================
 */
const updateReview = async (
    reviewId,
    data,
    userId,
) => {
    const review = await Review.findOneAndUpdate(
        {
            _id: reviewId,
            user: userId,
        },
        data,
        {
            new: true,
            runValidators: true,
        },
    )
        .populate("user", "name email role")
        .populate(
            "wedding",
            "groomName brideName weddingDate budget status",
        )
        .populate(
            "vendor",
            "vendorName category ownerName phone email priceRange rating",
        );

    if (!review) {
        throw new Error("Review not found.");
    }

    return review;
};

/**
 * ============================================
 * Delete Review
 * ============================================
 */
const deleteReview = async (reviewId, userId) => {
    const review = await Review.findOneAndDelete({
        _id: reviewId,
        user: userId,
    });

    if (!review) {
        throw new Error("Review not found.");
    }

    return review;
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewsByVendor,
    getReviewById,
    updateReview,
    deleteReview,
};