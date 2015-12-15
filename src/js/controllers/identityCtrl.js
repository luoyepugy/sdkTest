
define(['./module'], function(controllers) {
	controllers.controller('identityCtrl', 
		['$scope', '$rootScope', 'validateService', 'messageService', 'httpService', 'userService',
		function($scope, $rootScope, validateService, messageService, httpService, userService) {
		$scope.showPhone = $rootScope.showPhone = true;
		$scope.showEmail = $rootScope.showEmail = false;
		$scope.user = {};

		// 选择手机方式
		$scope.choosePhone = function() {
			$rootScope.showPhone = $scope.showPhone = true;
			$rootScope.showEmail = $scope.showEmail = false;

		};
		// 选择邮箱方式
		$scope.chooseEmail = function() {
			$rootScope.showPhone = $scope.showPhone = false;
			$rootScope.showEmail = $scope.showEmail = true;	
		};
		// 获取验证码
		$scope.getValiCode = function() {
			var phone = $scope.user.phone;
			if(phone === '') {
				messageService.show('请输入手机号码');
			} else if(!phone_regexp.test(phone)) {
				messageService.show('请输入正确的手机号码格式');
			} else {
				var promiseCode = httpService.getData('./json/change-password.json', $scope.user.phone);
			    promiseCode.then(function(data) {
			    	messageService.show('获取短信成功');
			    });
			}
		};
	}]);
});