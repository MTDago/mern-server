//Requires
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

//App Setup
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//Database Connection goes here

//Routes
app.get('/', (req, res) => {
    res.send(JSON.stringify({ Hello: 'World' }));
});

//Start the server!
app.listen(port, () => {
    console.log(`Server listening to localhost: ${port}`);
});
