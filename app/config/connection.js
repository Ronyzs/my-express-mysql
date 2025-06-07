const config = require('./environment'); // Ambil konfigurasi yang sesuai

const db = require('knex')({
    client: 'mysql2', // specify your database client here
    connection: {
        host: config.dbHost,
        user: config.dbUser,
        port: config.dbPort, // add your database port here
        password: config.dbPassword,
        database: config.dbName // add your database name here
    }
});

module.exports = db;