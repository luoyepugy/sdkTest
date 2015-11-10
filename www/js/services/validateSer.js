
define(['./module', 'zepto', '../modules/validate-tips'], function(services, $, messages) {
	services.service('validateService', function() {
		this.isEmpty = function(form) {
			var inputs = {},
            num = 0,
            total = $(form).length;
            $(form).each(function() {
                var key =  $(this).attr('name');
                var val = $.trim($(this).val());
                if(val === '' || val === undefined || val === null) {
                    messages.tips($(this).data('empty'));
                } else {
                    num++;
                }
            });
            if(num === total) {
                return 1;
            } else {
                return 0;
            }
		};
        this.submitData = function(form) {
            var datas = {};
            $(form).find('input[name],textarea[name],select[name]').each(function() {
                var key =  $(this).attr('name');
                var val = $.trim($(this).val());
                datas[key] = val;
            });
            return datas;
        }
	});
});