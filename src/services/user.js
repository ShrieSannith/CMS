const User = require('../models/userDetails');

async function getUsers() {
    const users = await User.find({});
    return users;
}
async function getUserById(userId) {
    const user = await User.findById(userId);
    return user;
  }

module.exports = { getUsers ,getUserById};