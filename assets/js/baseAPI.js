//注意每次使用$.ajax()时会调用aiaxPrefileter函数
//在这个函数中。可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax请求之前，同意拼接请求额的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
})