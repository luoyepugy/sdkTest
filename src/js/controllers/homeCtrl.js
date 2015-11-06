
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('homeCtrl', ['$scope', '$http', 'userService', 'httpService', function($scope, $http, userService, httpService) {
        $scope.user = userService.user;
		$scope.statusToggle = function() {
            var promise = httpService.getData('../../json/change-password.json', {'on': $scope.user.autoLogin });
            promise.then(function(data) {
                messages.tips('修改成功');
            }, function(data) {
                messages.tips(data);
            });
		};
	}]);
});