const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

/**
 * Upload File to Cloudinary
 */
const uploadFile = async (file) => {
    console.log("Starting Cloudinary upload...");

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

            {
                folder: "SWMPS",
                resource_type: "image"
            },

            (error, result) => {
                console.log("Cloudinary callback executed");

                if (error) {
                    return reject(error);
                }

                resolve({

                    url: result.secure_url,

                    publicId: result.public_id,

                    format: result.format,

                    bytes: result.bytes

                });

            }

        );

        streamifier
            .createReadStream(file.buffer)
            .pipe(stream);

    });

};



/**
 * Delete File
 */
const deleteFile = async (publicId) => {

    return await cloudinary.uploader.destroy(publicId);

};



module.exports = {

    uploadFile,

    deleteFile

};