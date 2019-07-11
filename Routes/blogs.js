const express = require('express');
const Blog = require('../Models/blog');

const router = express.Router();

// GET /blog
router.get('/', (req, res) => {
    Blog.find()
        .then(blog => res.send(blog))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

// POST /book
router.post('/', (req, res) => {
    const { title, content, date } = req.body;
    console.log('POST to /blogs');
    Blog.create({
        title,
        content,
        date
    })
        .then(blog => res.send(blog))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

module.exports = router;
