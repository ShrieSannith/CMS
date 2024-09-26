const express = require('express');
const cors = require('cors');
const userController = require('../controllers/user');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

// Enable CORS for this router
router.use(cors());

// Handle GET requests to /users
router.get("/users", authMiddleware.authenticateToken, userController.getUsers, userController.getUserById);

module.exports = router;