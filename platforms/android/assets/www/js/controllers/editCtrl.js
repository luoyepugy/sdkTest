
define(['./module','cordova'], function(controllers) {
	controllers.controller('editCtrl', 
	['$scope', '$ionicActionSheet', 'validateService', 'userService', 
	'httpService', 'messageService', '$cordovaCamera', '$ionicPopup', '$cordovaFileTransfer',
	function($scope, $ionicActionSheet, validateService, userService, 
		httpService, messageService, $cordovaCamera, $ionicPopup, $cordovaFileTransfer) {
		$scope.user =  userService.user;
		$scope.submit = function() {
			var resultsIsEmpty,
				resultsDatas;
			resultsIsEmpty = validateService.isEmpty('.j-form .j-input');
			if(resultsIsEmpty !== 1) {
				messageService.show(resultsIsEmpty);
				return false;
			}
			resultsDatas = validateService.submitData('.j-form');
			var promise = httpService.getData('./json/change-password.json', resultsDatas);
		    promise.then(function(data) {
		    	userService.user = $scope.user;
		    	console.log(userService.user);
		    	messageService.show('修改成功');
		    	window.location = '#/home';
		    }, function(data) {
		    	messageService.show(data);
		    });
		};

		// 操作表
		$scope.takePhoto = function() {
	        $ionicActionSheet.show({
	            titleText: 'ActionSheet Example',
	            buttons: [{
	                text: '拍照上传'
	            }, {
	                text: '从相册选择'
	            }],
	            cancelText: '取消',
	            cancel: function() {
	                return true;
	            },
	            buttonClicked: function(index) {
	            	
	            	if(index === 0) {
	            		document.addEventListener("deviceready", onDeviceReady, false);
				  		function onDeviceReady() {
				            navigator.camera.getPicture(uploadPhoto, function(error) {
				            	$ionicPopup.alert({
							       title: '提示',
							       template: '拍摄照片失败',
							       okText: '确定',
							       okType: 'button-balanced'
							    });
				            }, {
				            	destinationType : navigator.camera.DestinationType.FILE_URI,
                    			sourceType      : navigator.camera.PictureSourceType.CAMERA
				            });
				        }
			            function uploadPhoto(imageURI) {
			            	var fileOptions = new FileUploadOptions();
							fileOptions.fileKey = "file";
							fileOptions.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
							fileOptions.mimeType = "image/jpeg";
							var params = {};
				            params.value1 = "test1";
				            params.value2 = "param1";
				            fileOptions.params = params;
			            	$cordovaFileTransfer.upload('http://www.baidu.com', imageURI, fileOptions)
							    .then(function(result) {
							        $scope.user.avatar = './images/avatar.jpg';
							    }, function(err) {
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
			            }

	            	} else if (index === 1) {
	            		document.addEventListener("deviceready", onDeviceReady2, false);
	            		function onDeviceReady2() {
	          //   			var options = {  
				       //        destinationType: Camera.DestinationType.FILE_URI,  
				       //        sourceType: Camera.PictureSourceType.PHOTOLIBRARY  
				       //      };  
				       //      $cordovaCamera.getPicture(options).then(uploadPicture, function(err) {  
				       //      	$ionicPopup.alert({
							    //    title: '提示',
							    //    template: '获取图片失败',
							    //    okText: '确定',
							    //    okType: 'button-balanced'
							    // }); 
				       //      });
								navigator.camera.getPicture(uploadPicture, function(error) {
					            	$ionicPopup.alert({
								       title: '提示',
								       template: '获取照片失败',
								       okText: '确定',
								       okType: 'button-balanced'
								    });
					            }, {
					            	destinationType : navigator.camera.DestinationType.FILE_URI,
	                    			sourceType      : navigator.camera.PictureSourceType.PHOTOLIBRARY
					            });
	            		}
		            		
            			function uploadPicture(imageURI) {
			            	var fileOptions = new FileUploadOptions();
							fileOptions.fileKey = "file";
							fileOptions.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
							fileOptions.mimeType = "image/jpeg";
							var params = {};
				            params.value1 = "test2";
				            params.value2 = "param2";
				            fileOptions.params = params;
							$cordovaFileTransfer.upload('http://www.baidu.com', imageURI, fileOptions)
							    .then(function(result) {
							        alert(result);
							        $scope.user.avatar = imageURI;
							    }, function(err) {
							        $ionicPopup.alert({
								       title: '提示',
								       template: '上传照片失败',
								       okText: '确定',
								       okType: 'button-balanced'
								    });
							    }, function (progress) {
							    	// var perc = Math.floor(progress.loaded / progress.total * 100);
							    	alert(progress);
									$scope.progressPercent =  progress + "%";
							    	var myPopup = $ionicPopup.show({
									     template: '<div class="progressBar">' +
											            '<i class="progressBar-current" style="width: {{progressPercent}}"></i>' + 
											        '</div>',
									     title: '当前下载进度',
									     scope: $scope
								   	});
								   	if(progress === 100) {
								   		myPopup.close();
								   	}
							    });
						}

	            	}
	                return true;
	            }
	        });
	    };

	}]);

});