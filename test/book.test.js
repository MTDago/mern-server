process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Book = require('../Models/book');
let server = 'http://localhost:5000';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
    // afterEach(done => {
    //     //Before each test we delete one book from the database - this means there's always 1 just so theres an easy ID
    //     Book.deleteMany({}, err => {
    //         done();
    //     });
    // });

    describe('/POST book', () => {
        it('it should POST a book', done => {
            let book = {
                title: 'The Lord of the Rings',
                cost: 25,
                blurb: 'Frodo and sum stuff',
                published: Date.now,
                series: 'lord of the rings'
            };
            chai.request(server)
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
            chai.request(server)
                .get('/books/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // res.body.length.should.be.eql(2);
                    done();
                });
        });
    });

    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id book', () => {
        it('it should GET a book by the given id', done => {
            let book = {
                title: 'The Lord of the Rings',
                cost: 25,
                blurb: 'Frodo and sum stuff',
                published: Date.now,
                series: 'lord of the rings'
            };
            chai.request(server)
                .get('/book/' + book.id)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('cost');
                    res.body.should.have.property('blurb');
                    res.body.should.have.property('published');
                    res.body.should.have.property('_id').eql(book.id);
                    done();
                });
        });
    });
});

// describe('/DELETE book', () => {
//     it('it should DELETE a book', done => {
//         chai.request('http://localhost:5000')
//             .delete(`/books/${bookID}`)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.length.should.be.eql(0);
//                 done();
//             });
//     });
// });
// });
