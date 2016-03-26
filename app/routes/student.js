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

	dbUsers.findOne({"userId": req.params.id}, function(err, data){
		dbUsers.update({"userId": req.params.id},{$addToSet:{notifications:req.body}},function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});
	});
	
});
router.put('/if-blocked/:id', function(req, res){
	dbUsers.findOne({"userId": req.params.id, "blockUsers": req.body.userId}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
router.get('/get-classes/:id', function(req, res){
	dbStudents.find({"studentId": req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});

router.put('/if-enrolled/:id', function(req, res){
	dbStudents.findOne({"studentId": req.params.id, "classId": req.body.classId}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});

module.exports = router;


// db.dbUsers.update({"userId": "aa-2408972"}, {$pull:{blockUsers:"student-2881327"}})
// db.dbStudents.remove({"studentId": "student-2881327"})
// db.dbUsers.find({"blockUsers": "test"}).pretty()
// db.dbUsers.update({"userId": "aa-2408972"}, {$pull:{notifications:{"userId": "student-2881327"}}})