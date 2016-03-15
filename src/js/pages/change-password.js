
(function($) {
      
    $.app().ctrl({
        // 修改密码表单提交
        changePwdForm: function(scope) {
            scope.submit = function(e){
                var new_pwd = $('#new_password').val();
                var old_pwd = $('#old_password').val();
                var confirm_pwd = $('#confirm_password').val();  
                if(old_pwd == '') {
                    validate_tips('请输入旧密码');
                } else if(new_pwd == '') {
                    validate_tips('请输入新密码');
                } else if(new_pwd !== confirm_pwd) {
                    validate_tips('两次密码输入不一致');
                } else {
                    $.ajax({
                        type: "GET", // 此处应用POST
                        url: "/sdkUI/src/js/pages/change-password.json",
                        dataType: "json",
                        data: {
                            "old_password": old_pwd,
                            "new_password": new_pwd
                        },
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
