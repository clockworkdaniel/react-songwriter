var express = require('express');
var parser = require('body-parser');
//var path = require('path');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1:27017';
var db = mongoose.connection;

// require('./database');
// require('./seed');

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

var songsRouter = require('./routes/song');
var authorsRouter = require('./routes/author');

var PORT = 8000;

//currently this places the SPA on the homepage
//var DIST_DIR = path.join(__dirname, '/../../dist');
//app.use('/', express.static(DIST_DIR));

//app.use - mounts the specified middleware function or functions at the specified path
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(parser.json());

app.use('/api', songsRouter);
app.use('/api', authorsRouter);

//app.listen - Binds and listens for connections on the specified host and port
app.listen(PORT, () => {
  console.log('The server is running on port 8000!');
});
