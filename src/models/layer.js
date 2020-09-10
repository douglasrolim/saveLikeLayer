const mongoose = require('../database');

const LayerSchema = new mongoose.Schema({
    name: {
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
    },
    isQuery: {
        type: Boolean,
        default: false
    },
    queryType: {
        type: String,
        default: false
    },
    subtitle: {
        type: Boolean,
        default: false
    },
    query: {
        type: String,
        required: false
    },
    style: {
        type: Object,
        required: false
    }
});

const Layer = mongoose.model('Layer', LayerSchema);

module.exports = Layer;
