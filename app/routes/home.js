var express = require('express'),
	mongoose =require( 'mongoose' ),
	dbUsers = mongoose.model('dbUsers');
	router = express.Router();

router.post('/new-user', function(req, res){
	var newUser = new dbUsers({
		userId: req.body.userId,
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	}).save(function(err, data){
		if(err){
			return err;
		}	
		res.json(data);
	});
});
router.get('/loggedin', function(req, res){
	res.send(req.isAuthenticated() ? req.user : '0');
});
router.post('/logout', function(req, res){
	req.logOut();
	res.sendStatus(200);
});
module.exports = router;