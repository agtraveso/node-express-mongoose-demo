/**
 * Connects to mongodb. 
 * Also invoke the schemas and models that are going to be used by the application
 */

var mongoose = require('mongoose');
// Schemas and models
require('./User.js');

module.exports = function(appname){
	
	// ENVIROMENT VARIABLES	
	var variables = {};

	variables.ipaddress 	= process.env.OPENSHIFT_NODEJS_IP;
	variables.port      	= process.env.OPENSHIFT_NODEJS_PORT || 8080;
	variables.host    		= process.env.OPENSHIFT_MONGODB_DB_HOST || '127.0.0.1';
	variables.port    		= process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
	variables.appname   	= process.env.OPENSHIFT_APP_NAME || 'test';
	variables.user    		= process.env.OPENSHIFT_MONGODB_DB_USERNAME || 'user';
	variables.password 		= process.env.OPENSHIFT_MONGODB_DB_PASSWORD || '1234';		
	variables.serverOptions = {
		'auto_reconnect': true     
	};

	// CONNECTION
	var dbURI = "mongodb://" + variables.user + ":" + variables.password + "@" + variables.host + ":" + variables.port + "/" + appname;

	mongoose.connect(dbURI);

	mongoose.connection.on('connected', function () {
		console.log('Mongoose connected to ' + dbURI);
	});

	mongoose.connection.on('error',function (err) {
		console.log('Mongoose connection error: ' + err);
	});

	mongoose.connection.on('disconnected', function () {
		console.log('Mongoose disconnected');
	});
		
	//close connection when the app stops
	process.on('SIGINT', function() {
		mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
		});
	});
}
