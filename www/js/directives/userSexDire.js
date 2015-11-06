
define(['./module'], function(directives) {
	directives.directive('ionicUserSex', ['$ionicModal', '$timeout', '$ionicScrollDelegate', function($ionicModal, $timeout, $ionicScrollDelegate) {
		return {
			restrict: 'AE',
			scope: true,
			template: '<input type="text" placeholder={{placeholder}} ng-model="val" class="cssClass" readonly>',
			scope: {
				sex: '=',
				backdrop: '@',
				backdropClickToClose: '@',
				buttonClicked: '&'
			},
			link: function(scope, element, attrs) {
				userSexModel = null;
				scope.placeholder = attrs.placeholder || '未设置';
				scope.okText = attrs.okText || '确定';
				scope.cancelText = attrs.cancelText || '取消';
				scope.cssClass = attrs.cssClass;
				scope.barCssClass = attrs.barCssClass || "bar-dark";
				scope.tag = attrs.tag || '-';
				scope.datas = [{'value': '男'}, {'value': '女'}];
				backdropClickToClose=scope.$eval(scope.backdropClickToClose) || false;
				scope.returnOk=function(){
		            userSexModel && userSexModel.hide();
		            scope.buttonClicked && scope.buttonClicked();
		        }
		        scope.returnCancel = function() {
		        	userSexModel && userSexModel.hide();
		        }
		        scope.clickToClose=function(){
		            scope.backdropClickToClose && userSexModel && userSexModel.hide();
		        }
		        scope.getData = function() {
		        	$timeout.cancel(scrolling);
          			$timeout.cancel(dataing);
          			var top= $ionicScrollDelegate.getScrollPosition().top;//当前滚动位置
		            var index = Math.round(top / 36);
		            if (index < 0 ) index =0;//iOS bouncing超出头
		            if (index >length-1 ) index =length-1;//iOS 

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
		            $ionicModal.fromTemplateUrl('../views/user-sex.html', {
		              scope: scope,
		              animation: 'slide-in-up',
		              backdropClickToClose: backdropClickToClose
		            }).then(function(modal) {
		              userSexModel = modal;
		              //初始化 先获取数据后展示
		              $timeout(function () {
		                getData();
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