const userService = require('../services/signup');

async function createUser(req, res) {
    try {
        const userData = req.body;
        const user = await userService.createUser(userData);
        res.status(201).json({ user: user, message: "User created successfully" });
    } catch (err) {
        console.log(err);

        if (err.code === 'EMAIL_EXISTS') {
            res.status(400).json({ error: 'The email address is already in use.' });
        } else if (err.code === 'ID_EXISTS') {
            res.status(400).json({ error: 'The ID is already in use.' });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = { createUser };
