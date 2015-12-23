
define(['./app', 'cordova'], function(app) {
	return app.config(['$ionicConfigProvider', '$compileProvider', function($ionicConfigProvider, $compileProvider) {
	  		$ionicConfigProvider.tabs.position("top");
	  	}])
	  	.run(['$ionicPlatform', '$cordovaBadge', '$ionicLoading',　'$ionicPopup','$cordovaGeolocation', '$cordovaFileTransfer', 'httpService', '$cordovaAppVersion', '$timeout',
	  		function($ionicPlatform, $cordovaBadge, $ionicLoading, $ionicPopup,$cordovaGeolocation, $cordovaFileTransfer, httpService, $cordovaAppVersion, $timeout) {
	  		
	  		document.addEventListener("deviceready", function () {

	  			// checkUpdate();
	  			geo();
	  			// 状态栏显示
				if(window.StatusBar) {
					window.StatusBar.overlaysWebView(true);
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

	  		function geo() {
	  			var posOptions = {timeout: 10000, enableHighAccuracy: false};
			    $cordovaGeolocation.getCurrentPosition(posOptions)
				    .then(function (position) {
				      var lat  = position.coords.latitude;
				      var long = position.coords.longitude;
				      alert(lat +" " + long);
				    }, function(err) {
				    	alert(JSON.stringify(error));
				       // error
				    });
	  		}
	  		function checkUpdate() {
	  			// 版本自动更新
				httpService.getData('./json/version.json')
	            .then(function(data) { 
		            var serverAppVersion = data.data.version;//服务器版本  
		            console.log("====>>服务器"+serverAppVersion);  
		            $cordovaAppVersion.getVersionNumber().then(function(version) {  
		                console.log("version=====本机>>>"+version+"====>>服务器"+serverAppVersion);  
		                if (version !== serverAppVersion) { 
		                	var confirmPopup = $ionicPopup.confirm({
				                title: '版本升级',
				                template: '1.xxxx;</br>2.xxxxxx;</br>3.xxxxxx;</br>4.xxxxxx', //从服务端获取更新的内容
				                cancelText: '取消',
				                okText: '立即升级',
				                okType: 'button-balanced'
				            }); 
				            confirmPopup.then(function(res) {
				            	if(res) {
				            		$ionicLoading.show({  
				                        template: "<ion-spinner></ion-spinner><h3>已下载：0%</h3>"  
				                    });  
				                    var url = "./updateApk/android-debug.apk";   
				                    var targetPath = "file:///mnt/sdcard/Download/android-debug.apk";   
				                    var trustHosts = true; 
				                    var options = {};  
				                    $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {  
								        // 打开下载下来的APP
				                        $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
				                        ).then(function () {
				                            // 成功
				                        }, function (err) {
				                            // 错误
				                        }); 
				                        $ionicLoading.hide();  
				                    }, function (err) { 
					                    $ionicPopup.alert({
									       title: '提示',
									       template: '下载失败',
									       okText: '确定',
									       okType: 'button-balanced'
									    }); 
				                    }, function (progress) {                             
				                        $timeout(function () {  
				                            var downloadProgress = (progress.loaded / progress.total) * 100;  
				                            $ionicLoading.show({  
				                                template: "<ion-spinner></ion-spinner><h3>已下载："+ Math.floor(downloadProgress) +"%</h3>"  
				                            });  
				                            if (downloadProgress > 99) {  
				                                $ionicLoading.hide();  
				                            }  
				                        });  
				                    });
				            	} else {
				            		//　取消更新
				            		confirmPopup.close();
				            	}
				            });
		                } else {
		                	return;
		                } 
		            });  
		        });
	  		}

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