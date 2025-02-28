require('dotenv').config();


const { app, response } = require('./app/config/util');

// REST API 

/**
 * Routes
 */

// Authentication
app.use('/login', require('./app/routes/login'))

// Auth Middleware
app.use(require('./app/middleware/authenticator'))

// Master Student
app.use('/student', require('./app/routes/student'))

// Endpoint not found handling
app.use((req, res) => {
    response({
        statusCode: 404,
        data: null,
        message: 'API endpoint not found',
        res: res
    })
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});
