const mongoose = require("mongoose");
const Budget = require("../models/Budget");

/**
 * Common populate configuration.
 */
const populateBudget = (query) => {
  return query
    .populate(
      "wedding",
      "groomName brideName weddingDate budget status",
    )
    .populate(
      "createdBy",
      "name email role",
    );
};

/**
 * Validate MongoDB ObjectId.
 */
const validateBudgetId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid budget ID.");
  }
};

/**
 * Validate and calculate budget amounts.
 */
const validateAmounts = (allocatedAmount, spentAmount) => {
  const allocated = Number(allocatedAmount || 0);
  const spent = Number(spentAmount || 0);

  if (Number.isNaN(allocated) || allocated < 0) {
    throw new Error(
      "Allocated amount must be a valid non-negative number.",
    );
  }

  if (Number.isNaN(spent) || spent < 0) {
    throw new Error(
      "Spent amount must be a valid non-negative number.",
    );
  }

  if (spent > allocated) {
    throw new Error(
      "Spent amount cannot exceed allocated amount.",
    );
  }

  return {
    allocated,
    spent,
    remaining: allocated - spent,
  };
};

/**
 * Create Budget.
 */
const createBudget = async (data, userId) => {
  const amounts = validateAmounts(
    data.allocatedAmount,
    data.spentAmount || 0,
  );

  const budget = new Budget({
    wedding: data.wedding,

    category: data.category,

    description: data.description
      ? data.description.trim()
      : "",

    allocatedAmount: amounts.allocated,

    spentAmount: amounts.spent,

    remainingAmount: amounts.remaining,

    createdBy: userId,
  });

  await budget.save();

  return await populateBudget(
    Budget.findById(budget._id),
  );
};

/**
 * Get All Budgets.
 */
const getAllBudgets = async (userId) => {
  return await populateBudget(
    Budget.find({
      createdBy: userId,
    }).sort({
      createdAt: -1,
    }),
  );
};

/**
 * Get Budget By ID.
 */
const getBudgetById = async (id, userId) => {
  validateBudgetId(id);

  const budget = await populateBudget(
    Budget.findOne({
      _id: id,
      createdBy: userId,
    }),
  );

  if (!budget) {
    throw new Error("Budget not found.");
  }

  return budget;
};

/**
 * Update Budget.
 */
const updateBudget = async (id, data, userId) => {
  validateBudgetId(id);

  const budget = await Budget.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!budget) {
    throw new Error("Budget not found.");
  }

  /**
   * Protected fields.
   */
  delete data.createdBy;
  delete data.remainingAmount;

  /**
   * Wedding.
   */
  if (data.wedding !== undefined) {
    budget.wedding = data.wedding;
  }

  /**
   * Category.
   */
  if (data.category !== undefined) {
    budget.category = data.category;
  }

  /**
   * Description.
   */
  if (data.description !== undefined) {
    budget.description = data.description.trim();
  }

  /**
   * Amounts.
   */
  const allocatedAmount =
    data.allocatedAmount !== undefined
      ? Number(data.allocatedAmount)
      : Number(budget.allocatedAmount);

  const spentAmount =
    data.spentAmount !== undefined
      ? Number(data.spentAmount)
      : Number(budget.spentAmount || 0);

  const amounts = validateAmounts(
    allocatedAmount,
    spentAmount,
  );

  budget.allocatedAmount = amounts.allocated;
  budget.spentAmount = amounts.spent;
  budget.remainingAmount = amounts.remaining;

  await budget.save();

  return await populateBudget(
    Budget.findById(budget._id),
  );
};

/**
 * Delete Budget.
 */
const deleteBudget = async (id, userId) => {
  validateBudgetId(id);

  const budget = await Budget.findOneAndDelete({
    _id: id,
    createdBy: userId,
  });

  if (!budget) {
    throw new Error("Budget not found.");
  }

  return budget;
};

module.exports = {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};