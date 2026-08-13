const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {

    try {

        console.log("========== AUTH DEBUG ==========");
        console.log("Cookie Header:", req.headers.cookie);
        console.log("Cookies:", req.cookies);

       const token = req.cookies?.token;

        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token"
            });
        }

        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded:", decoded);

        const user = await User.findById(decoded.id);

        console.log("User:", user);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (err) {

        console.log("AUTH ERROR:");
        console.log(err);

        return res.status(401).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = authenticate;