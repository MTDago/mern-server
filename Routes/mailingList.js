const express = require('express')
const MailingList = require('../Models/mailingList')

const router = express.Router()

// GET /mailinglist
router.get('/', (req, res) => {
    MailingList.find()
        .then(mailingList => res.send(mailingList))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        )
})

// POST /mailinglist
router.post('/', (req, res) => {
    const { firstName, lastName, email } = req.body
    console.log('POST to /mailingList')
    MailingList.create({
        firstName,
        lastName,
        email
    })
        .then(mailingList => res.send(mailingList))
        .catch(error =>
            res.status(500).send({
                error: error.message
            })
        )
})

// // DELETE /mailinglist/:id
// router.delete('/:id', (req, res) => {
//     const id = req.params.id
//     const { title, url } = req.body
//     Bookmark.findByIdAndRemove(id)
//         .then(() => res.send(200))
//         .catch(error =>
//             res.status(500).send({
//                 error: error.message
//             })
//         )
// })

module.exports = router
