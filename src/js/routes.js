

define(['./app'], function (app) {
    'use strict';
    return app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    	$stateProvider
    	.state('home', {
		    url: "/home",
		    templateUrl: "views/home.html",
		    controller: 'homeCtrl'
		})
		.state('edit-user', {
		    url: "/edit-user",
		    templateUrl: "views/edit-user.html",
		    controller: 'editCtrl'
		})
		.state('change-password', {
			url: "/change-password",
		    templateUrl: "views/change-password.html",
		    controller: 'changePwdCtrl'
		})
		.state('terms', {
			url: "/terms",
		    templateUrl: "views/terms.html"
		})
		.state('identity', {
			url: "/identity",
		    templateUrl: "views/retrieve-pwd/identity.html",
		    controller: 'identityCtrl'
		})
		.state('reset-pwd', {
			url: "/reset-pwd",
		    templateUrl: "views/retrieve-pwd/reset-pwd.html",
		    controller: 'resetPwdCtrl'
		})
		.state('record-detail', {
			url: "/record-detail",
		    templateUrl: "views/feedback/record-detail.html",
		    controller: 'recordDetailCtrl'
		})

		.state('feedback', {
			url: "/feedback",
		    "abstract": true,
		    templateUrl: "views/feedback/feedback.html"
		})
		.state('feedback.common', {
		    url: '/common',
		    views:{
		        'feedback-common':{
		            templateUrl: "views/feedback/ques-common.html",
		            controller: 'quesCommonCtrl'
		        }
		    }
		 })
		.state('feedback.submit', {
		    url: '/submit',
		    views:{
		        'feedback-submit':{
		            templateUrl: "views/feedback/ques-submit.html",
		            controller: 'quesSubmitCtrl'
		        }
		    }
		 })
		.state('feedback.record', {
		    url: '/record',
		    views:{
		        'feedback-record':{
		            templateUrl: "views/feedback/record-list.html",
		            controller: 'recordListCtrl'
		        }
		    }
		 })

		.state('trade', {
			url: "/trade",
		    "abstract": true,
		    templateUrl: "views/trade/trade.html"
		})
		.state('trade.all', {
		    url: '/all',
		    views:{
		        'trade-all':{
		            templateUrl: "views/trade/trade-all.html"
		        }
		    }
		 })
		.state('trade.success', {
		    url: '/success',
		    views:{
		        'trade-success':{
		            templateUrl: "views/trade/trade-success.html"
		        }
		    }
		 })
		.state('trade.fail', {
		    url: '/fail',
		    views:{
		        'trade-fail':{
		            templateUrl: "views/trade/trade-fail.html"
		        }
		    }
		 });

		$urlRouterProvider.otherwise('/home');
	}]);
		
});