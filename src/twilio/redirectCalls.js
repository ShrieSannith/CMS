const express = require('express');
const twilio = require('twilio');
const { CallLog, User } = require('../models/userDetails');

const router = express.Router();

// Forward Call Endpoint
router.post('/forwardCall', async (req, res) => {
    try {
        console.log('Twilio Request Body:', req.body);
        const phoneNumber = req.body.From;
        const currentDate = new Date();
        const date = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString().slice(-2);
        const formattedDate = `${date}-${month}-${year}`;
        const time = currentDate.toLocaleTimeString();

        // Find an available agent who is active and not on a call
        const agent = await User.findOneAndUpdate(
            { onCall: false, active: true },
            { $set: { onCall: true } },
            { new: true }
        );

        if (!agent) {
            console.error('No available agents found');
            return res.status(500).send('No available agents');
        }

        // Create TwiML response to forward the call to the agent's phone number
        const twimlResponse = new twilio.twiml.VoiceResponse();
        const dial = twimlResponse.dial({
            statusCallback: `${process.env.BASE_URL}/callStatusCallback`, // Status callback URL
            statusCallbackEvent: ['completed', 'failed', 'no-answer', 'busy', 'canceled'], // Listen to multiple events
            statusCallbackMethod: 'POST'
        });
        dial.number(agent.phoneNumber);

        res.type('text/xml');
        res.send(twimlResponse.toString());

        // Save call data to MongoDB
        const call = new CallLog({
            phoneNumber,
            date: formattedDate,
            time,
            callSid: req.body.CallSid, // Save the Twilio call SID
            uniqueId: agent._id // Save agent ID to identify the agent later
        });

        await call.save();
        console.log('Call data saved successfully');
    } catch (err) {
        console.error('Error handling forward call:', err);
        res.status(500).send('Error handling forward call');
    }
});

// Call Status Callback Endpoint
router.post('/callStatusCallback', async (req, res) => {
    try {
        const callSid = req.body.CallSid;
        const callStatus = req.body.CallStatus;

        console.log('Call status callback received:', req.body);

        // List of statuses indicating the call was not connected
        const notConnectedStatuses = ['completed', 'failed', 'no-answer', 'busy', 'canceled'];

        // Check if the call status indicates the call was not connected
        if (notConnectedStatuses.includes(callStatus)) {
            console.log('Call not connected');

            // Find the call log by CallSid
            const callLog = await CallLog.findOne({ callSid });
            if (callLog) {
                // Update the call log's status to completed
                await CallLog.findByIdAndUpdate(callLog._id, { status: 'completed' });
                               
                // Update the agent's onCall status to false
                await User.findByIdAndUpdate(callLog.uniqueId, { $set: { onCall: false} });
                console.log('Agent status updated to off call for agent ID:', callLog.uniqueId);
            } else {
                console.error('Call log not found for CallSid:', callSid);
            }
        }

        res.status(200).send('Callback handled successfully');
    } catch (err) {
        console.error('Error handling call status callback:', err);
        res.status(500).send('Error handling call status callback');
    }
});

module.exports = router;
