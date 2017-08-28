/**
 * Created by Waroom on 2017/3/1.
 */
define(["vue", 'select2', 'paging', 'datepicker', "jquery"], function (Vue, select2, paging, dp, $) {
    return {
        init: function () {
            window.vm = new Vue({
                el: "#app",
                data: {
                    page: {},
                    users: [],
                    where: {},
                    groups: [],
                    columns: ["Sort", "Logo", "Login Name", "User Name", "Email", "In Group Name", "Updated Time", "Operate"]
                },
                mounted: function () {
                    //初始化分页信息
                    this.$set(this.$data, "page", this.$setting.page);
                    var _self = this;
                    var layer_i = this.$layer.load();
                    //加载用户组信息
                    this.$http.get("/DTiT-FE-Desktop-AdminLTE/lib/user/groups.json", {params: {open: true}}).then(function (response) {
                        //渲染
                        if (response.body.code == 1) {
                            var array = new Array();
                            for (var i = 0; i < response.body.data.count; i++)
                                array.push({
                                    id: response.body.data.rows[i].id,
                                    text: response.body.data.rows[i].usergroupname
                                })
                            this.$set(this.$data, 'groups', array);
                        }
                        this.$layer.close(layer_i);
                        this.queryData(1);
                    }, function (response) {
                        this.$layer.close(layer_i);
                        this.$layer.tip("Usergroup data api response error!")
                    });
                },
                methods: {
                    queryData: function (index) {
                        //查询 1、重置页码 2、得到总记录数
                        if (index)
                            this.$data.page.currentPage = index;
                        var _self = this;
                        var params = {}
                        params = $.extend(params, _self.page || {});
                        params = $.extend(params, _self.where || {});
                        var layer_i = this.$layer.load();
                        this.$http.get("/DTiT-FE-Desktop-AdminLTE/lib/user/users.json", {params: params}).then(function (response) {
                            //判断返回值
                            if (response.body.code == 1) {
                                this.$set(this.$data, "users", response.body.data.rows || []);
                                this.$data.page.total = response.body.data.count || 0;
                            } else {
                                this.$layer.tip(response.body.msg);
                            }
                            this.$layer.close(layer_i);
                        }, function (response) {
                            this.$layer.close(layer_i);
                            this.$layer.tip("User data api response error!");
                        });
                    },
                    gotoDevice: function (id) {
                        //当前不存在，所以404
                        window.parent.vm.redirectFrame('Controller Information', 'userId=' + id);
                    },
                    resetPassword: function (id) {
                        this.$layer.frame('Reset Password', "user-password.html?id=" + id, {area: ['450px', '340px']});
                    },
                    edit: function (o) {
                        //将其它对象禁用
                        for (var i = 0; i < this.$data.users.length; i++) {
                            this.$set(this.$data.users[i], "edit", 0);
                        }
                        this.$set(o, 'edit', 1);
                    },
                    revert: function (o) {
                        this.$delete(o, 'edit');
                    },
                    remove: function (index, id) {
                        //后台删除该索引对应的对象
                        var _self = this;
                        this.$layer.confirm("Confirm to delete id is " + id + " data?", function () {
                            var layer_i = _self.$layer.load();
                            _self.users.splice(index, 1);
                            //调用删除接口，省略
                            //关闭加载框
                            setTimeout(function () {
                                _self.$layer.close(layer_i);
                            }, 1000)
                        });
                    },
                    save: function (o) {
                        //后台存储o
                        var layer_i = this.$layer.load();
                        var _self = this;
                        this.$delete(o, 'edit');
                        //调用修改接口，省略
                        //关闭加载框
                        setTimeout(function () {
                            _self.$layer.close(layer_i);
                        }, 1000)
                    },
                    add: function () {
                        this.$layer.frame('User Add', 'user-add.html');
                    },
                    //各组件改变事件
                    change: function (value, id, text) {
                        if (id == 'updatedAt')
                            this.$set(this.$data.where, "updatedAt", value);
                        else if (id == 'groupId')
                            this.$set(this.$data.where, "usergroupId", value);
                        else if (id.indexOf("datepickter") > -1)
                            this.$set(this.$data.users[id.split('_')[1]], "updatedAt", value);
                        else if (id.indexOf("groupId_") > -1) {
                            //设置Value
                            this.$set(this.$data.users[id.split('_')[1]], "usergroupId", value);
                            //更新Text
                            if (this.$data.users[id.split('_')[1]].usergroup)
                                this.$set(this.$data.users[id.split('_')[1]].usergroup, "usergroupname", text);
                            else
                                this.$set(this.$data.users[id.split('_')[1]], "usergroup", {usergroupname: text});
                        }
                    },
                    pageChange: function (index) {
                        this.page.currentPage = index;
                        this.queryData(index);
                    }
                }
            });
            console.log('页面初始化完成');
        }
    }
});