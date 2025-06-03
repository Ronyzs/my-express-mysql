const dotenv = require('dotenv'); // Instal dotenv: npm install dotenv

// Load environment variables from .env file
dotenv.config();

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbHost: 'localhost',
        dbUser: 'root',
        dbPassword: '',
        dbName: 'belajar-laravel-9',
        dbPort: 3306, // Default MySQL port
        hashKey: '4336c1ba641b8f6c98d647915e722f4a',
        jwtSecret: 'MyReallySecret300901', // NEVER hardcode sensitive keys in production!
        apiKey: '4h312kjhASHJD'
    },
    production: {
        port: process.env.PORT || 80, // Default HTTP port
        dbHost: process.env.DB_HOST, // HARUS DIATUR DI ENVIRONMENT PRODUKSI
        dbUser: process.env.DB_USER, // HARUS DIATUR DI ENVIRONMENT PRODUKSI
        dbPassword: process.env.DB_PASSWORD, // HARUS DIATUR DI ENVIRONMENT PRODUKSI
        dbName: process.env.DB_NAME, // HARUS DIATUR DI ENVIRONMENT PRODUKSI
        dbPort: process.env.DB_PORT || 3306, // Default MySQL port, bisa diatur di environment
        jwtSecret: process.env.JWT_SECRET_KEY, // HARUS DIATUR DI ENVIRONMENT PRODUKSI
        hashKey: process.env.HASH_KEY, // HARUS DIATUR DI ENVIRONMENT PRODUKSI
        apiKey: process.env.API_KEY, // HARUS DIATUR DI ENVIRONMENT PRODUKSI
    },
};

const env = process.env.NODE_ENV || 'development'; // Default ke development jika tidak diatur

module.exports = config[env];