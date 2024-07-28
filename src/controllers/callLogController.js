const callLogService = require('../services/callLogService');

async function getCallLogs(req, res) {
  try {
    const callLogs = await callLogService.getAllCallLogs();
    // Map the call logs to the required format
    const formattedLogs = callLogs.map((log, index) => ({
      sNo: index + 1,
      callLogId: log._id, // Add the callLogId to the response
      priority: log.formData.priority || 'N/A',
      client: log.formData.clientName || 'N/A',
      status: log.formData.sorted ? 'Sorted' : 'Not Sorted',
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
    res.json(callLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getCallLogs,
  getCallLogById,
};
