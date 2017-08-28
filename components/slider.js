/**
 * Created by 75932 on 2017/3/9.
 */
define(['jquery', 'vue'], function ($, Vue) {
    var init = function () {
        Vue.component('slider', {
            template: ' <input type="text" class="slider form-control">',
            props: ['options', 'value', 'myId', 'color'],
            mounted: function () {
                var vm = this;
                var $slider = $(this.$el);
                var opt = $.extend({
                    min: 0,
                    max: 100,
                    step: 1,
                    orientation: "horizontal",
                    value: this.value || 0,
                    selection: "before",
                    id: this.color || ""
                }, this.options || {});
                $slider.slider(opt).on('change', function (obj) {
                    vm.$emit('change', obj.value.newValue, vm.myId);
                });
            },
            watch: {
                value: function (value) {
                    $(this.$el).slider("setValue", value);
                },
                options: function (options) {
                    $(this.$el).slider(options);
                }
            },
            destroyed: function () {
                $(this.$el).off().slider('destroy')
            }
        });
        console.log("slider控件初始化完成")
    }
    init();
    return {}
});