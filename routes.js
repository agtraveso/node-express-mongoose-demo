/**
 * Routes definition for the whole application
 */

// Load the route handlers
var routes = require('./routes/index');
var users = require('./routes/users');
	
module.exports = function(app, db) {
	// Define the routes
	app.all('/*', routes.validateRequest);
	app.get('/', routes.index);	
		
	app.get('/users', users.index);
	app.get('/users/:id', users.show);
	app.post('/users', users.create);
	app.delete('/users/:id', users.destroy);
	app.get('/users/login', users.login);
	app.post('/users/doLogin', users.doLogin);
};
