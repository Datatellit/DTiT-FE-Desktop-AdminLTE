/**
 * Created by 75932 on 2017/3/4.
 */
requirejs(["../frame/config"], function (config) {
    var page = window.location.pathname;
    if (page.indexOf('user-add.html') > -1) {
        requirejs(['list', 'lib/user/user-edit'], function (app, ue) {
            ue.init();
        });
    } else if (page.indexOf('user.html') > -1) {
        requirejs(['list', 'lib/user/user-list'], function (app, ul) {
            ul.init();
        });
    } else if (page.indexOf('user-password.html') > -1) {
        requirejs(['list', 'lib/user/user-password'], function (app, up) {
            up.init();
        });
    }
});
