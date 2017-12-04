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
                'PASO 3: DATOS DE LA SOLICITUD'
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
  $scope.stepIndexTmp=0;
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
      $scope.stepIndexTmp = nextStep;
      $scope.mySwitch = $scope.pasos[nextStep];
      $scope.formValidated=false;
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
      $scope.stepIndexTmp = previousStep;
      $scope.mySwitch = $scope.pasos[previousStep];
      $scope.formValidated=true;
      $scope.btnShow=true;
      if(previousStep<1){$scope.btnBack=false;}
    }
  };
  $scope.enabledNextBtn=function(){

    switch ($scope.stepIndexTmp){
      case 0:
        if ($scope.fSwitch=="t" && $scope.sessionidProfile!=0){
          if (!$scope.select.idAddressAtt || !$scope.select.nameAtt ){
                $scope.formValidated=false; 
          }else{
            $scope.formValidated=true;
          }

        }else if ($scope.fSwitch=="s" && $scope.sessionidProfile!=3){
          if (!$scope.select.idAddressKf){
                $scope.formValidated=false; 
          }else{
            $scope.formValidated=true;
          }
        }
        break;
        case 1:
        if ($scope.fSwitch=="t" && $scope.sessionidProfile!=0){
          if (!$scope.select.idDepartmentKf || $scope.tenant.namesTenant==""){
                $scope.formValidated=false; 
          }else{
            $scope.formValidated=true;
          }

        }
        break;
      default:
    }
  }
/**************************************************************/
/**************************************************
*                                                 *
*         GET THE LOCAL STORAGE VARIALES          *
*                                                 *
**************************************************/
     $scope.rsJSON = [ ];
     $scope.Token=false;
     $scope.Token               = localStorage.getItem("Token");
$scope.sysLoadLStorage = function (){
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
     //$scope.sysParameterVar     = localStorage.getItem("sysParameters");
     //if($scope.sessionidProfile==3){$scope.getAllAddressByIdTenant();}
     if($scope.sessionidProfile!=3 && $scope.sessionidCompany){
      $scope.officeListByCompnayID();
     }

}
 /*MOSTRAR EL MONITOR ACTIVO SIEMPRE AL ENTRAR AL SISTEMA*/
     if($scope.sessionidProfile!=3){$scope.home = true;}
/**************************************************
*                                                 *
*            HIDE PROFILES FUNCTION               *
*         USED IN THE USER REGISTER FORM          *
**************************************************/
$scope.showCompanyUser = function(item){
  //alert($scope.select.idCompanyKf);
  return item.idCompanyKf == $scope.select.idCompanyKf;
};
/**************************************************/ 
  
/**************************************************
*                                                 *
*           SHOW USER COMPANY FUNCTION            *
*        USED IN THE SERVICE REQUEST FORM         *
**************************************************/
$scope.hideTypeTenant = function(item){
  console.log($scope.typeTenant);
  return $scope.hideTypeTenant= $scope.typeTenant;
};
/**************************************************/  


  $('#sidebar-nav > div').click(function(){
    alert("Hola");
  var i = $(this).index();
  $('#sidebar-nav > div').removeClass('active').eq(i).addClass('active');

});



/**************************************************
*                                                 *
*                 GET PARAMETER                   *
*      (smtpmail, cost, , )                       *
**************************************************/
$scope.listParameter = [];
$scope.getParameter = function(){
   $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/User/mailsmtp"
    }).then(function mySuccess(response) {
        $scope.listParameter   = response.data;
    }, function myError(response) {
    });
}
/**************************************************
*                                                 *
*   Get SMTP Parameter from the List Parameter    *
*                                                 *
**************************************************/

$scope.loadParameter = function(item1, item2, value){
    var section2Load = value;
    /* Recorrer el Json Parameter para obtener datos*/
    var length = $scope.listParameter.length;
    for (i = 0; i < length; i++){
      if($scope.listParameter[i].idParam >= item1 && $scope.listParameter[i].idParam < item2){
          $scope.parameterId        = $scope.listParameter[i].idParam;
          $scope.parameterValue     = $scope.listParameter[i].value;
          $scope.parameterDescrip   = $scope.listParameter[i].description;
          BindDataToForm(section2Load);
      }
    }
}
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
        $scope.companyFound=true;
      }, function myError(response) {
        $scope.companyFound=false;
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

$scope.addrNoFound=0;
$scope.getAllAddressByIdTenant = function (){
  $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/Direccion/byidTenant/"+$scope.sessionidTenantUser+"/"+1
    }).then(function mySuccess(response){
        $scope.ListTenantAddress = response.data;
        $scope.addrNoFound = 0;
        $scope.modalConfirmation('checkAddr', 0);
    }, function myError (response){
          $scope.addrNoFound = 1;
          $scope.modalConfirmation('checkAddr', 0);

      
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
            $scope.attendantFound=true;
        }, function myError(response) {
          $scope.attendantFound=false;
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
    $scope.tenant.namesTenant      = "";
    $scope.tenant.addressTenant    = "";
    $scope.tenant.movilPhoneTenant = "";
    $scope.tenant.emailTenant      = "";
    $scope.tenant.localPhoneTenant = "";
    $scope.tenantNotFound = false;
  if(n && $scope.select.idAddressAtt){
      $scope.getDeparment(0);
  }
  if (!$scope.select.idAddressAtt){
    inform.add('Debe seleccionar una direccion o Contacte a su administrador.',{
                          ttl:5000, type: 'error'
               }); 
    $scope.decrementStep();   
  }else
  if (n==1 && $scope.sessionidProfile==3 && !$scope.select.idDepartmentKf){
    inform.add('Debe seleccionar un departamento para continuar con la solicitud.',{
                          ttl:3000, type: 'info'
    }); 
  }
  if (n==1 && $scope.sessionidProfile==3){
    $scope.typeTenant = 1;
    BindDataToForm('ticketTenantData');
  }else if (n==2 && $scope.sessionidProfile==3){
    $scope.typeTenant = 2;
  }else
  if(n==1 && $scope.sessionidProfile!=3){
    $scope.typeTenant = 1;
  }else 
  if(n==2 && $scope.sessionidProfile!=3){
    $scope.typeTenant = 2;
  }

}
/**************************************************/
/**************************************************
*                                                 *
*  LIS THE DEPARTMENT ASSING TO THE OWNER TENANT  *
*                                                 *
**************************************************/

$scope.listUserDepto = function(value){
  $scope.manageDepto=value;
  var idAddressTmp=$scope.select.idAddressAtt;
  var idTenantTmp = 0;
  var urlT="";
  idTenantTmp = $scope.sessionidProfile==3 ? $scope.sessionidTenantUser : $scope.idTenantKf;
   if ($scope.sessionidProfile==3){
        urlT="http://localhost/Coferba/Back/index.php/Department/byIdTenantYDireccion/"+idAddressTmp+"/"+idTenantTmp+"/"+'-1';
      }else{
        urlT="http://localhost/Coferba/Back/index.php/Department/byIdDireccion/"+idAddressTmp+"/"+'-1';
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
          if ($scope.sessionidProfile!=3){
              $scope.recordsFound=false;
              $scope.noRecordsFound=true;
              
          }else if ($scope.sessionidProfile==3){
              console.log("NO TIENE DEPARTAMENTO ASOCIADO");
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
$scope.UserAassignUnAssignDepto = function(itemId){
  var idDeptoKf=!itemId ? $scope.select.idDepartmentKf : itemId;
  console.log($scope._getData2AssignDepto(idDeptoKf));
  $http.post("http://localhost/Coferba/Back/index.php/Department/update",$scope._getData2AssignDepto(idDeptoKf),setHeaderRequest())
        .then(function(success, data) {
            if ($scope.sessionidProfile==3){
                inform.add('Departamento Asignado y pendiente por aprobacion por la administracion.',{
                  ttl:3000, type: 'success'
                });
            }
            if ($scope.sessionidProfile!=3 && $scope.removeOwnerDepto==1){
              console.log("<<<<DEPARTAMENTO ID: "+idDeptoKf+" FUE DADO DE BAJA SATISFACTORIAMENTE>>>>");
            }
            if ($scope.sessionidProfile!=3 && $scope.removeOwnerDepto==0){$scope.approveDepto();}
                $scope.listUserDepto(1);  
        },function (error, data, status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error ! "+status+" Contacte a Soporte");}
           
        }); 
}
$scope._getData2AssignDepto = function (item) {
  var idTenantUsertmp;
  var isRequestLowKf;
  if ($scope.removeOwnerDepto>=0){isRequestLowKf=0;}
  var idDepartmentKf= !$scope.select.idDepartmentKf ? item : $scope.select.idDepartmentKf
  if ($scope.sessionidProfile==3){idTenantUsertmp = $scope.sessionidTenantUser;}
  else if($scope.sessionidProfile!=3 && $scope.removeOwnerDepto==0){idTenantUsertmp=$scope.idTenantKf;}
  else if($scope.sessionidProfile!=3 && $scope.removeOwnerDepto==1){idTenantUsertmp=null;
  }
  var dpto =
          {
               department: { 
                            idDepartment        : idDepartmentKf,
                            idTenantKf          : idTenantUsertmp,
                            isRequesLowByProp   : isRequestLowKf
                           }
          };
  return dpto;
};
/**************************************************/

/**************************************************
*                                                 *
*      APPROVE DEPARTMENT TO AN OWNER USER        *
*                                                 *
**************************************************/
$scope.approveDepto = function (itemId) {
  var idDeptoKf = !itemId ? $scope.select.idDepartmentKf : itemId;
  $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/Department/aprobated/"+idDeptoKf
    }).then(function mySuccess(response) {
        if($scope.manageDepto==1){
          $scope.listUserDepto(1);
        }
        console.log("<<<<DEPARTAMENTO ID: "+idDeptoKf+" FUE APROBADO SATISFACTORIAMENTE>>>>");
      }, function myError(response) {
    });
 };

/**************************************************/
/**************************************************
*                                                 *
*      DISALLOW DEPARTMENT TO AN OWNER USER       *
*                                                 *
**************************************************/
$scope.removeOwnerDepto=0;
$scope.disallowDepto = function (itemId) {
  $scope.removeOwnerDepto=1;
  var idDeptoKf = !itemId ? $scope.select.idDepartmentKf : itemId;
  $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/Department/desaprobated/"+idDeptoKf
    }).then(function mySuccess(response) {
            if($scope.manageDepto==1){
              $scope.UserAassignUnAssignDepto(idDeptoKf);
            }
      }, function myError(response) {
    });
 };

/**************************************************/
/**************************************************
*                                                 *
*     DOWN REQUEST DEPARTMENT TO AN OWNER USER    *
*                                                 *
**************************************************/
$scope.requestDownDepto = function (itemId) {
  var idDeptoKf = !itemId ? $scope.select.idDepartmentKf : itemId;
  $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/Department/requesLowByProp/"+idDeptoKf
    }).then(function mySuccess(response) {
        if($scope.manageDepto==1){
          $scope.listUserDepto(1);
        }
        console.log("<<<<SOLICITUD DE BAJA DEL DEPARTAMENTO ID: "+idDeptoKf+" HA SIDO ENVIADA>>>>");
      }, function myError(response) {
    });
 };

/**************************************************/
/**************************************************
*                                                 *
* DEPARTMENT LIST BY SELECTED ADDRESS AND TENANT  *
*                                                 *
**************************************************/
$scope.manageDepto = 0;
$scope.getDeparment = function (value){
   var idAddressTmp=$scope.select.idAddressAtt;
   var urlT="";
  $scope.manageDepto = value; //Variable usada en la gestion de departamento
      if ($scope.sessionidProfile>0 && $scope.manageDepto==1){
         urlT="http://localhost/Coferba/Back/index.php/Department/byIdDireccion/"+idAddressTmp+"/"+'0';
      }
      if($scope.sessionidProfile!=3 && $scope.manageDepto==0){
        urlT="http://localhost/Coferba/Back/index.php/Department/byIdDireccion/"+idAddressTmp+"/"+'-1';
      }if ($scope.sessionidProfile==3 && $scope.sessionidTenantUser!=0 && $scope.manageDepto==0){
        urlT="http://localhost/Coferba/Back/index.php/Department/byIdTenantYDireccion/"+idAddressTmp+"/"+$scope.sessionidTenantUser+"/"+'1';
      }
      //console.log(urlT);
  $http({
      method : "GET",
      url : urlT
    }).then(function mySuccess(response){
          $scope.dptoNotFound=false;
          $scope.ListDpto = response.data;
          //console.log(response.data);
    }, function myError (response){
        if (response.status=="404" || response.status=="500"){
          if ($scope.sessionidProfile!=3){
             $scope.noRecordsFound=true;
          }else if ($scope.sessionidProfile==3){
            inform.add('Estimado: '+$scope.sessionNames+ ', No figuran departamentos disponibles en esta direccion para ser asignados, Contacte a su administrador.',{
                          ttl:5000, type: 'info'
               }); 
            $scope.dptoNotFound=true;
          }
          if (!idAddressTmp){
            inform.add('Debe seleccionar una direccion o bien puede Contactar a su administrador.',{
                          ttl:5000, type: 'error'
               }); 
           $scope.decrementStep();  
          }
        }
  });
}
/**************************************************/


/**************************************************
*                                                 *
*     SELECCIONA DATA DE TENANT SELECCIONADO      *
*                 DE LA LISTA                     *
**************************************************/
$scope.lisTenantByType = function(v1, v2){
  var idDepto   = v1;
  var typeTenant= v2;
  var url1="http://localhost/coferba/Back/index.php/tenant/allByIdDepartament/"+idDepto;
  var url2="http://localhost/Coferba/Back/index.php/Tenant/tenanatByIdDepartament/"+idDepto+"/"+typeTenant;
  var urlT=$scope.sessionidProfile==3 ? url2 : url1;
     $http({
        method : "GET",
        url : urlT
      }).then(function mySuccess(response) {
              $scope.listTenant = response.data.tenant;
              $scope.tenantNotFound=false; 
              if ($scope.manageDepto >=0 && response.data.tenant && typeTenant<0){
                $('#ModalListTenant').modal('toggle');
              }else if($scope.manageDepto>=0 && response.data.tenant && typeTenant!=0) {
                    $scope.messageInform1 = " Propietario registrado.";
                    $scope.messageInform2 = " inquilinos registrados.";
                    $scope.messageInform  = typeTenant == 1 ? $scope.messageInform1 : $scope.messageInform2;
                    inform.add('El departamento no presenta'+$scope.messageInform+'.',{
                                ttl:3000, type: 'warning'
                     });
                    $scope.tenantNotFound=true;
              }
        }, function myError(response) {

              if ($scope.manageDepto == 0){
                    $scope.messageInform1 = " Propietario registrado.";
                    $scope.messageInform2 = " inquilinos registrados.";
                    $scope.messageInform  = typeTenant == 1 ? $scope.messageInform1 : $scope.messageInform2;
                    inform.add('El departamento no presenta'+$scope.messageInform+'.',{
                                ttl:3000, type: 'warning'
                     });
                    $scope.tenantNotFound=true;          
              }else {
                inform.add('El departamento no presenta Inquilinos registrados.',{
                              ttl:3000, type: 'warning'
                   });
              } 
      });
  }
/**************************************************
*                                                 *
*    FILTRAR GESTION DE INQUILINOS POR EL TIPO    *
*                                                 *
**************************************************/
$scope.filterByTenantType = function(x){
    alert(x);
    $scope.filterMTenant = x;
    alert($scope.filterMTenant);

}


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
                //$('#ModalListTenant').modal('hide');
                
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

function BindDataToForm(value) {
  $scope.sysLoadLStorage();
    switch (value) {
      case "ticketTenantData":
          $scope.tenant.namesTenant        = "";
          $scope.tenant.addressTenant      = "";
          $scope.tenant.movilPhoneTenant   = "";
          $scope.tenant.localPhoneTenant   = "";
          $scope.tenant.emailTenant        = "";

          $scope.tenant.namesTenant        = $scope.sessionNames;
          $scope.tenant.addressTenant      = $scope.sessionAddress;
          $scope.tenant.movilPhoneTenant   = $scope.sessionMovilPhone;
          $scope.tenant.localPhoneTenant   = $scope.sessionLocalPhone;
          $scope.tenant.emailTenant        = $scope.sessionMail;
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
      case "mngdepto":
        $scope.companyN = $scope.sessionNameCompany;
      break;
      case "sysParam":
       if($scope.parameterId==1){

       }else if($scope.parameterId==2){

       }else if($scope.parameterId==3){

            $scope.cost.key= $scope.parameterValue  

       }else if($scope.parameterId==4){

        $scope.cost.service = $scope.parameterValue;  

       }else if($scope.parameterId==5){

        $scope.costDeliveryTmp = $scope.parameterValue;  
    
       }else if($scope.parameterId==6){
   
       }else if($scope.parameterId==7){

       }else if($scope.parameterId==8){

       }else if($scope.parameterId==9){

       }else if($scope.parameterId==10){

       }

      break;
      default: 
        
    }
  };
/*-----------------------------------------------*/


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
/*
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
*/

/********************************************************************************************************************************************
*                                                                                                                                           *
*                                                                                                                                           *
*                                           F U N C I O N E S    D E   U S U A R I O S                                                      *
*                                                                                                                                           *
*                                                                                                                                           *
********************************************************************************************************************************************/                         
$scope.isLogin=false;
$scope.sysFunctionsUser = function(sMenu, aVar){
  var isVarUser=aVar;
  switch (sMenu){
    case "login":                                 //Login Module
        $scope.isLogin=true;
        $scope.rsJSON="";
        sysLoginUser($http,$scope);
    break;
    case "profile":                               //Profile Module
        $('#ProfileModalTenant').modal('toggle');
    break;
    case "register":                              //Register Module
        console.log($scope._setuser());
        $scope.addUser($http, $scope);
    break;
    case "updprofile":                            //Update Profile and LocalStorage Variable Module
        localStorage.removeItem("Nombres");
        localStorage.removeItem("Email");
        localStorage.removeItem("TelefonoM");
        localStorage.removeItem("TelefonoL");
        $scope.modificarUsuario($http, $scope);
        setTimeout(function() {
          $scope.getUpdateData(); 
        }, 1000);
        console.log($scope._getData2Update());
    break;
    case "updateUser":
      $scope.$scope.updateUser();
    break;
    case "enabled":                               //Enabled User Module
        $scope.enabledUser(isVarUser);
    break;
    case "disabled":                              //Disabled User Module
        $scope.disabledUser(isVarUser);
    break;
    case "delete":                               //Delete User Module
        $scope.deleteUser(isVarUser);
    break;
    default:
  }
}

/**************************************************
*                                                 *
*               INGRESO DE USUARIO                *
*                                                 *
**************************************************/

function sysLoginUser($http,$scope){  
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
/**************************************************
*                                                 *
*               REGISTRO DE USUARIO               *
*                                                 *
**************************************************/
$scope.addUser = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/User/", $scope._setuser())
      .then(function (sucess, data) {
        if ($scope.idProfileKf==3){
            $scope.sysFunctionsTenant('search'); //CHECK THE TENANT TABLE IF THERE IS ALREADY REGISTERED
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
  $http.post("http://localhost/Coferba/Back/index.php/User/update", $scope._getData2Update(0))
      .then(function (sucess, data) {
          inform.add($scope.sessionNames +' Sus datos han sido actualizado.',{
                    ttl:3000, type: 'success'
          });
          $scope.CallFilterFormT();
    },function (error,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error Modificacion de Usuario !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope.profile = {Names:'', Email:'', MovilPhoneNumber:'', PhonelocalNumber:''};
$scope._getData2Update = function (value) {
  var isChPwd=value;
  var isEditUserKf=false;
  if (isChPwd==0){
  var updUser =
          {
                         user:
                              {
                                fullNameUser         : $scope.profile.Names,
                                emailUser            : $scope.profile.Email,
                                phoneNumberUser      : $scope.profile.MovilPhoneNumber,
                                phoneLocalNumberUser : $scope.profile.PhonelocalNumber,
                                idProfileKf          : $scope.sessionidProfile,
                                idUser               : $scope.sessionIdUser,
                              }
          }
  }else{
    isEditUserKf = true;
    var updUser =
          {
                         user:
                              {
                                passwordUser  : nuevavlave,
                                idUser        : $scope.sessionIdUser,
                                isEditUser    : isEditUserKf
                              }
          }
    return updUser;
  }

};
/**************************************************/
/**************************************************
*                                                 *
*                DISABLED AN USER                 *
*                                                 *
**************************************************/
$scope.disabledUser = function (itemId) {
  $http({
      method : "GET",
      url : "http://localhost/Coferba/Back/index.php/User/inactive/"+itemId
    }).then(function mySuccess(response) {

        $scope.CallFilterFormT();

      }, function myError(response) {
    });
 };
/**************************************************
*                                                 *
*                 ENABLED AN USER                 *
*                                                 *
**************************************************/
$scope.enabledUser = function (itemId) {
$http({
    method : "GET",
    url : "http://localhost/Coferba/Back/index.php/User/active/"+itemId
  }).then(function mySuccess(response) {
      $scope.CallFilterFormT();
    }, function myError(response) {
  });
};
/**************************************************
*                                                 *
*                 UPDATE AN USER                  *
*                                                 *
**************************************************/
$scope.updateUser = function (itemId) {
  $('#EditModalUser').modal('toggle');
  $scope.getAttData(itemId);
};
/**************************************************
*                                                 *
*                 DELETE AN USER                  *
*                                                 *
**************************************************/
$scope.deleteUser = function (itemId) {
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
*              CHANGE PWD AN USER                 *
*                                                 *
**************************************************/
$scope.chgPwdUser = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/User/update", $scope._getData2Update(1))
      .then(function (sucess, data) {
          inform.add($scope.sessionNames +' Ha cambiado su clave satisfactoriamente.',{
                    ttl:3000, type: 'success'
          });
    },function (error,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error Modificacion de Usuario !"+status+" Contacte a Soporte"+"error");}
           
    });
};

$scope.getUpdateData = function(){

        var idUser = $scope.sessionIdUser;
         /*Recorrer el Json User para obtener datos*/
        var length = $scope.listUser.length;
        for (i = 0; i < length; i++) {
          if($scope.listUser[i].idUser == idUser){
              localStorage.setItem("Nombres",   $scope.listUser[i].fullNameUser);
              localStorage.setItem("Email",     $scope.listUser[i].emailUser);
              localStorage.setItem("TelefonoM", $scope.listUser[i].phoneNumberUser);
              localStorage.setItem("TelefonoL", $scope.listUser[i].phoneLocalNumberUser);
              BindDataToForm('userProfile');
              /*------------------------------------------------------------------------*/
              break;
              }
          };
          $scope.sysLoadLStorage();
          $('#ProfileModalUser').modal('hide'); 
}
/**************************************************/
/*
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
*/
/********************************************************************************************************************************************
*                                                                                                                                           *
*                                                                                                                                           *
*                                              F U N C I O N E S    D E   I N Q U I L I N O S                                               *
*                                                                                                                                           *
*                                                                                                                                           *
********************************************************************************************************************************************/
/**************************************************
*                                                 *
*                 MENU DE OPCIONES                *
*                                                 *
**************************************************/    
var mail2Search ="";
$scope.rsTenantData = [];
$scope.IsTenant=false;
$scope.tSearch=false;
$scope.IsFnAdd=false;
$scope.sysFunctionsTenant = function(value){  //Funciones add, search, update, active, inactive Tenants
    switch (value) {
      case "open": //Opcion Utilizada para registrar un inquilino de cualquier tipo. 
        $scope.IsTenant=true;
        mail2Search ="";
        $('#RegisterModalTenant').modal('toggle');
        $('#ModalListTenant').modal('hide');
      break;

      /*------------------------------------------------------------------------------*/
      case "search": //Buscamos en la tabla tb_tenant por el parametro email.
        if($scope.IsTenant==false){mail2Search=$scope.emailUser;}else if($scope.IsTenant==true){
          if($scope.isEditTenantByAdmin==false){mail2Search=$scope.emailT;}else{mail2Search=$scope.tenant.emailTenant;}}
        $scope.tSearch=true;
        $scope.searchTenantByMail();
      break;
      /*------------------------------------------------------------------------------*/
      case "prueba":
        //$scope.tenant= {namesTenant:'',localPhoneTenant: '',movilPhoneTenant: '',emailTenant: '', typeTenantKf: ''};
        console.log($scope.tenant);
      break;
      case "update": //Opcion Usada para actualizados datos de un inquilino de tipo propietario o un inqulino normal.
        if($scope.rsTenantData){
            $scope.idTenantmp  = "";
            $scope.idTenantmp  = !$scope.rsTenantData.idTenant ? $scope.idTenantKf : $scope.rsTenantData.idTenant;
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
              if ($scope.sessionidProfile!=3 && $scope.isEditTenantByAdmin==true){
                  $scope.lisTenantByType(select.idDepartmentKf, 0);
                  $('#EditModalTenant').modal('hide');
              }
            }
        }
      break;
      /*------------------------------------------------------------------------------*/
      case "addT": //Opcion Usada para registrar los datos de un usuarios [propietario] en la tabla tenant o un inquilino normal.
            $scope.IsFnAdd=true;
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
  alert(mail2Search);
  $http({
        method : "GET",
        url : "http://localhost/Coferba/Back/index.php/Tenant/findByEmail/"+mail2Search
      }).then(function mySuccess(response) {
            $scope.rsTenantData = response.data;
            console.log("<<<INQUILINO ENCONTRADO>>>");
            console.log(response.data);

            if($scope.isLogin==true){
              $scope.idTenantmp = response.data.idTenant;
              localStorage.setItem("idTenantUser", $scope.idTenantmp);
              location.href = "sistema.html"
            }

            if($scope.tSearch==false){ //Cargamos el form del Ticket con la data del inquilino.
              $scope.idTenantKf              =  $scope.rsTenantData.idTenant;
              $scope.tenant.namesTenant      =  $scope.rsTenantData.fullNameTenant;
              $scope.tenant.localPhoneTenant =  $scope.rsTenantData.phoneNumberContactTenant;
              $scope.tenant.movilPhoneTenant =  $scope.rsTenantData.phoneNumberTenant;
              $scope.tenant.emailTenant      =  $scope.rsTenantData.emailTenant;
              $scope.enabledNextBtn();
              /*VERIFICAMOS SI EL REGISTRO DEL PROPIETARIO LO ESTA REALIZANDO UN ADMINISTRADOR PARA ASIGNARLE EL DPTO CORRESPONDIENTE*/
              if($scope.sessionidProfile!=3 && $scope.IsFnAdd==true && $scope.typeTenant==1){
                console.log("==>SE ASIGNA EL "+$scope.select.idDepartmentKf+" Y ES APROBADO AL PROPIETARIO: "+$scope.tenant.namesTenant+" SATISFACTORIAMENTE");
                $scope.UserAassignUnAssignDepto();
              }
            }
            //SI LA PETICION ES DE BUSQUEDA, SI EXISTE ACTUALIZAMOS LOS DATOS DE LO CONTRARIO SE INICIA EL PROCESO DE REGISTRO
            if($scope.tSearch==true){console.log("==>INQUILINO ENCONTRADO => ACTUALIZADO DATOS"); $scope.sysFunctionsTenant('update');$scope.tSearch=false;}
        }, function myError(response) {
            if($scope.tSearch==true){console.log("====>INQUILINO NO ENCONTRADO => INICIO DE REGISTRO"); $scope.sysFunctionsTenant('addT'); $scope.tSearch=false;}
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
        console.log(getTenantData2Add());
        console.log("===>INQUILINO REGISTRADO SATISFACTORIAMENTE");
        if($scope.sessionidProfile!=3 && $scope.IsFnAdd==true && $scope.typeTenant==1){
          console.log("=>BUSCAMOS LOS DATOS DEL INQUILINO REGISTRADO PARA CARGARLOS AL FORMULARIO DEL TiCKET");
          $scope.sysFunctionsTenant('data');
        }

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
function getTenantData2Add () {
var idDeptoTmp;
if(!$scope.typeTenant && $scope.idProfileKf == 3){$scope.typeTenant = 1;}
if($scope.typeTenant && $scope.sessionidProfile == 3){$scope.typeTenant=2;}
if($scope.typeTenant==1 && $scope.sessionidProfile != 3){
  $scope.typeTenant=1; idDeptoTmp=null;
}else{
  $scope.typeTenant=2;idDeptoTmp=$scope.select.idDepartmentKf;
}
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
                          idDepartmentKf           : idDeptoTmp,
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
  console.log(getData2UpdateTenant());
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
  var idDeparmentKf=0;
  if(!$scope.typeTenant && $scope.idProfileKf == 3){$scope.typeTenant = 1;}
  if($scope.typeTenant && $scope.sessionidProfile == 3){$scope.typeTenant=2;}
  if($scope.typeTenant==1 && $scope.sessionidProfile != 3){$scope.typeTenant=1; idDeparmentKf = null;}else{$scope.typeTenant=2;idDeparmentKf=$scope.select.idDepartmentKf;}
  if($scope.IsTenant==false){$scope.idDepartmentKf=null;}
  if($scope.IsTenant==false){
    console.log($scope.IsTenant,$scope.typeTenant,$scope.sessionidProfile,$scope.idDepartmentKf);
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
    console.log($scope.IsTenant,$scope.typeTenant,$scope.sessionidProfile,idDeparmentKf);
    var tenant =
            {
                  tenant:
                        {
                          idTenant                 : $scope.idTenantmp,
                          fullNameTenant           : $scope.tenant.namesTenant,
                          idTypeKf                 : $scope.typeTenant,
                          phoneNumberTenant        : $scope.tenant.movilPhoneTenant,
                          phoneNumberContactTenant : $scope.tenant.localPhoneTenant,
                          idDepartmentKf           : idDeparmentKf,
                          emailTenant              : $scope.tenant.emailTenant
                        }
            };
  }
  return tenant;
};

/**************************************************
*                                                 *
*         Search Tenant or Owner Functions        *
*                                                 *
**************************************************/
$scope.select={idDepartmentKf: ''}
var idDpto = 0;
$scope.searchTenant = function (op, idDpto, idTypeTenant){
    switch (op){
      case "ticket":
        if (!$scope.select.idDepartmentKf){
          inform.add('Debe seleccionar un departamento.',{
                          ttl:5000, type: 'warning'
               }); 
        }else{
          $scope.manageDepto=0;
          $scope.lisTenantByType($scope.select.idDepartmentKf,$scope.typeTenant);
        }
      break;
      /*case "depto":
        if ($scope.sessionidProfile==3){
          $scope.typeTenant = 2;
          $scope.lisTenantByType(idDpto,$scope.typeTenant);
        }else{
          $scope.typeTenant = 1;
          $scope.lisTenantByType(idDpto,$scope.typeTenant);
        }*/
      case "manageTenant":
          //console.log(idDpto,$scope.typeTenant);
          $scope.typeTenant=idTypeTenant;
        if(!$scope.typeTenant){$scope.typeTenant=-1;}if(!idDpto){idDpto=-1;}
          //console.log(idDpto,$scope.typeTenant);
         $scope.lisTenantByType(idDpto,$scope.typeTenant);
      break;
      case "listTenant":
        $scope.manageDepto=1;
        $scope.typeTenant=idTypeTenant;
        if(!$scope.typeTenant){$scope.typeTenant=-1;}
         $scope.lisTenantByType(idDpto,$scope.typeTenant);
      break;
      default:
    }
  $scope.opc=op;
   
}
/*------------------------------------------------*/
/**************************************************
*                                                 *
*     SELECCIONA DATA DE TENANT DE LA LISTA       *
*                                                 *
**************************************************/
$scope.tenant= {namesTenant:'',localPhoneTenant: '',movilPhoneTenant: '',emailTenant: ''};
  $scope.selectTenant = function (obj){
      $scope.idDpto=obj.idTenant;
      $scope.idTenantKf       =  obj.idTenant;
      $scope.tenant.namesTenant      =  obj.fullNameTenant;
      $scope.tenant.localPhoneTenant =  obj.phoneNumberContactTenant;
      $scope.tenant.movilPhoneTenant =  obj.phoneNumberTenant;
      $scope.tenant.emailTenant      =  obj.emailTenant;
      $scope.IsTenant = true;
      $('#ModalListTenant').modal('hide');
      console.log(obj);
  }
/*------------------------------------------------*/
/**************************************************
*                                                 *
*       SELECCIONA DATA DE TENANT TO UPDATE       *
*                                                 *
**************************************************/
$scope.tenant= {namesTenant:'',localPhoneTenant: '',movilPhoneTenant: '',emailTenant: '', typeTenantKf: ''};
  $scope.select2EditTenant = function (obj){
      $scope.isEditTenantByAdmin=true;
      $scope.idDpto                  =  $scope.select.idDepartmentKf;
      $scope.idTenantKf              =  obj.idTenant;
      $scope.tenant.namesTenant      =  obj.fullNameTenant;
      $scope.tenant.localPhoneTenant =  obj.phoneNumberContactTenant;
      $scope.tenant.movilPhoneTenant =  obj.phoneNumberTenant;
      $scope.tenant.emailTenant      =  obj.emailTenant;
      $scope.tenant.typeTenantKf     =  obj.idTypeKf;
      $('#EditModalTenant').modal('toggle');
      console.log(obj);
  }

/*------------------------------------------------*/
/**************************************************/
/*
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
*/
/********************************************************************************************************************************************
*                                                                                                                                           *
*                                                                                                                                           *
*                                              F U N C I O N E S    D E   E N C A R G A D O S                                               *
*                                                                                                                                           *
*                                                                                                                                           *
********************************************************************************************************************************************/ 
/**************************************************
*                                                 *
*                MENU DE OPCIONES                 *
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
/*
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
*/
/********************************************************************************************************************************************
*                                                                                                                                           *
*                                                                                                                                           *
*                                              S O L I C I T U D E S    D E   S E R V I C I O S                                             *
*                                               Alta, Baja (llave), Servicios, Otras Consultas                                              *
*                                                                                                                                           *
********************************************************************************************************************************************/ 
/**************************************************
*                                                 *
*                MENU DE OPCIONES                 *
*                                                 *
**************************************************/
$scope.modalConfirmation=function(opt, confirm){
$scope.swMenu = opt;
var tmpOpt=$scope.div2Open;
$scope.mess2show="";
  switch ($scope.swMenu){
    case "tdown":
      if (confirm==0){
        $scope.mess2show="Desea Solicitar una nueva llave?";
        $('#confirmRequestModal').modal('toggle');
      }else if (confirm==1){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $('#m_pedidos').addClass('active');
        $('#SubM_Pedidos').show();
        $scope.fnShowHide('rukeyup', 'open');
        $('#confirmRequestModal').modal('hide');
      }
    break;
    case "checkAddr":
      if (confirm==0 && $scope.addrNoFound==1){
        $scope.mess2show="No posee departamento autorizados, Desea registrar un departamento?";
        $('#confirmRequestModal').modal('toggle');
      }else if(confirm==0 && $scope.addrNoFound==0 && $scope.sessionidProfile==3){ 
          if(tmpOpt=="rukeyup"){
            $scope.rukeyup = true;
          }else if(tmpOpt=="rukeydown"){
            $scope.rukeydown = true;
          }
      }else if (confirm==1){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $('#m_depto').addClass('active');
        $('#SubM_Pedidos').hide();
        $scope.fnShowHide('managedepto', 'open');
        $('#confirmRequestModal').modal('hide');
      }
    break;
    default:
  }
}

$scope.newTicket = function(opt){
    switch (opt) {
      case "up": // SOLOCITUD DE ALTA
            console.log($scope._getData2AddKey());
            //$scope.sysFunctionSend();
            if ($scope.sessionidProfile==3 && $scope.typeTenant==2){
              $scope.allowUpdate=true;
            }else if ($scope.sessionidProfile!=3 && $scope.typeTenant!=0){
              $scope.allowUpdate=true;
            }
            $scope.requestUpKey($http, $scope);
      break;
      case "down": // SOLOCITUD DE BAJA
            console.log($scope._getData2DelKey());
            //$scope.sysFunctionSend();
            if ($scope.sessionidProfile==3 && $scope.typeTenant==2){
              $scope.allowUpdate=true;
            }else if ($scope.sessionidProfile!=3 && $scope.typeTenant!=0){
              $scope.allowUpdate=true;
            }
            $scope.modalConfirmation('tdown',0);
            $scope.requestDownKey($http, $scope);
            
      break;
      case "srvs": // SOLOCITUD DE SERVICIOS
            console.log($scope._getServiceData());
            //$scope.sysFunctionSend();
            $scope.requestService($http, $scope);
      break;
      case "other": // SOLOCITUD DE OTRA CONSULTA
            console.log($scope._getData2RequestOther());
            //$scope.sysFunctionSend();
            $scope.otherRequest($http, $scope);
      break;

      default: 
    }


}
/**************************************************/
$scope.costDeliveryTmp=0;
$scope.getTotalService = function (){
  var numbersKey     =  $scope.quantity.qkuTenant;
  /***************************************/
  $scope.cost.total  =0;
  var totalTmp       =0;
  var costKey        =  $scope.cost.key;
  var costService    =  $scope.cost.service;
  var costDelivery   =  $scope.delivery.idTypeDeliveryKf==2 ? $scope.costDeliveryTmp  : 0;
  $scope.cost.delivery = $scope.delivery.idTypeDeliveryKf==2 ? $scope.costDeliveryTmp : null;
  /*CALCULATE THE TOTAL AMOUNT FOR SERVICE*/
  totalTmp=numbersKey*costKey;
  $scope.cost.total = Number(totalTmp)+Number(costService)+Number(costDelivery);
}

/**************************************************
*                                                 *
*               ALTA DE LLAVE                     *
*                                                 *
**************************************************/
$scope.requestUpKey = function ($http, $scope){
  $http.post("http://localhost/Coferba/Back/index.php/Ticket", $scope._getData2AddKey())
      .then(function (sucess, data) {
          if($scope.allowUpdate==true){$scope.sysFunctionsTenant('update');}
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
$scope.cost={service: '', key: '', delivery: '', total: ''};
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
                            TotalService      : $scope.cost.total,
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
          if($scope.allowUpdate==true){$scope.sysFunctionsTenant('update');}
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
$scope.code={n1: '', n2: '', n3: '', n4: '', n5: ''};
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
  if ($scope.quantity.qkuTenant==1){$scope.codekeys=$scope.code.n1}
  if ($scope.quantity.qkuTenant==2){$scope.codekeys=$scope.code.n1+','+$scope.code.n2}
  if ($scope.quantity.qkuTenant==3){$scope.codekeys=$scope.code.n1+','+$scope.code.n2+','+$scope.code.n3}
  if ($scope.quantity.qkuTenant==4){$scope.codekeys=$scope.code.n1+','+$scope.code.n2+','+$scope.code.n3+','+$scope.code.n4}
  if ($scope.quantity.qkuTenant==5){$scope.codekeys=$scope.code.n1+','+$scope.code.n2+','+$scope.code.n3+','+$scope.code.n4+','+$scope.code.n5}
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
                            numberItemDisabled    : $scope.codekeys,
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
                            mailContactConsult: $scope.sessionMail,
                            addressConsul:      $scope.o_address,
                            description:        $scope.o_detail
                        }
          };
  return otherReq;
};

/**************************************************/
/*
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
*/

/********************************************************************************************************************************************
*                                                                                                                                           *
*                                                                                                                                           *
*                                           F U N C I O N E S    D E   A D M I N I S T R A C I O N                                          *
*                                                                                                                                           *
*                                                                                                                                           *
********************************************************************************************************************************************/

$scope.sideBarMenu = function(){
  $('#RegisterModalUser').modal('toggle');
}


/**************************************************
*                                                 *
*                LOGOUT FUNCTION                  *
*                                                 *
**************************************************/

$scope.logout = function(){
  $scope.rsJSON = " ";
  localStorage.clear();
  $scope.Token = false;
  location.href = "sistema.html"
};
/**************************************************/

/**************************************************
*                                                 *
*            CLEAR FORMS FUNCTION                 *
*                                                 *
**************************************************/
function cleanForms (){
    $scope.select.idAddressAtt        = "";
    $scope.select.idAddressKf         = "";
    $scope.select.nameAtt             = "";
    $scope.localPhoneAtt              = "";
    $scope.movilPhoneAtt              = "";
    $scope.emailAtt                   = "";
    $scope.select.idDepartmentKf      = "";
    $scope.typeTenant                 = 0;
    $scope.tenant.namesTenant         = "";
    $scope.tenant.addressTenant       = "";
    $scope.tenant.movilPhoneTenant    = "";
    $scope.tenant.emailTenant         = "";
    $scope.tenant.localPhoneTenant    = "";
    $scope.select.idTypeLostKf        = "";
    $scope.txt.sruTenant              = "";
    $scope.delivery.idTypeDeliveryKf  ="";
    $scope.typeOfSwitch               ="";
    $scope.quantity.qkuTenant         ="";
    $scope.select.idCompanyKf         ="";
    $scope.movilPhoneAdmin            ="";
    $scope.localPhoneAdmin            ="";
    $scope.emailAdmin                 ="";
    $scope.cost                       ={};
    $scope.dptoNotFound               = true;
    $scope.companyFound               = false;
    $scope.attendantFound             = false;
    $scope.recordsFound               = false;
    $scope.rusysconfig                = false;
    $scope.noRecordsFound             = false;
    $scope.formValidated              = false;
    $scope.isEditTenantByAdmin        = false;
    $scope.stepIndexTmp               =0;
    $scope.removeOwnerDepto           =0;
    $scope.manageTenantUser           =0;
    $scope.listTenant                 ="";
    $scope.filterMTenant              ="";
}
/**************************************************/

/**************************************************
*                                                 *
*              CLOSE FORMS FUNCTION               *
*                                                 *
**************************************************/
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
  $scope.recordsFound = false;
  $scope.rusysconfig = false;
}
/**************************************************/

/**************************************************
*                                                 *
*            SHOW/HIDE MODAL FUNCTION             *
*                                                 *
**************************************************/
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
/**************************************************/

/**************************************************
*                                                 *
*            SHOW/HIDE FORMS FUNCTION             *
*                                                 *
**************************************************/
$scope.div2Open="";
$scope.fnShowHide = function(divId, divAction) {
  $scope.div2Open=divId;
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
            cleanForms();
          if(divAction=="open"){
            $scope.userManage = true;
          }else{
            closeAllDiv();
          }
      break;
      case "ruprofile":
          if(divAction=="open"){
            $('#ProfileModalUser').modal('toggle');
            BindDataToForm('userProfile');
            $scope.ruprofile = true;
          }else{
            closeAllDiv();
          }
        break; //
      case "ruchpwd":
          if(divAction=="open"){
            $('#PasswdModalUser').modal('toggle');
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
            BindDataToForm('mngdepto');
            $scope.loadParameter(3, 6,'sysParam');
            if ($scope.sessionidProfile==3){
              $scope.getAllAddressByIdTenant();
            }else {$scope.rukeyup = true;}
            selectSwitch ('t');
          }else{
            closeAllDiv();
          }
      break;
      case "rukeydown":
          closeAllDiv();
          cleanForms();
        if(divAction=="open"){
          BindDataToForm('mngdepto');
          if ($scope.sessionidProfile==3){
            $scope.getAllAddressByIdTenant();
          }else {$scope.rukeydown = true;}
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
          BindDataToForm('mngdepto');
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
      case "sysConfig":
          closeAllDiv();
        if(divAction=="open"){
          $scope.rusysconfig = true;
        }else{
          closeAllDiv();
          $scope.rusysconfig = false;
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

































