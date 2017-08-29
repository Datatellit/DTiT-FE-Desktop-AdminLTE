/*
* plugins demo
* */
requirejs(["../frame/config"], function (config) {
    var page = window.location.pathname;
    if (page.indexOf('plugins.html') > -1) {
        requirejs(['list', 'lib/vue-plugins/plugins'], function (app, ue) {
            ue.init();
        });
    }
});