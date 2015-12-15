
define(['./app', 'ngCordova'], function(app) {
	return app.config(['$ionicConfigProvider', '$compileProvider', function($ionicConfigProvider, $compileProvider) {
	  		$ionicConfigProvider.tabs.position("top");
	  	}])
	  	.run(['$ionicPlatform', '$cordovaBadge', function($ionicPlatform, $cordovaBadge) {
	  		document.addEventListener("deviceready", function() {
	  			// 状态栏显示
				if(window.StatusBar) {
					window.StatusBar.overlaysWebView(false);
				    window.StatusBar.backgroundColorByHexString('#96aa39');
				    window.StatusBar.styleLightContent();
				}
				
				$cordovaBadge.set(3).then(function() {
				    // You have permission, badge set.
				}, function(err) {
				    // You do not have permission.
				});
	  		}, false);
			
	  		document.addEventListener('pause', function () {
			    $cordovaBadge.decrease(count).then(function() {
				    if(count === 0) {
				    	$cordovaBadge.clear().then(function() {
						    // You have permission, badge cleared.
						}, function(err) {
						    // You do not have permission.
						});
				    }
				}, function(err) {
				    // You do not have permission.
				});
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