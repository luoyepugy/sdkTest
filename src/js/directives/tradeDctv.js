
define(['./module'], function(directives) {
	directives.directive('tradeList', ['httpService', '$ionicLoading', 
		function(httpService, $ionicLoading) {
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
			    httpService.getData('./json/trade.json', {'page': page})
			    .then(function(data) {
			    	$ionicLoading.hide();
			    	var datas = data.data.items;
			    	scope.list = datas;
			    	lastId = datas[datas.length-1].id;
			    });

			    // 刷新
				scope.doRefresh = function() {
					httpService.getData('./json/trade-more.json', {'page': page, 'status': 'refresh'})
				    .then(function(data) {
				    	$ionicLoading.hide();
				    	var datas = data.data.items;
				    	scope.list = datas;
				    	lastId = datas[datas.length-1].id;
				    	scope.$broadcast('scroll.refreshComplete');
				    });
				};

				// 加载更多
				scope.loadMore = function() {
					httpService.getData('./json/trade-more.json', {'page': page, 'status': 'loadmore', 'id': lastId})
				    .then(function(data) {
				    	var datas = data.data.items;
			            for(var i = 0; i < datas.length; i++) {
			            	scope.list.push(datas[i]);
			            	lastId = datas[datas.length-1].id;
			            }
			            if(datas.length === 0) {
			            	scope.hasMore = false;
			            }
			            scope.$broadcast('scroll.infiniteScrollComplete');
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