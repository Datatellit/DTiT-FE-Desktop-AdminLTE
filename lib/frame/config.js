/**
 * Created by Waroom on 2017/3/4.
 * All Page Requirejs Config
 */
requirejs.config({
    baseUrl: '/', //正式环境应该配置为/根目录，但是由于Webstrom是从项目文件夹开始算路径的，所以加这个
    map: {
        '*': {
            'css': 'dist/js/css.min' // or whatever the path to require-css is
        }
    },
    paths: {
        jquery: "plugins/jQuery/jquery-2.2.3.min",
        bs: "bootstrap/js/bootstrap.min",
        app: "dist/js/app.min",
        vue: "plugins/vue/dist/vue.min",
        vr: "plugins/vue/dist/vue-resource.min",
        require: "plugins/require/require",
        select2: "components/select2",
        datepicker: "components/datepicker",
        layer: "plugins/layer/layer",
        paging: "components/paging",
        upload: "components/uploader",
        list: "dist/js/app.min",
        moment: "plugins/moment/moment",
        icheck: "plugins/iCheck/icheck.min",
        colorpicker: "components/colorpicker",
        order: "components/order",
        slider: "components/slider",
        setting: "config/config",
        dtit: "plugins/dtit/dtit",
        c3: "plugins/d3/c3.min",
        d3: "plugins/d3/d3.min",
        socket: "plugins/socket/socket.io"
    },
    shim: {
        'jquery': ['setting'],
        'socket': {exports: 'io'},
        'app': ['css!lib/frame/css/checkbox.css', 'css!bootstrap/css/bootstrap.min', 'bs', 'jquery',
            'css!dist/css/AdminLTE.min.css',
            'css!dist/css/skins/skin-blue.min.css',
            'css!lib/frame/css/base.css', 'lib/frame/vue-extend'
        ],
        'list': ['css!lib/frame/css/checkbox.css', 'css!bootstrap/css/bootstrap.min', 'bs', 'jquery',
            'css!plugins/datatables/dataTables.bootstrap.css',
            'css!dist/css/AdminLTE.min.css',
            'css!dist/css/skins/_all-skins.min.css',
            'css!lib/frame/css/list.css', 'lib/frame/vue-extend'
        ],
        'select2': ['jquery',
            'plugins/select2/select2.full',
            'css!plugins/select2/select2.min.css'
        ],
        'colorpicker': ['jquery', 'plugins/colorpicker/bootstrap-colorpicker', 'css!plugins/colorpicker/bootstrap-colorpicker.min.css'],
        'slider': ['jquery', 'plugins/bootstrap-slider/bootstrap-slider', 'css!plugins/bootstrap-slider/slider.css'],
        'datepicker': ['jquery', 'plugins/datetimepicker/js/bootstrap-datetimepicker.min', 'css!plugins/datetimepicker/css/bootstrap-datetimepicker.min'],
        'bs': ['jquery', 'css!bootstrap/css/bootstrap.min', 'css!lib/frame/css/font-awesome.min.css', 'css!lib/frame/css/ionicons.min.css'],
        'layer': ['jquery'],
        'icheck': ['jquery', 'css!plugins/iCheck/square/blue.css', 'bs', 'css!lib/frame/css/list.css', 'lib/frame/vue-extend'],
        'upload': ['jquery', 'plugins/webuploader/webuploader.min', 'css!plugins/webuploader/webuploader.css'],
        'deviceRing': ['plugins/steelSeries/steelseries-min'],
        'scenarioNode': ['plugins/steelSeries/steelseries-min'],
        'scenarioAdd': ['plugins/steelSeries/steelseries-min'],
        'c3': ['css!plugins/d3/c3.min.css']
    }
});
