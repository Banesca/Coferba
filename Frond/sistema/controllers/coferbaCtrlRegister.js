var moduleRegisterUser = angular.module("coferbaApp.RegisterUser", ["coferbaTokenSystem"]);



moduleRegisterUser.controller('RegisterUserCtrl', function($scope, $rootScope, $location, $http, blockUI, inputService, $timeout, tokenSystem, serverHost, $window){
  /**************************************************
  *                                                 *
  *               INGRESO DE USUARIO                *
  *                                                 *
  **************************************************/
  $scope.login = {email:'', passwd:''};
  $scope.forgotPass       = false;
  $scope.noRegisteredUser = false;
  $scope.counT  =5;
  $scope.redirect ="#/login";
  $scope.serverHost = serverHost;
  $scope.validateUserLogin = function(){
    if ($scope.login.email && $scope.login.passwd){
        //location.href = "../user/";
        //$state.go('../user/');
    }
  }

  $scope.sysRegisterFn = function(){
      console.log($scope._setuser());
      //$scope.mensajeTest=true;
      //location.href = "#/login";
      //console.log($scope.mensajeTest)
      //$location.path('/nlogin');
      //$scope.addUser($http, $scope);
      $scope.redirectSuccessfull=true;
      $scope.countDownRedirect($scope.redirect, $scope.counT);
  }

  /**************************************************
  *                                                 *
  *               REGISTRO DE USUARIO               *
  *                                                 *
  **************************************************/
  $scope.addUser = function ($http, $scope){
    $http.post($scope.serverHost+"Coferba/Back/index.php/User/", $scope._setuser())
        .then(function (sucess, data) {
          //alert($scope.idProfileTmp)
          /*if ($scope.idProfileTmp==3){
              $scope.t.fullNameTenant           = $scope.fname+' '+$scope.lname;
              $scope.t.idTypeKf                 = 1;
              $scope.t.phoneNumberTenant        = $scope.phoneNumberUser;
              $scope.t.phoneNumberContactTenant = $scope.phonelocalNumberUser;
              $scope.t.emailTenant              = $scope.emailUser;
              $scope.sysFunctionsTenant('search'); //CHECK THE TENANT TABLE IF THERE IS ALREADY REGISTERED
              $scope.IsTenant=true;
          }*/
          inform.add('Usuario registrado con exito. ',{
                  ttl:2000, type: 'success'
          });
          location.href = "../";

      },function (error, data,status) {
              if(status == 404){alert("!Informacion "+status+data.error+"info");}
              else if(status == 203){alert("!Informacion "+status,data.error+"info");}
              else{alert("Error Registro de Usuario !"+status+" Contacte a Soporte"+"error");}
             
      });
  };

  $scope._setuser = function () {
     $scope.idProfileTmp=!$scope.Token ? 3 : $scope.idProfileKf
    var user =
            {
                  user:{
                              fullNameUser        : $scope.fname+' '+$scope.lname,
                              emailUser           : $scope.emailUser,
                              phoneNumberUser     : $scope.phoneNumberUser,
                              phoneLocalNumberUser: $scope.phonelocalNumberUser,
                              passwordUser        : $scope.password1,
                              idProfileKf         : $scope.idProfileTmp,
                              idCompanyKf         : $scope.idCompanyKf
                        }
            };
    return user;
  };
















  $scope.fnLoadPhoneMask = function(){
     /**********************************************
    *               INPUT PHONE MASK              *
    **********************************************/
    $('.input--tel').mask('(054) 9 99 9999-9999');
    $('.input--tel').on('focus', function () {
       if ($(this).val().length === 0) {
         $(this).val();
       }
    });
    
    $('.input--tel').keydown(function (e) {
          if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
               (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
               (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
               (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
               (e.keyCode >= 35 && e.keyCode <= 39)) {
                  return;
          }

          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
              e.preventDefault();
          }
      });
  }


  $scope.inputCheckCss = function (obj, type) {
    var $this;
    switch (type){
      case 'i':
        $this      = $('input[name*='+obj+']');
      break;
      case 's':
        $this      = $('select[name*='+obj+']');
      break
    }
      
      //console.log($this)
      var inputObj   = $this
      var inputValue = $this.val();
      inputService.setClass(inputValue, inputObj);
  }

  /**************************************************
  *                                                 *
  *               REQUEST SELECT LIST               *
  *     (status, profile, typeTenant, company)      *
  **************************************************/
  $scope.CallFilterFormU = function(){
     $http({
        method : "GET",
        url : $scope.serverHost+"Coferba/Back/index.php/User/filterForm"
      }).then(function mySuccess(response) {
          $scope.listProfile      = response.data.profile;
          $scope.lisTypeTenant    = response.data.type;
          $scope.listCompany      = response.data.company;
          $scope.listTypeOfTenant = response.data.type;
          $scope.listStatus       = response.data.status;
        }, function myError(response) {
      });
  }

  /**************************************************
  *                                                 *
  *             REQUEST SELECT LIST                 *
  *  (user, reason_disabled_item, typedelivery)     *
  *     (typeouther, typeticket, tipeOpcion)        *
  **************************************************/
  $scope.CallFilterFormT = function(){
    $scope.listUser = "";
     $http({
        method : "GET",
        url : $scope.serverHost+"Coferba/Back/index.php/Ticket/filter"
      }).then(function mySuccess(response) {
          $scope.listTypeDelivery = response.data.typedelivery;
          $scope.listTypeLost     = response.data.reason_disabled_item;
          $scope.listTypeQuery    = response.data.typeouther;
          $scope.listUser         = response.data.user;
          $scope.listAllTenant    = response.data.tenant;
          $scope.listAllTAtt      = response.data.attendant;
          $scope.listTypeTicket   = response.data.typeticket;
          $scope.listStatusTicket = response.data.statusticket;
          $scope.lengthUser = $scope.listUser.length;
        }, function myError(response) {
          $scope.listTypeDelivery = "";
          $scope.listTypeLost     = "";
          $scope.listTypeQuery    = "";
          $scope.listUser         = "";
          $scope.listTypeTicket   = "";
          $scope.listStatusTicket = "";
      });
  }

  /**************************************************
  *                                                 *
  *                ATTENDANT TYPE LIST              *
  *                                                 *
  **************************************************/

  $scope.getTypeAttendant = function(){
     $http({
        method : "GET",
        url : $scope.serverHost+"Coferba/Back/index.php/Ticket/typeAttendant"
      }).then(function mySuccess(response) {
            $scope.listTypeAttendant = response.data;
             $scope.attendantTypeFound=true;
        }, function myError(response) {
          $scope.listTypeAttendant ="";
           $scope.attendantTypeFound=false;
      });
  }
});
