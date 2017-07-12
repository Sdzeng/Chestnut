/**
 * akapp.controller Module
 *
 * 用于存放参数
 */
'use strict';

angular.module('akapp.controller', []).controller('variablesCtrl', variablesCtrl);

variablesCtrl.$injector = ['$scope', '$filter', '$timeout', '$cookies', '$cookieStore', '$sessionStorage', '$templateCache', 'ngDialog', 'gpservice', 'ASSETS'];

function variablesCtrl($scope, $filter, $timeout, $cookies, $cookieStore, $sessionStorage, $templateCache, ngDialog, gpservice, ASSETS) {

    // 缓存数据变量
    $scope.$storage = $sessionStorage.$default();
    // 提示信息变量
    $scope.msg = {};
    $scope.msg.empty = "暂无数据"; // 无数据的文字提示
    $scope.msg.loading = "正在加载"; // 加载中的文字提示
    // 数据变量
    $scope.mc = {};
    // 状态变量
    $scope.status = {};
    $scope.status.active = true; // 激活tab的状态标识
    // 页面查询条件变量
    $scope.search = {};
    // 暂存变量
    $scope.temp = {};
    // 分页变量
    $scope.page = {
        itemPerPage: [20, 50, 100], // 每页可以切换的显示数
        maxSize: 5, // 最多显示的页码数
        currentPage: 1, // 当前页码
        changePage: '', // 跳转的页面
        filmNotRelativePageNo: 1, // 影片手工关联列表-当前页
    };
    $scope.$storage.currentPageItem = 20; // 默认每页显示20条数据
    // 方法状态变量
    // 为了在调用方法前就存在初始化状态，需要直接在此变量集合中定义方法的变量
    $scope.toggle = {
        getSidebar: new Toggle(),                                           // 获取侧边栏
        
        // 区域模块
        getJustProvince: new Toggle(),              // 获取省
        getJustCity: new Toggle(),                  // 城市，不包括城区
        getJustDistrict: new Toggle(),              // 城区，不包括城市
        getRegionList: new Toggle(),                // 区域列表，包括城市&城区
        addRegion: new Toggle(),
        editRegion: new Toggle(),
        deleteRegion: new Toggle(),
        // 影院模块
        getCinemaList: new Toggle(),                // 影院列表
        getCinemaSelectedByCity: new Toggle(),      // 根据城市获取影院
        addCinema: new Toggle(), 
        editCinema: new Toggle(), 
        deleteCinema: new Toggle(), 
        editCinemaId: new Toggle(),                 // 更改影院编码
        // 影院组模块
        getCinemagroupName: new Toggle(),               // 获取全部影院组名称
        getCinemagroupListMC: new Toggle(),             //  获取MC影院组列表
        getCinemagroupListBD: new Toggle(),             //  获取BD影院组列表
        getCinemagroupChildwithcinema: new Toggle(),    //编辑&详情时，查看下属影院，弹窗形式展示
        addCinemagroup: new Toggle(),                   // 新建一级影院组
        addCinemagroupChild: new Toggle(),              //添加下属影院组
        delCinemagroupChild: new Toggle(),              //删除下属影院组，编辑页面里删除
        delCinemagroup: new Toggle(),                   // 删除影院组，列表里删除
        addCinemagroupCinema: new Toggle(),             // 编辑影院组时，添加影院
        delCinemagroupCinema: new Toggle(),             //删除影院组的影院
        editCinemagroup: new Toggle(),                  //编辑影院组
        getCinemagroupNogroupcinema: new Toggle(),      // 获取一级影院组，可添加的影院
        // 影片模块
        getFilmList: new Toggle(),                      // 影片列表
        getFilmNamelist: new Toggle(),                  // 获取所有影片名称
        addFilm: new Toggle(), 
        editFilm: new Toggle(), 
        deleteFilm: new Toggle(), 
        getFilmListNotRelative: new Toggle(),           // 手工关联-获取影片列表
        getFilmListRelative: new Toggle(),              // 查看关联关系-获取影片列表
        relateFilm: new Toggle(),                       // 保存关联
        unboundFilm: new Toggle(),                       // 解除关联

        // 租户模块
        getAllLeaseList: new Toggle(),                  //   获取所有租户
        getLeaseList: new Toggle(),                     // 获取租户列表
        addLease: new Toggle(),
        editLease: new Toggle(),

        // basedata渠道模块
        getBaseChannelList: new Toggle(),               // 渠道列表
        getChannelNamelist: new Toggle(),               // 渠道名称
        addChannel: new Toggle(),
        editChannel: new Toggle(),
        deleteChannel: new Toggle(),
        getChannelEditInfo: new Toggle(),               //   获取即将要编辑的渠道信息

        // 系统参数模块
        getSysparamList: new Toggle(),                  // 获取系统参数列表
        addSysparam: new Toggle(),                      
        editSysparam: new Toggle(),  
        deleteSysparam: new Toggle(),  

        // 支付政策设置
        getPaymentList: new Toggle(), 
        addPayment: new Toggle(), 
        editPayment: new Toggle(), 
        deletePayment: new Toggle(), 

        // 影院渠道支付政策
        getCinemaPaymentList: new Toggle(),
        editCinemaPayment: new Toggle(),
        addCinemaPayment: new Toggle(),
        deleteCinemaPayment: new Toggle(),
        getCinemaPaymentCinemas: new Toggle(),          //  获取可添加的影院
        getChannelByCinemas: new Toggle(),               //  根据影院获取渠道
        getAllPaymentList: new Toggle(),                 //  支付工具
        getCinemaPaymentProfit: new Toggle(),            //  分润规则列表

        // 会员卡模式
        getCardModeList: new Toggle(), 
        addCardMode: new Toggle(), 
        editCardMode: new Toggle(), 
        deleteCardMode: new Toggle(), 
        getCardCinemaList: new Toggle(),                //  获取影院列表
        getCinemaByLinkIds: new Toggle(),               //   根据影院linkIds list 获取影院信息

        // h5渠道配置
        getH5settingsList: new Toggle(),
        addH5settings: new Toggle(),
        editH5settings: new Toggle(),
        getH5channel: new Toggle(),                     //  获取渠道
        deleteH5settings: new Toggle(),

        // 影院渠道关系
        getCinemaOwnList: new Toggle(),
        addCinemaOwn: new Toggle(),
        deleteCinemaOwn: new Toggle(),
        getCinemaOwnChannelByCinema: new Toggle(),    // 获取该影院未选择的自有渠道
        getSearchCinemas: new Toggle(),               // 搜索项，获取影院
        getOwnChannelNamelist: new Toggle(),          // 搜索项，获取自由渠道
        getCinemaOwnCinemas: new Toggle(),            // 新建时获取可选择的影院
        //改版
        getUnattachedCinema: new Toggle(),            // 获取为链接的渠道
        storeAttachedCinemas: new Toggle(),            // 保存即将要关联的影院
        editCinemaOwn: new Toggle(),

        // 会员大类
        getAccountCategoryList: new Toggle(),         // 获取 会员大类-渠道 列表
        addAccountCategoryChannel: new Toggle(),      // 新建 会员大类-渠道 关系
        editAccountCategoryChannel: new Toggle(),     // 编辑 会员大类-渠道 关系
        deleteAccountCategoryChannel: new Toggle(),   // 删除 会员大类-渠道 关系
        getCategory: new Toggle(),                    // 获取 已有的会员大类
        editCategory: new Toggle(),                   // 编辑 会员大类
    };

    /**
     * 获得该状态的Toggle
     * @param key 接口名
     */
    $scope.getToggle = function(key){
        return $scope.toggle[key] ? $scope.toggle[key] : ($scope.toggle[key] = new Toggle());
    };

    // 静态变量
    $scope.STATIC = {
        url: "http://localhost:8099",                       // 地址参数，用于更改需要引用的地址
        emptyString: '---',                                        // 空值显示
        dayCount: 7,                                                  // 首页默认查询新增会员数天数
        newCountStatus: false,                                // 首页新增会员数图表生成状态
        today: new Date(),
        week: "",
        weeky: ["日", "一", "二", "三", "四", "五", "六"],

        // 影院使用状态
        cinemaStatus: [
            {code:'',name:'全部'},
            {code:1,name:'启用'},
            {code:0,name:'停用'}
        ],
        // 影厅类型
        selectHallType:[
            {type:'M',name:'会议厅'},
            {type:'N',name:'普通厅'},
            {type:'Y',name:'贵宾厅'},
            {type:'I',name:'IMAX厅'},
        ],
        // 渠道类型
        selectChannelType:[
            {type:'thirdparty', name:'分销商'},
            {type:'own', name:'自有渠道'},
        ],
        // 渠道开放状态
        selectChannelStatus:[
            {status:'0',name:'未开放'},
            {status:'1',name:'已开放'},
        ],
        
        // 影片来源码
        filmPartner: [
            {code:'',name:'全部'},
            {code:'ykse',name:'ykse'},
            {code:'taobao',name:'taobao'},
        ],

        // 区域类型
        regionSelectType: [
            {name:"省", code: '1'},
            {name:"市", code: '2'},
            {name:"区/县", code: '3'},
        ],

        // 支付工具类型
        paymentType: [
            {name:"支付宝合作伙伴", code: "ALIPAY_PARTNER"},
            {name:"支付宝开放平台", code: "ALIPAY_OPEN"},
            {name:"支付宝无线产品", code: "ALIPAY_WAP"},
            // {name:"微支付", code: "WeiXin"},
            {name:"微支付公众号支付", code: "WEIXIN_JSAPI"},
            {name:"微支付原生扫码支付", code: "WEIXIN_NATIVE"},
            {name:"微支付app支付", code: "WEIXIN_APP"},
            {name:"微支付刷卡支付", code: "WEIXIN_MICROPAY"},
            {name:"校付宝", code: "XFB"},
        ],

        // 微信类型
        WXtype: [
            {name: "订阅号",code:"public-account"},
            {name: "服务号", code:"service-account"},
        ],

        // 影院渠道支付新建-功能类型
        cinemaPaymentType: [
            {name:'单买售票', type:'ticket'},
            {name:'单买卖品', type:'goods'},
            {name:'会员卡充值', type:'card'},
            {name:'售票和卖品混合下单', type:'ticket-and-goods'},
        ],

        // 会员卡模式
        centerConfigType: [
            {name:'单间影院', type:'single'},
            {name:'集中式卡中心', type:'focus'},
            {name:'分布式卡中心', type:'distribution'},
        ],

        // 
        cinemaPaymentIsSigned : [
            {name:'未签', code:'UNSIGNED'},
            {name:'已签', code:'SIGNED'},
            {name:'退签', code:'OUT_OF_SIGN'},
        ],
    };

    //时间戳变量
    $scope.timestamp = new Date().getTime();
    // 提示语句，用于信息弹窗提示使用
    $scope.alert = {
        msg: '', // 消息内容
        autoClose: false, // 是否启用延时自动关闭的状态
        openStatus: false, // 是否打开状态
        title: '', // 弹窗标题
    };

    // 表格筛选条件参数
    $scope.sort = {};
    // 图片上传变量
    $scope.picFile = '';
    $scope.picResize="_200x200";

    // 筛选参数
    $scope.filter = {};

    // 通用方法
    $scope.finixx = Finixx;

    // 城市下拉
    $scope.city = {};
    $scope.cityPYgroup = [
        {name:'ABCD',findex:0, lindex:3},
        {name:'EFGH',findex:4, lindex:7},
        {name:'IJKL',findex:8, lindex:11},
        {name:'MNOP',findex:12, lindex:15},
        {name:'QRST',findex:16, lindex:19},
        {name:'UVWX',findex:20, lindex:23},
        {name:'YZ',findex:24, lindex:25},
        {name:'更多城市',findex:26, lindex:27},
    ];

};
