var moduleRegisterUser = angular.module("coferbaApp.RegisterUser", ["coferbaTokenSystem", "coferbaServices.User"]);



moduleRegisterUser.controller('RegisterUserCtrl', function($scope, $rootScope, $location, $http, blockUI, inputService, userServices, $timeout, tokenSystem, serverHost, serverBackend, $window){

  $scope.register = {idProfileKf:'', fname:'', lname:'', email:'', password1:'', password2:'', phonelocalNumberUser:'', phoneMovilNumberUser: ''};
  $scope.redirectSuccessfull = false;
  $scope.counT  =5;
  $scope.redirect ="#/login";
  tokenSystem.destroyTokenStorage(2);
  $scope.sysToken      = tokenSystem.getTokenStorage(1);
  $scope.sysLoggedUser = tokenSystem.getTokenStorage(2);

  /**************************************************
  *                                                 *
  *               REGISTRO DE USUARIO               *
  *                                                 *
  **************************************************/
  $scope.sysRegisterFn = function(){
    console.log($scope.userData2Add());
      userServices.addUser($scope.userData2Add()).then(function(data){
      $scope.addUserResult = data;
        if($scope.addUserResult){
          $scope.redirectSuccessfull = true;
          $scope.countDownRedirect($scope.redirect, $scope.counT);
        }

      });
 
  }
  $scope.userData2Add = function () {
    var user =
          {
            user:{
                        fullNameUser            : $scope.register.fname+' '+$scope.register.lname,
                        emailUser               : $scope.register.email,
                        phoneNumberUser         : $scope.register.phoneMovilNumberUser,
                        phoneLocalNumberUser    : $scope.register.phonelocalNumberUser,
                        passwordUser            : $scope.register.password2,
                        idProfileKf             : $scope.register.idProfileKf,
                        idCompanyKf             : $scope.register.idCompanyKf,
                        /*-----------------------------------------*/
                        idAddresKf              : $scope.register.idAddrAttKf,
                        idTyepeAttendantKf      : $scope.register.idTypeAttKf,
                        descOther               : $scope.register.typeOtherAtt,
                        //idDepartmentKf          : $scope.register.
                        //isEdit                  : $scope.register.
                        requireAuthentication   : $scope.register.isRequireAuthentication
                  }
          };
    return user;
  };
  $scope.evalIsRequiredPwd = function(){
      if($scope.register.idProfileKf!== 6 && !$scope.register.idTypeAttKf){
        $scope.pwdRequired = true;
      }else if ($scope.register.idProfileKf == 6 && $scope.register.idTypeAttKf && !$scope.register.isRequireAuthentication){
        $scope.pwdRequired = false;
      }else if ($scope.register.idProfileKf == 6 && $scope.register.idTypeAttKf==2 && $scope.register.isRequireAuthentication==1){
        $scope.pwdRequired = true;
      }
      return $scope.pwdRequired;
  }

//**************************************************************
//**************************************************************


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
        url : serverHost+"Coferba/Back/index.php/User/filterForm"
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
        url : serverHost+"Coferba/Back/index.php/Ticket/filter"
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
        url : serverHost+"Coferba/Back/index.php/Ticket/typeAttendant"
      }).then(function mySuccess(response) {
            $scope.listTypeAttendant = response.data;
             $scope.attendantTypeFound=true;
        }, function myError(response) {
          $scope.listTypeAttendant ="";
           $scope.attendantTypeFound=false;
      });
  }

  /**************************************************
  *                                                 *
  *                  ADDRESS LIST                   *
  *                                                 *
  **************************************************/
  $scope.getAllAddress = function (){
    $http({
        method : "GET",
        url : serverHost+"Coferba/Back/index.php/Direccion"
      }).then(function mySuccess(response){
          $scope.ListAddress = response.data;
      }, function myError (response){
        
    });
  }
});
