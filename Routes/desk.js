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

// POST /desk
router.post('/', (req, res) => {
    const { reading, writing, WIP, links } = req.body;
    console.log('POST to /desk');
    Desk.create({
        reading,
        writing,
        WIP,
        links
    })
        .then(desk => res.send(desk))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

// UPDATE /book
router.put('/edit', (req, res) => {
    const { reading, writing, WIP, links } = req.body;
    Desk.findOneAndUpdate({ reading: reading }, req.body)
        .then(() => res.send(200))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        );
});

module.exports = router;
