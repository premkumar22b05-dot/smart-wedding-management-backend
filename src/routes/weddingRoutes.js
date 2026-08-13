const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
    create,
    getAll,
    getById,
    update,
    remove,
} = require("../controllers/weddingController");

const {
    createWeddingValidator,
    updateWeddingValidator,
} = require("../validators/weddingValidator");

/**
 * ============================================
 * Wedding Routes
 * ============================================
 */

/**
 * POST /api/weddings
 * Create Wedding
 */
router.post(
    "/",
    authenticate,
    createWeddingValidator,
    create,
);

/**
 * GET /api/weddings
 * Get authenticated user's weddings
 */
router.get(
    "/",
    authenticate,
    getAll,
);

/**
 * GET /api/weddings/:id
 * Get single wedding
 */
router.get(
    "/:id",
    authenticate,
    getById,
);

/**
 * PUT /api/weddings/:id
 * Update wedding
 */
router.put(
    "/:id",
    authenticate,
    updateWeddingValidator,
    update,
);

/**
 * DELETE /api/weddings/:id
 * Delete wedding
 */
router.delete(
    "/:id",
    authenticate,
    remove,
);

module.exports = router;