

define(['angular', './controllers/index', './directives/index', './services/index'], function(angular, controllers, directives, services){
    return angular.module('myApp',['ionic','ngCordova', 'myApp.controllers','myApp.directives', 'myApp.services']);	
});
