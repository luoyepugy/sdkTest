
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('changePwdCtrl',['$scope', '$http', 'validateService', 'httpService', 'userService', function($scope, $http, validateService, httpService, userService){
		$scope.user = userService.user;
		$scope.submit = function() {
			var resultsIsEmpty,
				resultsDatas;
			resultsIsEmpty = validateService.isEmpty('.j-form input');
			if(resultsIsEmpty === 0) {
				return false;
			}
			resultsDatas = validateService.submitData('.j-form');
			if (resultsDatas['newPwd'].length < 4) { 
				messages.tips('请输入至少4位密码');
			} else if(resultsDatas['newPwd'] !== resultsDatas['confirmPwd']) {
				messages.tips('两次密码输入不一致');
			} else {
				var promise = httpService.getData('../../json/change-password.json', resultsDatas);
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