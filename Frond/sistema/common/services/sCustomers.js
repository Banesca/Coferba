var moduleCustomerServices = angular.module("services.Customers", ["tokenSystem"]);

moduleCustomerServices.service("CustomerServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var rsJson = {};
      var sndJson= {};
      var rsCustomer={'client':{}};
      var checkResult =0;
      var typeOfCustomer = "";
      return {
          /* GET ALL TYPE OF CUSTOMERS */
          getCustomerType: function() {
            //console.log("[Customer Services]: Get types ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/clientType"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          addCustomer: function(data) {
            rsCustomer.client = data;
            var switchOption = rsCustomer.client.idClientTypeFk;
            switch(switchOption){
              case "1": //ADMINISTRATION CUSTOMER
                typeOfCustomer="admin";
              break;
              case "2": //BUILDING CUSTOMER
                typeOfCustomer="building";
              break;
              case "3": //COMPANY CUSTOMER
                typeOfCustomer="company";
              break;
              case "4": //BRANCH  CUSTOMER
                typeOfCustomer="branch";
              break;
              case "5": //PARTICULAR  CUSTOMER
                typeOfCustomer="particular";
              break;
              default:
            }

            //console.log("[Customer Services] => new: "+rsCustomer.client.name);
              return $http.post(serverHost+serverBackend+"Clientes/"+typeOfCustomer,rsCustomer,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          updateAdminCustomer: function(data) {
            rsCustomer.client = data;
            //console.log("[Customer Services] => new: "+rsCustomer.client.name);
              return $http.post(serverHost+serverBackend+"Clientes/updateadmin",rsCustomer,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },          
          getCustomerList: function(searchFilter) {
            var sFilter=searchFilter;
            var sMsg=searchFilter==null||searchFilter==undefined?"All":searchFilter;
            //console.log("[Profile Services] => criterio de busqueda: "+sMsg);
              return $http.post(serverHost+serverBackend+"Clientes/search",sFilter,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response.data;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
      }
}]);