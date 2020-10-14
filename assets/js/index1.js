$(function () {
    getUserInfo();

    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            //??
            // headers: { Authorization: localStorage.getItem('token') || ' ' },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                renderAvatar(res.data);

            },
            //不登录直接进来，用户访问权限 Authorization为空
            //ajax和数据接口图 complete  就直接调回登录页面
            // complete: function (res) {
            //     console.log(res);
            //     //responseJSON
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         //清空存储和跳转
            //         localStorage.removeItem('token');
            //         location.href = '/login1.html';
            //     }
            // }

        })
    }
    //怎样拿到用户的图片图像 要么显示文字或头像


    function renderAvatar(user) {
        var name = user.nickname || user.username;
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src',user.user_pic);
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide();
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show()
        }
    }

    var layer = layui.layer;
    //退出功能，退出后，本地的token要清空存储 
    //阻止a默认跳转行为，设置ID 设置点击事件 提示消息框 confirm
    //跳回登录页，清空本地存储  官方提供的关闭弹出层，带上即可
    $('#btnLogout').click(function () {
        layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
            location.href = '/login1.html';
            localStorage.removeItem('token');

            layer.close(index);
        });
    })



    //



})




