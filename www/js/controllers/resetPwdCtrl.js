define(["./module"],function(e){e.controller("resetPwdCtrl",["$scope","$rootScope","userService","validateService","httpService","messageService",function(e,o,s,n,r,i){e.showPhone=o.showPhone,e.showEmail=o.showEmail,e.user={},e.user.email=s.user.email,e.submit=function(){var o,t;if(o=n.isEmpty(".j-form input"),1!==o)return i.show(o),!1;if(t=n.submitData(".j-form"),t.newPwd.length<4)i.show("请输入至少4位密码");else if(t.newPwd!==t.confirmPwd)i.show("两次密码输入不一致");else{var w=r.getData("./json/change-password.json",t);w.then(function(o){i.show(o.message),s.user.password=e.user.newPwd,delete s.user.newPwd,window.location="#/home"})}}}])});