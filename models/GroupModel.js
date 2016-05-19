var mongoose = require('mongoose');

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error);
db.once('open', function() {
 return null;
});
//ggf. Passwort
 const GroupSchema = new Schema({
    name: { type: String, default: '' }
  });

 var Group = mongoose.model('Group', GroupSchema);

  module.exports.Group = Group; 
