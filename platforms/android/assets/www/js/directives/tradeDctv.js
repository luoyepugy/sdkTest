
define(['./module'], function(directives) {
	directives.directive('tradeList', ['httpService', '$ionicLoading', 'messageService', function(httpService, $ionicLoading, messageService) {
		return {
			restrict: 'E',
			templateUrl: './js/templates/tradeTemp.html',
			replace: true,
			scope: {
				list: '=',
				page: '@'
			},
			link: function(scope, element, attrs) {
				// 最后一个item的id
				var lastId = attrs.lastId;
				var page = attrs.page;
				// 默认不显示每个item的详情
				scope.show = false;
				// 更多数据判断
				scope.hasMore = true;

				// 预加载
			    $ionicLoading.show({
			        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
			        duration: 3000
			    });

			    // 初始化
			    var promise = httpService.getData('../../json/trade.json', {'page': page});
			    promise.then(function(data) {
			    	$ionicLoading.hide();
			    	var datas = data.data.items;
			    	scope.list = datas;
			    	lastId = datas[datas.length-1].id;
			    },function(data) {
			    	messageService.show(data);
			    });

			    // 刷新
				scope.doRefresh = function() {
					var promise = httpService.getData('../../json/trade-more.json', {'page': page, 'status': 'refresh'});
				    promise.then(function(data) {
				    	$ionicLoading.hide();
				    	var datas = data.data.items;
				    	scope.list = datas;
				    	lastId = datas[datas.length-1].id;
				    	scope.$broadcast('scroll.refreshComplete');
				    },function(data) {
				    	messageService.show(data);
				    });
				};

				// 加载更多
				scope.loadMore = function() {
					var promise = httpService.getData('../../json/trade-more.json', {'page': page, 'status': 'loadmore', 'id': lastId});
				    promise.then(function(data) {
				    	var datas = data.data.items;
			            for(var i = 0; i < datas.length; i++) {
			            	scope.list.push(datas[i]);
			            	lastId = datas[datas.length-1].id;
			            }
			            if(datas.length === 0) {
			            	scope.hasMore = false;
			            }
			            scope.$broadcast('scroll.infiniteScrollComplete');
				    },function(data) {
				    	messageService.show(data);
				    });
				};

				// 切换状态
				scope.toggle = function() {
					this.show = !this.show;
				};
			}
		};
	}]);
});