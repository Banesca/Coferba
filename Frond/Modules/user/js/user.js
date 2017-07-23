 var app = angular.module('myApp', []);
      app.controller('myCtrl', function($scope, $http) {
         

       //  alert();
         

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

           $scope.editTravelInfo = function (travel) {
        // LLAMAMOS A EL SERVICIO FILTROS PARA EL FORMULARIO //
       
        travel['dateFilter'] = $("#date").val();
        var objTravel =
                {
                    travel
                };

       
        $http.post(uri + 'travel/getFilterFormAsignDriver', objTravel).success(function (data) {

            $scope.filterFronEdit = data;
            $scope.idTravel = travel.idTravel;
            $('#myEdit').modal('toggle');
        

        }).error(function (data,status) {
                if(status == 404){notificate("!Informacion "+status,data.error,"info");}
                else{notificate("Error !"+status," Contacte a Soporte","error");}
               
        });

    }


       });
