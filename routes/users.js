/**
 * Manages User routing
 */ 

var mongoose = require( 'mongoose' );
var bcrypt = require('bcrypt');
var User = mongoose.model( 'User' );

// Find all
exports.index = function(req, res) {
    User.find({},function(err, users) {
		if(err) throw err;
		res.json(users);		
	});
};

// Get an user
exports.show = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		if(err) throw err;
		res.json(user);		
	});
};

// Create a new user
exports.create = function(req, res){
	if(!req.is('json')){
		res.send(406, 'Not Acceptable');
	};
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		if(err) throw err;
		User.create({
				username: req.body.username,
				hash_password: hash
			}, 
			function( err, user ){
				if(err){
					res.json(404, {error: err });
				};			
				res.json(user);
		});	
	});
	
};

// Remove an user
exports.destroy = function(req,res) {
	User.findByIdAndRemove(req.params.id, function(err, user){
		if(err) throw err;
		res.json(user);	
	});
};

// Redirects to login page
exports.login = function(req, res){
  res.render('login', { title: 'GomWare' });
};

// Log an user
exports.doLogin = function(req, res){
	
	User.findOne(
		{
			'username': req.body.username
		}, 
		function(err, user) {
			if(err) throw err;
			console.log(user);
			if(user){
				// check if the password is correct
				bcrypt.compare(req.body.password, user.hash_password, function(err, success) {
					if(err) throw err;
					if(success){
						// login succes
						res.render('index', { title: 'GomWare' });
					} else {
						// incorrect password 
						res.render('login', { title: 'GomWare' });
					}
				});
				
			} else {
				// no match user
				res.render('login', { title: 'GomWare' });
			}
		}
	);
 };
