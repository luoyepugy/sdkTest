
define([
	    './module', 
		'../modules/validate-empty', 
		'../modules/validate-tips'
	], function(
		controllers,
		validate, 
		messages
	) {
	controllers.controller('changePwdCtrl', function($scope, $http){
		$scope.submit = function() {
			var results;
			results = validate.isEmpty('.j-form input');
			if(results === 0) {
				return false;
			}
			if (results['newPwd'].length < 4) { 
				messages.tips('请输入至少4位密码');
			} else if(results['newPwd'] !== results['confirmPwd']) {
				messages.tips('两次密码输入不一致');
			} else {
				$http.get('../../json/change-password.json', { params: results })
					.success(function(response) {
						if(response.success === true) {
							messages.tips('修改成功');
						} else {
							messages.tips(response.message);
						}
					})
					.error(function() {
						messages.tips('服务器请求失败');
					});
			}
		};
	});
});