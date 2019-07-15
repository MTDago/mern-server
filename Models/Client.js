const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const schema = mongoose.Schema

const clientSchema = new schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
})

clientSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

clientSchema.methods.hashPassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('client', clientSchema, 'client')