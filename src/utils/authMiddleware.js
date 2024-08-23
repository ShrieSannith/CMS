const { secretKey } = require('../configurations/jwtConfig');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing Token!" })
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized: Invalid Token Format!" })
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid Token!" + err })
        }
        
        req.user = user;
        next();
    })
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err); 
                
            } else {
                resolve(decoded);
            }
        });
    });
}

module.exports = { authenticateToken, verifyToken };
