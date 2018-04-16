var express = require('express');
var	router  = express.Router({mergeParams: true});
var Event   = require('../models/event');
var multer  = require('multer');


module.exports = router;