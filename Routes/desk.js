const express = require('express');
const Desk = require('../Models/desk');

const router = express.Router();

// GET /desk
router.get('/', (req, res) => {
    Desk.find()
        .then(blog => res.send(blog))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

// UPDATE /book
router.put('/edit', (req, res) => {
    const id = req.params.id;
    const { reading, writing, WIP, links } = req.body;
    Book.findOneAndUpdate({ _id: id }, req.body)
        .then(() => res.send(200))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

module.exports = router;
