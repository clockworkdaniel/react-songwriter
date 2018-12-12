const Song = require('../models/song');
const Author = require('../models/author');

exports.getSongs = function getSongs(req, res) {
  Song.find({}).populate('author', 'name')
    .select('-structure')
    .exec((err, songs) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ songs });
    });
};

exports.getSong = function getSong(req, res) {
  Song.findOne({ _id: req.params.id })
    .populate('author', 'name')
    .exec((err, song) => {
      if (err) {
        res.status(500).json({ message: err.message });
      }
      res.json({ song });
    });
};

function createSongWithAuthor(author, songTitle, res) {
  Song.create({ title: songTitle, author: author._id }, (err, song) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }

    res.json({ song, message: 'Song created' });

    author.songs.push(song._id);
    author.save();
  });
}

exports.postSong = function postSong(req, res) {
  const song = req.body;
  const authorName = song.author;
  const songTitle = song.title;

  if (authorName) {
    Author.findOne({ name: authorName }).then((author) => {
      if (author) {
        createSongWithAuthor(author, songTitle, res);
      } else {
        Author.create({ name: authorName, songs: [] }, (err, createdAuthor) => {
          if (err) {
            return res.status(500).json({ err: err.message });
          }
          createSongWithAuthor(createdAuthor, songTitle, res);
        });
      }
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

exports.putSong = function putSong(req, res) {
  const { id } = req.params;
  const song = req.body;

  Song.findByIdAndUpdate(id, {
    title: song.title,
    author: song.author,
    structure: song.structure
  }, { new: true }, (err, updatedSong) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.status(200).json({ song: updatedSong, message: 'Song updated' });
  });

  // potentially create new author if author does not exist

  // potentially delete author if old author no longer has any songs
};

exports.deleteSong = function deleteSong(req, res) {
  const { id } = req.params;
  Song.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Song Deleted' });
  });

  // delete the author if there are no more songs
};
