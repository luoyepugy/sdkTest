
(function($) {
      
    $.app().ctrl({
        // 点击选项卡菜单切换内容
        tab_menu: function(scope) {
            scope.tab_toggle = function() {
                $('.header_tab').children().removeClass('header_tab_cur');
                $(this).addClass('header_tab_cur');
                $('.tab_content').addClass('none');
                var index = Number($(this).attr('data-index'));
                $('.tab_content').eq(index).removeClass('none');
            }
        }
    });

 })(Qmik);


// 消息提示函数
function validate_tips(messages) {  
    $('p.error_tip').remove();
    $('body').append('<p class="error_tip">' + messages + '</p>');
    setTimeout(function() {
        $('p.error_tip').remove();
    }, 2000);
}

// 水平选项卡滑动
function slide_horizontal(index) {
    if(index < 3 && index > -1) {
        $('.header_tab li').removeClass('header_tab_cur');
        $('.header_tab li').eq(index).addClass('header_tab_cur');
        $('.tab_content').addClass('none');
        $('.tab_content').eq(index).removeClass('none');
    } else {
        return false;
    }      
}

// 点击展开隐藏效果
function show_hide() {
    $('.division').first().rmClass('none');
    $('.jq-list').first().addClass('mb3');
    $(".jq-show-hide").on({//绑定事件
        click: function(e){
            $('.division').addClass('none');
            $('.jq-list').rmClass('mb3');
            $(this).find('.division').rmClass('none');
            $(this).find('.jq-list').addClass('mb3');
        }
    });
}

// 页面插入ajax数据
function insertDatas(options) {
    if(options.base_id == null) {
        $(options.selector).append(options.insertElement);
    } else {
        if(options.index == 0) {
            $(options.selector).find(options.childrenElement).first().before(options.insertElement);
        } else {
            $(options.selector).find(options.childrenElement).eq(options.index-1).after(options.insertElement);
        }  
    }
}

// 加载提示信息-顶部
function load_tip_top(messages) {
    $('p.load_tip').remove();
    $('article').find('section').first().before('<p class="load_tip">' + messages + '</p>');
    setTimeout(function() {
        $('p.load_tip').remove();
    }, 2000);
}

// 加载提示信息-底部
function load_tip(messages) {
    $('p.load_tip').remove();
    $('body').append('<p class="load_tip">' + messages + '</p>');
    setTimeout(function() {
        $('p.load_tip').remove();
    }, 2000);
}

// 加载图片
function loading() {
    $('body').append('<p class="loading"><img src="/sdkUI/dist/images/loading.gif" /></p>');
}         