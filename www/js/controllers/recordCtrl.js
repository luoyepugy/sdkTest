

define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('recordCtrl', function($scope, tradeService, $ionicLoading) {

		// 最后一个item的id
		var lastId = 0;
		// 更多数据判断
		$scope.hasMore = true;

		// 预加载
	    $ionicLoading.show({
	        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
	    });

	    // 切换状态
	    $scope.toggle = function() {
	    	$scope.show = !$scope.show;
	    };

	    // 初始化
	    var promise = tradeService.getData({}, '../../json/myfeedback.json');
	    promise.then(function(data) {
	    	$ionicLoading.hide();
	    	$scope.list = data;
	    	lastId = data[data.length-1].id;
	    },function(data) {
	    	messages.tips(data);
	    });

	    // 刷新
	    $scope.doRefresh = function() {
	    	var promise = tradeService.getData({'status': 'refresh'}, '../../json/myfeedback.json');
		    promise.then(function(data) {
		    	$ionicLoading.hide();
		    	$scope.list = data;
		    	lastId = data[data.length-1].id;
		    	$scope.$broadcast('scroll.refreshComplete');
		    },function(data) {
		    	messages.tips(data);
		    });
	    }

	    // 加载更多
	    $scope.loadMore = function() {
	    	var promise = tradeService.getData({'status': 'loadmore', 'id': lastId}, '../../json/myfeedback.json');
		    promise.then(function(data) {
		    	for(var i = 0; i < data.length; i++) {
	            	$scope.list.push(data[i]);
	            	lastId = data[data.length-1].id;
	            }
	            if(data.length === 0) {
	            	$scope.hasMore = false;
	            }
	            $scope.$broadcast('scroll.infiniteScrollComplete');
		    },function(data) {
		    	messages.tips(data);
		    });
	    }

	});
});