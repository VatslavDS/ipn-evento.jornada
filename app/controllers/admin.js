var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  multer = require('multer'),
  path = require('path'),
  fs = require('fs'),
  mime = require('mime'),
  crypto = require('crypto'),
  passport = require('passport'),
  mom = require('moment'),
  datatablesQuery = require('datatables-query'),
  User = mongoose.model('UserIPN'),
  q = require('q'),
  Competitor = mongoose.model('Competitor');


// app/routes.js
module.exports = function(app, passport) {

	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.swig', { message: "ok" });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/home_admin_valid', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
	}), function(req, res, next){
		next();
	});

	app.get('/signup', function(req, res) {

		res.render('signup.swig', { message: "ok" });
	});

  app.get('/activated/:hash', function(req, res) {
      User.findOne({'hashToEmail': req.params.hash}, function(err, user) {
        if(err) {
          res.redirect('/');
        } else {
          user.activated = true;
          user.save(function(err) {
              if(err) {
                res.redirect('/');
              } else {
                res.redirect('/login')
              }
          });
        }
      })
//		res.render('signup.swig', { message: "ok" });
	});

	app.post('/signup', passport.authenticate('local_signup', {
		successRedirect : '/home_admin',
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
	}), function(req, res){
		console.log(JSON.stringify(req));
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	app.get('/home_admin', isLoggedIn, function(req, res){
		res.locals.username = req.user.username;
    User.findOne({'username': req.user.username}, function(err, user) {
      if(err) {
        res.redirect('/login')
        req.logout();
      } else {
        uid = user._id.toString();
        if(user.activated) {
          res.render('home_admin', {'id': uid, 'isCreated': user.hasProject})
        } else {
          res.render('login', {'data': 'Cuenta no activada, debes validar tu correo'});
        }
      }
    })
	});
/*
	app.post('/home_admin', isLoggedIn, function(req, res){
                var query = datatablesQuery(Request);
		var body = req.body;
		query.run(body).then(function(data){
		    res.json(data);
		}, function(err){
		    console.log(err);
		    res.status(500).json(err);
		});
	});
  */

	app.get('/proyecto/:id', isLoggedIn, function(req, res){
		var id = req.params.id;
		Competitor.findOne({"projid": id}, function(err, doc){
		    if(err){
			res.status(500).json(err);
		    } else {
			res.locals.proyecto = doc;
			res.render('proyecto.swig');
		    }
		});
	});


};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/login');
}
