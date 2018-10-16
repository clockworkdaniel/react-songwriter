var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
  name: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
});

authorSchema.virtual('url').get(function() {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', authorSchema);
