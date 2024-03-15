const express = require('express');
const router = express.Router();

const { SECRET_KEY, db, response, validation, crypto } = require('../config/util');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Route to generate JWT token
router.post('/', async (req, res) => {
    const { error, value } = User.validate(req.body);

    if (!error) {
        const { username, password } = value;

        try {
            // Retrieve user from the database
            const user = await db('siapps.simari_user').where('username', username).first();

            // Check if user exists
            if (!user) {
                return response({
                    statusCode: 401,
                    message: 'Invalid username or password',
                    res: res
                })
            }

            // Compare passwords
            const isPasswordValid = await user.password === hashPassword(password);;

            if (isPasswordValid) {
                // Payload
                const payload = { id: user.id, username: user.username }; // Adjust as needed

                // Generate token with expiration time in second (e.g., 30 minutes)
                const expiresIn = 60 * 30; // 30 minutes
                const token = jwt.sign(payload, SECRET_KEY, { expiresIn: expiresIn });

                // Respond with token and additional data
                return response({
                    statusCode: 200,
                    data: {
                        token: token,
                        apiKey: '4h312kjhASHJD'
                    },
                    res: res
                })
            } else {
                return response({
                    statusCode: 401,
                    message: 'Invalid username or password',
                    res: res
                })
            }
        } catch (error) {
            return response({
                statusCode: 500,
                message: error,
                res: res
            });
        }
    } else {
        return validation(error, res)
    }
});

function hashPassword(password) {
    const key = '4336c1ba641b8f6c98d647915e722f4a';
    const firstMd5 = crypto.createHash('md5').update(password).digest('hex');
    const concatenated = firstMd5 + key;
    const hashed = crypto.createHash('md5').update(concatenated).digest('hex');
    return hashed;
}

module.exports = router 
