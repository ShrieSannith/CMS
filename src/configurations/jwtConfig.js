const crypto = require('crypto');

// Generate a random secret key of 32 bytes and convert it to hexadecimal string
const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = {
    secretKey: secretKey
};
