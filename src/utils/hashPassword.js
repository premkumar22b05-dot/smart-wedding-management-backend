const bcrypt = require("bcryptjs");

/**
 * Hash a plain text password
 * @param {string} password
 * @returns {Promise<string>}
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
};

/**
 * Compare a plain text password with a hashed password
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword
};