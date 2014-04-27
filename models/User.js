var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {type: String, unique: true, required: true},
	hash_password: {type: String, required: true}
});

mongoose.model( 'User', userSchema );
