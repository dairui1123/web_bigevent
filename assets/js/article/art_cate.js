$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initCateList()

    function initCateList() {
        $.ajax({
            type: "GET",
            url: "/my/cate/list",
            success: function(res) {
                if (res.code !== 0) {
                    return console.log('获取文章分类列表失败');
                }
                var htmlStr = template('tpl-cate', res);
                $('tbody').html(htmlStr)
            }
        });
    }
    var indexAdd = null
    $('#btnAdd').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                title: '添加文章分类',
                area: ['500px', '250px'],
                content: $('#addCate').html()
            })
        })
        // 通过代理方式绑定提交事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "/my/cate/add",
                data: $(this).serialize(),

                success: function(res) {
                    if (res.code !== 0) {
                        return layer.msg('新增分类失败')
                    }
                    initCateList()
                    layer.msg('新增分类成功')
                    layer.close(indexAdd)
                }
            });
        })
        // 编辑按钮绑定事件
    var indexEdit = null;
    $('tbody').on('click', '#btn-edit', function() {
        indexEdit = layer.open({
                type: 1,
                title: '修改文章分类',
                area: ['500px', '250px'],
                content: $('#editCate').html()
            })
            // 发起请求获取对应分类的数据
        var id = $(this).attr('data-id');
        $.ajax({
            type: "GET",
            url: "/my/cate/info?id=" + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        });
    })

    //确定修改1
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'put',
            url: '/my/cate/info',
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('修改分类失败！')
                }
                initCateList();
                layer.msg('修改分类成功')
                    //根据索引，关闭弹出层
                layer.close(indexEdit)
            }
        })
    })



    //通过代理的形式，为删除按钮绑定点击事件：
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 2, title: '提示' }, function(index) {
            $.ajax({
                method: 'delete',
                url: '/my/cate/del?id=' + id,
                //   www.liulongbin.top:3008/my/cate/del?id=1823
                success: function(res) {
                    if (res.code !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
})