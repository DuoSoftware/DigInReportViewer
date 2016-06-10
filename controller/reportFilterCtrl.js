/**
 * Created by Damith on 2/24/2016.
 */

mainApp.controller('reportFilterCtrl', function ($scope, dynamicallyReportSrv, config,
                                                 ngToast, $stateParams, $sce, $state,$mdToast) {


    $scope.isFiled = {
        loading: false,
        found: false
    };

    //back to home
    $scope.onClickBack = function () {
        $state.go('report');
    };

    //#event handler
    //report event handler
    $scope.reportName = null;
    var eventHandler = {
        reportName: '',
        isReportLoad: false,
        isFiled: {
            loading: false,
            found: false
        },
        error: {
            isGetError: false,
            msg: ''
        },
        isFiledData: false,
        isDataFound: true
    };
    $scope.eventHandler = eventHandler;
    //end

    //#report filed
    //report data
    var reportFiledList = {
        UIDate: [],
        currentDateFiledName: [],
        loader: [],
        UITextBox: [],
        UIDropDown: [],
        UIElement: [],
        selectedDrpFiled: [],
        selectedDate: [],
        isDateFound: false,
        isDropDownFound: false,
        fromDate: '',
        toDate: '',
        cafDate: '',
        tags: [
            {id: 0, name: "SKY"},
            {id: 1, name: "SKY2"}],
        customerNames: [
            {id: 0, name: 'RAJESWARI N'},
            {id: 1, name: 'CHANDRASEKAR K'},
            {id: 2, name: 'ANITHA B'},
            {id: 3, name: 'ANANDALATCHOUMY S'},
            {id: 4, name: 'ANURADHA R'},
            {id: 5, name: 'VENKATESAN A'},
            {id: 6, name: 'MURUGESAN S'},
            {id: 7, name: 'GANESAN S'},
            {id: 8, name: 'THIRUMANGAI G'}
        ]
    };
    $scope.reportFiledList = reportFiledList;
    var localStorage = [];

    //#private function
    //controller private function
    var privateFun = (function () {
        return {
            fireMsg: function (msgType, content) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(content)
                    .position('top right')
                    .hideDelay(3000));
            },
            capitalise: function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            },
            waitLoadingFiled: function (filedName) {
                $scope.eventHandler.isFiledData = true;
                // $scope.isFiled.found = false;
                $scope.filedName = filedName;
            }
            ,
            doneLoadedFiled: function () {
                $scope.eventHandler.isFiledData = false;
                // $scope.eventHandler.isDataFound = false;
                // $scope.isFiled.found = true;
            }
            ,
            waitParameterRender: function () {
                $scope.isFiled.loading = true;
                $scope.isFiled.found = false;
                $scope.eventHandler.error.isGetError = false;
            }
            ,
            doneParameterRender: function () {
                $scope.isFiled.loading = false;
                $scope.isFiled.found = true;
                $scope.eventHandler.error.isGetError = false;
            }
            ,
            gotParameterRenderError: function () {
                $scope.isFiled.loading = false;
                $scope.eventHandler.error.isGetError = true;
            },
            clearAllUI: function () {
                $scope.reportFiledList.UIDate = [];
                $scope.reportFiledList.UITextBox = [];
                $scope.reportFiledList.UIDropDown = [];
                $scope.reportFiledList.selectedDrpFiled = [];
                $scope.reportFiledList.selectedDate = [];
            },
            doneReportLoad: function () {
                $scope.eventHandler = {
                    isDataFound: false,
                    isReportLoad: false,
                    isFiled: {
                        loading: false,
                        found: true
                    },
                    error: {
                        isGetError: false
                    }
                }
                $scope.reportFldLoading = false;

            },
            clearIframe: function () {
                $scope.eventHandler.isDataFound = true;
                $scope.eventHandler.isReportLoad = false;
                $scope.reportURL = $sce.trustAsResourceUrl('');
                var frame = $('#reportFram').get(0);
                var frameDoc = frame.contentDocument || frame.contentWindow.document;
                frameDoc.getElementsByTagName('body')[0].innerHTML = "";
            },
            getNumberOfMonth: function (month) {
                switch (month.toLowerCase()) {
                    case "january":
                        return '01';
                        break;
                    case "february":
                        return '02';
                        break;
                    case "march":
                        return '03';
                        break;
                    case "april":
                        return '04';
                        break;
                    case "may":
                        return '05';
                        break;
                    case "june":
                        return '06';
                        break;
                    case "july":
                        return '07';
                        break;
                    case "august":
                        return '08';
                        break;
                    case "september":
                        return '09';
                        break;
                    case "october":
                        return '10';
                        break;
                    case "november":
                        return '11';
                        break;
                    case "december":
                        return '12';
                        break;
                    case "all":
                        return '00';
                        break;
                }
            }
        }
    })();
    //end

    //#oncreate #report
    $scope.onCreateReport = function () {
        serverRequest.reportCreate();
    };


    //#dropDown change selected
    //drop down on change event select
    $scope.onChangeSelected = function (val, filedName) {
        //  var select_value = e.options[e.selectedIndex].text;
        // var select_value = filedName;

        //this function work on filedname must need month or months
        //get number of month
        var select_value = null;
        if (filedName == 'month' || filedName == "months" || filedName == "Months" || filedName == "Month") {
            select_value = privateFun.getNumberOfMonth(val);
        }
        else {
            select_value = val;
        }


        var currentVal = {
            data: $scope.reportFiledList.selectedDrpFiled,
            length: $scope.reportFiledList.selectedDrpFiled.length,
            filedName: filedName,
            value: select_value
        };

        var currentFiledAry = $scope.reportFiledList.selectedDrpFiled;
        for (var i = 0; i < currentFiledAry.length; i++) {
            if (currentFiledAry[i].filedName == currentVal.filedName) {
                $scope.reportFiledList.selectedDrpFiled[i].value = currentVal.value;
            }
        }

        var executeQueryAry = $scope.executeQueryAry;
        var findIndex = 0;
        for (var loop = 0; loop < executeQueryAry.length; loop++) {
            if (executeQueryAry[loop].ParamName == filedName) {
                findIndex = loop;
                findIndex++;
            }
        }

        //check next query isHierarchy
        //then true execute query
        if (findIndex < executeQueryAry.length) {
            if (executeQueryAry[findIndex].isHierarchy) {
                executeQryHandler.executeNextQuery(filedName, currentVal.value, findIndex);
            }
        }
    };//end

//#refresh
//refresh all data
    $scope.onClickRefresh = function () {
        privateFun.clearIframe();
        $scope.reportFiledList.selectedDate = [];        
        //serverRequest.getReportUIFromServer(eventHandler);
                $("md-select").val("");
               /* $('.datep').val("");
                var selDrpDwnObj = $scope.reportFiledList.selectedDrpFiled;
                $scope.reportFiledList.selectedDate = [];
                for (var loop = 0; loop < selDrpDwnObj.length; loop++) {
                    $scope.reportFiledList.selectedDrpFiled[loop].value = "";
                }*/
    };

//#onclick cancel filed load
    $scope.onClickStLoading = function () {
        privateFun.doneLoadedFiled();
    };


//#server request
//Main function
    var serverRequest = (function () {
        var reqParameter = {
            apiBase: config.apiReportBase,
            reportServer: config.apiPostgreSql,
            tomCatBase: config.apiTomcatBase,
            token: '76e826677144c7ad95b0d36680fc8303',
            reportName: '',
            queryFiled: '',
            rptParameter: ''

        };
        var getSession = function () {
            // reqParameter.token = '1290a2d5369b69ac6e82d63a7ae4901' //getCookie("securityToken");
        };
        var getReportName = function () {
            var reportName = $stateParams['reportNme'];
            if (reportName == null || reportName == '') {
                alert('invalid report name');
            } else {
                reqParameter.reportName = reportName;
                $scope.eventHandler.reportName = reportName;

            }
        };
        //get queries
        var getQueries = function (reqParameter, response) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    response({'code': xhttp.status, 'data': xhttp.responseText});
                } else {
                    response({'code': xhttp.status, 'data': xhttp.responseText});
                }
            };
            xhttp.open("GET", reqParameter.apiBase + 'getQueries?SecurityToken=' + reqParameter.token +
                '&Domain=duosoftware.com&Reportname=' + reqParameter.reportName +
                '&fieldnames={' + reqParameter.queryFiled + '}', true);
            xhttp.send();
        };

        //Execute query
        var getExecuteQuery = function (queryString, length, data) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        data({'code': 200, 'length': length - 1, 'data': xhr.response});
                    } else {
                        console.error("XHR didn't work: ", xhr.status);
                        data({'code': xhr.status, 'data': xhr.status});
                    }
                }
            };
            xhr.ontimeout = function () {
                console.error("request timedout: ", xhr);
                data({'code': 500, 'data': 'request timedout'});
            };
            xhr.open("GET", config.apiPostgreSql + "executeQuery?query=" + encodeURIComponent(queryString) + "&SecurityToken=" + reqParameter.token + "" +
                "&Domain=duosoftware.com&db=PostgreSQL", /*async*/ true);
            xhr.send();
        };


        var bindingToData = function (res, filedName, list, length) {
            if (res.code == 200) {
                switch (list) {
                    case 'dropDown':
                        reportFiledList.UIDropDown[length].data.push(
                            res.data.Result
                        );
                        break;
                }
            }
        };
        return {
            getExecuteQuery: function (queryString, length, data) {
                return getExecuteQuery(queryString, length, data);
            },
            getReportName: function () {
                return getReportName();
            },
            getReportUIFromServer: function (eventHandler) {
                getReportName();
                getSession();
                privateFun.clearAllUI();
                privateFun.waitParameterRender();
                dynamicallyReportSrv.getReportUI(reqParameter).success(function (data) {
                    privateFun.doneParameterRender();
                    //store data in a local storage for refresh purpose
                    localStorage = data;                    
                    var loop = 0;
                    for (var d in data) {
                        if (Object.prototype.hasOwnProperty.call(data, d)) {
                            console.log(typeof(data));
                            var val = data[d];

                            //get filed data
                            var dynObject = {
                                query: val.Query,
                                label: val.Fieldname,
                                fieldname: val.Fieldname,
                                isHierarchy: val.isHierarchy,
                                ParamName: val.ParamName,
                                data: []
                            };

                            $scope.reportFiledList.selectedDrpFiled.push({
                                'filedName': dynObject.fieldname,
                                'value': '',
                                'label': dynObject.label,
                                'isHierarchy': dynObject.isHierarchy,
                                'ParamName': dynObject.ParamName
                            });

                            angular.forEach(val, function (value, key) {
                                var executeQueryAryObj = {
                                    id: '',
                                    filedName: '',
                                    query: '',
                                    label: '',
                                    state: false,
                                    isHierarchy: val.isHierarchy,
                                    ParamName: val.ParamName
                                };

                                switch (value) {
                                    case 'datepicker':
                                        reportFiledList.UIDate.push(dynObject);
                                        reportFiledList.currentDateFiledName.push(dynObject.fieldname);
                                        reportFiledList.isDateFound = true;
                                        break;
                                    case 'dropdown':
                                        loop++;
                                        reportFiledList.UIDropDown.push(dynObject);
                                        reportFiledList.isDropDownFound = true;

                                        length = reportFiledList.UIDropDown.length;

                                        executeQueryAryObj.id = loop;
                                        executeQueryAryObj.filedName = val.Label.toLowerCase();
                                        executeQueryAryObj.query = val.Query;
                                        $scope.executeQueryAry.push(executeQueryAryObj);


                                        //privateFun.waitLoadingFiled(val.Label.toLowerCase());
                                        var loaderIndex = 0;
                                        for (var l = 0; l < reportFiledList.UIDropDown.length; l++) {
                                            if (reportFiledList.UIDropDown[l].ParamName == val.ParamName) {
                                                loaderIndex = l;
                                                reportFiledList.UIDropDown[l].loader = true;
                                                l = reportFiledList.UIDropDown.length;
                                            }
                                        }
                                        getExecuteQuery(val.Query, length, function (res) {
                                            if (res.data == 500) {
                                                privateFun.fireMsg('0', 'Error 500 :' +
                                                    ' Report filed load error...');
                                                $scope.$apply(function () {
                                                    $scope.reportFiledList.UIDropDown[loaderIndex].loader = false;
                                                });
                                                return;
                                            }
                                            var jsonObj = JSON.parse(res.data);
                                            var filed = [];
                                            privateFun.doneLoadedFiled();
                                            for (var c in jsonObj.Result) {
                                                if (Object.prototype.hasOwnProperty.call(jsonObj.Result, c)) {
                                                    val = jsonObj.Result[c];
                                                    angular.forEach(val, function (value, key) {
                                                        if (key == "value") {
                                                            if (value == "All") {
                                                                value = "00";
                                                            }
                                                        }
                                                        //  console.log(key + "," + value);
                                                        if (value != "sort" && value != "1" && value != "2" && value != "3" && value != "4"
                                                            && value != "5" && value != "6" && value != "7" && value != "8"
                                                            && value != "9" && value != "10" && value != "11" && value != "12"
                                                            && value != "01" && value != "02" && value != "03" && value != "05"
                                                            && value != "04" && value != "13" && value != "00"
                                                            && value != "06" && value != "07" && value != "08" && value != "09") {
                                                            filed.push(value);
                                                        }

                                                    });
                                                }
                                            }
                                            $scope.$apply(function () {
                                                $scope.reportFiledList.UIDropDown[loaderIndex].loader = false;
                                                $scope.reportFiledList.UIDropDown[res.length].data = filed;
                                            });

                                        });
                                        break;
                                }
                            });
                        }
                    }
                }).error(function (respose) {
                    privateFun.gotParameterRenderError();
                });
            },
            reportCreate: function () {
                $scope.reportFldLoading = true;
                privateFun.clearIframe();
                $scope.reportURL = $sce.trustAsResourceUrl('');
                var selDrpDwnObj = $scope.reportFiledList.selectedDrpFiled;
                var datePickerObj = $scope.reportFiledList.selectedDate;

                var UI = {
                    UIDate: $scope.reportFiledList.UIDate
                };

                //#report validation
                // date validation
                if ($scope.reportFiledList.isDateFound) {
                    var dateSelectEmpty = 0;
                    if (Object.keys(datePickerObj).length == 0) {
                        dateSelectEmpty = 2;
                    } else if (Object.keys(datePickerObj).length == 1) {
                        dateSelectEmpty = 2;
                    } else {
                        for (var c in  datePickerObj) {
                            var temp = datePickerObj[c];
                            if (temp == null || temp == "") {
                                if (dateSelectEmpty != 2) {
                                    dateSelectEmpty++;
                                }
                            }
                        }
                    }
                    if (dateSelectEmpty == 2 || dateSelectEmpty == 1) {
                        privateFun.fireMsg('0', 'Error :' +
                            ' please select the report date parameter...');
                        privateFun.doneReportLoad();
                        return;
                    }
                }

                //drop down validation
                var validationState = false;
                var loop;
                loop = $scope.reportFiledList.isDateFound ? 2 : 0;
                if ($scope.reportFiledList.isDropDownFound) {
                    for (loop; loop < selDrpDwnObj.length; loop++) {
                        if (selDrpDwnObj[loop].value != "") {
                            validationState = true;
                        }
                    }
                    if (!validationState) {
                        privateFun.fireMsg('0', 'Error :' +
                            ' please select the report  parameter...');
                        privateFun.doneReportLoad();
                        return;
                    }
                }

                getReportName();
                getSession();
                reqParameter.rptParameter = '';

                //check date parameter
                for (var c in datePickerObj) {
                    var val = datePickerObj[c];
                    for (var i = 0; i < selDrpDwnObj.length; i++) {
                        if (selDrpDwnObj[i]['filedName'] == c) {
                            selDrpDwnObj[i]['value'] = val;
                        }
                    }
                }

                //create drop down report parameter
                for (var i = 0; i < selDrpDwnObj.length; i++) {
                    if (i == 0) {
                        reqParameter.rptParameter = '{"' + selDrpDwnObj[i]['ParamName'] + '" : ' +
                            '"' + selDrpDwnObj[i]['value'] + '"}';
                    }
                    else {
                        reqParameter.rptParameter = reqParameter.rptParameter + ',{"' + selDrpDwnObj[i]['ParamName'] + '" : ' +
                            '"' + selDrpDwnObj[i]['value'] + '"}';
                    }
                }//end

                //HTTP get report
                $scope.eventHandler = {
                    isDataFound: false,
                    isReportLoad: true,
                    isFiled: {
                        loading: true,
                        found: false
                    }
                };
                dynamicallyReportSrv.getRenderReport(reqParameter).success(function (data) {
                    var reportLink = data;
                    privateFun.doneReportLoad();
                    $scope.reportURL = $sce.trustAsResourceUrl(reportLink);
                }).error(function (res) {
                    privateFun.doneReportLoad();

                });
            }
        }
    })();
    serverRequest.getReportUIFromServer(eventHandler);
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else list.push(item);
    };


//test code
    $scope.noResultsTag = null;
    $scope.addTag = function () {
        $scope.tags.push({
            id: $scope.tags.length,
            name: $scope.noResultsTag
        });
    };
    $scope.$watch('noResultsTag', function (newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
            $timeout(function () {
                var noResultsLink = $('.select2-no-results');
                console.log(noResultsLink.contents());
                $compile(noResultsLink.contents())($scope);
            });
        }
    }, true);


//select report parameter
    $scope.selectedVal = null;


//#execute query handler
    $scope.executeQueryAry = [];
    var executeQryHandler = (function () {
        return {
            executeNextQuery: function (filedName, selectedVal, findIndex) {
                //console.log(filedName);
                //console.log(selectedVal);
                var executeQueryAry = $scope.executeQueryAry;
                for (var i = 0; i < executeQueryAry.length; i++) {
                    var nextRequst = i;
                    nextRequst++;
                    var length = $scope.reportFiledList.UIDropDown.length
                    if (executeQueryAry[i].ParamName == filedName &&
                        nextRequst != executeQueryAry.length) {
                        if (i != executeQueryAry.length) {
                            if (executeQueryAry[i].query != "") {

                                //#nextquery
                                var nextQuery = executeQueryAry[nextRequst].query;
                                //var replaceTxt = privateFun.capitalise(filedName);
                                replaceTxt = '${' + filedName + '}';
                                var nextQuery = nextQuery.replace(replaceTxt, "'" + selectedVal + "'");
                                //nextQuery = nextQuery.replace('All', selectedVal);

                                //loader
                                var loaderIndex = 0;
                                for (var l = 0; l < reportFiledList.UIDropDown.length; l++) {
                                    if (reportFiledList.UIDropDown[l].ParamName == executeQueryAry[nextRequst].filedName) {
                                        loaderIndex = l;
                                        reportFiledList.UIDropDown[l].loader = true;
                                        l = reportFiledList.UIDropDown.length;
                                    }
                                }

                                serverRequest.getExecuteQuery(nextQuery, length, function (res) {
                                    if (res.data == 500) {
                                        var result  = res.data;
                                        privateFun.fireMsg('0', 'Error 500 :' +
                                            ' Report filed load error...');
                                        reportFiledList.UIDropDown[loaderIndex].loader = false;
                                        return;
                                    }
                                    var jsonObj = JSON.parse(res.data);
                                    var filed = [];
                                    var foundArray = 0
                                    if (jsonObj.Result.length != 0) {
                                        for (var c in jsonObj.Result) {
                                            if (Object.prototype.hasOwnProperty.call(jsonObj.Result, c)) {
                                                val = jsonObj.Result[c];
                                                angular.forEach(val, function (value, key) {
                                                    //console.log(key + "," + value);
                                                    if (key == "value") {
                                                        if (value == "All") {
                                                            value = "00";
                                                        }
                                                    }
                                                    //  console.log(key + "," + value);
                                                    if (value != "sort" && value != "1" && value != "2" && value != "3" && value != "4"
                                                        && value != "5" && value != "6" && value != "7" && value != "8"
                                                        && value != "9" && value != "10" && value != "11" && value != "12"
                                                        && value != "01" && value != "02" && value != "03" && value != "05"
                                                        && value != "04" && value != "13" && value != "00"
                                                        && value != "06" && value != "07" && value != "08" && value != "09") {
                                                        filed.push(value);
                                                    }
                                                });
                                            }
                                        }
                                        $scope.$apply(function () {
                                            $scope.reportFiledList.UIDropDown[loaderIndex].loader = false;
                                            $scope.reportFiledList.UIDropDown[findIndex].data = filed;
                                        });

                                    } else {
                                        privateFun.fireMsg('1', 'Data not found..');

                                    }

                                });
                            }

                        }

                    }
                }
            }
        };
    })();

}).
directive('datepicker', function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                dateFormat: "yy-mm-dd",
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }
});