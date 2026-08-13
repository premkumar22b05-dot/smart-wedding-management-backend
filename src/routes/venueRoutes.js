const express = require("express");

const router = express.Router();

const {
    create,
    getAll,
    getById,
    update,
    remove,
} = require("../controllers/venueController");

const authenticate = require("../middleware/authMiddleware");

const {
    createVenueValidator,
    updateVenueValidator,
} = require("../validators/venueValidator");

/*
 * ================================
 * Venue Routes
 * ================================
 */

/**
 * Create Venue
 */
router.post(
    "/",
    authenticate,
    createVenueValidator,
    create,
);

/**
 * Get All Venues
 */
router.get(
    "/",
    authenticate,
    getAll,
);

/**
 * Get Venue By ID
 */
router.get(
    "/:id",
    authenticate,
    getById,
);

/**
 * Update Venue
 */
router.put(
    "/:id",
    authenticate,
    updateVenueValidator,
    update,
);

/**
 * Delete Venue
 */
router.delete(
    "/:id",
    authenticate,
    remove,
);

module.exports = router;