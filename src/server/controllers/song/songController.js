const Song = require('../../models/song');
const Author = require('../../models/author');

exports.getSongs = function getSongs(req, res) {

  const allOrByAuthor = req.params.id ? { author: req.params.id } : {};

  Song.find(allOrByAuthor, null, { sort: { title: 1 } })
    .select('-structure')
    .populate('author', 'name')
    .exec((err, songs) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res.json({ songs });
    });
};

exports.getSong = function getSong(req, res) {
  Song.findById(req.params.id)
    .populate('author', 'name')
    .exec((err, song) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res.json({ song });
    });
};


function createSongWithAuthor(author, songTitle, res) {
  Song.create({ title: songTitle, author: author._id }, (err, song) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    author.songs.push(song._id);
    author.modified = Date.now();
    author.save();
    return res.json({ song, message: 'Song created' });
  });
}

exports.postSong = function postSong(req, res) {
  const song = req.body;
  const authorName = song.author;
  const songTitle = song.title;

  if (authorName) {
    Author.findOne({ name: authorName }).exec((err, existingAuthor) => {
      if (err) {
        return res.status(500).json({ err: err.message });
      }
      if (existingAuthor) {
        return createSongWithAuthor(existingAuthor, songTitle, res);
      }
      Author.create({ name: authorName, songs: [] }, (err, createdAuthor) => {
        if (err) {
          return res.status(500).json({ err: err.message });
        }
        createSongWithAuthor(createdAuthor, songTitle, res);
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

function deleteAuthorIfSongsEmpty(author) {
  if (!author.songs.length) {
    author.remove();
  }
}

function updateSongAuthor(song, newAuthor, res) {

  Author.findById(song.author._id).exec((err, oldAuthor) => {
    const pullAuthorPromise = new Promise((resolve, reject) => {
      oldAuthor.songs.pull(song._id);
      resolve(oldAuthor.save());
    });
    pullAuthorPromise.then((author) => {
      deleteAuthorIfSongsEmpty(author);
    });
  });

  const newAuthorId = new Promise((resolve, reject) => {
    Author.findOne({ name: newAuthor.name }).exec((err, foundAuthor) => {
      if (err) {
        res.status(500).json({ err: err.message });
      }
      if (foundAuthor) {
        foundAuthor.songs.push(song._id);
        foundAuthor.modified = Date.now();
        foundAuthor.save();
        resolve(foundAuthor._id);
      } else {
        Author.create({ name: newAuthor.name, songs: [song._id] }, (err, createdAuthor) => {
          if (err) {
            res.status(500).json({ err: err.message });
          }
          resolve(createdAuthor._id);
        });
      }
    });
  });

  newAuthorId.then((authorId) => {
    song.author = authorId;
    song.save();
    return res.json({ song, message: 'Song updated' });
  });
}

exports.putSong = function putSong(req, res) {
  const { id } = req.params;
  const song = req.body;

  Song.findByIdAndUpdate(id, {
    title: song.title,
    structure: song.structure,
    modified: Date.now()
  }).populate('author', 'name')
    .exec((err, songAsItExisted) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (song.author.name === songAsItExisted.author.name) {
        return res.json({ song, message: 'Song updated' });
      }
      updateSongAuthor(songAsItExisted, song.author, res);
    });
};

exports.deleteSong = function deleteSong(req, res) {
  const { id } = req.params;

  Song.findByIdAndDelete(id).exec((err, song) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    Author.findById(song.author._id).exec((err, foundAuthor) => {
      const pullAuthorPromise = new Promise((resolve, reject) => {
        foundAuthor.songs.pull(song._id);
        resolve(foundAuthor.save());
      });
      pullAuthorPromise.then((author) => {
        deleteAuthorIfSongsEmpty(author);
        res.json({ message: 'Song Deleted' });
      });
    });
  });
};
