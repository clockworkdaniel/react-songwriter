const mongoose = require('mongoose');

const Schema = mongoose.schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
  // ownSongs
});

module.exports = mongoose.model('User', userSchema);
