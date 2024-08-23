const { CallLog, User } = require('../models/userDetails'); // Ensure User model is imported

async function getAllCallLogs() {
  try {
    // Fetch all call logs from the database and populate agent details
    const callLogs = await CallLog.find()
      .populate({
        path: 'uniqueId', // Populate the agent details
        select: 'agentId name' // Select only the fields you need
      })
      .exec();
    return callLogs;
  } catch (error) {
    throw new Error('Error fetching call logs: ' + error.message);
  }
}

async function getCallLogById(id) {
  try {
    // Fetch a specific call log by its ID and populate agent details
    const callLog = await CallLog.findById(id)
      .populate({
        path: 'uniqueId', // Populate the agent details
        select: 'agentId name' // Select only the fields you need
      })
      .exec();
    return callLog;
  } catch (error) {
    throw new Error('Error fetching call log by ID: ' + error.message);
  }
}

async function updateCallLog(logId, updatedData) {
  try {
    // Update a specific call log by its ID
    const callLog = await CallLog.findByIdAndUpdate(logId, updatedData, { new: true }).exec();
    return callLog;
  } catch (error) {
    throw new Error('Error updating call log: ' + error.message);
  }
}

module.exports = {
  getAllCallLogs,
  getCallLogById,
  updateCallLog,
};
