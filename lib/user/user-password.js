/**
 * Created by 75932 on 2017/3/6.
 */
define(["vue", "vr"], function (Vue, vr) {
    return {
        init: function () {
            window.vm = new Vue({
                el: "#app",
                data: {user: {}},
                mounted: function () {
                    this.$set(this.$data.user, 'id', this.$d.query("id"));
                    console.log(this.$data);
                },
                methods: {
                    save: function () {
                        var _self = this;
                        var layer_i = this.$layer.load();
                        this.$layer.tip('Reset password success', {
                            callback: function () {
                                //提示信息回调函数
                                setTimeout(function () {
                                    _self.$layer.close(layer_i);
                                    _self.cancel();
                                }, 1000)
                            }
                        });
                    },
                    cancel: function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    }
                }
            });
        }
    }
});