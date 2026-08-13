const express = require("express");

const router = express.Router();


const {

    create,

    getAll,

    getById,

    update,

    remove

} = require("../controllers/notificationController");


const authenticate =
require("../middleware/authMiddleware");




// Create Notification
router.post(
    "/",
    authenticate,
    create
);



// Get All Notifications
router.get(
    "/",
    authenticate,
    getAll
);



// Get Notification By ID
router.get(
    "/:id",
    authenticate,
    getById
);



// Update Notification
router.put(
    "/:id",
    authenticate,
    update
);



// Delete Notification
router.delete(
    "/:id",
    authenticate,
    remove
);



module.exports = router;