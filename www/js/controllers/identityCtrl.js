
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
			var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
			if(phone === '') {
				messageService.show('请输入手机号码');
			} else if(!phone_regexp.test(phone)) {
				messageService.show('请输入正确的手机号码格式');
			} else {
				var promiseCode = httpService.getData('./json/change-password.json', $scope.user.phone);
			    promiseCode.then(function(data) {
			    	messageService.show('获取短信成功');
			    },function(data) {
			    	messageService.show(data);
			    });
			}
		};
		// 提交表单
		$scope.submit =  function() {
			var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
            var email_regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if($scope.showPhone === true) {
				var phoneIsEmpty,
					phoneDatas;
				phoneIsEmpty = validateService.isEmpty('.j-valiPhone input');
				if(phoneIsEmpty !== 1) {
					messageService.show(phoneIsEmpty);
					return false;
				}
				if(!phone_regexp.test($scope.user.phone)) {
					messageService.show('请输入正确的手机号码格式');
				} else {
					phoneDatas = validateService.submitData('.j-valiPhone');
					var promisePhone = httpService.getData('./json/change-password.json', phoneDatas);
				    promisePhone.then(function(data) {
				    	userService.user.phone = $scope.user.phone;
				    	window.location = './#/reset-pwd';
				    },function(data) {
				    	messageService.show(data);
				    });
				}
			} else {
				var emailIsEmpty,
					emailDatas;
				emailIsEmpty = validateService.isEmpty('.j-valiEmail input');
				if(emailIsEmpty !== 1) {
					messageService.show(emailIsEmpty);
					console.log(emailIsEmpty);
					return false;
				}
				if(!email_regexp.test($scope.user.email)) {
					messageService.show('请输入正确的邮箱格式');
				} else {
					emailDatas = validateService.submitData('.j-valiEmail');
					var promiseEmail = httpService.getData('./json/change-password.json', emailDatas);
				    promiseEmail.then(function(data) {
				    	userService.user.email = $scope.user.email;
				    	window.location = './#/reset-pwd';
				    },function(data) {
				    	messageService.show(data);
				    });
				}
			}
		};
	}]);
});