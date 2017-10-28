 var app = angular.module('coferbaApp', ["blockUI", "inform", "inform-exception", "showdown", "ngAnimate"]);
    app.config(function(blockUIConfig) {
      // Tell blockUI not to mark the body element as the main block scope.
      blockUIConfig.autoInjectBodyBlock = true;  
      blockUIConfig.autoBlock = true;
    });
app.controller('coferbaCtrl', function($scope, $location, $http, blockUI, $timeout, inform, $window) {
/**************************************************************/
  $scope.pasos = [
                'PASO 1: DATOS DEL ENCARGADO',
                'PASO 2: SOLICITUD PARA',
                'PASO 3: DATOS PERSONALES'
                ];
  $scope.mySwitch = $scope.pasos[0];
  $scope.btnShow=true;
  $scope.btnBack=false;
  $scope.getCurrentStepIndex = function(){
    // Get the index of the current step given mySwitch
    return _.indexOf($scope.pasos, $scope.mySwitch);
  };

  $scope.hasNextStep = function(){
    var stepIndex = $scope.getCurrentStepIndex();
    var nextStep = stepIndex + 1;
    // Return true if there is a next step, false if not
    return !_.isUndefined($scope.pasos[nextStep]);
  };

  $scope.hasPreviousStep = function(){
    var stepIndex = $scope.getCurrentStepIndex();
    var previousStep = stepIndex - 1;
    // Return true if there is a next step, false if not
    return !_.isUndefined($scope.pasos[previousStep]);
  };

  $scope.incrementStep = function() {
    if ( $scope.hasNextStep() )
    {
      var stepIndex = $scope.getCurrentStepIndex();
      var nextStep = stepIndex + 1;
      $scope.mySwitch = $scope.pasos[nextStep];
      $scope.btnBack=true;
      if(nextStep>1){$scope.btnShow=false;}
    }
  };

  $scope.decrementStep = function() {
    if ( $scope.hasPreviousStep() )
    {
      var stepIndex = $scope.getCurrentStepIndex();
      var previousStep = stepIndex - 1;
      $scope.mySwitch = $scope.pasos[previousStep];
      $scope.btnShow=true;
      if(previousStep<1){$scope.btnBack=false;}
    }
  };
/**************************************************************/

     $userType=0;
     $scope.rsJSON = [ ];
     $scope.loginRegiterButtons = true;
     $scope.Token              = localStorage.getItem("Token");
     $scope.sessionIdUser      = localStorage.getItem("idUser");
     $scope.sessionNames       = localStorage.getItem("Nombres");
     $scope.sessionMail        = localStorage.getItem("Email");
     $scope.sessionAddress     = localStorage.getItem("Direccion");
     $scope.sessionMovilPhone  = localStorage.getItem("TelefonoM");
     $scope.sessionLocalPhone  = localStorage.getItem("TelefonoL");
     $scope.sessionidProfile   = localStorage.getItem("IdPerfil");
     $scope.sessionProfileName = localStorage.getItem("nombrePerfil");
     $scope.sessionidStatus    = localStorage.getItem("IdStatus");
     $scope.sessionrazonSocial = localStorage.getItem("razonSocial");

     $scope.hideProfile1 = function(item){
        return item.idProfile != 1;
     }

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
        $scope.listCompany = response.data.company;
      }, function myError(response) {
    });
}
$scope.getAllAddress = function (){
  $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/Direccion"
    }).then(function mySuccess(response){
        $scope.ListAddress = response.data;
    }, function myError (response){
      
  });
}
/**************************************************
*                                                 *
*    LISTADO DE DEPARTAMENTO SEGUN DIRECCION      *
*                                                 *
**************************************************/
$scope.getAllDeparment = function (){
   var idAddressTmp
  if (!$scope.idAddressKf){
      idAddressTmp=$scope.select.idAddressAtt;
    }else{
      idAddressTmp=$scope.idAddressKf;
    }
  $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/Department/byIdDireccion/"+idAddressTmp
    }).then(function mySuccess(response){
          $scope.ListDpto = response.data;
    }, function myError (response){
        if (response.status=="404"){
          alert("ENTRO");
          $scope.idDptoKf = $scope.idDptoKf.value
        }
  });
}
/*------------------------------------------------*/
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
     $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Tenant/departamentByIdAdminR/"+$scope.sessionidProfile
      }).then(function mySuccess(response) {
           $scope.names = response.data.tenant;
         
        }, function myError(response) {
      });
  }
$scope.select={idDepartmentKf: ''}
$scope.CallFilterTenant = function(){
  var id=0;
  if($scope.select.idDepartmentKf && $scope.opc=='a' ){
    id=$scope.select.idDepartmentKf;
  }else if ($("#idSelectKeyD").val() && $scope.opc=='b'){
    id=$("#idSelectKeyD").val();
  };
     $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Tenant/tenanatByIdDepartament/"+id
      }).then(function mySuccess(response) {
          if (!response.data.tenant){
              inform.add('La direccion no presenta inquilinos asociados.',{
                          ttl:3000, type: 'error'
               });             
          }else{
              $scope.listTenant = response.data.tenant;
              $('#myModal').modal('toggle');
          }
        }, function myError(response) {
      });
  }

/*------------------------------------------------*/
/**************************************************
*                                                 *
*     LISTADO DE ENCARGADOS SEGUN DIRECCION       *
*                                                 *
**************************************************/
  $scope.select={idAddressAtt:''};
  $scope.getAllAttendant = function(){
    var idAddressAttKf=$scope.select.idAddressAtt;
     $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/User/attendantByIdDirecction/"+idAddressAttKf
      }).then(function mySuccess(response) {
            $scope.listAttendant = response.data;

            $scope.emailAtt=response.data.mailAttendant;
        }, function myError(response) {
      });
  }
/*------------------------------------------------*/


/**************************************************
*                                                 *
*     BUSCAR DEPARTAMENTO POR ID DE INQUILINO     *
*                                                 *
**************************************************/
$scope.searchDptoById = function(){
     $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Department/find/"+$scope.idDpto
      }).then(function mySuccess(response) {
        if (!response.data){
             inform.add('La direccion no presenta inquilinos asociados.',{
                        ttl:5000, type: 'error'
             }); 
             
           }else{
                $scope.addressOw=response.data.departmentAddress +' - '+response.data.deparmentDescription;
                $('#myModal').modal('hide');
                
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
    $scope.idDpto=obj.idTenant;
    $scope.searchDptoById();
    $scope.idTenantKf       =  obj.idTenant;
    $scope.namesTenant      =  obj.fullNameTenant;
    $scope.localPhoneTenant =  obj.phoneNumberContactTenant;
    $scope.movilPhoneTenant =  obj.phoneNumberTenant;
    $scope.emailTenant      =  obj.emailTenant;
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
/*Select Attendant Names */
$scope.select={nameAtt:''};
$scope.getData = function (n){
    $scope.namesTenant      = " ";
    $scope.addressTenant    = " ";
    $scope.movilPhoneTenant = " ";
    $scope.emailTenant      = " ";
    $scope.localPhoneTenant = " "; 
  if (n===1){
    $scope.typeTenant = 1;
    BindDataToForm('1');
  }
  else if (n===2){
    $scope.typeTenant = 2; 
    $scope.getAllDeparment();
  }else if (n==3){
      var idAtt = $scope.select.nameAtt;
    /* Recorrer el Json Attendant para obtener datos */
    var length = $scope.listAttendant.length;
    for (i = 0; i < length; i++) {
        if($scope.listAttendant[i].idAttendant == idAtt){
            $scope.localPhoneAtt=$scope.listAttendant[i].phoneLocalAttendant;
            $scope.movilPhoneAtt=$scope.listAttendant[i].phoneAttendant;
            $scope.emailAtt     =$scope.listAttendant[i].mailAttendant;

            break;
        }
    }; 
  }
}
/**************************************************
*                                                 *
*           Bind Data From LocalStorage           *
*                                                 *
**************************************************/
var frmValue="";
function BindDataToForm(frmValue) {
    switch (frmValue) {
      case "1":
          $scope.namesTenant        = $scope.sessionNames;
          $scope.addressTenant      = $scope.sessionAddress;
          $scope.movilPhoneTenant   = $scope.sessionMovilPhone;
          $scope.localPhoneTenant = $scope.sessionLocalPhone;
          $scope.emailTenant        = $scope.sessionMail;
          /*---------------------------------*/
        break;
      case "fkeydown":
        if ($scope.sessionidProfile==1  || $scope.sessionidProfile==4){
          $scope.namesUser      = $scope.sessionNames;
          $scope.addressUser    = $scope.sessionAddress;
          $scope.movilPhoneUser = $scope.sessionMovilPhone;
          $scope.localPhoneUser = $scope.sessionLocalPhone;
          $scope.emailUser      = $scope.sessionMail;
          /*---------------------------------*/
          $scope.namesTenant      = " ";
          $scope.addressTenant    = " ";
          $scope.movilPhoneTenant = " ";
          $scope.emailTenant      = " ";
          $scope.localPhoneTenant = " ";
        }else if ($scope.sessionidProfile==3){
          $scope.namesUser        = $scope.sessionNames;
          $scope.addressUser      = $scope.sessionAddress;
          $scope.movilPhoneUser   = $scope.sessionMovilPhone;
          $scope.localPhoneAdUser = $scope.sessionLocalPhone;
          $scope.emailUser        = $scope.sessionMail;
          /*---------------------------------*/
          $scope.namesOw      = $scope.sessionNames;
          $scope.addressOw    = $scope.sessionAddress;
          $scope.movilPhoneOw = $scope.sessionMovilPhone;
          $scope.localPhoneOw = $scope.sessionLocalPhone;
          $scope.emailOw      = $scope.sessionMail;
        }
        break;
      case "fservice":
        if ($scope.sessionidProfile==1  || $scope.sessionidProfile==2 || $scope.sessionidProfile==4){
          $scope.namesUser     = $scope.sessionNames;
          $scope.razonSocial   = $scope.sessionrazonSocial
          $scope.addressUser   = $scope.sessionAddress;
          $scope.movilPhoneUser= $scope.sessionMovilPhone;
          $scope.localPhoneUser= $scope.sessionLocalPhone;
          $scope.emailUser     = $scope.sessionMail;
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
    }, 1000);
  $timeout(function() {
      blockUI.stop();
      validateuser($http, $scope);
    }, 1500);
};

/****** Validate data into the database ****/

function validateuser($http,$scope){  
    $http.post("http://localhost/Coferba/Back/index.php/User/auth",$scope._getLoginData(),setHeaderRequest())
        .then(function(data) {
         if (typeof(data.data.response) === "undefined"){
             inform.add('El Correo: '+ $scope.Login.email + ' no se encuentra registrado o ha colocado una clave errada verifique sus datos.',{
                        ttl:3000, type: 'error'
             }); 
             
           }else{
               $scope.rsJSON=data.data.response;
                    inform.add('Bienvenido Sr/a '+ $scope.rsJSON.fullNameUser,{
                      ttl:3000, type: 'success'
                    });
                 localStorage.setItem("idUser", $scope.rsJSON.idUser);
                 localStorage.setItem("Nombres", $scope.rsJSON.fullNameUser);
                 localStorage.setItem("Email", $scope.rsJSON.emailUser);
                 localStorage.setItem("Direccion", $scope.rsJSON.addresUser);
                 localStorage.setItem("TelefonoM", $scope.rsJSON.phoneNumberUser);
                 localStorage.setItem("TelefonoL", $scope.rsJSON.phoneLocalNumberUser);
                 localStorage.setItem("IdPerfil", $scope.rsJSON.idProfileKf);
                 localStorage.setItem("nombrePerfil", $scope.rsJSON.nameProfile);
                 localStorage.setItem("IdStatus", $scope.rsJSON.idStatusKf);
                 localStorage.setItem("nameCompany  ", $scope.rsJSON.nameCompany);
                 localStorage.setItem("Token", true);
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
$scope.sysFunctionSend = function() {
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
    }, 2500);
};

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
$scope.addUser = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/User/", $scope._setuser())
      .then(function (sucess, data) {
        if ($scope.idProfileKf==3){
          $scope.searchTenantByMail();
        }
          inform.add('Usuario registrado con exito. ',{
                  ttl:2000, type: 'success'
               });
          $('#RegisterModal').modal('hide');

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._setuser = function () {
  var user =
          {
                user:{
                            fullNameUser        : $scope.fname+' '+$scope.lname,
                            emailUser           : $scope.emailUser,
                            phoneNumberUser     : $scope.phoneNumberUser,
                            phoneLocalNumberUser: $scope.phonelocalNumberUser,
                            addresUser          : $scope.idAddressKf,
                            passwordUser        : $scope.passwordUser,
                            idProfileKf         : $scope.idProfileKf,
                            idCompanyKf         : $scope.idCompanyKf
                      }
          };
  return user;
};
/**************************************************/

/**************************************************
*                                                 *
*               MODIFICAR USUARIO                 *
*                                                 *
**************************************************/
$scope.modificarUsuario = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/User/update", $scope._getData2Update())
      .then(function (sucess, data) {

       inform.add($scope.sessionNames +' Sus datos han sido actualizado.',{
                ttl:5000, type: 'success'
             });

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._getData2Update = function () {
  var updUser =
          {
                         user:
                              {
                                fullNameUser         : $scope.namesAd,
                                emailUser            : $scope.emailAd,
                                phoneNumberUser      : $scope.movilPhoneAd,
                                phoneLocalNumberUser : $scope.localPhoneAdU,
                                addresUser           : $scope.addressAd,
                                idProfileKf          : $scope.sessionidProfile,
                                idUser               : $scope.sessionIdUser
                              }
          };
          console.log(updUser)
    return updUser;

};

/**************************************************/
/**************************************************
*                                                 *
*               REGISTRO DE INQUILINO             *
*                                                 *
**************************************************/
$scope.addTenant = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/Tenant", $scope._setTenant())
      .then(function (sucess, data) {
      console.log("Registrados Datos del inquilino");
    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};

$scope._setTenant = function () {
  if(!$scope.idTypeTenantKf && $scope.idProfileKf == 3){
    $scope.idTypeTenantKf = 2;
  }else{
    $scope.idTypeTenantKf = $scope.idTypeTenantKf;
  }
  var tenant =
          {
                tenant:
                      {
                        fullNameTenant           : $scope.fname+' '+$scope.lname,
                        idTypeKf                 : $scope.idTypeTenantKf,
                        phoneNumberTenant        : $scope.phoneNumberUser,
                        phoneNumberContactTenant : $scope.phonelocalNumberUser,
                        idDepartmentKf           : $scope.idDepartmentKf,
                        emailTenant              : $scope.emailUser
                      }
          };
  return tenant;
};
/**************************************************/
/**************************************************
*                                                 *
*         OBTENER INQUILINO POR EL EMAIL          *
*                                                 *
**************************************************/
$scope.searchTenantByMail = function (){
  $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Tenant/findByEmail/"+$scope.emailUser
      }).then(function mySuccess(response) {        
            console.log($scope._getData2UpdateTenant());
            $scope.idTenantTmp=response.data.idTenant;
            $scope.editTenant($http, $scope);
        }, function myError(response) {
            console.log($scope._setTenant());
            $scope.addTenant($http, $scope);
      });
};
/**************************************************/
/**************************************************
*                                                 *
*             ACTUALIZAR DE INQUILINO             *
*                                                 *
**************************************************/
$scope.editTenant = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/Tenant/update", $scope._getData2UpdateTenant())
      .then(function (sucess, data) {
        console.log("Actualizada Data del Inquilino");
    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._getData2UpdateTenant = function () {
  if(!$scope.idTypeTenantKf && $scope.idProfileKf == 3){
    $scope.idTypeTenantKf = 2;
  }else{
    $scope.idTypeTenantKf = $scope.idTypeTenantKf;
  }
  var tenant =
          {
                tenant:
                      {
                        fullNameTenant           : $scope.fname+' '+$scope.lname,
                        idTypeKf                 : $scope.idTypeTenantKf,
                        phoneNumberTenant        : $scope.phoneNumberUser,
                        phoneNumberContactTenant : $scope.phonelocalNumberUser,
                        idDepartmentKf           : $scope.idDepartmentKf,
                        emailTenant              : $scope.emailUser,
                        idTenant                 : $scope.idTenantTmp
                      }
          };
  return tenant;
};
/**************************************************/
/**************************************************
*                                                 *
*             SOLICITUDES DE SERVICIOS            *
*  Alta, Baja (llave), Servicios, Otras Consultas *
**************************************************/
$scope.newTicket = function(opt){
    switch (opt) {
      case "up":
            //$scope.sysFunctionSend();
            //$scope.requestUpKey($http, $scope);
      break;
      case "down":
            //$scope.sysFunctionSend();
            //$scope.requestDownKey($http, $scope);
      break;
      case "srvs":
            //$scope.sysFunctionSend();
            //$scope.requestService($http, $scope);
      break;
      case "other":
            //$scope.sysFunctionSend();
            //$scope.otherRequest($http, $scope);
      break;

      default: 
    }


}
/**************************************************
*                                                 *
*               ALTA DE LLAVE                     *
*                                                 *
**************************************************/
$scope.requestUpKey = function ($http, $scope){
  console.log($scope._getData2AddKey())
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getData2AddKey())
      .then(function (sucess, data) {
          closeAllDiv ();
       inform.add('Solicitud realizada con exito. ',{ttl:2000, type: 'success'});
        $scope.modificarUsuario($http, $scope);

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._getData2AddKey = function () {
  

  var newKey =
          {
                ticket:
                        {
                            idTypeTicketKf    : 1,
                            idUserEnterpriceKf: $scope.sessionIdUser,
                            idTenantKf        : $scope.idTenantKf,
                            numberItemes      : $scope.qkuOw,
                            idTypeDeliveryKf  : $scope.idTypeDeliveryKf,
                            description       : $scope.sruOw,
                            list_id_clients   : null
                        }
          };
  return newKey;
};

/**************************************************/
/**************************************************
*                                                 *
*               BAJA DE LLAVE                     *
*                                                 *
**************************************************/
$scope.requestDownKey = function (){
  console.log($scope._getData2DelKey())
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getData2DelKey())
      .then(function (sucess, data) {
          closeAllDiv ();
          inform.add('Solicitud realizada con exito. ',{ttl:2000, type: 'success'});
          $scope.modificarUsuario($http, $scope);
    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._getData2DelKey={};
$scope._getData2DelKey = function () {

  var delKey =
          {
                ticket:
                        {
                            idTypeTicketKf        : 2,
                            idUserEnterpriceKf    : $scope.sessionIdUser,
                            idTenantKf             : $scope.idTenantKf,
                            numberItemes          : null,
                            description           : $scope.sruOw,
                            idReasonDisabledItemKf: $scope.idTypeLostKf,
                            numberItemDisabled    : $scope.qkuOw
                        }
          };
  return delKey;
};

/**************************************************/
/**************************************************
*                                                 *
*                   SERVICIO                      *
*                                                 *
**************************************************/
$scope.requestService = function (){
  console.log($scope._getServiceData());
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getServiceData())
      .then(function (sucess, data) {
          closeAllDiv ();
          inform.add('Solicitud realizada con exito. ',{ttl:2000, type: 'success'});
          $scope.modificarUsuario($http, $scope);

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._getServiceData={};
$scope._getServiceData = function () {

  var reqService =
          {
                ticket:
                        {
                            idTypeTicketKf    : 3,
                            idUserEnterpriceKf: $scope.sessionIdUser,
                            numberItemes      : null,
                            descriptionOrder  : $scope.detailSv,
                            description       : $scope.sruSv,
                            list_id_clients   : null,
                            idTypeServices    : $scope.idTypeServiceKf
                        }
          };
  return reqService;
};

/**************************************************/
/**************************************************
*                                                 *
*                   OTRA CONSULTA                 *
*                                                 *
**************************************************/
$scope.otherRequest = function ($http, $scope){
  console.log($scope._getData2RequestOther())
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getData2RequestOther())
      .then(function (sucess, data) {
          closeAllDiv ();
          inform.add('Consulta realizada y enviada con exito. ',{
                  ttl:2000, type: 'success'
             });

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope._getData2RequestOther={};
$scope._getData2RequestOther = function () {

  var otherReq =
          {
                ticket:
                        {
                            idTypeTicketKf:     4,
                            idTypeOuther:       $scope.idTypeOutherKf,
                            mailContactConsult: $scope.o_email,
                            addressConsul:      $scope.o_address,
                            description:        $scope.o_detail
                        }
          };
  return otherReq;
};

/**************************************************/


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
  $scope.home = false;
  $scope.loginRegiterButtons = false;
  $scope.btnBack=false;
  $scope.btnShow=true;
}

$scope.fnShowHide = function(divId, divAction) {
  if (divId==null){
      closeAllDiv();
   }else{     
    switch (divId) {
      case "uLogin":
          closeAllDiv();
        if(divAction=="open"){
          $scope.uLogin = true;
        }else{
          closeAllDiv();
        }
        break;
        case "uRegister":
            $('#RegisterModal').modal('toggle');
        break;
      case "rukeyup":
          closeAllDiv();
        if(divAction=="open"){
          $scope.mySwitch = $scope.pasos[0];
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
 
        }else{
          closeAllDiv();
        }
        break;
      case "ruservice":
          closeAllDiv();
        if(divAction=="open"){
          $scope.ruservice = true;

        }else{
          closeAllDiv();
          $scope.ruservice = false;
        }
        break;
      case "ruother":
          closeAllDiv();
        if(divAction=="open"){
          $scope.ruother = true;
        }else{
          closeAllDiv();
          $scope.ruother = false;
        }
        break;

        case "home":
          closeAllDiv();
        if(divAction=="open"){
          $scope.home = true;
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


  $http.post("http://localhost/coferba/Back/index.php/Ticket/all", $searchFilter, setHeaderRequest)
  .then(function (sucess, data) {
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
