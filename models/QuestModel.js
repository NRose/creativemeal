var mongoose = require('mongoose');

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error);
db.once('open', function() {
 
 return null;
});

 const QuestSchema = new Schema({
    name: { type: String, default: '' }, 
    description: { type: String, default: '' }, 
    points: { type: Number, default: 0 }, 
    property: {
      fish: { type: Boolean, default: false },
      beef: { type: Boolean, default: false },
      pork: { type: Boolean, default: false },
      hotpot: { type: Boolean, default: false },
      poultry: { type: Boolean, default: false }
    },
    deleted: { type: Boolean, default: '' }
  });

 var Quest = mongoose.model('quests', QuestSchema);

  module.exports.Quest = Quest; 
