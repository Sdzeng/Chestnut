// 系统参数控制器

angular.module('akapp.controller', []).controller('sysparamCtrl', sysparamCtrl);

sysparamCtrl.$injector = ['$scope', '$filter', '$timeout', '$cookies', '$sessionStorage', '$templateCache', 'ngDialog', 'gpservice'];

function sysparamCtrl($scope, $filter, $timeout, $cookies, $sessionStorage, $templateCache, ngDialog, gpservice) {


	// 系统参数列表
    // by qianhaoqing
    $scope.getSysparamList = function () {
        $scope.toggle.getSysparamList.setLoading();
        $scope.msg.getSysparamList = $scope.msg.loading;
        if (!$scope.status.doSubmit) {
            $scope.page.currentPage = 1;
        }
        $scope.setSubmitStatus(false);

        var _p = {
            pageNo: $scope.page.currentPage,
            pageSize: $scope.$storage.currentPageItem,
            t: new Date().getTime(),
        };
        if($scope.search.theKey){
            // _p.theKey = $scope.search.theKey;
            _p.theKeyLike = $scope.search.theKey;
        }

        gpservice.getservice($scope.$storage.path,'/sysparam/oper/list',_p).then(function (response) {
            var _r = response; 
            if (angular.equals(_r.code, 'ok')) {
                if(_r.data.data.length > 0){
                	$scope.toggle.getSysparamList.setSuccess();
	                $scope.mc.sysparamList = _r.data;
                }else{
                	$scope.toggle.getSysparamList.setEmpty();
                    $scope.msg.getSysparamList = $scope.msg.empty;
                }
                
            } else {
                $scope.toggle.getSysparamList.setFail();
                $scope.msg.getSysparamList = _r.message;
            }
        });
    };


    // 新增系统参数
    $scope.addSysparam = function (e) {
        $scope.toggle.addSysparam.setLoading();
        // $scope.initAlert();
        $scope.status.alert = false;
        $scope.msg.alert = "正在操作";
        $scope.openTip("tips.html");

        if(!e.currentTarget.theKey.value){
            $scope.toggle.addSysparam.setFail();
            $scope.msg.alert = "参数名称不能为空！";
            return;
        }
        if(!e.currentTarget.theValue.value){
            $scope.toggle.addSysparam.setFail();
            $scope.msg.alert = "参数值不能为空！";
            return;
        }
        var _p = {
            theKey: e.currentTarget.theKey.value,
            theValue: e.currentTarget.theValue.value,
            description: e.currentTarget.description.value,
        };

        gpservice.postservice($scope.$storage.path,'sysparam/oper/add',_p).then(function (response) {
            var _r = response;
            if (angular.equals(_r.code, 'ok')) {
                $scope.toggle.addSysparam.setSuccess();
                $scope.msg.alert = "保存成功！";
                $scope.status.alert = true;
            } else {
                $scope.toggle.addSysparam.setFail();
                $scope.msg.alert = "保存失败！"+ _r.message;
            }
            $scope.msg.addSysparam = _r.message;
        });
    };


    // 编辑系统参数
    $scope.editSysparam = function (e) {
        // 保存editTabId
        $scope.storeEditTabId(e.currentTarget.theKey.value);
        
        $scope.toggle.editSysparam.setLoading();
        // $scope.initAlert();
        $scope.status.alert = false;
        $scope.msg.alert = "正在操作";
        $scope.openTip("tips.html");
        var _p = {
            theKey: e.currentTarget.theKey.value,
            theValue: e.currentTarget.theValue.value,
            description: e.currentTarget.description.value,
        };

        gpservice.postservice($scope.$storage.path,'sysparam/oper/edit',_p).then(function (response) {
            var _r = response;
            if (angular.equals(_r.code, 'ok')) {
                $scope.toggle.editSysparam.setSuccess();
                $scope.msg.alert = "保存成功！";
                $scope.status.alert = true;
            } else {
                $scope.toggle.editSysparam.setFail();
                $scope.msg.alert = "保存失败！"+ _r.message;
            }
            $scope.msg.editSysparam = _r.message;
        });
    };

    // 打开删除弹窗
    $scope.openDeleteSysparam = function (list) {
        $scope.temp.deleteSysparam = list;
        ngDialog.openConfirm({
            template: "sysparamDelete.html",
            className: "ngdialog-makeSure",
            scope: $scope,
        }).then(function(success) {
            // 确定则执行操作
            $scope.deleteSysparam(list.theKey);
        }, function(error) {

        });
    }
    /*
    * 删除
    * by qianhaoqing
    */
    $scope.deleteSysparam = function (theKey) {
        $scope.toggle.deleteSysparam.setLoading();
        // $scope.initAlert();
        $scope.status.alert = false;
        $scope.msg.alert = "正在操作";
        $scope.openTip("tips.html");

        var _p ={
            theKey: theKey
        };
        gpservice.postservice($scope.$storage.path,'sysparam/oper/delete',_p).then(function (response) {
            var _r = response; 
            if (angular.equals(_r.code, 'ok')) {
                $scope.toggle.deleteSysparam.setSuccess();
                $scope.msg.alert = "保存成功！";
                $scope.status.alert = true;
            } else {
                $scope.toggle.deleteSysparam.setFail();
                $scope.msg.alert = "保存失败！"+ _r.message;
            }
            $scope.msg.deleteSysparam = _r.message;
        });
    };
};