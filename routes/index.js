var express = require('express');
var router = express.Router();

// link to the Account model
var Account = require('../models/account');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home',
    message: 'Welcome',
    user: req.user
  });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About',
    message: 'This page was created by Ross Keddy for people that would like to join the paintball culture and find more information about the paintball locations around them',
    user: req.user
  });
});

/* GET register page */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});

/* POST register page */
router.post('/register', function(req, res, next) {
  // use passport and the Account model to save the new user
  Account.register(new Account( { username: req.body.username }),
      req.body.password, function(err, account) {
        if (err) {
          console.log(err);
          res.render('/register');
        }
        else {
          res.redirect('/login');
        }
      });
});

/* GET login page */
router.get('/login', function(req, res, next) {

  // get session messages if there are any
  var messages = req.session.messages || [];

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });

  // clear the messages out of the session
 req.session.messages = null;
});

/* POST login page */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'  // stored in session.messages
}));

/* GET logout */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});

/* GET /facebook */
router.get('/facebook', passport.authenticate('facebook'),
function(req, res, next) {
});

/* GET /facebook/callback */
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}), function(req, res, next) {
  // show the home page
  res.redirect('/');
});

module.exports = router;
