app.controller('teacherCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
	$scope.openCreateClass = function(){
		$scope.createClass = true;
	}

}]);