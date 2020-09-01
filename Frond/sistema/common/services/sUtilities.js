var moduleUtilitiesServices = angular.module("services.Utilities", ["tokenSystem"]);

moduleUtilitiesServices.service("UtilitiesServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var rsJson = {};
      var sndJson= {};
      var checkResult =0;
      return {
          /* GET ALL TYPE OF CUSTOMERS */
            getAgents: function() {
            //console.log("[Utilities Services]: Get Agents ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/agent"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
           /* GET ALL ZONES FOR CUSTOMERS */
          getZones: function() {
            //console.log("[Utilities Services]: Get Agents ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Zonas/listar"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },      
          addNewZone: function(zona) {
            console.log("[Utilities Services] => Add New Zone ");
              return $http.post(serverHost+serverBackend+"Zonas/add",zona,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          updateZone: function(zona) {
            console.log("[Utilities Services] => Update Zone ");
              return $http.post(serverHost+serverBackend+"Zonas/edit",zona,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          deleteZone: function(id) {
            console.log("[Utilities Services] => Delete Zone: "+id);
              return $http({
                    method : "DELETE",
                    url : serverHost+serverBackend+"Zonas/delete/"+id
                  }).then(function mySuccess(response) {
                    rsJson=response;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },          
          getTypeOfIVA: function() {
            //console.log("[Utilities Services]: Get Type of iva ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/taxtype"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          categoryDepartament: function() {
            //console.log("[Utilities Services]: Get Department Category ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/categoryDepartament"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          typeOfMails: function() {
            console.log("[Utilities Services]: Get Type of Mails");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/typeOfMails"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          typeOfProperty: function() {
            console.log("[Utilities Services]: Get Type of Property");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/tipoInmueble"
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