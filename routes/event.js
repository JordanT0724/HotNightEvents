var express = require('express');
var	router  = express.Router({mergeParams: true});
var Event   = require('../models/event');

router.get('/events', function(req, res){
	
	Event.find({}, function(err, allEvents){
		if(err){
			console.log(err);
		} else { 
			res.render('./events/events', {events: allEvents});
		}
	});
});

router.get('/events/new', function(req, res){
	res.render('./events/new');
});

router.post('/events', function(req, res){
	Event.create(req.body.event, function(err, newEvent){
		if(err){
			console.log(err);
		} else{
			res.redirect('/');
		}

	})
});

module.exports = router;	