
define(['./module'], function(controllers) {
	controllers.controller('homeCtrl', 
        ['$scope', 'userService', 'httpService', 'messageService',
        function($scope, userService, httpService, messageService) {
        $scope.user = userService.user;
		$scope.statusToggle = function() {
            var promise = httpService.getData('./json/change-password.json', {'on': $scope.user.autoLogin });
            promise.then(function(data) {
                messageService.show('修改成功');
            }, function(data) {
                messageService.show(data);
            });
		};
        $scope.onDragDown = function() {
            console.log('down');
        }
	}]);
});