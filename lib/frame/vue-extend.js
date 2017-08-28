/**
 * Created by Waroom on 2017/3/4.
 * 所有通用扩展属性或函数
 */
define(['vue', 'vr', 'jquery', 'layer', 'setting', 'dtit'], function (Vue, vr, $, layer, setting, dtit) {
    Vue.use(vr);
    Vue.http.interceptors.push(function (request, next) {
        //Access_Token
        if (request.params && request.params.open) {
            delete request.params.open;
        }
        else {
            var user = dtit.getCookie("dtit_userinfo");
            if (user && typeof user == "object") {
                if (request.params)
                    request.params["access_token"] = user.access_token;
                else
                    request.params = {access_token: user.access_token}
            }
            else {
                if (self != top)
                    top.location.href = "/login.html";
                else
                    location.href = "/login.html";
            }
        }
        next(function (response) {
            if (response.body.code >= 20000 && response.body.code < 30000) {
                //Access_Token存在问题，直接回登录页
                this.$d.clearCookie("dtit_userinfo");
                if (self != top)
                    top.location.href = "/login.html";
                else
                    location.href = "/login.html";
            }
            return response;
        })
    });
    layer.config({
        path: '/plugins/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    //初始化
    var init = function () {
        Vue.prototype.$layer = {
            msg: function (title, msg, callback) { //弹出提示层，msg内容，title头部信息，callback为关闭后调用的函数，具体参考layer官网
                return layer.alert(msg, {title: title}, function (index, layero) {
                    layer.close(index);
                    callback && callback();
                });
            },
            page: function (title, el, btns) {
                layer.open({
                    type: 1,
                    title: title,
                    content: $(el),
                    btn: btns,
                    area: ["300px", "200px"]
                }, function (index) {
                    arguments[3] && arguments[3]();
                    layer.close(index);
                }, function (index) {
                    arguments[4] && arguments[4]();
                    layer.close(index);
                })
            },
            tip: function (msg, opt) { //弹出提示，msg内容，opt :timeout为自动关闭时间，默认为2S，callback为回调，具体参考layer官网
                layer.msg(msg, {time: opt && opt.timeout ? opt.timeout : 1500}, function () {
                    opt && opt.callback && opt.callback();
                });
            },
            load: function () { //加载提示
                return layer.load(2, {shade: .1});
            },
            close: function (index) { //关闭指定层
                layer.close(index);
            },
            closeAll: function (type) {//关闭所有层
                if (type)
                    layer.closeAll(type)
                else
                    layer.closeAll();
            },
            confirm: function (msg, callback) {
                layer.confirm(msg, {icon: 3, title: "Confirm info"}, function (index) {
                    layer.close(index);
                    callback && callback();
                });
            },
            frame: function (title, url, options) { //弹出页面，title为标题，url为页面参数，options为任何layer支持的选项参数，具体参考layer官网
                options = $.extend(
                    {
                        type: 2,
                        title: [title, "font-size:20px;"],
                        offset: '100px',
                        maxmin: true,
                        shadeClose: false,
                        content: url,
                        area: ['60%', '60%'],
                        shade: 0.5,
                        resize: true
                    }, options || {});
                var index = layer.open(options);
                layer.iframeAuto(index);
                if (options && options.full)
                    layer.full(index);
                return index;
            }
        }
        Vue.prototype.$d = dtit;
        Vue.filter('formatDate', function (date) {
            return dtit.dateFormat(date, "yyyy-MM-dd hh:mm:ss");
        });
        Vue.prototype.$setting = setting;
    }
    init();
    return {}
})