/**
* akApp Module
*
* Description
*/
// 'use strict';

//config
angular.module('router', ['ngRoute'])
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);   //在设置route的时候,开启HTML5模式.
  }
]);

var app=angular.module('ycApp',[]);

