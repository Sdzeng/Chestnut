// 参数控制器

angular.module('akapp.controller', []).controller('commonCtrl', commonCtrl);

commonCtrl.$injector = ['$scope', '$filter', '$window', '$location', '$timeout', '$cookies', '$sessionStorage', '$templateCache', 'ngDialog', 'gpservice'];

function commonCtrl($scope, $filter, $window, $location, $timeout, $cookies, $sessionStorage, $templateCache, ngDialog, gpservice) {
    /**
     * 设置当前域名路径
     * @param {[string]} url [域名路径]
     */
    $scope.setPath = function(url) {
        $scope.$storage.path = url;
    };

    /**
     * 获取登录名
     * @return {[type]} [description]
     */
    $scope.getLoginId = function() {
        if (angular.isDefined($cookies.loginId)) {
            $scope.$storage.loginId = $cookies.loginId;
        }
    };
    /**
     * 退出
     * @param  {[string]} url [执行退出的服务器地址]
     * @return {[type]}     [description]
     */
    $scope.logout = function(url) {
        var _param = {
            ACJSESSIONID: $cookies.ACJSESSIONID
        };
        gpservice.getservice(url, "/logout", _param, true).then(function(response) {
            var _r = response;
            if (_r.code === "ok") {
                $.removeCookie("ACJSESSIONID", {
                    path: "/"
                }); // 清除用户session
                $.removeCookie("loginId", {
                    path: "/"
                }); // 清除用户名
                $scope.$storage.$reset(); // 初始化storage
                $timeout(function() {
                    window.location.href = window.location.protocol + "//" + window.location.host;
                }, 10);
                // } else {

            }
        });
    };

    /**
     * 获取菜单
     * @param  {[string]} url  [菜单请求地址]
     * @param  {[code]} code [所属应用编码]
     * @return {[type]}      [description]
     */
    $scope.getSidebar = function(url, code) {
        if ($scope.$storage.sidebar === "" || $scope.$storage.sidebar === undefined) {
            $scope.$storage.tabs = [];
            // $scope.$storage.currentSidebar = "MCINDEX";
            $scope.$storage.sidebar = "";
            $scope.toggle.getSidebar.setLoading();
            var _param = {
                appCode: code,
                ACJSESSIONID: $.cookie("ACJSESSIONID")
            };
            gpservice.getservice(url, "/getMenus", _param).then(function(response) {
                var _r = response;
                if (_r.code === "ok") {
                    $scope.toggle.getSidebar.setSuccess();
                    $scope.$storage.sidebar = _r.data;
                    getSubSidebar();
                    if ($scope.$storage.currentMsidebar === "" || $scope.$storage.currentMsidebar === undefined) {
                        // $scope.setCurrentMainSidebar(_r.data.menus[0].menuCode, _r.data.menus[0].menuId);
                        $scope.setCurrentMainSidebar('BDINDEX', '');
                        // // 跳转页面
                        // $timeout(function () {
                        //     window.location.href = _r.data.menus[0].menuLink;
                        // }, 0);
                    }
                } else {
                    $scope.toggle.getSidebar.setFail();
                    $scope.$storage.sidebar = "";
                }
            });
        } else {
            var num = 0;
            var currentSidebarUrl, localUrlSidebar;
            var selectMenu = function(menuArray){
                for(var i = 0; i < menuArray.length; i++){
                    if(menuArray[i].leafMenus instanceof Array){
                        // selectMenu(menuArray[i].leafMenus);
                        if(menuArray[i].menuCode == $scope.$storage.currentSidebar){
                            currentSidebarUrl = menuArray[i].menuLink;
                        }
                        if(window.location.pathname && menuArray[i].menuLink == window.location.pathname){
                            localUrlSidebar = menuArray[i].menuCode;
                        }
                        selectMenu(menuArray[i].leafMenus);
                    }
                }
            };

            selectMenu($scope.$storage.sidebar.menus);

            if(localUrlSidebar && localUrlSidebar != $scope.$storage.currentSidebar){
                $scope.$storage.currentSidebar = localUrlSidebar;
            }

            $scope.mc.sidebar = $filter("filter")($scope.$storage.sidebar.menus, {
                menuCode: $scope.$storage.currentMsidebar
            })[0];
            if (!$scope.mc.sidebar || ($scope.mc.sidebar && $scope.mc.sidebar.leafMenus.length === 0)) {
                $scope.$storage.currentSidebar = "";
            }
            // 直接跳转时判断当前菜单是否为同一个目录下
            // var _sidebar = $filter("filter")($scope.$storage.sidebar.menus, {});
            return false;
        }
        // sidebar
        // $scope.setSidebar();
    };

    // 获取子菜单集合
    function getSubSidebar () {
        $scope.$storage.subSidebar = [];
        angular.forEach($scope.$storage.sidebar.menus, function (item, index) {
            if (item.leafMenus.length > 0) {
                angular.forEach(item.leafMenus, function (item2, index2) {
                    $scope.$storage.subSidebar.push(item2)
                });
                // $scope.$storage.subSidebar.push({
                //     menuCode: item.menuCode,
                //     leafMenus: item.leafMenus
                // });
            }
        });
    };

    // 设置当前选中的菜单
    $scope.setCurrentSidebar = function(code, url) {
        if (url !== "" && url !== undefined) {
            // $scope.$apply(function() {
                $scope.$storage.currentSidebar = code;
                $scope.$storage.tabs = [];
            // });
            var _time = $timeout(function() {
                locationHref(url);
                $timeout.cancel(_time);
            }, 150);
        }
    };
    // 设置当前选中的父级菜单
    $scope.setCurrentMainSidebar = function(code, id, url) {
        $scope.$storage.currentMsidebar = code;
        $scope.$storage.currentMsidebarId = id;
        $scope.setSidebar();
        if (url !== "" && url !== undefined) {
            $scope.$storage.tabs = [];
            var _time = $timeout(function() {
                locationHref(url);
                $timeout.cancel(_time);
            }, 200);
        }

    };
    // 跳转页面
    function locationHref(url) {
        $window.location.href = $scope.$storage.path + url;
    }

    // 设置在用的菜单
    $scope.setSidebar = function() {
        $scope.mc.sidebar = $filter("filter")($scope.$storage.sidebar.menus, {
            menuCode: $scope.$storage.currentMsidebar
        })[0];
        if (!$scope.mc.sidebar || ($scope.mc.sidebar && $scope.mc.sidebar.leafMenus.length === 0)) {
            $scope.$storage.currentSidebar = "";
        } else {
            // 模拟点击第一个菜单
            $scope.setCurrentSidebar($scope.mc.sidebar.leafMenus[0].menuCode, $scope.mc.sidebar.leafMenus[0].menuLink);
        }
    };

    /**
     * 初始化tab的聚焦
     */
    function setAllInactive() {
        angular.forEach($scope.$storage.tabs, function(item, index) {
            item.active = false;
        });
        $scope.status.tabs = false;
    }

    /**
     * 新增tab页
     * @param {[string]} text   [tab页显示标题]
     * @param {[string]} url    [tab页主体显示内容路径]
     * @param {[string]} id     [唯一标识]
     * @param {[string]} target [tab类型标识]
     * @param {[boolean]} stamp  [是否使用时间戳]
     */
    $scope.addTab = function(text, url, id, target, stamp) {
        setAllInactive();
        var _t = "";
        // switch (stamp) {
        //     case true:
        //         _t = '&t=' + new Date().getTime();
        //         break;
        //     default:
        //         break;
        // }
        if (stamp) {
            _t = '&t=' + new Date().getTime();
        }

        var _state = false;
        angular.forEach($scope.$storage.tabs, function(item, index) {
            if (item.id === id && item.target === target) {
                item.active = true;
                _state = true;
                return false;
            } else {
                item.active = false;
            }
        });
        if (!_state) {
            var index;
            if ($scope.$storage.tabs.length === 0) {
                index = 1;
            } else {
                index = $scope.$storage.tabs[($scope.$storage.tabs.length - 1)].index + 1;
            }

            $scope.$storage.tabs.push({
                index: index,
                id: id,
                text: text,
                active: true,
                url: url + _t,
                target: target
            });
        }
    };

    /**
     * 关闭当前选中的tab页
     * @param  {[int]} index [tab的序号]
     * @return {[type]}       [description]
     */
    $scope.removeTab = function(index) {
        $scope.$storage.tabs.splice(index, 1);
    };

    // 刷新tab内容
    $scope.refreshTab = function (id, target, stamp) {
        var _t = "";
        if (stamp) {
            _t = '&t=' + new Date().getTime();
        }
        angular.forEach($scope.$storage.tabs, function(item, index) {
            if (item.id === id && item.target === target) {
                var _arr = item.url.split("&t=");
                item.url = _arr[0] + _t;
            }
        });
    };

    // 保存当前编辑tab id 
    $scope.storeEditTabId = function (id) {
        $scope.temp.editTabId = id;
    }

    /**
     * 设置当前显示的数据数目
     * @param {[int]} num [数据显示数目]
     */
    $scope.setItemPerPage = function(num) {
        $scope.$storage.currentPageItem = num;
        $scope.resetPageNo();
    };
    /**
     * 重置当前查询的页码
     * @return {[type]} [description]
     */
    $scope.resetPageNo = function() {
        $scope.page.currentPage = 1;
    };

    // 打开弹窗
    $scope.openDialog = function(_tempId, _controller, _class) {
        ngDialog.open({
            template: _tempId,
            controller: _controller,
            className: _class,
            scope: $scope
        });
    };

    // 初始化时间戳
    $scope.initTimestamp = function() {
        $scope.timestamp = new Date().getTime();
    };

    // // alert init
    // $scope.initAlert = function(msg) {
    //     $scope.alert.openStatus = true;
    //     $scope.alert.msg = msg || '正在操作，请稍候..';
    //     $scope.alert.autoClose = false;
    // };
    // // alert reset
    // $scope.resetAlert = function(msg, time) {
    //     var _time = time || 1000;
    //     if (msg) {
    //         $scope.alert.msg = msg;
    //     }
    //     //$scope.alert.msg = msg;
    //     // 两秒后设置关闭状态
    //     $timeout(function() {
    //         $scope.alert.autoClose = true;
    //     }, _time);
    // };

    // 毫秒转化为日期 2015-01-01 by:qianhaoqing
    $scope.timeToDate = function(time) {
        var d = new Date(time);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return (year + '-' + month + '-' + day);
    };

    // 打开提示窗口
    $scope.openTip = function(url) {
        ngDialog.open({
            template: url,
            scope: $scope
        });
    };

    // 打开确认窗口
    // $scope.openConfirm = function (url) {
    //     ngDialog.openConfirm({
    //         template: url,
    //         scope: $scope
    //     });
    // };
    
    // 重置筛选条件
    $scope.initFilter = function () {
        $scope.filter = {};
    };

    // 重置模糊搜索的筛选条件
    $scope.initSearchFilter = function (name) {
        $scope.search[name] = '';
    }
    
    // // 
    // // 设置当前选中的菜单
    // $scope.setCurrentMenuCode = function (code, url) {
    //     $scope.$storage.currentMenuCode = code;
    //     // 切换菜单，初始化分页每页显示数
    //     $scope.$storage.currentPageItem = 20;
    //     // $timeout(function () {
    //     // 切换菜单，初始化已打开的tabs页
    //     $scope.$storage.tabs = [];
    //     // 跳转到目标页面
    //     $timeout(function () {
    //         window.location.href = $scope.$storage.path + url;
    //     }, 100);
    // };

    /**
     * 更改激活tab的状态
     * @param {[boolean]} status [是否为激活状态]
     */
    $scope.setStatusActive = function (status) {
        $scope.status.active = status;
    };

    /**
     * 设置模拟点击提交的状态
     * @param {[boolean]} status [是否激活模拟提交状态]
     */
    $scope.setSubmitStatus = function(status) {
        $scope.status.doSubmit = status;
    };

    $scope.setSubmit = function () {
        if (!$scope.status.doSubmit) {
            $scope.page.currentPage = 1;
        }
        $scope.setSubmitStatus(false);
    };

    $scope.returnToggle = function (string, id) {
        return $scope.toggle[string + id];
    };

    $scope.initToggle = function (string, id) {
        if(!$scope.toggle[string + id]){
            $scope.toggle[string + id] = new Toggle();
        }
        $scope.toggle[string + id].setInit();
    };

    // 初始化搜索
    $scope.initSearch = function () {
        $scope.search = {};
    }
}
