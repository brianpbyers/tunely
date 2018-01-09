// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

 var db = require('./models');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
  db.Album.find(function(err,albums){
    res.json(albums);
  });

});

app.post('/api/albums', function(req, res){
  console.log('got to the post');
  console.log(req.body);
  db.Album.create(req.body,function(err, album){
    if(err){return console.log('there has been an error', err);}
    console.log("Created Album:",album);
    res.json(album);
  });
});

app.post('/api/albums/:id/songs', function(req, res){
  console.log('got to create a song');
  db.Album.findById(req.params.id, function(err, album){
    if(err){return console.log('there has been an error:',err);}
        db.Song.create(req.body, function(err, song){
          album.songs.push(song);
          album.save(function(err, album){
          });
        });
  });
  res.json(req.body);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
