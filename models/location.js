/**
 * Created by Ross on 11/29/2016.
 */
 
// define a Location class using Mongoose and make it public
var mongoose = require('mongoose');

// define the class using a mongoose schema
var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'No name entered'
    },
    city: {
        type: String,
        required: 'No city entered'
    },
    size: {
        type: String
    },
    indoor: {
        type: String,
        required: 'No indoor entered'
    },
    outdoor: {
        type: String,
        required: 'No outdoor entered'
    },
    website: {
        type: String
    }
});

// make the class definition public as "Location"
module.exports = mongoose.model('Location', locationSchema);