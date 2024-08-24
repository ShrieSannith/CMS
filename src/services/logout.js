const express = require('express');
const router = express.Router();
const { User } = require('../models/userDetails');

async function logout(req, res) {
    try {
        const { userId } = req.body; // Get userId from request body
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.active = false; // Set user.active to false
        await user.save();

        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

router.post('/logout', logout); // Remove authenticateToken middleware

module.exports = router;