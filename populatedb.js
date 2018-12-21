#! /usr/bin/env node

console.log('This script populates some test songs and artists to your database.');


const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017';
const db = mongoose.connection;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

const Artist = require('./src/server/models/artist');
const Song = require('./src/server/models/song');

function artistCreate(artistName) {
  return new Promise((resolve, reject) => {
    Artist.create({ name: artistName, songs: [] },
      (err, artist) => {
        if (err) {
          reject(err);
        }
        resolve(artist);
      });
  });
}

function createSongWithArtist(artist, songTitle) {
  return new Promise((resolve, reject) => {
    Song.create({ title: songTitle, artist: artist._id }, (err, song) => {
      if (err) {
        reject(err);
      }
      artist.songs.push(song._id);
      artist.modified = Date.now();
      artist.save();
      resolve(artist);
    });
  });
}

function createSong(songTitle, artistName) {
  return new Promise((resolve, reject) => {
    Artist.findOne({ name: artistName })
      .exec((err, existingArtist) => {
        if (err) {
          reject(err);
        }
        resolve(createSongWithArtist(existingArtist, songTitle));
      });
  });
}

const theBeatles = 'The Beatles';
const davidBowie = 'David Bowie';
const theKinks = 'The Kinks';
const theLas = 'The La\'s';
const tomWaits = 'Tom Waits';

function createArtists() {
  return Promise.all([
    artistCreate(theBeatles),
    artistCreate(davidBowie),
    artistCreate(theKinks),
    artistCreate(theLas),
    artistCreate(tomWaits)
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

createArtists().then(createSongs).then(() => {
  console.log('done');
}, (err) => {
  console.error(err);
}) ;
