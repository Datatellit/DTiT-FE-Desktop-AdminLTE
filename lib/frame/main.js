/**
 * Created by Waroom on 2017/3/3.
 * Frame Main
 */
requirejs(["config"], function () {
    requirejs(['app'], function () {
        requirejs(['lib/frame/init']);
    });
});
