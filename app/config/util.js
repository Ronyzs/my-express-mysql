const db = require('./connection')
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express(); // Create an instance of express
const upload = multer(); // Create an instance of multer

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse form data
app.use(upload.none());
// Middleware to secrets key for authentication
const SECRET_KEY = Buffer.from('my-secret-key', 'base64').toString('utf-8'); 

/**
 * Mengirimkan respons HTTP dengan status kode, data, dan pesan tertentu.
 * @param {number} statusCode - Kode status HTTP yang akan dikirimkan.
 * @param {any} data - Data yang akan dimasukkan ke dalam respons.
 * @param {string} message - Pesan yang akan dimasukkan ke dalam respons.
 * @param {object} res - Objek respons Express.js yang digunakan untuk mengirimkan respons.
 * @returns {void}
 */
const response = ({ res, statusCode, data, message }) => {
    res.status(statusCode).json({
        code: statusCode,
        data: data ?? null,
        message: message ?? null,
    })
}

const errorHandling = (res, error) => {
    response({
        statusCode: 500,
        data: null,
        message: error,
        res: res
    })
}

const jsonParse = (data) => {
    return JSON.parse(JSON.stringify(data))
}


module.exports = {
    db,
    response,
    errorHandling,
    response,
    app,
    SECRET_KEY,
    jsonParse
}