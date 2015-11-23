
define(['./module'], function(directives) {
	directives.directive('messageBox', function($rootScope) {
		return {
			restrict: 'E',
			template: '<p class="error_tip" ng-if="showMessage">{{messages}}</p>',
			replace: true,
			scope: true,
			link: function(scope, element, attrs) {
				$rootScope.showMessage = false;
				if($rootScope.messages !== '' || $rootScope.messages !== null || $rootScope.messages !== undefined) {
					$rootScope.showMessage = true;
				} else {
					$rootScope.showMessage = false;
				}
			}
		};
	});
});