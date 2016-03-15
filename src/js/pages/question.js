
(function($) {
      
    $.app().ctrl({
        // 常见问题
        commonQuestion: function(scope) {
            commonquestion({
                page: 1,
                number: 5
            });
        },
        // 反馈问题表单
        feedbackForm: function(scope) {
            // 反馈问题页面加载后判断是否登录状态
            $.ajax({
                type: "GET", // 此处应用POST
                url: "/sdkUI/src/js/pages/change-password.json",
                dataType: "json",
                success: function (data) {
                    if(data.success == false) {         
                        validate_tips(data.message);
                        $('.jq-submit-feedback').children().removeClass('none');
                        $('.jq-submit-feedback p').eq(0).addClass('none');
                    } else {
                        $('.jq-submit-feedback').children().addClass('none');
                        $('.jq-submit-feedback p').eq(0).removeClass('none');
                    }        
                },
                error: function() {
                    validate_tips("加载数据错误");
                }
            });
            // 反馈问题表单提交
            scope.submit = function(){
                var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
                var email_regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var content = $('textarea[name="content"]').val();
                var feedback_index = document.getElementById('feedback_type').options.selectedIndex;
                var feedback_type = document.getElementById('feedback_type').options[feedback_index].value;
                var problem_index = document.getElementById('problem_type').options.selectedIndex;
                var problem_type = document.getElementById('problem_type').options[problem_index].value;
                var email = $('input[name="email"]').val();
                var phone = $('input[name="phone"]').val();
                if(content == '') {
                    validate_tips('请输入意见描述');
                } else if(feedback_type == '') {
                    validate_tips('请选择反馈类型');
                } else if(problem_type == '') {
                    validate_tips('请选择问题分类');
                } else if(email == '') {
                    validate_tips('请输入邮箱地址');
                } else if(phone == '') {
                    validate_tips('请输入联系电话');
                } else if(!phone_regexp.test(phone)) {
                    validate_tips('请输入正确的手机号码格式');
                } else if(!email_regexp.test(email)) {
                    validate_tips('请输入正确的邮箱地址格式');
                } else {
                    $.ajax({
                        type: "GET", // 此处应用POST
                        url: "/sdkUI/src/js/pages/change-password.json",
                        dataType: "json",
                        data: {
                            "content": content,
                            "feedback_type": feedback_type,
                            "problem_type": problem_type,
                            "email": email,
                            "phone": phone
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
        },
        // 我的反馈
        myfeedback: function(scope) {
            myfeedback({
                type: 'get_newer',
                number: 5,
                base_id: null
            });
        },
        // 全局控制器
        question: function(scope) {
            var endPos = {};
            // 绑定手势滑动事件
            scope.on({
                touchstart: function(e) {
                    var position = e.targetTouches[0];
                    startPos = { x: position.pageX, y: position.pageY, time: (new Date()).getTime() };
                },
                touchmove: function(e) {
                    var position2 = e.targetTouches[0];
                    endPos = { x: position2.pageX - startPos.x, y: position2.pageY - startPos.y, time: (new Date()).getTime() - startPos.time };
                },
                touchend: function() {
                    var index = Number($('.header_tab_cur').attr('data-index'));
                    var document_height = document.body.clientHeight || document.documentElement.clientHeight;
                    var visual_height = window.screen.height;
                    var scroll_top = window.pageYOffset;
                    if ( Math.abs(endPos.x) > Math.abs(endPos.y) && endPos.x < -50 && endPos.time > 120 ) {           
                        index += 1;
                        slide_horizontal(index);  
                        endPos = { x: 0, y: 0, time: 0 };                      
                    } else if ( Math.abs(endPos.x) > Math.abs(endPos.y) && endPos.x > 50 && endPos.time > 120 ) {  
                        index -= 1;
                        slide_horizontal(index);
                        endPos = { x: 0, y: 0, time: 0 };                               
                    } else if ( Math.abs(endPos.x) < Math.abs(endPos.y) && endPos.y < -50 && endPos.time > 120 ) {
                        if(scroll_top + visual_height + 10 >= document_height) {
                            if(index == 2) {
                                var id_bottom = $('.jq-myfeedback').find('li').last().find('input[type="hidden"]').val();
                                myfeedback({
                                    type: 'get_older',
                                    number: 6,
                                    base_id: id_bottom
                                }); 
                            } else if(index == 0) {
                                var page = 2;
                                commonquestion({
                                    page: page,
                                    number: 5
                                });
                                page += 1;
                            }
                            endPos = { x: 0, y: 0, time: 0 };
                        } else {
                            return;
                        }
                    } else if ( Math.abs(endPos.x) < Math.abs(endPos.y) && endPos.y > 50 && endPos.time > 120 ) {
                        if(scroll_top < 10) {
                            if(index == 2) {
                                var id_top = $('.jq-myfeedback').find('li').first().find('input[type="hidden"]').val();
                                myfeedback({
                                    type: 'get_newer',
                                    number: 6,
                                    base_id: id_top
                                });
                            } else if(index == 0) {
                                var page = 1;
                                commonquestion({
                                    page: page,
                                    number: 5
                                });
                            }
                            endPos = { x: 0, y: 0, time: 0 };
                        } else {
                            return;
                        }
                    }
                }
            }); 
        }
    });

 })(Qmik);

// 我的反馈获取ajax数据
function myfeedback(options) {
    loading();
    $.ajax({
        type: "GET", // 此处应用POST
        url: "/sdkUI/src/js/pages/myfeedback.json",
        dataType: "json",
        data: {
            "type": options.type,
            "base_id": options.base_id,
            "number": options.number
        },
        success: function (data) {
            $('.loading').remove();
            if(data.success == true) { 
                var total = data.data.total;
                if(total == 0) {
                    load_tip('没有更多了');
                } else if(total > 0){
                    var datas = data.data.items;
                    for(var i in datas){
                        if(datas[i].status == 'not_replied') {
                            datas[i].status_color = 'font_sm gray_light inline_right tr green';
                            datas[i].status = '等待回复';
                        } else if(datas[i].status == 'replied') {
                            datas[i].status_color = 'font_sm gray_light inline_right tr';
                            datas[i].status = '已回复';
                        } else {
                            datas[i].status_color = 'font_sm gray_light inline_right tr';
                            datas[i].status = '已结束';
                        }
                        var myfeedback = '<a href="/sdkUI/dist/feedback/record.html" class="link_gray"><li>' +
                                        '<p class="myfeedback">' +
                                            '<span class="inline_left">' + datas[i].content + '</span>' +
                                            '<span class=" ' + datas[i].status_color + ' ">' + datas[i].status + '</span>' +
                                        '</p>' +
                                        '<p class="mt3 font_sm gray_light">最后更新时间：' + datas[i]["updated_at"] + '</p>' +
                                        '<input type="hidden" value=" ' + datas[i].id + ' " />' +
                                    '</li></a>';
                        if(options.type == 'get_older') {
                            $('.jq-myfeedback').append(myfeedback);
                        } else {
                            insertDatas({
                                base_id: options.base_id,
                                childrenElement: 'li',
                                selector: '.jq-myfeedback',
                                insertElement: myfeedback,
                                index: i
                            });
                        }
                    }
                }
            } else {
                validate_tips(data.message);
            }        
        },
        error: function() {
            $('.loading').remove();
            validate_tips("加载数据错误");
        }
    });
}

// 常见问题获取ajax数据
function commonquestion(options) {
    loading();
    $.ajax({
        type: "GET", // 此处应用POST
        url: "/sdkUI/src/js/pages/commonquestion.json",
        dataType: "json",
        data: {
            "page": options.page,
            "number": options.number
        },
        success: function (data) {
            $('.loading').remove();
            if(data.success == true) {
                var datas = data.data.items;
                var total = data.data.total;
                if(total == 0) {
                    load_tip('没有更多了');
                } else if(total > 0){
                    for(var i in datas){
                        var commonquestion = '<li class="jq-show-hide">' +
                                '<section class="message_question jq-list">' +
                                    '<strong class="orange font_lg inline_left">Q:</strong>' +
                                    '<p class="inline_right">' + datas[i].question + '</p>' +
                                '</section>' +
                                '<section class="message_question division none">' +
                                    '<strong class="green font_lg inline_left">A:</strong>' +
                                    '<p class="gray_mid font_md inline_right">' + datas[i].answer + '</p>' +
                                '</section>' +
                            '</li>;';
                        $.delay(show_hide, 200);
                        $('.jq-commonquestion').append(commonquestion);
                    }
                }
            } else {
                validate_tips(data.message);
            }        
        },
        error: function() {
            $('.loading').remove();
            validate_tips("加载数据错误");
        }
    });
}
