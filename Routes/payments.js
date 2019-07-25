const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/', (req, res) => {
    res.send({
        message: 'Hello Stripe checkout server!',
        timestamp: new Date().toISOString()
    });
});

router.post('/', (req, res) => {
    const body = {
        source: req.body.token,
        amount: Math.floor(req.body.amount * 100),
        currency: 'aud'
    };
    stripe.charges.create(body, (stripeErr, stripeCharge) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeCharge });
        }
    });
});

module.exports = router;
