/**
 * Created by 75932 on 2017/5/4.
 */
define(['vue'], function (Vue) {
    var init = function () {
        Vue.component('order', {
            template: '<span class="pull-right" style="width: 20px" @click="orderFunc">\
                &nbsp;\
                <i class="fa fa-sort" role="button" v-show="order==\'\'"></i>\
                <i class="fa fa-sort-amount-asc"  role="button" style="color: #00a2d4" v-show="order==\'asc\'"></i>\
                <i class="fa fa-sort-amount-desc"  role="button" style="color: #00a2d4" v-show="order==\'desc\'"></i>\
                </span>',
            props: ['col', "default"],
            mounted: function () {
                //默认排序
                if (this.default) this.order = this.default;
            },
            methods: {
                orderFunc: function () {
                    if (this.order == "") {
                        this.order = "asc";
                    } else if (this.order == "asc") {
                        this.order = "desc"
                    } else if (this.order == "desc") {
                        this.order = "";
                    }
                    this.$emit('orderby', [this.col, this.order]);
                }
            },
            data: function () {
                return {
                    order: ""
                }
            }
        });
        console.log("order控件初始化完成")
    }
    init();
    return {}
});