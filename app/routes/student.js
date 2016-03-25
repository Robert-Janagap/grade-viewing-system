var express = require('express'),
	mongoose =require( 'mongoose' ),
	dbUsers = mongoose.model('dbUsers');
	dbTeachers = mongoose.model('dbTeachers');
	dbStudents = mongoose.model('dbStudents');
	router = express.Router();

router.get('/find-class/:id', function(req, res){
	dbTeachers.findOne({"classId": req.params.id},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
router.put('/send-request/:id', function(req, res){
	dbUsers.update({"userId": req.params.id},{$push:{notifications:req.body}},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

module.exports = router;


// db.dbUsers.update({"userId": "aa-2408972"}, {$pull:{notifications:{"userName": "rhoi abello"}}})