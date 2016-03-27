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

router.put('/block-user/:id', function(req, res){
	dbUsers.update({"userId": req.params.id},{$addToSet:{blockUsers:req.body.userId}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
router.put('/unblock-user/:id', function(req, res){
	dbUsers.update({"userId": req.params.id},{$pull:{blockUsers:req.body.userId}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
router.put('/update-notifications/:id', function(req, res){

	dbUsers.update({"userId":req.params.id},{$pull:{notifications:{confirm:"not"}}}, function(err, data){
	});//delete notification unread
	for (var i = req.body.length - 1; i >= 0; i--) { //add notification read
	 	req.body[i].confirm = "read";
		dbUsers.update({"userId":req.params.id},{$addToSet:{notifications:req.body[i]}}, function(err, data){
		});
	}
});

router.put('/send-notification/:id', function(req, res){

	dbUsers.findOne({"userId": req.params.id}, function(err, data){
		dbUsers.update({"userId": req.params.id},{$addToSet:{notifications:req.body}},function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});
	});
	
});

module.exports = router;