
define(['./module'], function(controllers) {
	controllers.controller('changePwdCtrl',
		['$scope', '$http', 'validateService', 'httpService', 'userService', 'messageService',
		function($scope, $http, validateService, httpService, userService, messageService){
		$scope.user = {};
		$scope.user.oldPwd = userService.user.password;
	}]);
});