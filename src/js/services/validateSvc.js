
define(['./module', 'zepto'], function(services, $) {
	services.service('validateService', function() {
		this.isEmpty = function(form) {
			var inputs = {},
                num = 0,
                total = $(form).length,
                results = '';
            $(form).each(function() {
                var key = $(this).attr('name');
                var val = $.trim($(this).val());
                if(val === '' || val === undefined || val === null) {
                    results = $(this).data('empty');
                    return false;
                } else {
                    num++;
                }
            });
            if(num === total) {
                return 1;
            } else {
                return results;
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
        };
	});
});