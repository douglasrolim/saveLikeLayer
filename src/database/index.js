const mongoose = require('mongoose');

mongoose.connect('mongodb://srv-bigdata05.mp.rn.gov.br/saveLayer')
mongoose.Promise = global.Promise;

module.exports = mongoose;