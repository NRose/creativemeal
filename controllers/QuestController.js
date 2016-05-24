var mongoose = require('mongoose');
var Validator   = require('express-validator');
var Quest     = require('../models/QuestModel').Quest;
var Response    = require('../helper/responseHelper');
var Promise = require('bluebird');


// Called when: 'POST /quests HTTP/1.1'
module.exports.createQuest = function (req, res, next) {

  console.log("HIIIIIIIIII23432!");
	
  req.checkBody('name', 'Name must be a nice one.').notEmpty();
  req.checkBody('description', 'Description should be impressive.').notEmpty(); 
  //req.checkBody('points', 'No Points given.').isInt();

  	var errors = req.validationErrors();
  	if(errors) {
    	return next(new Response.error(400, 'Validation errors occured', errors));
  	}
  	else {
    	var body = req.body;
    	console.log("Body: ", body);
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

    	quest.save(function(err) {
  			if (err) 
  				return next(new Response.error(err.statusCode));

  			 req.response = new Response.ok(quest);
  			 return next();		
	});
  } 
};

// Called when: 'GET /quests HTTP/1.1'
module.exports.getAllQuests = function(req, res, next){
	Quest.find({}, function(err, quests) {
    if (err) 
		  return next(new Response.error(err.statusCode));

		req.response = new Response.ok(quests);
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

module.exports.getNewQuests = function(req, res, next){

  var userId = req.params.id;

  Quest.find({}, function(err, quests){
    if (err) 
      return next(new Response.error(err.statusCode));

    var questAmount = Quest.keys(quests).length;
    console.log("Anzahl: ", questAmount);
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



