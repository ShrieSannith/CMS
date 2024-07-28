const authService = require('../services/login');
const { User } = require('../models/userDetails');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token, userId } = await authService.login(email, password);
    const user = await User.findById(userId);
    user.active = true;
    await user.save();
    res.json({
      token: token,
      userId: userId,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

async function refreshToken(req, res) {
  try {
    const { token } = req.body;
    const newToken = await authService.refreshToken(token);
    const user = await User.findById(req.user._id);
    user.active = false;
    await user.save();
    res.json({ newToken: newToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}


module.exports = {
  login,
  refreshToken,
};