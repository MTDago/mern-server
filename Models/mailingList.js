const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MailingList = new Schema({
    firstName: String,
    lastName: String,
    email: String
})

module.exports = mongoose.model('mailingList', MailingList)
