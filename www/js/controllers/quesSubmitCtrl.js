
define(['./module'], function(controllers) {
	controllers.controller('quesSubmitCtrl', 
		['$scope', 'validateService', 'httpService', 'messageService', 
		function($scope, validateService, httpService, messageService) {
		$scope.submit = function() {
			var resultsIsEmpty,
				resultsDatas;
			resultsIsEmpty = validateService.isEmpty('.j-form .j-input');
			if(resultsIsEmpty !== 1) {
				messageService.show(resultsIsEmpty);
				return false;
			}
			resultsDatas = validateService.submitData('.j-form');
			var promise = httpService.getData('../../json/change-password.json', resultsDatas);
		    promise.then(function(data) {
		    	messageService.show('反馈成功');
		    },function(data) {
		    	messageService.show(data);
		    });
		};		
	}]);
});