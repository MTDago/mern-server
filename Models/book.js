const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema({
    title: String,
    cost: Number,
    blurb: String,
    published: Date,
    series: String,
    imageURL: String
})

module.exports = mongoose.model('Book', Book)
