app.controller('teacherCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
	//dynamic
	$scope.teacherId = $rootScope.currentUser.userId;
	$scope.teacherName = $rootScope.currentUser.name;
	//static
	// $scope.teacherName = 'Robert Janagap';
	// $scope.teacherId = 'aa-2408972';

	dateToday();
	dayToday();
	function dateToday(){
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1;
	    var yy = today.getFullYear();
	    
	    if(dd<10) {
	    dd='0'+dd
	    } 

	    if(mm<10) {
	        mm='0'+mm
	    } 

	    today = mm + '/' + dd + '/' + yy;

	    return $scope.dateToday = today;
	}
	function dayToday(){
	    var d = new Date();
	    var weekday = new Array(7);
	    weekday[0]=  "Sunday";
	    weekday[1] = "Monday";
	    weekday[2] = "Tuesday";
	    weekday[3] = "Wednesday";
	    weekday[4] = "Thursday";
	    weekday[5] = "Friday";
	    weekday[6] = "Saturday";

	    var n = weekday[d.getDay()]; 
	    return $scope.dayToday = n;
	}
	$scope.computeCriteria = function(value){

		$scope.totalPercent = value.cPrelim + value.cMidterm + value.cFinal;
		var d = document.getElementById("totalCriteria");
		if($scope.totalPercent > 100) {
			d.className = "redBorder";
		}else{
			d.className = "";
		}
	}
	$scope.saveCriteria = function(class_info, className){
		var d = document.getElementById("saveClassBtn");

		if($scope.totalPercent === 100 && className !== undefined){ // save class
		 	$scope.errClass = false;
		 	$scope.criteria = "";
		 	$scope.totalPercent = "" ;
		 	d.setAttribute('style',"display:none;");//utility
		 	class_info.classId = className + '-' +Math.floor( Math.random()*1000000 + 2000000 );
		 	class_info.teacherName = $scope.teacherName;
		 	class_info.teacherId = $scope.teacherId;
		 	class_info.status = 'active';
		 	class_info.dateCreated = $scope.dateToday;

		 	$http.post('/teacher/save-class', class_info).success(function(data){
		 	});
		 	getClassList($scope.teacherId);

		}else{
			$scope.errClass = "No class name or not 100% total";
		}

	}
	var getClassList = function(teacherId){
		$http.get('/teacher/class-list/' + teacherId).success(function(data){
			$scope.classList = data;
		})
	}
	getClassList($scope.teacherId); //get class list

	var getNotifications = function(teacherId){
		$http.get('/teacher/notifications/' + teacherId).success(function(data){
			$scope.notifications = data.notifications;
			var unReadNotifications = 0;
			var notifications = [];
			for (var i = data.notifications.length - 1; i >= 0; i--) {
				if(data.notifications[i].confirm === "not"){
					notifications.push(data.notifications[i]);
					unReadNotifications +=1;
				}
			}
			$scope.unRead = unReadNotifications;
			$scope.notificationsInfo = notifications;
		})
	}
	getNotifications($scope.teacherId); //get notifications

	$scope.confirmRequest = function(student){
		student.teacherName = $scope.teacherName;
		student.teacherId = $scope.teacherId;
		student.dateCreated = student.dateSend;
		student.studentName = student.userName;
		student.studentId = student.userId;
		student.status = 'enrolled';

		$http.put('/teacher/save-student/' + student.classId , student).success(function(data){
		});
		$http.post('/teacher/save-student-class', student).success(function(data){
		});
		$http.put('/teacher/delete-notification/' + student.teacherId, student).success(function(data){
		})

		var d = new Date();
		var teacherRespond = {};
		teacherRespond.message = student.userName + " welcome in my class " + student.className + " have a nice day.";
		teacherRespond.notification_id = student.className + '-' +Math.floor(Math.random()*50000 + 80000);
		teacherRespond.timeSend = d.getHours() + ':' + d.getMinutes();
		teacherRespond.dateSend = $scope.dateToday;	
		teacherRespond.userName = $scope.teacherName;	
		teacherRespond.userId = $scope.teacherId;	
		teacherRespond.classId = student.classId;	
		teacherRespond.className = student.className;	
		teacherRespond.confirm = "not";	

		$http.put('/teacher/send-notification/'+ student.studentId,teacherRespond).success(function(data){
		});

		getNotifications($scope.teacherId);

	}
	$scope.deleteRequest = function(student){
		$http.put('/teacher/delete-notification/' + $scope.teacherId, student).success(function(data){
		})
		getNotifications($scope.teacherId);
	}
	$scope.blockUser = function(userId){
		$http.put('/teacher/block-user/' + $scope.teacherId,userId).success(function(data){
		});
		$scope.confirmation_msg = userId.userName + " is successfully block!";
	}
	$scope.unBlockUser = function(userId){
		$http.put('/teacher/unblock-user/' + $scope.teacherId,userId).success(function(data){
		});
		$scope.confirmation_msg = userId.userName + " is successfully unblock!";
	}
	$scope.readNotification = function(){
		$http.put('/teacher/update-notifications/' + $scope.teacherId, $scope.notificationsInfo).success(function(data){
		})
		$scope.unRead = false;
	}
	$scope.viewStudentList = function(studentList){
		$rootScope.studentList = studentList;
		$rootScope.teacherClass = studentList.className
		$rootScope.teacherClassId = studentList.classId;
	}

	$scope.savePrelim = function(grade){
		grade.teacherId = $scope.teacherId;
		grade.classId = $rootScope.teacherClassId;
		grade.average = parseInt((grade.prelim * .20).toFixed(2)) + parseInt((grade.midterm * .20).toFixed(2)) + parseInt((grade.final * .60).toFixed(2));
		$http.put('/teacher/student-grade-prelim/' + grade.studentId, grade).success(function(data){
		});
	}

	$scope.saveMidterm = function(grade){
		grade.teacherId = $scope.teacherId;
		grade.classId = $rootScope.teacherClassId;
		grade.average = parseInt((grade.prelim * .20).toFixed(2)) + parseInt((grade.midterm * .20).toFixed(2)) + parseInt((grade.final * .60).toFixed(2));
		$http.put('/teacher/student-grade-midterm/' + grade.studentId, grade).success(function(data){
		});
	}

	$scope.saveFinal = function(grade){
		grade.teacherId = $scope.teacherId;
		grade.classId = $rootScope.teacherClassId;
		grade.average = parseInt((grade.prelim * .20).toFixed(2)) + parseInt((grade.midterm * .20).toFixed(2)) + parseInt((grade.final * .60).toFixed(2));
		$http.put('/teacher/student-grade-final/' + grade.studentId, grade).success(function(data){
		});
	}



}]);

