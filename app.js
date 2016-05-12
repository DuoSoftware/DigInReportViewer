/**
 * Created by Damith on 5/9/2016.
 */

'use strict';

var mainApp = angular.module('diginReportApp', ['ngAnimate', 'ngMaterial', 'ui.router', 'ngToast']);


mainApp.config(["$httpProvider", "$stateProvider", "$urlRouterProvider",
    function ($httpProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/report');
        $stateProvider
            .state("report", {
                url: "/report",
                templateUrl: "views/report-view.html"
            }).state("reportFilter", {
            url: "/report-filter?reportNme",
            templateUrl: "views/report-filter-view.html"
        });
    }]);


//app common config details
mainApp.constant('config', {
    appName: 'diginReportViwer',
    appVersion: 1.0,
    apiReportBase: 'http://192.168.2.33:8080/',
    apiPostgreSql: 'http://192.168.2.33:8080/',
    apiTomcatBase: 'http://192.168.2.33:9898/',
    storeIndex: 'com.duosoftware.com'
});