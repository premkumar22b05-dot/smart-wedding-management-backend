const { validationResult } = require("express-validator");

const guestService = require("../services/guestService");

/**
 * Create Guest
 */
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

    const guest = await guestService.createGuest(
      req.body,
      req.user._id,
    );

    return res.status(201).json({
      success: true,
      message: "Guest created successfully.",
      guest,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Guests
 */
const getAll = async (req, res, next) => {
  try {
    const guests = await guestService.getAllGuests(
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      count: guests.length,
      guests,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Guest By ID
 */
const getById = async (req, res, next) => {
  try {
    const guest = await guestService.getGuestById(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      guest,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Guest
 */
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

    const guest = await guestService.updateGuest(
      req.params.id,
      req.body,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Guest updated successfully.",
      guest,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Guest
 */
const remove = async (req, res, next) => {
  try {
    await guestService.deleteGuest(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Guest deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};