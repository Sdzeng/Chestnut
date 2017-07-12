// 影片控制器

angular.module('akapp.controller', []).controller('filmCtrl', filmCtrl);

filmCtrl.$injector = ['$scope', '$filter', '$window', '$location', '$timeout', '$cookies', '$sessionStorage', '$templateCache', 'Upload', 'ngDialog', 'gpservice'];

function filmCtrl($scope, $filter, $window, $location, $timeout, $cookies, $sessionStorage, $templateCache, Upload, ngDialog, gpservice) {
    /*
    * 获取影片列表
    * by qianhaoqing
    */
    $scope.getFilmList = function (){
        $scope.toggle.getFilmList.setLoading();
        $scope.msg.getFilmList = $scope.msg.loading;
        if (!$scope.status.doSubmit) {
            $scope.page.currentPage = 1;
        }
        $scope.setSubmitStatus(false);

        var _p ={
            pageNo: $scope.page.currentPage,
            pageSize: $scope.$storage.currentPageItem,
            t: new Date().getTime(),
        };
        if($scope.search.filmUniqueId){
            _p.filmUniqueId = $scope.search.filmUniqueId;
            
        }
        if($scope.search.filmName && $scope.search.filmName !=='全部'){
            _p.filmName = $scope.search.filmName;
            _p.filmNameLike = $scope.search.filmName;
        }
        // 影片来源
        if($scope.search.partnerCode && $scope.search.partnerName !=='全部'){
            _p.partnerCode = $scope.search.partnerCode;                
        }
        // 上映时间
        if($scope.search.beginDateStart){
            _p.beginDateStart = $scope.search.beginDateStart;
        }
        if($scope.search.beginDateEnd){
            _p.beginDateEnd = $scope.search.beginDateEnd;
        }

        gpservice.getservice($scope.$storage.path,'/film/oper/list',_p).then(function (response) {
            var _r = response; 
            if (angular.equals(_r.code, 'ok')) {
                if(_r.data.data.length > 0){
                    $scope.toggle.getFilmList.setSuccess();
                    $scope.mc.filmList = _r.data;
                }else{
                    $scope.toggle.getFilmList.setEmpty();
                    $scope.msg.getFilmList = $scope.msg.empty;
                }
                
            }else {
                $scope.toggle.getFilmList.setFail();
                $scope.msg.getFilmList = _r.message;
            }
        });
    };

    /*
    * 获取影片名称
    * by qianhaoqing
    */
    $scope.getFilmNamelist = function (){
        $scope.toggle.getFilmNamelist.setLoading();
        var _p ={t: new Date().getTime()};
        gpservice.getservice($scope.$storage.path,'/film/oper/listName',_p).then(function (response) {
            var _r = response; 
            if (angular.equals(_r.code, 'ok')) {
                $scope.toggle.getFilmNamelist.setSuccess();
                $scope.mc.filmNamelist = _r.data;
            }else {
                $scope.toggle.getFilmNamelist.setFail();
            }
            $scope.msg.getFilmNamelist = _r.message;
        });  
    }

    /*
    * 搜索查询页 set 值
    * by qianhaoqing
    */
    // 查询，set 值
    $scope.setSelectFilmName = function (name) {
        $scope.search.filmName = name;
    }
    $scope.setSelectFilmLanguage = function (language) {
        $scope.search.language = language;
    }
    $scope.setSelectFilmVersion = function (v) {
        $scope.search.releaseVersion = v;
    }
    $scope.setSelectPartner = function (code, name) {
       $scope.search.partnerCode = code;
       $scope.search.partnerName = name;
    }

//-------------------------------------------图片放大------------------------------------------------------------------------------------
    // 打开图片弹窗
    $scope.openImgDialog = function (_tempId, _controller, _class) {
        ngDialog.open({
            template: _tempId,
            closeByDocument: false,
            controller: 'filmCtrl',
            className: _class,
            scope: $scope
        });
    }

    /*
    * 保存影片海报原有数组对象用于图片轮播
    */
    $scope.storeFilmLogosOjb = function (tid, logo, path) {
        if(!angular.isDefined($scope.temp['filmLogosOjb'+ tid])){
            $scope.temp['filmLogosOjb'+ tid] =[];
        }
        
        var tip = true;
        angular.forEach($scope.temp['filmLogosOjb'+ tid], function (item,index) {
            if(item === logo){
                tip = false;
            }
        });
        if(tip){
            var link;
            if(logo.indexOf(path)<0){
                // link = logo.replace(/\?/g,$scope.picResize+'?');
                link = logo + $scope.picResize;
            }else{
                link = logo;
            }
            $scope.temp['filmLogosOjb'+ tid].push({
                orisrc: logo,
                link: link
            });
        }
    }
    $scope.returnFilmLogosOjb = function () {
        return $scope.temp['filmLogosOjb'+ $scope.temp.activeTid];
    }

    /*
    * 保存影片剧照原有数组对象，用于图片轮播---竖海报
    */
    $scope.storeFilmPostersOjb = function (tid, logo, path) {
        if(!angular.isDefined($scope.temp['filmPostersOjb'+ tid])){
            $scope.temp['filmPostersOjb'+ tid] =[];
        }
        
        var tip = true;
        angular.forEach($scope.temp['filmPostersOjb'+ tid], function (item,index) {
            if(item === logo){
                tip = false;
            }
        });
        if(tip){
            var link;
            if(logo.indexOf(path)<0){
                // link = logo.replace(/\?/g,$scope.picResize+'?');
                link = logo + $scope.picResize;
            }else{
                link = logo;
            }
            $scope.temp['filmPostersOjb'+ tid].push({
                orisrc: logo,
                link: link
            });
        }
    }
    $scope.returnFilmPostersOjb = function () {
        return $scope.temp['filmPostersOjb'+ $scope.temp.activeTid];
    }

    /*
    * 保存影片剧照原有数组对象，用于图片轮播---横海报
    */
    $scope.storeHorizontalPostersOjb = function (tid, logo, path) {
        if(!angular.isDefined($scope.temp['horizontalPostersOjb'+ tid])){
            $scope.temp['horizontalPostersOjb'+ tid] =[];
        }
        
        var tip = true;
        angular.forEach($scope.temp['horizontalPostersOjb'+ tid], function (item,index) {
            if(item === logo){
                tip = false;
            }
        });
        if(tip){
            var link;
            if(logo.indexOf(path)<0){
                // link = logo.replace(/\?/g,$scope.picResize+'?');
                link = logo + $scope.picResize;
            }else{
                link = logo;
            }
            $scope.temp['horizontalPostersOjb'+ tid].push({
                orisrc: logo,
                link: link
            });
        }
    }
    $scope.returnHorizontalPostersOjb = function () {
        return $scope.temp['horizontalPostersOjb'+ $scope.temp.activeTid];
    }


    /*
    * 保存影片海报原有数组
    * by qianhaoqing
    */
    // $scope.storeFilmLogos = function (tid, logo) {
    //     if(!angular.isDefined($scope.temp['filmLogos'+ tid])){
    //         $scope.temp['filmLogos'+ tid] =[];
    //     }
    //     var tip = true;
    //     angular.forEach($scope.temp['filmLogos'+ tid], function (item,index) {
    //         if(item === logo){
    //             tip = false;
    //         }
    //     });
    //     if(tip){
    //         $scope.temp['filmLogos'+ tid].push(logo);
    //     }
    // }

    /*
    * 保存影片剧照原有数组
    * by qianhaoqing
    */
    // $scope.storeFilmPosters = function (tid, poster) {
    //     if(!angular.isDefined($scope.temp['filmPosters'+ tid])){
    //         $scope.temp['filmPosters'+ tid] =[];
    //     }
    //     var tip = true;
    //     angular.forEach($scope.temp['filmPosters'+ tid], function (item,index) {
    //         if(item === poster){
    //             tip = false;
    //         }
    //     });
    //     if(tip){
    //         $scope.temp['filmPosters'+ tid].push(poster);
    //     } 
    // }

   
    $scope.setImgSrc = function (url) {
        $scope.temp.imgurl = url;
        // 判断是否是第一张和最后一张
        // $scope.checkIsFirstLastImg(target,url)
    }
    // 保存 active的tab id
    $scope.storeActiveTid = function (tid,target,url) {
        $scope.temp.activeTid = tid;
        // 判断是否是第一张和最后一张
        $scope.checkIsFirstLastImg(target,url)
    }
    $scope.setImgTarget = function (target) {
        $scope.temp.imgTarget = target;
    }
    // 上一张 适用于详情页
    $scope.prevFilmImg = function (url) {
        if($scope.temp.imgTarget == 'filmLogos'){
            var _arr = $scope.temp['filmLogosOjb'+ $scope.temp.activeTid];
        }else if($scope.temp.imgTarget == 'filmPosters'){
            var _arr = $scope.temp['filmPostersOjb'+ $scope.temp.activeTid];
        }else if($scope.temp.imgTarget == 'horizontalPosters'){
            var _arr = $scope.temp['horizontalPostersOjb'+ $scope.temp.activeTid];
        }
        // console.log(_arr);
        var i ;
        angular.forEach(_arr,function (item,index) {
            if(url === item.orisrc){
                if(index > 0 ){
                    var i = index-1;
                    $scope.temp.imgurl = _arr[i].orisrc;
                    // 判断是否首张末张
                    if(i == 0){
                        $scope.temp.isFirstImg = 1;
                    }else {
                        $scope.temp.isFirstImg = 0;
                    }
                    if(i == _arr.length -1){
                        $scope.temp.isLastImg = 1;
                    }else {
                        $scope.temp.isLastImg = 0;
                    }
                }
            }
        });
    }

    // 下一张 适用于详情页
    $scope.nextFilmImg = function (url) {
        if($scope.temp.imgTarget == 'filmLogos'){
            var _arr = $scope.temp['filmLogosOjb'+ $scope.temp.activeTid];
        }else if($scope.temp.imgTarget == 'filmPosters'){
            var _arr = $scope.temp['filmPostersOjb'+ $scope.temp.activeTid];
        }else if($scope.temp.imgTarget == 'horizontalPosters'){
            var _arr = $scope.temp['horizontalPostersOjb'+ $scope.temp.activeTid];
        }
        // console.log(_arr);
        var i ;
        angular.forEach(_arr,function (item,index) {
            if(url === item.orisrc){
                if(index < _arr.length -1){
                    var i = index+1;
                    $scope.temp.imgurl = _arr[i].orisrc;
                    // 判断是否首张末张
                    if(i == 0){
                        $scope.temp.isFirstImg = 1;
                    }else {
                        $scope.temp.isFirstImg = 0;
                    }
                    if(i == _arr.length -1){
                        $scope.temp.isLastImg = 1;
                    }else {
                        $scope.temp.isLastImg = 0;
                    }
                }
            }
        });
    };
    // check 是否是首页或末页
    $scope.checkIsFirstLastImg = function (target,url) {
        if(target == 'filmLogos'){
            var _arr = $scope.temp['filmLogosOjb'+ $scope.temp.activeTid];
        }else if(target == 'filmPosters'){
            var _arr = $scope.temp['filmPostersOjb'+ $scope.temp.activeTid];
        }else if(target == 'horizontalPosters'){
            var _arr = $scope.temp['horizontalPostersOjb'+ $scope.temp.activeTid];
        }
        // console.log(_arr);
        var i ;
        $scope.temp.isFirstImg = false;
        $scope.temp.isLastImg = false;
        angular.forEach(_arr,function (item,index) {
            if(url === item.orisrc){
                if(index == 0){
                    $scope.temp.isFirstImg = 1;
                }else{
                    $scope.temp.isFirstImg = 0;
                }
                if(index == _arr.length-1){
                    $scope.temp.isLastImg = 1;
                }else{
                    $scope.temp.isLastImg = 0;
                }
            }
        });
    };

    /*********************************************************** basedata 独有 ****************************************************/
    // 新建 影片 设值
    $scope.setFilmAddLanguage = function (l,tid){
        $scope.temp['filmAdd_language_'+tid] = l;
    }
    $scope.setFilmAddVersion = function (v,tid){
        $scope.temp['filmAdd_releaseVersion_'+tid] = v;
    }
    $scope.setFilmAddCountry = function (c,tid){
        $scope.temp['filmAdd_country_'+tid] = c;
    }
    // 返回值
    $scope.returnFilmAddLanguage = function (tid){
        return $scope.temp['filmAdd_language_'+tid];
    }
    $scope.returnFilmAddVersion = function (tid){
        return $scope.temp['filmAdd_releaseVersion_'+tid];
    }
    $scope.returnFilmAddCountry = function (tid){
        return $scope.temp['filmAdd_country_'+tid];
    }

    /*
    * 新建影片
    * by qianhaoqing
    */
    $scope.addFilm = function (tid, e, logofile, posterfile, horizontalposterfile) {
        $scope.toggle.addFilm.setLoading();
        // $scope.initAlert();
        $scope.status.alert = false;
        $scope.msg.alert = "正在操作";
        $scope.openTip("tips.html");

        var _files = [];
        var _dataName =[];
        var _p ={
            filmName: e.currentTarget.filmName.value,
            shortNameCh: e.currentTarget.shortNameCh.value,
            shortNameEn: e.currentTarget.shortNameEn.value,
            showStatus: e.currentTarget.showStatus.value,
            isShow: e.currentTarget.isShow.value,
            filmType: e.currentTarget.filmType.value,
            duration: e.currentTarget.duration.value,
            language: e.currentTarget.language.value,
            releaseVersion: e.currentTarget.releaseVersion.value,
            country: e.currentTarget.country.value,
            distributor: e.currentTarget.distributor.value,
            director: e.currentTarget.director.value,
            mainactor: e.currentTarget.mainactor.value,
            filmLogos: '',
            posters: '',
            introduction: e.currentTarget.introduction.value,
            beginDateStr: e.currentTarget.beginDateStr.value,
            // 排序
            orderBy: e.currentTarget.orderBy.value,
        };
        // 标识手动输入
        var reg = /^\d{12}$/; // 12位数字
        if($scope.temp.radioFilmUniqueId == 'WRITE') {
            if(e.currentTarget.filmUniqueId.value == ""){
                $scope.msg.alert = "请填写12位的影片标识！";
                $scope.toggle.addFilm.setFail();
                return;
            }else if(!reg.test(e.currentTarget.filmUniqueId.value)){
                $scope.msg.alert = "影片标识只能是12位数字！";
                $scope.toggle.addFilm.setFail();
                return;
            }
            _p.filmUniqueId = e.currentTarget.filmUniqueId.value;
        }
        //一句点评
        if(e.currentTarget.highlight.value !== ""){
            if(e.currentTarget.highlight.value.length > 20) {
                $scope.msg.alert = "一句点评字数不能超过20个字符！";
                $scope.toggle.addFilm.setFail();
                return;
            }else{
                _p.highlight = e.currentTarget.highlight.value;
            }
        }
        if(e.currentTarget.rating.value !== ""){
            var f = Number(e.currentTarget.rating.value);
             if(f< 0.1 || f > 10) {
                $scope.msg.alert = "评分只能在1.0至10.0之间！";
                $scope.toggle.addFilm.setFail();
                return;
             } else {
                _p.rating = f;
             }
        }
        if(e.currentTarget.orderBy.value != ""){
            _p.orderBy = Number(e.currentTarget.orderBy.value);
        }

        var goOn = true;
        // 替换
        if(angular.isDefined($scope.temp['filmLogoModel_'+tid])){
            var logofile = $scope.temp['filmLogoModel_'+tid];
        }
        // if(angular.isDefined($scope.temp['filmPosterModel_'+tid])){
        //     var posterfile = $scope.temp['filmPosterModel_'+tid];
        // }
        if (angular.isDefined(logofile)) {
            angular.forEach(logofile, function (item ,index) {
                _files.push(item);
                _dataName.push('logoFiles');
                // 图片大小限制
                if(item.$error == 'maxSize'){
                    $scope.msg.alert = "影片剧照图片大小超过限制！";
                     $scope.toggle.addFilm.setFail();
                    // return ;
                    goOn = false;
                }
            });
            
        }
        if(!goOn){
            return ;
        }
        // if (angular.isDefined(posterfile)) {
        //     angular.forEach(posterfile, function (item ,index) {
        //         _files.push(item);
        //         _dataName.push('posterFiles');
        //         // 图片大小限制
        //         if(item.$error == 'maxSize'){
        //             $scope.msg.alert = "影片海报图片大小超过限制！";
        //             $scope.toggle.addFilm.setFail();
        //             // return ;
        //             goOn = false;
        //         }
        //     });
        // }
        // if(!goOn){
        //     return ;
        // }
        // 单张竖版海报
        if(posterfile !== null && posterfile !== '' && posterfile !== undefined && !$scope.temp['delPoster_'+tid]) {
            // 图片大小限制
            if(posterfile.$error == 'maxSize'){
                $scope.msg.alert = "竖版海报大小超过限制！";
                $scope.toggle.addFilm.setFail();
                return ;
            }
            // 符合则。。。
            _files.push(posterfile);
            _dataName.push('posterFile');
        }
        // 单张横版海报
        if(horizontalposterfile !== null && horizontalposterfile !== '' && horizontalposterfile !== undefined && !$scope.temp['delHorizontalPoster_'+tid]) {
            // 图片大小限制
            if(horizontalposterfile.$error == 'maxSize'){
                $scope.msg.alert = "横版海报大小超过限制！";
                $scope.toggle.addFilm.setFail();
                return ;
            }
            // 符合则。。。
            _files.push(horizontalposterfile);
            _dataName.push('horizontalPosterFile');
        }
        // console.log('_files=',_files);
        // console.log('_dataName=',_dataName);
        // return ;
        // 图片上传
        if ((logofile !== null && logofile !== '' && logofile !== undefined) || (posterfile !== null && posterfile !== '' && posterfile !== undefined) || (horizontalposterfile !== null && horizontalposterfile !== '' && horizontalposterfile !== undefined && !$scope.temp['delHorizontalPoster_'+tid])) {
            _files.upload = Upload.upload({
                url: $scope.$storage.path + '/film/oper/add',
                method: 'POST',
                fields:_p,
                file: _files,
                fileFormDataName: _dataName
            });

            _files.upload.then(function(response) {

                var _r = response.data;

                if (angular.equals(_r.code, 'ok')) {
                    $scope.toggle.addFilm.setSuccess();
                    $scope.msg.alert = "保存成功！";
                    $scope.status.alert = true;
                }else {
                    $scope.toggle.addFilm.setFail();
                    $scope.msg.alert = "保存失败！"+ _r.message;
                }
                $scope.msg.addFilm = _r.message;

                // $timeout(function() {
                    _files.result = response.data;
                // });

            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            _files.upload.progress(function(evt) {
                _files.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

            _files.upload.xhr(function(xhr) {
                xhr.upload.addEventListener('abort', function(){
                    // console.log('abort complete')
                }, false);
            });
            
        }else {
            gpservice.postservice($scope.$storage.path,'film/oper/add',_p).then(function (response) {
                var _r = response; 
                if (angular.equals(_r.code, 'ok')) {
                    $scope.toggle.addFilm.setSuccess();
                    // console.log('添加影片成功');
                    $scope.msg.alert = "保存成功！";
                    $scope.status.alert = true;
                }else {
                    $scope.toggle.addFilm.setFail();
                    $scope.msg.alert = "保存失败！"+ _r.message;
                }
                $scope.msg.addFilm = _r.message;
            });  
        }
    };
    
    // 保存删除原有的filmlogo
    $scope.storeDeleteFilmLogo = function (tid, pic) {
        if(!angular.isDefined($scope.temp['deleteFilmLogos_'+tid])){
            $scope.temp['deleteFilmLogos_'+tid] = [];
        }
        $scope.temp['deleteFilmLogos_'+tid].push(pic);
    }
    // // 保存删除原有的filmPoster
    // $scope.storeDeleteFilmPoster = function (tid, pic) {
    //     if(!angular.isDefined($scope.temp['deleteFilmPosters_'+tid])){
    //         $scope.temp['deleteFilmPosters_'+tid] = [];
    //     }
    //     $scope.temp['deleteFilmPosters_'+tid].push(pic);
    // }
    // // 保存删除原有的filmHorizontalPoster
    // $scope.storeDeleteFilmHorizontalPoster = function (tid, pic) {
    //     if(!angular.isDefined($scope.temp['deleteFilmHorizontalPosters_'+tid])){
    //         $scope.temp['deleteFilmHorizontalPosters_'+tid] = [];
    //     }
    //     $scope.temp['deleteFilmHorizontalPosters_'+tid].push(pic);
    // }


    //重置 filmlogofile
    $scope.storeDeleteFilmLogofile = function  (tid, pic) {
        angular.forEach($scope.temp['filmLogoModel_'+tid],function (item,index) {
            if(item.name === pic.name){
                $scope.temp['filmLogoModel_'+tid].splice(index,1)
            }
        });
    }
    // //重置 filmPosterfile
    // $scope.storeDeleteFilmPosterfile = function  (tid, pic) {
    //     angular.forEach($scope.temp['filmPosterModel_'+tid],function (item,index) {
    //         if(item.name === pic.name){
    //             $scope.temp['filmPosterModel_'+tid].splice(index,1)
    //         }
    //     });
    // }
    // //重置 filmHorizontalPosterfile
    // $scope.storeDeleteFilmHorizontalPosterfile = function  (tid, pic) {
    //     angular.forEach($scope.temp['filmHorizontalPosterModel_'+tid],function (item,index) {
    //         if(item.name === pic.name){
    //             $scope.temp['filmHorizontalPosterModel_'+tid].splice(index,1)
    //         }
    //     });
    // }


    //初始化 // 保存原有删除的filmlogo
    $scope.initDeleteFilmLogo = function (tid) {
        if(angular.isDefined($scope.temp['deleteFilmLogos_'+tid])){
            $scope.temp['deleteFilmLogos_'+tid] = [];
            // console.log(tid,$scope.temp['deleteFilmPosters_'+tid]);
        }
    }
    // //初始化 // 保存原有删除的filmPoster
    // $scope.initDeleteFilmPoster = function (tid) {
    //     if(angular.isDefined($scope.temp['deleteFilmPosters_'+tid])){
    //         $scope.temp['deleteFilmPosters_'+tid] = [];
    //     }
    // }

    // //初始化 // 保存原有删除的filmHorizontalPoster
    // $scope.initDeleteFilmHorizontalPoster = function (tid) {
    //     if(angular.isDefined($scope.temp['deleteFilmHorizontalPosters_'+tid])){
    //         $scope.temp['deleteFilmHorizontalPosters_'+tid] = [];
    //     }
    // }

    // 剧照
    // 保存 file model
    $scope.storeFilmlogoModel = function (tid, filmlogo) {
        // console.log('filmlogo=',filmlogo);
        if(!angular.isDefined($scope.temp['filmLogoModel_'+tid])){
            $scope.temp['filmLogoModel_'+tid] = [];
        }
        angular.forEach(filmlogo,function(item,index){
            // 保存选择的file model,重复（同名）的先删除旧的，再存入
            var tip = true;
            angular.forEach($scope.temp['filmLogoModel_'+tid],function (o,i) {
                if(item.name == o.name){
                    tip = false;
                }
            });
            $scope.temp['filmLogoModel_'+tid].push(item);

        });
    }
    $scope.returnFilmlogoModel = function  (tid) {
        return $scope.temp['filmLogoModel_'+tid];
    }
    // 初始化 file model
    $scope.initFilmlogoModel = function (tid) {
        if(angular.isDefined($scope.temp['filmLogoModel_'+tid])){
            $scope.temp['filmLogoModel_'+tid] = [];
        }
    }

    // 竖版海报
    // 保存 file model
    // $scope.storePosterModel = function (tid, poster) {
    //     // console.log('poster=',poster);
    //     if(!angular.isDefined($scope.temp['filmPosterModel_'+tid])){
    //         $scope.temp['filmPosterModel_'+tid] = [];
    //     }
    //     angular.forEach(poster,function(item,index){
    //         // 保存选择的file model
    //         var tip = true;
    //         angular.forEach($scope.temp['filmPosterModel_'+tid],function (o,i) {
    //             if(item.name == o.name){
    //                 tip = false;
    //             }
    //         });
    //         $scope.temp['filmPosterModel_'+tid].push(item);
    //     });
    // }
    // $scope.returnPosterModel = function  (tid) {
    //     return $scope.temp['filmPosterModel_'+tid];
    // }
    // // 初始化 file model
    // $scope.initPosterModel = function (tid) {
    //     if(angular.isDefined($scope.temp['filmPosterModel_'+tid])){
    //         $scope.temp['filmPosterModel_'+tid] = [];
    //     }
    // }

    // 横版海报
    // 保存 file model
    // $scope.storeHorizontalPosterModel = function (tid, horizontalposter) {
    //     console.log('horizontalposter=',horizontalposter);
    //     if(!angular.isDefined($scope.temp['filmHorizontalPosterModel_'+tid])){
    //         $scope.temp['filmHorizontalPosterModel_'+tid] = [];
    //     }
    //     angular.forEach(horizontalposter,function(item,index){
    //         // 保存选择的file model
    //         var tip = true;
    //         angular.forEach($scope.temp['filmHorizontalPosterModel_'+tid],function (o,i) {
    //             if(item.name == o.name){
    //                 tip = false;
    //             }
    //         });
    //         $scope.temp['filmHorizontalPosterModel_'+tid].push(item);
    //     });
    //     console.log($scope.temp['filmHorizontalPosterModel_'+tid]);
    // }
    // $scope.returnHorizontalPosterModel = function  (tid) {
    //     return $scope.temp['filmHorizontalPosterModel_'+tid];
    // }
    // // 初始化 file model
    // $scope.initHorizontalPosterModel = function (tid) {
    //     if(angular.isDefined($scope.temp['filmHorizontalPosterModel_'+tid])){
    //         $scope.temp['filmHorizontalPosterModel_'+tid] = [];
    //     }
    // }


    // 单张 横版海报
    // 删除上传图片 标志
    $scope.delHorizontalPoster = function (tid) {
        $scope.temp['delHorizontalPoster_'+tid] = true;
    }
    // 初始化 删除上传图片 标志
    $scope.initDelHorizontalPoster = function (tid) {
        $scope.temp['delHorizontalPoster_'+tid] = false;
    }
    // 删除 原有图片 标志
    $scope.delOriHorizontalPoster = function (tid) {
        $scope.temp['delOriHorizontalPoster_'+tid] = true;
    }
    $scope.initDelOriHorizontalPoster = function (tid) {
        $scope.temp['delOriHorizontalPoster_'+tid] = false;
    }

    // 单张 竖版海报
    // 删除上传图片 标志
    $scope.delPoster = function (tid) {
        $scope.temp['delPoster_'+tid] = true;
    }
    // 初始化 删除上传图片 标志
    $scope.initDelPoster = function (tid) {
        $scope.temp['delPoster_'+tid] = false;
    }
    // 删除 原有图片 标志
    $scope.delOriPoster = function (tid) {
        $scope.temp['delOriPoster_'+tid] = true;
    }
    $scope.initDelOriPoster = function (tid) {
        $scope.temp['delOriPoster_'+tid] = false;
    }

    /* 
    * 修改影片
    * by qianhaoqing
    */
    $scope.editFilm = function (tid, e, logofile, posterfile, horizontalposterfile) {
        // 保存editTabId
        $scope.storeEditTabId(e.currentTarget.filmUniqueId.value);
        
        $scope.toggle.editFilm.setLoading();
        // $scope.initAlert();
        $scope.status.alert = false;
        $scope.msg.alert = "正在操作";
        $scope.openTip("tips.html");

        var _files = [];
        var _dataName =[];

        var _p ={
            oriFilmUniqueId: e.currentTarget.filmUniqueId.value,
            filmUniqueId: e.currentTarget.filmUniqueId.value,
            filmName: e.currentTarget.filmName.value,
            shortNameCh: e.currentTarget.shortNameCh.value,
            shortNameEn: e.currentTarget.shortNameEn.value,
            showStatus: e.currentTarget.showStatus.value,
            isShow: e.currentTarget.isShow.value,
            filmType: e.currentTarget.filmType.value,
            duration: e.currentTarget.duration.value,
            language: e.currentTarget.language.value,
            releaseVersion: e.currentTarget.releaseVersion.value,
            country: e.currentTarget.country.value,
            distributor: e.currentTarget.distributor.value,
            director: e.currentTarget.director.value,
            mainactor: e.currentTarget.mainactor.value,
            filmLogos: '',
            posters: '',
            // deletedFilmLogos:'',
            // deletedFilmPosters:'',
            introduction: e.currentTarget.introduction.value,
            beginDateStr: e.currentTarget.beginDateStr.value,
            // logoFile: '',
            // posterFile: '',
            // 排序
            orderBy: e.currentTarget.orderBy.value,
        };
        //一句点评
        if(e.currentTarget.highlight.value !== ""){
            if(e.currentTarget.highlight.value.length > 20) {
                $scope.msg.alert = "一句点评字数不能超过20个字符！";
                $scope.toggle.editFilm.setFail();
                return;
            }else{
                _p.highlight = e.currentTarget.highlight.value;
            }
        }
        if(e.currentTarget.rating.value !== ""){
            var f = Number(e.currentTarget.rating.value);;
             if(f< 0.1 || f > 10) {
                $scope.msg.alert = "评分只能在1.0至10.0之间！";
                $scope.toggle.editFilm.setFail();
                return;
             } else {
                _p.rating = f;
             }
        }else{
            _p.rating = "";
        }
        if(e.currentTarget.orderBy.value != ""){
            _p.orderBy = Number(e.currentTarget.orderBy.value);
        }


        // 删除图片
        if(angular.isDefined($scope.temp['deleteFilmLogos_'+tid]) && $scope.temp['deleteFilmLogos_'+tid].length > 0){
            _p.deletedFilmLogos =  $scope.temp['deleteFilmLogos_'+tid].join();
        }
        if(angular.isDefined($scope.temp['deleteFilmPosters_'+tid]) && $scope.temp['deleteFilmPosters_'+tid].length > 0){
            _p.deletedFilmPosters =  $scope.temp['deleteFilmPosters_'+tid].join();
        }
        // 单张竖版海报-如果原本有图片并没有删除，则保存
        if(e.currentTarget.poster && angular.isDefined($scope.temp['delOriPoster_'+tid]) && !$scope.temp['delOriPoster_'+tid]){
            // _p.poster = e.currentTarget.poster.value;
        }else {
            // 删除
            _p.poster = '';
        }
        // 单张横版海报-如果原本有图片并没有删除，则保存
        if(e.currentTarget.horizontalPoster && angular.isDefined($scope.temp['delOriHorizontalPoster_'+tid]) && !$scope.temp['delOriHorizontalPoster_'+tid]){
            // _p.horizontalPoster = e.currentTarget.horizontalPoster.value;
        }else {
            // 删除
            _p.horizontalPoster = '';
        }
        // store _files
        var goOn = true;
        // 替换
        if(angular.isDefined($scope.temp['filmLogoModel_'+tid])){
            var logofile = $scope.temp['filmLogoModel_'+tid];
        }
        // if(angular.isDefined($scope.temp['filmPosterModel_'+tid])){
        //     var posterfile = $scope.temp['filmPosterModel_'+tid];
        // }
        // if(angular.isDefined($scope.temp['filmHorizontalPosterModel_'+tid])){
        //     var horizontalposterfile = $scope.temp['filmHorizontalPosterModel_'+tid];
        // }
        if (angular.isDefined(logofile)) {
            angular.forEach(logofile,function  (item, index) {
                _files.push(item);
                _dataName.push('logoFiles');
                // 图片大小限制
                if(item.$error == 'maxSize'){
                    $scope.msg.alert = "影片剧照大小超过限制！";
                    $scope.toggle.editFilm.setFail();
                    // return ;
                    goOn = false;
                }
            });
        }
        if(!goOn){
            return ;
        }
        // if (angular.isDefined(posterfile)) {
        //     angular.forEach(posterfile,function  (item, index) {
        //          _files.push(item);
        //         _dataName.push('posterFile');
        //          // 图片大小限制
        //         if(item.$error == 'maxSize'){
        //             $scope.msg.alert = "竖版海报大小超过限制！";
        //             $scope.toggle.editFilm.setFail();
        //             // return ;
        //             goOn = false;
        //         }
        //     });
        // }
        // if(!goOn){
        //     return ;
        // }
        if(posterfile !== null && posterfile !== '' && posterfile !== undefined && !$scope.temp['delPoster_'+tid]) {
            // 图片大小限制
            if(posterfile.$error == 'maxSize'){
                $scope.msg.alert = "竖版海报大小超过限制！";
                $scope.toggle.editFilm.setFail();
                return ;
            }
            // 符合则。。。
            _files.push(posterfile);
            _dataName.push('posterFile');
        }
        // if (angular.isDefined(horizontalposterfile)) {
        //     angular.forEach(horizontalposterfile,function  (item, index) {
        //          _files.push(item);
        //         _dataName.push('horizontalPoster');
        //          // 图片大小限制
        //         if(item.$error == 'maxSize'){
        //             $scope.msg.alert = "横版海报大小超过限制！";
        //             $scope.toggle.editFilm.setFail();
        //             // return ;
        //             goOn = false;
        //         }
        //     });
        // }
        // if(!goOn){
        //     return ;
        // }
        if(horizontalposterfile !== null && horizontalposterfile !== '' && horizontalposterfile !== undefined && !$scope.temp['delHorizontalPoster_'+tid]) {
            // 图片大小限制
            if(horizontalposterfile.$error == 'maxSize'){
                $scope.msg.alert = "横版海报大小超过限制！";
                $scope.toggle.editFilm.setFail();
                return ;
            }
            // 符合则。。。
            _files.push(horizontalposterfile);
            _dataName.push('horizontalPosterFile');
        }
        // console.log('_files=',_files);
        // console.log('_dataName=',_dataName);
        // console.log(_p);
        // return ;

        // 图片上传
        if ((logofile !== null && logofile !== '' && logofile !== undefined) || (posterfile !== null && posterfile !== '' && posterfile !== undefined) || (horizontalposterfile !== null && horizontalposterfile !== '' && horizontalposterfile !== undefined && !$scope.temp['delHorizontalPoster_'+tid])) {
            _files.upload = Upload.upload({
                url: $scope.$storage.path + '/film/oper/edit',
                method: 'POST',
                fields: _p,
                file: _files,
                fileFormDataName: _dataName
            });

            _files.upload.then(function(response) {

                var _r = response.data;

                if (angular.equals(_r.code, 'ok')) {
                    $scope.toggle.editFilm.setSuccess();
                    $scope.msg.alert = "保存成功！";
                    $scope.status.alert = true;
                }else {
                    $scope.toggle.editFilm.setFail();
                    $scope.msg.alert = "保存失败！"+ _r.message;
                }
                $scope.msg.editFilm = _r.message;

                // $timeout(function() {
                    _files.result = response.data;
                // });

            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            _files.upload.progress(function(evt) {
                _files.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

            _files.upload.xhr(function(xhr) {
                xhr.upload.addEventListener('abort', function(){
                    // console.log('abort complete')
                }, false);
            });
        } else {
            gpservice.postservice($scope.$storage.path,'film/oper/edit', _p).then(function (response) {
                var _r = response; 
                if (angular.equals(_r.code, 'ok')) {
                    $scope.toggle.editFilm.setSuccess();
                    $scope.msg.alert = "保存成功！";
                    $scope.status.alert = true;
                }else {
                    $scope.toggle.editFilm.setFail();
                    $scope.msg.alert = "保存失败！"+ _r.message;
                }
                $scope.msg.editFilm = _r.message;
            });
        }
    };


    /*
    *  删除影片
    *
    */
    $scope.deleteFilm = function (filmUniqueId) {
        $scope.toggle.deleteFilm.setLoading();
        // $scope.initAlert();
        $scope.status.alert = false;
        $scope.msg.alert = "正在操作";
        $scope.openTip("tips.html");

        var _p ={
            filmUniqueId:filmUniqueId,
        };
        gpservice.postservice($scope.$storage.path,'film/oper/delete',_p).then(function (response){
            var _r = response; 
            if (angular.equals(_r.code, 'ok')) {
                $scope.toggle.deleteFilm.setSuccess();
                $scope.msg.alert = "删除成功！";
                $scope.status.alert = true;
            }else {
                $scope.toggle.deleteFilm.setFail();
                $scope.msg.alert = "删除失败！"+ _r.message;
            }
            $scope.msg.deleteFilm = _r.message;
        });
    }


    $scope.setFilmDelete = function (isRelative,name,uniqueId) {
        $scope.temp.filmDelete_isRelative = isRelative;
        $scope.temp.filmDelete_filmName = name;
        $scope.temp.filmDelete_filmUniqueId = uniqueId;
    }


    /*
    * 影片-手工关联获取列表
    * by qianhaoqing
    */

    $scope.getFilmListNotRelative = function (isPaging) {
        $scope.toggle.getFilmListNotRelative.setLoading();
        var _p ={
            pageNo: $scope.page.filmNotRelativePageNo,
            pageSize: $scope.$storage.currentPageItem,
            t: new Date().getTime(),
        };
        if($scope.search.filmRelativeFilmName){
            _p.filmName =$scope.search.filmRelativeFilmName;
        }

        // 如果是分页，则取上一次参数lastParams；如果是搜索，才入新参
        if(isPaging == 'paging'){
            _p = $scope.temp.lastParams;
            _p.pageNo = $scope.page.filmNotRelativePageNo;
        }else{ // 搜索、刷新则重置页码为1
            $scope.page.filmNotRelativePageNo = 1;
            _p.pageNo = $scope.page.filmNotRelativePageNo;
        }
       
        // 保存参数
        $scope.temp.lastParams = _p;

        gpservice.getservice($scope.$storage.path,'/film/oper/getYkseFilmList',_p).then(function (response){
            var _r = response; 
            if (angular.equals(_r.code, 'ok')) {
                $scope.toggle.getFilmListNotRelative.setSuccess();
                var _data = response.data.data;
                var _page = response.data.page;
                $scope.mc.filmNotRelativeList = _data;
                $scope.mc.notRelativeTotalCount = _page.totalRecord;
                $scope.mc.notRelativeTotalPage = _page.totalPage;
            }else {
                $scope.toggle.getFilmListNotRelative.setFail();

            }
            $scope.msg.getFilmListNotRelative = _r.message;
        });
    }

    $scope.setFilmNotRelativeChangePage = function () {
        $scope.page.filmNotRelativePageNo = $scope.page.filmNotRelativePageNoChange;
    }


    /*
    *  影片查看关联关系-获取列表
    *
    */
    $scope.getFilmListRelative = function(filmUniqueId) {
        $scope.toggle.getFilmListRelative.setLoading();
        var _p ={
           filmUniqueId:filmUniqueId,
           t: new Date().getTime(),
           // fixedId: fixedId
        };
        gpservice.getservice($scope.$storage.path,'/film/oper/getYkseFilm',_p).then(function (response){
            var _r = response; 
            if (angular.equals(_r.code, 'ok')) {
                $scope.toggle.getFilmListRelative.setSuccess();
                 var _data = response.data;
                $scope.mc.filmRelativeList = _data;
            }else {
                $scope.toggle.getFilmListRelative.setFail();
            }
            $scope.msg.getFilmListRelative = _r.message;
        });
    }

    /*
    * 保存关联
    *
    */
    $scope.relateFilm = function (filmUniqueId) {
        $scope.toggle.relateFilm.setLoading();
        // $scope.initAlert();
        $scope.status.alert = false;
        $scope.msg.alert = "正在操作";
        $scope.openTip("tips.html");
        // var _ids = [];
        var group = $(".relative-table tbody tr input[type='radio']:checked");
        // angular.forEach(group,function (item,index) {
        //     var l = item.value;
        //     _ids.push(l);
        // });
        if(group.length == 0) {
            $scope.toggle.relateFilm.setFail();
            $scope.msg.alert = "请选择关联影片！";
            return ;
        }
        
        var _p ={
            filmUniqueId: filmUniqueId,
            // filmStandardCodeList:_ids.join()
            fixedId: group[0].value,
        };
        gpservice.postservice($scope.$storage.path,'film/oper/relate',_p).then(function (response){
            var _r = response; 
            if (angular.equals(_r.code, 'ok')) {
                $scope.toggle.relateFilm.setSuccess();
                // console.log('relateFilm ok');
                $scope.msg.alert = "保存成功！";
                $scope.status.alert = true;
            }else {
                $scope.toggle.relateFilm.setFail();
                $scope.msg.alert = "保存失败！"+ _r.message;
            }
            $scope.msg.relateFilm = _r.message;
        });
    }

    // 设关联影片的 filmUniqueId
    $scope.setRelateFilm = function (uni,name) {
        $scope.temp.relateFilm_filmUniqueId = uni;
        $scope.temp.relateFilm_filmName = name;
        // console.log(uni,name);
    }

    // 查看关联关系
    $scope.setShowRelateFilm = function (uni,name) {
        $scope.temp.showRelateFilm_filmUniqueId = uni;
        $scope.temp.showRelateFilm_filmName = name;
        // console.log(uni,name);
    }
    
    /*
    * 解除关联关系
    *
    */
    $scope.unboundFilm = function (filmUniqueId) {
        $scope.toggle.unboundFilm.setLoading();
        // $scope.initAlert();
        $scope.status.alert = false;
        $scope.msg.alert = "正在操作";
        $scope.openTip("tips.html");
        // var _ids = [];
        // var group = $(".showRelative-table tbody tr input[type='checkbox']:checked");
        // angular.forEach(group,function (item,index) {
        //     var l = item.value;
        //     _ids.push(l);
        // });
        var _p ={
            filmUniqueId: filmUniqueId,
            // filmStandardCodeList:_ids.join()
        };
        gpservice.postservice($scope.$storage.path,'film/oper/unbound',_p).then(function (response){
            var _r = response; 
            if (angular.equals(_r.code, 'ok')) {
                $scope.toggle.unboundFilm.setSuccess();
                // console.log('unboundFilm ok');
                $scope.msg.alert = "保存成功！";
                $scope.status.alert = true;
            }else {
                $scope.toggle.unboundFilm.setFail();
                $scope.msg.alert = "保存失败！"+ _r.message;
            }
            $scope.msg.unboundFilm = _r.message;
        });
    }


};
