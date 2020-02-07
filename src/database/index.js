const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/signatal')
mongoose.Promise = global.Promise;

module.exports = mongoose;