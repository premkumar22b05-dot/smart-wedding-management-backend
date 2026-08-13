const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/checklistController");

const authenticate = require("../middleware/authMiddleware");

const {
  createChecklistValidator,
  updateChecklistValidator,
} = require("../validators/checklistValidator");

/**
 * Create Checklist
 */
router.post(
  "/",
  authenticate,
  createChecklistValidator,
  create
);

/**
 * Get All Checklists
 */
router.get(
  "/",
  authenticate,
  getAll
);

/**
 * Get Checklist By ID
 */
router.get(
  "/:id",
  authenticate,
  getById
);

/**
 * Update Checklist
 */
router.put(
  "/:id",
  authenticate,
  updateChecklistValidator,
  update
);

/**
 * Delete Checklist
 */
router.delete(
  "/:id",
  authenticate,
  remove
);

module.exports = router;