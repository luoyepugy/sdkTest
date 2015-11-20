
define(['./module'], function(controllers) {
	controllers.controller('changePwdCtrl',
		['$scope', '$http', 'validateService', 'httpService', 'userService', 'messageService', 
		function($scope, $http, validateService, httpService, userService, messageService){
		$scope.user = userService.user;
		$scope.submit = function() {
			var resultsIsEmpty,
				resultsDatas;
			resultsIsEmpty = validateService.isEmpty('.j-form input');
			if(resultsIsEmpty !== 1) {
				messageService.show(resultsIsEmpty);
				return false;
			}
			resultsDatas = validateService.submitData('.j-form');
			if (resultsDatas['newPwd'].length < 4) { 
				messageService.show('请输入至少4位密码');
			} else if(resultsDatas['newPwd'] !== resultsDatas['confirmPwd']) {
				messageService.show('两次密码输入不一致');
			} else {
				var promise = httpService.getData('./json/change-password.json', resultsDatas);
			    promise.then(function(data) {
			    	messageService.show(data.message);
			    	userService.user.password = $scope.user.newPwd;
			    	delete userService.user.newPwd;
			    	window.location = '#/home';
			    },function(data) {
			    	messageService.show(data);
			    });
			}
		};
	}]);
});