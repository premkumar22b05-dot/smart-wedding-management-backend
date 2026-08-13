const { validationResult } = require("express-validator");

const {
    createWedding,
    getAllWeddings,
    getWeddingById,
    updateWedding,
    deleteWedding,
} = require("../services/weddingService");

/**
 * ============================================
 * Create Wedding
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

        const userId =
            req.user?._id || req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const wedding = await createWedding(
            req.body,
            userId,
        );

        return res.status(201).json({
            success: true,
            message:
                "Wedding created successfully.",
            wedding,
        });
    } catch (error) {
        console.error(
            "CREATE WEDDING ERROR:",
            error,
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to create wedding.",
        });
    }
};

/**
 * ============================================
 * Get All Weddings
 * ============================================
 */
const getAll = async (req, res) => {
    try {
        const userId =
            req.user?._id || req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const weddings =
            await getAllWeddings(userId);

        return res.status(200).json({
            success: true,
            count: weddings.length,
            weddings,
        });
    } catch (error) {
        console.error(
            "GET WEDDINGS ERROR:",
            error,
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch weddings.",
        });
    }
};

/**
 * ============================================
 * Get Wedding By ID
 * ============================================
 */
const getById = async (req, res) => {
    try {
        const userId =
            req.user?._id || req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const wedding =
            await getWeddingById(
                req.params.id,
                userId,
            );

        return res.status(200).json({
            success: true,
            wedding,
        });
    } catch (error) {
        console.error(
            "GET WEDDING ERROR:",
            error,
        );

        return res.status(404).json({
            success: false,
            message:
                error.message ||
                "Wedding not found.",
        });
    }
};

/**
 * ============================================
 * Update Wedding
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

        const userId =
            req.user?._id || req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const wedding =
            await updateWedding(
                req.params.id,
                req.body,
                userId,
            );

        return res.status(200).json({
            success: true,
            message:
                "Wedding updated successfully.",
            wedding,
        });
    } catch (error) {
        console.error(
            "UPDATE WEDDING ERROR:",
            error,
        );

        return res.status(404).json({
            success: false,
            message:
                error.message ||
                "Wedding not found.",
        });
    }
};

/**
 * ============================================
 * Delete Wedding
 * ============================================
 */
const remove = async (req, res) => {
    try {
        const userId =
            req.user?._id || req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        await deleteWedding(
            req.params.id,
            userId,
        );

        return res.status(200).json({
            success: true,
            message:
                "Wedding deleted successfully.",
        });
    } catch (error) {
        console.error(
            "DELETE WEDDING ERROR:",
            error,
        );

        return res.status(404).json({
            success: false,
            message:
                error.message ||
                "Wedding not found.",
        });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};