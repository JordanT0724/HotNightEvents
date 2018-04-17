var express = require('express');
var	router  = express.Router({mergeParams: true});
var Event   = require('../models/event');
var User    = require('../models/user');
var multer  = require('multer');
var ejs     = require('ejs');


router.get('/admin/dashboard', function(req, res){
	res.render("./admin/dashboard")
});

router.get('/admin', function(req, res){
	res.render('./admin/login');
	//res.redirect('./admin/dashboard');
});

router.post('/admin', function(req, res){
	
});

//Register Routes for future updates
/*router.get('/admin/register', function(req, res){
	res.render('./admin/register');
});

router.post('/admin/register', function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.redirect('/admin/register');
		} else {
			// changing this ('local') could be done with facebook or twitter or whatever
			passport.authenticate('local')(req, res, function(){
				res.redirect('/admin/dashboard');
			});
		}
	});
});*/

module.exports = router;