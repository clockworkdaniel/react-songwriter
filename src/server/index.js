var express = require('express');
var parser = require('body-parser');
//var path = require('path');
var mongoose = require('mongoose');
var router = require('./routes/songRoutes.js');

var mongoDB = 'mongodb://127.0.0.1:27017';
var db = mongoose.connection;

// require('./database');
// require('./seed');

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();


var PORT = 8000;

//currently this places the SPA on the homepage
//var DIST_DIR = path.join(__dirname, '/../../dist');
//app.use('/', express.static(DIST_DIR));

//app.use - mounts the specified middleware function or functions at the specified path
app.use(parser.json());
app.use('/api', router);

//app.listen - Binds and listens for connections on the specified host and port
app.listen(PORT, () => {
  console.log('The server is running on port 8000!');
});
