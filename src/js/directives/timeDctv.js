
define(['./module'], function(directives) {
	directives.directive('ionicTime', ['$ionicModal', '$timeout', '$ionicScrollDelegate', 'timeService',
		function($ionicModal, $timeout, $ionicScrollDelegate, timeService) {
		return {
			restrict: 'AE',
			replace: true,
			template: '<input type="text" name="time" placeholder={{tm.placeholder}} ng-model="timedata" value="{{timedata}}" readonly>',
			scope: {
				timedata: '='
			},
			link: function(scope, element, attrs) {
				timeModel = null;
				var tm = scope.tm = {};
				tm.hourHandle="hourHandle";
        		tm.minuteHandle="minuteHandle";
				tm.placeholder = attrs.placeholder || '未设置';
				tm.okText = attrs.oktext || '完成';
				tm.barCssClass = attrs.barcssclass || "bar-dark";
				tm.datas = timeService.timeList;
				tm.tag=attrs.tag || ":";
				tm.returnOk = function(){
		            if(timeModel) { timeModel.hide(); }
		        };
		        tm.getData = function(name) {
		        	var length, Handle;
		        	$timeout.cancel(tm.scrolling);//取消之前的scrollTo.让位置一次性过渡到最新
			        $timeout.cancel(tm.dataing);//取消之前的数据绑定.让数据一次性过渡到最新
			        // 获取数据
			        tm.hourData=tm.datas.hourData;
			        tm.minuteData=tm.datas.minuteData;
			        // 判断滚动视图
			        switch(name)
			        {
			            case 'hour':
			              	if (!tm.hourData) { return false; }
			             	var hour = true; length=tm.hourData.length; Handle=tm.hourHandle;
			            	break;
			            case 'minute':
			              	if (!tm.minuteData) { return false; }
			              	var minute = true; length=tm.minuteData.length; Handle=tm.minuteHandle;
			            	break;
			            default: 
			            	tm.hour = tm.hourData[0];
			        		tm.minute = tm.minuteData[0];
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
		            // 处理滚动事件后数据
		            if (top===index*36) {
		            	tm.dataing = $timeout(function() {
		            		if(hour) { tm.hour = tm.hourData[index]; }
		            		if(minute) { tm.minute = tm.minuteData[index]; }
		            		//数据同步
				        	scope.timedata = tm.hour.name + tm.tag + tm.minute.name;
				        }, 150);
				    } else {
				    	tm.scrolling = $timeout(function() {
					    	$ionicScrollDelegate.$getByHandle(Handle).scrollTo(0, index*36, true);
					    }, 150);
				    }
		        };

		        // 元素点击事件
		        element.on("click", function() {
		            //零时处理 点击过之后直接显示不再创建
		            if (!attrs.checked) {
		              if(timeModel) { timeModel.remove(); }
		            } else {
		              if(timeModel) { timeModel.show(); }  
		              return;
		            }
		            attrs.checked = true;
		            // 显示模型
		            $ionicModal.fromTemplateUrl('./js/templates/timeTemp.html', {
		              scope: scope,
		              animation: 'slide-in-up',
		              backdropClickToClose: true
		            }).then(function(modal) {
		              timeModel = modal;
		              //初始化 先获取数据后展示
		              $timeout(function () {
		                tm.getData();
		                if(timeModel) { timeModel.show(); }
		              },100);
		            });
		        });
		        //销毁模型
		        scope.$on('$destroy', function() {
		          if(timeModel) { timeModel.remove(); }
		        });
		    }

		};
	}]);
});