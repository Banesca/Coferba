 var app = angular.module('coferbaApp', ["blockUI", "inform", "inform-exception", "inform-http-exception", "showdown", "ngAnimate"]);
    app.config(function(blockUIConfig) {
      // Tell blockUI not to mark the body element as the main block scope.
      blockUIConfig.autoInjectBodyBlock = true;  
      blockUIConfig.autoBlock = false;
    });
app.controller('coferbaCtrl', function($scope, $http, blockUI, $timeout, inform, $window, ) {
     $userType=0;
     $scope.rsJSON = [ ];

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
var frm="";
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
*               RESET FORM FUNCTION               *
*                                                 *
**************************************************/
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
        $('.main_container [id^="frm_"]').hide();
        $('#frm_loginU').hide();
        $('#loginRegister').hide(); 
        $('#sytemHead').show(); 
        break;
      case "error":
        $('.main_container [id^="frm_"]').hide();
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
             inform.add('El Correo: '+ $scope.Login.email + ' no se encuentra registrado.',{
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
             //console.log($scope.rsJSON);
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
                        emailUser : $scope.Login.email,
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
                            idTypeTicketKf: idTypeTicketKf,
                            idUserEnterpriceKf: idUserEnterpriceKf ,
                            idOWnerKf: idOWnerKf,
                            numberItemes: numberItemes,
                            idTypeDeliveryKf: idTypeDeliveryKf,
                            description: description,
                            list_id_clients: list_id_clients
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
                            idTypeTicketKf: idTypeTicketKf,
                            idUserEnterpriceKf: idUserEnterpriceKf ,
                            idOWnerKf: idOWnerKf,
                            numberItemes: numberItemes,
                            idTypeDeliveryKf: idTypeDeliveryKf,
                            description: description,
                            idReasonDisabledItemKf: idReasonDisabledItemKf,
                            numberItemDisabled: numberItemDisabled
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
                            idTypeTicketKf: idTypeTicketKf,
                            idUserEnterpriceKf: idUserEnterpriceKf,
                            idOWnerKf: idOWnerKf,
                            numberItemes: numberItemes,
                            idTypeDeliveryKf: idTypeDeliveryKf,
                            descriptionOrder: descriptionOrder,
                            description: description,
                            list_id_clients: list_id_clients,
                            idTypeServices: idTypeServices
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
$scope.otherRequest = function (){
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getOtherRequestData())
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
$scope._getOtherRequestData = function () {

  var newTicket =
          {
                ticket:
                        {
                            idTypeTicketKf: idTypeTicketKf,
                            idTypeOuther: idTypeOuther,
                            mailContactConsult: mailContactConsult,
                            addressConsul: mailContactConsult,
                            description:description
                        }
          };
  return newTicket;
};

/**************************************************/

$scope.logout = function(){
  $scope.rsJSON = " ";
};
/*------------------------------------------------*/

}); /*Cierre del JS ANGULAR*/
