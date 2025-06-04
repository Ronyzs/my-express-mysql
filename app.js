const config = require('./app/config/environment'); // Ambil konfigurasi yang sesuai

const { app, response } = require('./app/config/util');

// Import routes
const loginRoutes = require('./app/routes/login');
const studentRoutes = require('./app/routes/student');

// Middleware
const authenticator = require('./app/middleware/authenticator');

// REST API 

/**
 * Routes
 */


// Logging middleware — letakkan di atas sebelum route lain
app.use((req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use('/login', loginRoutes);
app.use('/student', authenticator, studentRoutes);

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
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
