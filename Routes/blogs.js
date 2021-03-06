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
    const { title, content, tags, date } = req.body;
    console.log('POST to /blogs');
    Blog.create({
        title,
        content,
        tags,
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

// UPDATE /blog
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, content, tags } = req.body;
    Blog.findOneAndUpdate({ _id: id }, req.body)
        .then(() => res.send(200))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

// GET /blog/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findOne({ _id: id })
        .then(blog => res.send(blog))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});
module.exports = router;
