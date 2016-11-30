var express = require('express');
var router = express.Router();

// reference our account model
var Account = require('../models/account');

// auth check
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

// GET handler for /admin
router.get('/', isLoggedIn, function(req, res, next) {
    if(req.user.username == 'SuperUser') //I only want superuser to control this.
    {
        // use account model to run a query
        Account.find(function (err, accounts) {
            if (err) {
                console.log(err);
                res.render('error');
            }
            else {
                // load the admin view
                res.render('admin', {
                    title: 'Administrate Users',
                    accounts: accounts,
                    user: req.user
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
});

/* GET /admin/delete/:_id - run a delete on selected user */
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
    // read the id value from the url
    var _id = req.params._id;

    // delete this guy
    Account.remove( { _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
				message: 'Delete Error'
			});
        }
        res.redirect('/admin');
    });
});

/* GET /admin/:_id - show the edit form */
router.get('/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // look up the selected Account document with this _id
    Account.findById(_id,  function(err, account) {
        if (err) {
            console.log(err);
            res.render('error', { 
				message: 'Could not find that dude'
			});
        }
        else {
            // load the edit form
            res.render('edit-user', {
                title: 'Edit User',
                account: account,
                user: req.user
            });
        }
    });
});

/* POST /admin/:_id - save form to process account updates */
router.post('/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // instantiate a new Account object & populate it from the form
    var account = new Account( {
        _id: _id,
        username: req.body.username
    });

    // save the update using Mongoose
    Account.update( { _id: _id }, account, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
				message: 'Could not Update That Dude'
			});
        }
        else {
            res.redirect('/admin');
        }
    });
});

// make controller available
module.exports = router;


