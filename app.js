const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const secure = require('./middleware/secure');
const User = require('./Models/User')
const secret = 'Hello from secret'
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const withAuth = require('./middleware/withAuth')

require('dotenv').config();

//App Setup
const app = express();
const port = process.env.PORT || 5000; //TO DO: Add PORT to .env
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', cors())
app.use(cookieParser())
app.use(
    session({
        secret: 'secret',
        saveUninitialized: false,
        resave: false
    })
);

passport.use(
    new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    })
);

// Database Connection
mongoose.connect(
    (process.env.NODE_ENV === 'test' ? process.env.DB_TEST_PATH : process.env.DB_PATH),
    { useNewUrlParser: true },
    err => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    }
);
//Routes
app.get('/', (req, res) => {
    res.send(JSON.stringify({ Hello: 'World' }));
});
app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
  });
app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
})
app.use('/mailinglist', require('./Routes/mailingList'));
app.use('/books', secure, require('./Routes/books'));
app.use('/blogs', require('./Routes/blogs'));
app.post('/api/register', function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email });
    user.password = user.hashPassword(password)
    console.log(user)
    user.save(function(err) {
      if (err) {
        res.status(500)
          .send("Error registering new user please try again.");
      } else {
        res.status(200).send("Welcome to the club!");
      }
    });
  });

  app.post('/api/authenticate', function(req, res) {
      const { email, password } = req.body;
      console.log(req.body)
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
          }
        });
      }
    });
  });

// Start the server!
app.listen(port, () => {
    console.log(`Server listening to localhost: ${port}`);
});
