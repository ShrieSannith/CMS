const User = require("../models/userDetails");
const bcrypt = require('bcrypt');

async function createAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ email: 'admin@example.com' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("Admin123", 10);
            const newAdmin = new User({
                name: 'Admin',
                email: 'admin@example.com',
                password: hashedPassword,
                role: "admin",
            });
            await newAdmin.save();
            console.log("Admin account created successfully");
        } else {
            console.log('Admin account already exists');
        }
    } catch (error) {
        console.error("Error: " + error.message);
    }
}

module.exports = createAdminAccount;
