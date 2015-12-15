
define(['./module'], function(controllers) {
	controllers.controller('recordDetailCtrl', 
        ['$scope', 'validateService', 'httpService', 'messageService', '$ionicLoading',
        function($scope, validateService, httpService, messageService, $ionicLoading) {

        // 最后一个item的id
		var lastId = 0,
			firstId = 0;
		var baseUrl = './json/record.json';

	    // 更多数据判断
		$scope.hasMore = true;
		$scope.list = [];

	    // 初始化
	    var promise = httpService.getData(baseUrl);
	    promise.then(function(data) {
	    	var datas = data.data.items;
	    	$scope.list = datas;
	    });
 
	    // 点击发送
	    $scope.send = function() {
	    	var val = $scope.sendMessage;
	    	var resultsIsEmpty;
			resultsIsEmpty = validateService.isEmpty('.j-recordDetail');
			if(resultsIsEmpty !== 1) {
				messageService.show(resultsIsEmpty);
				return false;
			}
	    	var promise = httpService.getData('./json/record-send.json', {'msg': val});
		    promise.then(function(data) {
		    	$scope.sendMessage = '';
		    	var datas = data.data.items;
		    	for(var i = 0; i < datas.length; i++) {
	            	$scope.list.push(datas[i]);
	            }
		    });
	    };


	    // 加载更多
	    $scope.loadMore = function() {
	    	var length = $scope.list.length;
	    	firstId = $scope.list[0].id;
	    	var promise = httpService.getData(baseUrl, {'status': 'loadmore', 'id': firstId});
		    promise.then(function(data) {
		    	var datas = data.data.items;
		    	for(var i = 0; i < datas.length; i++) {
	            	$scope.list.push(datas[i]);
	            }
	            if(data.length === 0) {
	            	$scope.hasMore = false;
	            }
	            $scope.$broadcast('scroll.infiniteScrollComplete');
		    });
	    };

	}]);
});