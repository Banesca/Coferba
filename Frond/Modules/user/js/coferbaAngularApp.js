 var app = angular.module('coferbaApp', ["blockUI", "inform", "inform-exception", "showdown", "ngAnimate"]);
    app.config(function(blockUIConfig) {
      // Tell blockUI not to mark the body element as the main block scope.
      blockUIConfig.autoInjectBodyBlock = true;  
      blockUIConfig.autoBlock = true;
    });
app.controller('coferbaCtrl', function($scope, $location, $http, blockUI, $timeout, inform, $window) {
/**************************************************************/
/**************************************************
*                                                 *
*         NG-SWITCH STEP FORM FUNCTIONS           *
*                                                 *
**************************************************/
  $scope.pasos = [];
  $scope.pasos1 = [
                'PASO 1: DIRECCION',
                'PASO 2: SOLICITUD PARA',
                'PASO 3: DATOS PERSONALES'
                ];
  $scope.pasos2= [
                'PASO 1: DATOS',
                'PASO 2: DATOS DEL SERVICIO'
                 ];
  $scope.fSwitch = "";
  function selectSwitch(valor){
      $scope.fSwitch = valor;
    if ($scope.fSwitch=="t"){ $scope.pasos= $scope.pasos1;}else if ($scope.fSwitch=="s"){$scope.pasos=$scope.pasos2;}
    $scope.mySwitch = $scope.pasos[0];
  }               
  $scope.mySwitch = {};        
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
      if($scope.fSwitch=="t"){if(nextStep>1){$scope.btnShow=false;}}else
      {if(nextStep==1){$scope.btnShow=false;}}
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
/**************************************************
*                                                 *
*         GET THE LOCAL STORAGE VARIALES          *
*                                                 *
**************************************************/
     $scope.rsJSON = [ ];
     $scope.Token=false;
     $scope.loginRegiterButtons = true;
     $scope.Token              = localStorage.getItem("Token");
     $scope.sessionIdUser      = localStorage.getItem("idUser");
     $scope.sessionNames       = localStorage.getItem("Nombres");
     $scope.sessionMail        = localStorage.getItem("Email");
     $scope.sessionidAddress   = localStorage.getItem("idAddress");
     $scope.sessionNameAdress  = localStorage.getItem("nameAddress");
     $scope.sessionMovilPhone  = localStorage.getItem("TelefonoM");
     $scope.sessionLocalPhone  = localStorage.getItem("TelefonoL");
     $scope.sessionidProfile   = localStorage.getItem("IdPerfil");
     $scope.sessionProfileName = localStorage.getItem("nombrePerfil");
     $scope.sessionidStatus    = localStorage.getItem("IdStatus");
     $scope.sessionidCompany   = localStorage.getItem("idCompany");
     $scope.sessionNameCompany = localStorage.getItem("nameCompany");

/**************************************************
*                                                 *
*            HIDE PROFILES FUNCTION               *
*         USED IN THE USER REGISTER FORM          *
**************************************************/
     $scope.hideProfiles = function(item){
        return item.idProfile == 3;
     };
/**************************************************/     

/**************************************************
*                                                 *
*               REQUEST SELECT LIST               *
*     (status, profile, typeTenant, company)      *
**************************************************/
$scope.CallFilterFormU = function(){
   $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/User/filterForm"
    }).then(function mySuccess(response) {
        $scope.listProfile   = response.data.profile;
        $scope.lisTypeTenant = response.data.type;
        $scope.listCompany   = response.data.company;
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
   $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/Ticket/filter"
    }).then(function mySuccess(response) {
        $scope.listTypeDelivery = response.data.typedelivery;
        $scope.listTypeLost     = response.data.reason_disabled_item;
        $scope.listTypeQuery    = response.data.typeouther;
        $scope.listUser         = response.data.user;
      }, function myError(response) {
    });
}
/*------------------------------------------------*/
/**************************************************
*                                                 *
*                  ADDRESS LIST                   *
*                                                 *
**************************************************/
$scope.getAllAddress = function (){
  $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/Direccion"
    }).then(function mySuccess(response){
        $scope.ListAddress = response.data;
    }, function myError (response){
      
  });
}
/**************************************************/

/**************************************************
*                                                 *
*     ATTENDANT LIST BY THE SELECTED ADDRESS      *
*                                                 *
**************************************************/
  $scope.select={idAddressAtt:''};
  $scope.getAllAttendant = function(){
    $scope.select.idDepartmentKf = "";
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
*   Select Function to bind the Attendant data    *
*                                                 *
**************************************************/
$scope.select={nameAtt:''};
$scope.getAttData = function(){
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
/**************************************************/


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
*   Radio Button function to select the tenant    *
*                                                 *
**************************************************/
$scope.getData = function (n){
    $scope.typeOfTenant = n;
    $scope.namesTenant      = "";
    $scope.addressTenant    = "";
    $scope.movilPhoneTenant = "";
    $scope.emailTenant      = "";
    $scope.localPhoneTenant = ""; 
  if(n && $scope.sessionidProfile!=3){
      $scope.getAllDeparment();
  }
  if (n==1 && $scope.sessionidProfile==3){
    $scope.typeTenant = 1;
    BindDataToForm('1');
  }else if(n==1 && $scope.sessionidProfile!=3){
    $scope.typeTenant = 1;
  }
  if (n==2 && $scope.sessionidProfile==3){
    $scope.typeTenant = 2;
    $scope.getAllDeparment();
  }else if(n==2 && $scope.sessionidProfile!=3){
    $scope.typeTenant = 2;
  }
}
/**************************************************/

/**************************************************
*                                                 *
*       DEPARTMENT LIST BY SELECTED ADDRESS       *
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
          console.log(response.data);
    }, function myError (response){
        if (response.status=="404"){
          if ($scope.idAddressKf){
            inform.add('La direccion selecionada no posee departamentos asignados. Contacte a su administrador.',{
                          ttl:3000, type: 'error'
               }); 
          }
            $scope.decrementStep(); 
        }
  });
}
/**************************************************/

/**************************************************
*                                                 *
*         Search Tenant or Owner Functions        *
*                                                 *
**************************************************/
$scope.searchTenant = function (op){
  $scope.opc=op;
   $scope.lisTenantByType();
}
/*------------------------------------------------*/
/**************************************************
*                                                 *
*     SELECCIONA DATA DE TENANT SELECCIONADO      *
*                 DE LA LISTA                     *
**************************************************/
$scope.select={idDepartmentKf: ''}
$scope.lisTenantByType = function(){
  var idDepto=0;
    idDepto=$scope.select.idDepartmentKf;
     $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Tenant/tenanatByIdDepartament/"+idDepto+"/"+$scope.typeTenant
      }).then(function mySuccess(response) {
          if (!response.data.tenant){
              if($scope.typeTenant==1){$scope.messageInform = "registrado a ningun Propietario";}else{$scope.messageInform = "asociado a ningun inquilino";}
              inform.add('El departamento no esta '+$scope.messageInform+'.',{
                          ttl:3000, type: 'error'
               });  
              $scope.tenantNotFound=true;           
          }else{
              $scope.listTenant = response.data.tenant;
              $scope.tenantNotFound=false; 
              $('#ModalListTenant').modal('toggle');
          }
        }, function myError(response) {
          inform.add('Debe seleccionar una opcion de la lista',{
                          ttl:3000, type: 'error'
               }); 
          $scope.tenantNotFound=false; 
      });
  }
/**************************************************
*                                                 *
*     SELECCIONA DATA DE TENANT SELECCIONADO      *
*                 DE LA LISTA                     *
**************************************************/
  $scope.selectTenant = function (obj){
      $scope.idDpto=obj.idTenant;
      $scope.idTenantKf       =  obj.idTenant;
      $scope.namesTenant      =  obj.fullNameTenant;
      $scope.localPhoneTenant =  obj.phoneNumberContactTenant;
      $scope.movilPhoneTenant =  obj.phoneNumberTenant;
      $scope.emailTenant      =  obj.emailTenant;
      $('#ModalListTenant').modal('hide');
      $scope.incrementStep();
      console.log(obj);
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
                $('#ModalListTenant').modal('hide');
                
          }
        }, function myError(response) {
      });
  }
/**************************************************/

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
          $scope.localPhoneTenant   = $scope.sessionLocalPhone;
          $scope.emailTenant        = $scope.sessionMail;
          /*---------------------------------*/
        break;
      case "fkeydown":
        if ($scope.sessionidProfile==1  || $scope.sessionidProfile==4){
          $scope.namesUser      = $scope.sessionNames;
          $scope.addressUser    = $scope.sessionNameAdress;
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
          $scope.addressUser      = $scope.sessionNameAdress;
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
        if ($scope.sessionidProfile==2 || $scope.sessionidProfile==4){
          $scope.namesAdmin      = "";
          $scope.movilPhoneAdmin = "";
          $scope.localPhoneAdmin = "";
          $scope.emailAdmin      = "";
          $scope.namesAdmin      = $scope.sessionNames;
          $scope.movilPhoneAdmin = $scope.sessionMovilPhone;
          $scope.localPhoneAdmin = $scope.sessionLocalPhone;
          $scope.emailAdmin      = $scope.sessionMail;
          $scope.CompanyName     = $scope.sessionNameCompany; 
        }
      break;
      case "frmOther":
        $scope.o_email  = $scope.sessionMail;
        $scope.o_address= $scope.sessionNameAdress;
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
$scope.profileUser = function (){
  $('#ProfileModalTenant').modal('toggle');
}

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
                    console.log(data.data.response);
                 localStorage.setItem("idUser", $scope.rsJSON.idUser);
                 localStorage.setItem("Nombres", $scope.rsJSON.fullNameUser);
                 localStorage.setItem("Email", $scope.rsJSON.emailUser);
                 localStorage.setItem("idAddress", $scope.rsJSON.addresUser);
                 localStorage.setItem("nameAddress", $scope.rsJSON.nameAdress);
                 localStorage.setItem("TelefonoM", $scope.rsJSON.phoneNumberUser);
                 localStorage.setItem("TelefonoL", $scope.rsJSON.phoneLocalNumberUser);
                 localStorage.setItem("IdPerfil", $scope.rsJSON.idProfileKf);
                 localStorage.setItem("nombrePerfil", $scope.rsJSON.nameProfile);
                 localStorage.setItem("IdStatus", $scope.rsJSON.idStatusKf);
                 localStorage.setItem("idCompany", $scope.rsJSON.idCompany);
                 localStorage.setItem("nameCompany", $scope.rsJSON.nameCompany);
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
*   Radio Button function to select the tenant    *
*                                                 *
**************************************************/
$scope.ndpto = 0;
$scope.optionDepto = function (n){
    $scope.ndpto = n;
  if(n==1 && $scope.idProfileKf==3){
      $scope.ndpto=1;
  }else
  if(n==2 && $scope.idProfileKf==3){
    $scope.ndpto=2;
  }
}
/**************************************************/
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
          $('#RegisterModalUser').modal('hide');

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
                ttl:3000, type: 'success'
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

$scope.registerTenant=function(){
  $('#RegisterModalTenant').modal('toggle');
  $('#ModalListTenant').modal('hide');
  $scope.IsTenant=true;
}
/**************************************************
*                                                 *
*               REGISTRO DE INQUILINO             *
*                                                 *
**************************************************/
$scope.addTenant = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/Tenant", getTenantData2Add(),setHeaderRequest())
      .then(function (sucess, data) {
      console.log("Registrados Datos del inquilino");
        if ($scope.IsTenant==true){
           $('#RegisterModalTenant').modal('hide');
           if($scope.typeTenant==1){$scope.messageInform = "El Propietario:";}else{$scope.messageInform = "El Inquilino:";}
            inform.add($scope.messageInform+' '+$scope.fnameT+' ha sido registrado satisfactoriamente.',{
                ttl:3000, type: 'success'
             });
              $scope.searchTenantByMail ();
              $scope.incrementStep();
        }

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
function getTenantData2Add () {
if(!$scope.typeTenant && $scope.idProfileKf == 3){$scope.typeTenant = 1;}
if($scope.typeTenant && $scope.sessionidProfile == 3){$scope.typeTenant=2;}
if($scope.typeTenant==1 && $scope.sessionidProfile != 3){$scope.typeTenant=1}else{$scope.typeTenant=2}
  if($scope.IsTenant==false){
    var tenant =
            {
                  tenant:
                        {
                          fullNameTenant           : $scope.fname+' '+$scope.lname,
                          idTypeKf                 : $scope.typeTenant,
                          phoneNumberTenant        : $scope.phoneNumberUser,
                          phoneNumberContactTenant : $scope.phonelocalNumberUser,
                          idDepartmentKf           : $scope.idDepartmentKf,
                          emailTenant              : $scope.emailUser
                        }
            };
  }else{
    var tenant =
            {
                  tenant:
                        {
                          fullNameTenant           : $scope.fnameT+' '+$scope.lnameT,
                          idTypeKf                 : $scope.typeTenant,
                          phoneNumberTenant        : $scope.phoneMovilT,
                          phoneNumberContactTenant : $scope.phonelocalT,
                          idDepartmentKf           : $scope.select.idDepartmentKf,
                          emailTenant              : $scope.emailT
                        }
            };
  }
  return tenant;
};
/**************************************************/
/**************************************************
*                                                 *
*         OBTENER INQUILINO POR EL EMAIL          *
*                                                 *
**************************************************/
$scope.searchTenantByMail = function (){
  var mail2Search ="";
  if ($scope.IsTenant==true){mail2Search = $scope.emailT}else{mail2Search=$scope.emailUser}
  $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Tenant/findByEmail/"+mail2Search
      }).then(function mySuccess(response) {
            $scope.idTenantTmp=response.data.idTenant;
            /*Datos utilizados unicamente cuando algun admin registra un inquilino*/
              $scope.idTenantKf       =  $scope.idTenantTmp;
              $scope.namesTenant      =  response.data.fullNameTenant;
              $scope.localPhoneTenant =  response.data.phoneNumberContactTenant;
              $scope.movilPhoneTenant =  response.data.phoneNumberTenant;
              $scope.emailTenant      =  response.data.emailTenant;
            /*Datos utilizados unicamente cuando algun admin registra un inquilino*/  
            console.log(getData2UpdateTenant());
            $scope.editTenant($http, $scope);
        }, function myError(response) {
            $scope.addTenant($http, $scope);
            console.log(getTenantData2Add());
      });
};
/**************************************************/

/**************************************************
*                                                 *
*             ACTUALIZAR DE INQUILINO             *
*                                                 *
**************************************************/
$scope.editTenant = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/Tenant/update", getData2UpdateTenant())
      .then(function (sucess, data) {
        console.log("Los Datos han sido actualizados");
    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
function getData2UpdateTenant () {
  if(!$scope.typeTenant && $scope.idProfileKf == 3){$scope.typeTenant = 1;}
  if($scope.typeTenant && $scope.sessionidProfile == 3){$scope.typeTenant=2;}
  if($scope.typeTenant==1 && $scope.sessionidProfile != 3){$scope.typeTenant=1}else{$scope.typeTenant=2}
  if($scope.IsTenant==false){
    var tenant =
            {
                  tenant:
                        {
                          fullNameTenant           : $scope.fname+' '+$scope.lname,
                          idTypeKf                 : $scope.typeTenant,
                          phoneNumberTenant        : $scope.phoneNumberUser,
                          phoneNumberContactTenant : $scope.phonelocalNumberUser,
                          idDepartmentKf           : $scope.idDepartmentKf,
                          emailTenant              : $scope.emailUser
                        }
            };
  }else{
    var tenant =
            {
                  tenant:
                        {
                          fullNameTenant           : $scope.fnameT+' '+$scope.lnameT,
                          idTypeKf                 : $scope.typeTenant,
                          phoneNumberTenant        : $scope.phoneMovilT,
                          phoneNumberContactTenant : $scope.phonelocalT,
                          idDepartmentKf           : $scope.select.idDepartmentKf,
                          emailTenant              : $scope.emailT
                        }
            };
  }
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
            console.log($scope._getData2AddKey());
            $scope.sysFunctionSend();
            $scope.requestUpKey($http, $scope);
      break;
      case "down":
            console.log($scope._getData2DelKey())
            $scope.sysFunctionSend();
            $scope.requestDownKey($http, $scope);
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
          cleanForms();
       inform.add('Solicitud realizada con exito. ',{ttl:2000, type: 'success'});
        $scope.modificarUsuario($http, $scope);

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};

$scope.quantity={qkuTenant: ''};
$scope.delivery={idTypeDeliveryKf: ''};
$scope.txt={sruTenant: ''};
$scope._getData2AddKey = function () {
  var idUserAdmin      = 0;    //ADMINISTRADOR COFERBA
  var tenantKf         = 0;   //INQUILINO
  var userIdOwner      = 0;  //PROPIETARIO
  var userIdAConsorcio = 0; //ADMIN. CONSORCIO
    if ($scope.typeOfTenant == 1){tenantKf=null; userIdOwner=$scope.sessionIdUser;}
    else if ($scope.typeOfTenant == 2){tenantKf = $scope.idTenantKf;}
    if ($scope.sessionidProfile == 4){userIdAConsorcio = $scope.sessionIdUser;}
    else if ($scope.sessionidProfile == 1){idUserAdmin = $scope.sessionIdUser;}

  var newKey =
          {
                ticket:
                        {
                            idTypeTicketKf    : 1,
                            idUserEnterpriceKf: idUserAdmin,
                            idTenantKf        : tenantKf,
                            idUserAdminKf     : userIdAConsorcio,
                            idOWnerKf         : userIdOwner,
                            numberItemes      : $scope.quantity.qkuTenant,
                            idTypeDeliveryKf  : $scope.delivery.idTypeDeliveryKf,
                            description       : $scope.txt.sruTenant,
                            idAttendantKf     : $scope.select.nameAtt,
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
          cleanForms();
          inform.add('Solicitud realizada con exito. ',{ttl:2000, type: 'success'});
          $scope.modificarUsuario($http, $scope);
    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope.select={idTypeLostKf: ''};
$scope._getData2DelKey={};
$scope._getData2DelKey = function () {
  var idUserAdmin      = 0;    //ADMINISTRADOR COFERBA
  var tenantKf         = 0;   //INQUILINO
  var userIdOwner      = 0;  //PROPIETARIO
  var userIdAConsorcio = 0; //ADMIN. CONSORCIO
    if ($scope.typeOfTenant == 1){tenantKf=null; userIdOwner=$scope.sessionIdUser;}
    else if ($scope.typeOfTenant == 2){tenantKf = $scope.idTenantKf;}
    if ($scope.sessionidProfile == 4){userIdAConsorcio = $scope.sessionIdUser;}
    else if ($scope.sessionidProfile == 1){idUserAdmin = $scope.sessionIdUser;}

  var delKey =
          {
                ticket:
                        {
                            idTypeTicketKf        : 1,
                            idUserEnterpriceKf    : idUserAdmin,
                            idTenantKf            : tenantKf,
                            idUserAdminKf         : userIdAConsorcio,
                            idOWnerKf             : userIdOwner,
                            numberItemes          : $scope.quantity.qkuTenant,
                            description           : $scope.txt.sruTenant,
                            idAttendantKf         : $scope.select.nameAtt,
                            idReasonDisabledItemKf: $scope.select.idTypeLostKf,
                            numberItemDisabled    : $scope.qkuOw,
                            list_id_clients   : null
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
function cleanForms (){
    $scope.select.idAddressAtt        = "";
    $scope.select.nameAtt             = "";
    $scope.localPhoneAtt              = "";
    $scope.movilPhoneAtt              = "";
    $scope.emailAtt                   = "";
    $scope.select.idDepartmentKf      = "";
    $scope.typeTenant                 = 0;
    $scope.namesTenant                = "";
    $scope.addressTenant              = "";
    $scope.movilPhoneTenant           = "";
    $scope.emailTenant                = "";
    $scope.localPhoneTenant           = "";
    $scope.select.idTypeLostKf        = "";
    $scope.txt.sruTenant              = "";
    $scope.delivery.idTypeDeliveryKf  ="";
    $scope.typeOfSwitch               ="";
}
/*-----------------------------------------------*/
function closeAllDiv (){
  $scope.rukeydown = false;
  $scope.rukeyup = false;
  $scope.ruservice = false;
  $scope.ruother = false;
  $scope.home = false;
  $scope.loginRegiterButtons = false;
  $scope.btnBack=false;
  $scope.btnShow=true;
  $scope.userManage = false;
}
$scope.closeModal = function(value){

  switch (value){
    case "t":
      $('#RegisterModalTenant').modal('hide');
    break;
    case "u":
      $('#RegisterModalUser').modal('hide');
    break;
    case "p":
      $('#ProfileModalUser').modal('hide');
    break;
    default:
  }
  
}
$scope.fnShowHide = function(divId, divAction) {
  if (divId==null){
      closeAllDiv();
      cleanForms();
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
      case "user":
            closeAllDiv();
          if(divAction=="open"){
            $scope.userManage = true;
          }else{
            closeAllDiv();
          }
      break;
      case "ruprofile":
            cleanForms();
          if(divAction=="open"){
            $('#ProfileModalUser').modal('toggle');
            $scope.ruprofile = true;
          }else{
            closeAllDiv();
          }
        break;
        case "uRegister":
            $('#RegisterModalUser').modal('toggle');
      break;
      case "rukeyup":
            closeAllDiv();
            cleanForms();
          if(divAction=="open"){
            $scope.rukeyup = true;
            selectSwitch ('t');
          }else{
            closeAllDiv();
          }
      break;
      case "rukeydown":
          closeAllDiv();
          cleanForms();
        if(divAction=="open"){
          $scope.rukeydown = true;
          selectSwitch ('t');
        }else{
          closeAllDiv();
        }
      break;
      case "ruservice":
          closeAllDiv();
          cleanForms();
        if(divAction=="open"){
          $scope.ruservice = true;  
          selectSwitch ('s');
          BindDataToForm ('fservice');
        }else{
          closeAllDiv();
          $scope.ruservice = false;
        }
      break;
      case "ruother":
          closeAllDiv();
        if(divAction=="open"){
          BindDataToForm('frmOther');
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

































