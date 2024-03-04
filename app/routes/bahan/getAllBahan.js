const { response, db, errorHandling } = require('../../config/util');
const auth = require('../../middleware/authenticator');

const getBahan = (app) => {
    app.get('/bahan', auth, (req, res) => {
        const sql = `SELECT * FROM silabv2.silab_m_bahan`;
        db.query(sql, (error, result) => {
            if (error) {
                errorHandling(res, error.message);
            } else {
                if (result.length > 0) {
                    response({
                        statusCode: 200,
                        data: result,
                        res: res
                    })
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
    });
}

module.exports = getBahan
