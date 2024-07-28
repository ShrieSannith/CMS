const express = require('express');
const formsController = require('../controllers/forms');
const cors = require('cors');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware'); 

router.use(cors());

router.post('/forms', authMiddleware.authenticateToken, formsController.createFormsObject);

module.exports = router;
