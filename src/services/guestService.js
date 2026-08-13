const mongoose = require("mongoose");
const Guest = require("../models/Guest");

/**
 * Validate MongoDB ObjectId.
 */
const validateGuestId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid guest ID.");
  }
};

/**
 * Common populate configuration.
 */
const populateGuest = (query) => {
  return query
    .populate(
      "wedding",
      "groomName brideName weddingDate budget status",
    )
    .populate(
      "createdBy",
      "name email role phone",
    );
};

/**
 * Create Guest
 */
const createGuest = async (data, userId) => {
  const guest = new Guest({
    wedding: data.wedding,
    createdBy: userId,

    guestName: data.guestName,
    phone: data.phone,
    email: data.email || "",

    relation: data.relation,
    guestType: data.guestType || "General",

    invitationStatus:
      data.invitationStatus || "Not Sent",

    attendanceStatus:
      data.attendanceStatus || "Pending",

    foodPreference:
      data.foodPreference || "Vegetarian",

    numberOfGuests:
      Number(data.numberOfGuests || 1),

    notes: data.notes || "",
  });

  await guest.save();

  return await populateGuest(
    Guest.findById(guest._id),
  );
};

/**
 * Get All Guests
 */
const getAllGuests = async (userId) => {
  return await populateGuest(
    Guest.find({
      createdBy: userId,
    }).sort({
      createdAt: -1,
    }),
  );
};

/**
 * Get Guest By ID
 */
const getGuestById = async (id, userId) => {
  validateGuestId(id);

  const guest = await populateGuest(
    Guest.findOne({
      _id: id,
      createdBy: userId,
    }),
  );

  if (!guest) {
    throw new Error("Guest not found.");
  }

  return guest;
};

/**
 * Update Guest
 */
const updateGuest = async (
  id,
  data,
  userId,
) => {
  validateGuestId(id);

  const guest = await Guest.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!guest) {
    throw new Error("Guest not found.");
  }

  // Protected fields
  delete data.createdBy;
  delete data._id;

  // Wedding
  if (data.wedding !== undefined) {
    guest.wedding = data.wedding;
  }

  // Basic information
  if (data.guestName !== undefined) {
    guest.guestName = data.guestName.trim();
  }

  if (data.phone !== undefined) {
    guest.phone = data.phone.trim();
  }

  if (data.email !== undefined) {
    guest.email = data.email.trim().toLowerCase();
  }

  if (data.relation !== undefined) {
    guest.relation = data.relation;
  }

  if (data.guestType !== undefined) {
    guest.guestType = data.guestType;
  }

  // Invitation / attendance
  if (data.invitationStatus !== undefined) {
    guest.invitationStatus = data.invitationStatus;
  }

  if (data.attendanceStatus !== undefined) {
    guest.attendanceStatus = data.attendanceStatus;
  }

  // Food
  if (data.foodPreference !== undefined) {
    guest.foodPreference = data.foodPreference;
  }

  // Number of guests
  if (data.numberOfGuests !== undefined) {
    const numberOfGuests = Number(
      data.numberOfGuests,
    );

    if (
      isNaN(numberOfGuests) ||
      numberOfGuests < 1
    ) {
      throw new Error(
        "Number of guests must be at least 1.",
      );
    }

    guest.numberOfGuests = numberOfGuests;
  }

  // Notes
  if (data.notes !== undefined) {
    guest.notes = data.notes.trim();
  }

  await guest.save();

  return await populateGuest(
    Guest.findById(guest._id),
  );
};

/**
 * Delete Guest
 */
const deleteGuest = async (id, userId) => {
  validateGuestId(id);

  const guest = await Guest.findOneAndDelete({
    _id: id,
    createdBy: userId,
  });

  if (!guest) {
    throw new Error("Guest not found.");
  }

  return guest;
};

module.exports = {
  createGuest,
  getAllGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
};