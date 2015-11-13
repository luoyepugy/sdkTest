
define(['./module', 'zepto'], function(services, $) {
	services.factory('messageService', function() {
		var messages = {};
		messages.show = function(tips) {
			if($('.error_tip').length < 1) {
                $('body').append('<p class="error_tip">' + tips +'</p>');
                setTimeout(function(){
                    $('.error_tip').remove();
                }, 2500);
            }
		};
		return messages;
	});
});