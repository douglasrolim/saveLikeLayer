const mongoose = require('../database');

const PlotMapDataSetupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userCreator: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    private: {
        type: Boolean,
        required: true
    },
    plotSource: {
        type: String,
        required: true
    },
    geojson: {
        type: Object,
        required: false
    },
    coordinatesText: {
        type: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: false
        },
        required: false
    },
    coordinatesPoints: {
        latitude: {
            type: Number,
            required: false
        },
        longitude: {
            type: Number,
            required: false
        },
        required: false
    },
    fileFolderName: {
        type: Array,
        required: false
    },
    csvFileConfig: {
        header: {
            type: Array,
            require: false
        },
        fieldsSelected: {
            type: Array,
            require: false
        },
        required: false
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        toJSON: {
            getters: true
        }
    }
);

const PlotMapDataSetup = mongoose.model('PlotMapDataSetup', PlotMapDataSetupSchema);

module.exports = PlotMapDataSetup;
