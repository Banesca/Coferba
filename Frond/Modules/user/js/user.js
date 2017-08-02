 var app = angular.module('coferbaApp', []);

app.controller('coferbaCtrl', function($scope, $http) {
    $scope.check=false;
    $buttonAdmCount=0;
    $buttonTenaCount=0;
    /*Validate the button click */
    $scope.Validate = function($idView){
            if ($idView==1) {
              $scope.check=true;
              $scope.idView=$idView;
              $buttonAdmCount++;
                if ($buttonAdmCount==2){$scope.check=false; $buttonAdmCount=0;}
            }else if($idView==2) {
              $scope.check=true;
              $scope.idView=$idView;
              $buttonTenaCount++;
                if ($buttonTenaCount==2){$scope.check=false; $buttonTenaCount=0;}
            }
          
    }

    $scope.CallListForm = function(){
         $http({
            method : "GET",
            url : "http://localhost/Coferba/Back/index.php/User"
          }).then(function mySuccess(response) {
              $scope.listUsers = response.data;
            }, function myError(response) {
          });
      }

      $scope.CallFilterForm = function(){
         $http({
            method : "GET",
            url : "http://localhost/Coferba/Back/index.php/User/filterForm"
          }).then(function mySuccess(response) {
              $scope.listProfile = response.data.profile;
              $scope.listType = response.data.type;
            }, function myError(response) {
          });
      }


      $scope.addUser = function () 
      {
        // LLAMAMOS A EL SERVICIO FILTROS PARA EL FORMULARIO //
        $http.post('http://localhost/Coferba/Back/index.php/User', $scope._setuser())
            .success(function (data) {

             alert("Registrado ");

          }).error(function (data,status) {
                  if(status == 404){alert("!Informacion "+status+data.error+"info");}
                  else if(status == 203){alert("!Informacion "+status,data.error+"info");}
                  else{alert("Error !"+status+" Contacte a Soporte"+"error");}
                 
          });

      }
     $scope._setuser = function ($userType) {

        var user =
                {
                    if ($userType==1){
                      user:
                              {
                                  fullNameUser: $scope.fname+$scope.lname,
                                  emailUser: $scope.emailUser,
                                  phoneNumberUser: $scope.phoneNumberUser,
                                  addresUser: $scope.addresUser,
                                  passwordUser: $scope.passwordUser,
                                  idProfileKf: $scope.idProfileKf,
                                  razonSocial: $scope.razonSocial
                              }
                    }else if($userType==2){
                      user:
                              {
                                  fullNameTenant: $scope.fname+$scope.lname,
                                  idTypeKf: $scope.idTypeKf,
                                  phoneNumberTenant: $scope.phoneNumberUser,
                                  emailTenant: $scope.emailTenant

                              }
                    }
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

}); /*Cierre del JS*/


 
