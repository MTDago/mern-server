require('dotenv').config();

const app = require('express')();
const mongoose = require('mongoose');
const expect = require('chai').expect;
// const expect = require('expect');
const request = require('supertest');
const assert = require('assert');
const port = 5000;

// TESTS
// First, confirm GET to dashboard works (this must pass before POST)
describe('Routing', () => {
    context('GET request to "/book"', () => {
        it('returns a 200 response', () => {
            assert.equal('');
        });
    });
});
