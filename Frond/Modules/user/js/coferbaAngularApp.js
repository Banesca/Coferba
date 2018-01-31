
app.config(function(blockUIConfig) {
      // Tell blockUI not to mark the body element as the main block scope.
      blockUIConfig.autoInjectBodyBlock = true;  
      blockUIConfig.autoBlock = true;
    });
/**************************************************
*                                                 *
*          DATE FILTER FOR MYSQL TIMESTAMP        *
*                                                 *
**************************************************/
app.filter('dateToISO', function() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  }
});
/**************************************************************/
app.controller('coferbaCtrl', function($scope, $location, $http, blockUI, $timeout, inform, $window) {
/**************************************************************/


/**************************************************
*                                                 *
*          COLLAPSE / EXPAND TABLE ROWS           *
*                                                 *
**************************************************/
      $scope.tableRowExpanded          = false;
      $scope.tableRowIndexCurrExpanded = "";
      $scope.tableRowIndexPrevExpanded = "";

    $scope.dayDataCollapseFn = function () {
      $scope.tableRowExpanded          = false;
      $scope.tableRowIndexCurrExpanded = "";
      $scope.tableRowIndexPrevExpanded = "";
      $scope.vIndex=null;
      $scope.dayDataCollapse = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
      };
    $scope.dayDataCollapse = [];
    $scope.vIndex=null;
    $scope.selectTableRow = function (value, idDeptoKf) {
      $scope.vIndex = value;
      $scope.idDeptoKf = idDeptoKf;
        if ($scope.dayDataCollapse === 'undefined') {
            $scope.dayDataCollapse = $scope.dayDataCollapseFn();
        } else {
            console.log('Variable tableRowExpanded: '+$scope.tableRowExpanded);
            console.log('Variable tableRowIndexCurrExpanded: '+$scope.tableRowIndexCurrExpanded);
            if ($scope.tableRowExpanded === false && $scope.tableRowIndexCurrExpanded === "") {
                $scope.tableRowIndexPrevExpanded = "";
                $scope.tableRowExpanded = true;
                $scope.tableRowIndexCurrExpanded = $scope.vIndex;
                console.log('Id del Departamento: '+idDeptoKf+' / Index Id de la tabla: ' +$scope.vIndex);
                $scope.searchTenant('listTenant', idDeptoKf);
            } else if ($scope.tableRowExpanded === true) {
                if ($scope.tableRowIndexCurrExpanded === $scope.vIndex) {
                    $scope.tableRowExpanded = false;
                    $scope.tableRowIndexCurrExpanded = "";
                    console.log('Id del Departamento: '+idDeptoKf+' / Index Id de la tabla: ' +$scope.vIndex);
                    console.log("ENTRO EN EL ROWEXPANDED TRUE")
                    $scope.dayDataCollapse[$scope.vIndex] = true;
                    $scope.vIndex =null;
                } else {
                    $scope.tableRowIndexPrevExpanded = $scope.tableRowIndexCurrExpanded;
                    $scope.tableRowIndexCurrExpanded = $scope.vIndex;
                    console.log("ENTRO EN EL ELSE DEL ROWEXPANDED")
                    $scope.searchTenant('listTenant', idDeptoKf);
                    $scope.dayDataCollapse[$scope.tableRowIndexPrevExpanded] = true;
                    $scope.dayDataCollapse[$scope.tableRowIndexCurrExpanded] = false;
                }
            } 
        }
    };

/********************************************************************************************************************************************
*                                                                                                                                           *
*                                                                                                                                           *
*                                                             P A G I N A C I O N                                                           *
*                                                                                                                                           *
*                                                                                                                                           *
********************************************************************************************************************************************/
  $scope.loadVarPag = function(){
    $scope.viewby = 10;
    $scope.totalItems = $scope.lengthUser;
    console.log("TOTAL LENGTH :"+$scope.totalItems)
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
  }
     
 $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.setItemsPerPage = function(num) {
    $scope.itemsPerPage = num;
    $scope.currentPage = 1; //reset to first page
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
     /*VALIDAMOS QUE EL USUARIO SEA DIFERENTE DE USUARIO PROPIETARIO Y QUE ESTE ASIGNADO A UNA COMPAÑIA Y CARGAMOS LA LISTA DE COMPAÑIAS*/
      if($scope.sessionidProfile==4 && $scope.sessionidCompany){
        $scope.officeListByCompnayID();
      }

}
var tmpArr="";
/*VALIDAMOS LOS CAMPOS PASSWORD QUE SEAN IGUALES*/     
$scope.tagPwd=0;
$scope.fnValidatePwd = function(pwd1, pwd2){
  var paswd1=pwd1;
  var paswd2=pwd2;
    if(paswd1 != paswd2) {
      $scope.tagPwd=1;
    } else {
      $scope.tagPwd=0;
    }


}

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

/**************************************************
*                                                 *
*                 GET PARAMETER                   *
*      (smtpmail, cost, , )                       *
**************************************************/
$scope.listParameter = [];
$scope.getParameter = function(){
   $http({
      method : "GET",
      url : $scope.serverHost+"Coferba/Back/index.php/User/mailsmtp"
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
    $scope.parameterId        = "";
    $scope.parameterValue     = "";
    $scope.parameterDescrip   = "";
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
      url : $scope.serverHost+"Coferba/Back/index.php/Direccion/companyByid/"+idCompanytmp
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
      url : $scope.serverHost+"Coferba/Back/index.php/User/filterForm"
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
  $scope.listUser = "";
   $http({
      method : "GET",
      url : $scope.serverHost+"Coferba/Back/index.php/Ticket/filter"
    }).then(function mySuccess(response) {
        $scope.listTypeDelivery = response.data.typedelivery;
        $scope.listTypeLost     = response.data.reason_disabled_item;
        $scope.listTypeQuery    = response.data.typeouther;
        $scope.listUser         = response.data.user;
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
/*------------------------------------------------*/
/**************************************************
*                                                 *
*                  ADDRESS LIST                   *
*                                                 *
**************************************************/
$scope.getAllAddress = function (){
  $http({
      method : "GET",
      url : $scope.serverHost+"Coferba/Back/index.php/Direccion"
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
      url : $scope.serverHost+"Coferba/Back/index.php/Direccion/byidTenant/"+$scope.sessionidTenantUser+"/"+1
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
*                ATTENDANT TYPE LIST              *
*                                                 *
**************************************************/

  $scope.getTypeAttendant = function(){
     $http({
        method : "GET",
        url : $scope.serverHost+"coferba/Back/index.php/Ticket/typeAttendant"
      }).then(function mySuccess(response) {
            $scope.listTypeAttendant = response.data;
             $scope.attendantTypeFound=true;
        }, function myError(response) {
          $scope.listTypeAttendant ="";
           $scope.attendantTypeFound=false;
      });
  }
/*------------------------------------------------*/

/**************************************************
*                                                 *
*     ATTENDANT LIST BY THE SELECTED ADDRESS      *
*                                                 *
**************************************************/
  $scope.select={idAddressAtt:''};
  $scope.getAllAttendant = function(){
    if (!$scope.isAttUpdated && $scope.IsTicket){
      $scope.tmp.localPhoneAtt  = ""; 
      $scope.tmp.movilPhoneAtt  = "";
      $scope.tmp.emailAtt       = "";
      $scope.select.nameAtt = "";
    }
    $scope.select.idDepartmentKf = "";
    var typeOfMessage="";
    var idAddressAttKf=$scope.select.idAddressAtt;
    var informMessage="";
     $http({
        method : "GET",
        url : $scope.serverHost+"Coferba/Back/index.php/User/attendantByIdDirecction/"+idAddressAttKf
      }).then(function mySuccess(response) {
            $scope.listAttendant ="";
            $scope.listAttendant = response.data;
            $scope.attendantFound=true;
        }, function myError(response) {
          $scope.listAttendant ="";
          $scope.attendantFound=false;
          if($scope.manageDepto==1 && !idAddressAttKf){
              informMessage="Debe selecionar una direccion para obtener la informacion.";
              typeOfMessage='warning';
          }else if($scope.manageDepto==0 && idAddressAttKf){ 
              informMessage="La direccion selecciona no presenta encargados registrados.";
              typeOfMessage='info';
          }else if($scope.manageDepto==0 && !idAddressAttKf){ 
              informMessage="Debe selecionar una direccion para obtener el listado de encargados asociados.";
              typeOfMessage='warning';
          }
            inform.add(informMessage,{
                          ttl:4000, type: typeOfMessage
            });
      });
  }
/*------------------------------------------------*/

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
*LIST THE DEPARTMENT ASSIGNED TO THE OWNER TENANT *
*                                                 *
**************************************************/

$scope.listUserDepto = function(value){
  $scope.manageDepto=value;
  var idAddressTmp=$scope.select.idAddressAtt;
  var idTenantTmp = 0;
  var urlT="";
  idTenantTmp = $scope.sessionidProfile==3 ? $scope.sessionidTenantUser : $scope.idTenantKf;
   if ($scope.sessionidProfile==3){
        urlT=$scope.serverHost+"Coferba/Back/index.php/Department/byIdTenantYDireccion/"+idAddressTmp+"/"+idTenantTmp+"/"+'-1';
      }else{
        urlT=$scope.serverHost+"Coferba/Back/index.php/Department/byIdDireccion/"+idAddressTmp+"/"+'-1';
      }

  $http({
      method : "GET",
      url : urlT
    }).then(function mySuccess(response){
          $scope.ListDptoByTenant = response.data;
          $scope.dayDataCollapseFn();
          $scope.recordsFound=true;
          $scope.noRecordsFound=false;
    }, function myError (response){
        if (response.status=="404" || response.status=="500"){
          if ($scope.sessionidProfile!=3){
              console.log("<<<NO HAY DEPARTAMENTOS REGISTRADOS>>>");
              $scope.recordsFound=false;
              $scope.noRecordsFound=true;
              
          }else if ($scope.sessionidProfile==3){
              console.log("<<<NO TIENE DEPARTAMENTO ASOCIADO>>>");
              $scope.recordsFound=false;
              $scope.noRecordsFound=true;
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
$scope.fnAssignDepto = function(item1, item2){
  var fnAction= $scope.sessionidProfile==3 ? 0 : item2;
  console.log($scope._getData2AssignDepto(item1, item2));
  $http.post($scope.serverHost+"Coferba/Back/index.php/Department/update",$scope._getData2AssignDepto(item1, item2),setHeaderRequest())
        .then(function(success, data) {
            if ($scope.sessionidProfile==3 && fnAction==0){
                inform.add('Departamento Asignado y pendiente por aprobacion por la administracion.',{
                  ttl:3000, type: 'success'
                });
            }
            if ($scope.sessionidProfile!=3 && fnAction==1){
                $scope.approveDepto(item1);
            }else if ($scope.sessionidProfile!=3 && fnAction==2){
                inform.add('Cancelada solicitud satisfactoriamente.',{
                  ttl:3000, type: 'success'
                });
            }
                $scope.listUserDepto(1);  
        },function (error, data, status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error ! "+status+" Contacte a Soporte");}
           
        }); 
}
$scope._getData2AssignDepto = function (item1, item2) {
  var idTenantUsertmp =$scope.sessionidProfile==3 ? $scope.sessionidTenantUser : $scope.idTenantKf
  var idDepartmentKf  = item1;
  var dpto =
          {
               department: { 
                            idDepartment        : idDepartmentKf,
                            idTenantKf          : idTenantUsertmp
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
$scope.approveDepto = function (item1) {
  var idDeptoKf = !item1 ? $scope.select.idDepartmentKf : item1;
  $http({
      method : "GET",
      url : $scope.serverHost+"Coferba/Back/index.php/Department/aprobated/"+idDeptoKf
    }).then(function mySuccess(response) {
        if($scope.manageDepto==1){
          $scope.listUserDepto(1);
          console.log("=>PROCEDEMOS A LISTAR NUEVAMENTE LOS INQUILINOS SEGUN EL ID DEL DEPARTAMENTO.");
          $scope.searchTenant('listTenant', $scope.idDeptoKf);
        }console.log("<<<<DEPARTAMENTO ID: "+idDeptoKf+" FUE APROBADO SATISFACTORIAMENTE>>>>");
      }, function myError(response) {
        if (!idDeptoKf){
          console.log("<<<<ID DEL DEPTO NO RECIBIDO>>>>");
        }
        
    });
 };

/**************************************************/
/**************************************************
*                                                 *
*      DISALLOW DEPARTMENT TO AN OWNER USER       *
*                                                 *
**************************************************/
$scope.disallowDepto = function (item1) {
  var idDeptoKf = !item1 ? $scope.select.idDepartmentKf : item1;
  $http({
      method : "GET",
      url : $scope.serverHost+"Coferba/Back/index.php/Department/desaprobated/"+idDeptoKf
    }).then(function mySuccess(response) {
            if($scope.manageDepto==1){
              $scope.listUserDepto(1); 
            }console.log("<<<<HA SIDO CANCELADA LA SOLICITUD DE ALTA EN EL DEPARTAMENTO ID: "+idDeptoKf+">>>>");
      }, function myError(response) {
    });
 };

/**************************************************/
/**************************************************
*                                                 *
* unsubscribe REQUEST DEPARTMENT TO AN OWNER USER *
*                                                 *
**************************************************/
$scope.fn2unsubsDepto = function (item1, item2) {
  var idDeptoKf = !item1 ? $scope.select.idDepartmentKf : item1;
  var rsRequest = item2;
  $http({
      method : "GET",
      url : $scope.serverHost+"Coferba/Back/index.php/Department/requesLowByProp/"+idDeptoKf+'/'+rsRequest
    }).then(function mySuccess(response) {
        if($scope.manageDepto==1){
          $scope.listUserDepto(1);
        }
        if(rsRequest==1){
          console.log("<<<<SOLICITUD DE BAJA DEL DEPARTAMENTO ID: "+idDeptoKf+" HA SIDO ENVIADA>>>>");
        }else{
          console.log("<<<<LA SOLICITUD DE BAJA DEL DEPARTAMENTO ID: "+idDeptoKf+" HA SIDO CANCELADA>>>>");
        }
      }, function myError(response) {
    });
 };

/**************************************************/
/**************************************************
*                                                 *
* DEPARTMENT LIST BY SELECTED ADDRESS AND TENANT  *
*                                                 *
**************************************************/
$scope.getDeparment = function (value){
   var idAddressTmp=$scope.select.idAddressAtt;
   var urlT="";
  $scope.manageDepto = value; //Variable usada en la gestion de departamento
      if ($scope.sessionidProfile>0 && $scope.manageDepto==1){
         urlT=$scope.serverHost+"Coferba/Back/index.php/Department/byIdDireccion/"+idAddressTmp+"/"+'0';
      }
      if($scope.sessionidProfile!=3 && $scope.manageDepto==0){
        urlT=$scope.serverHost+"Coferba/Back/index.php/Department/byIdDireccion/"+idAddressTmp+"/"+'-1';
      }if ($scope.sessionidProfile==3 && $scope.sessionidTenantUser!=0 && $scope.manageDepto==0){
        urlT=$scope.serverHost+"Coferba/Back/index.php/Department/byIdTenantYDireccion/"+idAddressTmp+"/"+$scope.sessionidTenantUser+"/"+'1';
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
          $scope.ListDpto ="";
          if ($scope.sessionidProfile!=0 && $scope.manageDepto==1 && idAddressTmp){
            $scope.noRecordsFound=true;
            $scope.dptoNotFound=true;
            inform.add('No hay departamentos en esta direccion para ser asignados, Contacte al administrador.',{
                          ttl:5000, type: 'info'
            }); 
          }else if ($scope.sessionidProfile==3 && $scope.manageDepto==1 && !idAddressTmp){
            inform.add('Debe seleccionar una dirección para ver los departamentos asociados..',{
                          ttl:5000, type: 'warning'
            }); 
            $scope.dptoNotFound=true;
           }
          if (!idAddressTmp && $scope.manageDepto==0){
            inform.add('Debe seleccionar una direccion o contacte al administrador.',{
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
  //alert("2: "+$scope.manageDepto);
  var idDepto   = v1;
  var typeTenant= v2;
  var url1=$scope.serverHost+"Coferba/Back/index.php/tenant/allByIdDepartament/"+idDepto;
  var url2=$scope.serverHost+"Coferba/Back/index.php/Tenant/tenanatByIdDepartament/"+idDepto+"/"+typeTenant;
  var urlT=$scope.sessionidProfile==3 ? url2 : url1;
     $http({
        method : "GET",
        url : urlT
      }).then(function mySuccess(response) {
              $scope.listTenant = response.data.tenant;
              //alert("3: "+$scope.manageDepto);
              $scope.tenantNotFound=false; 
              $scope.dayDataCollapse[$scope.vIndex] = false;
              console.log('manageDepto = '+$scope.manageDepto+ ' / typeTenant = '+ typeTenant + ' / Profile = '+$scope.sessionidProfile);
              console.log(response.data.tenant);
              if ($scope.manageDepto==0 && response.data.tenant && typeTenant!=0 && $scope.sessionidProfile!=0){
                //alert("4: "+$scope.manageDepto);
                $('#ModalListTenant').modal('toggle');
              }else if(!response.data.tenant) {
                    $scope.messageInform1 = " Propietario registrado.";
                    $scope.messageInform2 = " inquilinos registrados.";
                    $scope.messageInform  = typeTenant == 1 ? $scope.messageInform1 : $scope.messageInform2;
                    inform.add('El departamento no presenta'+$scope.messageInform+'.',{
                                ttl:3000, type: 'warning'
                     });
                    $scope.tenantNotFound=true;
              }
        }, function myError(response) {
            $scope.dayDataCollapse[$scope.vIndex] = false;
            $scope.tenantNotFound=true;
            if ($scope.manageDepto == 0){
                    $scope.messageInform1 = " Propietario registrado.";
                    $scope.messageInform2 = " inquilinos registrados.";
                    $scope.messageInform  = typeTenant == 1 ? $scope.messageInform1 : $scope.messageInform2;
                    inform.add('El departamento no presenta'+$scope.messageInform+'.',{
                                ttl:3000, type: 'warning'
                     });          
              }
      });
  }


/**************************************************
*                                                 *
*    BUSCAR INQUILINO POR ID DE DEPARTAMENTO      *
*                                                 *
**************************************************/
$scope.searchDptoById = function(){
     $http({
        method : "GET",
        url : $scope.serverHost+"Coferba/Back/index.php/Department/find/"+$scope.idDeptoKf
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
      case "dashboard":
        $scope.companyN = $scope.sessionNameCompany;
      break;
      case "sysParam":
       if($scope.parameterId==1){
            $scope.smtpMail= $scope.parameterValue
       }else if($scope.parameterId==2){
            $scope.smtpPwd= $scope.parameterValue
       }else if($scope.parameterId==3){

            $scope.cost.key= $scope.parameterValue;
            $scope.costKey = $scope.parameterValue; 

       }else if($scope.parameterId==4){

        $scope.cost.service = $scope.parameterValue;
        $scope.costService  = $scope.parameterValue;  

       }else if($scope.parameterId==5){

        $scope.costDeliveryTmp = $scope.parameterValue;  
        $scope.costDelivery    = $scope.parameterValue;
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

/********************************************************************************************************************************************
*                                                                                                                                           *
*                                                                                                                                           *
*                                           F U N C I O N E S    D E   E D I F I C I O S                                                    *
*                                                                                                                                           *
*                                                                                                                                           *
********************************************************************************************************************************************/ 


/*************************************************************
*                                                            *
*    VERIFICAR SI UN INQUILINO TIENE UN TICKET ACTIVO        *
*                                                            *
*************************************************************/
$scope.checkTicketTenant = function(){
  var idTenantKf = $scope.idTenantKf;
  var msg1, msg2;
     $http({
        method : "GET",
        url : $scope.serverHost+"Coferba/Back/index.php/Ticket/verificateTicketByIdTenant/"+idTenantKf
      }).then(function mySuccess(response) {
          $scope.isHasTicket = true;
          console.log("POSEE TICKETS")
          msg1="Posee solicitudes pendientes, debes esperar a que finalice o cancelar para darte de baja."
          msg2="El inquilino presenta solicitudes pendientes, se deben finalizar o cancelar para poder dar de baja."
          $scope.messageInform = $scope.sessionidProfile==3 ? msg1 : msg2;
             inform.add($scope.messageInform,{
                        ttl:5000, type: 'warning'
             });

        }, function myError(response) {
            $scope.isHasTicket = true;
            console.log("NO POSEE TICKETS --> SE PROCEDE A SOLICITAR LA CONFIRMACION PARA LA BAJA.")
            $('#confirmRequestModal').modal('toggle');
      });
  }
/**************************************************/
$scope.changeBody = function(value){
  if(value==1){
      $scope.collap=1;
  }else if(value==2){
      $scope.collap=2;
  }
}














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
        
        if ($scope.tagPwd==1){
            inform.add('La clave no coincide debe verificar para completar su registro.',{
            ttl:3000, type: 'error'
             }); 
        }else{
          console.log($scope._setuser());
          $scope.addUser($http, $scope);
        }
    break;
    case "updprofile":                            //Update Profile and LocalStorage Variable Module
        localStorage.removeItem("Nombres");
        localStorage.removeItem("Email");
        localStorage.removeItem("TelefonoM");
        localStorage.removeItem("TelefonoL");
        var isEditUser=0;
        $scope.modificarUsuario($http, $scope, isEditUser);
        setTimeout(function() {
          $scope.getUpdateData(); 
        }, 1000);

    break;
    case "updateUser":
          console.log($scope._getData2Update(3));
          $scope.modificarUsuario($http, $scope, 3);
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
    case "lostpwd":                               //Lost Password Module
        $scope.chgPwdUser($http, $scope);
    break;
    case "chgPwdUser":                          //Change PWD User Module
      var isChPwd = $scope.Token ? 1 : 2;
      console.log('OPCION: '+isChPwd);
          if ($scope.tagPwd==1){
              inform.add('La clave no coincide debe verificar para completar su registro.',{
              ttl:3000, type: 'error'
               }); 
          }else{
            console.log($scope._getData2Update(isChPwd));
            $scope.modificarUsuario($http, $scope, isChPwd);
          }

        
    break;
    default:
  }
}

/**************************************************
*                                                 *
*               INGRESO DE USUARIO                *
*                                                 *
**************************************************/
$scope.tmp={fullNameUser:'',emailUser : '', phoneNumberUser : '', phoneLocalNumberUser : '', idProfileKf : '', idUser : ''}
function sysLoginUser($http,$scope,vOp){  
    $http.post($scope.serverHost+"Coferba/Back/index.php/User/auth",$scope._getLoginData(),setHeaderRequest())
        .then(function(data) {
         if (typeof(data.data.response) === "undefined"){
             inform.add('El Correo: '+ $scope.Login.email + ', no se encuentra registrado o ha colocado una clave errada verifique sus datos.',{
                        ttl:3000, type: 'error'
             }); 
             
           }else{
               $scope.rsJSON=data.data.response;
               console.log(data.data.response);
                if($scope.rsJSON.resetPasword==1){
                  inform.add('Recorda: '+ $scope.rsJSON.fullNameUser + ' que no podes usar la misma clave o claves anteriores.',{
                        ttl:3000, type: 'wrining'
                  }); 
             
                    $scope.tmp.fullNameUser         = $scope.rsJSON.fullNameUser,
                    $scope.tmp.emailUser            = $scope.rsJSON.emailUser,
                    $scope.tmp.phoneNumberUser      = $scope.rsJSON.phoneNumberUser,
                    $scope.tmp.phoneLocalNumberUser = $scope.rsJSON.phoneLocalNumberUser,
                    $scope.tmp.idProfileKf          = $scope.rsJSON.idProfileKf,
                    $scope.tmp.idUser               = $scope.rsJSON.idUser,
                    console.log($scope.tmp);
                    $('#PasswdModalUser').modal('toggle');
                }else{
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
                    }else{location.href = "index.html";}
                }  

            }
        },function (error, data, status) {
            if(status == 404 || status == 203){
              console.log("!Informacion: "+error.data.error+"info");
              inform.add(error.data.error,{
                ttl:5000, type: 'warning'
              }); 
            }
            else{
              console.log("!Informacion: "+error.data.error+"info");
              inform.add(error.data.error,{
                ttl:5000, type: 'warning'
              }); 
            }
           
        });   
        
  };
/****** Get Data from the Login Form ****/
$scope.Login = {email: '', password: ''};
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
  $http.post($scope.serverHost+"Coferba/Back/index.php/User/", $scope._setuser())
      .then(function (sucess, data) {
        //alert($scope.idProfileTmp)
        if ($scope.idProfileTmp==3){
            $scope.t.fullNameTenant           = $scope.fname+' '+$scope.lname;
            $scope.t.idTypeKf                 = 1;
            $scope.t.phoneNumberTenant        = $scope.phoneNumberUser;
            $scope.t.phoneNumberContactTenant = $scope.phonelocalNumberUser;
            $scope.t.emailTenant              = $scope.emailUser;
            $scope.sysFunctionsTenant('search'); //CHECK THE TENANT TABLE IF THERE IS ALREADY REGISTERED
            $scope.IsTenant=true;
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
$scope.idProfileTmp = "";
$scope._setuser = function () {
   $scope.idProfileTmp=!$scope.Token ? 3 : $scope.idProfileKf
  var user =
          {
                user:{
                            fullNameUser        : $scope.fname+' '+$scope.lname,
                            emailUser           : $scope.emailUser,
                            phoneNumberUser     : $scope.phoneNumberUser,
                            phoneLocalNumberUser: $scope.phonelocalNumberUser,
                            passwordUser        : $scope.passwordUser,
                            idProfileKf         : $scope.idProfileTmp,
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
$scope.modificarUsuario = function ($http, $scope, itemOp){
  $scope.isPwdCh=itemOp;
  console.log($scope._getData2Update($scope.isPwdCh));
  $http.post($scope.serverHost+"Coferba/Back/index.php/User/update", $scope._getData2Update($scope.isPwdCh))
      .then(function (sucess, data) {
         if ($scope.isPwdCh==0){
          inform.add($scope.sessionNames +' Sus datos han sido actualizado.',{
                    ttl:3000, type: 'success'
          });
         }else if ($scope.isPwdCh==1 || $scope.isChPwd==2){
            var names = $scope.Token ? $scope.sessionNames : $scope.tmp.fullNameUser;
            inform.add(names +' Su clave ha sido cambiada satisfactoriamente.',{
                    ttl:3000, type: 'success'
          });
            $('#PasswdModalUser').modal('hide');
          }else if ($scope.isPwdCh==3){
            inform.add('Los datos del usuario: '+ $scope.user.namesUser +' han sido actualizados satisfactoriamente.',{
                    ttl:3000, type: 'success'
            });
            $('#EditModalUser').modal('hide');
          }
            $scope.CallFilterFormT();


    },function (error,status) {
            if(status == 404){alert("!Informacion "+status+error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error Modificacion de Usuario !"+error+" Contacte a Soporte"+"error");}
           
    });
};
$scope.profile = {Names:'', Email:'', MovilPhoneNumber:'', PhonelocalNumber:''};
$scope.user = {namesUser: '', emailUser: '', phoneNumberUser: '', phonelocalNumberUser: '', idProfileKf: '', idUserTmp: '', idCompanyKf: '' };
$scope._getData2Update = function (value) {
  var isChPwd=value;
  var isEditUserKf = false;
  if (isChPwd==3){
  var updUser =
          {
                         user:
                              {

                                fullNameUser         : $scope.user.namesUser, 
                                emailUser            : $scope.user.emailUser, 
                                phoneNumberUser      : $scope.user.phoneNumberUser,
                                phoneLocalNumberUser : $scope.user.phonelocalNumberUser,
                                idProfileKf          : $scope.user.idProfileKf,
                                idUser               : $scope.user.idUserTmp,
                                idCompanyKf          : $scope.user.idCompanyKf                   
                                                                                      
                                                                 
                              }
          }
  }else if (isChPwd==0){
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

  }else if (isChPwd==1){
    isEditUserKf = true;
    var updUser =
          {
                         user:
                              {
                                fullNameUser         : $scope.sessionNames,
                                emailUser            : $scope.sessionMail,
                                phoneNumberUser      : $scope.sessionMovilPhone,
                                phoneLocalNumberUser : $scope.sessionLocalPhone,
                                idProfileKf          : $scope.sessionidProfile,
                                passwordUser         : $scope.newPwd2,
                                idUser               : $scope.sessionIdUser,
                                isEditUser           : isEditUserKf
                              }
          }
  }else if (isChPwd==2){
    isEditUserKf = true;
    var updUser =
          {
                         user:
                              {
                                fullNameUser         : $scope.tmp.fullNameUser,
                                emailUser            : $scope.tmp.emailUser,
                                phoneNumberUser      : $scope.tmp.phoneNumberUser,
                                phoneLocalNumberUser : $scope.tmp.phoneLocalNumberUser,
                                idProfileKf          : $scope.tmp.idProfileKf,
                                passwordUser         : $scope.newPwd2,
                                idUser               : $scope.tmp.idUser ,
                                isEditUser           : isEditUserKf
                              }
          }
  }
      return updUser;

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
      url : $scope.serverHost+"Coferba/Back/index.php/User/inactive/"+itemId
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
    url : $scope.serverHost+"Coferba/Back/index.php/User/active/"+itemId
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
  $scope.getDataUser2Edit(itemId);
};
/**************************************************
*                                                 *
*                 DELETE AN USER                  *
*                                                 *
**************************************************/
$scope.deleteUser = function (itemId) {
$http({
    method : "delete",
    url : $scope.serverHost+"Coferba/Back/index.php/User/delete/"+itemId
  }).then(function mySuccess(response) {
      $scope.CallFilterFormT();
    }, function myError(response) {
  });
};

/**************************************************
*                                                 *
*                LOST PWD USER                    *
*                                                 *
**************************************************/
$scope.lostPaswd=false;
$scope.fnLostPaswd=function(value){
  if (value==1){
    $scope.lostPaswd=true;
  }else { $scope.lostPaswd=false;}
}
$scope.chgPwdUser = function ($http, $scope){
  console.log($scope.requestNewPwd());
  $http.post($scope.serverHost+"Coferba/Back/index.php/User/updatePass", $scope.requestNewPwd(),setHeaderRequest())
      .then(function (sucess, data) {
          inform.add('Se ha restablecido su clave por favor verifique su correo.',{
                    ttl:3000, type: 'success'
          });
          $scope.lostPaswd=false;
    },function (error,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error Modificacion de Usuario !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope.pwd={email: ''};
$scope.requestNewPwd = function () {
  var user =
          {
                user:{
                            emailUser           : $scope.pwd.email
                      }
          };
  return user;
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
*   Select Function to bind the User data         *
*                                                 *
**************************************************/
$scope.getDataUser2Edit = function(obj){
    $scope.user.idUserTmp           = obj.idUser
    $scope.user.phoneNumberUser     = obj.phoneNumberUser;
    $scope.user.phonelocalNumberUser= obj.phoneLocalNumberUser;
    $scope.user.emailUser           = obj.emailUser;
    $scope.user.idProfileKf         = obj.idProfileKf;
    $scope.user.namesUser           = obj.fullNameUser;
    $scope.user.idCompanyKf         = obj.idCompanyKf;
    console.log(obj);
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
$scope.sysFunctionsTenant = function(value, fnAction){ //Funciones add, search, update, active, inactive Tenants
  var fnActionTenant= fnAction;
    switch (value) {
      case "open": //Opcion Utilizada para registrar un inquilino de cualquier tipo. 
        $scope.IsTenant                 =true;
        $scope.IsAttendant              =false;
        mail2Search                     = "";
        $scope.ownerFound               =false;
        $scope.tmp.idTypeAttTmp         = "";
        $scope.idTypeTenantKf           = "";
        $scope.tenant.typeTenant        = "";
        $scope.emailT                   = "";
        $scope.phoneMovilT              = "";
        $scope.phonelocalT              = "";
        $scope.fullNameTenant           = "";
        $('#RegisterModalTenant').modal('toggle');
        $('#ModalListTenant').modal('hide');
      break;

      /*------------------------------------------------------------------------------*/
      case "search": //Buscamos en la tabla tb_tenant por el parametro email.
       /*ASIGNAMOS LOS DATOS DEL FORM TENANT A LAS VARIABLES GENERALES*/
        if ($scope.Token && $scope.IsTenant && $scope.manageDepto>=0 && fnActionTenant=="add"){
          $scope.t.fullNameTenant           = $scope.fullNameTenant;
          $scope.t.idTypeKf                 = !$scope.idTypeTenantKf ? $scope.typeTenant : $scope.idTypeTenantKf;
          $scope.t.phoneNumberTenant        = $scope.phoneMovilT;
          $scope.t.phoneNumberContactTenant = $scope.phonelocalT;
          $scope.t.emailTenant              = $scope.emailT;
        }else if ($scope.IsTenant && $scope.manageDepto>=0 && fnActionTenant=="edit"){                                              
          $scope.t.idTenant                 = $scope.idTenantKf;
          $scope.t.fullNameTenant           = $scope.tenant.namesTenant;
          $scope.t.idTypeKf                 = !$scope.typeTenant ? $scope.tenant.typeTenant : $scope.typeTenant;
          $scope.t.phoneNumberTenant        = $scope.tenant.movilPhoneTenant;
          $scope.t.phoneNumberContactTenant = $scope.tenant.localPhoneTenant;
          $scope.t.idDepartmentKf           = $scope.tenant.typeTenant==1 ? null : $scope.idDepto;
          $scope.t.emailTenant              = $scope.tenant.emailTenant;
          console.log("IMPRIMIMOS EL ARREGLO SEGUN LA DATA OBTENIDA")
          console.log($scope.t);                             
        }
        mail2Search=$scope.t.emailTenant;
        $scope.tSearch=true;
        $scope.searchTenantByMail();
      break;
      /*------------------------------------------------------------------------------*/
      case "update": //Opcion Usada para actualizados datos de un inquilino de tipo propietario o un inqulino normal.
        if($scope.rsTenantData){
            if ($scope.Token){
              $scope.t.idTenant  = "";
              $scope.t.idTenant  = !$scope.rsTenantData.idTenant ? $scope.idTenantKf : $scope.rsTenantData.idTenant;
            }
              $scope.editTenant($http, $scope);
            if ($scope.IsTenant==true){
              $('#RegisterModalTenant').modal('hide'); //Hide the modal windows
              if($scope.typeTenant==1 || $scope.t.idTypeKf == 1){
                $scope.messageInform = "El Propietario: ";
              }else{
                $scope.messageInform = "El Inquilino: ";
              }
                //Se muestra Mensaje de notificacion de registro 
              inform.add('Datos del '+$scope.messageInform+'han sido actulizados satisfactoriamente.',{
                  ttl:3000, type: 'success'
              });
              if ($scope.sessionidProfile!=3 && $scope.isEditTenantByAdmin==true && $scope.manageDepto==0){
                  $scope.lisTenantByType($scope.select.idDepartmentKf, 0);
                 
              } $('#EditModalTenant').modal('hide');
            }
        }
      break;
      /*------------------------------------------------------------------------------*/
      case "addT": //Opcion Usada para registrar los datos de un usuarios [propietario] en la tabla tenant o un inquilino normal.
            console.log(getTenantData2Add());
            $scope.addTenant($http, $scope);
            if ($scope.IsTenant==true){
              $('#RegisterModalTenant').modal('hide'); //Hide the modal windows
              if($scope.typeTenant==1){
                $scope.messageInform = "El Propietario:";
              }else{
                $scope.messageInform = "El Inquilino:";
              }
                //Se muestra Mensaje de notificacion de registro 
              inform.add($scope.messageInform+' '+$scope.t.fullNameTenant+' ha sido registrado satisfactoriamente.',{
                  ttl:3000, type: 'success'
              });
        
            }     
      break;
      /*------------------------------------------------------------------------------*/
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
        url : $scope.serverHost+"Coferba/Back/index.php/Tenant/findByEmail/"+mail2Search
      }).then(function mySuccess(response) {
            $scope.rsTenantData = response.data;
            console.log("<<<INQUILINO ENCONTRADO>>>");
            console.log(response.data);
            /*VALIDAMOS CUANDO SE LOGUEA UN USUARIO PROPIETARIO Y OBTENES SU ID DE INQUILINO*/
            if($scope.isLogin==true){
              $scope.idTenantmp = response.data.idTenant;
              localStorage.setItem("idTenantUser", $scope.idTenantmp);
              location.href = "index.html"
            }
            /*VALIDACIONES SI LA PETICION NO ES DE BUSQUEDA*/
            if($scope.tSearch==false){
              if($scope.manageDepto>=0){
                $scope.idTenantKf              =  $scope.rsTenantData.idTenant;
                $scope.t.idTypeKf              =  $scope.rsTenantData.idTypeKf;
                  if($scope.IsTicket==true){
                    console.log("<<<PROCESO DE GESTION DE TICKET>>>")
                    if($scope.IsTenant==true){
                      console.log("<<<CARGAMOS LOS DATOS SELECCIONADOS DEL TENANT AL FORMULARIO DEL ALTA/BAJA>>>");
                      $scope.tenant.namesTenant      =  $scope.rsTenantData.fullNameTenant;
                      $scope.tenant.localPhoneTenant =  $scope.rsTenantData.phoneNumberContactTenant;
                      $scope.tenant.movilPhoneTenant =  $scope.rsTenantData.phoneNumberTenant;
                      $scope.tenant.emailTenant      =  $scope.rsTenantData.emailTenant;
                      $scope.enabledNextBtn();
                    }
                  }
                  if(!$scope.IsAttendant && $scope.t.idTypeKf==1){
                    console.log("PASO 1, Function Add TENANT: "+$scope.IsTenant+" And Type Tenant: "+$scope.t.idTypeKf+" Department: "+$scope.select.idDepartmentKf);
                    $scope.consoleMessage="==>SE ASIGNA EL DEPTO"+$scope.select.idDepartmentKf+" Y ES APROBADO AL PROPIETARIO: "+$scope.tenant.namesTenant+" SATISFACTORIAMENTE";
                  }
                  if($scope.IsAttendant && $scope.t.idTypeKf==1){
                    console.log("PASO 1, Function Add ATT: "+$scope.IsAttendant+" And Type Tenant: "+$scope.t.idTypeKf+" Department: "+$scope.att.idDepartmentKf);
                    $scope.consoleMessage="==>SE ASIGNA EL DEPTO: "+$scope.att.idDepartmentKf+" Y ES APROBADO AL ENCARGADO: "+$scope.t.fullNameTenant+" SATISFACTORIAMENTE";
                  }
              }
              if($scope.sessionidProfile!=3 && $scope.t.idTypeKf==1){
                console.log("<<<PROCESO DE ASIGNACIONDE DEPTO AL INQUILINO DE TIPO PROPIETARIO Y APROBACION>>>");
                if ($scope.manageDepto==0){$scope.tmp.idDeparmentKf=!$scope.IsAttendant ? $scope.select.idDepartmentKf : $scope.att.idDepartmentKf;}else
                {$scope.tmp.idDeparmentKf=!$scope.IsAttendant ? $scope.idDeptoKf : $scope.att.idDepartmentKf;}
                
                console.log($scope.consoleMessage);
                $scope.fnAssignDepto($scope.tmp.idDeparmentKf,1);
              }else{
                console.log("<<<NO TIENE PRIVILEGIOS PARA ASIGNAR Y/O APROBAR UN DEPARTAMENTO>>>");
              }
            }
            /*VALIDACIONES SI LA PETICION ES DE BUSQUEDA*/
            if($scope.tSearch==true){
              if (!$scope.Token && $scope.rsTenantData.idTypeKf==1){
                console.log("==>USUARIO PROPIETARIO ENCONTRADO => SE ACTUALIZAN DATOS");
                $scope.t.idTenant                 = $scope.rsTenantData.idTenant;
                $scope.t.idTypeKf                 = $scope.rsTenantData.idTypeKf;
                $scope.t.idDepartmentKf           = $scope.rsTenantData.idDepartmentKf;
              }else if ($scope.Token && $scope.rsTenantData.idTypeKf==1){
                console.log("==>PROPIETARIO ENCONTRADO => SE ACTUALIZAN DATOS"); 
              }else if ($scope.Token && $scope.rsTenantData.idTypeKf==2){
                console.log("==>INQUILINO ENCONTRADO => SE ACTUALIZAN DATOS"); 
              }
              $scope.sysFunctionsTenant('update');
              $scope.tSearch=false;
              /*
              $scope.t.fullNameTenant           =
              $scope.t.idTypeKf                 =
              $scope.t.phoneNumberTenant        =
              $scope.t.phoneNumberContactTenant =
              $scope.t.emailTenant              =
              */

            }
        }, function myError(response) {
            console.clear();
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
  $http.post($scope.serverHost+"Coferba/Back/index.php/Tenant", getTenantData2Add(),setHeaderRequest())
      .then(function (sucess, data) {
        console.log(getTenantData2Add());
        console.log("===>INQUILINO REGISTRADO SATISFACTORIAMENTE");
        if($scope.sessionidProfile!=0 && $scope.IsTicket==true && $scope.t.idTypeKf!=0 && $scope.manageDepto==0){
          console.log("=>BUSCAMOS LOS DATOS DEL INQUILINO REGISTRADO PARA CARGARLOS AL FORMULARIO DEL TICKET");
          $scope.tSearch=false;
          $scope.searchTenantByMail();
        }
        if($scope.att.idTypeAttKf==2 && $scope.IsAttendant==true && $scope.manageDepto>=0){
          console.log("=>BUSCAMOS LOS DATOS DEL ENCARGADO REGISTRADO PARA ASIGNAR Y APROBAR LA PORTERIA.");
          $scope.tSearch=false;
          $scope.searchTenantByMail();
        }
        if($scope.manageDepto==1 && $scope.IsTenant==true && $scope.t.idTypeKf==2){
          console.log("=>PROCEDEMOS A LISTAR NUEVAMENTE LOS INQUILINOS SEGUN EL ID DEL DEPARTAMENTO.");
          $scope.searchTenant('listTenant', $scope.idDeptoKf);
        }else{
          $scope.tSearch=false;
          $scope.searchTenantByMail();
        }

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope.t={idTenant:'', fullNameTenant:'', idTypeKf:'', phoneNumberTenant:'', phoneNumberContactTenant:'', idDepartmentKf: '', emailTenant:''};
function getTenantData2Add () {
if($scope.idProfileTmp == 3 || $scope.sessionidProfile==3){
  if (!$scope.Token){
    $scope.t.idTypeKf=1;
  }else if($scope.Token && $scope.manageDepto>=0){
    $scope.t.idTypeKf=2
  }
}else if($scope.sessionidProfile!=3 && $scope.manageDepto>=0 && !$scope.IsAttendant){
  $scope.t.idTypeKf=!$scope.idTypeTenantKf ? $scope.typeTenant : $scope.idTypeTenantKf;
}else if($scope.sessionidProfile!=3 && $scope.manageDepto>=0 && $scope.IsAttendant){
  $scope.t.idTypeKf=1;
}
/*VERIFICAMOS SI EL INQUILINO ES DE TIPO PROPIETARIO PARA NO LLENAR LA VARIABLE CON EL idDeparmentKf */
if($scope.t.idTypeKf==1 && $scope.sessionidProfile != 3){
  $scope.t.idDepartmentKf =null;
}else{
  $scope.t.idDepartmentKf =!$scope.select.idDepartmentKf?$scope.idDeptoKf : $scope.select.idDepartmentKf;
}
/*
$scope.t.fullNameTenant           =
$scope.t.idTypeKf                 =
$scope.t.phoneNumberTenant        =
$scope.t.phoneNumberContactTenant =
$scope.t.idDepartmentKf           =
$scope.t.emailTenant              =*/
    var tenant =
            {
                  tenant:
                        {
                          fullNameTenant           : $scope.t.fullNameTenant           ,
                          idTypeKf                 : $scope.t.idTypeKf                 ,
                          phoneNumberTenant        : $scope.t.phoneNumberTenant        ,
                          phoneNumberContactTenant : $scope.t.phoneNumberContactTenant ,
                          idDepartmentKf           : $scope.t.idDepartmentKf           ,
                          emailTenant              : $scope.t.emailTenant              
                        }
            };

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
  $http.post($scope.serverHost+"Coferba/Back/index.php/Tenant/update", getData2UpdateTenant())
      .then(function (sucess, data) {
        console.log("Los Datos han sido actualizados");
        if($scope.manageDepto==1 && $scope.IsTenant==true){
          $scope.searchTenant('listTenant', $scope.idDeptoKf);
          $('#EditModalTenant').modal('hide');
        }
    },function (error, data,status) {
        if(status == 404){alert("!Informacion "+status+data.error+"info");}
        else if(status == 203){alert("!Informacion "+status,data.error+"info");}
        else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
function getData2UpdateTenant () {
    var tenant =
            {
                  tenant:
                        {
                          idTenant                 : $scope.t.idTenant,
                          fullNameTenant           : $scope.t.fullNameTenant,
                          idTypeKf                 : $scope.t.idTypeKf,
                          phoneNumberTenant        : $scope.t.phoneNumberTenant,
                          phoneNumberContactTenant : $scope.t.phoneNumberContactTenant,
                          idDepartmentKf           : $scope.t.idDepartmentKf,
                          emailTenant              : $scope.t.emailTenant
                        }
            };  
 
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
          $scope.tenant.namesTenant      = "";
          $scope.tenant.addressTenant    = "";
          $scope.tenant.movilPhoneTenant = "";
          $scope.tenant.emailTenant      = "";
          $scope.tenant.localPhoneTenant = "";
          $scope.tenantNotFound = false;
          $scope.manageDepto=0;
        if (!$scope.select.idDepartmentKf){
          inform.add('Debe seleccionar un departamento.',{
                          ttl:5000, type: 'warning'
               }); 
        }else if($scope.sessionidProfile==3 && $scope.typeTenant==1){
                $scope.getData(1);
        }else{
          $scope.IsTenant=true;
          $scope.deptoHasOwner();
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
        $scope.typeTenant=idTypeTenant;
        if(!$scope.typeTenant){$scope.typeTenant=-1;}
         $scope.lisTenantByType(idDpto,$scope.typeTenant);
         $scope.typeTenant = 0;
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
      $scope.idDepto                 =  obj.idDepartmentKf;
      $scope.idTenantKf              =  obj.idTenant;
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
      $scope.isEditTenantByAdmin     =  true;
      $scope.idDepto                 =  obj.idDepartmentKf;
      $scope.idTenantKf              =  obj.idTenant;
      $scope.tenant.namesTenant      =  obj.fullNameTenant;
      $scope.tenant.localPhoneTenant =  obj.phoneNumberContactTenant;
      $scope.tenant.movilPhoneTenant =  obj.phoneNumberTenant;
      $scope.tenant.emailTenant      =  obj.emailTenant;
      $scope.tenant.typeTenant       =  obj.idTypeKf;
      $scope.IsTenant                = true;
      $scope.idTypeTenantKf          = "";
      $scope.typeTenant              = "";
      $scope.ownerFound              = false;
      $scope.IsAttendant             = false;
      $('#EditModalTenant').modal('toggle');
      console.log(obj);
  }

/*------------------------------------------------*/
/**************************************************
*                                                 *
*        REMOVER TENANT DE UN DEPARTAMENTO        *
*                                                 *
**************************************************/
$scope.fnRemoveTenant = function(){
  
  console.log($scope._getData2RemoveTenant());
  $http.post($scope.serverHost+"Coferba/Back/index.php/Department/removeTenant",$scope._getData2RemoveTenant(),setHeaderRequest())
        .then(function(success, data) {
            if ($scope.manageDepto==1 && $scope.IsFnRemove==true){

            }
              if ($scope.sessionidProfile==3 && $scope.typeTenantKf==1){
                inform.add('Se ha dado de baja satisfactoriamente.',{
                  ttl:3000, type: 'success'
                });
                  $scope.listUserDepto(1);
              }else if ($scope.sessionidProfile==3 && $scope.typeTenantKf==2 || $scope.sessionidProfile!=3 && $scope.typeTenantKf!=0 ){
                inform.add('El Inquilino ha sido dado de baja satisfactoriamente.',{
                  ttl:3000, type: 'success'
                });
                $scope.searchTenant('listTenant', $scope.idDeptoKf);
              }
        },function (error, data, status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error ! "+status+" Contacte a Soporte");}
           
        }); 
} 
$scope._getData2RemoveTenant = function () {
  var tenant =
          {
               info: { 
                            idTenant            : $scope.idTenantKf,
                            idDepartmentKf      : $scope.idDeparmentKf,
                            idTypeTenant        : $scope.typeTenantKf
                     }
          };
  return tenant;
};

/*------------------------------------------------*/
/**************************************************
*                                                 *
*                DISABLED AN TENANT               *
*                                                 *
**************************************************/
$scope.disabledTenant = function (itemId) {
  $http({
      method : "GET",
      url : $scope.serverHost+"Coferba/Back/index.php/Tenant/inactive/"+itemId
    }).then(function mySuccess(response) {

        $scope.searchTenant('listTenant', $scope.idDeptoKf);

      }, function myError(response) {
    });
 };
/**************************************************
*                                                 *
*                 ENABLED AN TENANT               *
*                                                 *
**************************************************/
$scope.enabledTenant = function (itemId) {
$http({
    method : "GET",
    url : $scope.serverHost+"Coferba/Back/index.php/Tenant/active/"+itemId
  }).then(function mySuccess(response) {
      $scope.searchTenant('listTenant', $scope.idDeptoKf);
    }, function myError(response) {
  });
};
/**************************************************/

/**************************************************
*                                                 *
*           CHECK IF A DEPTO HAS OWNER            *
*                                                 *
**************************************************/
$scope.deptoHasOwner = function () {
  console.log("Tipo de Inquilino: "+$scope.idTypeTenantKf+$scope.tenant.typeTenant);
  console.log("Tipo de Encargado: "+$scope.tmp.idTypeAttTmp);
  $scope.tmp.idDepartment ="";
  if (($scope.idTypeTenantKf==1 || $scope.tenant.typeTenant==1) || ($scope.tmp.idTypeAttTmp==2 || $scope.att.idTypeAttKf==2)){
    $scope.tmp.idDepartment ="";
    if (($scope.IsTicket && $scope.IsTenant)||(!$scope.IsTicket && $scope.IsTenant)){
      if ($scope.manageDepto==0){
        $scope.tmp.idDepartment=$scope.select.idDepartmentKf;
        //alert($scope.tmp.idDepartment);
      }else if ($scope.manageDepto==1){
        $scope.tmp.idDepartment=$scope.idDeptoKf;
      }
    }else if (($scope.IsTicket && $scope.IsAttendant) ||(!$scope.IsTicket && $scope.IsAttendant)){
      if ($scope.manageDepto>=0){
        $scope.tmp.idDepartment=$scope.att.idDepartmentKf;
        //alert($scope.tmp.idDepartment);
      }
    }

    console.log("$scope.tmp.idDepartment "+$scope.tmp.idDepartment);
    $http({
      method : "GET",
      url : $scope.serverHost+"Coferba/Back/index.php/Department/chekDepartamenteOwner/"+$scope.tmp.idDepartment
    }).then(function mySuccess(response) {
          if (response.data=="true"){
            $scope.ownerFound=true;
            console.log("EL DEPTO: "+$scope.tmp.idDepartment+" Ya tiene un propietario Asignado");
          }else if(response.data=="false"){
            $scope.ownerFound=false;
            console.log("EL DEPTO: "+$scope.tmp.idDepartment+" No tiene un propietario Asignado");
          }
            
      }, function myError(response) {
          
        
    });
  }else{
    $scope.ownerFound=false;
  }
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
*                                              F U N C I O N E S    D E   E N C A R G A D O S                                               *
*                                                                                                                                           *
*                                                                                                                                           *
********************************************************************************************************************************************/ 
/**************************************************
*                                                 *
*                MENU DE OPCIONES                 *
*                                                 *
**************************************************/
$scope.sysFunctionsAtt = function(value){
  switch (value){
    case "open":
      $scope.getTypeAttendant();
      $scope.att.idTypeAttKf     = "";
      $scope.tmp.idTypeAttTmp    = "";
      $scope.att.idDepartmentKf  = "";
      $scope.ownerFound = false;
      if ($scope.manageDepto>=0 && $scope.sessionidProfile){
        if (!$scope.select.idAddressAtt && !$scope.IsSystem){
          inform.add('Debe seleccionar una direccion antes de registrar un nuevo encargado',{
                  ttl:3000, type: 'warning'
          });
        }else{
            if ($scope.sessionidProfile==4){
              $scope.CompanyName=$scope.sessionNameCompany;

            }else if($scope.IsSystem==true){
              $scope.disabledSelect = false; 
            }else{$scope.disabledSelect = true;}

              $scope.idTypeTenantKf = "";
              $scope.IsAttendant=true;
              $scope.IsTenant=false;
              $scope.att={idAttendant:'', fullNamesAtt: '', idAddressAtt:'', idTypeAttKf: '',emailAtt:'', phonelocalAtt: '',phoneMovilAtt: '', hoursWork:'', idDepartmentKf: '' };
              $('#RegisterModalAtt').modal('toggle');
        }
      }
    break;
    case "add":
      if($scope.manageDepto==0 && $scope.IsTicket){
        $scope.tmp.localPhoneAtt="";
        $scope.tmp.movilPhoneAtt="";
        $scope.tmp.emailAtt     ="";
      } 
        $scope.att.idTypeAttKf=$scope.tmp.idTypeAttTmp;
        console.log(getAttData2Add());
        console.log($scope.att.idDepartmentKf);
        $scope.addAttendant($http, $scope);
    break;
    case "save":
        $scope.updateAttendant($http, $scope);
    break;
    case "update":
      if($scope.manageDepto==0 && $scope.IsTicket){
        console.log("<<<DATOS DEL ENCARGADO A ACTUALIZAR>>>");
        $scope.att.phonelocalAtt=$scope.tmp.localPhoneAtt;
        $scope.att.phoneMovilAtt=$scope.tmp.movilPhoneAtt;
        $scope.att.emailAtt     =$scope.tmp.emailAtt;

        $scope.updateAttendant($http, $scope);
      }else{
        $scope.IsAttendant=true;
        $scope.IsTenant=false;
        $('#UpdateModalAtt').modal('toggle');
      }
    break;
    default:
  }
}
/**************************************************
*                                                 *
*                  ADD ATTENDANT                  *
*                                                 *
**************************************************/
$scope.addAttendant = function ($http, $scope){
  $http.post($scope.serverHost+"Coferba/Back/index.php/User/attendant", getAttData2Add(),setHeaderRequest())
      .then(function (sucess, data) {
        inform.add('Encargado registrado satisfactoriamente',{
                ttl:2000, type: 'success'
        });
        if ($scope.manageDepto>=0 && $scope.att.idTypeAttKf==2 && $scope.IsAttendant){
          console.log("ENCARGADO DE TIPO TITULAR SE PROCEDE A REGISTRARLO COMO INQUILINO");
          $scope.t.fullNameTenant           = $scope.att.fullNamesAtt;
          $scope.t.phoneNumberTenant        = $scope.att.phoneMovilAtt;
          $scope.t.phoneNumberContactTenant = $scope.att.phonelocalAtt;
          $scope.t.emailTenant              = $scope.att.emailAtt;

          $scope.sysFunctionsTenant('search'); //CHECK THE TENANT TABLE IF THERE IS ALREADY REGISTERED
        }

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
                      nameAttendant       : $scope.att.fullNamesAtt,
                      idAddresKf          : $scope.select.idAddressAtt,
                      phoneAttendant      : $scope.att.phoneMovilAtt,
                      phoneLocalAttendant : $scope.att.phonelocalAtt,
                      idTyepeAttendantKf  : $scope.att.idTypeAttKf,
                      hoursWork           : $scope.att.hoursWork,
                      mailAttendant       : $scope.att.emailAtt
                    }
            };
  return attendant;
};
/**************************************************
*                                                 *
*               UPDATE ATTENDANT                  *
*                                                 *
**************************************************/
$scope.updateAttendant = function ($http, $scope){
  $http.post($scope.serverHost+"Coferba/Back/index.php/User/updateAtt", getAttData2Update(),setHeaderRequest())
      .then(function (sucess, data) {
        console.log(getAttData2Update());
        inform.add('Datos del Encargado actualizados satisfactoriamente',{
                ttl:3000, type: 'success'
        });
        $scope.isAttUpdated = true;
        if ($scope.manageDepto>=0 && $scope.att.idTypeAttKf==2){
          console.log("ENCARGADO DE TIPO TITULAR SE PROCEDE A ACTUALIZAR DATA EN LA TABLA INQUILINO");
          $scope.IsAttendant=true;
          $scope.t.fullNameTenant           = $scope.att.fullNamesAtt;
          $scope.t.phoneNumberTenant        = $scope.att.phoneMovilAtt;
          $scope.t.phoneNumberContactTenant = $scope.att.phonelocalAtt;
          $scope.t.emailTenant              = $scope.att.emailAtt;

          $scope.sysFunctionsTenant('search'); //CHECK THE ATTENDANT IN THE TENANT TABLE TO UPDATE
        }
        $scope.getAllAttendant();
        $('#UpdateModalAtt').modal('hide');
    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
function getAttData2Update () {
    var attendant =
            {
              attendant:
                    {
                      idAttendant         : $scope.att.idAttendant,
                      nameAttendant       : $scope.att.fullNamesAtt,
                      idAddresKf          : $scope.att.idAddressAtt,
                      phoneAttendant      : $scope.att.phoneMovilAtt,
                      phoneLocalAttendant : $scope.att.phonelocalAtt,
                      idTyepeAttendantKf  : $scope.att.idTypeAttKf,
                      hoursWork           : $scope.att.hoursWork,
                      mailAttendant       : $scope.att.emailAtt
                    }
            };
  return attendant;
};

/**************************************************
*                                                 *
*   Select Function to bind the Attendant data    *
*                                                 *
**************************************************/
$scope.select={nameAtt:''};
$scope.getAttData = function(){
    var idAtt = $scope.select.nameAtt;
    $scope.tmp.movilPhoneAtt = "";
    $scope.tmp.localPhoneAtt = "";
    $scope.tmp.emailAtt      = "";
    /* Recorrer el Json Attendant para obtener datos */
    var length = $scope.listAttendant.length;
    for (i = 0; i < length; i++) {
        if($scope.listAttendant[i].idAttendant == idAtt){
            
            $scope.tmp.movilPhoneAtt = $scope.listAttendant[i].phoneAttendant;
            $scope.tmp.localPhoneAtt = $scope.listAttendant[i].phoneLocalAttendant;
            $scope.tmp.emailAtt      = $scope.listAttendant[i].mailAttendant;
            /*-------------------------------------------------------------------*/
            $scope.att.idTypeAttKf   = $scope.listAttendant[i].idTyepeAttendantKf;
            $scope.att.idAttendant   = $scope.listAttendant[i].idAttendant;
            $scope.att.fullNamesAtt  = $scope.listAttendant[i].nameAttendant;
            $scope.att.idAddressAtt  = $scope.listAttendant[i].idAddresKf;

            console.log($scope.listAttendant[i]);
            break;
        }
    }; 
  }
/**************************************************/
/**************************************************
*                                                 *
*        SELECT DATA OF ATTENDANT TO UPDATE       *
*                                                 *
**************************************************/
  $scope.select2EditAtt = function (obj){
  //$scope.att={idAttendant:'', fullNamesAtt: '', idAddressAtt:'', idTypeAttKf: '',emailAtt:'', phonelocalAtt: '',phoneMovilAtt: '', hoursWork:'', idDepartmentKf: '' };

        $scope.att.idAttendant      =  obj.idAttendant;
        $scope.att.idAddressAtt     =  obj.idAddresKf;
        $scope.att.idTypeAttKf      =  obj.idTyepeAttendantKf;
        $scope.att.fullNamesAtt     =  obj.nameAttendant;
        $scope.att.emailAtt         =  obj.mailAttendant;
        $scope.att.phonelocalAtt    =  obj.phoneLocalAttendant;
        $scope.att.phoneMovilAtt    =  obj.phoneAttendant;
        $scope.att.hoursWork        =  obj.hoursWork;
        $scope.IsAttendant          = true;
        $scope.tmp.idTypeAttTmp     ="";
        $scope.att.idDepartmentKf   ="";

    $scope.getTypeAttendant();
    $('#UpdateModalAtt').modal('toggle');
    console.log("manageDepto: "+ $scope.manageDepto);
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
*                                              S O L I C I T U D E S    D E   S E R V I C I O S                                             *
*                                               Alta, Baja (llave), Servicios, Otras Consultas                                              *
*                                                                                                                                           *
********************************************************************************************************************************************/ 
/**************************************************
*                                                 *
*                MENU DE OPCIONES                 *
*                                                 *
**************************************************/
$scope.modalConfirmation=function(opt, confirm, obj){
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
    case "removet":
      if (confirm==0){
          if ($scope.sessionidProfile!=3 && obj.idTypeKf!=0 || $scope.sessionidProfile==3 && obj.idTypeKf==2){$scope.mess2show="Esta seguro que desea dar de baja al inquilino?";}else if ($scope.sessionidProfile==3){$scope.mess2show="Esta seguro que desea darse de baja?";}
          if($scope.sessionidProfile!=3 && obj.idTypeKf!=0 || $scope.sessionidProfile==3 && obj.idTypeKf==2){
              $scope.idTenantKf   =  !obj.idTenant ? obj.idTenantKf : obj.idTenant;
              $scope.idDeparmentKf=  !obj.idDepartmentKf ? obj.idDepartment : obj.idDepartmentKf;
              $scope.idDeparmentKf=  !$scope.idDeparmentKf ? $scope.idDeptoKf : $scope.idDeparmentKf;
              $scope.typeTenantKf =  !obj.idTypeKf ? 1 : obj.idTypeKf;
              console.log("Manage Depto: "+$scope.manageDepto);
              console.log('ID: '+$scope.idTenantKf+' ID DPTO: '+$scope.idDeparmentKf+' ID TIPO TENANT: '+$scope.typeTenantKf);
              console.log("DATOS DEL INQUILINO O PROPIETARIO A DAR DE BAJA");
              console.log(obj)
              $scope.checkTicketTenant();
          }else if($scope.sessionidProfile==3){
              $scope.idTenantKf   = $scope.sessionidTenantUser;
              $scope.idDeparmentKf=obj.idDepartment;
              $scope.typeTenantKf =1;
              console.log("Manage Depto: "+$scope.manageDepto);
              console.log('ID: '+$scope.idTenantKf+' ID DPTO: '+$scope.idDeparmentKf+' ID TIPO TENANT: '+$scope.typeTenantKf);
              console.log("DATOS DEL INQUILINO O PROPIETARIO A DAR DE BAJA");
              console.log(obj)
              $scope.checkTicketTenant();
          }
      }else if (confirm==1){
        $scope.IsFnRemove=true;
            $scope.fnRemoveTenant($http, $scope);
        $('#confirmRequestModal').modal('hide');
      }
    break;
    case "checkAddr":
      if (confirm==0 && $scope.addrNoFound==1){
        if (tmpOpt!="home"){
          $scope.mess2show="No posee departamento autorizados, Desea registrar un departamento?";
        }else{
          $scope.mess2show="No registra tickets actualmente, Desea verificar si tiene un departmanto asociado?";
        }
        $('#confirmRequestModal').modal('toggle');
      }else if(confirm==0 && $scope.addrNoFound==0 && $scope.sessionidProfile==3){ 
          if(tmpOpt=="rukeyup"){
            $scope.rukeyup = true;
          }else if(tmpOpt=="rukeydown"){
            $scope.rukeydown = true;
          }else if(tmpOpt=="home"){
            $scope.home = true;
          }
      }else if (confirm==1){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $('#m_depto').addClass('active');
        $('#SubM_Pedidos').hide();
        $scope.fnShowHide('managedepto', 'open');
        $('#confirmRequestModal').modal('hide');
      }
    break;
    case "removeu":
      if (confirm==0){
          if ($scope.sessionidProfile==1 && obj.idUser!=0){
            if (obj.idProfileKf == 1){$scope.mess2show="El usuario "+obj.fullNameUser+" bajo el perfil de Coferba sera Eliminado.     Confirmar?";}
            if (obj.idProfileKf == 2){$scope.mess2show="El usuario "+obj.fullNameUser+" bajo el perfil de Empresa sera Eliminado.     Confirmar?";}
            if (obj.idProfileKf == 3){$scope.mess2show="El usuario "+obj.fullNameUser+" bajo el perfil de Propietario sera Eliminado.     Confirmar?";}
            if (obj.idProfileKf == 4){$scope.mess2show="El usuario "+obj.fullNameUser+" bajo el perfil de Admin de Consorcio sera Eliminado.     Confirmar?";}
              $scope.idUserKf   =  obj.idUser;
              console.log('Usuario a eliminar ID: '+$scope.idUserKf+' BAJO EL NOMBRE: '+obj.fullNameUser);
              console.log("============================================================================")
              console.log(obj)
          }      
        $('#confirmRequestModal').modal('toggle');
      }else if (confirm==1){
            $scope.deleteUser($scope.idUserKf);
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
            /*
            if ($scope.sessionidProfile==3 && $scope.typeTenant==2){
              $scope.allowUpdate=true;
            }else if ($scope.sessionidProfile!=3 && $scope.typeTenant!=0){
              $scope.allowUpdate=true;
            }*/
            $scope.requestUpKey($http, $scope);
      break;
      case "down": // SOLOCITUD DE BAJA
            console.log($scope._getData2DelKey());
            /*
            if ($scope.sessionidProfile==3 && $scope.typeTenant==2){
              $scope.allowUpdate=true;
            }else if ($scope.sessionidProfile!=3 && $scope.typeTenant!=0){
              $scope.allowUpdate=true;
            }*/
            $scope.modalConfirmation('tdown',0);
            $scope.requestDownKey($http, $scope);
            
      break;
      case "srvs": // SOLOCITUD DE SERVICIOS
            console.log($scope._getServiceData());
            $scope.requestService($http, $scope);
      break;
      case "other": // SOLOCITUD DE OTRA CONSULTA
            console.log($scope._getData2RequestOther());
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
  $http.post($scope.serverHost+"Coferba/Back/index.php/Ticket", $scope._getData2AddKey())
      .then(function (sucess, data) {
          if($scope.allowUpdate==true){$scope.sysFunctionsTenant('update');}
          closeAllDiv ();
          cleanForms();
       inform.add('Solicitud realizada con exito. ',{ttl:2000, type: 'success'});
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
    userIdOwner = $scope.sessionidTenantUser;
    tenantKf    = $scope.sessionidTenantUser;
  }else if($scope.sessionidProfile==3 && $scope.typeOfTenant == 2){
    userIdOwner = $scope.sessionidTenantUser;
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
                            idBranchKf        : $scope.select.idAddressAtt,
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
  $http.post($scope.serverHost+"Coferba/Back/index.php/Ticket", $scope._getData2DelKey())
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
    userIdOwner = $scope.sessionidTenantUser;
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
                            idBranchKf            : $scope.select.idAddressAtt,
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
  $http.post($scope.serverHost+"Coferba/Back/index.php/Ticket", $scope._getServiceData())
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
$scope.select={idTypeServiceKf: '', idAddressKf: '', idCompanyKf: ''};
$scope.txt={sruSv: '', detailSv: '' };
$scope._getServiceData={};
$scope._getServiceData = function () {
  var idUserAdmin      = 0;    //ADMINISTRADOR COFERBA
  var idCompany        = 0;   //ID DE LA EMPRESA O CONSORCIO
  var idCompanyUser    = 0;  //USUARIO EMPRESA
  var userIdAConsorcio = 0; //ADMIN. CONSORCIO
  if($scope.sessionidProfile==1){
    idUserAdmin = $scope.sessionIdUser;
    idCompany   = $scope.select.idCompanyKf;
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
  $http.post($scope.serverHost+"Coferba/Back/index.php/Ticket", $scope._getData2RequestOther())
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

$scope.sideBarMenu = function(value, fnAction){
  switch (value){
    case "user":
      $('#RegisterModalUser').modal('toggle');

    break;
    case "att":
      $scope.sysFunctionsAtt("open");
    break;
    case "smtp":
      if(fnAction=="open"){
        $scope.smtp.mail ="";
        $scope.smtp.password ="";
        $scope.getParameter();
        $scope.loadParameter(1, 6,'sysParam');
        $('#ModalSMTPEmail').modal('toggle');
      }
      if(fnAction=="save"){
        $scope.smtpMail="";
        $scope.smtpPwd = "";
        $scope.updateMailSmtp($http, $scope);
      }
    break;
    case "services":
      if(fnAction=="open"){
        $scope.config.service="";
        $scope.config.key ="";
        $scope.config.delivery="";
        $scope.varSuccessFnCost = 0;
        $scope.getParameter();
        $scope.loadParameter(1, 6,'sysParam');
        $('#ModalServiceCost').modal('toggle');
      }
      if(fnAction=="save"){
        var i = 3;
        for (i=3; i<6; i++){
          $scope.updateServiceCost($http, $scope, i)
        }
      }

    break;
    default:
  }
}
/**************************************************
*                                                 *
*                MAIL PRINCIPAL                   *
*                                                 *
**************************************************/
$scope.smtp={mail: '', password: ''};
$scope.updateMailSmtp = function ($http, $scope){
  console.log($scope.getSmtpMail2Update());
  $http.post($scope.serverHost+"Coferba/Back/index.php/User/updateMailSmtp", $scope.getSmtpMail2Update())
      .then(function (sucess, data) {
          $scope.getParameter();
          $scope.loadParameter(1, 6,'sysParam');
          inform.add('Configuracion de smtp email realizada con exito. ',{
                  ttl:2000, type: 'success'
             });

          $('#ModalSMTPEmail').modal('hide');

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};

$scope.getSmtpMail2Update = function () {

  var mailsmtp =
          {
                mail:
                        {
                            email    : $scope.smtp.mail,
                            pass     : $scope.smtp.password
                        }
          };
  return mailsmtp;
};
/**************************************************/
/**************************************************
*                                                 *
*                 SERVICE COST                    *
*                                                 *
**************************************************/
$scope.varSuccessFnCost = 0;
$scope.updateServiceCost = function ($http, $scope, idParamTmp){

  console.log($scope.getCostValues2Update(idParamTmp));
  $http.post($scope.serverHost+"Coferba/Back/index.php/User/updateParam", $scope.getCostValues2Update(idParamTmp))
      .then(function (sucess, data) {
          $scope.varSuccessFnCost++;
          if ($scope.varSuccessFnCost==3){
              $scope.getParameter();
              $scope.loadParameter(1, 6,'sysParam');
              inform.add('Configuracion de costos de servicios realizada con exito. ',{
                  ttl:2000, type: 'success'
              });

              $('#ModalServiceCost').modal('hide');
          }
    },function (error, data,status) {
          $scope.varSuccessFnCost = 0;
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
$scope.config={service: '', key: '', delivery: ''};
$scope.getCostValues2Update = function (idParam) {
  var idParamTemp = idParam;
  var paramValue  = 0;
  if(idParamTemp==3){paramValue=$scope.config.key;}
  if(idParamTemp==4){paramValue=$scope.config.service;}
  if(idParamTemp==5){paramValue=$scope.config.delivery;}
    var servicecost =
            {
                  param:
                          {
                              idParam     : idParamTemp,
                              value       : paramValue
                              
                          }
            };
  return servicecost;
};
/**************************************************/

/**************************************************
*                                                 *
*                LOGOUT FUNCTION                  *
*                                                 *
**************************************************/

$scope.logout = function(){
  $scope.rsJSON = " ";
  localStorage.clear();
  $scope.Token = false;
  location.href = "index.html"
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
    $scope.tmp.movilPhoneAtt          = "";
    $scope.tmp.localPhoneAtt          = "";
    $scope.tmp.emailAtt               = "";
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
    $scope.recordsFound               = false;
    $scope.rusysconfig                = false;
    $scope.noRecordsFound             = false;
    $scope.formValidated              = false;
    $scope.isEditTenantByAdmin        = false;
    $scope.lostPaswd                  = false;
    $scope.tenantNotFound             = false;
    $scope.stepIndexTmp               =0;
    $scope.removeOwnerDepto           =0;
    $scope.manageTenantUser           =0;
    $scope.listTenant                 ="";
    $scope.filterMTenant              ="";
    $scope.idDepartmentKf             ="";
    $scope.select.idCompanyKf         ="";
    $scope.select.idAddressAtt        ="";
    $scope.select.idDepartmentKf      ="";
    $scope.editAttendant              = false;
    $scope.saveAttendant              = false;
    $scope.manageDepto                = 0;
    $scope.collap                     = 0;
    $scope.IsAttendant                = false;
    $scope.idTypeTenantKf             = "";
    $scope.ownerFound                 = false;
    $scope.attendantFound             = false;
    $scope.isAllowed                  = 0;
    $scope.isHasTicket                = false;
    $scope.IsTicket                   = false;
    $scope.idDeptoKf                  ="";
    $scope.IsSystem                   = false;
    $scope.disabledSelect             = false;
    $scope.tmp.idDepartment           = "";
    $scope.isAttUpdated               = false;
    $scope.tmp.idTypeAttTmp           = "";
    $scope.t={idTenant:'', fullNameTenant:'', idTypeKf:'', phoneNumberTenant:'', phoneNumberContactTenant:'', idDepartmentKf: '', emailTenant:''};
    $scope.att={idAttendant:'', fullNamesAtt: '', idAddressAtt:'', idTypeAttKf: '',emailAtt:'', phonelocalAtt: '',phoneMovilAtt: '', hoursWork:'', idDepartmentKf: '' };
}
/**************************************************/

/**************************************************
*                                                 *
*              CLOSE FORMS FUNCTION               *
*                                                 *
**************************************************/
function closeAllDiv (){
  $scope.rukeydown    = false;
  $scope.rukeyup      = false;
  $scope.ruservice    = false;
  $scope.ruother      = false;
  $scope.rucost       = false;
  $scope.home         = false;
  $scope.rucontact    = false;
  $scope.rudepto      = false;
  $scope.rusysconfig  = false;
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
            $scope.IsTicket = true;
            $scope.manageDepto = 0;
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
          $scope.IsTicket = true;
          $scope.manageDepto = 0;
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
          $scope.IsTicket = true;
          $scope.manageDepto = 0;
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
          $scope.IsTicket = true;
          $scope.manageDepto = 0;
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
          $scope.manageDepto = 1;
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
          cleanForms();
        if(divAction=="open"){
          BindDataToForm('mngdepto');
          if ($scope.sessionidProfile==3){
            $scope.getAllAddressByIdTenant();
          }else {$scope.home = true;}
          selectSwitch ('t');
        }else{
          closeAllDiv();
        }        
      break;
      case "frmcost":
          closeAllDiv();
          cleanForms();
        if(divAction=="open"){
          $scope.rucost = true;
        }else{
          closeAllDiv();
          $scope.rucost = false;
        }
      break;
      case "sysConfig":
          closeAllDiv();
          cleanForms();
          $scope.IsSystem=true;
          $scope.manageDepto = 0;
        if(divAction=="open"){
          $scope.loadParameter(1, 6,'sysParam');
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
$scope.filters={idTypeTicketKf: '', topDH: '', searchFilter:'', idCompany: '', idAddress: '', idStatusKf: ''};

$scope.dhboard = function(){
/******************************
*                             *
*       FILTER VARIABLES      *
*                             *
******************************/
$scope.filters.idTypeTicketKf= !$scope.filters.idTypeTicketKf ? 0 : $scope.filters.idTypeTicketKf;
$scope.filters.idAddress     = !$scope.filters.idAddress ? 0 : $scope.filters.idAddress;

var filterSearch     = $scope.filters.searchFilter,
    filterTop        = $scope.filters.topDH,
    filterProfile    = $scope.sessionidProfile,
    filterTenantKf   = $scope.sessionidProfile == 3 ? $scope.sessionidTenantUser : null,
    filterCompany    = $scope.sessionidProfile == 2 || $scope.sessionidProfile == 4 ? $scope.sessionidCompany : $scope.select.idCompanyKf,
    filterTypeTicket = $scope.sessionidProfile !=2 ? $scope.filters.idTypeTicketKf : 3,
    filterAddress    = $scope.filters.idAddress,
    filterStatus     = $scope.filters.idStatusKf;
    filterIdUser     = $scope.sessionidUser;
  $searchFilter= 
  {
       idUserKf            : filterIdUser,
       idOWnerKf           : filterTenantKf,
       searchFilter        : filterSearch,
       topFilter           : filterTop, 
       idProfileKf         : filterProfile,
       idTenant            : filterTenantKf,  
       idCompanyKf         : filterCompany,
       idTypeTicketKf      : filterTypeTicket,
       idAdress            : filterAddress,
       idStatusTicketKf    : filterStatus
  }
  $http.post($scope.serverHost+"Coferba/Back/index.php/Ticket/all", $searchFilter, setHeaderRequest)
  .then(function (sucess, data) {
         $scope.listTickt =  sucess.data.response;
         $scope.totalTickets = $scope.listTickt.length;

    },function (error, data,status) {
        if(status == 203 || status == 404){
          console.log("!Informacion: "+error.data.error+" info");
        }else{
          console.log(error.data.error);
          $scope.listTickt =  "";
          $scope.totalTickets = 0;
        }
        inform.add(error.data.error,{
                ttl:5000, type: 'warning'
        }); 
    });
}

$scope.cancelTicket = function(idTicket){

  if (confirm("Confirme Para Cancelar el Ticket!") == true) {
    // el problema es que no te deja seleccionar el id ?
  $http({
    method : "GET",
    url : $scope.serverHost+"Coferba/Back/index.php/Ticket/cancel/"+idTicket
  }).then(function mySuccess(response) {
      $scope.dhboard();
     
    }, function myError(response) {
  });
} else {
    
}

 
}
$scope.checkBefore2Load = function(){
  if ($scope.sessionidProfile==3){
            $scope.getAllAddressByIdTenant();
  }
  $scope.companyN = localStorage.getItem("nameCompany");
    $scope.home = true;
    $scope.dhboard();
}
 /*MOSTRAR EL MONITOR ACTIVO SIEMPRE AL ENTRAR AL SISTEMA*/
/* VALIDAMOS SI SE EFECTUO EL LOGIN Y MOSTRAMOS MENSAJE DE BIENVENIDA AL SISTEMA*/
if($scope.Token){
  var nameUser = localStorage.getItem("Nombres");
  $scope.checkBefore2Load();
  $timeout(function() {
      inform.add('Bienvenido Sr/a '+ nameUser,{
    ttl:3000, type: 'success'
  });
    }, 620);
  
}
/**
 * **********************
 */
























}); /*Cierre del JS ANGULAR*/

































