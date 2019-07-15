// Requires
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

// Router Methods
const bookRouter = require('./Routes/books');
const blogRouter = require('./Routes/blogs');
const mailinglistRouter = require('./Routes/mailingList');

// App Setup
const app = express();
const port = process.env.PORT || 5000;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.DB_PATH, { useNewUrlParser: true }, err => {
    if (err) {
        console.log('Error connecting to database', err);
    } else {
        console.log('Connected to database!');
    }
});

// Routes
app.get('/', (req, res) => {
    res.send(JSON.stringify({ Hello: 'World' }));
});
app.use('/mailinglist', mailinglistRouter);
app.use('/books', bookRouter);
app.use('/blogs', blogRouter);

// Start the server!
app.listen(port, () => {
    console.log(`Server listening to localhost: ${port}`);
});
