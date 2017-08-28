/**
 * Created by 75932 on 2017/3/6.
 */
define(['jquery', 'vue', 'plugins/webuploader/webuploader.min', 'setting'], function ($, Vue, WebUploader, setting) {
    //进行上传文件的模板封装
    var init = function () {
        Vue.component('uploader', {
            template: '<div id="uploader-logo"> ' +
            '<div id="fileList" class="uploader-list"></div> ' +
            '<div id="filePicker">{{text}}</div> ' +
            '</div>',
            props: ['options', "text", "value"], //options为所有
            mounted: function () {
                var vm = this;
                this.options = $.extend({
                    // 选完文件后，是否自动上传。
                    auto: true,
                    // 文件接收服务端。
                    server: "http://2betop.net/fileupload.php",
                    // 选择文件的按钮。可选。
                    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                    pick: '#filePicker',
                    // 只允许选择图片文件。
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    },
                    resize: false
                }, this.options || {});
                var uploader = WebUploader.create(this.options);
                uploader.on('fileQueued', function (file) {
                    var $li = $(
                        '<div id="' + file.id + '" class="file-item thumbnail">' +
                        '<img>' +
                        '<div class="info">' + file.name + '</div>' +
                        '</div>'
                        ),
                        $img = $li.find('img');
                    // $list为容器jQuery实例
                    $("#fileList").append($li);
                    // 创建缩略图
                    // 如果为非图片文件，可以不用调用此方法。
                    uploader.makeThumb(file, function (error, src) {
                        if (error) {
                            $img.replaceWith('<span>不能预览</span>');
                            return;
                        }
                        $img.attr('src', src);
                    }, 100, 100);
                });
                uploader.on('uploadProgress', function (file, percentage) {
                    var $li = $('#' + file.id),
                        $percent = $li.find('.progress span');
                    // 避免重复创建
                    if (!$percent.length) {
                        $percent = $('<p class="progress"><span></span></p>')
                            .appendTo($li)
                            .find('span');
                    }
                    $percent.css('width', percentage * 100 + '%');
                });
                // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                uploader.on('uploadSuccess', function (file, data) {
                    $('#' + file.id).addClass('upload-state-done');
                    //上传成功，将文件信息返回
                    vm.$emit("uploaded", data);
                });
                // 文件上传失败，显示上传出错。
                uploader.on('uploadError', function (file) {
                    var $li = $('#' + file.id),
                        $error = $li.find('div.error');

                    // 避免重复创建
                    if (!$error.length) {
                        $error = $('<div class="error"></div>').appendTo($li);
                    }
                    $error.text('上传失败');
                });
                // 完成上传完了，成功或者失败，先删除进度条。
                uploader.on('uploadComplete', function (file) {
                    $('#' + file.id).find('.progress').remove();
                })
            },
            watch: {
                destroyed: function () {
                    $(this.$el).destroy();
                }
            }
        });
        console.log("Uploader控件初始化完成")
    }
    init();
    return {};
});