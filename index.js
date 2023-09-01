const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer()

const query = require('./query')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(upload.array())

app.get('/mahasiswa', query.mahasiswa)

app.get('/mahasiswa/:nim', query.mahasiswaByNim);

app.get('/find/mahasiswa', query.findMahasiswaByName);

app.post('/add/mahasiswa', query.postMahasiswa)

/**
 * 
 * Endpoint not found handling
 */
app.use((req, res) => {
    response({
        statusCode: 404,
        data: null,
        message: 'API endpoint not found',
        res: res
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})