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
			controller: 'studentCtrl',
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
			templateUrl: 'views/teacherClass.html',
			controller: 'teacherCtrl',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/teacher/notifications',{
			templateUrl: 'views/notifications.html',
			controller: 'teacherCtrl',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/student/notifications',{
			templateUrl: 'views/student_notifications.html',
			controller: 'studentCtrl',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/student/archive',{
			templateUrl: 'views/archive.html',
			controller: 'studentCtrl',
			resolve:{
				logincheck: checkLogin
			}
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
	var deferred = $q.defer();
	$http.get('/loggedin').success(function(data){
		$rootScope.errorMessage = null;
		//user is authenticated
		if(data !=='0'){
			$rootScope.currentUser = data;
			deferred.resolve();
		}else{ //user is not authenticated
			$rootScope.errorMessage = "can't find the username or password";
			$location.url('/');
			deferred.reject();
		}
	});
	return deferred.promise;
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

// open sign up form
app.directive('tabselect', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
		 	$('.content_view_tabs li').on('click', function(){
		 		$(this).parent().children('li').removeClass('active');
		 		$(this).addClass('active');
		 	});
		}
	};
});
// open sign up form
app.directive('confirmation', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
		 	element.on('click', function(){
		 		$('.confirmation').toggle();
		 	});
		}
	};
});
// input elemet
app.directive('einput', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
			var inputGrade = $('.inputGrade');

		 	inputGrade.keypress(function(key) {
		        if(key.charCode < 48 || key.charCode > 57) return false;
		    });

		    inputGrade.on( 'keydown',function ( event ){
				if($(this).val() > 100){
					$(this).val(null); 
				}

		    } );

		    inputGrade.on( 'keyup',function ( event ){
				if($(this).val() > 100){
					$(this).val(null); 
				}
		    } );

		}
	};
});