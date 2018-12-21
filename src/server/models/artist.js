const mongoose = require('mongoose');

const { Schema } = mongoose;

const artistSchema = new Schema({
  name: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  modified: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Artist', artistSchema);
