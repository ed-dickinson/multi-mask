var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
  // no: Number,
  email:{type:String,required:true,
    // unique:true,
    // dropDups: true,
    // index:true,
  },
  password:{type:String,required:true},
  admin:{type:Boolean, default: false},
  // name: String,
  date: {type:Date, default: Date.now}
  // author: {type: Schema.Types.ObjectId, ref: 'User'},
});


module.exports = mongoose.model('User', User );
