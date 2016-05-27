var mongoose = require('mongoose');
var Validator   = require('express-validator');
var User     = require('../models/UserModel').User;
var Quest = require('../models/QuestModel').Quest;
var Response    = require('../helper/responseHelper');
var Promise = require('bluebird');

// Called when: 'POST /users HTTP/1.1'
module.exports.createUser = function (req, res, next) {
  
	req.checkBody('username', 'Username must be between 4 and 16 characters.').notEmpty();
  req.checkBody('password', 'Password must be between 6 and 32 characters.').notEmpty(); 
  req.checkBody('email', 'No valid Email given.').isEmail();

    console.log(req.body);
  	var errors = req.validationErrors();
  	if(errors) {
    	return next(new Response.error(400, 'Validation errors occured', errors));
  	}
  	else {
    	var body = req.body;
    	console.log(body);
    	var user = new User({
    		username: body.username,
    		password: body.password,
    		email: body.email,
    		preferences: body.preferences,
    		created: Date.now(),
    		deleted: false
    	});

      var firstQuest;

      getOneRandomQuest()
        .then(function (quest) {
          console.log("NEW QUESTID:", quest);
          user.quests.push(quest);
        })
        .catch(function (err) {
          err.code = err.code || undefined;
          console.log(err);
        });

      getOneRandomQuest()
        .then(function (quest) {
          console.log("NEW QUESTID:", quest);
          user.quests.push(quest);
          console.log(user.quests);
        })
        .catch(function (err) {
          err.code = err.code || undefined;
          console.log(err);
        });

      /*
      user.save(function(err) {
  			if (err) 
  				return next(new Response.error(err.statusCode));

  			 req.response = new Response.ok(user);
  			 return next();		
      }); */
      req.response = new Response.ok(user);
         return next();   
  }
};

// Called when: 'GET /users HTTP/1.1'
module.exports.getAllUser = function(req, res, next){
	User.find({}, function(err, users) {
      if (err) {
        console.log("ERROR!!");
		 	  return next(new Response.error(err.statusCode));
     }

		req.response = new Response.ok(users);
  		return next();	
    });
};

// Called when: 'GET /users/{id} HTTP/1.1'
module.exports.getUser = function(req, res, next){

	var id = req.params.id;
	
	User.findOne({_id:id}, '', function(err,user) {
		if (err) 
		 	return next(new Response.error(err.statusCode));

		req.response = new Response.ok(user);
  		return next();	
	});
};

// Called when: 'PUT /users/{id} HTTP/1.1'
module.exports.updateUser = function(req, res, next){
	
	var id = req.params.id;
	
	User.findByIdAndUpdate({_id:id}, req.body, function(err,user) {
		if (err) 
			return next(new Response.error(err.statusCode));

		req.response = new Response.ok(user);
  		return next();	
	});
};

// Called when: 'DELETE /users/{id} HTTP/1.1'
module.exports.deleteUser = function(req, res, next){

	var id = req.params.id;
	User.findByIdAndRemove({_id:id}, '', function(err, user){
		if (err) 
		 	return next(new Response.error(err.statusCode));

		req.response = new Response.ok(user);
  		return next();	
	});
};

  //get a Random Quest for new Users
function getOneRandomQuest(){

  return new Promise(function (resolve, reject) {
      var quest;
      Quest.count({}, function(err, result){
        
        var randomQuest = Math.floor(Math.random() * result) + 1; 
        console.log("COUNT: ", randomQuest);
        Quest.find({},{},{skip:randomQuest, limit:1}, function(err, quest_res){
          if (quest_res){
            quest = quest_res[0]._id;
            resolve(quest);
             
          }
          else {
            console.log(err);
            reject(err);
          }    
        });
      });  
  }); 
}



