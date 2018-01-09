var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

module.exports.Song = require('./song');
module.exports.Album = require('./album');