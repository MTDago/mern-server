const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', Blog);
