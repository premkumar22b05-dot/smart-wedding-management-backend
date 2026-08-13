const { validationResult } = require("express-validator");

const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../services/bookingService");

// ======================================================
// CREATE BOOKING
// ======================================================

const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: errors.array(),
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User authentication required.",
      });
    }

    const booking = await createBooking(
      req.body,
      req.user._id,
    );

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET ALL BOOKINGS
// ======================================================

const getAll = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User authentication required.",
      });
    }

    const bookings = await getAllBookings(
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET BOOKING BY ID
// ======================================================

const getById = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User authentication required.",
      });
    }

    const booking = await getBookingById(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// UPDATE BOOKING
// ======================================================

const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: errors.array(),
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User authentication required.",
      });
    }

    const booking = await updateBooking(
      req.params.id,
      req.body,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// DELETE BOOKING
// ======================================================

const remove = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User authentication required.",
      });
    }

    const booking = await deleteBooking(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};