/**
 * Created by Damith on 3/8/2016.
 */
'use strict';
//service details
//var parameter ={apiBase:'',reportName:'',token:''}
//getReportUI(parameter)
mainApp.factory('dynamicallyReportSrv', function ($http) {
    return {
        getReportUI: function (parameter) {
            return $http.get(parameter.apiBase + 'getLayout?SecurityToken=' + parameter.token +
                '&Domain=duosoftware.com&Reportname=' + parameter.reportName + '', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        },
        getAllReports: function (parameter) {
            return $http.get(parameter.apiBase + 'get_all_components?SecurityToken=' + parameter.token +
                '&Domain=' + parameter.Digin_Domain);
        },
        getCurrentQry: function (parameter) {
            return $http.get(parameter.apiBase + 'getQueries?Reportname=' + parameter.reportName +
                    '&fieldnames={' + parameter.queryFiled + '}')
        },
        getRenderReport: function (parameter) {
            return $http.get(parameter.tomCatBase + 'DigIn-Report/ReportService/Reports/getreport/' + parameter.reportName + '/[' + parameter.rptParameter + ']');
        },
        startReportServer: function (parameter) {
            return $http.get(parameter.tomCatBase + 'DigIn-Report/ReportService/Reports/command/start');
        },
        get_tenant_status: function (parameter) {
            return $http.get( parameter.apiBase+ 'get_user_settings?SecurityToken=' + parameter._st );
        },
        initialize_tenant: function (parameter) {
            return $http({
                    method: 'POST',
                    url: parameter.apiBase +'set_init_user_settings',
                    data: {
                         'db' : 'BigQuery' 
                    },
                    headers: {  
                        'SecurityToken': parameter._st
                    }
                });            
        }
    }
});


