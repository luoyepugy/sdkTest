
define(['./module', 'cordova'], function(services) {
    services.factory('cameraService', ['$q', '$cordovaCamera', function($q, $cordovaCamera) {
        var camera = {};
   		camera.getPicture = function(options) {
   			var q = $q.defer();
		    $cordovaCamera.getPicture(function(result) {
		        // Do any magic you need
		        q.resolve(result);
		    }, function(err) {
		        q.reject(err);
		    }, options);

		    return q.promise;  
   		}
        return camera;
    }]);
});