
define(['app','cordova'], function(app, cordova) {
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
		 //    var push = new Ionic.Push({
			//   "debug": true,
			//   "onNotification": function(notification) {
			//     var payload = notification.payload;
			//     console.log(notification, payload);
			//   },
			//   "onRegister": function(data) {
			//     console.log(data.token);
			//   },
			//   "pluginConfig": {
			//     "ios": {
			//       "badge": true,
			//       "sound": true
			//      },
			//      "android": {
			//        "iconColor": "#343434"
			//      }
			//   } 
			// });
			// var user = Ionic.User.current();
			// var callback = function(pushToken) {
			//   console.log('Registered token:', pushToken.token);
			//   user.addPushToken(pushToken);
			//   user.save(); // you NEED to call a save after you add the token
			// }
			// push.register(callback);
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