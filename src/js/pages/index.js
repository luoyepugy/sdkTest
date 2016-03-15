
(function($) {
      
    $.app().ctrl({
        // 切换开关状态
        switch: function(scope) {
            var flag = 0, status;
            scope.switch_toggle = function(e){
                if(flag % 2 == 0) {
                    $(this).removeClass('switch_active').addClass('switch_close');
                    status = 'off'
                    flag += 1;
                } else {
                    $(this).addClass('switch_active').removeClass('switch_close');
                    status = 'on';
                    flag -= 1;
                }
                $.ajax({
                    type: "GET", // 此处应用POST
                    url: "/sdkUI/src/js/pages/change-password.json",
                    dataType: "json",
                    data: {
                        "status": status
                    },
                    success: function (data) {
                        if(data.success == false) {         
                            validate_tips(data.message);
                        }      
                    },
                    error: function() {
                        validate_tips("加载数据错误");
                    }
                });                                
            }
        }
    });

 })(Qmik);