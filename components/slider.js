/**
 * Created by 75932 on 2017/3/9.
 */
define(['jquery', 'vue'], function ($, Vue) {
    var init = function () {
        Vue.component('slider', {
            template: ' <input type="text" class="slider form-control">',
            props: ['options', 'value', 'myId', 'color', 'min', 'max', 'step', 'orientation'],
            mounted: function () {
                var vm = this;
                var $slider = $(this.$el);
                if (this.options && this.options.color)
                    this.options.id = this.options.color;
                var opt = $.extend({
                    min: this.min || 0,
                    max: this.max || 100,
                    step: this.step || 1,
                    orientation: this.orientation || "horizontal",
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