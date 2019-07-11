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

// POST /blog
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

// DELETE /blog
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndRemove(id)
        .then(() => res.send(200))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

module.exports = router;
