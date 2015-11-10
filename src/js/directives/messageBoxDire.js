
define(['./module'], function(directives) {
	directives.directive('messageBox', function() {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				message: '@',
				showMessage: '@'
			},
			template: '<p class="error_tip" ng-if="showMessage">{{message}}</p>',
			link: function(scope, element, attrs) {
				var showMessage = scope.showMessage;
				var messages = scope.message;
				if(messages !== '') {
					showMessage = true;
					setTimeout(function(){
	                    showMessage = false;
	                    messages = '';
	                }, 3000);
				}
			}
		}
	});
});