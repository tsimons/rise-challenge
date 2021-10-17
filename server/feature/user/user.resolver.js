const User = require("./user.model");

/**
 * Get a single user
 * Creating this to always return the one user in the db
 *
 * @param {String} id
 * @returns {User}
 */
exports.getUser = async (id) => await User.findOne();

/**
 * Get many users
 * There will always be one
 *
 * @returns {[User]}
 */
exports.getUsers = async () => (await User.find()).toArray();
