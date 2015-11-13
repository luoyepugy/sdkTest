
define(['./module'], function(controllers) {
	controllers.controller('tradeAllCtrl', 
		['$scope', '$ionicLoading', 'tradeService', 'messageService', 
		function($scope, $ionicLoading, tradeService, messageService) {

		// 最后一个item的id
		// var lastId = 0;
		// // 更多数据判断
		// $scope.hasMore = true;

		// // 预加载
	 //    $ionicLoading.show({
	 //        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
	 //    });

	 //    // 切换状态
	 //    $scope.toggle = tradeService.toggle;

	 //    // 初始化
	 //    var promise = tradeService.getData();
	 //    promise.then(function(data) {
	 //    	$ionicLoading.hide();
	 //    	$scope.list = data;
	 //    	lastId = data[data.length-1].id;
	 //    },function(data) {
	 //    	messageService.show(data);
	 //    });

	 //    // 刷新
	 //    $scope.doRefresh = function() {
	 //    	var promise = tradeService.getData({'status': 'refresh'}, '../../json/trade-more.json');
		//     promise.then(function(data) {
		//     	$ionicLoading.hide();
		//     	$scope.list = data;
		//     	lastId = data[data.length-1].id;
		//     	$scope.$broadcast('scroll.refreshComplete');
		//     },function(data) {
		//     	messageService.show(data);
		//     });
	 //    }

	 //    // 加载更多
	 //    $scope.loadMore = function() {
	 //    	var promise = tradeService.getData({'status': 'loadmore', 'id': lastId}, '../../json/trade-more.json');
		//     promise.then(function(data) {
		//     	for(var i = 0; i < data.length; i++) {
	 //            	$scope.list.push(data[i]);
	 //            	lastId = data[data.length-1].id;
	 //            }
	 //            if(data.length === 0) {
	 //            	$scope.hasMore = false;
	 //            }
	 //            $scope.$broadcast('scroll.infiniteScrollComplete');
		//     },function(data) {
		//     	messageService.show(data);
		//     });
	 //    }

	}]);
});