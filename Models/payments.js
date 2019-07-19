const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentApi = require("./payment");
const configureRoutes = app => {
  paymentApi(app);
};

module.exports = configureRoutes;
module.exports = mongoose.model('configureRoutes', configureRoutes);