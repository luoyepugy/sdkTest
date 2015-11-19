
define(['./module', 'ngCordova'], function(controllers) {
	controllers.controller('editCtrl', 
	['$scope', '$ionicActionSheet', 'validateService', 'userService', 'httpService', 'messageService', '$cordovaCamera', '$cordovaFileTransfer',
	function($scope, $ionicActionSheet, validateService, userService, httpService, messageService, $cordovaCamera, $cordovaFileTransfer) {
		$scope.user =  userService.user;
		$scope.submit = function() {
			var resultsIsEmpty,
				resultsDatas;
			resultsIsEmpty = validateService.isEmpty('.j-form input');
			if(resultsIsEmpty !== 1) {
				messageService.show(resultsIsEmpty);
				return false;
			}
			resultsDatas = validateService.submitData('.j-form');
			var promise = httpService.getData('./json/change-password.json', resultsDatas);
		    promise.then(function(data) {
		    	messageService.show('修改成功');
		    	window.location = './#/home';
		    }, function(data) {
		    	messageService.show(data);
		    });
		};

		// 操作表
		$scope.takePhoto = function() {
	        $ionicActionSheet.show({
	            titleText: 'ActionSheet Example',
	            buttons: [{
	                text: '拍照'
	            }, {
	                text: '从相册选择'
	            }],
	            cancelText: '取消',
	            cancel: function() {
	                return true;
	            },
	            buttonClicked: function(index) {
	            	document.addEventListener("deviceready", onDeviceReady, false);
					function onDeviceReady() {
					    navigator.camera.getPicture(onLoadImageSuccess, onLoadImageFail, {destinationType: Camera.DestinationType.FILE_URL});
		
						//拍照成功后回调
						function onLoadImageSuccess(imageURI) {
						    //这里的图片经过了base64编码
						    var src = "data:image/jpeg;base64," + imageURI;
						    $scope.user.portrait = src;
						}
						//所有获取图片失败都回调此函数
						function onLoadImageFail(message) {
							messages.tips('拍照失败,原因：' + message, null, "警告");
						}
					}
	            	if(index === 0) {
	            		var options = {  
			                destinationType: Camera.DestinationType.DATA_URI,  
			                sourceType: Camera.PictureSourceType.CAMERA,  
			                correctOrientation:true
			            };  
			            $cordovaCamera.getPicture(options).then(function(imageURI) {
			                $scope.user.portrait = imageURI;
			            }, function(err) {  
			            	// error
			            });
  
	            	} else if (index === 1) {
	            		var options = {  
			                destinationType: Camera.DestinationType.DATA_URI,  
			                sourceType: Camera.PictureSourceType.PHOTOLIBRARY, 
			                correctOrientation:true,
			                maximumImagesCount: 1,
			                width: 90,
			                height: 90,
			                quality: 80
			            };  
			            $cordovaCamera.getPicture(options).then(function(imageURI) {
			                // 上传获取的图片给服务器
				            $cordovaFileTransfer.upload(server, filePath, options)
						      .then(function(result) {
						        $scope.user.portrait = imageURI;
						      }, function(err) {
						        // Error
						      }, function (progress) {
						        // constant progress updates
						    });
			            }, function(err) {  
			            	// error
			            });
			            
	            	}
	                return true;
	            }
	        });
	    };

	}]);

});