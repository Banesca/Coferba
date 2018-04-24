app.controller('NewPwdCtrl', function($scope, $rootScope, $location, $http, blockUI, $timeout, tokenSystem, serverHost, inform, $window){

$scope.forgot={email: ''};
$scope.redirectSuccessfull = false;
$scope.counT 	=5;
$scope.redirect ="#/login";
$scope.serverHost=serverHost;

/**************************************************
*                                                 *
*                LOST PWD USER                    *
*                                                 *
**************************************************/
$scope.sysPwdRequest = function(){
	$scope.chgPwdUser($http, $scope);
}
/**************************************************
*                                                 *
*             REQUEST PWD FUNCTION                *
*                                                 *
**************************************************/

$scope.chgPwdUser = function ($http, $scope){
  console.log($scope.requestNewPwd());
  $http.post($scope.serverHost+"Coferba/Back/index.php/User/updatePass", $scope.requestNewPwd(),$scope.setHeaderRequest())
      .then(function (sucess, data) {
      		$scope.redirectSuccessfull = true;

          	$scope.countDownRedirect($scope.redirect, $scope.counT);
    },function (error,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error Modificacion de Usuario !"+status+" Contacte a Soporte"+"error");}
           
    });
};

$scope.requestNewPwd = function () {
  var user =
          {
                user:{
                            emailUser           : $scope.forgot.email
                      }
          };
  return user;
};

});
