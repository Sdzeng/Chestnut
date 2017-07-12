_directive.directive('checkRegion', ['$timeout', function($timeout) { // 批量退票
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function(event) {
                if (iElm.hasClass("check-all")) { // 判断是否为全选按钮
                    treeAll(iElm); // 构造全选按钮
                    $scope.temp.checkedRegion = []; // 重置已勾选的
                    if (iElm.is(":checked")) { // 若为勾选状态
                        var _list = iElm.closest('.check-list').find("input[type='checkbox']").not(".check-all"); // 非全选的input列表
                        for (var i = 0; i < _list.length; i++) { // 遍历当前的非全选input列表
                            $scope.temp.checkedRegion.push({ // 将勾选的保存到处理数组中
                                regionCode: $(_list[i]).attr("regioncode"),
                                regionName: $(_list[i]).attr("regionname")
                            });
                        }
                    } else {
                        $scope.temp.checkedRegion = []; // 重置已勾选的
                    }
                } else { // 非全选按钮
                    tree(iElm); // 构造勾选
                    if (iElm.is(":checked")) { // 若为勾选状态
                        $scope.temp.checkedRegion.push({ // 将选中的加入到处理数组中
                            regionCode: iAttrs.regioncode,
                            regionName: iAttrs.regionname
                        });
                    } else {
                        var _array = []; // 新建临时数组
                        var _regionCode = iAttrs.regioncode; // 当前
                        angular.forEach($scope.temp.checkedRegion, function(item, index) { // 遍历处理数组，排除去除勾选的
                            if (item.regionCode !== _regionCode) {
                                _array.push({
                                    regionCode: item.regionCode,
                                    regionName: item.regionName
                                });
                            }
                        });
                        $scope.temp.checkedRegion = _array; // 重组处理数组
                    }
                }
                $scope.$apply(); // 激活作用域
            });
        }
    };
}]);