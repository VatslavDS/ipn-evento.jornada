var LocalStrategy  = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('UserIPN');
var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport('smtps://vatslavds@gmail.com:Jorge57623558***@smtp.gmail.com');


// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local_signup', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        User.findOne({"username": username}, function(err, user) {
            if (err){
		console.log("El error fue: " + err);
                return done(err);
	    } else if (user) {
		console.log("El user  fue: " + user);
                return done(null, false, 'signupMessage', 'That email is already taken.');
            } else {

				// if there is no user with that email
                // create the user
                var newUser  = new User();
                var randomstring = require("randomstring");

		            console.log("El user "+ newUser);
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                newUser.activated= false;
                newUser.hashToEmail = randomstring.generate(20);
                var mess = 'http://148.204.111.23:3013/activated/' + newUser.hashToEmail;
                var mailOptions = {
                    from: 'vatslavds@gmail.com', // sender address
                    to: newUser.username, // list of receivers
                    subject: 'Alta de la aplicación!!', // Subject line
                    text: mess,
                    html: '<b>Hello world </b><a href='+ "" + mess + ""+'>Click aqui</a>' // html body
                };

                transporter.sendMail(mailOptions, function(error, info){
                if(error){
                  return console.log(error);
                }
                  console.log('Message sent: ' + info.response);

                });

				// save the user
                newUser.save(function(err) {
                    if (err){
            		console.log("El error fue: " + err);
                        throw err;
		    }
                    return done(null, newUser);
                });
            }

        });

    }));

    passport.use('local-login', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form
        User.findOne({"username": username}, function(err, user) {
            if (err) {
		console.log('Error ' + err);
                return done(err);
	   }else if (!user) {
		console.log('No User');
                return done(null, false, 'loginMessage', 'No user found.'); // req.flash is the way to set flashdata using connect-flash
	   } else if (!user.validPassword(password)){
		console.log('Invalid password');
	   }
	    return done(null, user);
	});

    }));

};
