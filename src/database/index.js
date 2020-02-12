const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/query')
mongoose.Promise = global.Promise;

module.exports = mongoose;