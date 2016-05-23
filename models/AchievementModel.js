var mongoose = require('mongoose');

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error);
db.once('open', function() {
	console.log("Achievement connected!");
 return null;
});

 const AchievementSchema = new Schema({
    name: { type: String, default: '' }, 
    description: { type: String, default: '' }, 
    imgURL: {type: String, default: ''}
  });

 var Achievement = mongoose.model('Achievement', AchievementSchema);

  module.exports.Achievement = Achievement; 
