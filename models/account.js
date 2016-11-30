// Creates the schema for users
// Ross Keddy

var mongoose = require('mongoose');

// reference passport-local-mongoose for user authentication
var plm = require('passport-local-mongoose');

var AccountSchema = new mongoose.Schema({
    //Lets slap the authid and date into the db when these dudes get made
	oauthID: String,
    created: Date
});

// used for configuring options
AccountSchema.plugin(plm);

// make it public
module.exports = mongoose.model('Account', AccountSchema);