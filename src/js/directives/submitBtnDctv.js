
define(['./module'], function(directives) {
	directives.directive('submitButton', 
		['httpService', 'messageService', 'validateService', '$state', 'userService',
		function(httpService, messageService,validateService, $state, userService) {
		return {
			restrict: 'AE',
			replace: true,
			template: '<p class="tc mt10"><button class="button button-balanced">{{text}}</button></p>',
			scope: {},
			link: function(scope, element, attrs) {
				scope.text = attrs.text;
				var state = attrs.state || '';
				var email_regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
				var resultsIsEmpty,
					resultsDatas;
				element.bind('click', function() {
					resultsIsEmpty = validateService.isEmpty(attrs.form);
					if(resultsIsEmpty !== 1) {
						messageService.show(resultsIsEmpty);
						return false;
					}

					resultsDatas = validateService.submitData(attrs.form);
                    if (resultsDatas.email !== null && resultsDatas.email !== undefined && email_regexp.test(resultsDatas.email) === false) {
                    	messageService.show('请输入正确的邮箱格式');
					} else if (resultsDatas.phone !== null && resultsDatas.phone !== undefined && phone_regexp.test(resultsDatas.phone) === false) {
						messageService.show('请输入正确的手机号码格式');
					} else if (resultsDatas.password !== null && resultsDatas.password !== undefined &&　resultsDatas.password.length < 4) { 
						messageService.show('请输入至少4位密码');
					}  else if (resultsDatas.confirmPwd !== null && resultsDatas.confirmPwd !== undefined &&　resultsDatas.confirmPwd !== resultsDatas.password) {
						messageService.show('两次密码输入不一致');
					} else {
						var promise = httpService.getData(attrs.action, resultsDatas);
					    promise.then(function(data) {
					    	messageService.show(data.message);
					    	$state.go(state);
					    	if(attrs.user === 'true') {
					    		for(var i in scope.$parent.user) {
					    			userService.user[i] = scope.$parent.user[i];
					    		}
					    	} else if(attrs.login === 'true') {
					    		userService.user = data.data;
					    	}
					    });
					}
				});
			}
		};
	}]);
});