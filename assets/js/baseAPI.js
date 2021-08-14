//注意每次使用$.ajax()时会调用aiaxPrefileter函数
//在这个函数中。可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax请求之前，同意拼接请求额的根路径
    // options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    options.url = 'http://www.liulongbin.top:3008' + options.url
    console.log(options.url);
    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载 complete 回调函数
    options.complete = function(res) {
        if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})