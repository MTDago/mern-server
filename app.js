const express = require('express') 
const bodyParser = require('body-parser') 
const mongoose = require('mongoose') 
const cors = require('cors') 
const morgan = require('morgan') 
const passport = require('passport') 
const passportLocalMongoose = require('passport-local-mongoose') 
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const secure = require('./middleware/secure')


require('dotenv').config() 

//App Setup
const app = express() 
const port = process.env.PORT || 5000  //TO DO: Add PORT to .env
app.use(morgan('dev')) 
app.use(bodyParser.json()) 
app.use(cors()) 
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false
}))

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err)  }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' }) 
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' }) 
        }
        return done(null, user) 
      }) 
    }
  )) 

// Database Connection
mongoose.connect(process.env.DB_PATH, { useNewUrlParser: true }, err => {
    if (err) {
        console.log('Error connecting to database', err) 
    } else {
        console.log('Connected to database!') 
    }
})
//Routes
app.get('/', (req, res) => {
    res.send(JSON.stringify({ Hello: 'World' })) 
}) 
app.use('/mailinglist', require('./Routes/mailingList')) 
app.use('/books', secure, require('./Routes/books')) 
app.use('/blogs', require('./Routes/blogs')) 

// Start the server!
app.listen(port, () => {
    console.log(`Server listening to localhost: ${port}`) 
}) 
 