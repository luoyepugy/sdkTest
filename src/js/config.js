
define(['app', 'ngCordova'], function(app) {
	app.config(function($ionicConfigProvider, $compileProvider) {
  		$ionicConfigProvider.tabs.position("top");
  	})
  	.run(function($ionicPlatform, $cordovaStatusbar) {
  		document.addEventListener("deviceready", function() {
  			// 状态栏显示
		    if (cordova.platformId === 'android') { 
		    	StatusBar.overlaysWebView(true);
			    StatusBar.backgroundColorByHexString("#96aa39"); 
			    StatusBar.styleLightContent(); 
			} else {  
			    $cordovaStatusbar.overlaysWebView(false);  
			    $cordovaStatusbar.style(1);  
			    $cordovaStatusbar.styleHex('#96aa39');
			}  
  		}, false);
		
		var androidConfig = {
		    "senderID": "replace_with_sender_id",
		};

		document.addEventListener("deviceready", function(){
		    $cordovaPush.register(androidConfig).then(function(result) {
		      alert('success');// Success
		    }, function(err) {
		      alert('error');// Error
		    })

		    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
		      switch(notification.event) {
		        case 'registered':
		          if (notification.regid.length > 0 ) {
		            alert('registration ID = ' + notification.regid);
		          }
		          break;

		        case 'message':
		          // this is the actual push notification. its format depends on the data model from the push server
		          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
		          break;

		        case 'error':
		          alert('GCM error = ' + notification.msg);
		          break;

		        default:
		          alert('An unknown GCM event has occurred');
		          break;
		      }
		    });


		    // WARNING: dangerous to unregister (results in loss of tokenID)
		    $cordovaPush.unregister(options).then(function(result) {
		      // Success!
		    }, function(err) {
		      // Error
		    })

		}, false);

		$ionicPlatform.ready(function() {

		    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		    // for form inputs)
		    // if(window.cordova && window.cordova.plugins.Keyboard) {
		      // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		    // }

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
});