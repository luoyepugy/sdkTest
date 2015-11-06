
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('tradeFailCtrl', ['$scope', '$ionicLoading', 'tradeService', function($scope, $ionicLoading, tradeService) {
 
		var lastId = 0;
		// 预加载
	    $ionicLoading.show({
	        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
	    });

	    $scope.toggle = tradeService.toggle();

	    // 初始化
	    var promise = tradeService.getData({'page': 'fail'});
	    promise.then(function(data) {
	    	$ionicLoading.hide();
	    	$scope.list = data;
	    	lastId = data[data.length-1].id;
	    },function(data) {
	    	messages.tips(data);
	    });

	    // 刷新
	    $scope.doRefresh = function() {
	    	var promise = tradeService.getData({'page': 'fail', 'status': 'refresh'}, '../../json/trade-more.json');
		    promise.then(function(data) {
		    	$ionicLoading.hide();
		    	$scope.list = data;
		    	lastId = data[data.length-1].id;
		    },function(data) {
		    	messages.tips(data);
		    });
	    }

	    // 加载更多
	    $scope.loadMore = function() {
	    	var promise = tradeService.getData({'page': 'fail', 'status': 'loadmore', 'id': lastId}, '../../json/trade-more.json');
		    promise.then(function(data) {
		    	for(var i = 0; i < data.length; i++) {
	            	$scope.list.push(data[i]);
	            	lastId = data[data.length-1].id;
	            }
	            $scope.$broadcast('scroll.infgetDataeScrollComplete');
		    },function(data) {
		    	messages.tips(data);
		    });
	    }

	}]);
});