// SERVER SETUP
// =========================================================
var express      = require('express');
var bodyParser   = require('body-parser');
var Validator    = require('express-validator');
var Response     = require('./helper/responseHelper');
var mongoose = require('mongoose');
var mongodb = require("mongodb");
var http         = require('http');

global.__coreDir = __dirname+"/";
//global.__port    = 3000;

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://heroku_885z4v5v:iq4dl9nkrlvctetpbr393h1h32@ds025742.mlab.com:25742/heroku_885z4v5v';

var theport = process.env.PORT || 5000;

mongoose.connect(uristring, function(err, res){
  if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
});


// EXPRESS SETUP
// =========================================================
var app = express();

app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Customize the Express Validator
app.use(Validator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    var root = namespace.shift()
    var formParam = root;

    while(namespace.length) {
      formParam.push('[' + namespace.shift() + ']');
    }

    return {
      param: formParam,
      message: msg,
      value: value
    };
  }
  /*// Custom validation rules
  customValidators: {
    isNumber: function(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    validPrice: function(value) {
      return !isNaN(parseFloat(value)) && isFinite(value) && value >= 0;
    }
  }*/
}));


// ROUTES
// =========================================================
var routes = require('./router');
app.use('/', routes);


// ERROR HANDLING AND OUTPUT PROCESSING
// =========================================================
app.use(function (err, req, res, next) {
  if(err) {
    res.status(err.code || 500);
    res.send(err);
  }
  else {
    // No error occured so we proceed with the actual response \o/
    next();
  }
});

app.use(function (req, res, next) {
    console.log("Testlog: ", req.response);
    if(req.response !== undefined) {
      res.json(req.response);
    }
    // Catch 404s
    else {
      res.status(404);
      res.send(new Response.error(404, 'Ressource not found.'));
    }
});

// START WEBSERVER
// =========================================================
  var server = app.listen(process.env.PORT || theport, function(){
    var port = server.address().port;
    app.set('port', port);
    console.log("App now running on port", port);

  });


  process.on('uncaughtException', function(err) {
    if(err.code === "EADDRINUSE") {
      console.log("It seems that the PORT "+port+" is already in use by another application.");
      process.exit(0);
    }
    else {
      console.log("An uncaught Exception occured: "+err.toString());
    }
  });