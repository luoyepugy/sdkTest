

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
		.state('identity', {
			url: "/identity",
		    templateUrl: "view/retrieve-pwd/identity.html",
		    controller: 'identityCtrl'
		})
		.state('reset-pwd', {
			url: "/reset-pwd",
		    templateUrl: "view/retrieve-pwd/reset-pwd.html",
		    controller: 'resetPwdCtrl'
		})
		.state('record-detail', {
			url: "/record-detail",
		    templateUrl: "view/feedback/record-detail.html",
		    controller: 'recordDetailCtrl'
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
		            templateUrl: "view/feedback/record-list.html",
		            controller: 'recordListCtrl'
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
		            templateUrl: "view/trade/trade-success.html"
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