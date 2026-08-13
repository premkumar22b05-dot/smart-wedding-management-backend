const WeddingMedia = require("../models/WeddingMedia");
const Wedding = require("../models/Wedding");

/* =========================================================
   Get User Wedding
========================================================= */

const getUserWedding = async (userId) => {
    const wedding = await Wedding.findOne({
        createdBy: userId,
    });

    if (!wedding) {
        throw new Error("Wedding not found.");
    }

    return wedding;
};

/* =========================================================
   Create Media
========================================================= */

const createMedia = async (userId, mediaData) => {
    const wedding = await getUserWedding(userId);

    const media = new WeddingMedia({
        ...mediaData,
        wedding: wedding._id,
        uploadedBy: userId,
    });

    await media.save();

    return await WeddingMedia.findById(media._id)
        .populate("wedding")
        .populate("uploadedBy", "name email role");
};

/* =========================================================
   Get All Media
========================================================= */

const getAllMedia = async (userId) => {
    const wedding = await getUserWedding(userId);

    return await WeddingMedia.find({
        wedding: wedding._id,
    })
        .populate("uploadedBy", "name email role")
        .sort({
            createdAt: -1,
        });
};

/* =========================================================
   Get Media By ID
========================================================= */

const getMediaById = async (userId, mediaId) => {
    const wedding = await getUserWedding(userId);

    const media = await WeddingMedia.findOne({
        _id: mediaId,
        wedding: wedding._id,
    }).populate("uploadedBy", "name email role");

    if (!media) {
        throw new Error("Media not found.");
    }

    return media;
};

/* =========================================================
   Update Media
========================================================= */

const updateMedia = async (
    userId,
    mediaId,
    mediaData,
) => {
    const wedding = await getUserWedding(userId);

    const media = await WeddingMedia.findOneAndUpdate(
        {
            _id: mediaId,
            wedding: wedding._id,
        },
        mediaData,
        {
            new: true,
            runValidators: true,
        },
    ).populate("uploadedBy", "name email role");

    if (!media) {
        throw new Error("Media not found.");
    }

    return media;
};

/* =========================================================
   Delete Media
========================================================= */

const deleteMedia = async (userId, mediaId) => {
    const wedding = await getUserWedding(userId);

    const media = await WeddingMedia.findOneAndDelete({
        _id: mediaId,
        wedding: wedding._id,
    });

    if (!media) {
        throw new Error("Media not found.");
    }

    return media;
};

/* =========================================================
   Toggle Favorite
========================================================= */

const toggleFavorite = async (
    userId,
    mediaId,
) => {
    const wedding = await getUserWedding(userId);

    const media = await WeddingMedia.findOne({
        _id: mediaId,
        wedding: wedding._id,
    });

    if (!media) {
        throw new Error("Media not found.");
    }

    media.isFavorite = !media.isFavorite;

    await media.save();

    return media;
};

module.exports = {
    createMedia,
    getAllMedia,
    getMediaById,
    updateMedia,
    deleteMedia,
    toggleFavorite,
};