
define(['zepto'], function($) {
	return {
		tips: function(message) {
			if($('.error_tip').length < 1) {
				$('body').append('<p class="error_tip">' + message +'</p>');
				setTimeout(function(){
					$('.error_tip').remove();
				}, 3000);
			}
		}
	};
});