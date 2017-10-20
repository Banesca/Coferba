 var app = angular.module('coferbaApp', ["blockUI", "inform", "inform-exception", "inform-http-exception", "showdown", "ngAnimate", "LocalStorageModule"]);
    app.config(function(blockUIConfig) {
      // Tell blockUI not to mark the body element as the main block scope.
      blockUIConfig.autoInjectBodyBlock = true;  
      blockUIConfig.autoBlock = false;
    });
app.controller('coferbaCtrl', function($scope, $http, blockUI, $timeout, inform, $window, localStorageService) {
     $userType=0;
     $scope.rsJSON = [ ];

     
    $scope.Token = localStorage.getItem("Token")

/**************************************************
*                                                 *
*            FILTROS GET DE FORMULARIOS           *
*                                                 *
**************************************************/
/*$scope.CallListForm = function(){
     $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/User"
      }).then(function mySuccess(response) {
          $scope.listUsers = response.data;
        }, function myError(response) {
      });
};*/
  /* Retrieve Select Data for user profile*/
$scope.CallFilterFormU = function(){
   $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/User/filterForm"
    }).then(function mySuccess(response) {
        $scope.listProfile = response.data.profile;
        $scope.listType = response.data.type;
      }, function myError(response) {
    });
};
/*Retrieve date for select ticket up/down */
$scope.CallFilterFormT = function(){
   $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/Ticket/filter"
    }).then(function mySuccess(response) {
        $scope.listTypeDelivery = response.data.typedelivery;
        $scope.listTypeLost = response.data.reason_disabled_item;
        $scope.listTypeQuery = response.data.typeouther
      }, function myError(response) {
    });
};

/*------------------------------------------------*/


$scope.searchOwner = function (){

   $('#myModal').modal('toggle');
}


/**************************************************
*                                                 *
*            Default content type encode          *
*                                                 *
**************************************************/

function setHeaderRequest(){
   return  { headers: { 'Content-Type': 'application/json; charset=utf-8' }}
}
/**************************************************
*                                                 *
*            Bind Data to LocalStorage            *
*                                                 *
**************************************************/
var frmValue="";
function BindDataToForm(frmValue) {
    var sessionNames       = localStorageService.get("Nombres")
    var sessionMail        = localStorageService.get("Email");
    var sessionAddress     = localStorageService.get("Direccion");
    var sessionPhone       = localStorageService.get("Telefono");
    var sessionidProfile   = localStorageService.get("IdPerfil");
    var sessionProfileName = localStorageService.get("nombrePerfil");
    var sessionName        = localStorageService.get("IdStatus");
    console.log("MyAddress: "+sessionAddress + " <br> MyEmail: " + sessionMail);
    switch (frmValue) {
      case "fkeyup":
        if (sessionidProfile==1  || sessionidProfile==4){
          $scope.fkeyup.namesAd=sessionNames;
          $scope.fkeyup.addressAd=sessionAddress;
          $scope.fkeyup.movilPhoneAd=sessionPhone;
          $scope.fkeyup.emailAd=sessionMail;
        }else if (sessionidProfile==3){
          $scope.fkeyup.namesAd=sessionNames;
          $scope.fkeyup.addressAd=sessionAddress;
          $scope.fkeyup.movilPhoneAd=sessionPhone;
          $scope.fkeyup.emailAd=sessionMail;
          /*---------------------------------*/
          $scope.fkeyup.namesOw=sessionNames;
          $scope.fkeyup.addressOwd=sessionAddress;
          $scope.fkeyup.movilPhoneOwd=sessionPhone;
          $scope.fkeyup.emailOwd=sessionMail;
        }
        break;
      case "fkeydown":
        if (sessionidProfile==1  || sessionidProfile==4){
          $scope.fkeydown.namesAd=sessionNames;
          $scope.fkeydown.addressAd=sessionAddress;
          $scope.fkeydown.movilPhoneAd=sessionPhone;
          $scope.fkeydown.emailAd=sessionMail;
        }else if (sessionidProfile==3){
          $scope.fkeydown.namesAd=sessionNames;
          $scope.fkeydown.addressAd=sessionAddress;
          $scope.fkeydown.movilPhoneAd=sessionPhone;
          $scope.fkeydown.emailAd=sessionMail;
          /*---------------------------------*/
          $scope.fkeydown.namesOw=sessionNames;
          $scope.fkeydown.addressOwd=sessionAddress;
          $scope.fkeydown.movilPhoneOwd=sessionPhone;
          $scope.fkeydown.emailOwd=sessionMail;
        }
        break;
      case "fservice":
        if (sessionidProfile==1  || sessionidProfile==2 || sessionidProfile==4){
          $scope.fservice.namesAd=sessionNames;
          $scope.fservice.addressAd=sessionAddress;
          $scope.fservice.movilPhoneAd=sessionPhone;
          $scope.fservice.emailAd=sessionMail;
        }
      break;
      case "frmOther":
        $scope.frmOther.o_email=sessionMail;
        $scope.frmOther.o_address=sessionAddress;
      break;
      default: 
        
    }
  };
/*-----------------------------------------------*/

/**************************************************
*                                                 *
*               RESET FORM FUNCTION               *
*                                                 *
**************************************************/
var frm="";
function frmReset (value) {
    switch (value) {
      case "login":
        $scope.Login = {};
        $scope.frmLogin.$setPristine();
        break;
      case "register":

        break;
      case "warning":
        
        break;
      default: 
        
    }
  };
/**************************************************
*                                                 *
*               INGRESO DE USUARIO                *
*                                                 *
**************************************************/

/****** Submit Event at the Login Form ****/
$scope.sysLogin = function(formReset) {
  frm = formReset;
  $scope.rsJSON="";
  blockUI.start('Validando usuario.');

  $timeout(function() {
      blockUI.message('Validando usuario..');
    }, 500);
  $timeout(function() {
      blockUI.message('Validando usuario...');
    }, 1500);
  $timeout(function() {
      blockUI.stop();
      validateuser($http, $scope);
    }, 2500);
};
/****** Show and Hide Main Site ****/
function showHeader(type){
  switch (type) {
      case "success":
        $('#frm_loginU').hide();
        $('#loginRegister').hide(); 
        $('#sytemHead').show(); 
        break;
      case "error":
        $('#loginRegister').hide(); 
        $('#sytemHead').hide(); 
        $('#frm_loginU').show();
        break;
      default: 
        
    }
}
/****** Validate data into the database ****/

function validateuser($http,$scope){


  
    $http.post("http://localhost/Coferba/Back/index.php/User/auth",$scope._getLoginData(),setHeaderRequest())
        .then(function(data) {
         if (typeof(data.data.response) === "undefined"){
            $timeout(function() {
                 showHeader('error');
                 frmReset(frm);
             }, 500);
             inform.add('El Correo: '+ $scope.Login.email + ' no se encuentra registrado o verifique su clave.',{
                        ttl:5000, type: 'error'
             }); 
             
           }else{
               $scope.rsJSON=data.data.response;
               $timeout(function() {
                    showHeader('success');
                    inform.add('Bienvenido Sr/a '+ $scope.rsJSON.fullNameUser,{
                      ttl:5000, type: 'success'
                    });
               });
               localStorageService.set("Nombres", $scope.rsJSON.fullNameUser);
               localStorageService.set("Email", $scope.rsJSON.emailUser);
               localStorageService.set("Direccion", $scope.rsJSON.addresUser);
               localStorageService.set("Telefono", $scope.rsJSON.phoneNumberUser);
               localStorageService.set("IdPerfil", $scope.rsJSON.idProfileKf);
               localStorageService.set("nombrePerfil", $scope.rsJSON.nameProfile);
               localStorageService.set("IdStatus", $scope.rsJSON.idStatusKf);
              // localStorageService.set("Token", true);

               localStorage.setItem("Token", true);

               $scope.Token = localStorage.getItem("Token");

            }
        },function (error, data, status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error ! "+status+" Contacte a Soporte");}
           
        });   
        
  };
/****** Get Data from the Login Form ****/
$scope._getLoginData = function () {
  var dataUser =
          {
               user: { 
                        fullNameUser : $scope.Login.email,
                        passwordUser : $scope.Login.password
                      }
          };
  return dataUser;
};
/*------------------------------------------------*/


/**************************************************
*                                                 *
*               REGISTRO DE USUARIO               *
*                                                 *
**************************************************/
$scope.sysRegisterUser = function() {
  $scope.rsJSON="";
  blockUI.start('Registrando usuario.');

  $timeout(function() {
      blockUI.message('Registrando usuario..');
    }, 500);
  $timeout(function() {
      blockUI.message('Registrando usuario...');
    }, 1500);
  blockUI.done(function(){
    
  });
  $timeout(function() {
      blockUI.stop();
      $scope.addUser($http, $scope);
    }, 2500);
};
 /*Validate if the user is a company */
 $scope.getSelectedData = function(){
    $scope.selectedItem=$scope.idProfileKf;
    if ($scope.selectedItem==2){
        $scope.cpnyinput=true;}else{$scope.cpnyinput=false;
    }
 }
$scope.addUser = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/User/", $scope._setuser())
      .then(function (sucess, data) {

        inform.add('Usuario registrado con exito. ',{
                ttl:5000, type: 'success'
             });;

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._setuser = function () {
var itemSelected="";
 if ($scope.selectedItem==2){itemSelected=$scope.razonSocial;}
  var user =
          {
                user:
                        {
                            fullNameUser: $scope.fname+' '+$scope.lname,
                            emailUser: $scope.emailUser,
                            phoneNumberUser: $scope.phoneNumberUser,
                            addresUser: $scope.addresUser,
                            passwordUser: $scope.passwordUser,
                            idProfileKf: $scope.idProfileKf,
                            rezonSocial: itemSelected
                        }
          };
  return user;
};

/**************************************************
*                                                 *
*               ALTA DE LLAVE                     *
*                                                 *
**************************************************/
$scope.requestKey = function (){
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getRequestData())
      .then(function (sucess, data) {

       inform.add('Solicitud realizada con exito. ',{
                ttl:5000, type: 'success'
             });

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._getRequestData = function () {
  var newTicket =
          {
                ticket:
                        {
                            idTypeTicketKf:     $scope.idTypeTicketKf,
                            idUserEnterpriceKf: $scope.idUserEnterpriceKf ,
                            idOWnerKf:          $scope.idOWnerKf,
                            numberItemes:       $scope.numberItemes,
                            idTypeDeliveryKf:   $scope.idTypeDeliveryKf,
                            description:        $scope.description,
                            list_id_clients:    $scope.list_id_clients
                        }
          };
  return newTicket;
};

/**************************************************/
/**************************************************
*                                                 *
*               BAJA DE LLAVE                     *
*                                                 *
**************************************************/
$scope.releaseKey = function (){
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getReleasedata())
      .then(function (sucess, data) {

       inform.add('Solicitud realizada con exito. ',{
                ttl:5000, type: 'success'
             });

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._getreleaseData = function () {

  var newTicket =
          {
                ticket:
                        {
                            idTypeTicketKf:         $scope.idTypeTicketKf,
                            idUserEnterpriceKf:     $scope.idUserEnterpriceKf ,
                            idOWnerKf:              $scope.idOWnerKf,
                            numberItemes:           $scope.numberItemes,
                            idTypeDeliveryKf:       $scope.idTypeDeliveryKf,
                            description:            $scope.description,
                            idReasonDisabledItemKf: $scope.idReasonDisabledItemKf,
                            numberItemDisabled:     $scope.numberItemDisabled
                        }
          };
  return newTicket;
};

/**************************************************/
/**************************************************
*                                                 *
*                   SERVICIO                      *
*                                                 *
**************************************************/
$scope.requestService = function (){
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getServiceData())
      .then(function (sucess, data) {

       inform.add('Solicitud realizada con exito. ',{
                ttl:5000, type: 'success'
             });

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._getServiceData = function () {

  var newTicket =
          {
                ticket:
                        {
                            idTypeTicketKf:     $scope.idTypeTicketKf,
                            idUserEnterpriceKf: $scope.idUserEnterpriceKf,
                            idOWnerKf:          $scope.idOWnerKf,
                            numberItemes:       $scope.numberItemes,
                            idTypeDeliveryKf:   $scope.idTypeDeliveryKf,
                            descriptionOrder:   $scope.descriptionOrder,
                            description:        $scope.description,
                            list_id_clients:    $scope.list_id_clients,
                            idTypeServices:     $scope.idTypeServices
                        }
          };
  return newTicket;
};

/**************************************************/
/**************************************************
*                                                 *
*                   OTRA CONSULTA                 *
*                                                 *
**************************************************/
$scope.sysRequestOther = function() {
  $scope.roJSON= [ ];

  blockUI.start('Enviando Solicitud.');

  $timeout(function() {
      blockUI.message('Enviando Solicitud..');
    }, 500);
  $timeout(function() {
      blockUI.message('Enviando Solicitud...');
    }, 1500);
  blockUI.done(function(){
    
  });
  $timeout(function() {
      blockUI.stop();
      console.log($scope._getOtherRequestData());
      //$scope.otherRequest($http, $scope);
    }, 2500);
};
$scope.otherRequest = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getOtherRequestData())
      .then(function (sucess, data) {
         inform.add('Consulta realizada y enviada con exito. ',{
                  ttl:5000, type: 'success'
             });

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._getOtherRequestData = function () {

  var newTicket =
          {
                ticket:
                        {
                            idTypeTicketKf:     4,
                            idTypeOuther:       $scope.frmOther.idTypeOutherKf,
                            mailContactConsult: $scope.frmOther.o_email,
                            addressConsul:      $scope.frmOther.o_address,
                            description:        $scope.frmOther.o_detail
                        }
          };
  return newTicket;
};

/**************************************************/

$scope.logout = function(){
  $scope.rsJSON = " ";
  localStorage.clear();
  $scope.Token = false;
  location.href = "sistema.html"
};
/**************************************************
*                                                 *
*            SHOW & HIDE FUNCTION                 *
*                                                 *
**************************************************/
/*------------------------------------------------*/
function closeAllDiv (){
  $scope.rukeydown = false;
  $scope.rukeyup = false;
  $scope.ruservice = false;
  $scope.ruother = false;
}

$scope.fnShowHide = function(divId, divAction) {
  if (divId==null){
      closeAllDiv();
   }else{     
    switch (divId) {
      case "rUser":
        closeAllDiv();
        if(divAction=="open"){
          $scope.rUser = true;
        }else{
          closeAllDiv();
        }
        break;
      case "rukeyup":
        closeAllDiv();
        if(divAction=="open"){
          $scope.rukeyup = true;
          BindDataToForm('fkeyup');
        }else{
          closeAllDiv();
        }
        break;
      case "rukeydown":
        closeAllDiv();
        if(divAction=="open"){
          $scope.rukeydown = true;
          BindDataToForm('fkeydown');
        }else{
          closeAllDiv();
        }
        break;
      case "ruservice":
        closeAllDiv();
        if(divAction=="open"){
          $scope.ruservice = true;
          BindDataToForm('fservice');
        }else{
          closeAllDiv();
          $scope.ruservice = false;
        }
        break;
      case "ruother":
        closeAllDiv();
        if(divAction=="open"){
          $scope.ruother = true;
          BindDataToForm('frmOther');
        }else{
          closeAllDiv();
          $scope.ruother = false;
        }
        
        break;
      default: 
        
    }
  }
}

}); /*Cierre del JS ANGULAR*/
