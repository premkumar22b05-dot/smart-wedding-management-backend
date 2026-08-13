const express = require("express");

const router = express.Router();


const {

    create,

    getAll,

    getById,

    update,

    remove

} = require("../controllers/weddingInvitationController");



const authMiddleware = require("../middleware/authMiddleware");


const {

    createWeddingInvitationValidator,

    updateWeddingInvitationValidator

} = require("../validators/weddingInvitationValidator");





router.post(

    "/",

    authMiddleware,

    createWeddingInvitationValidator,

    create

);





router.get(

    "/",

    authMiddleware,

    getAll

);





router.get(

    "/:id",

    authMiddleware,

    getById

);





router.put(

    "/:id",

    authMiddleware,

    updateWeddingInvitationValidator,

    update

);





router.delete(

    "/:id",

    authMiddleware,

    remove

);





module.exports = router;