
define(['app'], function(app) {
	app.config(function($ionicConfigProvider) {
  		$ionicConfigProvider.tabs.position("top");
  	})
  	.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
		    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		    // for form inputs)
		    if(window.cordova && window.cordova.plugins.Keyboard) {
		      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		    }
		    if(window.StatusBar) {
		      StatusBar.styleDefault();
		    }
		    //启动极光推送服务
		    window.plugins.jPushPlugin.init();
		    window.plugins.jPushPlugin.setDebugMode(true);
		});

		window.onerror = function(msg, url, line) {  
		   	var idx = url.lastIndexOf("/");  
		   	if(idx > -1) {  
		    url = url.substring(idx+1);  
		   	}  
		   	alert("ERROR in " + url + " (line #" + line + "): " + msg);  
		   	return false;  
		  	};
		});
  });

});