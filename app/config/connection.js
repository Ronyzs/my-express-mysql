const db = require('knex')({
    client: 'mysql', // specify your database client here
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME // add your database name here
    }
});

module.exports = db;