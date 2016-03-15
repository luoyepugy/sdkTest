(function($) {
      
    $.app().ctrl({

        chat_record: function(scope) {       
            // 页面加载 
            getData({
                type: 'get_newer',
                number: 5
            });
            // 点击发送按钮发送消息         
            scope.send_message = function(){
                var messages = $(this).prev('input').val();
                $(this).prev('input').val('');
                if(messages == '') {
                    return false;
                } else {
                    $.ajax({
                        type: "GET", // 此处应用POST
                        url: "/sdkUI/src/js/pages/record.json",
                        dataType: "json",
                        data: {
                            "messages": messages,
                            "number": 5
                        },
                        success: function (data) {
                            $(this).prev('input').attr('value', '');
                            if(data.success == true) {
                                messages = '';
                                var datas = data.data.items;
                                for(var i in datas){
                                    var section_user = '<section class="message_record tr">' +
                                            '<p class="p tc font_sm gray_light">' + datas[i].time + '</p>' +
                                            '<p class="input inline_right tl">' + datas[i].content + '</p>' + 
                                            '<span class="inline_left ml2"><img src=" ' + datas[i].avatar_url + '" /></span>' +  
                                            '<input type="hidden" value=" ' + datas[i].id + ' " />' +
                                            '</section>';
                                    $('.jq-record').append(section_user);
                                }
                            } else {
                                validate_tips(data.message);
                            }        
                        },
                        error: function() {
                            validate_tips("加载数据错误");
                        }
                    });
                }
            }
            var endPos = {};
            scope.on({
                touchstart: function(e) {
                    var position = e.targetTouches[0];
                    startPos = { x: position.pageX, y: position.pageY, time: (new Date()).getTime() };
                },
                touchmove: function(e) {
                    var position2 = e.targetTouches[0];
                    endPos = { x: position2.pageX - startPos.x, y: position2.pageY - startPos.y, time: (new Date()).getTime() - startPos.time };   
                },
                touchend: function(e) {
                    var scroll_top = window.pageYOffset;
                    var id_top = $('.jq-record section').first().find('input[type="hidden"]').val() || null;
                    if ( Math.abs(endPos.x) < Math.abs(endPos.y) && endPos.y > 50 && endPos.time > 120 ) {
                        if(scroll_top < 10) {
                            getData({
                                async: true,
                                type: 'get_older',
                                number: 6,
                                base_id: id_top
                            });
                            endPos = { x: 0, y: 0, time: 0 };
                        }
                    }
                }
            });  
        }
    });

 })(Qmik);

 // 获取数据
function getData(options) {
    loading();
    $.ajax({
        type: "GET", // 此处应用POST
        url: "/sdkUI/src/js/pages/record.json",
        dataType: "json",
        data: {
            "type": options.type,
            "number": options.number,
            "base_id": options.base_id
        },
        success: function (data) {
            $('.loading').remove();
            if(data.success == true) {
                var datas = data.data.items;
                var total = data.data.total;
                if(total == 0) {
                    load_tip_top('没有更多了');
                } else if (total > 0) {
                    for(var i in datas) {
                        var section_user = '<section class="message_record tr">' +
                            '<p class="p tc font_sm gray_light">' + datas[i].time + '</p>' +
                            '<p class="input inline_right tl">' + datas[i].content + '</p>' + 
                            '<span class="inline_left ml2"><img src=" ' + datas[i].avatar_url + '" /></span>' +  
                            '<input type="hidden" value=" ' + datas[i].id + ' " />' +
                            '</section>';
                        var section_manager = '<section class="message_record">' +
                            '<p class="p tc font_sm gray_light">' + datas[i].time + '</p>' +
                            '<span class="inline_left mr2"><img src=" ' + datas[i].avatar_url + '" /></span>' +
                            '<p class="input green inline_right">' + datas[i].content + '</p>' +  
                            '<input type="hidden" value=" ' + datas[i].id + ' " />' +
                            '</section>';
                        if(datas[i].user_type == 'user') {
                            insertDatas({
                                base_id: options.base_id,
                                childrenElement: 'section',
                                selector: '.jq-record',
                                insertElement: section_user,
                                index: i
                            });
                        } else {
                            insertDatas({
                                base_id: options.base_id,
                                childrenElement: 'section',
                                selector: '.jq-record',
                                insertElement: section_manager,
                                index: i
                            });
                        }  
                    }
                }
            } else {
                $('.loading').remove();
                validate_tips(data.message);
            }
        },
        error: function() {
            validate_tips("加载数据错误");
        }
    });
} 