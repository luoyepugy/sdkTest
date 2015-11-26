define(["./module"],function(t){t.directive("ionicCity",["$ionicModal","$timeout","$ionicScrollDelegate","cityService",function(t,e,c,i){return{restrict:"E",scope:{},replace:!0,template:'<input type="text" name="city" placeholder="{{placeholder}}" ng-model="$parent.user.city" value="{{$parent.user.city}}" readonly />',link:function(n,o,a){cityModel=null,n.user={},n.provinceHandle="provinceHandle",n.cityHandle="cityHandle",n.countryHandle="countryHandle",n.placeholder=a.placeholder||"未设置",n.okText=a.oktext||"完成",n.barCssClass=a.barcssclass||"bar-dark",n.cityData=i.cityList,n.tag=a.tag||"-",n.returnOk=function(){cityModel&&cityModel.hide()},n.getData=function(t){var i,o,a;switch(e.cancel(n.scrolling),e.cancel(n.dataing),t){case"province":if(!n.cityData)return!1;var r=!0;i=n.cityData.length,o=n.provinceHandle,a=n.cityHandle;break;case"city":if(!n.province.sub)return!1;var l=!0;i=n.province.sub.length,o=n.cityHandle,a=n.countryHandle;break;case"country":if(!n.city.sub)return!1;var y=!0;i=n.city.sub.length,o=n.countryHandle}var u=c.$getByHandle(o).getScrollPosition().top,d=Math.round(u/36);0>d&&(d=0),d>i-1&&(d=i-1),u===36*d?n.dataing=e(function(){r&&(n.province=n.cityData[d],n.city=n.province.sub[0],n.country={},n.city&&n.city.sub&&(n.country=n.city.sub[0])),l&&(n.city=n.province.sub[d],n.country={},n.city&&n.city.sub&&(n.country=n.city.sub[0])),y&&(n.country=n.city.sub[d]),n.city.sub&&n.city.sub.length>0?n.$parent.user.city=n.province.name+n.tag+n.city.name+n.tag+n.country.name:n.$parent.user.city=n.province.name+n.tag+n.city.name},150):n.scrolling=e(function(){c.$getByHandle(o).scrollTo(0,36*d,!0)},150)},o.on("click",function(){return a.checked?void(cityModel&&cityModel.show()):(cityModel&&cityModel.remove(),a.checked=!0,void t.fromTemplateUrl("./js/templates/cityTemp.html",{scope:n,animation:"slide-in-up",backdropClickToClose:!0}).then(function(t){cityModel=t,e(function(){n.getData("province"),cityModel&&cityModel.show()},100)}))}),n.$on("$destroy",function(){cityModel&&cityModel.remove()})}}}])});