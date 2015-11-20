
define(['./module','cordova'], function(controllers) {
	controllers.controller('editCtrl', 
	['$scope', '$ionicActionSheet', 'validateService', 'userService', 'httpService', 'messageService', '$cordovaCamera',
	function($scope, $ionicActionSheet, validateService, userService, httpService, messageService, $cordovaCamera) {
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
	            		document.addEventListener("deviceready", function () {
							var options = {  
				              destinationType: Camera.DestinationType.FILE_URI,  
				              sourceType: Camera.PictureSourceType.CAMERA,  
				            };  
				            $cordovaCamera.getPicture(options).then(function(imageURI) {
				            	$scope.user.portrait = imageURI;
				            	alert(imageURI);
				            }, function(err) {  
				            	alert('拍摄照片失败');
				            });
			         	}, false);

	            	} else if (index === 1) {
	            		document.addEventListener("deviceready", function () {
		            		var options = {  
				              destinationType: Camera.DestinationType.FILE_URI,  
				              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,  
				            };  
				            $cordovaCamera.getPicture(options).then(function(imageURI) {
				              $scope.user.portrait= imageURI;
				            }, function(err) {  
				            	alert('获取图片失败');
				            });
				        }, false);
	            	}
	                return true;
	            }
	        });
	    };

	}]);

});