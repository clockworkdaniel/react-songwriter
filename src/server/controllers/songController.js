var Song = require('../models/song');
var Author = require('../models/author');

exports.getSongs = function (req, res) {
  Song.find({}).populate('author', 'name').exec((err, songs) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ songs: songs });
  });
};

exports.getSong = function (req, res) {
  Song.findOne({ _id: req.params.id })
    .populate('author', 'name')
    .exec((err, song) => {
      if (err) {
        res.status(500).json({ message: err.message });
      }
      res.json({ song });
    });
};

function createSongWithAuthor(author, songTitle, res){
  Song.create({"title": songTitle, "author": author._id}, (err, song) => {  
    if (err) {
      return res.status(500).json({ err: err.message });
    }

    res.json({ 'song': song, message: 'Song created' });

    author.songs.push(song._id);
    author.save();
  });
}

exports.postSong = function (req, res) {
  const song = req.body;
  const authorName = song.author;
  const songTitle = song.title; 

  if (authorName) {
    Author.findOne({ "name": authorName }).then((author) => {
      if (author) {
        createSongWithAuthor(author, songTitle, res);
      } else {
        Author.create({name: authorName, songs: []}, (err, author) => {
          if (err) {
            return res.status(500).json({ err: err.message });
          }
          createSongWithAuthor(author, songTitle, res);
        })
      }
    });
  } else {
    Song.create({"title": songTitle}, (err, song) => {  
      if (err) {
        return res.status(500).json({ err: err.message });
      }
  
      res.json({ 'song': song, message: 'Song created' });

    });
  }
  
};

exports.putSong = function (req, res) {
  const id = req.params.id;

  Song.findByIdAndUpdate(id, song, { new: true }, (err) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'song': song, message: 'Song Updated' });
  });

  // potentially create new author if author does not exist

  // potentially delete author if old author no longer has any songs 
};

exports.deleteSong = function(req, res) {
  const id = req.params.id;
  Song.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Song Deleted' });
  });

  //delete the author if there are no more songs
}
