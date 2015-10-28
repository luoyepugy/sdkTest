

define(['./app'], function (app) {
    'use strict';
    return app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    	$stateProvider
    	.state('home', {
		    url: "/home",
		    templateUrl: "view/home.html",
		    controller: 'homeCtrl'
		})
		.state('edit-user', {
		    url: "/edit-user",
		    templateUrl: "view/edit-user.html"
		})
		.state('change-password', {
			url: "/change-password",
		    templateUrl: "view/change-password.html",
		    controller: 'changePwdCtrl'
		})
		.state('terms', {
			url: "/terms",
		    templateUrl: "view/terms.html"
		})
		.state('retrieve-pwd', {
			url: "/retrieve-pwd",
		    templateUrl: "view/retrieve-pwd/identity.html"
		})
		.state('feedback/question', {
			url: "/feedback/question",
		    templateUrl: "view/feedback/question.html"
		})
		.state('feedback/record', {
			url: "/feedback/record",
		    templateUrl: "view/feedback/record.html"
		});
		$urlRouterProvider.otherwise('/home');
	}]);
		
});