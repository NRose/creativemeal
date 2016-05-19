var mongoose = require('mongoose');

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error);
db.once('open', function() {
 console.log("DB connected!");
 return null;
});

 const UserSchema = new Schema({
    username: { type: String, default: '' }, 
    password: { type: String, default: '' }, 
    email:  { type: String, default: '' },
    points: { type: Number, default: 0 }, 
    preferences: {
      fish: { type: Boolean, default: true },
      beef: { type: Boolean, default: true },
      pork: { type: Boolean, default: true },
      hotpot: { type: Boolean, default: true },
      poultry: { type: Boolean, default: true }
    },
    achievements: [{
      type: mongoose.Schema.Types.ObjectId,
      amount: { type: Number, default: 0 }, 
      ref: "Achievement"
    }],
    group: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    }],
    created: { type: Date, default: Date.now() },
    verified: { type:Boolean, default: false},
    deleted: { type: Boolean, default: '' }
  });

 var User = mongoose.model('User', UserSchema);

  module.exports.User = User; 
