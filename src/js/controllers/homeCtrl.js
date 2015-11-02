
define(['./module', '../modules/ajax-get'], function(controllers, ajax) {
	controllers.controller('homeCtrl', function($scope) {
		$scope.id = '54878661152';
		$scope.portrait = 'images/portrait.jpg';
		$scope.name = '京东方类df';
		$scope.isOn = true;
		$scope.statusToggle = function() {
			$scope.isOn = !$scope.isOn;
			ajax.ajaxGet('../../json/change-password.json', {'on': $scope.isOn});
		};
	});
});