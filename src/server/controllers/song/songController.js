const Song = require('../../models/song');
const Artist = require('../../models/artist');
const User = require('../../models/user');

exports.getSongs = function getSongs(req, res) {

  const { userId } = req.session;

  const allOrByArtist = req.params.id
    ? { artist: req.params.id, $or: [{ isPublic: true }, { user: userId }] }
    : { $or: [{ isPublic: true }, { user: userId }] };

  Song.find(allOrByArtist, null, { sort: { title: 1 } })
    .select('-structure')
    .populate('artist', 'name')
    .exec((err, songs) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json({ songs });
    });
};

exports.getSong = function getSong(req, res) {

  const { userId } = req.session;

  Song.findById(req.params.id)
    .populate('artist', 'name')
    .exec((err, song) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!song.isPublic && (userId !== song.user.toString())) {
        return res.status(401).json({ message: 'Private song, please sign in' });
      }
      if (userId !== song.user.toString()) {
        return res.status(200).json({ song, editable: false });
      }
      res.status(200).json({ song, editable: true });
    });
};

exports.postSong = function postSong(req, res) {

  const { userId } = req.session;

  const song = req.body;
  const artistName = song.artist;
  const songTitle = song.title;

  function createSongWithArtist(artist, songTitle, user, res) {
    Song.create({ title: songTitle, artist: artist._id, user: user._id }, (err, createdSong) => {
      if (err) {
        return res.status(500).json({ err: err.message });
      }

      user.songs.push(createdSong._id);
      user.save();

      artist.songs.push(createdSong._id);
      artist.modified = Date.now();
      artist.save();
      res.status(201).json({ song: createdSong, message: 'Song created' });
    });
  }

  const foundUserPromise = new Promise((resolve, reject) => {
    User.findById(userId).exec((err, foundUser) => {
      if (err) {
        reject(err);
      }
      resolve(foundUser);
    });
  });

  // can result in: no artistName (undefined), artist doesn't exist (null) or artist exists
  const existingArtistPromise = artistName && new Promise((resolve, reject) => {
    Artist.findOne({ name: artistName }).exec((err, existingArtist) => {
      if (err) {
        reject(err);
      } else {
        resolve(existingArtist);
      }
    });
  });

  Promise.all([foundUserPromise, existingArtistPromise]).then((values) => {
    const foundUser = values[0];
    const existingArtist = values[1];

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (existingArtist) {
      createSongWithArtist(existingArtist, songTitle, foundUser, res);
    }
    if (existingArtist === null) {
      Artist.create({ name: artistName, songs: [] }, (err, createdArtist) => {
        if (err) {
          return res.status(500).json({ err: err.message });
        }
        createSongWithArtist(createdArtist, songTitle, foundUser, res);
      });
    }
    if (existingArtist === undefined) {
      Song.create({ title: songTitle, user: foundUser._id }, (err, createdSong) => {
        if (err) {
          return res.status(500).json({ err: err.message });
        }

        foundUser.songs.push(createdSong._id);
        foundUser.save();

        res.status(201).json({ song: createdSong, message: 'Song created' });
      });
    }
  });
};

function deleteArtistIfSongsEmpty(artist) {
  if (!artist.songs.length) {
    artist.remove();
  }
}

function updateSongArtist(song, newArtist, res) {

  if (song.artist.name === newArtist.name) {
    Artist.findById(song.artist._id).exec((err, foundArtist) => {
      if (err) {
        res.status(500).json({ message: err.message });
      }
      foundArtist.modified = Date.now();
      foundArtist.save();
      res.status(200).json({ song, message: 'Song updated and artist modified updated' });
    });
  } else {
    Artist.findById(song.artist._id).exec((err, oldArtist) => {
      const pullArtistPromise = new Promise((resolve, reject) => {
        oldArtist.songs.pull(song._id);
        resolve(oldArtist.save());
      });
      pullArtistPromise.then((artist) => {
        deleteArtistIfSongsEmpty(artist);
      });
    });

    const newArtistId = new Promise((resolve, reject) => {
      Artist.findOne({ name: newArtist.name }).exec((err, foundArtist) => {
        if (err) {
          res.status(500).json({ err: err.message });
        }
        if (foundArtist) {
          foundArtist.songs.push(song._id);
          foundArtist.modified = Date.now();
          foundArtist.save();
          resolve(foundArtist._id);
        } else {
          Artist.create({ name: newArtist.name, songs: [song._id] }, (err, createdArtist) => {
            if (err) {
              res.status(500).json({ err: err.message });
            }
            resolve(createdArtist._id);
          });
        }
      });
    });
    newArtistId.then((artistId) => {
      song.artist = artistId;
      song.save();
      res.status(200).json({ song, message: 'Song updated' });
    });
  }
}

exports.putSong = function putSong(req, res) {
  const { userId } = req.session;
  const { id } = req.params;
  const song = req.body;

  Song.findByIdAndUpdate(id, {
    title: song.title,
    structure: song.structure,
    modified: Date.now()
  }).populate('artist', 'name')
    .exec((err, songAsItExisted) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (userId !== songAsItExisted.user.toString()) {
        return res.status(401).json({ message: 'Unauthorised' });
      }
      updateSongArtist(songAsItExisted, song.artist, res);
    });
};

exports.deleteSong = function deleteSong(req, res) {
  const { userId } = req.session;
  const { id } = req.params;

  Song.findByIdAndDelete(id).exec((err, song) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    if (userId !== song.user.toString()) {
      return res.status(401).json({ message: 'Unauthorised' });
    }
    Artist.findById(song.artist._id).exec((err, foundArtist) => {
      const pullArtistPromise = new Promise((resolve, reject) => {
        foundArtist.songs.pull(song._id);
        resolve(foundArtist.save());
      });
      pullArtistPromise.then((artist) => {
        deleteArtistIfSongsEmpty(artist);
        res.status(200).json({ message: 'Song deleted' });
      });
    });
  });
};

exports.togglePrivacy = function togglePrivacy(req, res) {
  const { userId } = req.session;
  const { id } = req.params;

  Song.findById(id).exec((err, song) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    if (userId !== song.user.toString()) {
      return res.status(401).json({ message: 'Unauthorised' });
    }
    song.isPublic = !song.isPublic;
    song.save();

    res.status(200).json({ isPublic: song.isPublic, message: 'Song updated' });
  });
};
