var app = angular.module('projectRouter',['ngRoute']);


app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/home.html',
			controller: 'homeCtrl'
		})
		.when('/teacher',{
			templateUrl: 'views/teacher.html',
			controller: 'teacherCtrl',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/student',{
			templateUrl: 'views/student.html',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/administrator',{
			templateUrl: 'views/administrator.html',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/teacher/class',{
			templateUrl: 'views/teacherClass.html'
		})
		.when('/teacher/notifications',{
			templateUrl: 'views/notifications.html'
		})
		.when('/student/notifications',{
			templateUrl: 'views/student_notifications.html'
		})
		.when('/student/archive',{
			templateUrl: 'views/archive.html'
		})
		.when('/administrator/summary',{
			templateUrl: 'views/administrator_summary.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});

// check if the user login
var checkLogin = function($q, $timeout, $http, $location, $rootScope){
	// var deferred = $q.defer();
	// $http.get('/loggedin').success(function(data){
	// 	$rootScope.errorMessage = null;
	// 	//user is authenticated
	// 	if(data !=='0'){
	// 		$rootScope.currentUser = data;
	// 		deferred.resolve();
	// 	}else{ //user is not authenticated
	// 		$rootScope.errorMessage = "can't find the username or password";
	// 		$location.url('/');
	// 		deferred.reject();
	// 	}
	// });
	// return deferred.promise;
};

// toggle overlay
app.directive('toggleModal', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
			
		 	element.on( 'click',function ( event ){

				$('.overlay').toggle();

		    } );
		}
	};
});

// limit input number
app.directive('limitInput', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
			
		 	$('.num').on( 'keydown',function ( event ){
				if($(this).val() >= 60){
					$(this).val(60); 
				}

		    } );
		    $('.num').on( 'keyup',function ( event ){
				if($(this).val() >= 60){
					$(this).val(60); 
				}
		    } );
		}
	};
});

app.controller('navCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.logOut = function(){
		$http.post('/logout').success(function(data){
			$location.url('/');
			console.log('logout');
		});
	}
}]);