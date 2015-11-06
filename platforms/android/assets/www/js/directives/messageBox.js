
define(['./module'], function(directives) {
	directives.directive('messageBox', function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				message: '@'
			},
			template: '<p class="error_tip none">{{message}}</p>',
			link: function(scope, element, attrs) {
				if(scope.message !== '') {
					element.removeClass('none');
					setTimeout(function(){
	                    element.addClass('none');
	                    scope.message = '';
	                }, 3000);
				}
			}
		}
	});
});