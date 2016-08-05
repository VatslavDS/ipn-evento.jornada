var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  multer = require('multer'),
  path = require('path'),
  fs = require('fs'),
  mime = require('mime'),
  crypto = require('crypto'),
  mom = require('moment'),
  q = require('q'),
  dummy = require('../../dummy_data/competitor_dummy.json'),
  uuid = require('uuid'),
  User = mongoose.model('UserIPN'),
  Competitor = mongoose.model('Competitor');

/*
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    var destination_file = './public/uploads/' + mom().unix();
    console.log(destination_file);
    if (!fs.existsSync(destination_file)){
            fs.mkdirSync(destination_file);
    }
        callback(null, destination_file);
  },
  fileFilter: function (req, file, cb) {
    if (path.extension(file.originalname) !== '.pdf') {
      return cb(null, false)
    }

    cb(null, true)
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
               cb(null,  raw.toString('hex')+ "_" + file.originalname );
      });
    }
  });
  */

//var upload = multer({ storage : storage }).fields([{name : "comprobante1"}, {name: "comprobante2"}, {name: "comprobante3"}, {name: "archivo_proyecto"}]);

//[{name : "comprobante1"}, {name: "omprobante2"}, {name: "comprobante3"}, {name: "archivo_proyecto"}]
module.exports = function (app) {
  app.use('/', router);
};

router.get('/', isLoggedIn, function(req, res, next) {
  
});

router.get('/proyecto-new', isLoggedIn, function (req, res, next) {
    User.findOne({'_Id': req.user._id}, function(err, user) {
        if(err && user != null) {
          console.log("In the err && user " + err + " " + user);
          res.locals.isCreated = user.isCreated;
          res.redirect('/home_admin');
        } else  if(user == null) {
          console.log("In the null " + err + " " + user);
          res.redirect('/project-competitor-ipn');
        }
    });

});
router.get('/project-competitor-ipn', isLoggedIn, function(req, res, next) {
  res.render('competitor');
});

router.post('/competidor-form', isLoggedIn, function(req, res, next) {
    var files = req.files;
    var body = req.body;
    body.unidad_academica =  body.unidad_academica[0];
    body.projid = req.user._id;
    User.findOne({'username': req.user.username}, function(err, user) {
      if(err) {
        res.redirect('/');
      } else  {
        user.hasProject = true;
        user.save(function(err) {
          if(err) {
            res.redirect('/');
          } else {
            var modelCompetidor = new Competitor(body);
            modelCompetidor.save(function(err, doc){
                if(err) {
                  console.log(err);
                  res.redirect("/home_admin_valid");
                } else {
                  res.redirect("/home_admin_valid");
                }
              });
            }
          });
        }
    });
});

router.get('/home_admin_valid', isLoggedIn, function(req, res, next) {
  res.redirect('/home_admin');
});



function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/login');
}
