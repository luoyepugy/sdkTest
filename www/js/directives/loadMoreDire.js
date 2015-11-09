
define(['./module'], function(directives) {
	directives.directive('loadMore', function(tradeService) {
		return {
			replace: true,
			template: '<ion-infinite-scroll on-infinite="loadMore()" distance="1%"></ion-infinite-scroll>',
			scope: false,
			link: function(scope, element, attrs) {
				scope.loadMore = function(url, datas) {
					console.log('eee');
					var promise = tradeService.getData({'page': page, 'status': 'loadmore', 'id': 0}, '../../json/trade-more.json');
				    promise.then(function(data) {
				    	for(var i = 0; i < data.length; i++) {
			            	scope.list.push(data[i]);
			            }
			            scope.$broadcast('scroll.infgetDataeScrollComplete');
				    },function(data) {
				    	// messages.tips(data);
				    	console.log(data);
				    });
				};
			}
		};
	});
}); 