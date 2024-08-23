const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../utils/authMiddleware');
const {User} = require('../models/userDetails'); 

async function logout(req, res) {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.active = false;
        await user.save();
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

router.post('/logout', authenticateToken, logout);

module.exports = router;
