/**
 * Created by Damith on 5/9/2016.
 */

'use strict';

var mainApp = angular.module('diginReportApp', ['ngAnimate', 'ngMaterial','ui.router']);


mainApp.config(["$httpProvider", "$stateProvider", "$urlRouterProvider",
    function ($httpProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/report');
        $stateProvider
            .state("report", {
                url: "/report",
                templateUrl: "views/report-view.html"
            });
    }]);