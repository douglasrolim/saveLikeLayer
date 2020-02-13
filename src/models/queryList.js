const mongoose = require('../database');
const Query = require('./query').schema

const defaultLocation = '/v1/static/default.png'

const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    queries: [Query],
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: defaultLocation
    }
});

const QueryList = mongoose.model('QueryList', QuerySchema);

module.exports = QueryList;
