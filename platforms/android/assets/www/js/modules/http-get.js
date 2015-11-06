
define(['zepto', './validate-tips'], function($, messages) {
    return {
        httpGet: function(url, data) {
            $http.get(url, { params: data })
                .success(function(response) {
                    if(response.success === true) {
                        messages.tips('修改成功');
                    } else {
                        messages.tips(response.message);
                    }
                })
                .error(function() {
                    messages.tips('服务器请求失败');
                });
        }
    };
});