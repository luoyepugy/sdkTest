define(["./module"],function(t){t.controller("quesSubmitCtrl",["$scope","validateService","httpService","messageService",function(t,e,n,i){t.submit=function(){var t,o;if(t=e.isEmpty(".j-form .j-input"),0===t)return!1;o=e.submitData(".j-form");var r=n.getData("../../json/change-password.json",o);r.then(function(t){i.show("反馈成功")},function(t){i.show(t)})}}])});