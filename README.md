# DTiT-FE-Desktop-AdminLTE

## 框架组成
* UI层
>* [AdminLTE](https://github.com/almasaeed2010/AdminLTE) UI框架
>* [BootStrap3](http://v3.bootcss.com/) AdminLTE基于此
* AMD
>* [require.js](http://requirejs.org/) 处理资源加载与依赖
* 数据处理
>* [Vue](https://cn.vuejs.org/) 处理数据与数据渲染
>* [Vue-Resource](https://github.com/pagekit/vue-resource) 处理数据请求
* 其他第三方包 <strong>主要</strong>
>* [Moment](http://momentjs.cn/) 处理时间日期
>* [WebSocket](https://github.com/socketio/socket.io-client) WebSocket请求
>* [layer](http://layer.layui.com/) modal及dialog
>* [d3&c3](http://c3js.org/) 图表类库
>* [jQuery](http://jquery.com/) AdminLTE依赖

## 目录结构
```
 \---bootstrap      <BootStrap资源目录>
 \---components     <Vue封装后的组件目录>
    \---colorpicker.js     <颜色选择器>
    \---datepicker.js      <日期时间选择控件>
    \---icheck.js      <复选框>
    \---order.js       <表格排序控件>
    \---paging.js      <表格分页控件>
    \---select2.js     <下拉选择框>
    \---slider.js      <滑块控件>
    \---uploader.js    <上传控件>
 \config
    \---config.js   <配置文件>
 +---dist   <AdminLTE生成的资源引用目录>  
 \---lib  <自定义类库或脚本>
    \---module     <项目模块，每个模块一个目录>
        \---frame   <主页>
           +---css      <通用css>
           +---fonts    <字体文件> 
           \---config.js    <require.js的配置文件>
           \main.js     <该模块的路由分配文件>
           \init.js     <首页的脚本>
           \---frame.json   <菜单或其他主页配置，应替换为持久层获取>
           \---vue-extend.js    <Vue对象扩展属性>
 \---pages  <模块页面>
    +---module      <模块，应与lib下的module对应>
 \---plugins  <外部插件>
 \---critical-config.js     <提取主页css的脚本，使用node critical-config.js运行生成> 
 \---favicon.ico    <站点图标>
 \---index_dev.html     <首页开发版，发布版使用node critical-config.js运行生成>
 \---login_dev.html     <登录开发版，发布版使用node critical-config.js运行生成>
```

## 快速开始
### 为了可以快速使用本项目，您应至少了解以下技术
* 基础的前端知识(HTML,CSS,Javascript)
* [Vue](https://cn.vuejs.org/) 当下流行的MVVM框架
* [require.js](http://requirejs.org/) 前端模块化类库
* [BootStrap3](http://v3.bootcss.com/) 前端UI框架

### 快速开始这个项目，您需要了解以下信息
* Vue全局对象([lib/frame/vue-extend.js](https://github.com/Datatellit/DTiT-FE-Desktop-AdminLTE/blob/master/lib/frame/vue-extend.js))
> [```this.$d```](https://github.com/Datatellit/dtit.js) 通用函数类库，如需添加新函数，请提[Issues](https://github.com/Datatellit/dtit.js/issues)   
使用示例：  
```
this.$d.each(arr,function(value,key){
    console.log(key,value)
})
this.$d.setCookie("key","value")
....
```

> ```this.$layer```  弹出页面及提示框  
使用示例：  
```
  var layer_i = this.$layer.load(); //打开加载框
  this.$layer.close(layer_i); //关闭加载框
  this.$layer.tip("User data api response error!");//提示框
  this.$layer.confirm("Confirm to delete id is 3 data?", function () { //询问框
    console.log("confirm");
  });
  this.$layer.frame('User Add', 'user-add.html'); //打开弹出页面，页面标题，页面路径名
  
```
> ```this.$setting```    
```
 this.$setting.router //访问配置文件接口路由
 this.$setting.page //访问默认分页信息
```
> http(s)请求钩子  
用于拦截请求，并进行统一的处理，当前框架中逻辑如下，请根据实际情况进行修改
```
Vue.http.interceptors.push(function (request, next) {
        //如果不需要添加access_token，则需要在请求的params中添加open参数，并赋值为true
        if (request.params && request.params.open) {
            delete request.params.open;
        }
        else {
            //获取cookie中的登录用户信息（请根据实际修改）
            var user = dtit.getCookie("dtit_userinfo");
            //将access_token追加到请求的url后面
            if (user && typeof user == "object") {
                if (request.params)
                    request.params["access_token"] = user.access_token;
                else
                    request.params = {access_token: user.access_token}
            }
            else { //如果没有找到access_token，直接回到登录页（全局权限控制）
                if (self != top) //如果是子页面中发出的请求，则控制顶层返回登录页
                    top.location.href = "/login.html";
                else
                    location.href = "/login.html";
            }
        }
        next(function (response) {
            //对http响应进行拦截，在本人的业务中，响应的code如果是20000~30000区间，则代表access_token存在问题，使用者请按照自己业务需求修改
            if (response.body.code >= 20000 && response.body.code < 30000) {
                //access_Token存在问题，清除登录信息（因为已经存在问题了）
                this.$d.clearCookie("dtit_userinfo");
                if (self != top)
                    top.location.href = "/login.html";
                else
                    location.href = "/login.html";
            }
            //此处也可以对响应的数据进行统一的预处理
            return response;
        })
    });
```

* 其他信息
> 从A页面直接跳转到B页面，并传递参数  
```
 window.parent.vm.redirectFrame('Controller Information', 'userId=' + id); //页面名称（必须是菜单中存在的，此处回去匹配，并打开），传递参数
```
> 子页面访问父页面函数或变量
```
window.parent.vm.xxxx  //xxxx可以data，也可以是methods
```

* 本项目包含的Demo,[在线预览](https://datatellit.github.io/DTiT-FE-Desktop-AdminLTE/index.html)
> Login  登录页  
> Index  首页  
> User List  列表页  
> User Add  新增或编辑页  
> User Reset Password  少量信息修改页  
> Vue Plugins  封装的Vue控件  


## 页面流程 
![页面流程](https://github.com/Datatellit/DTiT-FE-Desktop-AdminLTE/blob/master/dist/img/life.png)

## 注意事项
> 本项目是作为[dtit-cli](https://github.com/Datatellit/dtit-cli)的模板源，所以推荐使用[dtit-cli](https://github.com/Datatellit/dtit-cli)来进行模板框架生成，也可以直接进行download进行使用。  
> 如果项目中遇到问题，您可以给我们提[Issues](https://github.com/Datatellit/DTiT-FE-Desktop-AdminLTE/issues)  
> 为了保证项目的纯净，项目中并没有包含原始AdminLTE的demo，所以基本的样式组件，请按照官方的demo进行使用
[官方demo下载](https://github.com/almasaeed2010/AdminLTE)

## 浏览器支持
AdminLTE supports the following browsers:

> IE9+  
> Edge (latest)  
> Firefox (latest)  
> Safari (latest)  
> Chrome (latest)  
> Opera (latest)

## FAQ
* 为什么项目没法直接浏览
> 因为使用了require进行模块加载，存在路径问题，所以不要以文件的方式来访问，要用Web Server挂载
* 为什么在WebStorm中直接浏览也不行
> 因为WebStorm默认浏览路径，是包含项目名称的（生产环境不可能出现），所以请使用Web Server挂载，并配置WebStorm的Deployment配置，参见下图  
![WebStorm配置](https://github.com/Datatellit/DTiT-FE-Desktop-AdminLTE/blob/master/dist/img/webstorm.png)
* 我要添加一个新的模块应该怎么做
> 在lib目录下添加模块目录，并建立xxx-main.js模块路由文件，用于对模块下不同页面进行资源分配，在pages目录下新建同样的模块，并引用require，将xxx-main设置为配置文件，然后继续在lib下面建立各页面的脚本，进行Vue数据初始化，具体参考项目内的user模块
* 数据获取应该怎么写
> 数据获取使用的是Vue官方的包vue-resource(现在官方已不推荐，推荐使用的是axios)，具体的使用细则，参见[Vue-Resource](https://github.com/pagekit/vue-resource)
* 为什么数据改变了，但是页面没有正确显示
> 查看你的赋值方式，如果是对象赋值，应使用```this.$set```进行赋值，具体以[Vue](https://cn.vuejs.org/)官方文档为准
* 为什么我打开的页面是一片空白
> 打开浏览器的Console窗口，查看是否有报错，一般页面全部空白，是Vue绑定存在错误，或语法存在错误，请仔细查找，并阅读[Vue](https://cn.vuejs.org/)官方文档
* 我有一个通用函数应该写在哪里
> 在lib目录的frame下存在一个vue-extend文件，该文件及用于对vue实体进行扩展，如果有通用的函数，或者插件库需要全局调用，可以使用Vue.prototype.$xxx来挂载，使用时只需要this.$xxx就可以调用
* 为什么项目下会有一个index_dev.html和login_dev.html文件
> 由于使用require.js进行模块化管理，导致所有页面的css都是由require注入到页面，css的注入依赖于require的加载，那么在网络不佳的情况下，就会出现页面排版的错乱，由于登录页与主页是第一个加载的页面，为了避免这种情况出现，使用了[critical](https://github.com/addyosmani/critical)进行css提取，这样生成的login.html和index.html就会包含关键样式的css，从而解决页面错乱问题


苏州数言信息技术有限公司-前端积累-PC端框架-AdminLTE

