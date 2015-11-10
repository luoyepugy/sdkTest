
define(['angular'], function(angular) {
	'use strict';
	return angular.module('myApp.controllers', [])
			.config(function($ionicConfigProvider) {
		  		$ionicConfigProvider.tabs.position("top");
		  	});
});