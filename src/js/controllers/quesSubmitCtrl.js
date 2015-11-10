
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('quesSubmitCtrl', function($scope, validateService, httpService) {
		$scope.submit = function() {
			var resultsIsEmpty,
				resultsDatas;
			resultsIsEmpty = validateService.isEmpty('.j-form .j-input');
			if(resultsIsEmpty === 0) {
				return false;
			}
			resultsDatas = validateService.submitData('.j-form');
			var promise = httpService.getData('../../json/change-password.json', resultsDatas);
		    promise.then(function(data) {
		    	messages.tips('反馈成功');
		    },function(data) {
		    	messages.tips(data);
		    });
		}		
	});
});