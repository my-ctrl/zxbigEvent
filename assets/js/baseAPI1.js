$.ajaxPrefilter(function (options) {
    //请求前会先拿到哪些请求的东西，拼接完，会把拼接后的给哪些请求
    console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);
    //设置headers请求头 包含/my用indexOf
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            // Authorization 不能变，要和登录的一一对应
            Authorization: localStorage.getItem('token') || ' ',
        }
    }

    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清空存储和跳转
            localStorage.removeItem('token');
            location.href = '/login1.html';
        }
    }


})

