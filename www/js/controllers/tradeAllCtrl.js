
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('tradeAllCtrl', ['$scope', '$ionicLoading', 'tradeService', function($scope, $ionicLoading, tradeService) {

		var lastId = 0;

		$scope.hasMore = true;
		$scope.hasRefresh = true;
		// 预加载
	    $ionicLoading.show({
	        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
	    });

	    $scope.toggle = function() {
	    	$scope.show = !$scope.show;
	    };

	    // 初始化
	    var promise = tradeService.getData();
	    promise.then(function(data) {
	    	$ionicLoading.hide();
	    	$scope.list = data;
	    	lastId = data[data.length-1].id;
	    },function(data) {
	    	messages.tips(data);
	    });

	    // 刷新
	    $scope.doRefresh = function() {
	    	var promise = tradeService.getData({'status': 'refresh'}, '../../json/trade-more.json');
		    promise.then(function(data) {
		    	$ionicLoading.hide();
		    	$scope.list = data;
		    	lastId = data[data.length-1].id;
		    	$scope.hasRefresh = false;
		    },function(data) {
		    	messages.tips(data);
		    });
	    }

	    // 加载更多
	    $scope.loadMore = function() {
	    	var promise = tradeService.getData({'status': 'loadmore', 'id': lastId}, '../../json/trade-more.json');
		    promise.then(function(data) {
		    	for(var i = 0; i < data.length; i++) {
	            	$scope.list.push(data[i]);
	            	lastId = data[data.length-1].id;
	            }
	            $scope.$broadcast('scroll.infiniteScrollComplete');
		    },function(data) {
		    	$scope.hasMore = false;
		    	messages.tips(data);
		    });
	    }

	}]);
});