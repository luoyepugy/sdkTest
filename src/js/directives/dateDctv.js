
define(['./module'], function(directives) {
	directives.directive('ionicDate', ['$ionicModal', '$timeout', '$ionicScrollDelegate', 'dateService', 'messageService',
		function($ionicModal, $timeout, $ionicScrollDelegate, dateService, messageService) {
		return {
			restrict: 'E',
			scope: {},
			replace: true,
			template: '<input type="text" name="birthday" placeholder={{placeholder}} ng-model="$parent.user.birthday" value="{{$parent.user.birthday}}" readonly>',
			link: function(scope, element, attrs) {
				dateModel = null;
				scope.user = {};
				scope.yearHandle="yearHandle";
        		scope.monthHandle="monthHandle";
        		scope.dayHandle="dayHandle";
				scope.placeholder = attrs.placeholder || '未设置';
				scope.okText = attrs.oktext || '完成';
				scope.barCssClass = attrs.barcssclass || "bar-dark";
				scope.datas = dateService.dateList;
				scope.tag=attrs.tag || "-";
				scope.returnOk = function(){
					if(dateModel) { dateModel.hide(); }
		        };
		        scope.getData = function(name) {
		        	var length, Handle;
		        	$timeout.cancel(scope.scrolling);//取消之前的scrollTo.让位置一次性过渡到最新
			        $timeout.cancel(scope.dataing);//取消之前的数据绑定.让数据一次性过渡到最新
			        scope.yearData=scope.datas.yearData;
			        scope.monthData=scope.datas.monthData;
			        scope.dayData=scope.datas.dayData;
			        switch(name)
			        {
			            case 'year':
			              	if (!scope.yearData) { return false; }
			             	var year = true; length=scope.yearData.length; Handle=scope.yearHandle;
			            	break;
			            case 'month':
			              	if (!scope.monthData) { return false; }
			              	var month = true; length=scope.monthData.length; Handle=scope.monthHandle;
			            	break;
			            case 'day':
			              	if (!scope.dayData) { return false; }
			              	var day = true; length=scope.dayData.length; Handle=scope.dayHandle;
			            	break;
			            default: 
			            	scope.year = scope.yearData[0];
			        		scope.month = scope.monthData[0];
			        		scope.day = scope.dayData[0];
			        }
	          		var top = $ionicScrollDelegate.$getByHandle(Handle).getScrollPosition().top;//当前滚动位置
		            var index = Math.round(top / 36);
		            //iOS bouncing超出头
		            if (index < 0 ) {
		            	index = 0;
		            } 	
		            //iOS 超出尾			
		            if (index > length-1) {
		            	index = length-1;
		            } 
		            if (top===index*36) {
		            	scope.dataing = $timeout(function() {
		            		if(year) { scope.year = scope.yearData[index]; }
		            		if(month) { scope.month = scope.monthData[index]; }
		            		if(day) { scope.day = scope.dayData[index]; }
		            		//数据同步
				        	scope.$parent.user.birthday = scope.year.name + scope.tag + scope.month.name + scope.tag + scope.day.name;
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
		            	if(dateModel) { dateModel.remove(); }
		            } else {
		            	if(dateModel) { dateModel.show(); }
		                return;
		            }
		            attrs.checked = true;
		            // 显示模型
		            $ionicModal.fromTemplateUrl('./js/templates/dateTemp.html', {
		              scope: scope,
		              animation: 'slide-in-up',
		              backdropClickToClose: true
		            }).then(function(modal) {
		              	dateModel = modal;
		              //初始化 先获取数据后展示
		              $timeout(function () {
		                scope.getData();
		                if(dateModel) { dateModel.show(); }
		              },100);
		            });

		        });
		        //销毁模型
		        scope.$on('$destroy', function() {
		        	if(dateModel) { dateModel.remove(); }
		        });
		    }

		};
	}]);
});