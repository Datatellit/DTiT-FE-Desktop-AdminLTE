/**
 * Created by Waroom on 2017/3/5.
 */
define(['jquery', 'vue'], function ($, Vue) {
    var init = function () {
        Vue.component('icheck', {
            template: '<label>\
                <input :type="type" class="flat-red form-control">\
                {{text}}\
                </label>',
            props: ['myId', 'text', 'type', 'key', 'value', "color"],
            mounted: function () {
                var vm = this;
                var $iCheck = $(this.$el);
                $iCheck.find(":checkbox").attr("value", this.key);
                $iCheck.find(":checkbox").attr("name", this.myId);
                if (this.type == "checkbox")
                    $iCheck.find(":checkbox").prop('checked', this.value);
                else
                    $iCheck.find("[value='" + this.value + "']").prop("checked", true);
                $iCheck.iCheck({
                    checkboxClass: 'icheckbox_flat-' + (this.color || "blue"),
                    radioClass: 'iradio_flat-' + (this.color || "blue")
                });
                $iCheck.on('ifChanged', function (ev) {
                    vm.$emit('change', true, vm.myId);
                });
            },
            watch: {
                value: function (value) {
                    //$(this.$el).datepicker("update", value);
                }
            },
            destroyed: function () {
                $(this.$el).off().iCheck('destroy');
            }
        });
        console.log("icheck控件初始化完成")
    }
    init();
    return {}
});
