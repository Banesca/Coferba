var moduleRegisterUser = angular.module("coferbaApp.RegisterUser", ["coferbaTokenSystem", "coferbaServices.User"]);



moduleRegisterUser.controller('RegisterUserCtrl', function($scope, inform, $rootScope, $location, $http, blockUI, inputService, userServices, $timeout, tokenSystem, serverHost, serverBackend, $window){

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
    if($scope.register.idProfileKf==3){
      $scope.register.idTypeTenantKf ="1";
      $scope.register.idDepartmentKf=null;
    }else if ($scope.register.idProfileKf==5){
      $scope.register.idTypeTenantKf ="2";
    }else if($scope.register.idProfileKf==6 && $scope.register.idTypeAttKf==2){
      $scope.register.idTypeTenantKf=1;
      $scope.register.isRequireAuthentication=1;
    }else{
      $scope.register.idTypeTenantKf=null;
      $scope.register.isRequireAuthentication=0;
      $scope.register.idDepartmentKf=null;
    }
    if($scope.register.idProfileKf!=2 && $scope.register.idProfileKf!=4 && $scope.register.idAddrAttKf){
      $scope.register.idCompanyKf = $scope.getCompanyFromAddress();
    }
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
                        idTypeTenantKf          : $scope.register.idTypeTenantKf,
                        descOther               : $scope.register.typeOtherAtt,
                        idDepartmentKf          : $scope.register.idDepartmentKf,
                        isEdit                 : 1,
                        requireAuthentication   : $scope.register.isRequireAuthentication
                  }
          };
    return user;
  };

$scope.sysCheckEmail = function(){
  $scope.sysEmailRegistered=false;
  if($scope.register.email){
    userServices.checkUserMail($scope.register.email, "register").then(function(data) {
      $scope.mailCheckResult= data;
      if($scope.mailCheckResult){
        $scope.sysEmailRegistered=true;
          $scope.register.email="";

      }else{
        $scope.sysEmailRegistered=false;
      }
    });
  }
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
  $scope.getAdressSelected = function(){
    var idAddrr = $scope.register.idAddrAttKf;
    /* Recorrer el Json para obtener datos */
    var length = $scope.ListAddress.length;
    var rsJSON = {address: {}};
    for (i = 0; i < length; i++) {
        if($scope.ListAddress[i].idAdress == idAddrr){
            rsJSON.address = $scope.ListAddress[i];
            //console.log(rsJSON);
            break;
        }
    }; 
    return rsJSON;
}
$scope.getCompanyFromAddress = function(){
    var rsJSONAddress = $scope.getAdressSelected();
    /* Recorrer el Json para obtener datos */
    var companyKf = "";
    var length = $scope.listCompany.length;
    for (i = 0; i < length; i++) {
        if($scope.listCompany[i].idCompany == rsJSONAddress.address.SA_ID_COMPANY){
            
            companyKf = $scope.listCompany[i].idCompany;
            //console.log($scope.listCompany[i]);
            break;
        }
    }; 
    return companyKf;
  }


//**************************************************************
//**************************************************************


  $scope.fnLoadPhoneMask = function(){
    /**********************************************
    *               INPUT PHONE MASK              *
    **********************************************/
    $('.input--movil').mask('99999999999');
    $('.input--local').mask('9999999999');
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
          $scope.listTypeTicket   = response.data.typeticket;
          $scope.listStatusTicket = response.data.statusticket;
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
*           CHECK IF A DEPTO HAS OWNER            *
*                                                 *
**************************************************/
$scope.ownerFound=false;
$scope.deptoHasOwner = function () {
  if($scope.register.idProfileKf==6 && $scope.register.idTypeAttKf!=1){
    $scope.idDepartment= $scope.register.idDepartmentKf;
      $http({
        method : "GET",
        url : serverHost+serverBackend+"Department/chekDepartamenteOwner/"+$scope.idDepartment
      }).then(function mySuccess(response) {
            if (response.data=="true"){
              $scope.ownerFound=true;
              $scope.register.idDepartmentKf=null;
              console.log("EL DEPTO: "+$scope.idDepartment+" Ya tiene un propietario Asignado");
            }else if(response.data=="false"){
              $scope.ownerFound=false;
              console.log("EL DEPTO: "+$scope.idDepartment+" No tiene un propietario Asignado");
            }
              
        }, function myError(response) {
            if (!$scope.idDepartment){
              inform.add('El Consorcio no ha cargado el departamento correspondiente a la porteria, por lo que no es posible asignar un Encargado.',{
                    ttl:6000, type: 'danger'
              });
            }
          
      });
  }
};
/**************************************************/
/**************************************************
*                                                 *
* DEPARTMENT LIST BY SELECTED ADDRESS AND TENANT  *
*                                                 *
**************************************************/
$scope.getDeptoListByAddress = function (){
  console.clear();
  $scope.ListDpto="";
  if(($scope.register.idProfileKf==5 && !$scope.register.idTypeAttKf) || ($scope.register.idProfileKf==6 && $scope.register.idTypeAttKf!=1)){
     var idAddressTmp=$scope.register.idAddrAttKf;
     var urlT="";
      urlT=serverHost+serverBackend+"Department/byIdDireccion/"+idAddressTmp+"/"+'-1';

    $http({
        method : "GET",
        url : urlT
      }).then(function mySuccess(response){
            $scope.ListDpto = response.data;
            var listLength = $scope.ListDpto.length;
            for (i = 0; i < listLength; i++) {
                if($scope.register.idProfileKf==6){
                  if($scope.ListDpto[i].idAdressKf == idAddressTmp && ($scope.ListDpto[i].departmentFloor=="Porteria" || $scope.ListDpto[i].departmentFloor=="porteria") && $scope.ListDpto[i].idUserKf!=null){
                    //console.log($scope.ListDpto[i].departmentFloor);
                    $scope.ownerFound=true;
                    //console.log("ownerFoundtrue: "+$scope.ownerFound+" idUserKf: "+$scope.ListDpto[i].idUserKf);
                    
                  }else if($scope.ListDpto[i].idAdressKf == idAddressTmp && ($scope.ListDpto[i].departmentFloor=="Porteria" || $scope.ListDpto[i].departmentFloor=="porteria") && $scope.ListDpto[i].idUserKf==null){
                    //console.log($scope.ListDpto[i].departmentFloor);
                    $scope.ownerFound=false;
                    //console.log("ownerFoundfalse: "+$scope.ownerFound+" idUserKf: "+$scope.ListDpto[i].idUserKf);
                  }
                  // console.log("total de deptos: "+listLength+" / contador: "+i);
                }
            }; 
              return $scope.ownerFound;
            //console.log(response.data);
      }, function myError (response){
        $scope.ListDpto="";
        if (!idAddressTmp && response.status=="404"){
          inform.add('Debe seleccionar una direccion para ver los departamentos asociados..',{
                        ttl:5000, type: 'warning'
          }); 
        }else if (response.status=="404" || response.status=="500"){
          inform.add('No hay departamentos en esta direccion para ser asignados, Contacte al administrador.',{
                        ttl:5000, type: 'info'
          }); 
        }
      });
  }
};
/**************************************************/

  $scope.hideDeptoByProfile = function(){
    return function(item){
      if($scope.register.idProfileKf==6 && item.idUserKf!=null && (item.departmentFloor=="Porteria" || item.departmentFloor=="porteria")){
      
        //$scope.ownerFound=true;
        //console.log("ownerFound1: "+$scope.ownerFound+"item.idUserKf: "+item.idUserKf)
        return false;
      }else if($scope.register.idProfileKf==6 && item.idUserKf==null && (item.departmentFloor=="Porteria" || item.departmentFloor=="porteria")){
        
        //$scope.ownerFound=false;
        //console.log("ownerFound2: "+$scope.ownerFound+"item.idUserKf: "+item.idUserKf)
        return true;
      }
      else if($scope.register.idProfileKf==5 && (item.departmentFloor!="Porteria" && item.departmentFloor!="porteria")){
        return true;
      }
        
        return false;
    }
  };
  $scope.hideTypeAttendant = function(){
    return function(item){
      if($scope.register.idProfileKf==6 && item.idTyepeAttendant==2){
        return true;
      }
      return false;
    }
  };
});
