var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Mask = new Schema({
  // no: Number,
  name: String,
  date: Date,
  map: [],
  user: {type: Schema.Types.ObjectId, ref: 'User'}
  
});

module.exports = mongoose.model('Mask', Mask );
