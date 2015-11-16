
define(['./module'], function(directives) {
	directives.directive('ionicUserSex', 
		['$ionicModal', '$timeout', '$ionicScrollDelegate', 'userService', 
		function($ionicModal, $timeout, $ionicScrollDelegate, userService) {
		return {
			restrict: 'E',
			scope: true,
			replace: true,
			template: '<input type="text" name="sex" placeholder={{placeholder}} ng-model="user.sex" value="{{user.sex}}" readonly>',
			scope: {
				okButtonClicked: '&'
			},
			link: function(scope, element, attrs) {
				userSexModel = null;
				scope.user = {};
				scope.placeholder = attrs.placeholder || '未设置';
				scope.okText = attrs.oktext || '完成';
				scope.barCssClass = attrs.barcssclass || "bar-dark";
				scope.datas = [{'value': '男'}, {'value': '女'}];
				scope.returnOk=function(){
		            userSexModel && userSexModel.hide();
		            scope.okButtonClicked && scope.okButtonClicked();
		        };
		        scope.getData = function() {
		        	// $timeout.cancel(scope.scrolling);
          			// $timeout.cancel(scope.dataing);
          			var top = $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top;//当前滚动位置
          			console.log(top);
          			var length = scope.datas.length;
		            var index = Math.round(top / 36);
		            if (index < 0 ) index = 0;//iOS bouncing超出头
		            if (index > length-1 ) index = length-1;//iOS 
		            if (top===index*40) {
			        //     scope.dataing = $timeout(function () {
			        //     	$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();//初始化子scroll top位
			        //     	scope.user.sex = scope.datas[index].value; 
			        //     },150);
			        // }else{
			        //     scope.scrolling=$timeout(function () {
			             	$ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0,index*40,true);
			             	scope.user.sex = scope.datas[index].value; 
			            // },150);
			        }
		        }

		        element.on("click", function () {
		            //零时处理 点击过之后直接显示不再创建
		            if (!attrs.checked) {
		              userSexModel && userSexModel.remove();
		            }else{
		              userSexModel && userSexModel.show();  
		              return
		            }
		            attrs.checked=true;
		            $ionicModal.fromTemplateUrl('../js/templates/userSexTemp.html', {
		              scope: scope,
		              animation: 'slide-in-up',
		              backdropClickToClose: true
		            }).then(function(modal) {
		              userSexModel = modal;
		              //初始化 先获取数据后展示
		              $timeout(function () {
		                // getData();
		                userSexModel.show();
		              },100)
		            })
		        })
		        //销毁模型
		        scope.$on('$destroy', function() {
		          userSexModel && userSexModel.remove();
		        });
			}

		}
	}]);
});