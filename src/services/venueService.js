const mongoose = require("mongoose");
const Venue = require("../models/Venue");

/*
 * Validate MongoDB ObjectId
 */
const validateObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

/*
 * Common populate
 */
const populateVenue = (query) => {
    return query.populate(
        "createdBy",
        "name email role phone",
    );
};

/**
 * Create Venue
 */
const createVenue = async (venueData, userId) => {
    const venue = await Venue.create({
        ...venueData,
        createdBy: userId,
    });

    return await populateVenue(
        Venue.findById(venue._id),
    );
};

/**
 * Get All Venues
 */
const getAllVenues = async (userId) => {
    return await populateVenue(
        Venue.find({
            createdBy: userId,
        })
            .sort({
                createdAt: -1,
            })
            .lean(),
    );
};

/**
 * Get Venue By ID
 */
const getVenueById = async (venueId, userId) => {
    if (!validateObjectId(venueId)) {
        throw new Error("Invalid venue ID.");
    }

    const venue = await populateVenue(
        Venue.findOne({
            _id: venueId,
            createdBy: userId,
        }),
    );

    if (!venue) {
        throw new Error("Venue not found.");
    }

    return venue;
};

/**
 * Update Venue
 */
const updateVenue = async (
    venueId,
    venueData,
    userId,
) => {
    if (!validateObjectId(venueId)) {
        throw new Error("Invalid venue ID.");
    }

    const updateData = {
        ...venueData,
    };

    /*
     * Never allow ownership/system fields
     * to be changed by the client.
     */
    delete updateData.createdBy;
    delete updateData._id;
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const venue = await populateVenue(
        Venue.findOneAndUpdate(
            {
                _id: venueId,
                createdBy: userId,
            },
            updateData,
            {
                new: true,
                runValidators: true,
            },
        ),
    );

    if (!venue) {
        throw new Error("Venue not found.");
    }

    return venue;
};

/**
 * Delete Venue
 */
const deleteVenue = async (
    venueId,
    userId,
) => {
    if (!validateObjectId(venueId)) {
        throw new Error("Invalid venue ID.");
    }

    const venue = await Venue.findOneAndDelete({
        _id: venueId,
        createdBy: userId,
    });

    if (!venue) {
        throw new Error("Venue not found.");
    }

    return venue;
};

module.exports = {
    createVenue,
    getAllVenues,
    getVenueById,
    updateVenue,
    deleteVenue,
};