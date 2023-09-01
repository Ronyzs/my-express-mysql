const { db, response, errorHandling } = require('./util')

const findMahasiswaByName = (req, res) => {
    const nama = req.query.nama ?? ''; // Mendapatkan nilai nama dari query URL

    const sql = `SELECT * FROM mahasiswa WHERE nama_lengkap LIKE '%${nama}%'`;
    db.query(sql, (error, result) => {
        if (error) {
            errorHandling(res, error);
        } else {
            if (result.length > 0) {
                response({
                    statusCode: 200,
                    data: result,
                    message: '',
                    res: res
                })// Mengembalikan object pertama dari array result
            } else {
                response({
                    statusCode: 404,
                    data: null,
                    message: 'Data not found',
                    res: res
                })
            }
        }
    });
}

const mahasiswa = (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (error, result) => {
        if (error) {
            errorHandling(res, error)
        } else {
            response({
                statusCode: 200,
                data: result,
                message: '',
                res: res
            })
        }
    })
}

const mahasiswaByNim = (req, res) => {
    const nim = req.params.nim; // Mendapatkan nilai NIM dari parameter URL

    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
    db.query(sql, [nim], (error, result) => {
        if (error) {
            errorHandling(res, error)
        } else {
            if (result.length > 0) {
                response({
                    statusCode: 200,
                    data: result[0],
                    message: '',
                    res: res
                })// Mengembalikan object pertama dari array result
            } else {
                response({
                    statusCode: 404,
                    data: null,
                    message: 'Data not found',
                    res: res
                })
            }
        }
    });
}

const postMahasiswa = (req, res) => {
    const formData = req.body;

    const sql = `INSERT INTO mahasiswa (id, nim, nama_lengkap, kelas, alamat) 
                        VALUES (NULL, '${formData.nim}', '${formData.nama}', '${formData.kelas}', '${formData.alamat}');`;
    db.query(sql, (error, result) => {
        if (error) {
            errorHandling(res, error);
        } else {
            console.log(result);
            if (result.affectedRows > 0) {
                response({
                    statusCode: 200,
                    data: null,
                    message: 'Data inserted successfully',
                    res: res
                })
            } else {
                response({
                    statusCode: 500,
                    data: null,
                    message: 'Internal Server Error',
                    res: res
                })
            }
        }
    });
}

module.exports = {
    findMahasiswaByName,
    mahasiswa,
    mahasiswaByNim,
    postMahasiswa
}