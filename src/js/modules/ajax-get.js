
define(['zepto', './validate-tips'], function($, messages) {
	return {
		ajaxGet: function(url, data, fun) {
			$.ajax({
				url: url,
				data: data,
				dataType: 'json',
				success: function(response) {
					if(response.success === true) {
						messages.tips('成功');
						if(fun !== null || fun !== undefined) {
							fun();
						}
					} else {
						messages.tips(response.message);
					}
				},
				error: function() {
					messages.tips('服务器请求失败');
				}
			});
		}
	};
});