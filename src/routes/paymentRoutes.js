const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/paymentController");

const {
  createPaymentValidator,
  updatePaymentValidator,
} = require("../validators/paymentValidator");

/**
 * Create Payment.
 */
router.post(
  "/",
  authenticate,
  createPaymentValidator,
  create,
);

/**
 * Get All Payments.
 */
router.get(
  "/",
  authenticate,
  getAll,
);

/**
 * Get Payment By ID.
 */
router.get(
  "/:id",
  authenticate,
  getById,
);

/**
 * Update Payment.
 */
router.patch(
  "/:id",
  authenticate,
  updatePaymentValidator,
  update,
);

/**
 * Delete Payment.
 */
router.delete(
  "/:id",
  authenticate,
  remove,
);

module.exports = router;
