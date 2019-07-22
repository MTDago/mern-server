const express = require('express');
const Book = require('../Models/book');

const router = express.Router();

// GET /book
router.get('/', (req, res) => {
    Book.find()
        .then(book => res.send(book))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

// POST /book
router.post('/', (req, res) => {
    const { title, cost, blurb, published, series } = req.body;
    console.log('POST to /books');
    Book.create({
        title,
        cost,
        blurb,
        published,
        series
    })
        .then(book => res.send(book))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

// DELETE /book
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Book.findByIdAndRemove(id)
        .then(() => res.send(200))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

// UPDATE /book
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Book.findOneAndUpdate({ _id: id }, req.body)
        .then(() => res.send(200))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

// GET /book/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Book.findOne({ _id: id })
        .then(book => res.send(book))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

module.exports = router;
