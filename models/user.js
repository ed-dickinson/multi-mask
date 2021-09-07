var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({

  email:{type:String,required:true,

  },
  password:{type:String,required:true},
  admin:{type:Boolean, default: false},
  date: {type:Date, default: Date.now}

});


module.exports = mongoose.model('User', User);
