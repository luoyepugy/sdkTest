
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('tradeSucceCtrl', ['$scope', '$ionicLoading', 'tradeService', function($scope, $ionicLoading, tradeService) {

		var lastId = 0;
		// 预加载
	    $ionicLoading.show({
	        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
	        duration: 2000
	    });

	    // 初始化
	    var promise = tradeService.getData({'page': 'succe'});
	    promise.then(function(data) {
	    	$ionicLoading.hide();
	    	$scope.list = data;
	    	lastId = data[data.length-1].id;
	    },function(data) {
	    	messages.tips(data);
	    });

	}]);
});