// Requires for testing
const test = require('supertest');
const assert = require('assert');

// Requires
const app = require('express').express();

mongoose.connect(process.env.DB_TEST_PATH, { useNewUrlParser: true }, err => {
    if (err) {
        console.log('Error connecting to database', err);
    } else {
        console.log('Connected to database!');
    }
});
