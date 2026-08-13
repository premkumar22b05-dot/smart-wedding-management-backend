const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
  create,
  getAll,
  getById,
  update,
  remove,
  complete,
  dismiss,
} = require("../controllers/recommendationController");

/**
 * ============================================
 * Recommendation Routes
 * ============================================
 */

// Create Recommendation
router.post(
  "/",
  authenticate,
  create,
);

// Get All Recommendations
router.get(
  "/",
  authenticate,
  getAll,
);

// Get Recommendation By ID
router.get(
  "/:id",
  authenticate,
  getById,
);

// Update Recommendation
router.put(
  "/:id",
  authenticate,
  update,
);

// Delete Recommendation
router.delete(
  "/:id",
  authenticate,
  remove,
);

// Mark Recommendation Completed
router.patch(
  "/:id/complete",
  authenticate,
  complete,
);

// Dismiss Recommendation
router.patch(
  "/:id/dismiss",
  authenticate,
  dismiss,
);

module.exports = router;