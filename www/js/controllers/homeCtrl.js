
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('homeCtrl', ['$scope', '$http', 'userService', 'httpService', function($scope, $http, userService, httpService) {
        $scope.user = userService.user;
        $scope.autoLogin = true;
		$scope.statusToggle = function() {
			$scope.autoLogin = !$scope.autoLogin;
            var promise = httpService.getData('../../json/change-password.json', {'on': $scope.autoLogin });
            promise.then(function(data) {
                messages.tips('修改成功');
            }, function(data) {
                messages.tips(data);
            });
		};
	}]);
});