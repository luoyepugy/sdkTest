
define(['./module'], function(directives) {
	directives.directive('ionicCity', ['$ionicModal', '$timeout', '$ionicScrollDelegate', 'cityService',
		function($ionicModal, $timeout, $ionicScrollDelegate, cityService) {
		return {
			restrict: 'E',
			scope: {},
			replace: true,
			template: '<input type="text" name="city" placeholder="{{placeholder}}" ng-model="$parent.user.city" value="{{$parent.user.city}}" readonly />',
			link: function(scope, element, attrs) {
				cityModel = null;
				scope.user = {};
				scope.provinceHandle="provinceHandle";
        		scope.cityHandle="cityHandle";
        		scope.countryHandle="countryHandle";
				scope.placeholder = attrs.placeholder || '未设置';
				scope.okText = attrs.oktext || '完成';
				scope.barCssClass = attrs.barcssclass || "bar-dark";
				scope.cityData = cityService.cityList;
				scope.tag=attrs.tag || "-";
				scope.returnOk = function(){
		            cityModel && cityModel.hide();
		        };
		        scope.getData = function(name) {
		        	$timeout.cancel(scope.scrolling);//取消之前的scrollTo.让位置一次性过渡到最新
			        $timeout.cancel(scope.dataing);//取消之前的数据绑定.让数据一次性过渡到最新
			        switch(name)
			        {
			            case 'province':
			              	if (!scope.cityData) return false;
			             	var province = true, length=scope.cityData.length, Handle=scope.provinceHandle,HandleChild=scope.cityHandle;
			            	break;
			            case 'city':
			              	if (!scope.province.sub) return false;
			              	var city = true, length=scope.province.sub.length, Handle=scope.cityHandle,HandleChild=scope.countryHandle;
			            	break;
			            case 'country':
			              	if (!scope.city.sub) return false;
			              	var country = true, length=scope.city.sub.length, Handle=scope.countryHandle;
			            	break;
			        }
	          		var top = $ionicScrollDelegate.$getByHandle(Handle).getScrollPosition().top;//当前滚动位置
		            var index = Math.round(top / 36);
		            //iOS bouncing超出头
		            if (index < 0 ) {
		            	index = 0;
		            } 	
		            //iOS 超出尾			
		            if (index > length-1 ) {
		            	index = length-1;
		            } 
		            if (top===index*36) {
		            	scope.dataing = $timeout(function() {
		            		province && (scope.province = scope.cityData[index], scope.city = scope.province.sub[0], scope.country = {}, (scope.city && scope.city.sub && (scope.country = scope.city.sub[0]))); 
		            		city && (scope.city = scope.province.sub[index], scope.country = {}, (scope.city && scope.city.sub && (scope.country = scope.city.sub[0])));
		            		country && (scope.country = scope.city.sub[index]);
		            		//数据同步
				        	(scope.city.sub && scope.city.sub.length>0) ? (scope.$parent.user.city = scope.province.name + scope.tag + scope.city.name + scope.tag + scope.country.name) : (scope.user.city = scope.province.name + scope.tag + scope.city.name);
				        }, 150);
				    } else {
				    	scope.scrolling = $timeout(function() {
					    	$ionicScrollDelegate.$getByHandle(Handle).scrollTo(0, index*36, true);
					    }, 150);
				    }
		        };

		        // 元素点击事件
		        element.on("click", function() {
		            //零时处理 点击过之后直接显示不再创建
		            if (!attrs.checked) {
		              cityModel && cityModel.remove();
		            } else {
		              cityModel && cityModel.show();  
		              return;
		            }
		            attrs.checked = true;
		            // 显示模型
		            $ionicModal.fromTemplateUrl('./js/templates/cityTemp.html', {
		              scope: scope,
		              animation: 'slide-in-up',
		              backdropClickToClose: true
		            }).then(function(modal) {
		              cityModel = modal;
		              //初始化 先获取数据后展示
		              $timeout(function () {
		                scope.getData('province');
		                cityModel && cityModel.show();
		              },100);
		            });
		        });
		        //销毁模型
		        scope.$on('$destroy', function() {
		          cityModel && cityModel.remove();
		        });
		    }

		};
	}]);
});