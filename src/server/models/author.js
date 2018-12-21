const mongoose = require('mongoose');

const { Schema } = mongoose;

const authorSchema = new Schema({
  name: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  modified: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Author', authorSchema);
