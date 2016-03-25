var express =require( 'express' ),
	mongoose =require( 'mongoose' ),
	router = express.Router();

var users = new mongoose.Schema({
	userId: String,
	name: String,
	email: String,
	username: String,
	password: String, 
	type: String,
	notifications:{
		message: String,
		dateSend: String,
		userName: String,
		userId: String,
		classId : String,
		done: String
	}
}, {collection: 'dbUsers'});

module.exports = users;