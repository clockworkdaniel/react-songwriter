#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Song = require('./src/server/models/song')
var Author = require('./src/server/models/author')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var authors = []
var songs = []

function songCreate(title, author, cb) {
  songDetail = {title: title, author: author }
  
  var song = new Song(songDetail);
       
  song.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    //console.log('New Song: ' + song);
    songs.push(song)
    cb(null, song)
  }  );
}

function authorCreate(name, cb) {
  authorDetail = { 
    name: name,
  }
    
  var author = new Author(authorDetail);    
  author.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    //console.log('New Author: ' + author);
    authors.push(author)
    cb(null, author)
  }  );
}

function createAuthors(cb) {
    async.parallel([
        function(callback) {
          authorCreate('Tom Waits', callback);
        },
        function(callback) {
          authorCreate('Hinds', callback);
        },
        function(callback) {
          authorCreate('Honeyblood', callback);
        },
        ],
        // optional callback
        cb);
}


function createSongs(cb) {
  console.log('test')
    async.parallel([
        function(callback) {
          songCreate('Falling Down', authors[0], callback);
        },
        function(callback) {
          songCreate('Soberland', authors[1], callback);
        },
        function(callback) {
          songCreate('Biro', authors[2], callback);
        },
        function(callback) {
          songCreate('Step Right Up', authors[0], callback);
        }
        ],
        // optional callback
        cb);
}

async.series([
    createAuthors,
    createSongs
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

// mongoose.connection.collections['authors'].drop(function(err){
//   console.log('collection dropped');
// })
// mongoose.connection.collections['songs'].drop(function(err){
//   console.log('collection dropped');
// })