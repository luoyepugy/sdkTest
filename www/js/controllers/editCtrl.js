
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('editCtrl', ['$scope', '$rootScope', '$http', '$ionicActionSheet', '$cordovaCamera', 'validateService', 'userService', 'httpService',  
	function($scope, $rootScope, $http, $ionicActionSheet, $cordovaCamera, validateService, userService, httpService) {
		$scope.user =  userService.user;
		$scope.submit = function() {
			var results;
			results = validateService.isEmpty('.j-form input');
			if(results === 0) {
				return false;
			} else {
				var promise = httpService.getData('../../json/change-password.json', results);
			    promise.then(function(data) {
			    	messages.tips('修改成功');
			    	window.location = '../../#/home';
			    }, function(data) {
			    	messages.tips(data);
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
	     //        		document.addEventListener("deviceready", onDeviceReady, false);
						// function onDeviceReady() {
						//     console.log(navigator.camera);
						//     navigator.camera.getPicture(onLoadImageSuccess, onLoadImageFail, {destinationType: Camera.DestinationType.FILE_URL});
			
						// 	//拍照成功后回调
						// 	function onLoadImageSuccess(imageURI) {
						// 	    //这里的图片经过了base64编码
						// 	    var src = "data:image/jpeg;base64," + imageURI;
						// 	    $scope.portrait = src;
						// 	}
						// 	//所有获取图片失败都回调此函数
						// 	function onLoadImageFail(message) {
						// 		messages.tips('拍照失败,原因：' + message, null, "警告");
						// 	}
						// }
	            		
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

	}]);

});