
define(['./module'], function(controllers) {
	controllers.controller('homeCtrl', 
        ['$scope', 'httpService', 'messageService', 'userService',
        function($scope, httpService, messageService, userService) {
        $scope.user = userService.user;
		$scope.statusToggle = function() {
            httpService.getData('./json/change-password.json', {'on': $scope.user.autoLogin })
            .then(function(data) {
                messageService.show('修改成功');
            });
		};
	}]);
});