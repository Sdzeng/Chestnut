// _directive.directive('toggleActivebd', [function(){ // basedata 左侧菜单目录用到
//     return {
//         restrict: 'A',
//         link: function($scope, iElm, iAttrs, controller) {
//             var url =window.location.pathname;
//             $scope.$storage.urlCurrentPath = url.substr($scope.$storage.path.length,(url.length-$scope.$storage.path.length));
//             if($scope.$storage.urlCurrentPath=='/'){
//                 $scope.$storage.urlCurrentPath = "/index";
//             }
//         }
//     };
// }]);



_directive.directive('setAttr', ['$timeout', function($timeout) { // 设置展开侧边栏子菜单
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            if (iAttrs.current === $scope.$storage.currentSidebar) {
                iElm.closest("ul").parent("li").addClass("open");
            }

            if (iAttrs.setAttr) {
                iElm.attr('data-toggle', 'nav-submenu');
                iElm.off('click');
                iElm.on('click', function(event) {
                    $scope.setCurrentSidebar(iAttrs.current, iAttrs.url);
                    $timeout(function() {
                        uiSide(event, iElm);
                    }, 0)
                });
                $timeout(function() {
                    uiHandleScroll();
                }, 0);
            }

        }
    };
}]).directive('sidebarToggle', [function() { // 设置侧边栏整体横向缩小或展开状态
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function() {
                var _windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                if (_windowW > 991) {
                    var _action = "sidebar_mini_toggle";
                } else {
                    var _action = "sidebar_toggle";
                }
                uiLayoutApi(_action);
            })
        }
    };
}]);


_directive.directive('checkToggle', ['$timeout', function($timeout) { // checkbox toggle状态，选与不选
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            // 设置当前全选状态
            iElm.click(function(event) {                                                                            // 绑定点击动作方法
                if (iElm.hasClass("check-all")) {
                    treeAll(iElm);
                } else {
                    tree(iElm);
                }
            });
        }
    };
}]).directive('positionDropdown', [function() { // 自动适当位置移动dropdown
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function() {
                positionDropdown(iElm);
            })
        }
    };
}]).directive('checkboxList', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            if (iAttrs.checkboxList) {
                iElm.attr('data-toggle', 'nav-submenu');
                iElm.off('click');
                iElm.on('click', function(event) {
                    $scope.setCurrentModel(iAttrs.model);
                    $timeout(function() {
                        uiSide(event, iElm);
                    }, 0)
                });
                $timeout(function() {
                    uiHandleScroll();
                }, 0);
            }
        }
    };
}]).directive('openDialog', ['ngDialog', function(ngDialog) { // 打开弹窗，通过获取标签中的模板地址进行入参，有地址参数与是否打开确认窗口参数
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function() {
                var _url = iAttrs.url;
                var _confirm = iAttrs.confirm;
                var _classname = iAttrs.classname;

                var _options = {
                    template: _url,
                    scope: $scope,
                    overlay: true,
                };
                if(_classname) {
                    _options.className = _classname;
                }

                if (_confirm) { // 打开确认窗口
                    ngDialog.openConfirm(_options);
                    
                    // ngDialog.openConfirm({
                    //     template: _url,
                    //     scope: $scope,
                    //     overlay: true,
                    // }).then(function(success) {

                    // }, function(error) {
                    //     return false;
                    // });
                } else { // 打开普通窗口
                    ngDialog.open({
                        template: _url,
                        overlay: true,
                    });
                }
            });
        }
    };
}]).directive('openAlertDialog', ['ngDialog', function (ngDialog) { // 打开弹窗 dialog_alert
    return {
        restrict: 'A',
        // controller: 'commonCtrl',
        link: function($scope, iElm, iAttrs, controller) {
            
            var _url = iAttrs.url;
            ngDialog.open({
                template: _url,
                overlay: true,
                scope: $scope,
                preCloseCallback: function () {
                    // 关闭后，初始化弹窗状态
                    $scope.alert.openStatus = false;
                }
            });
        }
    };
}]).directive('closeDialog', ['ngDialog', '$timeout', function (ngDialog, $timeout) { // 自动关闭弹窗 
    return {
        restrict: 'A',
        // controller: 'commonCtrl',
        link: function($scope, iElm, iAttrs, controller) {
            $timeout(function () {
                $scope.closeThisDialog();
            }, 100);
        }
    };
}]).directive('tableScroll', ['$timeout', function($timeout) { // 替换表格滚动条(浮动表格头部)
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var _timeout = $timeout(function () {
                var _this = iElm.closest(".table-scroll");
                var _content = iElm.closest(".content-body");
                _content.scrollTop(0);
                var _contentOffset = _content.offset().top;
                var _top = _this.offset().top;
                // 滚动悬浮头部
                _content.scroll(function() {
                    var _target = iElm.closest('tbody').siblings('thead').children().find('.fix-header');
                    var _scroll = _content.scrollTop();
                    if (_scroll > _top - _contentOffset) {
                        _target.css({
                            "top": _scroll - _top + _contentOffset,
                            'margin-top': '-1px'
                        });
                    } else {
                        _target.css({
                            "top": "auto",
                            "margin-top": "-50px"
                        });
                    }
                });
                $timeout.cancel(_timeout);
            }, 0);
        }
    };
}]);


_directive.directive('dateTime', [function() {                                                                                                                                                                 // 日期时间指令
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var _options = {};
            _options.showTime = iAttrs.showTime === undefined ? false : true;                                                                                                   // 是否显示时间选择
            _options.language = "zh-CN";                                                                                                                                                            // 语言
            _options.minView = iAttrs.minView === "" || iAttrs.minView === undefined ? null : parseInt(iAttrs.minView);                                                 // 最小显示视图
            _options.autoclose = iAttrs.autoclose === undefined ? false : true;                                                                                                     // 是否选择后自动关闭
            _options.format = iAttrs.format === "" || iAttrs.format === undefined ? 'yyyy-mm-dd hh:ii:ss' : iAttrs.format;                                                               // 日期格式
            

            iElm.datetimepicker(_options).on("changeDate", function (event) {
                var _day = event.date;
                if (iAttrs.dateTime === "start") {                                                                                                                                                      // 若为开始日期，设置同级结束日期的限制
                    iElm.siblings(".input-date").datetimepicker("setStartDate", _day);
                }
                if (iAttrs.dateTime === "end") {                                                                                                                                                       // 若为结束日期，设置同级开始日期的限制
                    iElm.siblings(".input-date").datetimepicker("setEndDate", _day);
                }
            });
        }
    };
}]);

// 针对租户
_directive.directive('leaseDate', [function() {                                                                                                                                                                 // 日期时间指令
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var _options = {};
            _options.showTime = iAttrs.showTime === undefined ? false : true;                                                                                                   // 是否显示时间选择
            _options.language = "zh-CN";                                                                                                                                                            // 语言
            _options.minView = iAttrs.minView === "" || iAttrs.minView === undefined ? null : parseInt(iAttrs.minView);                                                 // 最小显示视图
            _options.autoclose = iAttrs.autoclose === undefined ? false : true;                                                                                                     // 是否选择后自动关闭
            _options.format = iAttrs.format === "" || iAttrs.format === undefined ? 'yyyy-mm-dd hh:ii:ss' : iAttrs.format;                                                               // 日期格式
            

            iElm.datetimepicker(_options).on("changeDate", function (event) {
                var _day = event.date;
                if (iAttrs.leaseDate === "start") {                                                                                                                                                      // 若为开始日期，设置同级结束日期的限制
                    iElm.closest('form').find("input[lease-date='end']").datetimepicker("setStartDate", _day);
                }
                if (iAttrs.leaseDate === "end") {                                                                                                                                                       // 若为结束日期，设置同级开始日期的限制
                    iElm.closest('form').find("input[lease-date='start']").datetimepicker("setEndDate", _day);
                }
            });
        }
    };
}]);

_directive.directive('autoClose', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            $timeout(function() {
                $scope.closeThisDialog();
            }, 1000);
        }
    };
}]).directive('removeCheck', [function() { // 清除已勾选全项
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function() {
                iElm.closest("table").find("input[type='checkbox']").prop("checked", false).siblings(".t-checkbox").removeClass("checked half-checked");
            });
        }
    };
}]).directive('buildSidebar', ['$compile', '$timeout', '$templateCache', function($compile, $timeout, $templateCache) { // 生成侧边栏菜单
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function() {
                // console.log("build", iAttrs.code, iAttrs.link);
                $("#sidebar-content").html("");
                // $scope.$storage.currentMsidebar = iAttrs.code;
                $scope.setCurrentMainSidebar(iAttrs.code, iAttrs.id, iAttrs.link);
                // var _start = "<ul class='nav-main'>";
                // var _end = "</ul>";
                // var _html = "";
                // var _sidebar = [];
                // var _goon = true;
                // angular.forEach($scope.$storage.sidebar.menus, function(item, index) {
                //     if (_goon) {
                //         if (item.menuCode === $scope.$storage.currentMsidebar) {
                //             // _html += $templateCache.get('sidebarItem.html');
                //             // _sidebar = item.leafMenus;
                //             // _html += _start;
                //             // build(_sidebar, _html);
                //             // _html += _end;
                //             _goon = false;
                //             console.log(_html)
                //             $("#sidebar-content").html(_html);
                //         }
                //     }
                // });
                // $compile(iElm.html(_html))($scope);
                // $("#sidebar-content").html($compile(_html)($scope));
            });

            function build(array, html) {
                // console.log(array)
                var _html = html;
                var _array = array;
                angular.forEach(_array, function(item, index) {
                    // _html += _start;
                    _html += "<li";
                    if (item.menuCode === $scope.$storage.currentSidebar) {
                        _html += " class='active'>";
                    } else {
                        _html += ">";
                    }
                    _html += "<a href='javascript:;'";
                    _html += " url='" + item.menuLink + "' " + "current='" + item.menuCode + "'";
                    if (item.leafMenus.length > 0) {
                        _html += " set-attr";
                    }
                    if (item.menuCode === $scope.$storage.currentSidebar) {
                        _html += " class='nav-submenu active'>";
                    } else {
                        _html += " class='nav-submenu'>";
                    }
                    _html += item.menuName + "</a>";
                    _html += "</li>";
                    // _html += _end;
                    if (item.leafMenus.length > 0) {
                        build(item.leafMenus, _html);
                    // } else {
                    //         $("#sidebar-content").html(_html);
                    }
                });
            };
        }
    };
}]).directive('closeAlertauto', ['ngDialog', '$timeout', function (ngDialog, $timeout){ // 自动关闭提示弹窗 by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            // 增加延时，避免 nextSiblings
            $timeout(function () {
                $scope.closeThisDialog();
            }, 100);
        }
    };
}]).directive('closeTabAuto', ['$timeout', function ($timeout){ // 自动关闭tab by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            $timeout(function () {
                $scope.removeTab(iAttrs.tindex);
            }, 100);
        }
    };
}]);

// 将dateselect封装成Angular指令
_directive.directive('dateselect', [function(){
    return {
        restrict: 'A',
        scope: {
            model: '=ngModel'
        },
        link: function($scope, iElm) {

            iElm.dateselect({
                date: isNaN(+$scope.model.date) ? new Date() : new Date(+$scope.model.date),
                dateMode: $scope.model.dateMode || "day",
                mode: $scope.model.mode || "singleCenter"
            });

            iElm.on("changeDate", function(event){
                $scope.model.date = event.date;
                $scope.$apply();
            });

            $scope.$watch('model.date', function(oldDate, newDate) {
                if(newDate != undefined && (oldDate == undefined ||newDate.getTime() != oldDate.getTime())){

                }
            });

            $scope.$watch('model.dateMode', function(oldDate, newDate) {
                if(newDate != undefined && (oldDate == undefined ||newDate != oldDate)){
                    
                }
            });
        }
    }
}]);

// 将dateselect封装成Angular指令
_directive.directive('dateTimePicker', [function(){
    return {
        restrict: 'A',
        scope: {
            model: '=ngDate'
        },
        link: function($scope, iElm) {

            iElm.datetimepicker($scope.model);

            iElm.on("changeDate", function(event){
                $scope.model.date = event.date;
                $scope.$apply();
                if(typeof $scope.model.onChangeDate == "function"){
                    $scope.model.onChangeDate(event);
                }
            });

            $scope.$watch('model.date', function(newDate, oldDate) {
                if(newDate != undefined && (oldDate == undefined ||newDate.getTime() != oldDate.getTime())){
                    iElm.datetimepicker('update', newDate)
                }
            });
        }
    }
}]);

_directive.directive('dropTable', [function(){                                                                                           // 表格增加左右拖拽
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.mousedown(function (event) {
                var _t = event.target;
                
                var _cinemagroup = _t.className === "sb-arrow";
                var _checkbox = _t.className === "t-checkbox" || _t.className === "t-checkbox checked" || _t.className === "t-checkbox half-checked";         // 不能激活的条件标签
                var _input = _t.tagName === "INPUT";
                var _a = _t.tagName === "A";
                var _i = _t.tagName === "I";
                var _btn = _t.tagName === "BUTTON";
                var _dropdown = _t.attributes["dropdown-toggle"];

                    // var _parentOffset = iElm.parent().offset();                                                                            // 父级偏移量
                if (!_checkbox && !_input && !_a && !_dropdown && !_i && !_cinemagroup) {                                                                                      // 点击表格主体才生效（判断条件还是有问题）
                    
                    var _parent = iElm.closest(".table-scroll");
                    var _differ = iElm.width() - _parent.width();                                                                          // 宽度差额
                    var _pagex = event.pageX;                                                                                                      // 首次点击的坐标
                    var _offsetLeft = iElm.offset().left;                                                                                          // 偏移量
                    if (_differ > 0) {                                                                                                                          // 存在横向滚动条
                        $("body").append("<div class='table-layout'></div>");                                               // 创建遮盖层，防止选中内容
                        $(".table-layout").on("mousemove", function (e) {                                                         // 绑定鼠标移动事件
                            var _x = e.pageX - _parent.offset().left;                                                                            // 获取鼠标偏移坐标
                            var _shift = _pagex - _x - _offsetLeft;                                          // 最终偏移量
                            // console.log(_shift , _pagex , _x , _offsetLeft);
                            // var _shift = 
                            iElm.closest(".table-scroll").scrollLeft(_shift);                                                               // 滚动偏移（无边界值）
                        });
                        $(".table-layout").mouseup(function () {                                                                            // 释放鼠标后，消除事件与遮盖层
                            $(".table-layout").off("mousemove");
                            $(".table-layout").remove();
                        });
                    }
                }
            });
        }
    };
}]);

_directive.directive('dropdownHover', ['$timeout', function($timeout){                                                                                                                  // focus于dropdown menu的搜索框中，不隐藏dropdown menu
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.focus(function () {
                iElm.closest(".dropdown-menu").attr("style", "display: block");
            });
            iElm.focusout(function () {
                var _timeout = $timeout(function () {
                    iElm.parent().removeAttr('style');
                    $scope.initFilter();
                    $timeout.cancel(_timeout);
                }, 200);
            });
        }
    };
}]);

_directive.directive('resetTop', [function(){                                                                                                           // 手动跳转默认设置菜单当前状态
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var _link = window.location.pathname;
            resetSide($scope.$storage.sidebar.menus);

            function resetSide (array) {
                var _status = true;
                angular.forEach(array, function (item, index) {
                    if (_status) {
                        var _path = $scope.$storage.path + item.menuLink;
                        if (_path === _link) {
                            $scope.$storage.currentMsidebar = item.menuCode;
                            $scope.$storage.currentMsidebarId = item.menuId;
                            _status = false;
                        } else {
                            if (item.leafMenus.length > 0) {
                                var _status2 = true;
                                angular.forEach(item.leafMenus, function (item2, index2) {
                                    if (_status2) {
                                        var _path2 = $scope.$storage.path + item2.menuLink;
                                        if (_path2 === _link) {
                                            $scope.$storage.currentMsidebar = item.menuCode;
                                            $scope.$storage.currentMsidebarId = item2.parentMenuId;
                                            $scope.$storage.currentSidebar = item2.menuCode;
                                            _status2 = false;
                                            _status = false;
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            $scope.setSidebar();
            }
        }
    };
}]);

// 封装 echarts
// 暂时不支持动态数据
_directive.directive('echarts', [function(){

    function requireFun(model, fun){
        var requireArray = [];
        if(model.require instanceof Array)
            model.require.forEach(function(val){
                if(requireArray.indexOf(val) < 0){
                    requireArray.push(val)
                }
            });
        if(model.series instanceof Array)
            model.series.forEach(function(val){
                if(requireArray.indexOf(val.type) < 0){
                    requireArray.push(val.type)
                }
            });
        requireArray = (['echarts']).concat(requireArray.map(function(val){
            return 'echarts/chart/' + val
        }));

        require(requireArray, fun);
    }

    return {
        restrict: 'A',
        scope: {
            model: '=ngModel'
        },
        link: function($scope, iElm){
            requireFun($scope.model, function(ec){
                var chart = ec.init(iElm[0]);
                chart.setOption($scope.model);
            });
            $scope.$watch('model', function(newData, oldData){
                if(newData == oldData)return;
                requireFun(newData, function(ec){
                    var chart = ec.init(iElm[0]);
                    chart.clear();
                    chart.setOption(newData);
                });
            }, true);
        }
    }
}]);

// 向下滚动，选择表格顶部的批量操作按钮组
_directive.directive('scrollFix', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var _timeout = $timeout(function() {
                var _content = iElm.closest(".content-body"); // 父级对象
                _content.scrollTop(0); // 切换时将滚动条重置，避免位置计算错误；
                iElm.parent().css({
                    top: "auto" // 小于时，直接消除top位置
                });
                var _top = iElm.parent().offset().top; // 自身初始位置
                var _contentOffset = _content.offset().top; // 父级对象初始位置
                _content.scroll(function() { // 滚动事件
                    var _scroll = _content.scrollTop(); // 滚动高度
                    if (_scroll > _top - _contentOffset) { // 当滚动高度高于当前于父级的相对位置
                        iElm.parent().css({
                            top: _scroll // 设置浮动的高度
                        });
                    } else {
                        iElm.parent().css({
                            top: "auto" // 小于时，直接消除top位置
                        });
                    }
                });
                $timeout.cancel(_timeout);
            }, 0);
        }
    };
}]);

// 判断表单是否有更改，进行下一步操作
// 需要判断当前的操作是在表单内（inside）还是表单外（outside）
// 使用说明：
// 1.在form中增加index属性  index="{{$index}}"
// 2.在使用的按钮中增加指令 compare-form="in/out"，暂只限于顶部tab的关闭图标与表单底部的关闭/取消按钮
_directive.directive('compareForm', ['ngDialog', function(ngDialog){
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function () {
                switch (iAttrs.compareForm) {                                                                                                                          // 判断的当前操作的按钮在表单内(in)/表单外(out)
                    case "in":
                            var _form = iElm.closest("form")[0];                                                                                                      // 获取最近的表单对象
                        break;
                    case "out":
                            var _form = iElm.closest(".tab-wrapper").children(".tab-content").find(".tab-pane.active form")[0];         // 获取对应的表单对象
                        break;
                    default:
                        break;
                };
                
                if (_form.length > 0) {                                                                                                                                       // 当表单对象内有多个内容
                    var _changeList = [];                                                                                                                                     // 用于保存有更改的元素，后期扩展显示修改项可以使用
                    var _index = _form.attributes.index.value;                                                                                                     // 当前打开的标签页序号
                    angular.forEach(_form, function (item, index) {                                                                                             // 遍历表单元素，分情况判断值的更改状况
                        if (item.tagName === "INPUT" || "TEXTAREA") {                                                                                       // 暂只接受输入框值判断（可扩展）
                            switch (item.type) {                                                                                                                               // 输入框类型
                                case "text":                                                                                                                                       // 普通输入框
                                    if (item.defaultValue !== item.value) {                                                                                           // 默认值与当前值不等
                                        _changeList.push(item);                                                                                                             // 保存修改对象
                                    }
                                    break;
                                case "textarea":                                                                                                                                 // 编辑框
                                    if (item.defaultValue !== item.value) {
                                        _changeList.push(item);
                                    }
                                    break;
                                case "checkbox":                                                                                                                                // 勾选框
                                    if (item.defaultChecked !== item.checked) {                                                                                   // 勾选值
                                        _changeList.push(item);
                                    }
                                    break;
                                case "file":                                                                                                                                          // 文件选择框
                                    break;
                            };
                        }
                    });

                    if (_changeList.length > 0) {                                                                                                                            // 有更改值
                        $scope.msg.alert = "您确定要关闭该标签页吗？";                                                                                          // 设置显示标题
                        $scope.msg.alertTitle = "关闭标签页";                                                                                                          // 设置显示内容
                        ngDialog.openConfirm({                                                                                                                             // 打开确认窗口
                            template: "confirm.html",
                            scope: $scope
                        }).then(function (success) {
                            $scope.removeTab(_index);                                                                                                                      // 确定，关闭标签页
                        });
                    } else {
                        $scope.removeTab(_index);                                                                                                                           // 无更改对象，直接关闭标签页
                    }
                    $scope.$apply();                                                                                                                                                // 更新作用域
                }
            });
        }
    };
}]);


// 模拟submit动作
_directive.directive('triggerSubmit', ['$timeout', function($timeout){
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
           var _timeout = $timeout(function () { // 设置延时执行方法
                // iElm.trigger("click"); // 
                iElm.submit(); // 执行提交方法
                $timeout.cancel(_timeout); // 取消延时对象
           }, 0);
        }
    };
}]);

// 手机小屏幕修复菜单
// 修复导航栏撑开
_directive.directive('headerSection', [function(){
    return {
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {
            var _header = iElm.closest(".nav-header");
            var _hw = _header.width();
            var _lw = _header.siblings(".header-logo").width();
            var _nw = _header.siblings(".user-section").width();

            if (_hw + _lw + _nw > $(window).width()) {
                _header.hide();
                _header.siblings(".menu-quick").show();
            }else {
                _header.siblings(".menu-quick").hide();
            }
        }
    };
}]);

// 打开快速导航
_directive.directive('quickMenu', ["$timeout", function($timeout){
    return {
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function () {
                $("#quick-sidebar").fadeToggle(0);
            });
        }
    };
}]);