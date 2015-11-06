
define(['./module'], function(directives) {
	directives.directive('myTradeList', function() {
		return {
			restrict: 'AE',
			replace: true,
			templateURL: '../views/trade.html',
			link: function(scope, element, attrs) {
				scope.toggle = function(row) {
					scope.clickRow = row;
				}
			}
		}
	});
});