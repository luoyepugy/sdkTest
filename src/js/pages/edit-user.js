
(function($) {

    $.app().ctrl({
        // 单选按钮状态样式切换
        radio: function(scope) {
            scope.choice = function(e) {
                $('input[name="sex"]').removeAttr('checked');
                $(this).find('input[name="sex"]').attr('checked', 'checked');
                $('.icon-radio-checked').addClass('gray_light').removeClass('green');
                $(this).find('.icon-radio-checked').removeClass('gray_light').addClass('green');
            }
        },
        // 编辑资料表单提交
        editUserForm: function(scope) {
            scope.submit = function(e) {
                var user_name = $('#user_nickname').val();
                var user_sex = $(this).find('input[checked="checked"]').val();
                var user_birthday = $('#user_birthday').val();
                var user_hometown = $('#user_hometown').val();
                if(user_name == '') {
                    validate_tips('请输入昵称');
                } else if(user_name.length > 10) {
                    validate_tips('请输入10个字以内的昵称');
                } else {
                    $.ajax({
                        type: "GET", // 此处应用POST
                        url: "/sdkUI/src/js/pages/change-password.json",
                        dataType: "json",
                        data: {
                            "name": user_name,
                            "sex": user_sex,
                            "birthday": user_birthday,
                            "hometown": user_hometown
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


// 上传头像
function uploadImg(e) { 
    var img = event.target.files[0];
    // 判断是否图片  
    if(!img){  
        return ;  
    }  
    // 判断图片格式  
    if(!(img.type.indexOf('image')==0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name)) ){  
        validate_tips('请选择正确的图片格式');  
        return ;  
    }  
    var reader = new FileReader();  
    reader.readAsDataURL(img);  

    reader.onload = function(e){ // reader onload start  
        // ajax 上传图片  
        $.post("server.php", { img: e.target.result },function(ret){  
            if(ret.img!=''){  
                $('#user_portrait').attr('src', this.result);
            }else{  
                alert('upload fail');  
            }  
        },'json');  
    }   
}                 