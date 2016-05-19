var mongoose = require('mongoose');
var Validator   = require('express-validator');
var Group     = require('../models/GroupModel').Group;
var Response    = require('../helper/responseHelper');
var Promise = require('bluebird');


// Called when: 'POST /Groups HTTP/1.1'
module.exports.createGroup = function (req, res, next) {

	req.checkBody('name', 'name must be between 4 and 16 characters.').notEmpty();

  	var errors = req.validationErrors();
  	if(errors) {
    	return next(new Response.error(400, 'Validation errors occured', errors));
  	}
  	else {
    	var body = req.body;
    	console.log(body);
    	var group = new Group({
    		name: body.name
    	});
    	console.log(group);
    	group.save(function(err) {
  			if (err) 
  				return next(new Response.error(err.statusCode));

  			 req.response = new Response.ok(group);
  			 return next();		
	});
  }
};

// Called when: 'GET /Groups HTTP/1.1'
module.exports.getAllGroups = function(req, res, next){
	Group.find({}, function(err, group) {
        if (err) 
		 	return next(new Response.error(err.statusCode));

		req.response = new Response.ok(group);
  		return next();	
    });
};

// Called when: 'GET /Groups/{id} HTTP/1.1'
module.exports.getGroup = function(req, res, next){

	var id = req.params.id;
	
	Group.findOne({_id:id}, '', function(err,group) {
		if (err) 
		 	return next(new Response.error(err.statusCode));

		req.response = new Response.ok(group);
  		return next();	
	});
};

// Called when: 'PUT /Groups/{id} HTTP/1.1'
module.exports.updateGroup = function(req, res, next){

	var id = req.params.id;
	
	Group.findByIdAndUpdate({_id:id}, req.body, function(err,group) {
		if (err) 
			return next(new Response.error(err.statusCode));

		req.response = new Response.ok(group);
  		return next();	
	});
};

// Called when: 'DELETE /Groups/{id} HTTP/1.1'
module.exports.deleteGroup = function(req, res, next){

	var id = req.params.id;
	Group.findByIdAndRemove({_id:id}, '', function(err, group){
		if (err) 
		 	return next(new Response.error(err.statusCode));

		req.response = new Response.ok(group);
  		return next();	
	});
};



