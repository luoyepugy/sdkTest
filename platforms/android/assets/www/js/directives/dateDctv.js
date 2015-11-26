define(["./module"],function(a){a.directive("ionicDate",["$ionicModal","$timeout","$ionicScrollDelegate","dateService","messageService",function(a,e,t,n,d){return{restrict:"E",scope:{},replace:!0,template:'<input type="text" name="birthday" placeholder={{placeholder}} ng-model="$parent.user.birthday" value="{{$parent.user.birthday}}" readonly>',link:function(d,o,r){dateModel=null,d.user={},d.yearHandle="yearHandle",d.monthHandle="monthHandle",d.dayHandle="dayHandle",d.placeholder=r.placeholder||"未设置",d.okText=r.oktext||"完成",d.barCssClass=r.barcssclass||"bar-dark",d.datas=n.dateList,d.tag=r.tag||"-",d.returnOk=function(){dateModel&&dateModel.hide()},d.getData=function(a){var n,o;switch(e.cancel(d.scrolling),e.cancel(d.dataing),d.yearData=d.datas.yearData,d.monthData=d.datas.monthData,d.dayData=d.datas.dayData,a){case"year":if(!d.yearData)return!1;var r=!0;n=d.yearData.length,o=d.yearHandle;break;case"month":if(!d.monthData)return!1;var l=!0;n=d.monthData.length,o=d.monthHandle;break;case"day":if(!d.dayData)return!1;var i=!0;n=d.dayData.length,o=d.dayHandle;break;default:d.year=d.yearData[0],d.month=d.monthData[0],d.day=d.dayData[0]}var c=t.$getByHandle(o).getScrollPosition().top,s=Math.round(c/36);0>s&&(s=0),s>n-1&&(s=n-1),c===36*s?d.dataing=e(function(){r&&(d.year=d.yearData[s]),l&&(d.month=d.monthData[s]),i&&(d.day=d.dayData[s]),d.$parent.user.birthday=d.year.name+d.tag+d.month.name+d.tag+d.day.name},150):d.scrolling=e(function(){t.$getByHandle(o).scrollTo(0,36*s,!0)},150)},o.on("click",function(){return r.checked?void(dateModel&&dateModel.show()):(dateModel&&dateModel.remove(),r.checked=!0,void a.fromTemplateUrl("./js/templates/dateTemp.html",{scope:d,animation:"slide-in-up",backdropClickToClose:!0}).then(function(a){dateModel=a,e(function(){d.getData(),dateModel&&dateModel.show()},100)}))}),d.$on("$destroy",function(){dateModel&&dateModel.remove()})}}}])});