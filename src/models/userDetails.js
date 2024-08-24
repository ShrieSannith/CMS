const mongoose = require('../configurations/dbConfig');

const formDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    clientName: String,
    issueDescription: String,
    urgency: String,
    impact: String,
    levelOfIssue: String,
    remarks: String,
    sorted: Boolean,
    priority: String
});

const callLogSchema = new mongoose.Schema({
    phoneNumber: String,
    date: String,
    time: String,
    callSid: { type: String, required: true }, // Save the Twilio call SID
    uniqueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // Reference to the agent
    // formDataId: { type: mongoose.Schema.Types.ObjectId, ref: 'FormData' }, // Link to form data
    status: { type: String, enum: ["active", "completed"], default: "active" }, // Call status
    // formData: {
    //     clientName: String,
    //     urgency: String,
    //     impact: String,
    //     levelOfIssue: String,
    //     issueDescription: String,
    //     remarks: String,
    //     sorted: Boolean,
    //     priority: String,
    // },
    formData: formDataSchema // Embed the form data schema
});

const userSchema = new mongoose.Schema({
    agentId: String,
    name: String,
    phoneNumber: String,
    email: String,
    password: String,
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    onCall: { type: Boolean, default: false },
    active: { type: Boolean, default: false }
});

const CallLog = mongoose.model('CallLog', callLogSchema);
const User = mongoose.model('User', userSchema);
const FormData = mongoose.model('FormData', formDataSchema);

module.exports = { CallLog, User, FormData };