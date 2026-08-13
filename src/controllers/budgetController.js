const { validationResult } = require("express-validator");

const {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} = require("../services/budgetService");

/**
 * Create Budget.
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

    const budget = await createBudget(
      req.body,
      req.user._id,
    );

    return res.status(201).json({
      success: true,
      message: "Budget created successfully.",
      budget,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Budgets.
 */
const getAll = async (req, res, next) => {
  try {
    const budgets = await getAllBudgets(
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      count: budgets.length,
      budgets,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Budget By ID.
 */
const getById = async (req, res, next) => {
  try {
    const budget = await getBudgetById(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      budget,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Budget.
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

    const budget = await updateBudget(
      req.params.id,
      req.body,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Budget updated successfully.",
      budget,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Budget.
 */
const remove = async (req, res, next) => {
  try {
    const budget = await deleteBudget(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Budget deleted successfully.",
      budget,
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