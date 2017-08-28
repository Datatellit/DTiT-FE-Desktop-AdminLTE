define(['vue'], function (Vue) {
    var init = function () {
        Vue.component('paging', {
            template: '<div style="display: flex;flex-direction: row;justify-content: space-between;padding: 0px 10px 0px 10px"><div><span>Total Record:{{total}},&nbsp;&nbsp;Current Index:{{index}},&nbsp;&nbsp;Total Page:{{tp}}&nbsp;&nbsp;</span></div><div><nav aria-label="Page navigation">\
        <ul class="pagination" style="margin: 0">\
        <li @click="previous" :class="{\'disabled\':isFirst}">\
        <a href="#" aria-label="Previous">\
        <span aria-hidden="true">&laquo;</span>\
    </a>\
    </li>\
    <li v-for="n in list" v-bind:class="n == index?\'active\':\'\'" @click="pageChange(n)"><a href="#">{{n}}</a></li>\
        <li @click="next"  :class="{\'disabled\':isLast}">\
        <a href="#" aria-label="Next">\
        <span aria-hidden="true">&raquo;</span>\
    </a>\
    </li>\
    </ul>\
    </nav></div></div>',
            props: ["total", "index", "number"],
            mounted: function () {
                this.genList();
            },
            methods: {
                previous: function () {
                    if (!this.isFirst)
                        this.$emit('change', this.index - 1);
                },
                next: function () {
                    if (!this.isLast)
                        this.$emit('change', this.index + 1);
                },
                pageChange: function (n) {
                    this.$emit('change', n);
                },
                genList: function () {
                    this.$set(this.$data, 'list', []);
                    for (var i = this.tp - this.index >= 6 ? this.index : this.tp - 6 < 1 ? 1 : this.tp - 5; i <= this.tp && this.list.length < 6; i++) {
                        this.list.push(i);
                    }
                }
            },
            data: function () {
                return {list: []}
            },
            computed: {
                tp: function () {
                    return this.total % this.number == 0 ? this.total / this.number : parseInt(this.total / this.number) + 1;
                },
                isFirst: function () {
                    return this.index == 1 || this.tp == 1 ? true : false;
                },
                isLast: function () {
                    return this.index == this.tp || this.tp == 1 ? true : false;
                }
            },
            watch: {
                index: function (index) {
                    this.genList();
                },
                total: function (total) {
                    this.genList();
                }
            }
        });
        console.log('分页控件初始化完成')
    }
    init();
    return {}
});
