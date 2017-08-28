define(['jquery', 'vue'], function ($, Vue) {
    //进行Select2的模板封装
    var init = function () {
        Vue.component('select2', {
            template: '<select style="width: 100%" :id="myId">\
        <slot></slot>\
        </select>',
            props: ['options', 'value', 'multiple', 'myId', "must", "text", "disabled"],
            mounted: function () {
                this.init();
            },
            methods: {
                init: function () {
                    var vm = this;
                    var $select = $(this.$el);
                    var allow = this.must == "false" || this.must == false ? true : false;
                    $select.off();
                    $select.prop('multiple', this.multiple == "true" || this.multiple == true ? true : false).select2({
                        data: this.options,
                        allowClear: allow,
                        disabled: this.disabled == "true" || this.disabled == true ? true : false,
                        placeholder: vm.text || "Please select item",
                    }).on('change', function () {
                        var value = $select.val();
                        if (value === 'No Limit') {
                            value = ''
                        }
                        vm.$emit('change', value, vm.myId, $select.find("option:selected").text());
                    });
                    $select.val(this.value).trigger('change.select2')
                }
            },
            watch: {
                value: function (value) {
                    $(this.$el).val(value).trigger('change.select2')
                },
                options: function (options) {
                    this.init();
                    //$(this.$el).select2({data: options})
                }
            },
            destroyed: function () {
                $(this.$el).off().select2('destroy')
            }
        });
        console.log("Select2控件初始化完成")
    }
    init();
    return {};
});