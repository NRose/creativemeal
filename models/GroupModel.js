var mongoose = require('mongoose');

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error);
db.once('open', function() {
	console.log("Group connected!");
 return null;
});
//ggf. Passwort
 const GroupSchema = new Schema({
    name: { type: String, default: '' },
    members:[{
    	type: mongoose.Schema.Types.ObjectId,
      	ref: "User"
      }]
  });

 var Group = mongoose.model('Group', GroupSchema);

  module.exports.Group = Group; 
