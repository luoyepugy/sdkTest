
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
                    return false;
                } else {
                    inputs[key] = val;
                    num++;
                }
            });
            if(num === total) {
                return inputs;
            } else {
                return 0;
            }
		}
	});
});