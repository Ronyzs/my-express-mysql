const express = require('express');
const router = express.Router();

const { response, db, validation, handleKnexError } = require('../config/util');

console.log('Loading student route...');

router.get('/', async (req, res) => {
    try {
        const bahan = await db('students')
            .select('students.id', 'students.nama', 'teachers.nama as teacher')
            .join('teachers', 'teachers.id', 'students.teacher_id')

        if (bahan.length > 0) {
            response({
                statusCode: 200,
                data: bahan,
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
    } catch (error) {
        response({
            statusCode: 500,
            message: error.code,
            res: res
        })
    }
});

router.post('/', async (req, res) => {
    const studentSchema = require('../models/student');
    const { error, value } = studentSchema.validate(req.body);

    if (!error) {
        try {
            const insertValue = {
                nama: value.nama,
                score: value.score,
                teacher_id: value.teacher_id
            }

            await db('students').insert(insertValue);

            response({
                statusCode: 200,
                message: 'Berhasil disimpan',
                res: res
            })
        } catch (error) {
            response({
                statusCode: 500,
                message: handleKnexError(error.code),
                res: res
            })
        }
    } else {
        return validation(error, res)
    }
});

router.put('/:id', async (req, res) => {
    const studentSchema = require('../models/student');
    const { error, value } = studentSchema.validate(req.body);

    if (!error) {
        try {
            const insertValue = {
                nama: value.nama,
                score: value.score,
                teacher_id: value.teacher_id
            }
            await db('students').where({ id: req.params.id }).update(insertValue);

            response({
                statusCode: 200,
                message: 'Berhasil diupdate',
                res: res
            })
        } catch (error) {
            response({
                statusCode: 500,
                message: handleKnexError(error.code),
                res: res
            })
        }
    } else {
        return validation(error, res)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const student = await db('students').where({ id: req.params.id }).first();

        if (!student) {
            response({
                statusCode: 404,
                message: 'Data not found',
                res: res
            });
            return;
        }

        await db('students').where({ id: req.params.id }).delete();

        response({
            statusCode: 200,
            message: 'Berhasil dihapus',
            res: res
        });
    } catch (error) {
        response({
            statusCode: 500,
            message: handleKnexError(error.code),
            res: res
        });
    }
});


module.exports = router