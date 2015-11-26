
define(['./app', 'ngCordova'], function(app) {
	return app.config(['$ionicConfigProvider', '$compileProvider', function($ionicConfigProvider, $compileProvider) {
	  		$ionicConfigProvider.tabs.position("top");
	  	}])
	  	.run(['$ionicPlatform', function($ionicPlatform) {
	  		document.addEventListener("deviceready", function() {
	  			// 状态栏显示
				if(window.StatusBar) {
					window.StatusBar.overlaysWebView(false);
				    window.StatusBar.backgroundColorByHexString('#96aa39');
				    window.StatusBar.styleLightContent();
				}
	  		}, false);
			

			$ionicPlatform.ready(function() {

			    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			    // for form inputs)
			    // if(window.cordova && window.cordova.plugins.Keyboard) {
			      // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			    // }
			    //启动极光推送服务 
				// window.plugins.jPushPlugin.init(); 
				//调试模式 
				// window.plugins.jPushPlugin.setDebugMode(true); 

				window.onerror = function(msg, url, line) {  
				   	var idx = url.lastIndexOf("/");  
				   	if(idx > -1) {  
				    url = url.substring(idx+1);  
				   	}  
				   	console.log("ERROR in " + url + " (line #" + line + "): " + msg);  
				   	return false;  
				};
			});
		}]);
});