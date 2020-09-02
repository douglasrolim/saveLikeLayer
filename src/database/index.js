const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const databaseHost = process.env.DATABASE_URL || 'mongodb://localhost:27017/saveLayer'

mongoose.connect(databaseHost)
mongoose.Promise = global.Promise;

module.exports = mongoose;