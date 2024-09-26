const express = require('express');
const router = express.Router();
const { getCallLogs, getCallLogById } = require('../controllers/callLogController');

router.get('/logs', getCallLogs);

router.get('/logs/:logId', getCallLogById); 

module.exports = router;