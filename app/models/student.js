const { validator } = require("../config/util")

const Bahan = validator.object({
    nama: validator.string().required().label('Nama'),
    score: validator.number().min(0).max(100).label('Score'),
    teacher_id: validator.number().required().label('Teacher')
})

module.exports = Bahan
