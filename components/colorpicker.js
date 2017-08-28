/**
 * Created by 75932 on 2017/3/9.
 */
define(['jquery', 'vue'], function ($, Vue) {
    var init = function () {
        Vue.component('colorpicker', {
            template: ' <div class="input-group my-colorpicker2 colorpicker-element">\
                <input type="text" class="form-control">\
                <div class="input-group-addon">\
                <i></i>\
                </div>\
                </div>',
            props: ['options', 'value', 'myId'],
            mounted: function () {
                var vm = this;
                var $colorpicker = $(this.$el);
                var opt = $.extend({
                    format: "hex"
                }, this.options || {});
                $colorpicker.colorpicker(opt).on('changeColor', function (ev) {
                    vm.$emit('change', $colorpicker.data('colorpicker').color.toRGB(), vm.myId);
                });
                $colorpicker.colorpicker('setValue', this.value);
            },
            watch: {
                value: function (value) {
                    $(this.$el).colorpicker('setValue', value);
                },
                options: function (options) {
                    $(this.$el).colorpicker(options);
                }
            },
            destroyed: function () {
                $(this.$el).off().colorpicker('destroy')
            }
        });
        console.log("colorpicker控件初始化完成")
    }
    init();
    return {}
});