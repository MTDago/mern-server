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
describe('Blogs', () => {
    // after(done => {
    //     Blog.deleteOne({}, err => {
    //         done()
    //     })
    // })

    describe('/POST Blog', () => {
        it('it should POST a blog', done => {
            let blog = {
                title: 'A Blog Post',
                content: 'THis is the content of a blog post',
                tags: ['tag1', 'tag2', 'tag3']
            }
            chai.request(server)
                .post('/blogs')
                .send(blog)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })

    describe('/GET blog', () => {
        it('it should GET all the blogs', done => {
            chai.request(server)
                .get('/blogs/')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    // res.body.length.should.be.eql()
                    done()
                })
        })
    })

    describe('/GET blog', () => {
        it('it should GET a singular blog the blogs', done => {
            let id = '5d355523f71dab8073f50c29'
            chai.request(server)
                .get(`/blogs/${id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })

    // describe('/DELETE blog', () => {
    //     it('it should DELETE a blog', done => {
    //         chai.request(server)
    //             .delete(`/blogs/${blogID}`)
    //             .end((err, res) => {
    //                 res.should.have.status(200)
    //                 res.body.length.should.be.eql(0)
    //                 done()
    //             })
    //     })
    // })
})
