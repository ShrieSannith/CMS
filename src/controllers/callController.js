const { CallLog } = require('../models/userDetails');

exports.startCallLog = async (callData) => {
    try {
        const callLog = new CallLog(callData);
        await callLog.save();
        return callLog._id;
    } catch (error) {
        console.error('Error starting call log:', error);
        throw new Error('Failed to start call log');
    }
};

exports.submitFormData = async (callLogId, formData) => {
    try {
        // Check if the call is still active
        const callLog = await CallLog.findById(callLogId);
        if (!callLog) {
            throw new Error('Call log not found');
        }
        if (callLog.status !== 'active') {
            throw new Error('Cannot submit form data for a completed call');
        }

        // Merge form data into the CallLog document
        const updatedCallLog = await CallLog.findByIdAndUpdate(
            callLogId,
            { 
                formData: formData,
                status: 'completed' 
            },
            { new: true } // Return the updated document
        );

        if (!updatedCallLog) {
            throw new Error('Failed to update CallLog');
        }

        return updatedCallLog;
    } catch (error) {
        console.error('Error submitting form data:', error);
        throw new Error('Failed to submit form data');
    }
};
