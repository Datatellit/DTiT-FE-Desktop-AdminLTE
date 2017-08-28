/**
 * Created by Waroom on 2017/3/3.
 */
define(["vue", "vr", "jquery", 'select2', 'upload'], function (Vue, vr, $, select2, upload) {
    return {
        init: function () {
            window.vm = new Vue({
                el: "#app",
                data: {
                    groups: [],
                    user: {image: "https://cn.vuejs.org/images/logo.png"}
                },
                mounted: function () {
                    var _self = this;
                    //加载用户组信息
                    this.$http.get("/DTiT-FE-Desktop-AdminLTE/lib/user/groups.json", {
                        params: {
                            order: [["updatedAt", "desc"]]
                        }
                    }).then(function (response) {
                        //渲染
                        if (response.body.code == 1) {
                            for (var i = 0; i < response.body.data.count; i++)
                                _self.groups.push({
                                    id: response.body.data.rows[i].id,
                                    text: response.body.data.rows[i].usergroupname
                                });
                        }
                    }, function (response) {
                        this.$layer.tip("Usergroup data api response error!")
                    });
                },
                methods: {
                    change: function (value) {
                        this.$set(this.$data.user, "usergroupId", value);
                    },
                    save: function () {
                        var _self = this;
                        var layer_i = this.$layer.load();
                        setTimeout(function () {
                            _self.$layer.close(layer_i);
                        }, 1000);
                    },
                    cancel: function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    },
                    uploaded: function (file) {
                        //图片上传
                        this.user.image = file.filePath;
                    }
                }
            })
        }
    }
});