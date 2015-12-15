
define(['./module'], function(controllers) {
	controllers.controller('editCtrl', 
	['$scope', '$state', '$ionicActionSheet', 'validateService', 'httpService', 'messageService',　'userService',　'cameraService',
	function($scope, $state, $ionicActionSheet, validateService, httpService, messageService, userService, cameraService) 
	{
		$scope.user = {};
		for(var i in userService.user) {
			$scope.user[i] = userService.user[i];
		}

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
	            		document.addEventListener("deviceready", uploadPhoto, false);
	            	} else if (index === 1) {
	            		document.addEventListener("deviceready", getPhotoLibrary, false);
	            	}
	                return true;
	            }
	        });
	    };
	    // 打开照相机
	    function getCamera() {
	    	cameraService.getPicture(0, '拍摄照片失败').then(function(imageURI) {
	    		uploadPhoto(imageURI);
	    	});
	    }
        function uploadPhoto() {
			var imageURI = 'http://pic.pptbz.com/pptpic/201204/2012041411433867_S.jpg';
        	cameraService.uploadPicture(imageURI).then(function(data) {
	    		// $scope.user.avatar = './images/avatar.jpg';
	    		$scope.user.avatar = 'http://pic.pptbz.com/pptpic/201204/2012041411433867_S.jpg';
	    	});
        }
        // 打开图库
        function getPhotoLibrary() {
        	cameraService.getPicture(1, '获取照片失败').then(function(imageURI) {
	    		uploadPicture(imageURI);
	    	});
	    }
		function uploadPicture(imageURI) {
			cameraService.uploadPicture(imageURI).then(function(data) {
	    		$scope.user.avatar = imageURI;
	    	});
	    }

	}]);

});