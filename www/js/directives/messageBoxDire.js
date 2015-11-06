
define(['./module'], function(directives) {
	directives.directive('messageBox', function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				message: '@'
			},
			template: '<p class="error_tip">{{message}}</p>',
			link: function(scope, element, attrs) {
				if(element.attrs.message !== '') {
					$(element).removeClass('none');
					setTimeout(function(){
	                    $(element).addClass('none');
	                    element.attrs.message = '';
	                }, 3000);
				}
			}
		}
	});
});