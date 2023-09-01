const db = require('./connection')
const response = require('./response')

const errorHandling = (res, error) => {
    response({
        statusCode: 500,
        data: null,
        message: error,
        res: res
    })
}

module.exports = { db, response, errorHandling }