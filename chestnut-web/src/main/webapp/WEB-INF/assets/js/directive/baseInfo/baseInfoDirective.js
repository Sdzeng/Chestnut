// _directive.directive('freshwindow', ['$timeout',function($timeout){ // 刷新页面  by:qianhaoqing
//     return {
//         restrict: 'A',
//         link: function($scope, iElm, iAttrs, controller) {
//             $timeout(function () {
//                 window.location.reload();
//             },100);
            
//             // console.log('freshwindow...');
//         }
//     };
// }]);
_directive.directive('deleteTag', [function(){ // 删除tag,不是tab,要点击 by qianhaoqing
    return {
        restrict: 'A',
        // controller:'cinemaGroupCtrl',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function () {
                iElm.closest('.tag').remove();
            });
        }
    };
}]);

_directive.directive('deleteTagNoclick', [function(){ // 删除tag,不是tab,不用点击 by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.closest('.tag').remove();
        }
    };
}]);


_directive.directive('radioListPrev', ['$timeout', function ($timeout){ // radio组指令--样式 by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            // 初始赋值
            var _m = iElm.closest(".radio-list").prev("input").val();
            var _s = iElm.val();
            // console.log(_m,_s);
            if(_m == _s) {
                iElm.prop('checked', true).addClass('checked').siblings().addClass('checked');
            }
            // 点击事件
            iElm.click(function () {
                if (iElm.is(':checked')) {
                    iElm.closest(".radio-list").find("input[type='radio']").prop('checked', false).removeClass('checked').siblings('.t-radio').removeClass('checked');
                    iElm.prop('checked', true).addClass('checked').siblings().addClass('checked');
                }else{
                    iElm.prop('checked', false).removeClass('checked').siblings().removeClass('checked');
                }
                // 赋值
                var value = iElm.closest(".radio-list").find(".radiobox input[type='radio']:checked").val();
                var ojb = iElm.closest(".radio-list").prev("input");
                ojb.val(value);
            });
        }
    };
}]);

_directive.directive('radioSet', ['$timeout', function ($timeout){ // radio组指令-set值 by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var _m = iElm.closest(".radio-list").prev("input").val();
            var _s = iAttrs.radioSet;
            if(_m == _s) {
                iElm.prop('checked', true).addClass('checked').siblings().addClass('checked');
            }
            // 点击事件
            iElm.click(function () {
                if (iElm.is(':checked')) {
                    iElm.closest(".radio-list").find("input[type='radio']").prop('checked', false).removeClass('checked').siblings('.t-radio').removeClass('checked');
                    iElm.prop('checked', true).addClass('checked').siblings().addClass('checked');
                }else{
                    iElm.prop('checked', false).removeClass('checked').siblings().removeClass('checked');
                }
                // 赋值
                var value = iElm.closest(".radio-list").find(".radiobox input[type='radio']:checked").val();
                var ojb = iElm.closest(".radio-list").prev("input");
                ojb.val(value);
            });
        }
    };
}]);

// 影片手工关联，会员卡 等
_directive.directive('tRadio', ['$timeout', function ($timeout){ // radio组指令--样式 by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function () {
                if (iElm.is(':checked')) {
                    iElm.closest(".radio-list").find("input[type='radio']").prop('checked', false).removeClass('checked').siblings('.t-radio').removeClass('checked');
                    iElm.prop('checked', true).addClass('checked').siblings().addClass('checked');
                }else{
                    iElm.prop('checked', false).removeClass('checked').siblings().removeClass('checked');
                }
                
            })
        }
    };
}]);

_directive.directive('textareaContent', [function(){  // 一般详情页给textarea值换行 by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var t = iElm.val();
            if(t){
                t = t.replace(/<br>|<br\/>/g, '\r\n');
            }
            iElm.val(t);

        }
    };
}]);

// 图片上传相关directive
_directive.directive('deleteImg', [function(){ // 删除图片，针对新上传的 by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function () {
                iElm.closest('.img-wrapper').remove();
            });
        }
    };
}]);

_directive.directive('displayImg', [function(){ // 隐藏图片，针对原有的 by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function () {
                iElm.closest('.img-wrapper').attr("style", 'display:none');
            });
        }
    };
}]);

_directive.directive('showImg', [function(){ // 显示图片 by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function () {
                iElm.closest('.form-group').find('.img-wrapper').attr("style", 'display:block');
            });
        }
    };
}]);

_directive.directive('picResize', [function(){ // 重置请求的图片大小 by qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var cndpic = iAttrs.cndpicpath;
            var link = iAttrs.orisrc;
            if(link.indexOf(cndpic)<0){
                var newlink = link.replace(/\?/g,$scope.picResize+'?');
                //添加属性
                iElm.attr("src",newlink);
            }else{
                //添加属性
                iElm.attr("src",link);
            }

            // // 生成or移除悬浮的大图片
            // iElm.mouseover(function () {
            //     var link = iAttrs.orisrc;
            //     var _html = '<img src="'+link+'" name="bigpic" class="img-hover">';
            //     if(iElm.closest('.img-wrapper').next().attr('name') !== 'bigpic'){
            //         iElm.closest('.img-wrapper').after(_html);
            //         var x = iElm.position().top; 
            //         var y = iElm.position().left;
            //         var ojb = iElm.closest('.img-wrapper').next();
            //         ojb.attr('top',x);
            //         ojb.attr('left',y);
            //     }
            // });
            // iElm.mouseout(function () {
            //     if(iElm.closest('.img-wrapper').next().attr('name') == 'bigpic'){
            //         iElm.closest('.img-wrapper').next().remove();
            //     }
            // });
            
        }
    };
}]);

// 刷新页面
// _directive.directive('freshCinemagroupbd', ['$timeout',function($timeout){ // 刷新mc影院组管理列表
//     return {
//         restrict: 'A',
//         link: function($scope, iElm, iAttrs, controller) {
//             $timeout(function () {
//                 $scope.getCinemagroupListBD();
//                 $scope.getCinemagroupName();
//             }, 100);
//         }
//     };
// }]);

// _directive.directive('freshCinema', ['$timeout',function($timeout){ // 刷新影院管理列表
//     return {
//         restrict: 'A',
//         link: function($scope, iElm, iAttrs, controller) {
//             $timeout(function () {
//                 $scope.getCinemaList();
//                 $scope.getJustCity();
//                 $scope.getJustDistrict();
//                 $scope.getCinemaSelectedByCity();
//             }, 100);
//         }
//     };
// }]);

// _directive.directive('freshFilm', ['$timeout',function($timeout){ // 刷新影片管理列表
//     return {
//         restrict: 'A',
//         link: function($scope, iElm, iAttrs, controller) {
//             $timeout(function () {
//                 $scope.getFilmList();
//                 $scope.getFilmNamelist();
//             }, 100);
//         }
//     };
// }]);

// _directive.directive('freshChannel', ['$timeout',function($timeout){ // 刷新bd渠道列表
//     return {
//         restrict: 'A',
//         link: function($scope, iElm, iAttrs, controller) {
//             $timeout(function () {
//                 $scope.getBaseChannelList();
//                 $scope.getChannelNamelist();
//             }, 100);
//         }
//     };
// }]);

// _directive.directive('freshLease', ['$timeout',function($timeout){ // 刷新租户列表
//     return {
//         restrict: 'A',
//         link: function($scope, iElm, iAttrs, controller) {
//             $timeout(function () {
//                 $scope.getLeaseList();
//             }, 100);
//         }
//     };
// }]);

// _directive.directive('freshRegion', ['$timeout',function($timeout){ // 刷新区域列表
//     return {
//         restrict: 'A',
//         link: function($scope, iElm, iAttrs, controller) {
//             $timeout(function () {
//                 $scope.getRegionList();
//             }, 100);
//         }
//     };
// }]);

// _directive.directive('freshSys', ['$timeout',function($timeout){ // 刷新系参列表
//     return {
//         restrict: 'A',
//         link: function($scope, iElm, iAttrs, controller) {
//             $timeout(function () {
//                 $scope.getSysparamList();
//             }, 100);
//         }
//     };
// }]);


_directive.directive('cleanSpelChar', ['$timeout',function($timeout){ // 禁止输入特殊字符  by:qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on('input', function (event) {
                 // 有问题 ^ / \ []需转义， 可输入字符 _ 
                 var txt = new RegExp(/["'`·%;)(&+*!~@￥$#=\^！……,.:;{…}｛｝<>?？、。，；：‘“”’【（）》《——】\[\]|\/\\]/g);
                 if(txt.test(iElm.val())){                    
                    var p = iElm.val().replace(/["'·`%;)(&+*!~@￥$#=\^！……,.:;{…}｛｝<>?？、。，；：‘“”’【（）》《——】\[\]|\/\\]/g,"");
                    iElm.val(p);
                 }
            });
            
            
        }
    };
}]);

_directive.directive('cleanChinese', ['$timeout',function($timeout){ // 禁止输入中文  by:qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on('input', function (event) {
                 // 有问题 ^ / \ []需转义， 可输入字符 _ 
                 var txt = new RegExp(/[\u4E00-\u9FA5]/g);
                 if(txt.test(iElm.val())){                    
                    var p = iElm.val().replace(/[\u4E00-\u9FA5]/g,"");
                    iElm.val(p);
                 }
            });
            
            
        }
    };
}]);

_directive.directive('toBr', ['$timeout',function($timeout){ // 文本换行符变页面换行符<br/>  by:qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var t = iElm.html();
            if(t){
                t = t.replace(/\n|\r|(\r\n)/g, '<br/>');
            }
            iElm.html(t);
        }
    };
}]);

///城市下拉指令
_directive.directive('dropdownHoldon', ['$timeout', function($timeout){    // 城市下拉列表显示不显示                                                                                                              // focus于dropdown menu的搜索框中，不隐藏dropdown menu
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {
            // auto-close="outsideClick" ??
            iElm.click(function () {
                iElm.attr("style", "display: block");
            });
            iElm.mouseover(function () {
                iElm.attr("style", "display: block");
            });
            iElm.mouseout(function () {
                iElm.removeAttr('style');
            });
        }
    };
}]);

_directive.directive('cinemaCheckCity', ['$timeout','$compile', function($timeout, $compile){   // 城市下拉chekbox                                                                                                               // focus于dropdown menu的搜索框中，不隐藏dropdown menu
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function () {
                tree(iElm);
                if(iElm.is(':checked')){
                    var _html = '<div class="tag" id="'+iAttrs.ccode+'">';
                    _html += '<span>'+iAttrs.cname+'</span>';
                    _html += '<span class="tag-close" ccode="'+iAttrs.ccode+'" cname="'+iAttrs.cname+'"></span>';
                    _html += '</div>';
                    // 生成
                    iElm.closest('.dropdown-city').find(".city-tags").append(_html);
                    // 添加指令
                    $compile($("#"+iAttrs.ccode + ' .tag-close')
                        .attr("cinema-delete-tag-city", '')
                    )($scope);

                    // 存放值
                    $scope.setCinemaSearchCity(iAttrs.ccode, iAttrs.cname);
                   
                }else{
                    iElm.closest('.dropdown-city').find("#"+iAttrs.ccode).remove();
                    // 移除值
                    $scope.removeCinemaSearchCity(iAttrs.ccode,iAttrs.cname);
                    
                }
                $scope.$apply();

            });
            
        }
    };
}]);


_directive.directive('cinemaDeleteTagCity', [function(){   // 城市下拉tag 删除，同时unchecked对应的checkbox                                                                                                             // focus于dropdown menu的搜索框中，不隐藏dropdown menu
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function () {
                var _thisTag = iElm.closest('.tag');
                var _thisInput = iElm.closest('.dropdown-city').find('.tab-content-city input[ccode="'+iAttrs.ccode+'"]');
                
                _thisInput.prop("checked", false).removeClass("checked half-checked").siblings(".t-checkbox").removeClass("checked half-checked");

                _thisTag.remove();

                // 移除值
                $scope.removeCinemaSearchCity(iAttrs.ccode,iAttrs.cname);
                
            });
            
        }
    };
}]);

// 影院编辑 指令
_directive.directive('checkDisabled', ['$compile',function($compile){ // 是否disabled input
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.click(function () {
                tree(iElm);
                if(iElm.is(':checked')){
                    iElm.closest('.input-group').find('input[type="text"]').attr('disabled', false);
                }else{
                    iElm.closest('.input-group').find('input[type="text"]').attr('disabled', true).val('');
                }
                $scope.$apply();
            });
        }
    };
}]);


_directive.directive('checkedCheckbox', [function(){ // 勾选checkbox
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            // var t = iElm.val();
            iElm.attr('disabled',false);
            iElm.closest('.input-group').find('input[type="checkbox"]').prop('checked',true).addClass('checked').siblings('.t-checkbox').addClass('checked');

        }
    };
}]);

// 图片轮播 owl-carousel
_directive.directive("picOwl", ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        link: function ($scope, iElm, iAttrs) {
            var _carousel = $scope.$watch("$last", function (v) {
                iElm.parent().owlCarousel({
                 
                      autoPlay: 3000, //Set AutoPlay to 3 seconds
                      items : 5,
                      itemsDesktop : [1199,3],
                      itemsDesktopSmall : [979,3]
                 
                });
               _carousel();
            });
            

        }
    };
}]);


_directive.directive('checkNumOne', ['$timeout',function($timeout){ // input检测只能输入数字，小数点精确到后一位  by:qianhaoqing
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on('keyup', function (event) {
                var $amountInput = $(this);
                //响应鼠标事件，允许左右方向键移动 
                event = window.event || event;
                if (event.keyCode == 37 | event.keyCode == 39) {
                    return;
                }
                //先把非数字的都替换掉，除了数字和. 
                $amountInput.val($amountInput.val().replace(/[^\d.]/g, "").
                //只允许一个小数点 
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后一位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'));
                
            });

            iElm.on('blur', function () {
                var $amountInput = $(this);
                //最后一位是小数点的话，移除
                $amountInput.val(($amountInput.val().replace(/\.$/g, "")));

            });
            
        }
    };
}]);

_directive.directive('intNum', ['$timeout',function($timeout){ // input检测只能输入数字
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on('keyup', function (event) {
                var $amountInput = $(this);
                //响应鼠标事件，允许左右方向键移动 
                event = window.event || event;
                if (event.keyCode == 37 | event.keyCode == 39) {
                    return;
                }
                //先把非数字的都替换掉，
                $amountInput.val($amountInput.val().replace(/[^\d]/g, ""));
                
            });
        }
    };
}]);

_directive.directive('setAccounttype', ['$timeout',function($timeout){ // input检测只能输入数字
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var _val = iAttrs.setAccounttype;
            iElm.on('click', function (event) {
                iElm.parent().parent().parent().find("input[name='accountType']").val(_val)
            });
        }
    };
}]);

_directive.directive('removeExtadd', ['$timeout',function($timeout){ // 影院取消增加字段
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            var tid = iAttrs.removeExtadd;
            if(Boolean($scope.temp['removerExtadd'+tid])){
                iElm.closest('tfoot').remove();
            }
        }
    };
}]);