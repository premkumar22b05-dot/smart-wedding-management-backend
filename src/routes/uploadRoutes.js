const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

router.post(
    "/",
    upload.single("image"),
    (req, res) => {

        console.log("Route Hit");
        console.log(req.file);

        res.json({
            success: true,
            message: "Multer is working",
            file: req.file
        });

    }
);

module.exports = router;