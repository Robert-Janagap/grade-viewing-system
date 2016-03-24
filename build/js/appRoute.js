var app = angular.module('projectRouter',['ngRoute']);


app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/home.html',
			controller: 'homeCtrl'
		})
		.when('/teacher',{
			templateUrl: 'views/teacher.html'
		})
		.when('/teacher/class',{
			templateUrl: 'views/teacherClass.html'
		})
		.when('/teacher/notifications',{
			templateUrl: 'views/notifications.html'
		})
		.when('/student',{
			templateUrl: 'views/student.html'
		})
		.when('/student/notifications',{
			templateUrl: 'views/student_notifications.html'
		})
		.when('/student/archive',{
			templateUrl: 'views/archive.html'
		})
		.when('/administrator',{
			templateUrl: 'views/administrator.html'
		})
		.when('/administrator/summary',{
			templateUrl: 'views/administrator_summary.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});