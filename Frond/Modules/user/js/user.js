 var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
   

 // alert();


 $scope.testing = "jorge";
   

    $scope.get = function() {
       
         $http({
            method : "GET",
            url : "http://127.0.0.1/baoli/Api/index.php/Client"
          }).then(function mySuccess(response) {
              $scope.listClient = response.data;
            }, function myError(response) {
             //alert(response.statusText);
          });
       


    }




    $scope.metodo = function () {
      // body...

      $scope.testing = $scope.nombre;
    }


 });
