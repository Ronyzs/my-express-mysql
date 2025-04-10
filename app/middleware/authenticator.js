const jwt = require('jsonwebtoken');
const { response } = require("../config/util");
const API_KEY = process.env.API_KEY;

// Authentication middleware
function authenticator(req, res, next) {
    // Check for API key
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({ error: 'No API Key Found' });

    }
    if (apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Invalid API key' });
    }

    // Check for JWT token
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid authorization header format' });
    }

    const token = tokenParts[1];
    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }

    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    console.log(SECRET_KEY);

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name == 'TokenExpiredError') {
                return response({
                    res: res,
                    statusCode: 401,
                    message: 'Token has expired'
                });
            } else {
                return response({
                    res: res,
                    statusCode: 401,
                    message: err.name
                });
            }
        } else {
            req.data = decoded
            next();
        }
    });
}

module.exports = authenticator