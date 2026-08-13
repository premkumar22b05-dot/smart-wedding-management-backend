const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/budgetController");

const {
  createBudgetValidator,
  updateBudgetValidator,
} = require("../validators/budgetValidator");

/**
 * Create Budget.
 */
router.post(
  "/",
  authenticate,
  createBudgetValidator,
  create,
);

/**
 * Get All Budgets.
 */
router.get(
  "/",
  authenticate,
  getAll,
);

/**
 * Get Budget By ID.
 */
router.get(
  "/:id",
  authenticate,
  getById,
);

/**
 * Update Budget.
 */
router.put(
  "/:id",
  authenticate,
  updateBudgetValidator,
  update,
);

/**
 * Delete Budget.
 */
router.delete(
  "/:id",
  authenticate,
  remove,
);

module.exports = router;