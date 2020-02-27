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
          }
      }
}]);