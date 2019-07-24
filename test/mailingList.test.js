process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let Blog = require('../Models/blog')
let server = 'http://localhost:5000'

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

chai.use(chaiHttp)
//Our parent block
describe('Mailing List', () => {
    // after(done => {
    //     Blog.deleteOne({}, err => {
    //         done()
    //     })
    // })

    describe('/POST MailingList', () => {
        it('it should POST an email to the mailing list', done => {
            let info = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'example@test.com'
            }
            chai.request(server)
                .post('/mailinglist')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })

    describe('/get MailingList', () => {
        it('it should get the mailing list from the API', done => {
            chai.request(server)
                .get('/mailinglist')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })
    })
})
