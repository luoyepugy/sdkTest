
define(['zepto', './validate-tips'], function($, messages) {
    return {
        ajaxGet: function(url, data) {
            var datas;
            $.ajax({
                type: 'GET',
                url: url,
                data: data,
                dataType: 'json',
                success: function(response) {
                    if(response.success === true) {
                        messages.tips('成功');
                        datas = response;
                        console.log(datas);
                    } else {
                        messages.tips(response.message);
                    }
                },
                error: function() {
                    messages.tips('服务器请求失败');
                }
            });
            console.log(datas);
        }
    };
});