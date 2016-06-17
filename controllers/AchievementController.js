var mongoose = require('mongoose');
var Validator   = require('express-validator');
var Achievement     = require('../models/AchievementModel').Achievement;
var Response    = require('../helper/responseHelper');
var Promise = require('bluebird');


// Called when: 'POST /achievements HTTP/1.1'
module.exports.createAchievement = function (req, res, next) {

	req.checkBody('name', 'name must be between 4 and 16 characters.').notEmpty();
  req.checkBody('description', 'description must be between 6 and 32 characters.').notEmpty(); 
  req.checkBody('imgURL', 'No URL given.').notEmpty();

  	var errors = req.validationErrors();
  	if(errors) {
    	return next(new Response.error(400, 'Validation errors occured', errors));
  	}
  	else {
    	var body = req.body;
    	console.log(body);
    	var achievement = new Achievement({
    		name: body.name,
    		description: body.description,
        imgURL: body.imgURL
    	});
    	console.log(achievement);
    	achievement.save(function(err) {
  			if (err) 
  				return next(new Response.error(err.statusCode));

  			 req.response = new Response.ok(achievement);
  			 return next();		
	});
  }
};

// Called when: 'GET /achievements HTTP/1.1'
module.exports.getAllAchievements = function(req, res, next){
	Achievement.find({}, function(err, achievement) {
        if (err) 
		 	return next(new Response.error(err.statusCode));

		req.response = new Response.ok(achievement);
  		return next();	
    });
};

// Called when: 'GET /achievements/{id} HTTP/1.1'
module.exports.getAchievement = function(req, res, next){

	var id = req.params.id;
	
	Achievement.findOne({_id:id}, '', function(err,achievement) {
		if (err) 
		 	return next(new Response.error(err.statusCode));

		req.response = new Response.ok(achievement);
  		return next();	
	});
};



