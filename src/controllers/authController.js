const { validationResult } = require("express-validator");

const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
  sendPasswordResetCode,
  verifyPasswordResetOTP,
  resetPassword,
} = require("../services/authService");

/* =========================================================
   Register Controller
========================================================= */

const register = async (req, res) => {
  try {
    console.log("========== REGISTER DEBUG ==========");
    console.log("REGISTER BODY:", req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("REGISTER VALIDATION ERRORS:", errors.array());

      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const result = await registerUser(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: result.user,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Registration failed.",
    });
  }
};

/* =========================================================
   Login Controller
========================================================= */

const login = async (req, res) => {
  try {
    console.log("========== LOGIN DEBUG ==========");
    console.log("LOGIN BODY:", req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("LOGIN TOKEN CREATED:", result.token ? "YES" : "NO");

    console.log("LOGIN COOKIE SET");

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: result.user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(401).json({
      success: false,
      message: error.message || "Login failed.",
    });
  }
};

/* =========================================================
   Get Current Logged-in User
========================================================= */

const me = async (req, res) => {
  try {
    const result = await getCurrentUser(req.user._id);

    return res.status(200).json(result);
  } catch (error) {
    console.error("GET CURRENT USER ERROR:", error);

    return res.status(404).json({
      success: false,
      message: error.message || "User not found.",
    });
  }
};

/* =========================================================
   Update Current User Profile
========================================================= */

const updateProfile = async (req, res) => {
  try {
    const result = await updateCurrentUser(req.user._id, req.body);

    return res.status(200).json(result);
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update profile.",
    });
  }
};

/* =========================================================
   Forgot Password - Send OTP
========================================================= */

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const result = await sendPasswordResetCode(email);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   Verify Password Reset OTP
========================================================= */

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const result = await verifyPasswordResetOTP(email, otp);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   Reset Password
========================================================= */

const resetPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, new password and confirm password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const result = await resetPassword(email, otp, newPassword);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   EXPORTS
========================================================= */

module.exports = {
  register,
  login,
  me,
  updateProfile,
  forgotPassword,
  verifyOTP,
  resetPasswordController,
};
