
define(['./module'], function(directives) {
	directives.directive('ionicSex', ['$ionicModal', '$timeout', '$ionicScrollDelegate',
		function($ionicModal, $timeout, $ionicScrollDelegate) {
		return {
			restrict: 'E',
			scope: {},
			replace: true,
			template: '<input type="text" name="sex" placeholder={{placeholder}} ng-model="user.sex" value="{{user.sex}}" readonly>',
			link: function(scope, element, attrs) {
				sexModel = null;
				scope.user = {};
				scope.placeholder = attrs.placeholder || '未设置';
				scope.okText = attrs.oktext || '完成';
				scope.barCssClass = attrs.barcssclass || "bar-dark";
				scope.datas = [{'value': '男'}, {'value': '女'}];
				scope.returnOk = function(){
		            sexModel && sexModel.hide();
		        };
		        scope.getData = function() {
		        	$timeout.cancel(scope.scrolling);//取消之前的scrollTo.让位置一次性过渡到最新
			        $timeout.cancel(scope.dataing);//取消之前的数据绑定.让数据一次性过渡到最新
	          		var top = $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top;//当前滚动位置
	          		var length = scope.datas.length;
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
				        	scope.user.sex = scope.datas[index].value;
				        }, 150);
				    } else {
				    	scope.scrolling = $timeout(function() {
					    	$ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, index*36, true);
					    }, 150);
				    }
		        };

		        // 元素点击事件
		        element.on("click", function() {
		            //零时处理 点击过之后直接显示不再创建
		            if (!attrs.checked) {
		              sexModel && sexModel.remove();
		            } else {
		              sexModel && sexModel.show();  
		              return;
		            }
		            attrs.checked = true;
		            // 显示模型
		            $ionicModal.fromTemplateUrl('./js/templates/sexTemp.html', {
		              scope: scope,
		              animation: 'slide-in-up',
		              backdropClickToClose: true
		            }).then(function(modal) {
		              sexModel = modal;
		              //初始化 先获取数据后展示
		              $timeout(function () {
		                scope.getData();
		                sexModel && sexModel.show();
		              },100);
		            });
		        });
		        //销毁模型
		        scope.$on('$destroy', function() {
		          sexModel && sexModel.remove();
		        });
		    }

		};
	}]);
});