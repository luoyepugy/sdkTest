
define(['./module', '../modules/validate-tips'], function(directives, messages) {
	directives.directive('tradeList', function(tradeService, $document, $ionicLoading) {
		return {
			restrict: 'E',
			templateUrl: './js/views/tradeTemp.html',
			replace: true,
			scope: {
				list: '=',
				page: '@'
			},
			link: function(scope, element, attrs) {
				var lastId = $(element).find('input').last().val();
				console.log(lastId);
				var page = scope.page;
				scope.show = false;

				// 预加载
			    $ionicLoading.show({
			        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
			    });

			    // 初始化
			    var promise = tradeService.getData({'page': page});
			    promise.then(function(data) {
			    	$ionicLoading.hide();
			    	scope.list = data;
			    	// lastId = data[data.length-1].id;
			    },function(data) {
			    	messages.tips(data);
			    });

			    // 刷新
				scope.doRefresh = function() {
					var promise = tradeService.getData({'page': page, 'status': 'refresh'}, '../../json/trade-more.json');
				    promise.then(function(data) {
				    	scope.list = data;
				    },function(data) {
				    	messages.tips(data);
				    });
				};

				// 加载更多
				scope.loadMore = function() {
					var promise = tradeService.getData({'page': page, 'status': 'loadmore', 'id': 0}, '../../json/trade-more.json');
				    promise.then(function(data) {
				    	for(var i = 0; i < data.length; i++) {
			            	scope.list.push(data[i]);
			            }
			            scope.$broadcast('scroll.infgetDataeScrollComplete');
				    },function(data) {
				    	messages.tips(data);
				    });
				};

				// 切换状态
				scope.toggle = function() {
					this.show = !this.show;
				};
			}
		};
	});
});