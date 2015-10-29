
define([
	    './module', 
		'../modules/validate-empty', 
		'../modules/validate-tips', 
		'../modules/ajax-get'
	], function(
		controllers,
		validate, 
		messages, 
		ajax
	) {
	controllers.controller('changePwdCtrl', function($scope){
		$scope.submit = function() {
			var results;
			results = validate.isEmpty('.j-form input');
			if(results === 0) {
				return false;
			}
			if(results['newPwd'] !== results['confirmPwd']) {
				messages.tips('两次密码输入不一致');
			} else {
				ajax.ajaxGet('../js/json/change-password.json', results);
			}
		};
	});
});