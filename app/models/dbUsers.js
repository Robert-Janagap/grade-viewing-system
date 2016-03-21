var express =require( 'express' ),
	mongoose =require( 'mongoose' ),
	router = express.Router();

var users = new mongoose.Schema({
	userId: String,
	name: String,
	email: String,
	username: String,
	password: String,
	type: String
}, {collection: 'dbUsers'});

module.exports = users;