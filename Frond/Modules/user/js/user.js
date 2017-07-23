 var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
   



      $scope.addUser = function () 
      {
        // LLAMAMOS A EL SERVICIO FILTROS PARA EL FORMULARIO //
        $http.post('http://127.0.0.1/Coferba/Back/index.php/User', $scope._setuser())
        .success(function (data) {

             alert("Registrado ");

          }).error(function (data,status) {
                  if(status == 404){alert("!Informacion "+status+data.error+"info");}
                  else if(status == 203){alert("!Informacion "+status,data.error+"info");}
                  else{alert("Error !"+status+" Contacte a Soporte"+"error");}
                 
          });

      }


     $scope._setuser = function () {
        var user =
                {
                    user:
                            {
                                idBox: $routeParams.id,
                                idIngressTypeAsigned: $scope.idIngressTypeAsigned,
                                IdUserKf: JSON.parse(localStorage.getItem('session')).idUser,
                                idClientAsigned: idCliente,
                                idBoxTypeAsigned: $scope.idBoxTypeAsigned,
                                idPaymentFormAsigned: $scope.idPaymentFormAsigned,
                                idConditionTypeIngress: $scope.idConditionTypeIngress,
                                amountBox: amountBox,
                                idInvoiceHeaderKf: idInvoiceHeaderKf,
                                idDriverAsigned : idDriver,
                                listChecks: $scope.Checks,
                                idHeaderInvoi:$scope.idHeaderInvoi

                            }
                };
        return user;
    };




     

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
