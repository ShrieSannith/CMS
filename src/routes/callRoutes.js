const express = require('express');
const router = express.Router();
const callController = require('../controllers/callController');
const { CallLog } = require('../models/userDetails');

// Define routes

// Start a new call log
router.post('/start', async (req, res) => {
    try {
        const callId = await callController.startCallLog(req.body);
        res.status(201).json({ callId });
    } catch (error) {
        console.error('Error starting call log:', error);
        res.status(500).json({ error: error.message });
    }
});

// Submit form data and associate it with a call log
router.post('/submit', async (req, res) => {
    try {
        const { callLogId, formData } = req.body;
        const updatedCallLog = await callController.submitFormData(callLogId, formData);
        res.status(200).json({ message: 'Form data submitted successfully', data: updatedCallLog });
    } catch (error) {
        console.error('Error submitting form data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Fetch active call log for an agent
router.get('/active/:agentId', async (req, res) => {
    try {
        const { agentId } = req.params;
        const activeCallLog = await CallLog.findOne({
            uniqueId: agentId,
            status: 'active'
        });

        if (!activeCallLog) {
            return res.status(404).json({ message: 'No active call log found for this agent' });
        }

        res.status(200).json(activeCallLog);
    } catch (error) {
        console.error('Error fetching active call log:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
