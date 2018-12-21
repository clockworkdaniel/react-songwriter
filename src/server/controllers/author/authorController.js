const Author = require('../../models/author');

exports.getAuthors = function getAuthors(req, res) {
  Author.find({}, null, { sort: { name: 1 } })
    .populate('songs', ['title', 'created', 'modified'])
    .exec((err, authors) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ authors });
    });
};

exports.getAuthor = function getAuthor(req, res) {
  Author.findOne({ _id: req.params.id })
    .populate('songs', ['title', 'created', 'modified'])
    .exec((err, author) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ authors: [author] });
    });
};
