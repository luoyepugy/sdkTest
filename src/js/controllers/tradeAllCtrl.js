
define(['./module', '../modules/validate-tips'], function(controllers, messages) {
	controllers.controller('tradeAllCtrl', function($scope, $http, $ionicLoading, $timeout) {

		var lastId = 0;
		// 预加载
	    $ionicLoading.show({
	        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
	        duration: 3000
	    });
		$http.get('../../json/trade.json', { params: {'page': 'all'} })
			.success(function(response) {
	            if(response.success === true) {
	            	var datas = response.data.items;
					$scope.list = datas;
					lastId = datas[datas.length-1].id;
				} else {
					messages.tips(response.message);
				}
		    })
		    .error(function(){
		        messages.tips('服务器请求失败');
		    })
		    .finally(function() {
		        $ionicLoading.hide();
		    });

		// 下拉刷新
	    $scope.doRefresh = function() {
	        // 从指定路径获取数据
	        $timeout( function() {  
	            $http.get('../../json/trade-more.json', { params: {'page': 'all', 'status': 'refresh'} })
	            	.success(function(response) {
		                if(response.success === true) {
							var datas = response.data.items;
							$scope.list = datas;
							lastId = datas[datas.length-1].id;
						} else {
							messages.tips(response.message);
						}
		            })
		            .error(function(data){
		                messages.tips('服务器请求失败');
		            });
	        }, 1000);   
	    };

	    // 加载更多
	    $scope.loadMore = function() {
	        // 从指定路径获取数据 
	        $http.get('../../json/trade-more.json', { params: {'page': 'all', 'status': 'loadmore', 'id': lastId} })
	        	.success(function(response) {
	        		var datas = response.data.items;
	        		for(var i = 0; i < datas.length; i++) {
		            	$scope.list.push(datas[i]);
		            	lastId = datas[datas.length-1].id;
		            }
		            $scope.$broadcast('scroll.infiniteScrollComplete');
		        })
		        .error(function(data){
	                messages.tips('服务器请求失败');
	            });
	    };

	});
});