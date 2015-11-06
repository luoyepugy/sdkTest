
define(['./module'], function(services) {
	services.service('tradeService',['$http','$q', function($http, $q) {
		var baseUrl = '../../json/trade.json';	
		this.getData = function(datas, urls) {
			var deferred = $q.defer(),
				url = urls || baseUrl;
	        $http.get(url, {params: datas})
	        	.success(function(response) {
	                if(response.success === true) {
	                	deferred.resolve(response.data.items);
					} else {
						deferred.reject(response.message);
					}
	            })
	            .error(function(data){
	            	deferred.reject('服务器请求失败');
	            });
	        return deferred.promise;
		};
	}]);
});