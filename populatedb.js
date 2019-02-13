const rockyRacoon = require('./src/server/mockStructures/RockyRacoon.json');
const norwegianWood = require('./src/server/mockStructures/NorwegianWood.json');
const dearPrudence = require('./src/server/mockStructures/DearPrudence.json');
const iFeelFine = require('./src/server/mockStructures/IFeelFine.json');
const timelessMelody = require('./src/server/mockStructures/TimelessMelody.json');

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

function createSong(songTitle, artistName, username, public, structure = []) {

  return Promise.all([
    findArtist(artistName),
    findUser(username)
  ]).then((artistAndUser) => {
    const artist = artistAndUser[0];
    const user = artistAndUser[1];
    Song.create({ 
      title: songTitle, artist: artist._id, user: user._id, isPublic: public, structure
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
const danielMears = 'Daniel Mears';

function createUsers() {
  return Promise.all([
    userCreate('Indiana_Jones', 'indy@thelostark.com', 'ihatesnakes' ),
    userCreate('Han_Solo', 'han@cloudcity.com', 'betrayedagain'),
    userCreate('Shoestring', 'clockworkdaniel@gmail.com', 'docmartens')
  ]);
}

function createArtists() {
  return Promise.all([
    artistCreate(theBeatles),
    artistCreate(davidBowie),
    artistCreate(theKinks),
    artistCreate(theLas),
    artistCreate(tomWaits),
    artistCreate(danielMears)
  ]);
}

function createSongs() {
  return Promise.all([
    //Han Solo
    createSong('I\'m Only Sleeping', theBeatles, 'Han_Solo', true),
    createSong('Baby\'s In Black', theBeatles, 'Han_Solo', false),
    createSong('Rocky Racoon', theBeatles, 'Han_Solo', true, rockyRacoon),
    createSong('I Feel Fine', theBeatles, 'Han_Solo', true, iFeelFine),
    createSong('Rebel Rebel', davidBowie, 'Han_Solo', false),
    createSong('Ashes To Ashes', davidBowie, 'Han_Solo', false),
    createSong('Waterloo Sunset', theKinks, 'Han_Solo', true),
    createSong('The Village Green Presevation Society', theKinks, 'Han_Solo', true),
    createSong('Blue Valentine', tomWaits, 'Han_Solo', false),
    //Indiana Jones
    createSong('Happiness Is A Warm Gun', theBeatles, 'Indiana_Jones', false),
    createSong('Dear Prudence', theBeatles, 'Indiana_Jones', true, dearPrudence),
    createSong('Heroes', davidBowie, 'Indiana_Jones', false),
    createSong('The Jean Genie', davidBowie, 'Indiana_Jones', false),
    createSong('There She Goes', theLas, 'Indiana_Jones', true),
    createSong('Doledrum', theLas, 'Indiana_Jones', false),
    createSong('Christmas Card From A Hooker In Minneapolis', tomWaits, 'Indiana_Jones', true),
    createSong('Town With No Cheer', tomWaits, 'Indiana_Jones', false),
    //Shoestring
    createSong('I\'m So Tired', theBeatles, 'Shoestring', false),
    createSong('Norwegian Wood', theBeatles, 'Shoestring', true, norwegianWood),
    createSong('Rock \'n\' Roll Suicide', davidBowie, 'Shoestring', true),
    createSong('Sunny Afternoon', theKinks, 'Shoestring', true),
    createSong('Timeless Melody', theLas, 'Shoestring', true, timelessMelody),
    createSong('Old Shoes (& Picture Postcards)', tomWaits, 'Shoestring', true),
    createSong('Falling Down', tomWaits, 'Shoestring', true),
    createSong('Stealing Shade From Squirrels', danielMears, 'Shoestring', true),
    createSong('Brother', danielMears, 'Shoestring', false),
    createSong('Frequencies', danielMears, 'Shoestring', false),
    createSong('Meantime', danielMears, 'Shoestring', false)
  ])
}

createArtists().then(createUsers).then(createSongs).then(() => {
  console.log('database populated');
}, (err) => {
  console.error(err);
});
