/* eslint func-names: "off" */
var Song = require('../models/song');

exports.getSongs = function (req, res) {
  Song.find({}, (err, songs) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ songs: songs });
  });
};

exports.getSong = function (req, res) {
  Song.findOne({ id: req.params.id }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ song });
  });
};


exports.postSong = function (req, res) {
  var song = req.body;
  Song.create(song, (err, song) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'song': song, message: 'Song Created' });
  });
};

exports.putSong = function (req, res) {
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
//   var id = req.params.id;
//   Song.findByIdAndRemove(id, function(err, result) {
//     if (err) {
//       return res.status(500).json({ err: err.message });
//     }
//     res.json({ message: 'Song Deleted' });
//   });
}
