const Author = require('../../models/author');

exports.getAuthors = function getAuthors(req, res) {
  Author.find({}, (err, authors) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ authors });
  });
};

exports.getAuthor = function getAuthor(req, res) {
  Author.findOne({ _id: req.params.id }).exec((err, author) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ author });
  });
};
