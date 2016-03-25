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
		timeSend: String,
		userName: String,
		userId: String,
		classId : String,
		className : String,
		confirm: String,
		notification_id: String
	}
}, {collection: 'dbUsers'});

module.exports = users;