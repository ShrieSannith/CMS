const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const dotenv = require('dotenv');
const cors = require('cors');
const { CallLog } = require('./models/userDetails.js');

dotenv.config();

const router = express.Router();

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

// Middleware for parsing JSON
router.use(bodyParser.json());
router.use(cors()); // Enable CORS for all origins

// Endpoint to get active phone number
router.get('/active-phone', async (req, res) => {
    try {
        // Find call log with status 'active'
        const callLog = await CallLog.findOne({ status: 'active' });
        if (callLog) {
            // Send both phoneNumber and uniqueId to the frontend
            res.status(200).json({
                phoneNumber: callLog.phoneNumber,
                uniqueId: callLog.uniqueId // Include the uniqueId in the response
            });
        } else {
            res.status(404).send('No active phone number found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving phone number');
    }
});

// Endpoint to send SMS
router.post('/send-message', (req, res) => {
    const { to, message } = req.body;

    client.messages.create({
        body: message,
        to: to,
        from: twilioNumber,
    })
    .then((message) => res.status(200).send(`Message sent with ID: ${message.sid}`))
    .catch((error) => res.status(500).send(`Error: ${error.message}`));
});

module.exports = router; // Export the router
