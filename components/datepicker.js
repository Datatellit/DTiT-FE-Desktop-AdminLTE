define(['jquery', 'vue'], function ($, Vue) {
    var init = function () {
        Vue.component('datepicker', {
            template: ' <span><label class="sr-only" for="datepicker">Datepicker</label>' +
            '<div class="input-group date"><div class="input-group-addon" v-if="noIcon==1"><i class="fa fa-calendar"></i></div>' +
            '<input :placeholder="!placeholder?\'Please an date\':placeholder" class="form-control" type="text" /></div></span>',
            props: ['options', 'value', 'placeholder', 'myId', "noIcon", "dateFormat"],
            mounted: function () {
                var vm = this;
                var $datePicker = $(this.$el).find("input");
                console.log(vm.placeholder);
                var minView = 2, startView = 2;
                if (vm.dateFormat) {
                    if (vm.dateFormat.indexOf("yyyy") > -1 && vm.dateFormat.indexOf("hh") > -1)
                        minView = 0;
                    else if (vm.dateFormat.indexOf("hh") > -1)
                        startView = 0, minView = 0;
                }
                var opt = $.extend({
                    autoclose: true,
                    forceParse: true,
                    todayBtn: true,
                    startView: startView,
                    minView: minView,
                    todayHighlight: true,
                    format: vm.dateFormat || "yyyy-mm-dd"
                }, this.options || {});
                $datePicker.datetimepicker(opt).on('changeDate', function (ev) {
                    vm.$emit('change', $datePicker.val(), vm.myId);
                });
                if (this.value)
                    $datePicker.datetimepicker('update', new Date(this.value));
            },
            watch: {
                value: function (value) {
                    var $datePicker = $(this.$el).find("input");
                    $datePicker.datetimepicker("update", new Date(value));
                },
                options: function (options) {
                    var $datePicker = $(this.$el).find("input");
                    $datePicker.datetimepicker(options);
                }
            },
            destroyed: function () {
                var $datePicker = $(this.$el).find("input");
                $datePicker.off().datetimepicker('destroy');
            }
        });
        console.log("datepicker控件初始化完成")
    };
    init();
    return {}
});