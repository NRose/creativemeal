var mongoose = require('mongoose');
var Validator   = require('express-validator');
var Quest     = require('../models/QuestModel').Quest;
var Response    = require('../helper/responseHelper');
var Promise = require('bluebird');


// Called when: 'POST /quests HTTP/1.1'
module.exports.createQuest = function (req, res, next) {

	req.checkBody('name', 'Username must be between 4 and 16 characters.').notEmpty();
  req.checkBody('description', 'Password must be between 6 and 32 characters.').notEmpty(); 
  req.checkBody('points', 'No valid Email given.').isEmail();

  	var errors = req.validationErrors();
  	if(errors) {
    	return next(new Response.error(400, 'Validation errors occured', errors));
  	}
  	else {
    	var body = req.body;
    	console.log(body);
    	var quest = new Quest({
    		name: body.name,
    		description: body.description,
        points: body.points,
        property: {
          fish: body.property.fish,
          beef: body.property.beef,
          pork: body.property.pork,
          hotpot: body.property.hotpot,
          poultry: body.property.poultry
        },
    		deleted: false
    	});
    	console.log(user);
    	user.save(function(err) {
  			if (err) 
  				return next(new Response.error(err.statusCode));

  			 req.response = new Response.ok(user);
  			 return next();		
	});
  }
};

// Called when: 'GET /quests HTTP/1.1'
module.exports.getAllQuests = function(req, res, next){
	Quest.find({}, function(err, quest) {
        if (err) 
		 	return next(new Response.error(err.statusCode));

		req.response = new Response.ok(quest);
  		return next();	
    });
};

// Called when: 'GET /quests/{id} HTTP/1.1'
module.exports.getQuest = function(req, res, next){

	var id = req.params.id;
	
	Quest.findOne({_id:id}, '', function(err,quest) {
		if (err) 
		 	return next(new Response.error(err.statusCode));

		req.response = new Response.ok(quest);
  		return next();	
	});
};

// Called when: 'PUT /quests/{id} HTTP/1.1'
module.exports.updateQuest = function(req, res, next){

	var id = req.params.id;
	
	Quest.findByIdAndUpdate({_id:id}, req.body, function(err,quest) {
		if (err) 
			return next(new Response.error(err.statusCode));

		req.response = new Response.ok(quest);
  		return next();	
	});
};

// Called when: 'DELETe /quests/{id} HTTP/1.1'
module.exports.deleteQuest = function(req, res, next){

	var id = req.params.id;
	Quest.findByIdAndRemove({_id:id}, '', function(err, quest){
		if (err) 
		 	return next(new Response.error(err.statusCode));

		req.response = new Response.ok(quest);
  		return next();	
	});
};



