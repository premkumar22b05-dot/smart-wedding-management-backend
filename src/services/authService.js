const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

const crypto = require("crypto");

const PasswordReset = require("../models/PasswordReset");
const { sendPasswordResetOTP } = require("../utils/emailService");

/**
 * Register User
 */
const registerUser = async (userData) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    gender,
    vendorType,
  } = userData;

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const encryptedPassword = await hashPassword(password);

  const user = new User({
    name,
    email: normalizedEmail,
    password: encryptedPassword,
    role: role || "User",
    gender: gender || undefined,
    phone: phone || "",
    vendorType: role === "Vendor" ? vendorType : undefined,
  });

  await user.save();

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return {
    success: true,
    message: "User registered successfully.",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      phone: user.phone,
      vendorType: user.vendorType,
    },
  };
};

/**
 * Login User
 */
const loginUser = async (email, password) => {
  console.log("========== LOGIN DEBUG ==========");

  const normalizedEmail = email.trim().toLowerCase();

  console.log("EMAIL RECEIVED:", normalizedEmail);

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Automatically set gender for Bride/Groom accounts
  if (!user.gender) {
    if (user.role === "Bride") {
      user.gender = "Female";
      await user.save();
    } else if (user.role === "Groom") {
      user.gender = "Male";
      await user.save();
    }
  }

  console.log("USER FOUND: YES");

  const isPasswordValid = await comparePassword(
    password,
    user.password
  );

  console.log("PASSWORD MATCH:", isPasswordValid);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return {
    success: true,
    message: "Login successful.",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      phone: user.phone,
      vendorType: user.vendorType,
    },
  };
};

/**
 * Get Current User
 */
const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found.");
  }

  return {
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      phone: user.phone,
      vendorType: user.vendorType,
    },
  };
};

/**
 * Update Current User Profile
 */
const updateCurrentUser = async (userId, userData) => {
    const {
        name,
        phone,
        gender,
        vendorType,
    } = userData;

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    if (name !== undefined) {
        const trimmedName = name.trim();

        if (!trimmedName) {
            throw new Error("Name cannot be empty.");
        }

        user.name = trimmedName;
    }

    if (phone !== undefined) {
        user.phone = phone.trim();
    }

    if (gender !== undefined) {
        if (
            gender !== "Male" &&
            gender !== "Female"
        ) {
            throw new Error("Invalid gender.");
        }

        user.gender = gender;
    }

    if (user.role === "Vendor") {
        if (vendorType !== undefined) {
            user.vendorType = vendorType;
        }
    }

    await user.save();

    return {
        success: true,
        message: "Profile updated successfully.",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            gender: user.gender,
            phone: user.phone,
            vendorType: user.vendorType,
        },
    };
};

/**
 * Send Password Reset OTP
 */
const sendPasswordResetCode = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    return {
      success: true,
      message:
        "If an account exists with this email, an OTP has been sent.",
    };
  }

  await PasswordReset.deleteMany({
    email: normalizedEmail,
  });

  const otp = crypto.randomInt(100000, 1000000).toString();

  const otpHash = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await PasswordReset.create({
    email: normalizedEmail,
    otpHash,
    expiresAt,
  });

  await sendPasswordResetOTP(normalizedEmail, otp);

  return {
    success: true,
    message:
      "If an account exists with this email, an OTP has been sent.",
  };
};

/**
 * Verify Password Reset OTP
 */
const verifyPasswordResetOTP = async (email, otp) => {
  const normalizedEmail = email.trim().toLowerCase();

  const resetRequest = await PasswordReset.findOne({
    email: normalizedEmail,
  });

  if (!resetRequest) {
    throw new Error("Invalid or expired OTP.");
  }

  if (resetRequest.expiresAt.getTime() < Date.now()) {
    await PasswordReset.deleteOne({
      _id: resetRequest._id,
    });

    throw new Error("OTP has expired.");
  }

  if (resetRequest.attempts >= 5) {
    await PasswordReset.deleteOne({
      _id: resetRequest._id,
    });

    throw new Error(
      "Too many OTP attempts. Please request a new OTP."
    );
  }

  const otpHash = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  if (otpHash !== resetRequest.otpHash) {
    resetRequest.attempts += 1;

    await resetRequest.save();

    throw new Error("Invalid OTP.");
  }

  return {
    success: true,
    message: "OTP verified successfully.",
  };
};

/**
 * Reset Password
 */
const resetPassword = async (email, otp, newPassword) => {
  const normalizedEmail = email.trim().toLowerCase();

  const resetRequest = await PasswordReset.findOne({
    email: normalizedEmail,
  });

  if (!resetRequest) {
    throw new Error("Invalid or expired OTP.");
  }

  if (resetRequest.expiresAt.getTime() < Date.now()) {
    await PasswordReset.deleteOne({
      _id: resetRequest._id,
    });

    throw new Error("OTP has expired.");
  }

  const otpHash = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  if (otpHash !== resetRequest.otpHash) {
    throw new Error("Invalid OTP.");
  }

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    throw new Error("Unable to reset password.");
  }

  user.password = await hashPassword(newPassword);

  await user.save();

  await PasswordReset.deleteOne({
    _id: resetRequest._id,
  });

  return {
    success: true,
    message: "Password reset successfully.",
  };
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    updateCurrentUser,
    sendPasswordResetCode,
    verifyPasswordResetOTP,
    resetPassword,
};