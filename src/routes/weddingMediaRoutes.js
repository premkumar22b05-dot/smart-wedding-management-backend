const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
    create,
    getAll,
    getById,
    update,
    remove,
    toggleFavorite,
} = require("../controllers/weddingMediaController");

/* =========================================================
   Wedding Media Routes
========================================================= */

router.post(
    "/",
    authenticate,
    create,
);

router.get(
    "/",
    authenticate,
    getAll,
);

router.get(
    "/:id",
    authenticate,
    getById,
);

router.put(
    "/:id",
    authenticate,
    update,
);

router.delete(
    "/:id",
    authenticate,
    remove,
);

router.patch(
    "/:id/favorite",
    authenticate,
    toggleFavorite,
);

module.exports = router;