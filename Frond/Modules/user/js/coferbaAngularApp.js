var app = angular.module('coferbaApp', ["blockUI", "inform", "inform-exception", "showdown", "ngAnimate", "ui.bootstrap"]);
    app.config(function(blockUIConfig) {
      // Tell blockUI not to mark the body element as the main block scope.
      blockUIConfig.autoInjectBodyBlock = true;  
      blockUIConfig.autoBlock = true;
    });

app.controller('coferbaCtrl', function($scope, $location, $http, blockUI, $timeout, inform, $window) {
/**************************************************************/
$scope.serverHost=$scope.serverHost+"";
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
            console.log($scope.tableRowExpanded);
            console.log($scope.tableRowIndexCurrExpanded);
            if ($scope.tableRowExpanded === false && $scope.tableRowIndexCurrExpanded === "") {
                $scope.tableRowIndexPrevExpanded = "";
                $scope.tableRowExpanded = true;
                $scope.tableRowIndexCurrExpanded = $scope.vIndex;
                console.log(idDeptoKf+' / ' +$scope.vIndex)
                $scope.searchTenant('listTenant', idDeptoKf);
            } else if ($scope.tableRowExpanded === true) {
                if ($scope.tableRowIndexCurrExpanded === $scope.vIndex) {
                    $scope.tableRowExpanded = false;
                    $scope.tableRowIndexCurrExpanded = "";
                    console.log(idDeptoKf+' / ' +$scope.vIndex)
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
      if($scope.sessionidProfile!=3 && $scope.sessionidCompany){
        $scope.officeListByCompnayID();
      }

}

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
      url : $scope.serverHost+"Coferba/Back/index.php/DIreccion/companyByid/"+idCompanytmp
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
*     ATTENDANT LIST BY THE SELECTED ADDRESS      *
*                                                 *
**************************************************/
  $scope.select={idAddressAtt:''};
  $scope.getAllAttendant = function(){
    $scope.select.idDepartmentKf = "";
    var idAddressAttKf=$scope.select.idAddressAtt;
     $http({
        method : "GET",
        url : $scope.serverHost+"Coferba/Back/index.php/User/attendantByIdDirecction/"+idAddressAttKf
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
  console.log($scope._getData2AssignDepto(item1));
  $http.post($scope.serverHost+"Coferba/Back/index.php/Department/update",$scope._getData2AssignDepto(item1),setHeaderRequest())
        .then(function(success, data) {
            if ($scope.sessionidProfile==3 && fnAction==0){
                inform.add('Departamento Asignado y pendiente por aprobacion por la administracion.',{
                  ttl:3000, type: 'success'
                });
            }
            if ($scope.sessionidProfile!=3 && fnAction==1){
                $scope.approveDepto();
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
$scope._getData2AssignDepto = function (item1) {
  var idTenantUsertmp =$scope.sessionidProfile==3 ? $scope.sessionidTenantUser : $scope.idTenantKf
  var idDepartmentKf  = !$scope.select.idDepartmentKf ? item1 : $scope.select.idDepartmentKf
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
          $scope.searchTenant('listTenant', $scope.idDeptoKf);
        }console.log("<<<<DEPARTAMENTO ID: "+idDeptoKf+" FUE APROBADO SATISFACTORIAMENTE>>>>");
      }, function myError(response) {
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
$scope.manageDepto = 0;
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
  var url1=$scope.serverHost+"coferba/Back/index.php/tenant/allByIdDepartament/"+idDepto;
  var url2=$scope.serverHost+"Coferba/Back/index.php/Tenant/tenanatByIdDepartament/"+idDepto+"/"+typeTenant;
  var urlT=$scope.sessionidProfile==3 ? url2 : url1;
     $http({
        method : "GET",
        url : urlT
      }).then(function mySuccess(response) {
              $scope.listTenant = response.data.tenant;
              $scope.tenantNotFound=false; 
              $scope.dayDataCollapse[$scope.vIndex] = false;
              console.log('manageDepto = '+$scope.manageDepto+ ' / typeTenant = '+ typeTenant + ' / Profile = '+$scope.sessionidProfile);
              console.log(response.data.tenant);
              if ($scope.manageDepto==0 && response.data.tenant && typeTenant!=0 && $scope.sessionidProfile!=0){
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
        $scope.updateUser($http, $scope);
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
function sysLoginUser($http,$scope){  
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
                  inform.add('Recorda: '+ $scope.rsJSON.fullNameUser + ' que no puedes usar la misma clave o claves anteriores.',{
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
                    }else{location.href = "sistema.html";}
                }  

            }
        },function (error, data, status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error ! "+status+" Contacte a Soporte");}
           
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
        alert($scope.idProfileTmp)
        if ($scope.idProfileTmp==3){
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
         }else if ($scope.isPwdCh>=1){
            var names = $scope.Token ? $scope.sessionNames : $scope.tmp.fullNameUser;
            inform.add(names +' Su clave ha sido cambiada satisfactoriamente.',{
                    ttl:3000, type: 'success'
          });
            $('#PasswdModalUser').modal('hide');
          }
          $scope.CallFilterFormT();
    },function (error,status) {
            if(status == 404){alert("!Informacion "+status+error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error Modificacion de Usuario !"+error+" Contacte a Soporte"+"error");}
           
    });
};
$scope.profile = {Names:'', Email:'', MovilPhoneNumber:'', PhonelocalNumber:''};
$scope._getData2Update = function (value) {
  var isChPwd=value;
  var isEditUserKf = false;
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
$scope.sysFunctionsTenant = function(value, obj){  //Funciones add, search, update, active, inactive Tenants
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
          if($scope.isEditTenantByAdmin==false){mail2Search=$scope.emailT;}else{ mail2Search=$scope.tenant.emailTenant;}}
        $scope.tSearch=true;
        $scope.searchTenantByMail();
      break;
      /*------------------------------------------------------------------------------*/
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
              inform.add('Datos del '+$scope.messageInform+'han sido actulizados satisfactoriamente.',{
                  ttl:3000, type: 'success'
              });
              if ($scope.sessionidProfile!=3 && $scope.isEditTenantByAdmin==true){
                  $scope.lisTenantByType($scope.select.idDepartmentKf, 0);
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
  $http({
        method : "GET",
        url : $scope.serverHost+"Coferba/Back/index.php/Tenant/findByEmail/"+mail2Search
      }).then(function mySuccess(response) {
            $scope.rsTenantData = response.data;
            console.log("<<<INQUILINO ENCONTRADO>>>");
            console.log(response.data);

            if($scope.isLogin==true){
              $scope.idTenantmp = response.data.idTenant;
              localStorage.setItem("idTenantUser", $scope.idTenantmp);
              location.href = "sistema.html"
            }

            if($scope.tSearch==false && $scope.manageDepto==0){ //Cargamos el form del Ticket con la data del inquilino.
              console.log("<<<CARGAMOS LOS DATOS AL FORMULARIO TICKET>>>");
              $scope.idTenantKf              =  $scope.rsTenantData.idTenant;
              $scope.tenant.namesTenant      =  $scope.rsTenantData.fullNameTenant;
              $scope.tenant.localPhoneTenant =  $scope.rsTenantData.phoneNumberContactTenant;
              $scope.tenant.movilPhoneTenant =  $scope.rsTenantData.phoneNumberTenant;
              $scope.tenant.emailTenant      =  $scope.rsTenantData.emailTenant;
              $scope.enabledNextBtn();
              /*VERIFICAMOS SI EL REGISTRO DEL PROPIETARIO LO ESTA REALIZANDO UN ADMINISTRADOR PARA ASIGNARLE EL DPTO CORRESPONDIENTE*/
              if($scope.sessionidProfile!=3 && $scope.IsFnAdd==true && $scope.typeTenant==1){
                console.log("==>SE ASIGNA EL DEPTO"+$scope.select.idDepartmentKf+" Y ES APROBADO AL PROPIETARIO: "+$scope.tenant.namesTenant+" SATISFACTORIAMENTE");
                $scope.fnAssignDepto($scope.select.idDepartmentKf,1);
              }
            }
            //SI LA PETICION ES DE BUSQUEDA, SI EXISTE ACTUALIZAMOS LOS DATOS DE LO CONTRARIO SE INICIA EL PROCESO DE REGISTRO
            if($scope.tSearch==true){console.log("==>INQUILINO ENCONTRADO => SE ACTUALIZAN DATOS"); $scope.sysFunctionsTenant('update');$scope.tSearch=false;}
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
  $http.post($scope.serverHost+"Coferba/Back/index.php/Tenant", getTenantData2Add(),setHeaderRequest())
      .then(function (sucess, data) {
        console.log(getTenantData2Add());
        console.log("===>INQUILINO REGISTRADO SATISFACTORIAMENTE");
        if($scope.sessionidProfile!=0 && $scope.IsFnAdd==true && $scope.typeTenant!=0 && $scope.manageDepto==0){
          console.log("=>BUSCAMOS LOS DATOS DEL INQUILINO REGISTRADO PARA CARGARLOS AL FORMULARIO DEL TiCKET");
          $scope.sysFunctionsTenant('data');
        }
        if($scope.manageDepto==1 && $scope.IsTenant==true){
          $scope.searchTenant('listTenant', $scope.idDeptoKf);
        }

    },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
           
    });
};
function getTenantData2Add () {
var idDeptoTmp;
if(!$scope.typeTenant && $scope.idProfileTmp == 3){$scope.typeTenant = 1;}
if($scope.typeTenant && $scope.sessionidProfile == 3){$scope.typeTenant=2;}
if($scope.typeTenant==1 && $scope.sessionidProfile != 3){
  $scope.typeTenant=1; 
  idDeptoTmp=null;
}else{
  $scope.typeTenant=2;
  idDeptoTmp=!$scope.select.idDepartmentKf?$scope.idDeptoKf : $scope.select.idDepartmentKf;
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
  var idDeparmentKf=0;
  var typeTenantKf=!$scope.typeTenant ? $scope.tenant.typeTenant : $scope.typeTenant ;
  if(!typeTenantKf && $scope.sessionidProfile == 3){$scope.typeTenant = 1;}
  if(typeTenantKf && $scope.sessionidProfile == 3){typeTenantKf=2;}
  if(typeTenantKf==1 && $scope.sessionidProfile != 3){
    typeTenantKf=1; idDeparmentKf = null;
  }else{
    $scope.typeTenant=2;
    idDeparmentKf=!$scope.select.idDepartmentKf?$scope.idDeptoKf:$scope.select.idDepartmentKf ;
  }
  if($scope.IsTenant==false){$scope.idDepartmentKf=null;}
  if($scope.IsTenant==false){
    console.log($scope.IsTenant,$scope.typeTenant,$scope.sessionidProfile,$scope.idDepartmentKf);
    var tenant =
            {
                  tenant:
                        {
                          idTenant                 : $scope.idTenantmp,
                          fullNameTenant           : $scope.fname+' '+$scope.lname,
                          idTypeKf                 : typeTenantKf,
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
                          idTypeKf                 : typeTenantKf,
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
        //alert(idDpto);
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
      $scope.idDepto               =  obj.idDepartmentKf;
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
      $scope.isEditTenantByAdmin=true;
      $scope.idDepto               =  obj.idDepartmentKf;
      $scope.idTenantKf              =  obj.idTenant;
      $scope.tenant.namesTenant      =  obj.fullNameTenant;
      $scope.tenant.localPhoneTenant =  obj.phoneNumberContactTenant;
      $scope.tenant.movilPhoneTenant =  obj.phoneNumberTenant;
      $scope.tenant.emailTenant      =  obj.emailTenant;
      $scope.tenant.typeTenant       =  obj.idTypeKf;
      $scope.IsTenant = true;
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
  $http.post($scope.serverHost+"Coferba/Back/index.php/User/attendant", getAttData2Add(),setHeaderRequest())
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
    case "remove":
      if (confirm==0){
          if ($scope.sessionidProfile!=3 && obj.idTypeKf!=0 || $scope.sessionidProfile==3 && obj.idTypeKf==2){$scope.mess2show="Esta seguro que desea dar de baja al inquilino?";}else if ($scope.sessionidProfile==3){$scope.mess2show="Esta seguro que desea darse de baja?";}
          if($scope.sessionidProfile!=3 && obj.idTypeKf!=0 || $scope.sessionidProfile==3 && obj.idTypeKf==2){
              $scope.idTenantKf   =  !obj.idTenant ? obj.idTenantKf : obj.idTenant;
              $scope.idDeparmentKf=  !obj.idDepartmentKf ? obj.idDepartment : obj.idDepartmentKf;
              $scope.idDeparmentKf=  !$scope.idDeparmentKf ? $scope.idDeptoKf : $scope.idDeparmentKf;
              $scope.typeTenantKf =  !obj.idTypeKf ? 1 : obj.idTypeKf;
              console.log('ID: '+$scope.idTenantKf+' ID DPTO: '+$scope.idDeparmentKf+' ID TIPO: '+$scope.typeTenantKf);
              console.log(obj)
          }else if($scope.sessionidProfile==3){
              $scope.idTenantKf   = $scope.sessionidTenantUser;
              $scope.idDeparmentKf=obj.idDepartment;
              $scope.typeTenantKf =1;
              console.log('ID: '+$scope.idTenantKf+' ID DPTO: '+$scope.idDeparmentKf+' ID TIPO: '+$scope.typeTenantKf);
          }
        $('#confirmRequestModal').modal('toggle');
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
    default:
  }
}

$scope.newTicket = function(opt){
    switch (opt) {
      case "up": // SOLOCITUD DE ALTA
            console.log($scope._getData2AddKey());
        
            if ($scope.sessionidProfile==3 && $scope.typeTenant==2){
              $scope.allowUpdate=true;
            }else if ($scope.sessionidProfile!=3 && $scope.typeTenant!=0){
              $scope.allowUpdate=true;
            }
            $scope.requestUpKey($http, $scope);
      break;
      case "down": // SOLOCITUD DE BAJA
            console.log($scope._getData2DelKey());

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
    $scope.lostPaswd                  = false;
    $scope.tenantNotFound             = false;
    $scope.stepIndexTmp               =0;
    $scope.removeOwnerDepto           =0;
    $scope.manageTenantUser           =0;
    $scope.listTenant                 ="";
    $scope.filterMTenant              ="";
    $scope.idDepartmentKf             ="";
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
$scope.filters={idTypeTicketKf: '', topDH: '', searchFilter:'', idCompany: '', idAddress: '', idStatusKf: ''}
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

// crea una varible que tenga esto $scope.serverHost+" y lo remplazas en los llamados a los servicios si va
  $searchFilter= 
  {
       idUserKf            : filterIdUser,
       idOWnerKf           : filterTenantKf,
       searchFilter        : filterSearch,
       topFilter           : filterTop, 
       idProfileKf         : filterProfile,
       idTenant            : filterTenantKf,  // y este lo envio igual ?
       idCompanyKf         : filterCompany,
       idTypeTicketKf      : filterTypeTicket,
       idAdress            : filterAddress,
       idStatusTicketKf    : filterStatus
  }
  $http.post($scope.serverHost+"Coferba/Back/index.php/Ticket/all", $searchFilter, setHeaderRequest)
  .then(function (sucess, data) {
         $scope.listTickt =  sucess.data.response;

    },function (error, data,status) {
      if(status == 203){
        console.log("!Informacion "+status,data.error+"info");
      }else{
        console.log("Error !"+error+" Contacte a Soporte"+"error");
      }
      inform.add('No Records.',{
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

































