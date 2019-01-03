const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema({
  title: { type: String, trim: true, required: true },
  artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
  structure: Array,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created: { type: Date, required: true, default: Date.now },
  modified: { type: Date, required: true, default: Date.now },
  public: { type: Boolean, default: false }
});

songSchema.post('save', (song, next) => {
  song.populate('artist').execPopulate().then(() => {
    next();
  });
});

module.exports = mongoose.model('Song', songSchema);
