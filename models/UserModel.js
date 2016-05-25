var mongoose = require('mongoose');

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error);
db.once('open', function() {
  console.log("User connected!");
 return null;
});

 const UserSchema = new Schema({
    username: { type: String, default: '' }, 
    password: { type: String, default: '' }, 
    email:  { type: String, default: '' },
    points: { type: Number, default: 0 }, 
    preferences: {
      fish: { type: Boolean, default: false },
      beef: { type: Boolean, default: false },
      pork: { type: Boolean, default: false },
      hotpot: { type: Boolean, default: false },
      poultry: { type: Boolean, default: false }
    },
    quests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quest"
    }],
    completedQuests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quest"
    }],
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
    deleted: { type: Boolean, default: false }
  });

 var User = mongoose.model('User', UserSchema);

  module.exports.User = User; 
