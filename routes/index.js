/**
 * Manages general routing
 */

// Get home page
exports.index = function(req, res){
	res.render('login', { title: 'GomWare' });
};

// Validate request
exports.validateRequest = function(req, res, next) {
	next();
};
