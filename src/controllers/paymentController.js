const { validationResult } = require("express-validator");

const paymentService = require("../services/paymentService");

/**
 * Create Payment.
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

    const payment =
      await paymentService.createPayment(
        req.body,
        req.user._id,
      );

    return res.status(201).json({
      success: true,
      message: "Payment created successfully.",
      payment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Payments.
 */
const getAll = async (req, res, next) => {
  try {
    const payments =
      await paymentService.getAllPayments(
        req.user._id,
      );

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Payment By ID.
 */
const getById = async (req, res, next) => {
  try {
    const payment =
      await paymentService.getPaymentById(
        req.params.id,
        req.user._id,
      );

    return res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Payment.
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

    const payment =
      await paymentService.updatePayment(
        req.params.id,
        req.body,
        req.user._id,
      );

    return res.status(200).json({
      success: true,
      message: "Payment updated successfully.",
      payment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Payment.
 */
const remove = async (req, res, next) => {
  try {
    await paymentService.deletePayment(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully.",
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
