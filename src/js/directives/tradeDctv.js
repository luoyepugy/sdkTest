
define(['./module'], function(directives) {
	directives.directive('tradeList', ['httpService', 
		function(httpService) {
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
				var lastId = 0,
					firstId = 0;
				var page = attrs.page;
				scope.list = [];

				// 默认不显示每个item的详情
				scope.show = false;
				// 更多数据判断
				scope.hasMore = true;

			    // 初始化
			    httpService.getData('./json/trade.json', {'page': page})
			    .then(function(data) {
			    	var datas = data.data.items;
			    	scope.list = datas;
			    });

			    // 刷新
				scope.doRefresh = function() {
					var length = scope.list.length;
					firstId = scope.list[0].id;
					console.log(firstId);
					httpService.getData('./json/trade-more.json', {'page': page, 'status': 'refresh', 'id': firstId})
				    .then(function(data) {
				    	var datas = data.data.items;
				    	scope.list = datas;
				    	scope.$broadcast('scroll.refreshComplete');
				    });
				};

				// 加载更多
				scope.loadMore = function() {
					var length = scope.list.length;
					lastId = scope.list[length - 1].id;
					httpService.getData('./json/trade-more.json', {'page': page, 'status': 'loadmore', 'id': lastId})
				    .then(function(data) {
				    	var datas = data.data.items;
				    	for(var i = 0; i < datas.length; i++) {
			            	scope.list.push(datas[i]);
			            }
			            if(data.length === 0) {
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