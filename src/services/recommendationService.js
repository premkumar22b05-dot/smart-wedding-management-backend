const Recommendation = require("../models/Recommendation");

/**
 * ============================================
 * Create Recommendation
 * ============================================
 */
const createRecommendation = async (data, userId) => {
  const recommendation = new Recommendation({
    ...data,
    user: userId,
  });

  await recommendation.save();

  return await Recommendation.findById(recommendation._id)
    .populate("user", "name email role")
    .populate(
      "wedding",
      "groomName brideName weddingDate venue budget status",
    );
};

/**
 * ============================================
 * Get All Recommendations
 * ============================================
 */
const getAllRecommendations = async (userId) => {
  return await Recommendation.find({
    user: userId,
  })
    .populate(
      "wedding",
      "groomName brideName weddingDate venue budget status",
    )
    .sort({
      createdAt: -1,
    });
};

/**
 * ============================================
 * Get Recommendation By ID
 * ============================================
 */
const getRecommendationById = async (id, userId) => {
  const recommendation = await Recommendation.findOne({
    _id: id,
    user: userId,
  }).populate(
    "wedding",
    "groomName brideName weddingDate venue budget status",
  );

  if (!recommendation) {
    throw new Error("Recommendation not found.");
  }

  return recommendation;
};

/**
 * ============================================
 * Update Recommendation
 * ============================================
 */
const updateRecommendation = async (
  id,
  data,
  userId,
) => {
  const recommendation =
    await Recommendation.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      data,
      {
        new: true,
        runValidators: true,
      },
    ).populate(
      "wedding",
      "groomName brideName weddingDate venue budget status",
    );

  if (!recommendation) {
    throw new Error("Recommendation not found.");
  }

  return recommendation;
};

/**
 * ============================================
 * Delete Recommendation
 * ============================================
 */
const deleteRecommendation = async (
  id,
  userId,
) => {
  const recommendation =
    await Recommendation.findOneAndDelete({
      _id: id,
      user: userId,
    });

  if (!recommendation) {
    throw new Error("Recommendation not found.");
  }

  return recommendation;
};

/**
 * ============================================
 * Mark Recommendation As Completed
 * ============================================
 */
const completeRecommendation = async (
  id,
  userId,
) => {
  const recommendation =
    await Recommendation.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      {
        isCompleted: true,
        isDismissed: false,
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate(
      "wedding",
      "groomName brideName weddingDate venue budget status",
    );

  if (!recommendation) {
    throw new Error("Recommendation not found.");
  }

  return recommendation;
};

/**
 * ============================================
 * Dismiss Recommendation
 * ============================================
 */
const dismissRecommendation = async (
  id,
  userId,
) => {
  const recommendation =
    await Recommendation.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      {
        isDismissed: true,
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate(
      "wedding",
      "groomName brideName weddingDate venue budget status",
    );

  if (!recommendation) {
    throw new Error("Recommendation not found.");
  }

  return recommendation;
};

module.exports = {
  createRecommendation,
  getAllRecommendations,
  getRecommendationById,
  updateRecommendation,
  deleteRecommendation,
  completeRecommendation,
  dismissRecommendation,
};