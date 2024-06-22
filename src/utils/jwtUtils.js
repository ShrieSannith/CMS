const { secretKey } = require('../configurations/jwtConfig');
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, secretKey, { expiresIn: "1h" })
};

module.exports = {
    generateToken
};
