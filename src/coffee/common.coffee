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

(-> $)
	$.app.ctrl
		tab_menu: (scope) ->
			scope.tab_toggle = ->
				$('.header_tab').children().removeClass 'header_tab_cur'
				$(@).addClass 'header_tab_cur'

