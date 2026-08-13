const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    console.log("========== FILE FILTER ==========");
    console.log(file);

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;