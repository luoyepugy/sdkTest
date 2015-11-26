
define(['./module', 'cordova'], function(services) {
	services.factory('cameraService', 
	['$q', '$ionicPopup', '$cordovaFileTransfer', '$cordovaCamera',
	function($q, $ionicPopup, $cordovaFileTransfer, $cordovaCamera) {
		var camera = {};

		camera.getPicture = function(options, errorMessage) {
			var deferred = $q.defer();
			if(options === 0) {
				options = {
					destinationType: Camera.DestinationType.FILE_URI,
      				sourceType: Camera.PictureSourceType.CAMERA
				};
			} else if (options === 1) {
				options = {
					destinationType: Camera.DestinationType.FILE_URI,
      				sourceType: Camera.PictureSourceType.PHOTOLIBRARY
				};
			}
			$cordovaCamera.getPicture(options).then(function(imageURI) {
		      	deferred.resolve(imageURI);
		    }, function(err) {
		    	$ionicPopup.alert({
			       title: '提示',
			       template: errorMessage,
			       okText: '确定',
			       okType: 'button-balanced'
			    });
		    });
            return deferred.promise;
		};

		camera.uploadPicture = function(imageURI) {
			var fileOptions = new FileUploadOptions();
			fileOptions.fileKey = "file";
			fileOptions.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
			fileOptions.mimeType = "image/jpeg";
			var deferred = $q.defer();
			$cordovaFileTransfer.upload('http://www.baidu.com', imageURI)
			    .then(function(response) {
			        deferred.resolve(response);
			    }, function(error) {
			        $ionicPopup.alert({
				       title: '提示',
				       template: '上传照片失败',
				       okText: '确定',
				       okType: 'button-balanced'
				    });
			    }, function (progress) {
			    	var perc = Math.floor(progress.loaded / progress.total * 100);
					$scope.progressPercent =  perc + "%";
			    	var myPopup = $ionicPopup.show({
					     template: '<div class="progressBar">' +
							            '<i class="progressBar-current" style="width: {{progressPercent}}"></i>' + 
							        '</div>',
					     title: '当前下载进度',
					     scope: $scope
				   	});
				   	if(perc === 100) {
				   		myPopup.close();
				   	}
			    });

			return deferred.promise;
		};
		return camera;
	}]);
});