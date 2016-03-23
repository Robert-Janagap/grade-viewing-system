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
		.otherwise({
			redirectTo: '/'
		});
});