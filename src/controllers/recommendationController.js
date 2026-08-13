const recommendationService = require("../services/recommendationService");

/**
 * ============================================
 * Create Recommendation
 * ============================================
 */
const create = async (req, res) => {
  try {
    const recommendation =
      await recommendationService.createRecommendation(
        req.body,
        req.user._id,
      );

    return res.status(201).json({
      success: true,
      message: "Recommendation created successfully.",
      recommendation,
    });
  } catch (error) {
    console.error(
      "CREATE RECOMMENDATION ERROR:",
      error,
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to create recommendation.",
    });
  }
};

/**
 * ============================================
 * Get All Recommendations
 * ============================================
 */
const getAll = async (req, res) => {
  try {
    const recommendations =
      await recommendationService.getAllRecommendations(
        req.user._id,
      );

    return res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    console.error(
      "GET RECOMMENDATIONS ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch recommendations.",
    });
  }
};

/**
 * ============================================
 * Get Recommendation By ID
 * ============================================
 */
const getById = async (req, res) => {
  try {
    const recommendation =
      await recommendationService.getRecommendationById(
        req.params.id,
        req.user._id,
      );

    return res.status(200).json({
      success: true,
      recommendation,
    });
  } catch (error) {
    console.error(
      "GET RECOMMENDATION ERROR:",
      error,
    );

    return res.status(404).json({
      success: false,
      message:
        error.message ||
        "Recommendation not found.",
    });
  }
};

/**
 * ============================================
 * Update Recommendation
 * ============================================
 */
const update = async (req, res) => {
  try {
    const recommendation =
      await recommendationService.updateRecommendation(
        req.params.id,
        req.body,
        req.user._id,
      );

    return res.status(200).json({
      success: true,
      message:
        "Recommendation updated successfully.",
      recommendation,
    });
  } catch (error) {
    console.error(
      "UPDATE RECOMMENDATION ERROR:",
      error,
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to update recommendation.",
    });
  }
};

/**
 * ============================================
 * Delete Recommendation
 * ============================================
 */
const remove = async (req, res) => {
  try {
    await recommendationService.deleteRecommendation(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message:
        "Recommendation deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE RECOMMENDATION ERROR:",
      error,
    );

    return res.status(404).json({
      success: false,
      message:
        error.message ||
        "Recommendation not found.",
    });
  }
};

/**
 * ============================================
 * Complete Recommendation
 * ============================================
 */
const complete = async (req, res) => {
  try {
    const recommendation =
      await recommendationService.completeRecommendation(
        req.params.id,
        req.user._id,
      );

    return res.status(200).json({
      success: true,
      message:
        "Recommendation marked as completed.",
      recommendation,
    });
  } catch (error) {
    console.error(
      "COMPLETE RECOMMENDATION ERROR:",
      error,
    );

    return res.status(404).json({
      success: false,
      message:
        error.message ||
        "Recommendation not found.",
    });
  }
};

/**
 * ============================================
 * Dismiss Recommendation
 * ============================================
 */
const dismiss = async (req, res) => {
  try {
    const recommendation =
      await recommendationService.dismissRecommendation(
        req.params.id,
        req.user._id,
      );

    return res.status(200).json({
      success: true,
      message:
        "Recommendation dismissed successfully.",
      recommendation,
    });
  } catch (error) {
    console.error(
      "DISMISS RECOMMENDATION ERROR:",
      error,
    );

    return res.status(404).json({
      success: false,
      message:
        error.message ||
        "Recommendation not found.",
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  complete,
  dismiss,
};