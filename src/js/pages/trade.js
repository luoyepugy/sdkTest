
(function($) {
  
    $.app().ctrl({

        // 页面加载时获取数据
        trade_all: function(scope) {
            getDatas({
                type: 'get_newer',
                status: 0,
                number: 6,
                base_id: null
            });          
        },
        trade_success: function(scope) {
            getDatas({
                type: 'get_newer',
                status: 1,
                number: 6,
                base_id: null
            });
        },
        trade_fail: function(scope) {
            getDatas({
                type: 'get_newer',
                status: 2,
                number: 6,
                base_id: null
            });
        },
        // 页面手势滑动事件
        slide: function(scope) {     
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
                            var id_bottom = $('.tab_content').eq(index).children('li').last().find('input[type="hidden"]').val();
                            getDatas({
                                async: true,
                                type: 'get_older',
                                status: index,
                                number: 6,
                                base_id: id_bottom
                            });
                            endPos = { x: 0, y: 0, time: 0 };
                        } else {
                            return;
                        }
                    } else if ( Math.abs(endPos.x) < Math.abs(endPos.y) && endPos.y > 50 && endPos.time > 120 ) {
                        if(scroll_top < 10) {
                            var id_top = $('.tab_content').eq(index).children('li').first().find('input[type="hidden"]').val();
                            getDatas({
                                async: true,
                                type: 'get_newer',
                                status: index,
                                number: 6,
                                base_id: id_top
                            });
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

// ajax获取后台数据函数
function getDatas(options) {
    loading();
    $.ajax({
        type: "GET", 
        url: "/sdkUI/src/js/pages/trade.json",
        dataType: "json",
        data: {
            "type": options.type, // get_newer表示刷新，get_older表示加载更多
            "status": options.status, // 0表示全部，1表示成功，2表示未成功
            "number": options.number, // 需要加载的数目
            "base_id": options.base_id  // 最后一条消息的id
        },
        success: function (data) {
            $('.loading').remove();
            if(data.success == true) {
                var datas = data.data.items;
                var total = data.data.total;
                if(total == 0) {
                    load_tip('没有更多了');
                } else if(total > 0) {
                    for(var i in datas) {
                        if(datas[i].status == true) {
                            datas[i].status_color = 'green fr'; 
                            datas[i].status = "成功";
                        } else {
                            datas[i].status_color = 'orange fr'; 
                            datas[i].status = "未成功";
                        }
                        var list =  '<li class="jq-show-hide">' +
                            '<p>' + datas[i].stuff + '<span class="' + datas[i].status_color + '">' + datas[i].status + '</span></p>' +
                            '<p class="font_sm gray_light jq-list">' + datas[i].payment + '支付' +
                                '<span class="orange trade_price">' + datas[i].money + 
                                '</span>元<span class="fr">' + datas[i].time + '</span>' +
                                '<input type="hidden" value=" ' + datas[i].id + ' " />' +
                            '</p>' +
                            '<div class="division none">' +
                                '<p class="gray_mid font_md">订单号：' + datas[i].order_number + '</p>' +
                                '<p class="gray_mid font_md">说明：' + datas[i].content + '</p>' +
                                '<input type="hidden" value=" ' + datas[i].id + ' " />' +
                            '</div>' +
                        '</li>';
                        $.delay(show_hide, 200);
                        if(options.status == 0){
                            if(options.type == 'get_older') {
                                $('.jq-trade-all').append(list);
                            } else {
                                insertDatas({
                                    base_id: options.base_id,
                                    childrenElement: 'li',
                                    selector: '.jq-trade-all',
                                    insertElement: list,
                                    index: i
                                });
                            } 
                        } else if(options.status == 1) {
                            if(options.type == 'get_older') {
                                $('.jq-trade-success').append(list);
                            } else {
                                insertDatas({
                                    base_id: options.base_id,
                                    childrenElement: 'li',
                                    selector: '.jq-trade-success',
                                    insertElement: list,
                                    index: i
                                });
                            }
                        } else if(options.status == 2) {
                            if(options.type == 'get_older') {
                                $('.jq-trade-fail').append(list);
                            } else {
                                insertDatas({
                                    base_id: options.base_id,
                                    childrenElement: 'li',
                                    selector: '.jq-trade-fail',
                                    insertElement: list,
                                    index: i
                                });
                            }
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
