define(["./app","cordova"],function(n){return n.config(["$ionicConfigProvider","$compileProvider",function(n,o){n.tabs.position("top")}]).run(["$ionicPlatform","$cordovaBadge","$ionicLoading","geoService","$ionicPopup","$cordovaGeolocation","$cordovaFileTransfer","httpService","$cordovaAppVersion","$timeout",function(n,o,t,e,i,r,a,c,u,d){function f(){alert("a");var n=e.getGeolocation();alert(n)}document.addEventListener("deviceready",function(){f(),window.StatusBar&&(window.StatusBar.overlaysWebView(!0),window.StatusBar.backgroundColorByHexString("#96aa39"),window.StatusBar.styleLightContent()),o.set(3).then(function(){},function(n){})},!1),document.addEventListener("pause",function(){o.decrease(count).then(function(){0===count&&o.clear().then(function(){},function(n){})},function(n){})},!1),n.ready(function(){window.onerror=function(n,o,t){var e=o.lastIndexOf("/");return e>-1&&(o=o.substring(e+1)),console.log("ERROR in "+o+" (line #"+t+"): "+n),!1}})}])});