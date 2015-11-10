

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
		    templateUrl: "view/edit-user.html",
		    controller: 'editCtrl'
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

		.state('feedback', {
			url: "/feedback",
		    "abstract": true,
		    templateUrl: "view/feedback/feedback.html"
		})
		.state('feedback.common', {
		    url: '/common',
		    views:{
		        'feedback-common':{
		            templateUrl: "view/feedback/ques-common.html",
		            controller: 'quesCommonCtrl'
		        }
		    }
		 })
		.state('feedback.submit', {
		    url: '/submit',
		    views:{
		        'feedback-submit':{
		            templateUrl: "view/feedback/ques-submit.html",
		            controller: 'quesSubmitCtrl'
		        }
		    }
		 })
		.state('feedback.record', {
		    url: '/record',
		    views:{
		        'feedback-record':{
		            templateUrl: "view/feedback/record.html",
		            controller: 'recordCtrl'
		        }
		    }
		 })

		.state('trade', {
			url: "/trade",
		    "abstract": true,
		    templateUrl: "view/trade/trade.html"
		})
		.state('trade.all', {
		    url: '/all',
		    views:{
		        'trade-all':{
		            templateUrl: "view/trade/trade-all.html"
		        }
		    }
		 })
		.state('trade.success', {
		    url: '/success',
		    views:{
		        'trade-success':{
		            templateUrl: "view/trade/trade-success.html",
		            controller: 'tradeAllCtrl'
		        }
		    }
		 })
		.state('trade.fail', {
		    url: '/fail',
		    views:{
		        'trade-fail':{
		            templateUrl: "view/trade/trade-fail.html"
		        }
		    }
		 });

		$urlRouterProvider.otherwise('/home');
	}]);
		
});