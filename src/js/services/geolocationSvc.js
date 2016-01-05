
define(['./module', 'cordova'], function(services) {
	services.factory('geoService', ['$q', '$http', '$cordovaGeolocation', function($q, $http, $cordovaGeolocation) {
		var geo = {};
		geo.getGeolocation = function() {
			var deferred = $q.defer();
			var posOptions = {timeout: 10000, enableHighAccuracy: false};
		  	$cordovaGeolocation.getCurrentPosition(posOptions)
			    .then(function (position) {
			      	var lat  = position.coords.latitude;
			      	var lng = position.coords.longitude;
			      	alert(lat + '' + lng);
			      	$http.post('http://www.baidu.com', {'lat': lat, 'lng': lng})
				      	.success(function(response) {
				      		deferred.resolve(response);
				      		alert(JSON.stringify(response));
				      	})
				      	.error(function(response) {
				      		deferred.reject(response.message);
				      		alert(JSON.stringify(response));
				      	});
			    }, function(error) {
			      	switch(error.code)
	                {
	                  case error.PERMISSION_DENIED:
	                    alert("请打开定位功能！");
	                    break;
	                  case error.POSITION_UNAVAILABLE:
	                    alert("不支持定位服务！");
	                    break;
	                  case error.TIMEOUT:
	                    alert("请求超时！");
	                    break;
	                  case error.UNKNOWN_ERROR:
	                    alert("未知异常！");
	                    break;
	                }
	        	});
			return deferred.promise;
			
		};
		return geo;
	}]);
});