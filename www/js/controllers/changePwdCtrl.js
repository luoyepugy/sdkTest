
define(['./module'], function(controllers) {
	controllers.controller('changePwdCtrl', function($scope){
		$scope.submit = function() {

		}

		$scope.oldPwd = function() {
			console.log($scope.oldPwdVal);
		}
	});
});