
define(['./module'], function(controllers) {
	controllers.controller('recordDetailCtrl', 
        ['$scope', 'validateService', 'httpService', 'messageService', '$ionicLoading',
        function($scope, validateService, httpService, messageService, $ionicLoading) {

        // 最后一个item的id
		var firstId = 0;
		// 更多数据判断
		$scope.hasMore = true;
        var baseUrl = '../../json/record.json';

        // 预加载
	    $ionicLoading.show({
	        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
	        duration: 3000
	    });
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

	    // 点击发送
	    $scope.send = function() {
	    	var val = $scope.sendMessage;
	    	var resultsIsEmpty;
			resultsIsEmpty = validateService.isEmpty('.j-input');
			if(resultsIsEmpty !== 1) {
				messageService.show(resultsIsEmpty);
				return false;
			}
	    	var promise = httpService.getData('../../json/record-send.json', {'msg': val});
		    promise.then(function(data) {
		    	$scope.sendMessage = '';
		    	var datas = data.data.items;
		    	for(var i = 0; i < datas.length; i++) {
	            	$scope.list.push(datas[i]);
	            }
		    },function(data) {
		    	messageService.show(data);
		    });
	    };


	    // 加载更多
	    $scope.loadMore = function() {
	    	var promise = httpService.getData(baseUrl, {'status': 'loadmore', 'id': firstId});
		    promise.then(function(data) {
		    	var datas = data.data.items;
		    	for(var i = 0; i < datas.length; i++) {
	            	$scope.list.push(datas[i]);
	            	// lastId = datas[datas.length-1].id;
	            }
	            $scope.$broadcast('scroll.refreshComplete');
		    },function(data) {
		    	messageService.show(data);
		    });
	    };

	}]);
});