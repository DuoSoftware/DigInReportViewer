/**
 * Created by Damith on 5/9/2016.
 */

'use strict'
mainApp.controller('reportCtrl', function ($rootScope, $scope,
                                           $state, config, dynamicallyReportSrv, $window) {

    //server request handler
    $scope.isReportLoading = false;
    var serverReq = {
        reqParameter: {
            apiBase: config.apiReportBase,
            tomCatBase: config.apiTomcatBase,
            token: '76e826677144c7ad95b0d36680fc8303',
            reportName: '',
            queryFiled: ''
        },
        startReportServer: function () {
            dynamicallyReportSrv.startReportServer(this.reqParameter).success(function (res) {
                console.log("report server start success...");

            }).error(function (err) {
                //false
                console.log("report server start error...!");
            });
        },
        getAllReports: function (callBack) {
            $scope.isReportLoading = true;
            dynamicallyReportSrv.getAllReports(this.reqParameter).success(function (res) {
                if (res.Is_Success) {
                    callBack(res.Result);
                }
            }).error(function (err) {
                callBack(null);
                console.log("error get report layout..");
            });

        }

    };//end

    $scope.reports = [];
    serverReq.startReportServer();
    function getAllReport() {
        $scope.reports = [];
        serverReq.getAllReports(function (resp) {
            $scope.isReportLoading = false;
            if ($scope.reports == null) {
                return;
            }
            $scope.reports = resp;
        });
    }

    getAllReport();

    //click event
    //go to filter
    $scope.clickGoToFilter = function (reportName) {
        $state.go('reportFilter', {'reportNme': reportName});
    };

    //refresh reports view
    $scope.refresh = function () {
        $scope.searchReport = "";        
        getAllReport();
    }

    //go to page up
    $scope.goToTop = function () {
        $window.scrollTo(0, angular.element(document.getElementById('top')).offsetTop);
        // $window.scrollTo(0, 0);
    };


});


