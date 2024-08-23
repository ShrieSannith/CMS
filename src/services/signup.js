const { User }  = require('../models/userDetails');
const bcrypt = require('bcrypt');
async function createUser(userData) {
    const { agentId, name,  phoneNumber, email, password } = userData;
     console.log('Creating user with data:', userData);
    // Check if the email is already in use
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
        const error = new Error('Email already exists');
        error.code = 'EMAIL_EXISTS';
        throw error;
    }

    // Check if the name is already in use
    const existingUserByID = await User.findOne({ agentId });
    if (existingUserByID) {
        const error = new Error('ID already exists');
        error.code = 'ID_EXISTS';
        throw error;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const createdUser = new User({
        agentId,
        name,
        phoneNumber,
        email,
        password: hashedPassword,
        role: 'customer',
        onCall: false,
    });

    // Save the new user to the database
    const savedUser = await createdUser.save();
    return savedUser;
}

module.exports = { createUser };
