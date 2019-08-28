$(function () {
    //登录变表单验证
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在3到6之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6到12之间'
                    },
                    callback: {
                        message: '密码不存在'
                    }
                }
            }
        }
    });


    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                if (info.success) {
                    location.href = 'index.html';
                }
                console.log(info);
                if (info.error === 1000) {
                    $("#form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                }
                if (info.error === 1001) {
                    $("#form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                }
            }
        })
    });


    $("[type='reset']").click(function () {
        $("#form").data('bootstrapValidator').resetForm();
    });


})