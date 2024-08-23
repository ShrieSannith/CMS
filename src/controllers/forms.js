const formsService = require('../services/forms');

async function createFormsObject(req, res) {
  try {
    const formsData = req.body;
    const forms = await formsService.createFormsObject(formsData);
    res.status(201).json({ message: "Forms created successfully", data: forms });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating forms", error: err.message });
  }
}

module.exports = { createFormsObject };
