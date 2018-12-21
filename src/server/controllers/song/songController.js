const Song = require('../../models/song');
const Artist = require('../../models/artist');

exports.getSongs = function getSongs(req, res) {

  const allOrByArtist = req.params.id ? { artist: req.params.id } : {};

  Song.find(allOrByArtist, null, { sort: { title: 1 } })
    .select('-structure')
    .populate('artist', 'name')
    .exec((err, songs) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ songs });
    });
};

exports.getSong = function getSong(req, res) {
  Song.findById(req.params.id)
    .populate('artist', 'name')
    .exec((err, song) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ song });
    });
};


function createSongWithArtist(artist, songTitle, res) {
  Song.create({ title: songTitle, artist: artist._id }, (err, song) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    artist.songs.push(song._id);
    artist.modified = Date.now();
    artist.save();
    res.json({ song, message: 'Song created' });
  });
}

exports.postSong = function postSong(req, res) {
  const song = req.body;
  const artistName = song.artist;
  const songTitle = song.title;

  if (artistName) {
    Artist.findOne({ name: artistName }).exec((err, existingArtist) => {
      if (err) {
        return res.status(500).json({ err: err.message });
      }
      if (existingArtist) {
        return createSongWithArtist(existingArtist, songTitle, res);
      }
      Artist.create({ name: artistName, songs: [] }, (err, createdArtist) => {
        if (err) {
          return res.status(500).json({ err: err.message });
        }
        createSongWithArtist(createdArtist, songTitle, res);
      });
    });
  } else {
    Song.create({ title: songTitle }, (err, createdSong) => {
      if (err) {
        return res.status(500).json({ err: err.message });
      }
      res.json({ song: createdSong, message: 'Song created' });
    });
  }

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
      res.json({ song, message: 'Song updated and artist modified updated' });
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
      res.json({ song, message: 'Song updated' });
    });
  }
}

exports.putSong = function putSong(req, res) {
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
      updateSongArtist(songAsItExisted, song.artist, res);
    });
};

exports.deleteSong = function deleteSong(req, res) {
  const { id } = req.params;

  Song.findByIdAndDelete(id).exec((err, song) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    Artist.findById(song.artist._id).exec((err, foundArtist) => {
      const pullArtistPromise = new Promise((resolve, reject) => {
        foundArtist.songs.pull(song._id);
        resolve(foundArtist.save());
      });
      pullArtistPromise.then((artist) => {
        deleteArtistIfSongsEmpty(artist);
        res.json({ message: 'Song Deleted' });
      });
    });
  });
};
