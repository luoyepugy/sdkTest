
define(['app', 'cordova'], function(app) {
	app.config(function($ionicConfigProvider, $compileProvider) {
  		$ionicConfigProvider.tabs.position("top");
  		// $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|  tel):/);
  	})
  	.run(function($ionicPlatform, $cordovaKeyboard, $cordovaStatusbar) {
		$ionicPlatform.ready(function() {
		    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		    // for form inputs)
		    // if(window.cordova && window.cordova.plugins.Keyboard) {
		      // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		    // }
		    // 状态栏显示
		    // $cordovaStatusbar.overlaysWebView(true);
		    // $cordovaStatusbar.show();
		});

		window.onerror = function(msg, url, line) {  
		   	var idx = url.lastIndexOf("/");  
		   	if(idx > -1) {  
		    url = url.substring(idx+1);  
		   	}  
		   	console.log("ERROR in " + url + " (line #" + line + "): " + msg);  
		   	return false;  
		  	};
		});
});