const express = require('express')
const payments = require('../Models/payments')

const router = express.Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const stripeChargeCallback = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({ error: stripeErr })
    } else {
        res.status(200).send({ success: stripeRes })
    }
}
const paymentApi = app => {
    router.get('/', (req, res) => {
        res.send({
            message: 'Hello Stripe checkout server!',
            timestamp: new Date().toISOString()
        })
    })
    router.post('/', (req, res) => {
        const body = {
            source: req.body.token.id,
            amount: req.body.amount,
            currency: 'aud'
        }
        stripe.charges.create(body, stripeChargeCallback(res))
    })
    return app
}
module.exports = router
