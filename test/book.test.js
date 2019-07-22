process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Book = require('../Models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
    after(done => {
        //Before each test we delete one book from the database - this means there's always 1 just so theres an easy ID
        Book.deleteOne({}, err => {
            done();
        });
    });

    describe('/POST book', () => {
        it('it should POST a book', done => {
            let book = {
                title: 'The Lord of the Rings',
                cost: 25,
                blurb: 'Frodo and sum stuff',
                published: Date.now,
                series: 'lord of the rings'
            };
            chai.request('http://localhost:5000')
                .post('/books')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/GET book', () => {
        it('it should GET all the books', done => {
            chai.request('http://localhost:5000')
                .get('/books/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    done();
                });
        });
    });

    describe('/GET book', () => {
        it('it should GET a singular book the books', done => {
            let id = '5d355523f71dab8073f50c29';
            chai.request('http://localhost:5000')
                .get(`/books/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/DELETE book', () => {
        it('it should DELETE a book', done => {
            chai.request('http://localhost:5000')
                .delete(`/books/${bookID}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
});
