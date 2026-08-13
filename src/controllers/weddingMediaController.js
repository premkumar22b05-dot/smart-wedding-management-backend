const weddingMediaService = require("../services/weddingMediaService");

/* =========================================================
   Create Media
========================================================= */

const create = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const media =
            await weddingMediaService.createMedia(
                userId,
                req.body,
            );

        return res.status(201).json({
            success: true,
            message: "Media created successfully.",
            media,
        });
    } catch (error) {
        console.error(
            "CREATE MEDIA ERROR:",
            error,
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================================================
   Get All Media
========================================================= */

const getAll = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const media =
            await weddingMediaService.getAllMedia(
                userId,
            );

        return res.status(200).json({
            success: true,
            count: media.length,
            media,
        });
    } catch (error) {
        console.error(
            "GET MEDIA ERROR:",
            error,
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================================================
   Get Media By ID
========================================================= */

const getById = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;

        const media =
            await weddingMediaService.getMediaById(
                userId,
                req.params.id,
            );

        return res.status(200).json({
            success: true,
            media,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================================================
   Update Media
========================================================= */

const update = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;

        const media =
            await weddingMediaService.updateMedia(
                userId,
                req.params.id,
                req.body,
            );

        return res.status(200).json({
            success: true,
            message: "Media updated successfully.",
            media,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================================================
   Delete Media
========================================================= */

const remove = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;

        await weddingMediaService.deleteMedia(
            userId,
            req.params.id,
        );

        return res.status(200).json({
            success: true,
            message: "Media deleted successfully.",
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================================================
   Toggle Favorite
========================================================= */

const toggleFavorite = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;

        const media =
            await weddingMediaService.toggleFavorite(
                userId,
                req.params.id,
            );

        return res.status(200).json({
            success: true,
            message: "Favorite status updated.",
            media,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    toggleFavorite,
};