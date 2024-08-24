const formsService = require('../services/forms');

exports.createFormsObject = async (req, res) => {
    try {
        const formsData = req.body;
        const forms = await formsService.createFormsObject(formsData);
        res.status(201).json({ message: 'Forms created successfully', data: forms });
    } catch (err) {
        console.error('Error creating forms:', err);
        res.status(500).json({ message: 'Error creating forms', error: err.message });
    }
};
