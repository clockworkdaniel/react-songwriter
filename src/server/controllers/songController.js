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


exports.postSong = async function (req, res) {
  const song = req.body;
  const authorName = song.author;
  const songTitle = song.title;

  function createSongWithAuthorId(author){
    Song.create({"title": songTitle, "author": author._id}, (err, song) => {  
      if (err) {
        return res.status(500).json({ err: err.message });
      }
      res.json({ 'song': song, message: 'Song created' });

      author.songs.push(song._id);
      author.save();
    });
  }

  Author.findOne({ "name": authorName }).then((author) => {
    if (author) {
      createSongWithAuthorId(author);
    } else {
      Author.create({name: authorName, songs: []}, (err, author) => {
        if (err) {
          return res.status(500).json({ err: err.message });
        }
        createSongWithAuthorId(author);
      })
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
