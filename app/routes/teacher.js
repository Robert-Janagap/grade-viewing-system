var express = require('express'),
	mongoose =require( 'mongoose' ),
	dbUsers = mongoose.model('dbUsers');
	dbTeachers = mongoose.model('dbTeachers');
	dbStudents = mongoose.model('dbStudents');
	router = express.Router();

router.post('/save-class', function(req, res){
	dbTeachers(req.body).save(function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

router.get('/class-list/:id', function(req, res){
	dbTeachers.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
router.get('/notifications/:id', function(req, res){
	dbUsers.findOne({"userId": req.params.id},{},{sort:{dateSend:-1}} ,function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
router.put('/save-student/:id', function(req, res){
	dbTeachers.update({"classId": req.params.id},{$addToSet:{students:req.body}},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
router.post('/save-student-class', function(req, res){
	dbStudents(req.body).save(function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
router.put('/delete-notification/:id', function(req, res){
	dbUsers.update({"userId": req.params.id}, {$pull:{notifications:{notification_id: req.body.notification_id}}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
module.exports = router;