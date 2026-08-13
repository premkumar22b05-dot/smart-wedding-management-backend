const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/vendorController");

const authenticate = require("../middleware/authMiddleware");

const {
  createVendorValidator,
  updateVendorValidator,
} = require("../validators/vendorValidator");

/**
 * ================================
 * Vendor Routes
 * ================================
 */

/**
 * Create Vendor
 */
router.post(
  "/",
  authenticate,
  createVendorValidator,
  create,
);

/**
 * Get All Vendors
 */
router.get(
  "/",
  authenticate,
  getAll,
);

/**
 * Get Vendor By ID
 */
router.get(
  "/:id",
  authenticate,
  getById,
);

/**
 * Update Vendor
 */
router.put(
  "/:id",
  authenticate,
  updateVendorValidator,
  update,
);

/**
 * Delete Vendor
 */
router.delete(
  "/:id",
  authenticate,
  remove,
);

module.exports = router;