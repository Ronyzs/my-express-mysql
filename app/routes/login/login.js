const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { SECRET_KEY, db, response, jsonParse } = require('../../config/util');

// Route to generate JWT token
const Login = (app) => {
    app.post('/login', (req, res) => {
        const { username, password } = req.body;

        const sql = `SELECT * FROM siapps.simari_user WHERE username = '${username}'`;
        db.query(sql, (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (result.length === 0) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            console.log(`ini password ${result[0].password}`);
            console.log(`ini hash ${hashPassword(password)}`);

            if (result[0].password === hashPassword(password)) {
                // Payload
                const payload = jsonParse(result[0])

                // Generate token with expiration time (e.g., 5 sec)
                const expiresIn = 60 * 30; // 30 Minute

                // Generate token
                const token = jwt.sign(payload, SECRET_KEY, { expiresIn: expiresIn });
                response({
                    statusCode: 200,
                    data: {
                        token: token,
                        apiKey: '4h312kjhASHJD'
                    },
                    message: error,
                    res: res
                })
            } else {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
        });
    });
}

function hashPassword(password) {
    const key = '4336c1ba641b8f6c98d647915e722f4a';
    const firstMd5 = crypto.createHash('md5').update(password).digest('hex');
    const concatenated = firstMd5 + key;
    const hashed = crypto.createHash('md5').update(concatenated).digest('hex');
    return hashed;
}

module.exports = Login 
