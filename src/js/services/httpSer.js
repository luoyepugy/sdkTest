
define(['./module'], function(services) {
	services.service('httpService', ['$q', '$http', function($q, $http) {

		this.getData = function(url, datas) {
			var deferred = $q.defer();
	        // $http.post(url, datas)
	        $http.get(url, {params: datas})	// 此处应用post请求，get请求测试
	        	.success(function(response) {
	                if(response.success === true) {
	                	deferred.resolve(response.message);
					} else {
						deferred.reject(response.message);
					}
	            })
	            .error(function(data){
	            	deferred.reject('服务器请求失败');
	            });
	        return deferred.promise;
		}

	}]);
});