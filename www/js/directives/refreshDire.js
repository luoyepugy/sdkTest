
define(['./module'], function(directives) {
	directives.directive('refresh', function(tradeService, $ionicLoading) {
		return {
			replace: true,
			restrict: 'E',
			temeplate: '<ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()"></ion-refresher>',
			scope: {
				url: '@'
			},
			link: function(scope, element, attrs) {
				var url = scope.url;
				// 预加载
			    $ionicLoading.show({
			        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
			    });
				scope.doRefresh = function() {
					var promise = tradeService.getData({'status': 'refresh'}, url);
				    promise.then(function(data) {
				    	$ionicLoading.hide();
				    	scope.list = data;
				    	scope.$broadcast('scroll.refreshComplete');
				    },function(data) {
				    	messages.tips(data);
				    });
				}
			} 
		}
	});
}); 