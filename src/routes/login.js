const express = require('express');
const cors = require('cors');
const { login, refreshToken } = require('../controllers/login');

const router = express.Router();

// Enable CORS for this router
router.use(cors());

// Handle POST requests to /login
router.post("/login", login);
router.post("/refresh-token", refreshToken);

module.exports = router;