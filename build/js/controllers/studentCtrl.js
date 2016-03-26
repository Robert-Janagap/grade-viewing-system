app.controller('studentCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
	$scope.studentName = 'rhoi abello';
	$scope.studentId = 'student-2881327';
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
	$scope.findClass = function(class_code){
		$scope.findSuccess = true;
		

		var d = new Date();
		var classInfo = {};
		classInfo.timeSend = d.getHours() + ':' + d.getMinutes();

			$http.get('/student/find-class/' + class_code).success(function(data){

				if(data){ //checked if the class exist
					$http.put('/student/if-enrolled/' + $scope.studentId, data).success(function(checked){
						if(checked){ //checked if your already enrolled
							$scope.success_msg = "Your already enrolled in this class, please get help or confirm it in your class teacher.";
							var d = document.getElementById('findClass_success');
							d.className = "errMsg2";
						}else{
							//data to be save in teacher notification
							classInfo.message = "Hello my name is " + $scope.studentName + " and I would like to join in your class -" + data.className + " " + "( " + data.classId + " )";
							classInfo.dateSend = $scope.dateToday;	
							classInfo.userName = $scope.studentName;	
							classInfo.userId = $scope.studentId;	
							classInfo.classId = data.classId;	
							classInfo.className = data.className;	
							classInfo.confirm = "not";	
							classInfo.notification_id = data.className + '-' +Math.floor(Math.random()*1000 + 3000);

							$http.put('/student/if-blocked/' + data.teacherId, classInfo).success(function(blocked){
								console.log(blocked)
								if(blocked){ // checked if your blocked by the teacher
									$scope.success_msg = "You have been block by this class teacher, please inform to the teacher or confirm it.";
									var d = document.getElementById('findClass_success');
									d.className = "errMsg2";
								}else{
									var d = document.getElementById('findClass_success');
									d.className = "";
									d.className = "findClass_success";
									$scope.success_msg = "Your Request to join the class is now submitted, please inform or wait for the teacher to confirm your request.";

									$http.put('/student/send-request/' + data.teacherId, classInfo).success(function(data){
									});
									getStudentClass();
								}
							});
						}
					});	
				}else{
					$scope.success_msg = "We can\'t find in our database the said Class Id";
					var d = document.getElementById('findClass_success');
					d.className = "errMsg";
				}

			});


	}
	$scope.deleteMsg = function(){
		$scope.findSuccess = false;
	}
	var getStudentClass = function(){
		$http.get('/student/get-classes/' + $scope.studentId).success(function(data){
			$scope.studentClasses = data;
		});
	}
	getStudentClass();
}]);
