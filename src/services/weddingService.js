const Wedding = require("../models/Wedding");

/**
 * ============================================
 * Create Wedding
 * ============================================
 */
const createWedding = async (
    weddingData,
    userId,
) => {
    const wedding = new Wedding({
        ...weddingData,
        createdBy: userId,
    });

    await wedding.save();

    return await Wedding.findById(
        wedding._id,
    ).populate(
        "createdBy",
        "-password",
    );
};

/**
 * ============================================
 * Get All Weddings
 * ============================================
 */
const getAllWeddings = async (userId) => {
    const weddings = await Wedding.find({
        createdBy: userId,
    })
        .populate(
            "createdBy",
            "-password",
        )
        .sort({
            createdAt: -1,
        });

    return weddings;
};

/**
 * ============================================
 * Get Wedding By ID
 * ============================================
 */
const getWeddingById = async (
    weddingId,
    userId,
) => {
    const wedding = await Wedding.findOne({
        _id: weddingId,
        createdBy: userId,
    }).populate(
        "createdBy",
        "-password",
    );

    if (!wedding) {
        throw new Error(
            "Wedding not found.",
        );
    }

    return wedding;
};

/**
 * ============================================
 * Update Wedding
 * ============================================
 */
const updateWedding = async (
    weddingId,
    weddingData,
    userId,
) => {
    // Prevent the client from changing
    // ownership of the wedding.
    const {
        createdBy,
        _id,
        ...safeWeddingData
    } = weddingData;

    const wedding =
        await Wedding.findOneAndUpdate(
            {
                _id: weddingId,
                createdBy: userId,
            },
            safeWeddingData,
            {
                new: true,
                runValidators: true,
            },
        ).populate(
            "createdBy",
            "-password",
        );

    if (!wedding) {
        throw new Error(
            "Wedding not found.",
        );
    }

    return wedding;
};

/**
 * ============================================
 * Delete Wedding
 * ============================================
 */
const deleteWedding = async (
    weddingId,
    userId,
) => {
    const wedding =
        await Wedding.findOneAndDelete({
            _id: weddingId,
            createdBy: userId,
        });

    if (!wedding) {
        throw new Error(
            "Wedding not found.",
        );
    }

    return wedding;
};

module.exports = {
    createWedding,
    getAllWeddings,
    getWeddingById,
    updateWedding,
    deleteWedding,
};