var express = require('express');
var router = express.Router();

const queryController = require('./queryController')
const shapefileConverterController = require('./shapefileConverterController')
const plotMapDataSetupController = require('./plotMapDataSetupController')

router.use('/query', queryController);
router.use('/plot-map-data-setup', plotMapDataSetupController);
router.use('/shapefile-converter-geojson', shapefileConverterController);

module.exports = app => app.use('/v1', router);