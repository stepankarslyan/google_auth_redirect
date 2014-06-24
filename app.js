var express = require("express");
var googleapis = require("googleapis");
var argv = require('optimist')
    .default({ 
      listen: 3001,
      pidFolder: "/tmp/process_manager" 
    })
    .argv;


var app = express();

var OAuth2 = googleapis.auth.OAuth2;

var oauth2Client = new OAuth2(
	'xxx', 
	'xxx', 
	'http://localhost:3000/oauth/google/callback');


app.get("/", function(req, res) {

  var scopes = ['https://www.googleapis.com/auth/calendar'];

	var url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes.join(" ")
	});

  res.redirect(url);
});

var server = app.listen(argv.listen, function() {
  console.log("Listening on port " + argv.listen + "...");
});

