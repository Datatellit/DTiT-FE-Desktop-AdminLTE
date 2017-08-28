/**
 * 项目配置文件.
 */
define("setting", function () {
    var host = "http://xxxxx:xxxx/";
    return {
        //接口路由信息
        routers: {
            xxx: "xxxx"
        },
        //默认分页信息
        page: {
            currentPage: 1,
            total: 0,
            countPerPage: 10,
            order: [["updatedAt", "desc"]]
        }
    }
});
