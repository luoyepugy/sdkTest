
define(['./module', '../modules/validate-tips'], function(directives, messages) {
	directives.directive('tradeList', function(tradeService) {
		return {
			restrict: 'E',
			templateUrl: './js/views/tradeTemp.html',
			replace: true,
			scope: {
				list: '='
			},
			link: function(scope, element, attrs) {
				var lastId = 0;

				scope.doRefresh = function() {
					console.log(page);
					var promise = tradeService.getData({'page': element.attrs.page, 'status': 'refresh'}, '../../json/trade-more.json');
				    promise.then(function(data) {
				    	scope.list = data;
				    },function(data) {
				    	messages.tips(data);
				    });
				}
				scope.loadMore = function() {
					var promise = tradeService.getData({'page': element.attrs.page, 'status': 'loadmore', 'id': lastId}, '../../json/trade-more.json');
				    promise.then(function(data) {
				    	for(var i = 0; i < data.length; i++) {
			            	scope.list.push(data[i]);
			            	// lastId = data[data.length-1].id;
			            }
			            scope.$broadcast('scroll.infgetDataeScrollComplete');
				    },function(data) {
				    	messages.tips(data);
				    });
				}
				scope.toggle = function(row) {
					this.clickRow = row;
				}
			}
		}
	});
});