const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
    title: String,
    content: String,
    tags: {type: Array, default: []}
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', Blog);
