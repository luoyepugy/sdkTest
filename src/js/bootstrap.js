
define(['angular', 'domReady', './routes', './config'], function(angular, domReady) {
	'use strict';
	domReady(function() {
		angular.bootstrap(document, ['myApp']);
	});
});