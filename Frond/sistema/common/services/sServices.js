var moduleServiceServices = angular.module("services.service", ["tokenSystem", "services.User"]);

moduleServiceServices.service("serviceServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var serviceResult=0;
      var rsJsonServices = {};
      var rsJson={};
      var checkResult =0;
      return {
          /*GET LIST OF TYPE OF SERVICES*/
          getTypeOfServices: function() {
            rsJson={};
            //console.log("[Service Services]: Type of Services ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Services/typeOfServices"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          /*GET LIST OF ACCESS CONTROL DOORS */
          accessCtrlDoors: function() {
            rsJson={};
            //console.log("[Service Services]: Access Control Door List ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Services/accessCtrlDoors"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },           
      }
}]);