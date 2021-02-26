var moduleContractServices = angular.module("services.Contracts", ["tokenSystem", "services.User"]);

moduleContractServices.service("ContractServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var serviceResult=0;
      var rsJsonServices = {};
      var rsJson={};
      var rsCustomer={'contrato':{}};
      var checkResult =0;
      return {
          /*GET LIST OF TYPE OF CONTRACTS*/
          getContractListByCustomerId: function(id) {
            rsJson={};
            console.log("[Contract Services]: List of Contract By Customer Id");
              return $http({
                    method : "GET",
                    url: serverHost+serverBackend+"Contrato/getIdClient/"+id
                  }).then(function mySuccess(response) {
                    rsJson=response;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    rsJson=response;
                    return rsJson;
            });   
          },
          /*GET LIST OF TYPE OF CONTRACTS*/
          getSelectedServiceByIdContract: function(idContract, idService) {
            rsJson={};
            console.log("[Contract Services]: List of Services Items By Contract & Service Id");
              return $http({
                    method : "GET",
                    url: serverHost+serverBackend+"Contrato/getIdContrato/"+idContract+"/"+idService
                  }).then(function mySuccess(response) {
                    rsJson=response;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },          
          /*ADD NEW CONTRACT */
          addContract: function(data) {
            rsCustomer.contrato=data
            //console.log("[Contract Services]: new contract ");
              return $http.post(serverHost+serverBackend+"Contrato/add",rsCustomer,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                });
          },
          /*UPDATE CONTRACT */
          updateContract: function(data) {
            rsCustomer.contrato=data
            //console.log("[Contract Services]: update contract ");
              return $http.post(serverHost+serverBackend+"Contrato/update",rsCustomer,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response.data;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                });
          },
      }
}]);