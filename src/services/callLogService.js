const {CallLog} = require('../models/userDetails');

async function getAllCallLogs() {
  try {
    // Fetch all call logs from the database
    const callLogs = await CallLog.find();
    return callLogs;
  } catch (error) {
    throw new Error('Error fetching call logs: ' + error.message);
  }
}

async function getCallLogById(id) {
    try {
      // Fetch a specific call log by its ID
      const callLog = await CallLog.findById(id);
      return callLog;
    } catch (error) {
      throw new Error('Error fetching call log by ID: ' + error.message);
    }
  }
  
  module.exports = {
    getAllCallLogs,
    getCallLogById, 
  };