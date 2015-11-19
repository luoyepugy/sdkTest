
define(['./module'], function(controllers) {
	controllers.controller('quesCommonCtrl', 
		['$scope', 'httpService', '$ionicLoading', 'messageService', 
		function($scope, httpService, $ionicLoading, messageService) {

		// 最后一个item的id
		var lastId = 0;
		var baseUrl = './json/commonquestion.json';
		// 更多数据判断
		$scope.hasMore = true;

		// 预加载
	    $ionicLoading.show({
	        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
	        duration: 3000
	    });

	    // 切换状态
	    $scope.toggle = function(row) {
	    	$scope.clickRow = row;
	    };

	    // 初始化
	    var promise = httpService.getData(baseUrl);
	    promise.then(function(data) {
	    	var datas = data.data.items;
	    	$ionicLoading.hide();
	    	$scope.list = datas;
	    	// lastId = datas[datas.length-1].id;
	    },function(data) {
	    	messageService.show(data);
	    });

	    // 刷新
	    $scope.doRefresh = function() {
	    	var promise = httpService.getData(baseUrl, {'status': 'refresh'});
		    promise.then(function(data) {
		    	$ionicLoading.hide();
		    	var datas = data.data.items;
		    	$scope.list = datas;
		    	// lastId = datas[datas.length-1].id;
		    	$scope.$broadcast('scroll.refreshComplete');
		    },function(data) {
		    	messageService.show(data);
		    });
	    };

	    // 加载更多
	    $scope.loadMore = function() {
	    	var promise = httpService.getData(baseUrl, {'status': 'loadmore', 'id': lastId});
		    promise.then(function(data) {
		    	var datas = data.data.items;
		    	for(var i = 0; i < datas.length; i++) {
	            	$scope.list.push(datas[i]);
	            	// lastId = datas[datas.length-1].id;
	            }
	            if(data.length === 0) {
	            	$scope.hasMore = false;
	            }
	            $scope.$broadcast('scroll.infiniteScrollComplete');
		    },function(data) {
		    	messageService.show(data);
		    });
	    };

	}]);
});