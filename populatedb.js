#! /usr/bin/env node

console.log('This script populates some test songs and artists to your database.');


const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

const Artist = require('./src/server/models/artist');
const Song = require('./src/server/models/song');
const User = require('./src/server/models/user');

function userCreate(username, email, password) {
  return new Promise((resolve, reject) => {
    User.create({ username, email, password }, (err, createdUser) => {
      if (err) {
        reject(err);
      }
      resolve(createdUser);
    });
  });
}

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

function findArtist(artistName) {
  return new Promise((resolve, reject) => {
    Artist.findOne({ name: artistName })
      .exec((err, existingArtist) => {
        if (err) {
          reject(err);
        }
        resolve(existingArtist);
      });
    });
}

function findUser(username) {
  return new Promise((resolve, reject) => {
    User.findOne({ username })
      .exec((err, existingUser) => {
        if (err) {
          reject(err);
        }
        resolve(existingUser);
      });
    });
}

function createSong(songTitle, artistName, username, public) {

  return Promise.all([
    findArtist(artistName),
    findUser(username)
  ]).then((artistAndUser) => {
    const artist = artistAndUser[0];
    const user = artistAndUser[1];
    Song.create({ 
      title: songTitle, artist: artist._id, user: user._id, public 
    }, (err, song) => {
      if (err) {
        reject(err);
      }
      user.songs.push(song._id);
      user.save();
      artist.songs.push(song._id);
      artist.modified = Date.now();
      artist.save();
    });
  });
}

const theBeatles = 'The Beatles';
const davidBowie = 'David Bowie';
const theKinks = 'The Kinks';
const theLas = 'The La\'s';
const tomWaits = 'Tom Waits';

function createUsers() {
  return Promise.all([
    userCreate('Indiana_Jones', 'indy@thelostark.com', 'ihatesnakes' ),
    userCreate('Han_Solo', 'han@cloudcity.com', 'betrayedagain')
  ]);
}

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
    createSong('Get Back', theBeatles, 'Indiana_Jones', true),
    createSong('Across The Universe', theBeatles, 'Indiana_Jones', true),
    createSong('I Feel Fine', theBeatles, 'Indiana_Jones', true),
    createSong('Happiness Is A Warm Gun', theBeatles, 'Indiana_Jones', false),
    createSong('Dear Prudence', theBeatles, 'Indiana_Jones', false),
    createSong('I\'m Only Sleeping', theBeatles, 'Han_Solo', true),
    createSong('Baby\'s In Black', theBeatles, 'Han_Solo', false),
    createSong('Rocky Racoon', theBeatles, 'Han_Solo', true),
    createSong('Rock \'n\' Roll Suicide', davidBowie, 'Han_Solo', false),
    createSong('Diamond Dogs', davidBowie, 'Han_Solo', false),
    createSong('Rebel Rebel', davidBowie, 'Han_Solo', false),
    createSong('Ashes To Ashes', davidBowie, 'Han_Solo', false),
    createSong('Heroes', davidBowie, 'Indiana_Jones', true),
    createSong('The Jean Genie', davidBowie, 'Indiana_Jones', false),
    createSong('Waterloo Sunset', theKinks, 'Han_Solo', true),
    createSong('Sunny Afternoon', theKinks, 'Han_Solo', true),
    createSong('Big Sky', theKinks, 'Han_Solo', true),
    createSong('The Village Green Presevation Society', theKinks, 'Han_Solo', true),
    createSong('There She Goes', theLas, 'Indiana_Jones', false),
    createSong('Timeless Melody', theLas, 'Indiana_Jones', false),
    createSong('Son Of A Gun', theLas, 'Indiana_Jones', false),
    createSong('Doledrum', theLas, 'Indiana_Jones', false),
    createSong('Blue Valentine', tomWaits, 'Han_Solo', false),
    createSong('Old Shoes (& Picture Postcards)', tomWaits, 'Han_Solo', true),
    createSong('Christmas Card From A Hooker In Minneapolis', tomWaits, 'Indiana_Jones', true),
    createSong('Falling Down', tomWaits, 'Indiana_Jones', true),
    createSong('Town With No Cheer', tomWaits, 'Indiana_Jones', false)
  ])
}

// Note: There are no public songs by The La's - They all belong to Solo
// Heroes is the only public David Bowie song, all belong to Han Solo exc

createArtists().then(createUsers).then(createSongs).then(() => {
  console.log('database populated');
}, (err) => {
  console.error(err);
});
