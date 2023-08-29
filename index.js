const express = require('express')
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Halaman Utama!')
})

app.get('/mahasiswa', (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (error, result) => {
        response(200, result, '', res)
    })
})

app.get('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim; // Mendapatkan nilai NIM dari parameter URL

    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
    db.query(sql, [nim], (error, result) => {
        if (error) {
            console.error("Error querying database:", error);
            response(500, null, "Internal Server Error", res);
        } else {
            if (result.length > 0) {
                response(200, result[0], '', res); // Mengembalikan object pertama dari array result
            } else {
                response(404, null, "Data not found", res);
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})