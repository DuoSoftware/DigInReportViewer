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
    appVersion: 1.3,
    apiReportBase: 'http://192.168.2.191:8080/',
    apiPostgreSql: 'http://192.168.2.191:8080/',
    apiTomcatBase: 'http://192.168.2.191:9897/',
    Digin_Engine_API: 'http://digin.cloudcharge.com:1929/',
    storeIndex: 'com.duosoftware.com'
});

mainApp.run(function(config,dynamicallyReportSrv) {
    var reqParameter = {
        apiBase: config.Digin_Engine_API,
        _st: ""
    };
    var nameEQ = "securityToken=";
    var ca = document.cookie.split(';');
    //get the tenant security token
    debugger;
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0){
            reqParameter._st = c.substring(nameEQ.length, c.length);
        }
        // else {
        //     reqParameter._st = "0245f75d3b4a81adde95e76b1e16125a"; //"78d2a5c15ea3254f273e437f49f2f3c9 111fe78c80a113b62910f95dae524c31";
        // }
    }
    //Find if tenant has logged in
    dynamicallyReportSrv.get_tenant_status(reqParameter).success(function (res) {
        if (res.Is_Success){
            //If tenant has not logged in (Tenant record is not present) , initialize the tenant
            if ( res.Custom_Message == "No user settings saved for given user and domain"){
                dynamicallyReportSrv.initialize_tenant(reqParameter).success(function(res) {
                    if (res.Is_Success){
                        console.log("initialized");
                    }
                    else{
                        console.log("Not initialized");
                    }
                }).error(function (res){
                    console.log("Not initialized");
                });
            }
        }   
    }).error(function (res) {
        console.log("Error!");
    });

});