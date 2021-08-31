var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Mask = new Schema({
  // no: Number,
  // title: String,
  name: String,
  date: Date,
  map: [],
  // author: {type: Schema.Types.ObjectId, ref: 'User'},
  // published: Boolean,
});

module.exports = mongoose.model('Mask', Mask );
