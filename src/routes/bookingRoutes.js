const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBookingValidator,
  updateBookingValidator,
} = require("../validators/bookingValidator");

/**
 * Create Booking
 */
router.post(
  "/",
  authMiddleware,
  createBookingValidator,
  create,
);

/**
 * Get All Bookings
 */
router.get(
  "/",
  authMiddleware,
  getAll,
);

/**
 * Get Booking By ID
 */
router.get(
  "/:id",
  authMiddleware,
  getById,
);

/**
 * Update Booking
 */
router.patch(
  "/:id",
  authMiddleware,
  updateBookingValidator,
  update,
);

/**
 * Delete Booking
 */
router.delete(
  "/:id",
  authMiddleware,
  remove,
);

module.exports = router;
