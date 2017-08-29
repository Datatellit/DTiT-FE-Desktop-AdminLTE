/**
 * Created by Waroom on 2017/3/1.
 */
define(["vue", 'select2', 'paging', 'datepicker', "colorpicker", "order", "slider", "upload"], function (Vue) {
    return {
        init: function () {
            window.vm = new Vue({
                el: "#app",
                data: {
                    colorOptions: {
                        format: "rgb"
                    },
                    sliderOpts: {
                        min: -100,
                        max: 100,
                        step: 2,
                        color: "green",
                        orientation: "vertical"
                    },
                    dateTimePicker: "",
                    datePicker: "",
                    timePicker: "",
                    date: "",
                    index: "",
                    select: 3,
                    color: "#ffffff",
                    slider: 50,
                    uploader: "",
                    check: true,
                    selects: [{id: 1, text: "开发组"}, {id: 2, text: "测试组"}, {id: 3, text: "硬件组"}]
                },
                mounted: function () {
                    //初始化分页信息

                },
                computed: {
                    bgColor: function () {
                        return {backgroundColor: this.color}
                    }
                },
                methods: {
                    //各组件改变事件
                    change: function (value, id, text) {
                        if (id.indexOf("color") > -1) {
                            console.log(value)
                            this.color = value.toHex();
                        }
                        else
                            window.alert(value)
                    },
                    setCurTime: function () {
                        this.dateTimePicker = this.$d.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss")
                    },
                    pageChange: function (index) {
                        this.page.currentPage = index;
                        this.queryData(index);
                    },
                    uploaded: function (obj) {
                        console.log(obj)
                    },
                    gotoUser: function () {
                        window.parent.vm.redirectFrame('User List', 'userId=123');
                    }
                }
            });
            console.log('页面初始化完成');
        }
    }
});