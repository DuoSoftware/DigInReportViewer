/**
 * Created by Damith on 5/9/2016.
 */

'use strict'
mainApp.controller('reportCtrl', function ($rootScope, $scope,
                                           $state, config, dynamicallyReportSrv, $window, $location, $anchorScroll) {

    //server request handler
    $scope.isReportLoading = false;
    var serverReq = {
        reqParameter: {
            apiBase: config.Digin_Engine_API,
            tomCatBase: config.apiTomcatBase,
            token: '',
            reportName: '',
            queryFiled: ''
        },
        getToken: function() {
            var _st = "";
            var nameEQ = "securityToken=";
            var ca = document.cookie.split(';');
            //get the tenant security token
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0){
                    _st = c.substring(nameEQ.length, c.length);
                }
            }
            return _st;
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
            this.reqParameter.token = serverReq.getToken(); 
            var rep = [];
            $scope.isReportLoading = true;
            dynamicallyReportSrv.getAllReports(this.reqParameter).success(function (data) {
                if (data.Is_Success) {
                    for (var i = 0; i < data.Result.length; i++) {
                        if ( data.Result[i].compType == "Report"){
                            rep.push(data.Result[i].compName);
                            }
                        }
                    if ( rep.length > 0 ){
                        callBack(rep);
                    } else {
                        callBack(null);
                    }
                }
                else{
                    callBack(null);
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
        //$window.scrollTo(0, angular.element(document.getElementById('top')).offsetTop);
         //$window.scrollTo(0, 0);
         $location.hash('bottom');
         $anchorScroll();
    };


});


