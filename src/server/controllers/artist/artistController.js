const Artist = require('../../models/artist');

exports.getArtists = function getArtists(req, res) {
  Artist.find({}, null, { sort: { name: 1 } })
    .populate('songs', ['title', 'created', 'modified'])
    .exec((err, artists) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ artists });
    });
};

exports.getArtist = function getArtist(req, res) {
  Artist.findOne({ _id: req.params.id })
    .populate('songs', ['title', 'created', 'modified'])
    .exec((err, artist) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ artists: [artist] });
    });
};
