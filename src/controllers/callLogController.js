// controllers/callLogController.js

const callLogService = require('../services/callLogService');

async function getCallLogs(req, res) {
  try {
    const callLogs = await callLogService.getAllCallLogs();

    // Filter out logs without formData or with empty formData fields
    const filteredLogs = callLogs.filter(log => {
      return log.formData && (
        log.formData.clientName || 
        log.formData.urgency || 
        log.formData.impact || 
        log.formData.levelOfIssue || 
        log.formData.issueDescription || 
        log.formData.remarks || 
        log.formData.sorted !== undefined || 
        log.formData.priority
      );
    });

    // Map the filtered logs to the required format
    const formattedLogs = filteredLogs.map((log, index) => ({
      sNo: index + 1,
      callLogId: log._id, // Add the callLogId to the response
      priority: log.formData.priority || 'N/A',
      client: log.formData.clientName || 'N/A',
      status: log.formData.sorted ? 'Sorted' : 'Not Sorted',
      agentId: log.uniqueId ? log.uniqueId.agentId : 'N/A', // Add agentId
      agentName: log.uniqueId ? log.uniqueId.name : 'N/A',   // Add agentName
      details: 'View Details',
    }));

    res.json(formattedLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCallLogById(req, res) {
  const { logId } = req.params; // Extract logId from request parameters
  try {
    const callLog = await callLogService.getCallLogById(logId); // Pass logId to the service function
    if (!callLog) {
      return res.status(404).json({ message: 'Call log not found' });
    }
    res.json({
      callLogId: callLog._id,
      phoneNumber: callLog.phoneNumber,
      date: callLog.date,
      time: callLog.time,
      callSid: callLog.callSid,
      status: callLog.status,
      formData: callLog.formData,
      agentId: callLog.uniqueId ? callLog.uniqueId.agentId : 'N/A', // Add agentId
      agentName: callLog.uniqueId ? callLog.uniqueId.name : 'N/A',   // Add agentName
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateCallLog(req, res) {
  const { logId } = req.params;
  const { sorted } = req.body;

  try {
    const updatedCallLog = await callLogService.updateCallLog(logId, { 'formData.sorted': sorted });
    if (!updatedCallLog) {
      return res.status(404).json({ message: 'Call log not found' });
    }
    res.json(updatedCallLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getCallLogs,
  getCallLogById,
  updateCallLog,
};