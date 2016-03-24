app.controller('homeCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
	$scope.checkEmail = function(email){
		
		if(email){
			$scope.emailCheck = true;
			$scope.signUpMsg = false;
		}else{
			$scope.emailCheck = false;
			$scope.signUpMsg = "Wrong Email Address";
		}
	}

	$scope.signUpUser = function(newUser){
		
		if(newUser){//check if all field not empty

			if($scope.emailCheck){ //check email
				newUser.userId = newUser.username + '-' + Math.floor((Math.random() * 1000000) + 2000000);
				$scope.signUpMsg = false;

				if(newUser.password === newUser.cpassword){ // check password match
					$scope.signUpMsg = false;
					$http.post('/new-user', newUser).success(function(data){
						$scope.newUser = "";
					})
				}else{
					$scope.signUpMsg = "Password does not match!"
				}

			}else{
				$scope.signUpMsg = "Wrong Email Address";
			}

		}else{			
			$scope.signUpMsg = "Please fill up all field!";
		}
	}

	//login
	$scope.logIn = function(user){
		$http.post('/login', user).success(function(data){
			console.log(data);
			if(data.loginErr){
				$scope.logInErr = data.loginErr;
			}else{
				$scope.logInErr = false;
				$rootScope.currentUser = data;
				userRoutes = ["administrator","teacher","student"];
					for (var i = userRoutes.length - 1; i >= 0; i--) {
						
						if(data.type === userRoutes[i]){
							$location.url('/' + userRoutes[i]);
						}
					
					}
			}
		});
	}

	$scope.closeLogin = function(){
		$scope.logInErr = false;
	}
}]);