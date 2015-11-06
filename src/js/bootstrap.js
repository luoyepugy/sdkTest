
define(['angular', 'domReady', 'routes'], function(angular, domReady) {
	'use strict';
	domReady(function() {
		angular.bootstrap(document, ['myApp']);
	});
});