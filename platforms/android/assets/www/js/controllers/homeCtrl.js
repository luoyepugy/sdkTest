
define(['./module'], function(controllers) {
	controllers.controller('homeCtrl', function($scope, $rootScope) {
        $rootScope.user = {
            name: '齐天大圣',
            id: '77878556999',
            portrait: '../../images/default_portrait.png',
            sex: 'female',
            birthday: '1992-09-30',
            location: '湖北省-仙桃市'
        };
		$scope.isOn = true;
		$scope.statusToggle = function() {
			$scope.isOn = !$scope.isOn;
			$http.get('../../json/change-password.json', { params: {'on': $scope.isOn} })
                .success(function(response) {
                    if(response.success === true) {
                        messages.tips('成功');
                    } else {
                        messages.tips(response.message);
                    }
                })
                .error(function() {
                    messages.tips('服务器请求失败');
                });
			// ajax.ajaxGet('../../json/change-password.json', {'on': $scope.isOn});
		};
	});
});