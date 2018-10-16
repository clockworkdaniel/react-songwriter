/* eslint func-names: "off" */
var Author = require('../models/author');

exports.getAuthors = function (req, res) {
  Author.find({}, (err, authors) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ authors: authors });
  });
};

exports.getSong = function (req, res) {
  Author.findOne({ id: req.params.id }).exec((err, author) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ author });
  });
};


exports.postauthor = function (req, res) {
  var author = req.body;
  Author.create(author, (err, author) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'author': author, message: 'Author Created' });
  });
};

exports.putAuthor = function (req, res) {
  // var id = req.params.id;
  // var author = req.body;
  // if (author && Author._id !== id) {
  //   return res.status(500).json({ err: "Ids don't match!" });
  // }
  // Author.findByIdAndUpdate(id, author, { new: true }, (err) => {
  //   if (err) {
  //     return res.status(500).json({ err: err.message });
  //   }
  //   res.json({ 'author': author, message: 'Author Updated' });
  // });
};

exports.deleteAuthor = function(req, res) {
//   var id = req.params.id;
//   Author.findByIdAndRemove(id, function(err, result) {
//     if (err) {
//       return res.status(500).json({ err: err.message });
//     }
//     res.json({ message: 'Author Deleted' });
//   });
}
