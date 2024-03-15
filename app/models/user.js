const { validator } = require("../config/util");

const User = validator.object({
    username: validator.string().required(),
    password: validator.string().required()
});

module.exports = User