const mongoose = require('../database');

const QuerySchema = new mongoose.Schema({
    layer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    query: {
        type: Boolean,
        default: false
    },
    subtitle: {
        type: Boolean,
        default: false
    },
    $query: {
        type: Object,
        required: false
    },
    style: {
        type: Object,
        required: false
    }
});

const Query = mongoose.model('Query', QuerySchema);

module.exports = Query;
