define(["./module"],function(e){e.controller("resetPwdCtrl",["$scope","$rootScope","userService","validateService","httpService","messageService",function(e,o,r,i,s,c){e.showPhone=o.showPhone,e.showEmail=o.showEmail,e.user={},e.user.email=r.user.email}])});