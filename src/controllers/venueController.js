const { validationResult } = require("express-validator");

const {
    createVenue,
    getAllVenues,
    getVenueById,
    updateVenue,
    deleteVenue,
} = require("../services/venueService");

/**
 * Create Venue
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

        const venue = await createVenue(
            req.body,
            req.user._id,
        );

        return res.status(201).json({
            success: true,
            message: "Venue created successfully.",
            venue,
        });
    } catch (error) {
        console.error("CREATE VENUE ERROR:", error);

        return res.status(400).json({
            success: false,
            message:
                error.message ||
                "Failed to create venue.",
        });
    }
};

/**
 * Get All Venues
 */
const getAll = async (req, res) => {
    try {
        const venues = await getAllVenues(
            req.user._id,
        );

        return res.status(200).json({
            success: true,
            count: venues.length,
            venues,
        });
    } catch (error) {
        console.error("GET VENUES ERROR:", error);

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch venues.",
        });
    }
};

/**
 * Get Venue By ID
 */
const getById = async (req, res) => {
    try {
        const venue = await getVenueById(
            req.params.id,
            req.user._id,
        );

        return res.status(200).json({
            success: true,
            venue,
        });
    } catch (error) {
        console.error("GET VENUE ERROR:", error);

        return res.status(
            error.message === "Invalid venue ID."
                ? 400
                : 404,
        ).json({
            success: false,
            message:
                error.message ||
                "Venue not found.",
        });
    }
};

/**
 * Update Venue
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

        const venue = await updateVenue(
            req.params.id,
            req.body,
            req.user._id,
        );

        return res.status(200).json({
            success: true,
            message: "Venue updated successfully.",
            venue,
        });
    } catch (error) {
        console.error("UPDATE VENUE ERROR:", error);

        return res.status(
            error.message === "Invalid venue ID."
                ? 400
                : 404,
        ).json({
            success: false,
            message:
                error.message ||
                "Failed to update venue.",
        });
    }
};

/**
 * Delete Venue
 */
const remove = async (req, res) => {
    try {
        await deleteVenue(
            req.params.id,
            req.user._id,
        );

        return res.status(200).json({
            success: true,
            message: "Venue deleted successfully.",
        });
    } catch (error) {
        console.error("DELETE VENUE ERROR:", error);

        return res.status(
            error.message === "Invalid venue ID."
                ? 400
                : 404,
        ).json({
            success: false,
            message:
                error.message ||
                "Failed to delete venue.",
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