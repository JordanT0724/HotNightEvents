var express = require('express');
var	router  = express.Router({mergeParams: true});
var Event   = require('../models/event');
var multer  = require('multer');

router.get('/', function(req, res){
    res.render('./events/index');
});

router.get('/events', function(req, res){
	res.render('./events/calendar');
});

router.get('/events/new', function(req, res){
	res.render('./events/new');
});

router.post('/events', function(req, res){
	res.send('post route');
});

module.exports = router;	

	