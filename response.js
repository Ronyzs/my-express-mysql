/**
 * Mengirimkan respons HTTP dengan status kode, data, dan pesan tertentu.
 * @param {number} statusCode - Kode status HTTP yang akan dikirimkan.
 * @param {any} data - Data yang akan dimasukkan ke dalam respons.
 * @param {string} message - Pesan yang akan dimasukkan ke dalam respons.
 * @param {object} res - Objek respons Express.js yang digunakan untuk mengirimkan respons.
 * @returns {void}
 */
const response = ({ statusCode, data, message, res }) => {
    res.status(statusCode).json({
        code: statusCode,
        data: data,
        message: message,
    })
}

module.exports = response