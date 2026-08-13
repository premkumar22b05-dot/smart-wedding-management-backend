const { validationResult } = require("express-validator");

const checklistService = require("../services/checklistService");

/**
 * Create Checklist
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

    const checklist =
      await checklistService.createChecklist(
        req.body,
        req.user._id
      );

    return res.status(201).json({
      success: true,
      message: "Checklist created successfully.",
      checklist,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Checklists
 */
const getAll = async (req, res, next) => {
  try {
    const checklists =
      await checklistService.getAllChecklists(
        req.user._id
      );

    return res.status(200).json({
      success: true,
      count: checklists.length,
      checklists,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Checklist By ID
 */
const getById = async (req, res, next) => {
  try {
    const checklist =
      await checklistService.getChecklistById(
        req.params.id,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      checklist,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Checklist
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

    const checklist =
      await checklistService.updateChecklist(
        req.params.id,
        req.body,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message: "Checklist updated successfully.",
      checklist,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Checklist
 */
const remove = async (req, res, next) => {
  try {
    await checklistService.deleteChecklist(
      req.params.id,
      req.user._id
    );

    return res.status(200).json({
      success: true,
      message: "Checklist deleted successfully.",
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