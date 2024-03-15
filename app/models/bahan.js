const { validator } = require("../config/util")

const Bahan = validator.object({
    nama: validator.string().required(),
    satuan: validator.string().required()
})

module.exports = Bahan