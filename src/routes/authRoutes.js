const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
    register,
    login,
    me,
    updateProfile,
    forgotPassword,
    verifyOTP,
    resetPasswordController,
} = require("../controllers/authController");

const {
    registerValidator,
    loginValidator,
} = require("../validators/authValidator");

/* =========================================================
   Register
========================================================= */

router.post(
    "/register",
    registerValidator,
    register,
);

/* =========================================================
   Login
========================================================= */

router.post(
    "/login",
    loginValidator,
    login,
);

/* =========================================================
   Current User
========================================================= */

router.get(
    "/me",
    authenticate,
    me,
);

/* =========================================================
   Update Current User Profile
========================================================= */

router.put(
    "/profile",
    authenticate,
    updateProfile,
);

/* =========================================================
   Forgot Password
========================================================= */

router.post(
    "/forgot-password",
    forgotPassword,
);

/* =========================================================
   Verify OTP
========================================================= */

router.post(
    "/verify-otp",
    verifyOTP,
);

/* =========================================================
   Reset Password
========================================================= */

router.post(
    "/reset-password",
    resetPasswordController,
);

/* =========================================================
   Protected Route - Authentication Check
========================================================= */

router.get(
    "/profile",
    authenticate,
    (req, res) => {
        return res.status(200).json({
            success: true,
            message:
                "Protected route accessed successfully.",
            user: req.user,
        });
    },
);

module.exports = router;