const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  structure: Array,
  // user: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, required: true, default: Date.now },
  modified: { type: Date, required: true, default: Date.now },
});

songSchema.post('save', (doc, next) => {
  doc.populate('author').execPopulate().then(() => {
    next();
  });
});

module.exports = mongoose.model('Song', songSchema);
