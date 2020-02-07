const mongoose = require('../database');
const Query = require('./query').schema

const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    querys: [Query],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const QueryList = mongoose.model('QueryList', QuerySchema);

module.exports = QueryList;
