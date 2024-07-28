const { FormData, CallLog } = require('../models/userDetails');

async function createFormsObject(formsData) {
const {
userId,
clientName,
issueDescription,
urgency,
impact,
levelOfIssue,
remarks,
sorted,
priority
} = formsData;

// Create a new forms object
const formObject = new FormData({
userId,
clientName,
issueDescription,
urgency,
impact,
levelOfIssue,
remarks,
sorted,
priority
});


// console.log(formObject);

try {
const savedForms = await formObject.save();
return savedForms;
} catch (error) {
console.error('Error saving form data:', error);
throw new Error('Error saving form data');
}
}

module.exports = { createFormsObject };