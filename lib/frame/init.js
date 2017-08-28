/**
 * Created by Waroom on 2017/2/27.
 * Load Frame Data
 */
define(['jquery', 'vr', 'vue'], function ($, vr, Vue) {
    var init = function () {
        window.vm = new Vue({
            el: "#app",
            data: {user: {username: 'test'}, menu: [], frame: {}},
            mounted: function () {
                //加载菜单及默认页
                this.$http.get("./lib/frame/frame.json").then(function (response) {
                    this.$set(this.$data, "frame", response.body.frame);
                    this.$set(this.$data, "menu", response.body.menu);
                    var user = this.$d.getCookie("dtit_userinfo");
                    if (user) {
                        //渲染用户信息
                        this.$set(this.$data, 'user', user);
                    } else {
                        location.href = "/login.html";
                    }
                }, function (response) {
                    console.log("---VUE挂载失败，数据获取失败  ----");
                });
                console.log("---VUE挂载完成----");
            },
            methods: {
                openFrame: function (v, navigate) {
                    //加载并设置页面（添加随机数）
                    var internal = JSON.parse(JSON.stringify(v));
                    var random = parseInt(Math.random() * 1000000000);
                    if (internal.href.indexOf('?') > 0)
                        internal.href += ("&random=" + random);
                    else
                        internal.href += ("?random=" + random);
                    this.$set(this.$data, "frame", internal);
                    this.$set(this.$data.frame, "navigate", navigate);
                },
                loadSuccess: function () {
                    this.$set(this.$data.frame, "isLoad", true);
                },
                redirectFrame: function (name, param) {
                    //找到要打开的菜单页面
                    var navigate = name;
                    var _self = this;
                    var find = 0;
                    var frame;
                    //查找子对象数组
                    var getChild = function (v, navigate) {
                        var json = {navigate: navigate};
                        for (var i = 0; i < v.length; i++) {
                            if (!v[i].href) {
                                json = getChild(v[i].child, v[i].name + " > " + navigate);
                            } else if (v[i].name == name) {
                                find = 1;
                                json.frame = v[i];
                                break;
                            }
                        }
                        return json;
                    }
                    //查找一级对象数组，由于结构不同，一级和其它子级分开循环
                    for (var j = 0; j < this.$data.menu.length; j++) {
                        if (!this.$data.menu[j].href) {
                            var json = getChild(this.$data.menu[j].child, navigate);
                            //找到包含的子级
                            if (find) {
                                frame = JSON.parse(JSON.stringify(json.frame));
                                navigate = this.$data.menu[j].name + " > " + json.navigate;
                                break;
                            }
                        } else if (this.$data.menu[j].name == name) {
                            frame = JSON.parse(JSON.stringify(this.$data.menu[j]));
                            break;
                        }
                    }
                    //如果找到该菜单处理
                    if (frame) {
                        if (param)
                            frame.href += "?" + param;
                        this.openFrame(frame, navigate);
                    }
                },
                logout: function () {
                    //删除用户信息
                    this.$d.clearCookie("dtit_userinfo");
                    //回到登录页
                    location.href = "/login.html";
                }
            }
        })

    }
    init();
    return {}
});