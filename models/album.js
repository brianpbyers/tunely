var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let Song = require('./song');

let AlbumSchema = new Schema({
	artistName: String,
    name: String,
    releaseDate: String,
    songs:[Song.schema],
    genres: [String]
});

let Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;