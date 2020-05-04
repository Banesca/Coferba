var moduleProductsServices = angular.module("services.Products", ["tokenSystem", "services.User"]);

moduleProductsServices.service("ProductsServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var rsJson = {};
      var sndJson= {};
      var checkResult =0;
      return {
          /* GET ALL PRODUCTS OR SEARCH BY ANY CRITERIA */
          listProducts: function(searchFilter) {
            var sFilter=searchFilter;
            var sMsg=searchFilter==null||searchFilter==undefined?"All":searchFilter;
            console.log("[Products Services] => criterio de busqueda: "+sMsg);
              return $http.post(serverHost+serverBackend+"Product/search",sFilter,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response.data;
                  return rsJson;
                },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response;
                })  
          },
          getProductClassification: function() {
            console.log("[Products Services]: Products Classification");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Seeds/ProductClassification/"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          getDiviceOpening: function() {
            console.log("[Products Services]: Products Classification");
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Seeds/DiviceOpening/"
                  }).then(function mySuccess(response) {
                    rsJson=response.data;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.data.error); 
                    return response;
            });   
          },
          /* NEW PRODUCT */
          newProduct: function(newProduct) {
            sndJson = newProduct;
            console.log("[Product Services] => New Product ");
            console.log(sndJson);
              return $http.post(serverHost+serverBackend+"Product",sndJson,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("[Product Services] => newProduct: error");
                  //console.log(response);
                  console.log("Error: "+response.status+" ["+response.statusText+"]"); 
                  return response;
                }); 
          },
          /* NEW PRODUCT */
          updateProduct: function(updateProduct) {
            sndJson = updateProduct;
            console.log("[Product Services] => Update Product ");
            console.log(sndJson);
              return $http.post(serverHost+serverBackend+"Product/update",sndJson,serverHeaders)
                .then(function mySucess(response, status) {
                  rsJson=response;
                  return rsJson;
                },function myError(response) { 
                  console.log("[Product Services] => newProduct: error");
                  //console.log(response);
                  console.log("Error: "+response.status+" ["+response.statusText+"]"); 
                  return response;
                }); 
          },
          deleteProduct: function(id) {
            console.log("[Product Services] => Delete Product ");
              return $http({
                    method : "delete",
                    url : serverHost+serverBackend+"Product/delete/"+id
                  }).then(function mySuccess(response) {
                    rsJson=response;
                    return rsJson;
                  },function myError(response) { 
                    console.log("Error: "+response.status+" ["+response.statusText+"]");  
                    return response;
            });   
          },
      }
}]);