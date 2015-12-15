
define(['./module'], function(services) {
	services.service('sqliteService', ['$cordovaSQLite', function($cordovaSQLite) {
		var db = $cordovaSQLite.openDB({ name: "my.db" });

	}]);
});