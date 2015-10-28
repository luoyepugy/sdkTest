

define(['./app'], function (app) {
    'use strict';
    return app.config(['$stateProvider','$urlRouterProvider'], function($stateProvider, $urlRouterProvider) {
    	$stateProvider.state('home', {
		    url: "/home",
		    templateUrl: "./home.html"
		})
		.state2('trade', {
			url: "/trade",
		    templateUrl: "view/trade.html"
		});

		$urlRouterProvider.otherwise('/home');
	});
		
});