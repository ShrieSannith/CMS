const { FormData } = require('../models/userDetails');

exports.createFormsObject = async (formsData) => {
    const {
        userId,
        clientName,
        urgency,
        impact,
        levelOfIssue,
        issueDescription,
        remarks,
        sorted,
        priority
    } = formsData;

    // Create a new forms object
    const formObject = new FormData({
        userId,
        clientName,
        urgency,
        impact,
        levelOfIssue,
        issueDescription,
        remarks,
        sorted,
        priority
    });

    try {
        const savedForms = await formObject.save();
        return savedForms;
    } catch (error) {
        console.error('Error saving form data:', error);
        throw new Error('Error saving form data');
    }
};
