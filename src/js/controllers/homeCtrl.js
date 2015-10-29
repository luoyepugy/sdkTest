
define(['./module', '../modules/ajax-get'], function(controllers, ajax) {
	controllers.controller('homeCtrl', function($scope) {
		$scope.id = '54878661152';
		$scope.portrait = 'images/portrait.jpg';
		$scope.name = '京东方类df';
		$scope.isOn = true;
		var flag = 0;
		$scope.statusToggle = function() {
			if(flag % 2 === 0) {
				$scope.isOn = false;
				flag++;
			} else {
				$scope.isOn = true;
				flag--;
			}
			ajax.ajaxGet('../js/json/change-password.json', {'on': $scope.isOn});
		};
	});
});