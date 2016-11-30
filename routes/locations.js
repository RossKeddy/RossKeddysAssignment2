var express = require('express');
var router = express.Router();

// reference Location model model
var Location = require('../models/location');

// auth check
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

// GET handler for /locations
router.get('/', function(req, res, next) {

    // use Location model to run a query
    Location.find(function(err, locations) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load the locations view
            res.render('locations', {
                title: 'Locations',
                locations: locations,
                user: req.user
            });
        }
    });
});

/* GET /locations/add - display empty Location form */
router.get('/add', isLoggedIn, function(req, res, next) {

    // load the blank location form
    res.render('add-location', {
        title: 'Add a New Spot!',
        user: req.user
    });
});

/* POST /locations/add - process form submission */
router.post('/add', isLoggedIn, function(req, res, next) {
    Location.create( {
        name: req.body.name,
        city: req.body.city,
        size: req.body.size,
        indoor: req.body.indoor,
        outdoor: req.body.outdoor,
		website: req.body.website
    }, function(err, Location) {
           if (err) {
               console.log(err);
               res.render('error', {
               message: 'Processing Error'
           });
           }
        else {
               res.redirect('/locations');
        }
        });
});

/* GET /locations/delete/:_id - run a delete on selected location */
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
    var _id = req.params._id;

    // delete this record
    Location.remove( { _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Delete Error'
            });
        }

        res.redirect('/locations');
    });
});

/* GET /locations/:_id - show the edit form */
router.get('/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // look up the selected location document with this _id
    Location.findById(_id,  function(err, location) {
      if (err) {
          console.log(err);
          res.render('error', {
              message: 'Could not find that Location'
          });
      }
        else {
          // load the edit form
          res.render('edit-location', {
              title: 'Edit Location',
              location: location,
              user: req.user
          });
      }
    });
});

/* POST /locations/:_id - save form to process Location updates */
router.post('/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // instantiate a new Location object
    var location = new Location( {
        _id: _id,
        name: req.body.name,
        city: req.body.city,
        size: req.body.size,
        indoor: req.body.indoor,
        outdoor: req.body.outdoor,
        website: req.body.website
    });

    // save the update
    Location.update( { _id: _id }, location, function(err) {
       if (err) {
           console.log(err);
           res.render('error', {
               message: 'Could not Update Location'
           });
       }
        else {
           res.redirect('/locations');
       }
    });
});

module.exports = router;