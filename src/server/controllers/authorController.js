var Author = require('../models/author');

exports.getAuthors = function (req, res) {
  Author.find({}, (err, authors) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ authors: authors });
  });
};

exports.getAuthor = function (req, res) {
  Author.findOne({ id: req.params.id }).exec((err, author) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ author });
  });
};
