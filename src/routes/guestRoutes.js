const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/guestController");

const authenticate = require("../middleware/authMiddleware");

const {
  createGuestValidator,
  updateGuestValidator,
} = require("../validators/guestValidator");

/**
 * Create Guest
 */
router.post(
  "/",
  authenticate,
  createGuestValidator,
  create,
);

/**
 * Get All Guests
 */
router.get(
  "/",
  authenticate,
  getAll,
);

/**
 * Get Guest By ID
 */
router.get(
  "/:id",
  authenticate,
  getById,
);

/**
 * Update Guest
 */
router.put(
  "/:id",
  authenticate,
  updateGuestValidator,
  update,
);

/**
 * Delete Guest
 */
router.delete(
  "/:id",
  authenticate,
  remove,
);

module.exports = router;
