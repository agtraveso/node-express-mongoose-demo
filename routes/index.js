
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('login', { title: 'GomWare' });
};

exports.validateRequest = function(req, res, next) {
	next();
};
