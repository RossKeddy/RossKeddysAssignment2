var mongoose = require('mongoose');

// reference passport-local-mongoose so passport can use this model for user authentication
var plm = require('passport-local-mongoose');

var AccountSchema = new mongoose.Schema({
	oauthID: String,
    created: Date
});

// used for configuring options
AccountSchema.plugin(plm);

// make it public
module.exports = mongoose.model('Account', AccountSchema);