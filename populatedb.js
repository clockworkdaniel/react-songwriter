#! /usr/bin/env node

console.log('This script populates some test songs and authors to your database.');


const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017';
const db = mongoose.connection;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

const Author = require('./src/server/models/author');
const Song = require('./src/server/models/song');

function authorCreate(authorName) {
  return new Promise((resolve, reject) => {
    Author.create({ name: authorName, songs: [] },
      (err, author) => {
        if (err) {
          reject(err);
        }
        console.log(author);
        resolve(author);
      });
  });
}

function createSongWithAuthor(author, songTitle) {
  return new Promise((resolve, reject) => {
    Song.create({ title: songTitle, author: author._id }, (err, song) => {
      if (err) {
        reject(err);
      }
      author.songs.push(song._id);
      author.modified = Date.now();
      author.save();
      resolve(author);
    });
  });
}

function createSong(songTitle, authorName) {
  return new Promise((resolve, reject) => {
    Author.findOne({ name: authorName })
      .exec((err, existingAuthor) => {
        if (err) {
          reject(err);
        }
        resolve(createSongWithAuthor(existingAuthor, songTitle));
      });
  });
}

const theBeatles = 'The Beatles';
const davidBowie = 'David Bowie';
const theKinks = 'The Kinks';
const theLas = 'The La\'s';
const tomWaits = 'Tom Waits';

function createAuthors() {
  return Promise.all([
    authorCreate(theBeatles),
    authorCreate(davidBowie),
    authorCreate(theKinks),
    authorCreate(theLas),
    authorCreate(tomWaits)
  ]);
}

function createSongs() {
  return Promise.all([
    createSong('Get Back', theBeatles),
    createSong('Across The Universe', theBeatles),
    createSong('I Feel Fine', theBeatles),
    createSong('Happiness Is A Warm Gun', theBeatles),
    createSong('Dear Prudence', theBeatles),
    createSong('I\'m Only Sleeping', theBeatles),
    createSong('Baby\'s In Black', theBeatles),
    createSong('Rocky Racoon', theBeatles),
    createSong('Rock \'n\' Roll Suicide', davidBowie),
    createSong('Diamond Dogs', davidBowie),
    createSong('Rebel Rebel', davidBowie),
    createSong('Ashes To Ashes', davidBowie),
    createSong('Heroes', davidBowie),
    createSong('The Jean Genie', davidBowie),
    createSong('Waterloo Sunset', theKinks),
    createSong('Sunny Afternoon', theKinks),
    createSong('Big Sky', theKinks),
    createSong('The Village Green Presevation Society', theKinks),
    createSong('There She Goes', theLas),
    createSong('Timeless Melody', theLas),
    createSong('Son Of A Gun', theLas),
    createSong('Doledrum', theLas),
    createSong('Blue Valentine', tomWaits),
    createSong('Old Shoes (& Picture Postcards)', tomWaits),
    createSong('Christmas Card From A Hooker In Minneapolis', tomWaits),
    createSong('Falling Down', tomWaits),
    createSong('Town With No Cheer', tomWaits)
  ])
}

createAuthors().then(createSongs).then(() => {
  console.log('done');
}, (err) => {
  console.error(err);
}) ;
