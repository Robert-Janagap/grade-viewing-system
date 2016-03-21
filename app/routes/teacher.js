var express = require('express'),
	mongoose =require( 'mongoose' ),
	dbUsers = mongoose.model('dbUsers');
	router = express.Router();


module.exports = router;