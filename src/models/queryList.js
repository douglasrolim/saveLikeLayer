const mongoose = require('../database');
const Layer = require('./layer').schema

// const defaultLocation = '/v1/static/default.png'


const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    zoom: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    layers: [Layer],
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: null,
        get: imagePath
    }
}, 
{ 
    toJSON: { 
        getters: true 
    } 
}
);

function imagePath (image) {
    if (image) {
        return '/v1/' + image
    }
}

const QueryList = mongoose.model('QueryList', QuerySchema);

module.exports = QueryList;
