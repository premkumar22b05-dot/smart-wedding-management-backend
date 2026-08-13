const { validationResult } = require("express-validator");

const {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} = require("../services/vendorService");

/**
 * Create Vendor
 */
const create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const vendor = await createVendor(
      req.body,
      req.user._id,
    );

    return res.status(201).json({
      success: true,
      message: "Vendor created successfully.",
      vendor,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error.message || "Failed to create vendor.",
    });
  }
};

/**
 * Get All Vendors
 */
const getAll = async (req, res) => {
  try {
    const vendors = await getAllVendors(
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch vendors.",
    });
  }
};

/**
 * Get Vendor By ID
 */
const getById = async (req, res) => {
  try {
    const vendor = await getVendorById(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error.message || "Vendor not found.",
    });
  }
};

/**
 * Update Vendor
 */
const update = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const vendor = await updateVendor(
      req.params.id,
      req.body,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Vendor updated successfully.",
      vendor,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error.message || "Failed to update vendor.",
    });
  }
};

/**
 * Delete Vendor
 */
const remove = async (req, res) => {
  try {
    await deleteVendor(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Vendor deleted successfully.",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error.message || "Failed to delete vendor.",
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};