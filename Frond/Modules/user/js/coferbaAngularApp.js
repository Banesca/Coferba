var app = angular.module('coferbaApp', ["blockUI", "inform", "inform-exception", "showdown", "ngAnimate"]);
    app.config(function(blockUIConfig) {
      // Tell blockUI not to mark the body element as the main block scope.
      blockUIConfig.autoInjectBodyBlock = true;  
      blockUIConfig.autoBlock = true;
    });

app.controller('coferbaCtrl', function($scope, $location, $http, blockUI, $timeout, inform, $window) {
/**************************************************************/

$scope.disabledUser = function (itemId,index) {
  $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/User/inactive/"+itemId
    }).then(function mySuccess(response) {

        $scope.CallFilterFormT();

      }, function myError(response) {
    });
 };
$scope.enableUser = function (itemId,index) {
$http({
    method : "GET",
    url : "http://localhost/Coferba/Back/index.php/User/active/"+itemId
  }).then(function mySuccess(response) {
      $scope.CallFilterFormT();
    }, function myError(response) {
  });
};
$scope.updateUser = function (itemId,index) {
  $('#EditModalUser').modal('toggle');
  $scope.getAttData(itemId);
};
$scope.deleteUser = function (itemId,index) {
$http({
    method : "GET",
    url : "http://localhost/Coferba/Back/index.php/User/delete/"+itemId
  }).then(function mySuccess(response) {
      $scope.CallFilterFormT();
    }, function myError(response) {
  });
};
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
     $scope.Token               = localStorage.getItem("Token");
     $scope.sessionIdUser       = localStorage.getItem("idUser");
     $scope.sessionNames        = localStorage.getItem("Nombres");
     $scope.sessionMail         = localStorage.getItem("Email");
     $scope.sessionidAddress    = localStorage.getItem("idAddress");
     $scope.sessionNameAdress   = localStorage.getItem("nameAddress");
     $scope.sessionMovilPhone   = localStorage.getItem("TelefonoM");
     $scope.sessionLocalPhone   = localStorage.getItem("TelefonoL");
     $scope.sessionidProfile    = localStorage.getItem("IdPerfil");
     $scope.sessionProfileName  = localStorage.getItem("nombrePerfil");
     $scope.sessionidStatus     = localStorage.getItem("IdStatus");
     $scope.sessionidCompany    = localStorage.getItem("idCompany");
     $scope.sessionNameCompany  = localStorage.getItem("nameCompany");
     $scope.sessionidTenantUser = localStorage.getItem("idTenantUser");

 /*MOSTRAR EL MONITOR ACTIVO SIEMPRE AL ENTRAR AL SISTEMA*/
     if($scope.sessionidProfile!=3){$scope.home = true;}
/**************************************************
*                                                 *
*            HIDE PROFILES FUNCTION               *
*         USED IN THE USER REGISTER FORM          *
**************************************************/
$scope.showCompanyUser = function(item){
  return item.idProfile == $scope.select.idCompanyKf;
};
/**************************************************/     
/**************************************************
*                                                 *
*           SHOW USER COMPANY FUNCTION            *
*        USED IN THE SERVICE REQUEST FORM         *
**************************************************/
$scope.hideProfiles = function(item){
  return item.idProfile == 3;
};
/**************************************************/  

/**************************************************
*                                                 *
*    LISTADO DE SUCURSALES POR ID DE EMPRESA      *
*                                                 *
**************************************************/
$scope.select = {idCompanyKf:''};
$scope.officeListByCompnayID = function(){
  var idCompanytmp;
  if ($scope.sessionidProfile==2 || $scope.sessionidProfile==4)
    {idCompanytmp=$scope.sessionidCompany;}else if($scope.sessionidProfile==1 && $scope.select.idCompanyKf!=0){ idCompanytmp=$scope.select.idCompanyKf;}

   $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/DIreccion/companyByid/"+idCompanytmp
    }).then(function mySuccess(response) {
        $scope.listOffice   = response.data
      }, function myError(response) {
    });
}

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
*           ADDRESS LIST BY ID TENANT             *
*                                                 *
**************************************************/


$scope.getAllAddressByIdTenant = function (){
  $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/Direccion/byidTenant/"+$scope.sessionidTenantUser
    }).then(function mySuccess(response){
        $scope.ListTenantAddress = response.data;
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
        }, function myError(response) {
          inform.add('Debe selecionar una direccion para obtener el listado de encargados asociados.',{
                          ttl:2000, type: 'warning'
               });
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
*  Select Function to bind the Company User data  *
*                                                 *
**************************************************/
$scope.select={namesAdmin:''};
$scope.getUserCompanyData = function(){
    var idUserComp = $scope.select.namesAdmin;
    /* Recorrer el Json Attendant para obtener datos */
    var length = $scope.listUser.length;
    for (i = 0; i < length; i++) {
        if($scope.listUser[i].idUser == idUserComp){
            $scope.localPhoneAdmin=$scope.listUser[i].phoneLocalNumberUser;
            $scope.movilPhoneAdmin=$scope.listUser[i].phoneNumberUser;
            $scope.emailAdmin     =$scope.listUser[i].emailUser;
            break;
        }
    }; 
  }
/**************************************************/
/**************************************************
*                                                 *
*   Select Function to bind the User data         *
*                                                 *
**************************************************/
$scope.getUserData = function(item){
      var idUser = item;
    /* Recorrer el Json User para obtener datos*/
    var length = $scope.listUser.length;
    for (i = 0; i < length; i++) {
        if($scope.listUser[i].idUser == idUser){
            $scope.phoneNumberUser     = $scope.listUser[i].phoneNumberUser;
            $scope.phonelocalNumberUser= $scope.listUser[i].phoneLocalNumberUser;
            $scope.emailUser           = $scope.listUser[i].emailUser;
            $scope.idProfileKf         = $scope.listUser[i].idProfileKf;
            $scope.namesUser           = $scope.listUser[i].fullNameUser;
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
    $scope.tenantNotFound = false;
  if(n!=0){
      $scope.getDeparment(0);
  }
  if (n==1 && $scope.sessionidProfile==3){
    $scope.typeTenant = 1;
    BindDataToForm('ticketTenantData');
  }else if (n==2 && $scope.sessionidProfile==3){
    $scope.typeTenant = 2;
  }
  if(n==1 && $scope.sessionidProfile!=3){
    $scope.typeTenant = 1;
  }else if(n==2 && $scope.sessionidProfile!=3){
    $scope.typeTenant = 2;
  }

}
/**************************************************/
/**************************************************
*                                                 *
*  LIS THE DEPARTMENT ASSING TO THE OWNER TENANT  *
*                                                 *
**************************************************/

$scope.listUserDepto = function(){
  var idAddressTmp=$scope.select.idAddressAtt;
  var idTenantTmp = 0;
  idTenantTmp = $scope.sessionidProfile==3 ? $scope.sessionidTenantUser : $scope.idTenantKf;
   if ($scope.sessionidProfile==3){
        urlT="http://localhost/Coferba/Back/index.php/Department/byIdTenantYDireccion/"+idAddressTmp+"/"+idTenantTmp;
      }

  $http({
      method : "GET",
      url : urlT
    }).then(function mySuccess(response){
          $scope.ListDptoByTenant = response.data;
          $scope.recordsFound=true;
          $scope.noRecordsFound=false;
    }, function myError (response){
        if (response.status=="404" || response.status=="500"){
          if (!idAddressTmp && $scope.sessionidProfile!=3){
            
            inform.add('Debe Seleccionar una direccion para cargar lista de departamento/s.',{
                          ttl:3000, type: 'error'
               }); 
          }else if (idAddressTmp!=undefined && $scope.sessionidProfile==3){
              $scope.noRecordsFound=true;
              $scope.recordsFound=false;
          } 
        }
  });
}
/**************************************************/
/**************************************************
*                                                 *
*   ASSIGN DEPARTMENT TO THE CURRENT OWNER USER   *
*                                                 *
**************************************************/
$scope.rsDpto={};
$scope.assignUserDepto = function(){
  $http.post("http://localhost/Coferba/Back/index.php/Department/update",$scope._getData2AssignDepto(),setHeaderRequest())
        .then(function(success, data) {
                inform.add('Departamento Asignado y pendiente por aprobacion por la administracion.',{
                  ttl:3000, type: 'success'
                });
                $scope.listUserDepto();   
        },function (error, data, status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error ! "+status+" Contacte a Soporte");}
           
        }); 
}
$scope._getData2AssignDepto = function () {
  var dpto =
          {
               department: { 
                            idDepartment : $scope.select.idDepartmentKf,
                            idTenantKf   : $scope.sessionidTenantUser
                           }
          };
  return dpto;
};
/**************************************************/

/**************************************************
*                                                 *
* DEPARTMENT LIST BY SELECTED ADDRESS AND TENANT  *
*                                                 *
**************************************************/
$scope.getDeparment = function (value){
   var idAddressTmp=$scope.select.idAddressAtt;
   var urlT;
   var manageDpto = value; //Variable usada en la gestion de departamento
      if ($scope.sessionidProfile>0 && manageDpto==1){
         urlT="http://localhost/Coferba/Back/index.php/Department/byIdDireccion/"+idAddressTmp;
      }
      if($scope.sessionidProfile!=3 && manageDpto==0){
        urlT="http://localhost/Coferba/Back/index.php/Department/byIdDireccion/"+idAddressTmp;
      }if ($scope.sessionidProfile==3 && $scope.sessionidTenantUser!=0 && manageDpto==0){
        urlT="http://localhost/Coferba/Back/index.php/Department/byIdTenantYDireccion/"+idAddressTmp+"/"+$scope.sessionidTenantUser;
      }
  $http({
      method : "GET",
      url : urlT
    }).then(function mySuccess(response){
          $scope.ListDpto = response.data;
          console.log(response.data);
    }, function myError (response){
        if (response.status=="404" || response.status=="500"){
          if (!idAddressTmp && $scope.sessionidProfile!=3){
            inform.add('La direccion selecionada no posee departamentos asignados. Contacte a su administrador.',{
                          ttl:3000, type: 'error'
               }); 
          }else if (idAddressTmp!=undefined && $scope.sessionidProfile==3){
            alert(idAddressTmp)
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
$scope.select={idDepartmentKf: ''}
$scope.searchTenant = function (op, item){
    switch (op){
      case "ticket":
          $scope.lisTenantByType($scope.select.idDepartmentKf,$scope.typeTenant);
      break;
      case "depto":
        if ($scope.sessionidProfile==3){
          $scope.typeTenant = 2;
          $scope.lisTenantByType(item,$scope.typeTenant);
        }
      default:
    }
  $scope.opc=op;
   
}
/*------------------------------------------------*/
/**************************************************
*                                                 *
*     SELECCIONA DATA DE TENANT SELECCIONADO      *
*                 DE LA LISTA                     *
**************************************************/
$scope.lisTenantByType = function(v1, v2){
  var idDepto   = v1;
  var typeTenant= v2;
     $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Tenant/tenanatByIdDepartament/"+idDepto+"/"+typeTenant
      }).then(function mySuccess(response) {
          if (!response.data.tenant){
              if(typeTenant==1){$scope.messageInform = "registrado a ningun Propietario";}else{$scope.messageInform = "asociado a ningun inquilino";}
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
*    BUSCAR INQUILINO POR ID DE DEPARTAMENTO      *
*                                                 *
**************************************************/
$scope.searchDptoById = function(){
     $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Department/find/"+$scope.idDpto
      }).then(function mySuccess(response) {
        if (!response.data){
             inform.add('El Departamento no presenta inquilinos registrados.',{
                        ttl:5000, type: 'warning'
             }); 
             
           }else{
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
      case "ticketTenantData":
          $scope.namesTenant        = $scope.sessionNames;
          $scope.addressTenant      = $scope.sessionAddress;
          $scope.movilPhoneTenant   = $scope.sessionMovilPhone;
          $scope.localPhoneTenant   = $scope.sessionLocalPhone;
          $scope.emailTenant        = $scope.sessionMail;
          /*---------------------------------*/
        break;
      case "userProfile":
          $scope.profile.Names              = "";
          $scope.profile.MovilPhoneNumber   = "";
          $scope.profile.PhonelocalNumber   = "";
          $scope.profile.Email              = "";

          $scope.profile.Names              = $scope.sessionNames;
          $scope.profile.MovilPhoneNumber   = $scope.sessionMovilPhone;
          $scope.profile.PhonelocalNumber   = $scope.sessionLocalPhone;
          $scope.profile.Email              = $scope.sessionMail;
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
$scope.isLogin=false;
$scope.sysLogin = function(formReset) {
  $scope.isLogin=true;
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
                   if($scope.rsJSON.idProfileKf==3){
                      mail2Search = $scope.rsJSON.emailUser;
                      $scope.searchTenantByMail();
                    }else{location.href = "sistema.html";}
                   

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
/********************************************************************************************************************************************
*                                                                                                                                           *
*                                                                                                                                           *
*                                           F U N C I O N E S    D E   U S U A R I O S                                                      *
*                                                                                                                                           *
*                                                                                                                                           *
********************************************************************************************************************************************/                         

$scope.getUpdateData = function(){
        $scope.CallFilterFormT();
        var idUser = $scope.sessionIdUser;
         /*Recorrer el Json User para obtener datos*/
        var length = $scope.listUser.length;
        for (i = 0; i < length; i++) {
          if($scope.listUser[i].idUser == idUser){
              localStorage.setItem("Nombres",   $scope.listUser[i].fullNameUser);
              localStorage.setItem("Email",     $scope.listUser[i].emailUser);
              localStorage.setItem("TelefonoM", $scope.listUser[i].phoneNumberUser);
              localStorage.setItem("TelefonoL", $scope.listUser[i].phoneLocalNumberUser);
              $scope.sessionNames       = localStorage.getItem("Nombres");
              $scope.sessionMovilPhone  = localStorage.getItem("TelefonoM");
              $scope.sessionLocalPhone  = localStorage.getItem("TelefonoL");
              $scope.sessionMail        = localStorage.getItem("Email");
              BindDataToForm('userProfile');
              /*------------------------------------------------------------------------*/
              break;
              }
          }; 
          
      }
$scope.userFunctions = function(value){
  switch (value){
    case "updprofile":
      console.log($scope._getData2Update());
        localStorage.removeItem("Nombres");
        localStorage.removeItem("Email");
        localStorage.removeItem("TelefonoM");
        localStorage.removeItem("TelefonoL");
      $scope.modificarUsuario($http, $scope);
      $('#ProfileModalUser').modal('hide');

      $scope.getUpdateData();
    break;
    default:
  }
}


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
      console.log($scope._setuser());
      $scope.addUser($http, $scope);
    }, 2500);
};
$scope.addUser = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/User/", $scope._setuser())
      .then(function (sucess, data) {
        if ($scope.idProfileKf==3){
            $scope.sysRegisterTenant('search'); //CHECK THE TENANT TABLE IF THERE IS ALREADY REGISTERED
        }
        inform.add('Usuario registrado con exito. ',{
                ttl:2000, type: 'success'
             });
        $('#RegisterModalUser').modal('hide');

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error Registro de Usuario !"+status+" Contacte a Soporte"+"error");}
           
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

    },function (error,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error Modificacion de Usuario !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope.profile = {Names:'', Email:'', MovilPhoneNumber:'', PhonelocalNumber:''};
$scope._getData2Update = function () {
  var updUser =
          {
                         user:
                              {
                                fullNameUser         : $scope.profile.Names,
                                emailUser            : $scope.profile.Email,
                                phoneNumberUser      : $scope.profile.MovilPhoneNumber,
                                phoneLocalNumberUser : $scope.profile.PhonelocalNumber,
                                idProfileKf          : $scope.sessionidProfile,
                                idUser               : $scope.sessionIdUser
                              }
          };
    return updUser;

};

/**************************************************/



/********************************************************************************************************************************************
*                                                                                                                                           *
*                                                                                                                                           *
*                                              F U N C I O N E S    D E   I N Q U I L I N O S                                               *
*                                                                                                                                           *
*                                                                                                                                           *
********************************************************************************************************************************************/    
var mail2Search ="";
$scope.rsTenantData = [];
$scope.IsTenant=false;
$scope.tSearch=false;
$scope.sysRegisterTenant = function(value){  //Funciones add, search, update, active, inactive Tenants
    switch (value) {
      case "open": //Opcion Utilizada para registrar un inquilino de cualquier tipo. 
        $scope.IsTenant=true;
        mail2Search ="";
        $('#RegisterModalTenant').modal('toggle');
        $('#ModalListTenant').modal('hide');
      break;

      /*------------------------------------------------------------------------------*/
      case "search": //Buscamos en la tabla tb_tenant por el parametro email.
        if($scope.IsTenant==false){mail2Search=$scope.emailUser;}else if($scope.IsTenant==true){mail2Search=$scope.emailT}
        $scope.tSearch=true;
        $scope.searchTenantByMail();
      break;
      /*------------------------------------------------------------------------------*/
      case "update": //Opcion Usada para actualizados datos de un usuario de tipo propietario o un inqulino normal.
        if($scope.rsTenantData){
            $scope.idTenantmp  = "";
            $scope.idTenantmp  = $scope.rsTenantData.idTenant;
            $scope.editTenant($http, $scope);
            if ($scope.IsTenant==true){
              $('#RegisterModalTenant').modal('hide'); //Hide the modal windows
              if($scope.typeTenant==1){
                $scope.messageInform = "El Propietario:";
              }else{
                $scope.messageInform = "El Inquilino:";
              }
                //Se muestra Mensaje de notificacion de registro 
              inform.add('Datos del '+$scope.messageInform+' '+$scope.fnameT+' han sido actulizados satisfactoriamente.',{
                  ttl:3000, type: 'success'
              });
            }
        }
      break;
      /*------------------------------------------------------------------------------*/
      case "addT": //Opcion Usada para registrar los datos de un usuarios [propietario] en la tabla tenant o un inquilino normal.
            $scope.addTenant($http, $scope);
            if ($scope.IsTenant==true){
              $('#RegisterModalTenant').modal('hide'); //Hide the modal windows
              if($scope.typeTenant==1){
                $scope.messageInform = "El Propietario:";
              }else{
                $scope.messageInform = "El Inquilino:";
              }
                //Se muestra Mensaje de notificacion de registro 
              inform.add($scope.messageInform+' '+$scope.fnameT+' ha sido registrado satisfactoriamente.',{
                  ttl:3000, type: 'success'
              });
                $scope.sysRegisterTenant('data');
                $scope.incrementStep();
            }     
      break;
      /*------------------------------------------------------------------------------*/
       case "data":
        $scope.tSearch=false;
        mail2Search=$scope.emailT;
        $scope.searchTenantByMail();
      break;
      default:
    };  
}
/**************************************************
*                                                 *
*         BUSCAR INQUILINO POR EL EMAIL           *
*                                                 *
**************************************************/

$scope.searchTenantByMail = function (){
  $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Tenant/findByEmail/"+mail2Search
      }).then(function mySuccess(response) {
            $scope.rsTenantData = response.data;
            if($scope.isLogin==true){
              $scope.idTenantmp = response.data.idTenant;
              localStorage.setItem("idTenantUser", $scope.idTenantmp);
              location.href = "sistema.html"
            }
            if($scope.tSearch==false){ //Cargamos el form del Ticket con la data del inquilino.
              $scope.idTenantKf       =  $scope.rsTenantData.idTenant;
              $scope.namesTenant      =  $scope.rsTenantData.fullNameTenant;
              $scope.localPhoneTenant =  $scope.rsTenantData.phoneNumberContactTenant;
              $scope.movilPhoneTenant =  $scope.rsTenantData.phoneNumberTenant;
              $scope.emailTenant      =  $scope.rsTenantData.emailTenant;
            }
            console.log("INQUILINO ENCONTRADO");
            console.log(response.data);
            if($scope.tSearch==true){console.log("INQUILINO ENCONTRADO --> ACTUALIZADO DATOS"); $scope.sysRegisterTenant('update');$scope.tSearch=false;}
        }, function myError(response) {
            if($scope.tSearch==true){console.log("INQUILINO NO ENCONTRADO --> INICIO DE REGISTRO"); $scope.sysRegisterTenant('addT'); $scope.tSearch=false;}
      });
};
/**************************************************/

/**************************************************
*                                                 *
*               REGISTRO DE INQUILINO             *
*                                                 *
**************************************************/
$scope.addTenant = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/Tenant", getTenantData2Add(),setHeaderRequest())
      .then(function (sucess, data) {
      console.log("Registrados Datos del inquilino");
      console.log(getTenantData2Add());
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
if($scope.IsTenant==false){$scope.idDepartmentKf=null;}
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
*             ACTUALIZAR DE INQUILINO             *
*                                                 *
**************************************************/
$scope.editTenant = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/Tenant/update", getData2UpdateTenant())
      .then(function (sucess, data) {
        console.log("Los Datos han sido actualizados");
        console.log(getData2UpdateTenant());
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
  if($scope.IsTenant==false){$scope.idDepartmentKf=null;}
  if($scope.IsTenant==false){
    var tenant =
            {
                  tenant:
                        {
                          idTenant                 : $scope.idTenantmp,
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
                          idTenant                 : $scope.idTenantmp,
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
*               ENCARGADO FUNCIONES               *
*                                                 *
**************************************************/
$scope.sysRegisterAtt = function(value){
  switch (value){
    case "open":
      if (!$scope.select.idAddressAtt){
        inform.add('Debe seleccionar una direccion antes de registrar un nuevo encargado',{
                ttl:3000, type: 'warning'
        });
      }else{$('#RegisterModalAtt').modal('toggle');}
      
    break;
    case "save":
        $scope.localPhoneAtt="";
        $scope.movilPhoneAtt="";
        $scope.emailAtt     ="";
        $scope.addAttendant($http, $scope);
    break;
    default:
  }
}

$scope.addAttendant = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/User/attendant", getAttData2Add(),setHeaderRequest())
      .then(function (sucess, data) {
        inform.add('Encargado registrado satisfactoriamente',{
                ttl:2000, type: 'success'
        });
        console.log(getAttData2Add());
        $('#RegisterModalAtt').modal('hide');
        $scope.getAllAttendant();
    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
function getAttData2Add () {
    var attendant =
            {
                  attendant:
                        {
                          nameAttendant       : $scope.fnameAttd+' '+$scope.lnameAttd,
                          idAddresKf          : $scope.select.idAddressAtt,
                          phoneAttendant      : $scope.phoneMovilAttd,
                          phoneLocalAttendant : $scope.phonelocalAttd,
                          hoursWork           : null,
                          mailAttendant       : $scope.emailAttd
                        }
            };
  return attendant;
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
            //$scope.sysFunctionSend();
            $scope.requestUpKey($http, $scope);
      break;
      case "down":
            console.log($scope._getData2DelKey());
            //$scope.sysFunctionSend();
            $('#confirmRequestModal').modal('toggle');
            $scope.requestDownKey($http, $scope);
            
      break;
      case "srvs":
            console.log($scope._getServiceData());
            //$scope.sysFunctionSend();
            $scope.requestService($http, $scope);
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
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getData2AddKey())
      .then(function (sucess, data) {
          if($scope.typeTenant==2){$scope.sysRegisterTenant('update');}
          closeAllDiv ();
          cleanForms();
       inform.add('Solicitud realizada con exito. ',{ttl:2000, type: 'success'});
        //$scope.modificarUsuario($http, $scope);

    },function (error, status) {
        $scope.handleErrors={Error: error, Status: status};
            if(status == 404){alert("!Informacion "+$scope.handleErrors.error+"info");}
            else if(status == 203){alert("!Informacion ",$scope.handleErrors.error+"info");}
            else{alert("Error ! "+$scope.handleErrors.error+" Contacte a Soporte"+"error");}
           
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
  if($scope.sessionidProfile==3 && $scope.typeOfTenant == 1){
    userIdOwner = $scope.sessionIdUser;
    tenantKf    = $scope.sessionidTenantUser;
  }else if($scope.sessionidProfile==3 && $scope.typeOfTenant == 2){
    userIdOwner = $scope.sessionIdUser;
    tenantKf    = $scope.idTenantKf;
  }
  if($scope.sessionidProfile==4 && $scope.typeOfTenant!=0){
    userIdAConsorcio = $scope.sessionIdUser;
    tenantKf         = $scope.idTenantKf;
  }else if($scope.sessionidProfile==1 && $scope.typeOfTenant!=0){
    idUserAdmin = $scope.sessionIdUser;
    tenantKf    = $scope.idTenantKf;
  }

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
                            idBranchKf        : null,
                            idCompanyKf       : null,
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
          //$scope.modificarUsuario($http, $scope);
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
  if($scope.sessionidProfile==3 && $scope.typeOfTenant == 1){
    userIdOwner = $scope.sessionIdUser;
    tenantKf    = $scope.sessionidTenantUser;
  }else if($scope.sessionidProfile==3 && $scope.typeOfTenant == 2){
    userIdOwner = $scope.sessionIdUser;
    tenantKf    = $scope.idTenantKf;
  }
  if($scope.sessionidProfile==4 && $scope.typeOfTenant!=0){
    userIdAConsorcio = $scope.sessionIdUser;
    tenantKf         = $scope.idTenantKf;
  }else if($scope.sessionidProfile==1 && $scope.typeOfTenant!=0){
    idUserAdmin = $scope.sessionIdUser;
    tenantKf    = $scope.idTenantKf;
  }

  var delKey =
          {
                ticket:
                        {
                            idTypeTicketKf        : 2,
                            idUserEnterpriceKf    : idUserAdmin,
                            idTenantKf            : tenantKf,
                            idUserAdminKf         : userIdAConsorcio,
                            idOWnerKf             : userIdOwner,
                            numberItemes          : $scope.quantity.qkuTenant,
                            description           : $scope.txt.sruTenant,
                            idAttendantKf         : $scope.select.nameAtt,
                            idReasonDisabledItemKf: $scope.select.idTypeLostKf,
                            numberItemDisabled    : $scope.qkuOw,
                            idBranchKf            : null,
                            idCompanyKf           : null,
                            list_id_clients       : null
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
          //$scope.modificarUsuario($http, $scope);

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope.select={idTypeServiceKf: '', idAddressKf: ''};
$scope.txt={sruSv: '', detailSv: '' };
$scope._getServiceData={};
$scope._getServiceData = function () {
  var idUserAdmin      = 0;    //ADMINISTRADOR COFERBA
  var idCompany        = 0;   //ID DE LA EMPRESA O CONSORCIO
  var idCompanyUser    = 0;  //USUARIO EMPRESA
  var userIdAConsorcio = 0; //ADMIN. CONSORCIO
  if($scope.sessionidProfile==1){
    idUserAdmin = $scope.sessionIdUser;
    idCompany   = $scope.idCompanyKf;
  }else if($scope.sessionidProfile==2){
    idCompanyUser = $scope.sessionIdUser;
    idCompany     = $scope.sessionidCompany;
  }else if($scope.sessionidProfile==4){
    userIdAConsorcio = $scope.sessionIdUser;
    idCompany        = $scope.sessionidCompany;
  }
  var reqService =
          {
                ticket:
                        {
                            idTypeTicketKf    : 3,
                            idUserCompany     : idCompanyUser,
                            idUserEnterpriceKf: idUserAdmin,
                            idUserAdminKf     : userIdAConsorcio,
                            numberItemes      : null,
                            descriptionOrder  : $scope.txt.detailSv,
                            description       : $scope.txt.sruSv,
                            idBranchKf        : $scope.select.idAddressKf,
                            idCompanyKf       : idCompany,
                            list_id_clients   : null,
                            idTypeServices    : $scope.select.idTypeServiceKf
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
    $scope.quantity.qkuTenant         ="";
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
  $scope.rucontact = false;
  $scope.rudepto = false;
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
    case "up":
      $('#EditModalUser').modal('hide');
    break;
    case "att":
      $('#RegisterModalAtt').modal('hide');
    break;
    default:
  }
  
}
$scope.fnShowHide = function(divId, divAction) {
  if (divId==null){
      cleanForms();
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
            BindDataToForm('userProfile');
            $scope.ruprofile = true;
          }else{
            closeAllDiv();
          }
        break;
      case "uRegister":
            $('#RegisterModalUser').modal('toggle');
      break;
      case "rukeyup":
            $('#confirmRequestModal').modal('hide');
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
          cleanForms();
        if(divAction=="open"){
          BindDataToForm('frmOther');
          $scope.ruother = true;
        }else{
          closeAllDiv();
          $scope.ruother = false;
        }
      break;
      case "frmcontact":
          closeAllDiv();
        if(divAction=="open"){
          $scope.rucontact = true;
        }else{
          closeAllDiv();
          $scope.rucontact = false;
        }
      break;
      case "managedepto":
          closeAllDiv();
          cleanForms();
        if(divAction=="open"){
          $scope.rudepto = true;
        }else{
          closeAllDiv();
          $scope.rudepto = false;
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


  $http.post("http://localhost/Coferba/Back/index.php/Ticket/all", $searchFilter, setHeaderRequest)
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

































