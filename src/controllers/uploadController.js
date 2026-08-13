const uploadService = require("../services/uploadService");

/**
 * Upload Single Image
 */
const uploadSingle = async (req, res) => {

    console.log("========== Upload API Called ==========");
    console.log("File Received:", req.file);
    try {

        console.log("File Received:", req.file);

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Please upload an image."

            });

        }

        const file = await uploadService.uploadFile(req.file);

        res.status(201).json({

            success: true,

            message: "Image uploaded successfully.",

            file

        });

    } catch (error) {

        console.error("Upload Error:", error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



/**
 * Delete Image
 */
const deleteImage = async (req, res) => {

    try {

        const result = await uploadService.deleteFile(req.params.publicId);

        res.json({

            success: true,

            message: "Image deleted successfully.",

            result

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



module.exports = {

    uploadSingle,

    deleteImage

};