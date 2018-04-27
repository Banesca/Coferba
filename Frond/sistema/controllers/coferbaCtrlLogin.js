var appUser = angular.module("coferbaApp.User", ["coferbaTokenSystem"]);

appUser.service("userServices",function(tokenSystem){
      var consoleMsg;
      return {
          lunchAlert: function() {
              consoleMsg = JSON.parse(localStorage.getItem("sysLoggedUser"));
          },
          setAlert: function(value) {
              localStorage.setItem("sysLoggedUser", JSON.stringify(value));
          },
          sendConsoleLog: function() {
              consoleMsg = tokenSystem.getTokenStorage(2);
              return consoleMsg;
          },
      }
});


appUser.controller('LoginCtrl', function($scope, $location, $http, blockUI, $timeout, inform, userServices, tokenSystem, tokenLoggedUser, serverHost, serverBackend, $window){

  $scope.sysToken = tokenSystem.getTokenStorage();
  $scope.serverHost=serverHost;
  $scope.userS = userServices.sendConsoleLog();
  console.log('USER SERVICE RETRIEVING DATA FROM THE TOKEN SERVICE :'+$scope.userS.fullNameUser);
  /**************************************************
  *                                                 *
  *               INGRESO DE USUARIO                *
  *                                                 *
  **************************************************/
  $scope.login = {email:'', passwd:''};
  $scope.forgotPass       = false;
  $scope.noRegisteredUser = false;
  $scope.loginUser        = true;

$scope.validateUserLogin = function(){
  if ($scope.login.email && $scope.login.passwd){
      //location.href = "../user/";
      //$state.go('../user/');
      console.log($scope._getLoginData());
      sysLoginUser($http,$scope);
  }
}  

/**************************************************
*                                                 *
*               INGRESO DE USUARIO                *
*                                                 *
**************************************************/
$scope.tmp={fullNameUser:'',emailUser : '', phoneNumberUser : '', phoneLocalNumberUser : '', idProfileKf : '', idUser : ''}
function sysLoginUser($http,$scope,vOp){  
    $http.post(serverHost+serverBackend+"User/auth",$scope._getLoginData())
        .then(function(data) {
         if (typeof(data.data.response) === "undefined"){
             inform.add('El Correo: '+ $scope.login.email + ', no se encuentra registrado o ha colocado una clave errada verifique sus datos.',{
                        ttl:3000, type: 'warning'
             }); 
             
           }else{
               $scope.rsJSON=data.data.response;
               console.log(data.data.response);
               tokenSystem.setTokenStorage(true,$scope.rsJSON);
               $timeout(function() {
                  $scope.jsonTokenUser=tokenSystem.getTokenStorage(2);
                  console.log('retrievedObject: ', $scope.jsonTokenUser.fullNameUser);
               }, 1500);
                if($scope.rsJSON.resetPasword==1){
                  inform.add('Recorda: '+ $scope.rsJSON.fullNameUser + ' que no podes usar la misma clave o claves anteriores.',{
                        ttl:3000, type: 'info'
                  });
                } 
                /*
                    $scope.tmp.fullNameUser         = $scope.rsJSON.fullNameUser,
                    $scope.tmp.emailUser            = $scope.rsJSON.emailUser,
                    $scope.tmp.phoneNumberUser      = $scope.rsJSON.phoneNumberUser,
                    $scope.tmp.phoneLocalNumberUser = $scope.rsJSON.phoneLocalNumberUser,
                    $scope.tmp.idProfileKf          = $scope.rsJSON.idProfileKf,
                    $scope.tmp.idUser               = $scope.rsJSON.idUser,
                    console.log($scope.tmp);
                    $('#PasswdModalUser').modal('toggle');
                }else{
                   if($scope.rsJSON.idProfileKf==3){
                      mail2Search = $scope.rsJSON.emailUser;
                      $scope.searchTenantByMail();
                    }else{location.href = "index.html";}
                }  */

          }
        },function (error, data, status) {
            if(status == 404 || status == 203){
              console.log("!Informacion: "+error.data.error+"info");
              inform.add(error.data.error,{
                ttl:5000, type: 'warning'
              }); 
            }
            else{
              console.log("!Informacion: "+error.data.error+"info");
              inform.add(error.data.error,{
                ttl:5000, type: 'warning'
              }); 
            }
           
        });   
        
  };
/****** Get Data from the Login Form ****/

$scope._getLoginData = function () {
  var dataUser =
          {
               user: { 
                        fullNameUser : $scope.login.email,
                        passwordUser : $scope.login.passwd
                      }
          };
  return dataUser;
};

$scope.systemFunctionUser = function(){
  location.href = "../register/";
}


var $loginMsg = $('.textcontent1'),
    $signupMsg = $('.textcontent2'),
    $frontbox = $('.frontbox');

$scope.fnLoginToggle = function(swLogin){
  switch (swLogin){
    case 1:
      $frontbox.addClass("moving");
      $scope.signupUser=true; 
       $scope.loginUser=false;
      $scope.forgotPass=false;
    break;
    case 2:
      $frontbox.removeClass("moving");
      $scope.signupUser=false; 
       $scope.loginUser=true;
      $scope.forgotPass=false;
    break;
    default:

  }
}
$scope.checkUserAdd = function(){ 
  $scope.$on('message', function(event, response) {
      console.log(response);
  });
  if($scope.mensajeTest){       
    inform.add('Usuario registrado con exito. ',{
                ttl:2000, type: 'success'
    });
  }
  //console.log($scope.mensajeTest);
}

});