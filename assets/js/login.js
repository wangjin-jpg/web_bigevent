$(function() {
    // 点击去注册
    $('#link-log').click(function() {
        $('.login-box').hide()
        $('.register-box').show()
    })
    $('#link-reg').click(function() {
            $('.register-box').hide()
            $('.login-box').show()
        })
        // 校验表单规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var pwd = $('.register-box [name=password]').val()
                if (!(pwd == value)) {
                    return '两次输入不一致'
                }
            }
        })
        // 提交表单进行注册
    $('#form_reg').submit(function(e) {
            e.preventDefault()
            var unval = $('#usernames').val()
            var psdval = $('#passwords').val()
            $.ajax({
                method: 'post',
                url: '/api/reguser',
                data: {
                    username: unval,
                    password: psdval
                },
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message)
                    $('#link-reg').click()
                }
            })
        })
        // 登录
    $('#form-login').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 将返回的token存储到本地存储
                localStorage.setItem('token', res.token)
                layer.msg(res.message)
                    // 跳转到主页
                location.href = '/index.html'
            }
        })
    })
})