/* eslint func-names: "off" */
var Song = require('../models/song');
var Author = require('../models/author');

exports.getSongs = function (req, res) {
  Song.find({}, (err, songs) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ songs: songs });
  });
};

exports.getSong = function (req, res) {
  Song.findOne({ _id: req.params.id }, (err, song) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ song });
  });
};


exports.postSong = function (req, res) {
  var song = req.body;
  var existingAuthor, songID;

  if (song.author !== undefined) {
    existingAuthor = Author.findOne({ name: song.author });
    
    if (existingAuthor) {
      var author = {
        name : song.author
      };
      Author.create(author, (err, author) => {
        song.author = author.id;
      });
    }
  }

  Song.create(song, (err, song) => {
    
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'song': song, message: 'Song created' });

    if (existingAuthor) {
      songID = song._id;
      existingAuthor.songs.push(songID);
      existingAuthor.save();
    }
  });
};

exports.putSong = function (req, res) {
  res.send('put Song');
  // var id = req.params.id;
  // var song = req.body;
  // if (song && song._id !== id) {
  //   return res.status(500).json({ err: "Ids don't match!" });
  // }
  // Song.findByIdAndUpdate(id, song, { new: true }, (err) => {
  //   if (err) {
  //     return res.status(500).json({ err: err.message });
  //   }
  //   res.json({ 'song': song, message: 'Song Updated' });
  // });
};

exports.deleteSong = function(req, res) {
  res.send('delete Song');
  // var id = req.params.id;
  // Song.findByIdAndRemove(id, function(err, result) {
  //   if (err) {
  //     return res.status(500).json({ err: err.message });
  //   }
  //   res.json({ message: 'Song Deleted' });
  // });
}
