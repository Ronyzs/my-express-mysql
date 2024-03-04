const { app } = require('./app/config/util');
const Login = require('./app/routes/login/login');
const getBahan = require('./app/routes/bahan/getAllBahan');

// REST API 

/**
 * Routes
 */

// Authentication
Login(app)

// Master Bahan
getBahan(app)


// Endpoint not found handling
// app.use((req, res) => {
//     response({
//         statusCode: 404,
//         data: null,
//         message: 'API endpoint not found',
//         res: res
//     })
// });

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});
