export function getSongs(req, res) {
  Song.find({}, function(err, songs) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ songs: songs });
  });
}

export function getSong(req, res) {
  Song.findOne({ id: req.params.id }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ song });
  });
}


export function postSong(req, res) {
  var song = req.body;
  Song.create(song, function(err, song) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'song': song, message: 'Song Created' });
  });
}

export function putSong(req, res) {
  var id = req.params.id;
  var song = req.body;
  if (song && song._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Song.findByIdAndUpdate(id, song, {new: true}, function(err, song) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'song': song, message: 'Song Updated' });
  });
}

export function deleteSongs(req, res) {
  var id = req.params.id;
  Song.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Song Deleted' });
  });
}