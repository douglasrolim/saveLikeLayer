var express = require('express');
var router = express.Router();

const queryController = require('./queryController')
 
router.use('/query', queryController);
 
module.exports = app => app.use('/v1', router);