
define(['./module'], function(controllers) {
	controllers.controller('resetPwdCtrl', 
		['$scope', '$rootScope', 'userService', 'validateService', 'httpService', 'messageService',
		function($scope, $rootScope, userService, validateService, httpService, messageService) {
		$scope.showPhone = $rootScope.showPhone;
		$scope.showEmail = $rootScope.showEmail;
		$scope.user = {};
		$scope.user.email = userService.user.email;
	}]);
});