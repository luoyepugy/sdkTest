
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('tradeCtrl', function($scope, $http) {
		$http.get("../../json/trade.json")
			.success(function(response) {
				if(response.success === true) {
					$scope.list = response.data.items;
				} else {
					messages.tips(response.message);
				}
			})
			.error(function() {
				messages.tips('服务器请求失败');
			});
	});
});