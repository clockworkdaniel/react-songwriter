var mongoose = require('mongoose');

var Schema = mongoose.schema;

var userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
  // ownSongs
});

userSchema.virtual('url').get(function() {
  return '/catalog/user/' + this._id;
});

module.exports = mongoose.model('User', userSchema);
