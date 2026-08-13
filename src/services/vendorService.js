const mongoose = require("mongoose");
const Vendor = require("../models/Vendor");

/* =========================================================
   Common Vendor Populate
========================================================= */

const populateVendor = (query) => {
  return query.populate(
    "addedBy",
    "name email role phone",
  );
};

/* =========================================================
   Create Vendor
========================================================= */

const createVendor = async (vendorData, userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID.");
  }

  const vendor = await Vendor.create({
    ...vendorData,
    addedBy: userId,
  });

  return await populateVendor(
    Vendor.findById(vendor._id),
  );
};

/* =========================================================
   Get All Vendors
   IMPORTANT:
   All authenticated users can VIEW vendors.
========================================================= */

const getAllVendors = async () => {
  return await populateVendor(
    Vendor.find({})
      .sort({
        createdAt: -1,
      })
      .lean(),
  );
};

/* =========================================================
   Get Vendor By ID
   All authenticated users can VIEW a vendor.
========================================================= */

const getVendorById = async (vendorId) => {
  if (!mongoose.Types.ObjectId.isValid(vendorId)) {
    throw new Error("Invalid vendor ID.");
  }

  const vendor = await populateVendor(
    Vendor.findById(vendorId),
  );

  if (!vendor) {
    throw new Error("Vendor not found.");
  }

  return vendor;
};

/* =========================================================
   Update Vendor
   Only the owner can update.
========================================================= */

const updateVendor = async (
  vendorId,
  vendorData,
  userId,
) => {
  if (!mongoose.Types.ObjectId.isValid(vendorId)) {
    throw new Error("Invalid vendor ID.");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID.");
  }

  const updateData = {
    ...vendorData,
  };

  /* Prevent ownership or ID manipulation */
  delete updateData.addedBy;
  delete updateData._id;
  delete updateData.id;

  const vendor = await populateVendor(
    Vendor.findOneAndUpdate(
      {
        _id: vendorId,
        addedBy: userId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    ),
  );

  if (!vendor) {
    throw new Error(
      "Vendor not found or you are not authorized to update this vendor.",
    );
  }

  return vendor;
};

/* =========================================================
   Delete Vendor
   Only the owner can delete.
========================================================= */

const deleteVendor = async (
  vendorId,
  userId,
) => {
  if (!mongoose.Types.ObjectId.isValid(vendorId)) {
    throw new Error("Invalid vendor ID.");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID.");
  }

  const vendor = await Vendor.findOneAndDelete({
    _id: vendorId,
    addedBy: userId,
  });

  if (!vendor) {
    throw new Error(
      "Vendor not found or you are not authorized to delete this vendor.",
    );
  }

  return vendor;
};

module.exports = {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
};