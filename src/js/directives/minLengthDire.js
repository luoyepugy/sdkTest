
define(['./module'], function(directives) {
	directives.directive('minLength', function() {
		return {
			restrict: 'A',
			scope: {
				minLength: '@'
			},
			template: '',
			link: function(scope, element, attrs) {
				var len = $element.attrs.minLength;
				if(element.val().length < len) {
					console.log('请输入至少' + len + '位长度');
				}
			}
		}
	});
});