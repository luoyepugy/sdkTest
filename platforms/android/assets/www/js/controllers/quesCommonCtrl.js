define(["./module"],function(t){t.controller("quesCommonCtrl",["$scope","httpService","$ionicLoading","messageService",function(t,o,e,n){var i=0,s="../../json/commonquestion.json";t.hasMore=!0,e.show({template:"<ion-spinner></ion-spinner><h3>加载中...</h3>"}),t.toggle=function(o){t.clickRow=o};var a=o.getData(s);a.then(function(o){var n=o.data.items;e.hide(),t.list=n},function(t){n.show(t)}),t.doRefresh=function(){var i=o.getData(s,{status:"refresh"});i.then(function(o){e.hide();var n=o.data.items;t.list=n,t.$broadcast("scroll.refreshComplete")},function(t){n.show(t)})},t.loadMore=function(){var e=o.getData(s,{status:"loadmore",id:i});e.then(function(o){for(var e=o.data.items,n=0;n<e.length;n++)t.list.push(e[n]);0===o.length&&(t.hasMore=!1),t.$broadcast("scroll.infiniteScrollComplete")},function(t){n.show(t)})}}])});