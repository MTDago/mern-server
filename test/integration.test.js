require('dotenv').config();
const app = require('express')();
const mongoose = require('mongoose');
const expect = require('chai').expect;
// const expect = require('expect');
const request = require('supertest');

const port = 4000;

// TESTS
// First, confirm GET to dashboard works (this must pass before POST)
describe('Routing', () => {
    context('GET request to "/dashboard"', () => {
        it('returns a 200 response', () => {
            app.get('/')
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    // done();
                })
                .catch(err => err.message);
        });
    });
});
