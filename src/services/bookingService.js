const mongoose = require("mongoose");
const Booking = require("../models/Booking");

/**
 * Common populate configuration.
 */
const populateBooking = (query) => {
  return query
    .populate(
      "wedding",
      "groomName brideName weddingDate budget status",
    )
    .populate(
      "createdBy",
      "name email role",
    )
    .populate(
      "vendor",
      "vendorName category ownerName phone email priceRange rating",
    )
    .populate(
      "venue",
      "venueName venueType city state capacity pricePerDay availabilityStatus",
    );
};

/**
 * Validate MongoDB ObjectId.
 */
const validateBookingId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid booking ID.");
  }
};

/**
 * Calculate payment status.
 */
const calculatePaymentStatus = (amount, paidAmount) => {
  const total = Number(amount || 0);
  const paid = Number(paidAmount || 0);

  if (paid <= 0) {
    return "Pending";
  }

  if (paid >= total && total > 0) {
    return "Paid";
  }

  return "Partial";
};

/**
 * Create Booking.
 */
const createBooking = async (data, userId) => {
  const amount = Number(data.amount || 0);
  const advanceAmount = Number(data.advanceAmount || 0);
  const paidAmount = Number(
    data.paymentDetails?.paidAmount || 0,
  );

  if (advanceAmount > amount) {
    throw new Error(
      "Advance amount cannot exceed total amount.",
    );
  }

  if (paidAmount > amount) {
    throw new Error(
      "Paid amount cannot exceed total amount.",
    );
  }

  const booking = new Booking({
    wedding: data.wedding,
    createdBy: userId,

    vendor: data.vendor || null,
    venue: data.venue || null,

    bookingType: data.bookingType,
    serviceName: data.serviceName?.trim(),

    bookingDate: data.bookingDate,
    eventDate: data.eventDate,

    amount,
    advanceAmount,

    bookingStatus: data.bookingStatus || "Requested",

    paymentStatus: calculatePaymentStatus(
      amount,
      paidAmount,
    ),

    paymentDetails: {
      transactionId:
        data.paymentDetails?.transactionId?.trim() || "",

      paidAmount,

      paymentDate:
        data.paymentDetails?.paymentDate || null,
    },

    notes: data.notes?.trim() || "",
  });

  await booking.save();

  return await populateBooking(
    Booking.findById(booking._id),
  );
};

/**
 * Get all bookings for the logged-in user.
 */
const getAllBookings = async (userId) => {
  return await populateBooking(
    Booking.find({
      createdBy: userId,
    }).sort({
      createdAt: -1,
    }),
  );
};

/**
 * Get booking by ID.
 */
const getBookingById = async (id, userId) => {
  validateBookingId(id);

  const booking = await populateBooking(
    Booking.findOne({
      _id: id,
      createdBy: userId,
    }),
  );

  if (!booking) {
    throw new Error("Booking not found.");
  }

  return booking;
};

/**
 * Update booking.
 */
const updateBooking = async (id, data, userId) => {
  validateBookingId(id);

  const existingBooking = await Booking.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!existingBooking) {
    throw new Error("Booking not found.");
  }

  /**
   * Protected fields.
   */
  delete data.createdBy;
  delete data.paymentStatus;

  /**
   * Wedding.
   */
  if (data.wedding !== undefined) {
    existingBooking.wedding = data.wedding;
  }

  /**
   * Vendor / Venue.
   */
  if (data.vendor !== undefined) {
    existingBooking.vendor = data.vendor || null;
  }

  if (data.venue !== undefined) {
    existingBooking.venue = data.venue || null;
  }

  /**
   * Basic fields.
   */
  if (data.bookingType !== undefined) {
    existingBooking.bookingType = data.bookingType;
  }

  if (data.serviceName !== undefined) {
    existingBooking.serviceName = data.serviceName.trim();
  }

  if (data.bookingStatus !== undefined) {
    existingBooking.bookingStatus = data.bookingStatus;
  }

  if (data.notes !== undefined) {
    existingBooking.notes = data.notes.trim();
  }

  /**
   * Dates.
   */
  const bookingDate =
    data.bookingDate !== undefined
      ? new Date(data.bookingDate)
      : existingBooking.bookingDate;

  const eventDate =
    data.eventDate !== undefined
      ? new Date(data.eventDate)
      : existingBooking.eventDate;

  if (isNaN(bookingDate.getTime())) {
    throw new Error("Invalid booking date.");
  }

  if (isNaN(eventDate.getTime())) {
    throw new Error("Invalid event date.");
  }

  if (eventDate < bookingDate) {
    throw new Error(
      "Event date cannot be earlier than booking date.",
    );
  }

  existingBooking.bookingDate = bookingDate;
  existingBooking.eventDate = eventDate;

  /**
   * Total amount.
   */
  const totalAmount =
    data.amount !== undefined
      ? Number(data.amount)
      : Number(existingBooking.amount);

  if (isNaN(totalAmount) || totalAmount < 0) {
    throw new Error(
      "Total amount must be a valid non-negative number.",
    );
  }

  existingBooking.amount = totalAmount;

  /**
   * Advance amount.
   */
  const advanceAmount =
    data.advanceAmount !== undefined
      ? Number(data.advanceAmount)
      : Number(existingBooking.advanceAmount || 0);

  if (isNaN(advanceAmount) || advanceAmount < 0) {
    throw new Error(
      "Advance amount must be a valid non-negative number.",
    );
  }

  if (advanceAmount > totalAmount) {
    throw new Error(
      "Advance amount cannot exceed total amount.",
    );
  }

  existingBooking.advanceAmount = advanceAmount;

  /**
   * Payment details.
   */
  const currentPayment =
    existingBooking.paymentDetails || {};

  const incomingPayment =
    data.paymentDetails || {};

  const paidAmount =
    incomingPayment.paidAmount !== undefined
      ? Number(incomingPayment.paidAmount)
      : Number(currentPayment.paidAmount || 0);

  if (isNaN(paidAmount) || paidAmount < 0) {
    throw new Error(
      "Paid amount must be a valid non-negative number.",
    );
  }

  if (paidAmount > totalAmount) {
    throw new Error(
      "Paid amount cannot exceed total amount.",
    );
  }

  const transactionId =
    incomingPayment.transactionId !== undefined
      ? incomingPayment.transactionId.trim()
      : currentPayment.transactionId || "";

  const paymentDate =
    incomingPayment.paymentDate !== undefined
      ? incomingPayment.paymentDate
      : currentPayment.paymentDate || null;

  existingBooking.paymentDetails = {
    transactionId,
    paidAmount,
    paymentDate,
  };

  /**
   * Always calculate payment status from payment details.
   */
  existingBooking.paymentStatus =
    calculatePaymentStatus(
      totalAmount,
      paidAmount,
    );

  await existingBooking.save();

  return await populateBooking(
    Booking.findById(existingBooking._id),
  );
};

/**
 * Delete booking.
 */
const deleteBooking = async (id, userId) => {
  validateBookingId(id);

  const booking = await Booking.findOneAndDelete({
    _id: id,
    createdBy: userId,
  });

  if (!booking) {
    throw new Error("Booking not found.");
  }

  return booking;
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
