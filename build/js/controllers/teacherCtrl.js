app.controller('teacherCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
	$scope.openCreateClass = function(){
		$scope.createClass = true;
	}
	$scope.computeCriteria = function(value){

		$scope.totalPercent = value.prelim + value.midterm + value.final;
		var d = document.getElementById("totalCriteria");
		if($scope.totalPercent > 100) {
			d.className = "redBorder";
		}else{
			d.className = "";
		}
	}
	$scope.saveCriteria = function(data, className){
		if($scope.totalPercent < 100 && className !== undefined){
		 	// $http.post()
		}else{
			console.log('error');
		}
	}
}]);

