
define(['./module'], function(services) {
	services.service('httpService', ['$q', '$http', 'messageService', function($q, $http, messageService) {
		this.getData = function(url, datas) {
			var deferred = $q.defer();
	        // $http.post(url, datas)
	        $http.get(url, {params: datas})	// 此处应用post请求，get请求测试
	        	.success(function(response) {
	                if(response.success === true) {
	                	deferred.resolve(response);
					} else {
						messageService.show(response.message);
					}
	            })
	            .error(function(data){
	            	messageService.show('服务器请求失败');
	            });
	        return deferred.promise;
		};
	}]);
});