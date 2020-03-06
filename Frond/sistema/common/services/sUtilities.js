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
          getLocations: function(idProvince) {
            console.log("[Utilities Services]: Get Locations of province id:"+idProvince);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/localidad/"+idProvince
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          /*API GOB AR */
          getLocationsByName: function(locationName) {
            console.log("[Utilities Services]: Get Locations By Name: "+locationName);
              return $http({
                    method : "GET",
                    url : "https://apis.datos.gob.ar/georef/api/localidades?provincia="+locationName+"&campos=nombre&max=100"
                  }).then(function mySuccess(response) {
                    rsJson=response.data.localidades;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          /*API GOB AR */
          getAddressByName: function(addressName) {
            //console.log("[Utilities Services]: Get Address By name");
              return $http({
                    method : "GET",
                    url : "https://apis.datos.gob.ar/georef/api/direcciones?direccion="+addressName
                  }).then(function mySuccess(response) {
                    rsJson=response.data.direcciones;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          }, 
          /*API GOB AR */   
          getStates_API: function() {
            //console.log("[Utilities Services]: Get States ");
              return $http({
                    method : "GET",
                    url : "https://apis.datos.gob.ar/georef/api/provincias"
                  }).then(function mySuccess(response) {
                    rsJson=response.data.provincias;
                    //console.log(rsJson);
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          /*API LOCAL */   
          getStates: function() {
            console.log("[Utilities Services]: Get States ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/provincia/"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    //console.log(rsJson);
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
      }
}]);