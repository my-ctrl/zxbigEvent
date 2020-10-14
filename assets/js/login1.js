$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        //注册
        $('.reg-box').show();
    })

    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // var pwd = $('.reg-box[name=password]').val();不带空格选择的本身具有这个属性的
            var pwd = $('.reg-box [name=password]').val();//带空格选择的是子元素中具有这个属性的
            if (value !== pwd) {
                return '两次密码不一致';
            }
            if (pwd !== value) {
                return '两次密码不一致！'
            }

        }
    })


    //用户名还不能纯数字或者字母
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    //调用的是这个方法函数
                    return layer.msg(res.message)
                    // console.log(res.message);
                }
                layer.msg('注册成功,请登录');
                $('#link_login').click();
            }

        )
    })


    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功');
                console.log(res.token);
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token);
                //页面跳转功能
                location.href = '/index1.html';
           
            }
        })
    })

  

})