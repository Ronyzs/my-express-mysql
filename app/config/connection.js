const db = require('knex')({
    client: 'mysql', // specify your database client here
    connection: {
        host: 'git.ulm.ac.id',
        user: 'root',
        password: '100MysqlGit',
        port: '3310',
    }
});

module.exports = db;