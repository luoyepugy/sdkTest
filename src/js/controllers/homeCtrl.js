
define(['./module'], function(controllers) {
	controllers.controller('homeCtrl', 
        ['$scope', 'userService', 'httpService', 'messageService',
        function($scope, userService, httpService, messageService) {
        $scope.user = userService.user;
		$scope.statusToggle = function() {
            httpService.getData('./json/change-password.json', {'on': $scope.user.autoLogin })
            .then(function(data) {
                messageService.show('修改成功');
            });
		};
	}]);
});