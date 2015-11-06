
define(['./module', '../modules/validate-empty', '../modules/validate-tips'], function(controllers, validate, messages) {
	controllers.controller('editCtrl', function($scope, $rootScope, $ionicActionSheet, $cordovaCamera) {
		$scope.user =  $rootScope.user;
		$scope.submit = function() {
			var results;
			results = validate.isEmpty('.j-form input');
			if(results === 0) {
				return false;
			} else {
				$http.get('../../json/change-password.json', { params: results })
					.success(function(response) {
						if(response.success === true) {
							messages.tips('修改成功');
							window.location = '/home';
							for(i in results) {
								$rootScope.user[i] = results[i];
							}
						} else {
							messages.tips(response.message);
						}
					})
					.error(function() {
						messages.tips('服务器请求失败');
					});
			}
		};

		// 操作表
		$scope.takePhoto = function() {
	        $ionicActionSheet.show({
	            titleText: 'ActionSheet Example',
	            buttons: [{
	                text: '拍照'
	            }, {
	                text: '从相册选择'
	            }, ],
	            cancelText: '取消',
	            cancel: function() {
	                return true;
	            },
	            buttonClicked: function(index) {
	            	if(index === 0) {
	            		console.log('0');
	            		document.addEventListener("deviceready", onDeviceReady, false);
						function onDeviceReady() {
						    console.log(navigator.camera);
						    navigator.camera.getPicture(onLoadImageSuccess, onLoadImageFail, {destinationType: Camera.DestinationType.DATA_URL});
			
							//拍照成功后回调
							function onLoadImageSuccess(imageURI) {
							    //这里的图片经过了base64编码
							    var src = "data:image/jpeg;base64," + imageURI;
							    $scope.portrait = src;
							}
							//所有获取图片失败都回调此函数
							function onLoadImageFail(message) {
								messages.tips('拍照失败,原因：' + message, null, "警告");
							}
						}
	            		
	            		// var options = {  
			            //     destinationType: Camera.DestinationType.DATA_URI,  
			            //     sourceType: Camera.PictureSourceType.CAMERA,  
			            // };  
			            // $cordovaCamera.getPicture(options).then(function(imageURI) {
			            //     console.log(imageURI); 
			            //     $scope.portrait = imageURI;
			            // }, function(err) {  

			            // });  
	            	} else if (index === 1) {
	            		console.log('1');
	            	}
	                return true;
	            }
	        });
	    };

	});

});