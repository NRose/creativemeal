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

      //get two random quests for the new User
      var randomQuest1 = Math.floor(Math.random() * result+1) + 1; 
      var randomQuest2 = Math.floor(Math.random() * result+1) + 1; 

      if(randomQuest1 == randomQuest2)
        randomQuest2 = Math.floor(Math.random() * result+1) + 1;         

      var quest1;
      var quest2;

      var countQuests = Quest.count({}, function(err, result){

        Quest.find({},{},{skip:randomQuest1, limit:1}, function(err, quest_res){
          if (quest_res){
            quest1 = quest_res[0]._id;
            console.log("ID1: ", quest1 );
          }  
        });
  /*
        Quest.find({},{},{skip:randomQuest2, limit:1}, function(err, quest_res){
          if (quest_res){
            quest2 = quest_res[0]._id;
            console.log("ID1: ", quest2 );
          }  
        });
    */
      });    
/*
      user.quests.push(quest1);
      user.quests.push(quest2);  

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
      var quest;
      var countQuests = Quest.count({}, function(err, result){
        
        var randomQuest = Math.floor(Math.random() * result+1) + 1; 

        Quest.find({},{},{skip:randomQuest, limit:1}, function(err, quest_res){
          if (quest_res){
            quest = quest_res[0]._id;
            console.log("ID: ", quest );
            return quest;  
          }
          else {
            console.log(err);
          }    
        });
      });   
      
    
}



