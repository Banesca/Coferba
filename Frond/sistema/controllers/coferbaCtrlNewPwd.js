var moduleNewPwd = angular.module("coferbaApp.NewPwd", ["coferbaTokenSystem", "coferbaServices.User"]);

moduleNewPwd.controller('NewPwdCtrl', function($scope, $rootScope, $location, $http, blockUI,userServices, inputService, userServices, $timeout, tokenSystem, serverHost, serverHeaders, inform, $window){

  //console.log(serverHeaders)
  $scope.new = {pwd1: '', pwd2:''};
  $scope.redirectSuccessfull = false;
  $scope.counT  =5;
  $scope.redirect ="#/login";
  tokenSystem.destroyTokenStorage(2);
  $scope.sysToken      = tokenSystem.getTokenStorage(1);
  $scope.sysLoggedUser = tokenSystem.getTokenStorage(2);
  $scope.sysRsTmpUser  = tokenSystem.getTokenStorage(3);
  var data2update = {};
  var user = !$scope.sysToken ? $scope.sysRsTmpUser : $scope.sysLoggedUser;
  //console.log(user);
  var data2update = {
                      user
                    };
  /**************************************************
  *                                                 *
  *                 NEW PWD INIT                    *
  *                                                 *
  **************************************************/
  $scope.sysRequestInit = function(){
    if (!$scope.new.pwd1 && !$scope.new.pwd2){
      console.log("Modo cambio de clave activado: "+data2update.user.isEditUser);
      inform.add('Estimado '+data2update.user.fullNameUser + ', ha iniciado el proceso de cambio de clave.',{
                ttl:4000, type: 'warning'
      });
    }
  }
  /**************************************************
  *                                                 *
  *           SEND THE NEW PWD TO UPDATE            *
  *                                                 *
  **************************************************/

  $scope.sysSendPwd2change= function (){
      userServices.updateUser(data2update).then(function(data){
        $scope.changePwdResult = data;
        if($scope.changePwdResult){
          $scope.redirectSuccessfull = true;
          $scope.countDownRedirect($scope.redirect, $scope.counT);
        }

      });
  }

  $scope.sysRequestNewPwd = function () {
      if ($scope.new.pwd1 == $scope.new.pwd2){
        data2update.user.passwordUser=$scope.new.pwd2;
        $scope.sysSendPwd2change();
      }

  };

  $scope.inputCheckCss = function (obj) {
      var $this      = $('input[name*='+obj+']');
      var inputObj   = $this
      var inputValue = $this.val();
      inputService.setClass(inputValue, inputObj);
  }

  if ($scope.sysToken || $scope.sysLoggedUser || $scope.sysRsTmpUser){
      data2update.user.isEditUser='true';
      $scope.sysRequestInit();
  }else{
      location.href = "#/login";
  }

});
