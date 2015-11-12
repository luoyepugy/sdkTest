

define(['angular', './controllers/index', './directives/index', './services/index'], function(angular, controllers, directives, services){
    return angular.module('myApp',['ionic', 'myApp.controllers','myApp.directives', 'myApp.services']);	
});
