const db = require('./connection')
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const Joi = require('joi') // Validator library instance
const app = express(); // Create an instance of express
const upload = multer(); // Create an instance of multer
const crypto = require('crypto'); // Create an instance of crypto

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse form data
app.use(upload.none());
// Middleware to secrets key for authentication

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

const jsonParse = (data) => {
    return JSON.parse(JSON.stringify(data))
}

// Konfigurasi Joi untuk menggunakan pesan kesalahan kustom secara global
const validator = Joi.defaults((schema) => {
    return schema
        .messages({
            'any.required': '{#label} harus diisi',
            'string.empty': '{#label} tidak boleh kosong',
            'string.min': '{#label} minimal harus {#limit} karakter',
            'string.max': '{#label} maksimal harus {#limit} karakter',
            'string.email': '{#label} harus berupa alamat email yang valid',
            'number.min': '{#label} minimal harus {#limit}',
            'number.max': '{#label} maksimal harus {#limit}',
            'number.integer': '{#label} harus berupa angka bulat',
            'date.isoDate': '{#label} harus dalam format tanggal ISO (YYYY-MM-DD)',
            // Tambahkan pesan kesalahan kustom untuk tipe validasi lainnya di sini
        })
        .options({
            abortEarly: false,
            errors: {
                wrap: {
                    label: false
                }
            },
        })
});

const validation = async (error, res) => {
    // Mengumpulkan pesan kesalahan dari validasi Joi dalam bentuk objek
    const errorDetails = await error.details.reduce((accumulator, detail) => {
        accumulator[detail.context.label] = detail.message;
        return accumulator;
    }, {});

    return response({
        statusCode: 400,
        message: errorDetails,
        res: res
    });
}

// Error handling for Knex Error
function handleKnexError(errorCode) {
    let errorMessage = '';

    switch (errorCode) {
        case 'ER_NO_DB_ERROR':
            errorMessage = 'Tabel tidak ditemukan.';
            break;
        case 'ER_ACCESS_DENIED_ERROR':
            errorMessage = 'Akses ditolak saat mencoba menghubungkan ke basis data.';
            break;
        case 'ER_CON_COUNT_ERROR':
            errorMessage = 'Terlalu banyak koneksi ke server.';
            break;
        case 'ER_TABLE_EXISTS_ERROR':
            errorMessage = 'Tabel sudah ada.';
            break;
        case 'ER_DUP_ENTRY':
            errorMessage = 'Data duplikat ditemukan pada operasi yang mengharuskan nilai yang unik.';
            break;
        case 'ER_BAD_DB_ERROR':
            errorMessage = 'Nama basis data tidak valid.';
            break;
        case 'ER_BAD_TABLE_ERROR':
            errorMessage = 'Nama tabel tidak valid.';
            break;
        case 'ER_HANDSHAKE_ERROR':
            errorMessage = 'Error pada saat melakukan proses handshake.';
            break;
        case 'ER_SYNTAX_ERROR':
            errorMessage = 'Kesalahan sintaks dalam query SQL.';
            break;
        case 'ER_NOT_SUPPORTED_YET':
            errorMessage = 'Fitur yang diminta tidak didukung.';
            break;
        case 'ER_NO_SUCH_TABLE':
            errorMessage = 'Tabel yang diminta tidak ada.';
            break;
        case 'ER_BAD_FIELD_ERROR':
            errorMessage = 'Kolom tidak ditemukan atau tidak valid.';
            break;
        case 'ER_LOCK_WAIT_TIMEOUT':
            errorMessage = 'Timeout saat menunggu penguncian.';
            break;
        case 'ER_DATA_TOO_LONG':
            errorMessage = 'Data yang dimasukkan terlalu panjang untuk kolom tersebut.';
            break;
        case 'ER_UNKNOWN_ERROR':
            errorMessage = 'Kesalahan yang tidak diketahui.';
            break;
        default:
            errorMessage = 'Kesalahan tidak dikenal.';
            break;
    }

    return errorMessage;
}

module.exports = {
    db,
    response,
    app,
    jsonParse,
    validator,
    validation,
    handleKnexError,
    crypto
}