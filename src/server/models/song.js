var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var songSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  //user: { type: Schema.Types.ObjectId, ref: 'User' },
  //structure: [{ type: Schema.Types.ObjectId, ref: 'Section', required: true }],
  //genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
});

songSchema.virtual('url').get(function() {
  return '/catalog/song/' + this._id;
});

module.exports = mongoose.model('Song', songSchema);
