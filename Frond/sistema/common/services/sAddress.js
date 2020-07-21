var moduleAddressServices = angular.module("services.Address", ["tokenSystem", "services.User"]);

moduleAddressServices.service("addressServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var addressResult=0;
      var rsJsonAddress = {};
      var checkResult =0;
      return {
          /* CHECK ADDRESS IF IN DEBT */
          checkIfInDebt: function(idAddress) {
            console.log("[Address Services] => Id Address a verificar: "+idAddress);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Direccion/checkIfAddressIsInDebt/"+idAddress
                  }).then(function mySuccess(response) {
                      addressResult = response.data;
                      return addressResult;
                  },function myError(response) { 
                        if(!idAddress){
                            checkResult = null;
                        }
                    return checkResult;
            });   
          },
          /* GET ALL BUILDINGS CUSTOMERS */
          getBuildings: function() {
            //console.log("[Address Services]: Get Agents ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/adress"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          /* GET ALL BUILDINGS DEPARTMENTS BY ID*/
          getBuildingsDeptos: function(id) {
            //console.log("[Address Services]: Get Agents ");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/getDepartmentsByCustomerId/"+id
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          getLocations: function(idProvince) {
            //console.log("[Address Services]: Get Locations of province id:"+idProvince);
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
          getAllLocations: function() {
            //console.log("[Address Services]: Get Locations:");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Util/localidades"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    //console.log(rsJson);
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          /*API GOB AR */
          getLocationsByName: function(locationName) {
            //console.log("[Address Services]: Get Locations By Name: "+locationName);
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
            //console.log("[Address Services]: Get Address By name");
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
            //console.log("[Address Services]: Get States ");
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
            //console.log("[Address Services]: Get States ");
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
      }
}]);