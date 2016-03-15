
(function($) {
      
    $.app().ctrl({
        // 重置密码表单提交
        resetPwdForm: function(scope) {
            scope.submit = function(e){
                var new_pwd = $('#new_password').val();
                var confirm_pwd = $('#confirm_password').val();   
                if(new_pwd == '') {
                    validate_tips('请输入新密码');
                } else if(new_pwd !== confirm_pwd) {
                    validate_tips('两次密码输入不一致');
                } else {
                    $.ajax({
                        type: "GET", // 此处应用POST
                        url: "/sdkUI/src/js/pages/change-password.json",
                        dataType: "json",
                        data: { "new_password": new_pwd },
                        success: function (data) {
                            if(data.success == false) {         
                                validate_tips(data.message);
                            } else {
                                window.location.href = '/sdkUI/dist/index.html';
                            }        
                        },
                        error: function() {
                            validate_tips("加载数据错误");
                        }
                    });
                }                                     
            }
        }
    });

 })(Qmik);