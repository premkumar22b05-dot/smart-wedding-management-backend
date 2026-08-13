const mongoose = require("mongoose");
const Checklist = require("../models/Checklist");

/**
 * Common populate configuration.
 */
const populateChecklist = (query) => {
  return query
    .populate(
      "wedding",
      "groomName brideName weddingDate budget status"
    )
    .populate(
      "createdBy",
      "name email role"
    );
};

/**
 * Validate MongoDB ObjectId.
 */
const validateChecklistId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid checklist ID.");
  }
};

/**
 * Create Checklist
 */
const createChecklist = async (data, userId) => {
  const checklist = new Checklist({
    wedding: data.wedding,
    taskName: data.taskName,
    category: data.category,
    priority: data.priority || "Medium",
    dueDate: data.dueDate || null,
    status: data.status || "Pending",
    notes: data.notes || "",
    createdBy: userId,
  });

  await checklist.save();

  return await populateChecklist(
    Checklist.findById(checklist._id)
  );
};

/**
 * Get All Checklists
 */
const getAllChecklists = async (userId) => {
  return await populateChecklist(
    Checklist.find({
      createdBy: userId,
    }).sort({
      createdAt: -1,
    })
  );
};

/**
 * Get Checklist By ID
 */
const getChecklistById = async (id, userId) => {
  validateChecklistId(id);

  const checklist = await populateChecklist(
    Checklist.findOne({
      _id: id,
      createdBy: userId,
    })
  );

  if (!checklist) {
    throw new Error("Checklist not found.");
  }

  return checklist;
};

/**
 * Update Checklist
 */
const updateChecklist = async (id, data, userId) => {
  validateChecklistId(id);

  const checklist = await Checklist.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!checklist) {
    throw new Error("Checklist not found.");
  }

  // Protected fields
  delete data.createdBy;
  delete data._id;

  /**
   * Wedding
   */
  if (data.wedding !== undefined) {
    checklist.wedding = data.wedding;
  }

  /**
   * Task name
   */
  if (data.taskName !== undefined) {
    checklist.taskName = data.taskName.trim();
  }

  /**
   * Category
   */
  if (data.category !== undefined) {
    checklist.category = data.category;
  }

  /**
   * Priority
   */
  if (data.priority !== undefined) {
    checklist.priority = data.priority;
  }

  /**
   * Due date
   */
  if (data.dueDate !== undefined) {
    if (data.dueDate === null || data.dueDate === "") {
      checklist.dueDate = null;
    } else {
      const dueDate = new Date(data.dueDate);

      if (isNaN(dueDate.getTime())) {
        throw new Error("Invalid due date.");
      }

      checklist.dueDate = dueDate;
    }
  }

  /**
   * Status
   */
  if (data.status !== undefined) {
    checklist.status = data.status;
  }

  /**
   * Notes
   */
  if (data.notes !== undefined) {
    checklist.notes = data.notes.trim();
  }

  await checklist.save();

  return await populateChecklist(
    Checklist.findById(checklist._id)
  );
};

/**
 * Delete Checklist
 */
const deleteChecklist = async (id, userId) => {
  validateChecklistId(id);

  const checklist = await Checklist.findOneAndDelete({
    _id: id,
    createdBy: userId,
  });

  if (!checklist) {
    throw new Error("Checklist not found.");
  }

  return checklist;
};

module.exports = {
  createChecklist,
  getAllChecklists,
  getChecklistById,
  updateChecklist,
  deleteChecklist,
};