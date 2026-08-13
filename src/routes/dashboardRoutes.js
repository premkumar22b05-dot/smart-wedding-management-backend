const express = require("express");

const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");

const authenticate = require("../middleware/authMiddleware");

/**
 * ============================================
 * Dashboard Routes
 * ============================================
 */

/**
 * GET Dashboard Analytics
 *
 * Frontend:
 * GET /api/dashboard
 *
 * Authentication:
 * Required
 */
router.get(
    "/",
    authenticate,
    getDashboard,
);

module.exports = router;