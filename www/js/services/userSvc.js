
define(['./module'], function(services) {
	services.factory('userService', function() {
		var service = {};
		service.user = {
			name: '齐天大圣s',
            id: '77878556999',
            portrait: '../../images/default_portrait.png',
            sex: '女',
            birthday: '1992-09-30',
            location: '湖北省-仙桃市',
            password: '1234',
            autoLogin: true
		};
		return service;
	});
});