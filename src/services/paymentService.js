const mongoose = require("mongoose");
const Payment = require("../models/Payment");

/**
 * Common populate configuration.
 */
const populatePayment = (query) => {
  return query
    .populate(
      "wedding",
      "groomName brideName weddingDate budget status",
    )
    .populate(
      "booking",
      "bookingType serviceName bookingDate eventDate amount advanceAmount bookingStatus paymentStatus vendor venue",
    )
    .populate(
      "vendor",
      "vendorName category ownerName phone email priceRange rating",
    )
    .populate(
      "venue",
      "venueName venueType city state capacity pricePerDay availabilityStatus",
    )
    .populate(
      "createdBy",
      "name email role phone",
    );
};

/**
 * Validate MongoDB ObjectId.
 */
const validatePaymentId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid payment ID.");
  }
};

/**
 * Create Payment.
 */
const createPayment = async (paymentData, userId) => {
  const payment = new Payment({
    wedding: paymentData.wedding,

    booking: paymentData.booking || null,

    vendor: paymentData.vendor || null,

    venue: paymentData.venue || null,

    paymentTitle: paymentData.paymentTitle?.trim(),

    paymentType: paymentData.paymentType,

    amount: Number(paymentData.amount),

    paymentMethod: paymentData.paymentMethod,

    transactionId:
      paymentData.transactionId?.trim() || null,

    paymentStatus:
      paymentData.paymentStatus || "Pending",

    paymentDate:
      paymentData.paymentDate || new Date(),

    notes: paymentData.notes?.trim() || "",

    createdBy: userId,
  });

  await payment.save();

  return await populatePayment(
    Payment.findById(payment._id),
  );
};

/**
 * Get all payments belonging to logged-in user.
 */
const getAllPayments = async (userId) => {
  return await populatePayment(
    Payment.find({
      createdBy: userId,
    }).sort({
      paymentDate: -1,
      createdAt: -1,
    }),
  ).lean();
};

/**
 * Get payment by ID.
 */
const getPaymentById = async (
  paymentId,
  userId,
) => {
  validatePaymentId(paymentId);

  const payment = await populatePayment(
    Payment.findOne({
      _id: paymentId,
      createdBy: userId,
    }),
  );

  if (!payment) {
    throw new Error("Payment not found.");
  }

  return payment;
};

/**
 * Update Payment.
 */
const updatePayment = async (
  paymentId,
  paymentData,
  userId,
) => {
  validatePaymentId(paymentId);

  const payment = await Payment.findOne({
    _id: paymentId,
    createdBy: userId,
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  /**
   * Protected field.
   */
  delete paymentData.createdBy;

  /**
   * Update only supplied fields.
   */
  if (paymentData.wedding !== undefined) {
    payment.wedding = paymentData.wedding;
  }

  if (paymentData.booking !== undefined) {
    payment.booking = paymentData.booking || null;
  }

  if (paymentData.vendor !== undefined) {
    payment.vendor = paymentData.vendor || null;
  }

  if (paymentData.venue !== undefined) {
    payment.venue = paymentData.venue || null;
  }

  if (paymentData.paymentTitle !== undefined) {
    payment.paymentTitle =
      paymentData.paymentTitle.trim();
  }

  if (paymentData.paymentType !== undefined) {
    payment.paymentType = paymentData.paymentType;
  }

  if (paymentData.amount !== undefined) {
    const amount = Number(paymentData.amount);

    if (isNaN(amount) || amount < 1) {
      throw new Error(
        "Payment amount must be greater than zero.",
      );
    }

    payment.amount = amount;
  }

  if (paymentData.paymentMethod !== undefined) {
    payment.paymentMethod =
      paymentData.paymentMethod;
  }

  if (paymentData.transactionId !== undefined) {
    payment.transactionId =
      paymentData.transactionId?.trim() || null;
  }

  if (paymentData.paymentStatus !== undefined) {
    payment.paymentStatus =
      paymentData.paymentStatus;
  }

  if (paymentData.paymentDate !== undefined) {
    const paymentDate = new Date(
      paymentData.paymentDate,
    );

    if (isNaN(paymentDate.getTime())) {
      throw new Error("Invalid payment date.");
    }

    payment.paymentDate = paymentDate;
  }

  if (paymentData.notes !== undefined) {
    payment.notes = paymentData.notes.trim();
  }

  await payment.save();

  return await populatePayment(
    Payment.findById(payment._id),
  );
};

/**
 * Delete Payment.
 */
const deletePayment = async (
  paymentId,
  userId,
) => {
  validatePaymentId(paymentId);

  const payment = await Payment.findOneAndDelete({
    _id: paymentId,
    createdBy: userId,
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  return payment;
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
