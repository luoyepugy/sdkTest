(function($) {
      
    $.app().ctrl({
        identity: function(scope) {
            // 验证类型
            var identity_type = 'phone';
            // 单选
            scope.checked = function() {
                $('.jq-list').find('i').addClass('icon-radio-unchecked');
                $(this).find('i').removeClass('icon-radio-unchecked');
                $('.division').addClass('none');
                $('.jq-list').rmClass('mb3');
                $(this).next('.division').rmClass('none');
                $(this).addClass('mb3'); 
                $('.jq-next-btn').attr('data-url', $(this).attr('data-url'));
                identity_type = $(this).attr('data-identity');            
                if(identity_type == 'email') {
                    $('.jq-next-btn').parent().next().removeClass('none');
                } else {
                    $('.jq-next-btn').parent().next().addClass('none');
                }
            },
            // 获取验证码
            scope.get_code = function() {
                var phone = $('input[name="phone"]').val();
                $.ajax({
                    type: "GET", // 此处应用POST
                    url: "/sdkUI/src/js/pages/identity.json",
                    dataType: "json",
                    data: {
                        "phone": phone
                    },
                    success: function (data) {
                        if(data.success == false) {         
                            validate_tips(data.message);
                        } else {
                            return false;
                        }        
                    },
                    error: function() {
                        validate_tips("加载数据错误");
                    }
                });
            },
            // 下一步按钮
            scope.next_step = function() {
                var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
                var email_regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var phone = $('input[name="phone"]').val();
                var code = $('input[name="verification_code"]').val();
                var email = $('input[name="email"]').val();
                var url = $(this).find('a').attr('data-url');
                if(identity_type == 'phone') {
                    if(phone == '') {
                        validate_tips('请输入手机号码');
                    } else if(code == '') {
                        validate_tips('请输入验证码');
                    } else if(!phone_regexp.test(phone)) {
                        validate_tips('请输入正确的手机号码格式');
                    } else {
                        $.ajax({
                            type: "GET", // 此处应用POST
                            url: "/sdkUI/src/js/pages/change-password.json",
                            dataType: "json",
                            data: {
                                "phone": phone, 
                                "verification_code": code
                            },
                            success: function (data) {
                                if(data.success == false) {         
                                    validate_tips(data.message);
                                } else {
                                    window.location.href = url;
                                }        
                            },
                            error: function() {
                                validate_tips("加载数据错误");
                            }
                        });
                    }
                } else {
                    if(email == '') {
                        validate_tips('请输入邮箱地址');
                    } else if(!email_regexp.test(email)) {
                        validate_tips('请输入正确的邮箱地址格式');
                    } else {
                        $.ajax({
                            type: "GET", // 此处应用POST
                            url: "/sdkUI/src/js/pages/change-password.json",
                            dataType: "json",
                            data: { "email": email },
                            success: function (data) {
                                if(data.success == false) {         
                                    validate_tips(data.message);
                                } else {
                                    window.location.href = url;
                                }        
                            },
                            error: function() {
                                validate_tips("加载数据错误");
                            }
                        });
                    }
                }   
            }
        }
    });

 })(Qmik);