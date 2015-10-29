define(['$', '_', 'b', 'v','i', getViewPath('start')], function ($, _, b, v,i, html) {
    var View = b.Class(v.PageView, {
        _propertys_: function () {
            this.template = html;
            this.url = ''; //获取首页文章
            this.is=null;
        },
        init: function (superInit, request, interface) {
            superInit(request, interface);
           
        },
        createHtml: function () {
            return this.template;
        },
        attrs: {
            'data-id': 'start',
            className: 'page start-port'
        },
        events: {
        },
        onCreate: function () {
            
        },
        //dom创建后数据加载时执行，用于加载后执行我们的逻辑
        onLoad: function () {
            
            $.get(this.url, function (data) {
                var s = '';
            });
        },
        //dom创建后，未显示
        onShow: function () {
            this.is = new IScroll('#start-port-content', { mouseWheel: true, tap: true,click: true});
        },
        //dom隐藏前
        onHide: function () {
            
        }
    });

    return View;
});