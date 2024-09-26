const userService = require('../services/user');

async function getUsers(req, res) {
    try {
        const users = await userService.getUsers();
        res.json(users);
        console.log(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getUserById(req, res, userId) {
    try {
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

module.exports = { getUsers ,getUserById};