var express  = require('express');
var	router   = express.Router({mergeParams: true});
var Event    = require('../models/event');
var User     = require('../models/user');
var multer   = require('multer');
var ejs      = require('ejs');
var passport = require('passport');


router.get('/admin/dashboard', isLoggedIn, function(req, res){
	res.render("./admin/dashboard")
});

router.get('/admin', function(req, res){
	res.render('./admin/login');
	//res.redirect('./admin/dashboard');
});

router.post('/admin', passport.authenticate("local", {
	successRedirect: "/admin/dashboard",
	failureRedirect: "/admin"
}), function(req, res){
	
});

router.get('/admin/logout', function(req, res){
	req.logout();
	res.redirect('/admin');
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

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next ();
	} res.redirect('/admin');
}

module.exports = router;