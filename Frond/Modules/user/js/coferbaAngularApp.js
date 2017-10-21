 var app = angular.module('coferbaApp', ["blockUI", "inform", "inform-exception", "inform-http-exception", "showdown", "ngAnimate"]);
    app.config(function(blockUIConfig) {
      // Tell blockUI not to mark the body element as the main block scope.
      blockUIConfig.autoInjectBodyBlock = true;  
      blockUIConfig.autoBlock = false;
    });
app.controller('coferbaCtrl', function($scope, $http, blockUI, $timeout, inform, $window) {
     $userType=0;
     $scope.rsJSON = [ ];
     $scope.Token = localStorage.getItem("Token")
     $scope.sessionNames       = localStorage.getItem("Nombres")
     $scope.sessionMail        = localStorage.getItem("Email");
     $scope.sessionAddress     = localStorage.getItem("Direccion");
     $scope.sessionPhone       = localStorage.getItem("Telefono");
     $scope.sessionidProfile   = localStorage.getItem("IdPerfil");
     $scope.sessionProfileName = localStorage.getItem("nombrePerfil");
     $scope.sessionidStatus    = localStorage.getItem("IdStatus");
     $scope.sessionrazonSocial = localStorage.getItem("razonSocial");

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
}
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
}
  $scope.CallFilterDpto = function(){
     // el problema es que no te deja seleccionar el id ?
     $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Tenant/departamentByIdAdminR/"+$scope.sessionidProfile
      }).then(function mySuccess(response) {
           $scope.names = response.data.tenant;
         
        }, function myError(response) {
      });
  }

$scope.CallFilterTenant = function(op){
  var id=0;
  if($("#idDepartmentKf").val() && $scope.opc=='a' ){
    id=$("#idDepartmentKf").val();
  }else if ($("#idSelectKeyD").val() && $scope.opc=='b'){
    id=$("#idSelectKeyD").val();
  };
  alert(id);
     $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Tenant/tenanatByIdDepartament/"+id
      }).then(function mySuccess(response) {
        if (!response.data.tenant){
             inform.add('La direccion no presenta inquilinos asociados.',{
                        ttl:5000, type: 'error'
             }); 
             
           }else{
                $scope.listTenant = response.data.tenant;
                $('#myModal').modal('toggle');
          }
        }, function myError(response) {
      });
  }
/*------------------------------------------------*/


$scope.searchOwner = function (op){
  $scope.opc=op;
   $scope.CallFilterTenant();
}

$scope.selectTenant = function (obj){
  console.log(obj);
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
    switch (frmValue) {
      case "fkeyup":
        if ($scope.sessionidProfile==1  || $scope.sessionidProfile==4){
          $scope.namesAd      = $scope.sessionNames;
          $scope.addressAd    = $scope.sessionAddress;
          $scope.movilPhoneAd = $scope.sessionPhone;
          $scope.emailAd      = $scope.sessionMail;
        }else if ($scope.sessionidProfile==3){
          $scope.namesAd      = $scope.sessionNames;
          $scope.addressAd    = $scope.sessionAddress;
          $scope.movilPhoneAd = $scope.sessionPhone;
          $scope.emailAd      = $scope.sessionMail;
          /*---------------------------------*/
          $scope.namesOw      = $scope.sessionNames;
          $scope.addressOw    = $scope.sessionAddress;
          $scope.movilPhoneOw = $scope.sessionPhone;
          $scope.emailOw      = $scope.sessionMail;
        }
        break;
      case "fkeydown":
        if ($scope.sessionidProfile==1  || $scope.sessionidProfile==4){
          $scope.namesAd     = $scope.sessionNames;
          $scope.addressAd   = $scope.sessionAddress;
          $scope.movilPhoneAd= $scope.sessionPhone;
          $scope.emailAd     = $scope.sessionMail;
        }else if ($scope.sessionidProfile==3){
          $scope.namesAd     = $scope.sessionNames;
          $scope.addressAd   = $scope.sessionAddress;
          $scope.movilPhoneAd= $scope.sessionPhone;
          $scope.emailAd=$scope.sessionMail;
          /*---------------------------------*/
          $scope.namesOw     = $scope.sessionNames;
          $scope.addressOw   = $scope.sessionAddress;
          $scope.movilPhoneOw= $scope.sessionPhone;
          $scope.emailOw     = $scope.sessionMail;
        }
        break;
      case "fservice":
        if ($scope.sessionidProfile==1  || $scope.sessionidProfile==2 || $scope.sessionidProfile==4){
          $scope.namesAd     = $scope.sessionNames;
          $scope.razonSocial = $scope.sessionrazonSocial
          $scope.addressAd   = $scope.sessionAddress;
          $scope.movilPhoneAd= $scope.sessionPhone;
          $scope.emailAd     = $scope.sessionMail;
        }
      break;
      case "frmOther":
        $scope.o_email  = $scope.sessionMail;
        $scope.o_address= $scope.sessionAddress;
      break;
      default: 
        
    }
  };
/*-----------------------------------------------*/

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

/****** Validate data into the database ****/

function validateuser($http,$scope){  
    $http.post("http://localhost/Coferba/Back/index.php/User/auth",$scope._getLoginData(),setHeaderRequest())
        .then(function(data) {
         if (typeof(data.data.response) === "undefined"){
             inform.add('El Correo: '+ $scope.Login.email + ' no se encuentra registrado o verifique su clave.',{
                        ttl:5000, type: 'error'
             }); 
             
           }else{
               $scope.rsJSON=data.data.response;
               $timeout(function() {
                    inform.add('Bienvenido Sr/a '+ $scope.rsJSON.fullNameUser,{
                      ttl:5000, type: 'success'
                    });
               });
                 localStorage.setItem("Nombres", $scope.rsJSON.fullNameUser);
                 localStorage.setItem("Email", $scope.rsJSON.emailUser);
                 localStorage.setItem("Direccion", $scope.rsJSON.addresUser);
                 localStorage.setItem("Telefono", $scope.rsJSON.phoneNumberUser);
                 localStorage.setItem("IdPerfil", $scope.rsJSON.idProfileKf);
                 localStorage.setItem("nombrePerfil", $scope.rsJSON.nameProfile);
                 localStorage.setItem("IdStatus", $scope.rsJSON.idStatusKf);
                 localStorage.setItem("razonSocial", $scope.rsJSON.rezonSocial);
                 localStorage.setItem("Token", true);
                 $scope.Token = localStorage.getItem("Token");
                 location.href = "sistema.html"

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
             });

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
      //$scope.otherRequest();
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

        case "home":
        closeAllDiv();
        if(divAction=="open"){
          $scope.home = true;
         // BindDataToForm('frmOther');
        }else{
          closeAllDiv();
          $scope.home = false;
        }
        
        break;
      default: 
        
    }
  }
}


/*jorge*/
$scope.listTickt;
$scope.dhboard = function(){


  var top = 0 
  if($("#topDH").val() > 0){
    top = $("#topDH").val();
  }

  var idTypeTicket = 0;
  if($("#idTypeTicket").val() > 0){
    idTypeTicket = $("#idTypeTicket").val();
  }
  
  $searchFilter= 
  {
   
    searchFilter:$("#searchFilter").val(),
       topFilter : top, 
       idProfileKf:localStorage.getItem("IdPerfil"),
       idTypeTicketKf:idTypeTicket
         
    
  }


  $http.post("http://localhost/Coferba/Back/index.php/Ticket/all", $searchFilter)
  .then(function (sucess, data) {
     inform.add('Consulta realizada y enviada con exito. ',{
              ttl:5000, type: 'success'
         });

         $scope.listTickt =  sucess.data.response;

    },function (error, data,status) {
            
             if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
          
    });
}

$scope.cancelTicket = function(idTicket){

  if (confirm("Confirme Para Cancelar el Ticket!") == true) {
    // el problema es que no te deja seleccionar el id ?
  $http({
    method : "GET",
    url : "http://localhost/Coferba/Back/index.php/Ticket/cancel/"+idTicket
  }).then(function mySuccess(response) {
      $scope.dhboard();
     
    }, function myError(response) {
  });
} else {
    
}

 
}
/**
 * **********************
 */

}); /*Cierre del JS ANGULAR*/
