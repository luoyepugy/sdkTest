
define(['./module'], function(services) {
	services.factory('trade',['$http,', function($http) {
		var baseUrl = '../../json/trade.json';	
		return {
			doRefresh: function() {
		        $http.get(baseUrl)
		        	.success(function(response) {
		                if(response.success === true) {
		                	return response.data.items;
							// lastId = datas[datas.length-1].id;
						} else {
							messages.tips(response.message);
						}
		            })
		            .error(function(data){
		                messages.tips('服务器请求失败');
		            });
			}
		}
	}]);
});