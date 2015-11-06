
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('changePwdCtrl',['$scope', '$http', 'validateService', 'httpService', 'userService', function($scope, $http, validateService, httpService, userService){
		$scope.user = userService.user;
		$scope.submit = function() {
			var results;
			results = validateService.isEmpty('.j-form input');
			if(results === 0) {
				return false;
			}
			if (results['newPwd'].length < 4) { 
				messages.tips('请输入至少4位密码');
			} else if(results['newPwd'] !== results['confirmPwd']) {
				messages.tips('两次密码输入不一致');
			} else {
				var promise = httpService.getData('../../json/change-password.json', results);
			    promise.then(function(data) {
			    	messages.tips(data);
			    	userService.user.password = $scope.user.newPwd;
			    	delete userService.user.newPwd;
			    	window.location = '../../#/home';
			    },function(data) {
			    	messages.tips(data);
			    });
			}
		};
	}]);
});