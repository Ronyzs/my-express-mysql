const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'git.ulm.ac.id',
    user: 'root',
    password: '100MysqlGit',
    port: '3310',
})

module.exports  = db;