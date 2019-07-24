const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Desk = new Schema({
    reading: String,
    writing: String,
    WIP: String,
    links: []
});

module.exports = mongoose.model('Desk', Desk);
