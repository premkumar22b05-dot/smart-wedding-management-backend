const jwt = require("jsonwebtoken");

/**
 * Generate JWT Access Token
 * @param {Object} payload
 * @returns {String}
 */
const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

module.exports = generateToken;