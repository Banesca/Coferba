var moduleMainApp = angular.module("coferbaApp.MainApp", ["coferbaTokenSystem", "ngAnimate", "ngSanitize", "ui.bootstrap", "coferbaServices.User",  "ui.select"]);

/**************************************************
*                                                 *
*          DATE FILTER FOR MYSQL TIMESTAMP        *
*                                                 *
**************************************************/
moduleMainApp.filter('dateToISO', function() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  }
});
/*************************************************/
moduleMainApp.filter('startFrom', function () {
  return function (input, start) {
    if (input) {
      start = +start;
      return input.slice(start);
    }
    return [];
  };
});
moduleMainApp.directive('onlyNumbers', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
moduleMainApp.directive('myMaxlength', function() {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      var maxlength = Number(attrs.myMaxlength);
      function fromUser(text) {
          if (text.length > maxlength) {
            var transformedInput = text.substring(0, maxlength);
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
            return transformedInput;
          } 
          return text;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  }; 
});
moduleMainApp.directive('scrollTo', function ($location, $anchorScroll) {
    return function(scope, element, attrs) {
      element.bind('click', function(event) {
        event.stopPropagation();
        scope.$on('$locationChangeStart', function(ev) {
          ev.preventDefault();
        });
        var location = attrs.scrollTo;
        $location.hash(location);
        $anchorScroll();
      });
    };
});
//Controller.$inject = ['$scope'];
moduleMainApp.controller('MainAppCtrl',  function($route, $scope, $location, $filter, $http, blockUI, $timeout, inform, inputService, userServices, tokenSystem, serverHost, serverBackend, $window){
    /**************************************************************/
      $scope.redirectSuccessfull = false;
      $scope.counT  =5;
      $scope.redirect ="#/login";
      tokenSystem.destroyTokenStorage(2);
      $scope.sysToken      = tokenSystem.getTokenStorage(1);
      $scope.sysLoggedUser = tokenSystem.getTokenStorage(2);
      $scope.counterInformShow = 0;
      $('.modal-backdrop').hide();
      /* VALIDAMOS SI SE EFECTUO EL LOGIN Y MOSTRAMOS MENSAJE DE BIENVENIDA AL SISTEMA*/
      if (!$scope.sysToken || !$scope.sysLoggedUser ){
          location.href = "#/login";      
      }else{
        //console.log($scope.sysLoggedUser)
        $timeout(function() {
          inform.add('Bienvenido Sr/a '+ $scope.sysLoggedUser.fullNameUser,{
              ttl:3000, type: 'success'
          });
        }, 620);
      }
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
          console.log("[selectTableRow]->item.idDepartment: "+idDeptoKf);
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
     
      $scope.loadPagination = function(item){
        var sortingOrder = 'idUser';
        $scope.sortingOrder = sortingOrder;
        $scope.reverse = true;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 7;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.items = [];
        $scope.items = item;
        $scope.search();
      }
      var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

        // init the filtered items
        $scope.search = function (qvalue, vStrict) {          
            var queryValue = !qvalue?"Empty":qvalue;
              console.log("[search]-->qvalue: "+queryValue);
            $scope.filteredItems = $filter("filter")($scope.items, qvalue, vStrict);
            //console.log($scope.filteredItems);
            // take care of the sorting order
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter("orderBy")($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            }
            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        };
        
        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];
            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    //console.log("entro al if");
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
                } else {
                    //console.log("entro al else");
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                    
                } 
            }
            //console.log($scope.pagedItems);
            console.log("PAGINATION LOADED");
        };
        $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
        };
        
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };
        
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };
        
        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };

        // functions have been describe process the data for display

        // change sorting order
        $scope.sort_by = function(newSortingOrder) {
            if ($scope.sortingOrder == newSortingOrder)
                $scope.reverse = !$scope.reverse;

            $scope.sortingOrder = newSortingOrder;

            // icon setup
            $('th i').each(function(){
                // icon reset
                $(this).removeClass().addClass('icon-sort');
            });
            if ($scope.reverse)
                $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
            else
                $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
        };
        $scope.refresRowsInList = function(){
            console.log();
            $scope.CallFilterFormT();
            $scope.CallFilterFormU();

        }

    /**************************************************/
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
      $scope.pasos3= [
                    'PASO 1: DATOS PERSONALES',
                    'PASO 2: DATOS DE LA SOLICITUD'
                     ];
        $scope.fSwitch = "";
      function selectSwitch(valor){
          $scope.fSwitch = valor;
        if ($scope.fSwitch=="t"){ 
          $scope.pasos= $scope.pasos1;
        }else if ($scope.fSwitch=="s"){
          $scope.pasos=$scope.pasos2;
        }else if ($scope.fSwitch=="i"){
          $scope.pasos=$scope.pasos3;
        }
        $scope.mySwitch = $scope.pasos[0];
        console.log($scope.mySwitch);
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
      $scope.enabledNextBtn=function(item){
        //console.clear();
        $scope.select.idAddressAtt = !$scope.select.idAddressAtt?$scope.selectIdAddressKf.selected:$scope.select.idAddressAtt;
        $scope.formValidated=false;
          //alert($scope.stepIndexTmp);
        switch ($scope.stepIndexTmp){
          case 0:
            //alert("ENTRO CASE 0");
            if ($scope.fSwitch=="t" && $scope.sessionidProfile!=0){
              if (!$scope.select.idAddressAtt){
                  $scope.formValidated=false; 
              }else{
                $scope.formValidated=true;
              }

            }else if ($scope.fSwitch=="i" && $scope.sessionidProfile!=0){
              if (!$scope.sessionIdDeparmentKf || !$scope.sessionisDepartmentApproved || $scope.sessionisDepartmentApproved==0){
                  $scope.formValidated=false; 
              }else{
                $scope.formValidated=true;
              }

            }else if ($scope.fSwitch=="s" && $scope.sessionidProfile!=3){
              if (!$scope.select.idAddressAtt){
                  $scope.formValidated=false; 
              }else{
                $scope.formValidated=true;
              }
            }
            break;
            case 1:
              $scope.typeOption = item;
              console.log("$scope.typeOption: "+$scope.typeOption);
              //alert("ENTRO CASE 1");
            if ($scope.fSwitch=="t" && $scope.sessionidProfile!=3){
              //alert("ENTRO AL PRIMER IF");
              if ($scope.collap==1){
                //alert("ENTRO AL 2DO IF");
                if (!$scope.select.idDepartmentKf || $scope.tenant.namesTenant==""){
                  $scope.formValidated=false;
                }else{
                  $scope.formValidated=true;
                }
              }else 
                if ($scope.collap==2){
                  if($scope.typeOption==1){
                      if($scope.select.nameAtt==null){
                        console.log("select vacio o modo edicion activado");
                        $scope.formValidated=false; 
                      }else{
                        console.log("select lleno");
                        console.log($scope.select.nameAtt)
                        $scope.formValidated=true;
                      }
                    }else{
                      console.log($scope.typeOption)
                      $scope.formValidated=true;
                  } 
                }

            }else if ($scope.sessionidProfile==3 || ($scope.sessionidProfile==3 && $scope.sessionidTypeTenant==1)){
              //alert("ENTRO");
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
    $scope.sysLoadLStorage = function (){
         $scope.sessionIdUser               = $scope.sysLoggedUser.idUser;
         $scope.sessionNames                = $scope.sysLoggedUser.fullNameUser;
         $scope.sessionMail                 = $scope.sysLoggedUser.emailUser;
         $scope.sessionidAddress            = !$scope.sysLoggedUser.idAddresKf?$scope.sysLoggedUser.idAdress:$scope.sysLoggedUser.idAddresKf;
         $scope.sessionNameAdress           = $scope.sysLoggedUser.nameAdress;
         $scope.sessionMovilPhone           = $scope.sysLoggedUser.phoneNumberUser;
         $scope.sessionLocalPhone           = $scope.sysLoggedUser.phoneLocalNumberUser;
         $scope.sessionidProfile            = $scope.sysLoggedUser.idProfileKf;
         $scope.sessionProfileName          = $scope.sysLoggedUser.nameProfile;
         $scope.sessionidStatus             = $scope.sysLoggedUser.idStatusKf;
         $scope.sessionidCompany            = !$scope.sysLoggedUser.idCompanyKf?$scope.sysLoggedUser.idCompany:$scope.sysLoggedUser.idCompanyKf;
         $scope.sessionNameCompany          = $scope.sysLoggedUser.nameCompany;
         $scope.sessionIdDeparmentKf        = $scope.sysLoggedUser.idDepartmentKf;
         $scope.sessionidTenantUser         = $scope.sysLoggedUser.idUser;
         $scope.sessionidTypeTenant         = $scope.sysLoggedUser.idTypeTenantKf;
         $scope.sessionisDepartmentApproved = $scope.sysLoggedUser.isDepartmentApproved;
         //$scope.sysParameterVar     = localStorage.getItem("sysParameters");
         //if($scope.sessionidProfile==3){$scope.getAllAddressByIdTenant();}
          /*if($scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){
            $scope.listUserDepto(null, $scope.sessionIdAddress);
          }*/
         /*VALIDAMOS QUE EL USUARIO SEA DIFERENTE DE USUARIO PROPIETARIO Y QUE ESTE ASIGNADO A UNA COMPAÑIA Y CARGAMOS LA LISTA DE COMPAÑIAS*/
          if(($scope.sessionidProfile==4 || $scope.sessionidProfile==2)&& $scope.sessionidCompany){
            $scope.officeListByCompnayID($scope.sessionidCompany);
          }

    }

      
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
          url : serverHost+serverBackend+"User/mailsmtp"
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
        if ($scope.IsSystem == true){$scope.getParameter();}
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
          //console.log($scope.listParameter[i]);
        }
    }
    /**************************************************/
    /**************************************************
    *                                                 *
    *    LISTADO DE SUCURSALES POR ID DE EMPRESA      *
    *                                                 *
    **************************************************/
    $scope.select = {idCompanyKf:''};
    $scope.officeListByCompnayID = function(idCompanyKf){

        if(idCompanyKf){
            console.log("[officeListByCompnayID]-->idCompanyKf: "+idCompanyKf);
            var idCompanytmp=idCompanyKf;
           $http({
              method : "GET",
              url : serverHost+serverBackend+"Direccion/addressListByCompanyid/"+idCompanytmp
            }).then(function mySuccess(response) {
                $scope.listOffice   = response.data

                $scope.companyFound=true;
                if($scope.ruservice){$scope.companyUserByIdCompany(idCompanytmp);}
              }, function myError(response) {
                $scope.companyFound=false;
                $scope.listOffice = "";
            });
        }else{$scope.companyFound=false; console.log("idCompanyKf No recibido")}
      }

      $scope.filterAddressKf={};
      $scope.filterCompanyKf={};
      $scope.selectIdAddressKf = {};
      $scope.selectIdCompanyKf = {};
      $scope.onSelectCallback = function(){
        $scope.selectIdAddressKf.selected=undefined;
        $scope.filterAddressKf.selected=undefined;
    }
    $scope.getSecurityCodeFromAddress = function(obj){
      $scope.addressCodeSecurity=!obj.IdSecurityCode?"Codigo No asignado":obj.IdSecurityCode;
    }
    /**************************************************
    *                                                 *
    *    LISTADO DE SUCURSALES POR ID DE EMPRESA      *
    *                                                 *
    **************************************************/
    $scope.select = {idCompanyKf:''};
    $scope.companyInfoByCompnayID = function(){
      var idCompanytmp;
      if ($scope.sessionidProfile==2 || $scope.sessionidProfile==4)
        {idCompanytmp=$scope.sessionidCompany;}else if($scope.sessionidProfile==1 && $scope.select.idCompanyKf!=0){ idCompanytmp=$scope.select.idCompanyKf;}

       $http({
          method : "GET",
          url : serverHost+serverBackend+"Direccion/companyByid/"+idCompanytmp
        }).then(function mySuccess(response) {
            $scope.listOffice   = response.data
            $scope.companyFound=true;
          }, function myError(response) {
            $scope.companyFound=false;
            $scope.listOffice = "";
        });
    }
    /**************************************************
    *                                                 *
    *               REQUEST SELECT LIST               *
    *     (status, profile, typeTenant, company)      *
    **************************************************/
    $scope.CallFilterFormU = function(varray){
       $http({
          method : "GET",
          url : serverHost+serverBackend+"User/filterForm"
        }).then(function mySuccess(response) {
            $scope.listProfile      = response.data.profile;
            $scope.lisTypeTenant    = response.data.type;
            $scope.listCompany      = response.data.company;
            $scope.listStatus       = response.data.status;
            if($scope.IsSystem && $scope.sysContent!="dashboard" && $scope.sysContent=="company"){$scope.loadPagination($scope.listCompany);}
          }, function myError(response) {
        });
    }


    /*************************************************/
    
    /**************************************************
    *                                                 *
    *             REQUEST SELECT LIST                 *
    *  (user, reason_disabled_item, typedelivery)     *
    *     (typeouther, typeticket, tipeOpcion)        *
    **************************************************/
    $scope.CallFilterFormT = function(){
      $scope.listUser         = "";
      $scope.sysListAttendant = "";
      $scope.sysListTenant    = "";
      $scope.listTypeAttendant= "";
      var arrList = [];
       $http({
          method : "GET",
          url : serverHost+serverBackend+"Ticket/filter"
        }).then(function mySuccess(response) {
            $scope.listTypeDelivery = response.data.typedelivery;
            $scope.listTypeServices = response.data.typeservices;
            $scope.listTypeLost     = response.data.reason_disabled_item;
            $scope.listTypeQuery    = response.data.typeouther;
            $scope.listUser         = response.data.user;
            $scope.sysListTenant    = response.data.tenant;
            $scope.sysListAttendant = response.data.attendant;
            $scope.listTypeTicket   = response.data.typeticket;
            $scope.listStatusTicket = response.data.statusticket;
            $scope.listTypeAttendant= response.data.typeattendant;
               if($scope.sysContent=="user"){arrList=$scope.listUser;}
               if($scope.sysContent=="tenant"){arrList=$scope.sysListTenant;}
               if($scope.sysContent=="att"){arrList=$scope.sysListAttendant;}

            if($scope.IsSystem && $scope.sysContent!="dashboard" && $scope.sysContent!="company"){$scope.loadPagination(arrList);}
          }, function myError(response) {
            $scope.listTypeDelivery = "";
            $scope.listTypeLost     = "";
            $scope.listTypeQuery    = "";
            $scope.listUser         = "";
            $scope.sysListAttendant = "";
            $scope.sysListTenant    = "";
            $scope.listTypeTicket   = "";
            $scope.listStatusTicket = "";
            $scope.listTypeAttendant= "";
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
          url : serverHost+serverBackend+"Direccion"
        }).then(function mySuccess(response){
            $scope.ListAddress = response.data;
        }, function myError (response){
          
      });
    }
    /**************************************************/
    /**************************************************
    *                                                 *
    *   Select Function to bind the Cost of Service   *
    *                                                 *
    **************************************************/
    $scope.getCostServiceData = function(item, idAddress){
        console.log("[getCostServiceData]--> idAddress: "+idAddress);
        /* Recorrer el Json de Address para obtener datos */
        var length = item==3 ? $scope.ListTenantAddress.length : $scope.listOffice.length;
        for (i = 0; i < length; i++) {
          if (item==3){
            if($scope.ListTenantAddress[i].idAdress == idAddress){
                $scope.costService  = $scope.ListTenantAddress[i].priceManagement;
                $scope.costKey      = $scope.ListTenantAddress[i].priceUni;
                $scope.costDelivery = $scope.ListTenantAddress[i].priceShipping;
                console.log("ITEM3--->");
                console.log($scope.ListTenantAddress);
                break;
            }
          }else if(item==4){
            if($scope.listOffice[i].idAdress == idAddress){
                $scope.costService  = $scope.listOffice[i].priceManagement;
                $scope.costKey      = $scope.listOffice[i].priceUni;
                $scope.costDelivery = $scope.listOffice[i].priceShipping;
                console.log("ITEM4--->");
                console.log("[getCostServiceData]--> costService: "+$scope.costService);
                console.log("[getCostServiceData]--> costKey: "+$scope.costKey);
                console.log("[getCostServiceData]--> costDelivery: "+$scope.costDelivery);
                break;
            }
          }
        }; 
    }
    /**************************************************/

    /**************************************************
    *                                                 *
    *           ADDRESS LIST BY ID TENANT             *
    *                                                 *
    **************************************************/

    $scope.addrNoFound=0;
    $scope.getAllAddressByIdTenant = function (){
      var url1="Direccion/byidTenant/"+$scope.sessionidTenantUser+"/"+$scope.sessionIdDeparmentKf+"/"+1;
      var url2="Direccion/byidTenant/"+$scope.sessionidTenantUser+"/"+0+"/"+1;
      var urlF=$scope.sessionidProfile==5 || ($scope.sessionidProfile==5 && $scope.sessionidTypeTenant==2) ? url1 : url2;
      $http({
          method : "GET",
          url : serverHost+serverBackend+urlF,
        }).then(function mySuccess(response){
            $scope.ListTenantAddress = response.data;
            //console.log($scope.ListTenantAddress);
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
            url : serverHost+serverBackend+"Ticket/typeAttendant"
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
      $scope.getAllAttendant = function(idValue){
        if (!$scope.isAttUpdated && $scope.IsTicket && !$scope.typeOption){
          $scope.tmp.localPhoneAtt  = ""; 
          $scope.tmp.movilPhoneAtt  = "";
          $scope.tmp.emailAtt       = "";
          $scope.select.nameAtt     = "";
        }
        //$scope.select.idDepartmentKf = "";
        var typeOfMessage="";
        var idAddressAttKf=idValue;
        var informMessage="";
         $http({
            method : "GET",
            url : serverHost+serverBackend+"User/attendantByIdDirecction/"+idAddressAttKf
          }).then(function mySuccess(response) {
                $scope.listAttendant ="";
                $scope.listAttendant = response.data;
                $scope.attendantFound=true;
            }, function myError(response) {
              $scope.listAttendant ="";
              $scope.attendantFound=false;
              informMessage="";
              if($scope.manageDepto>=0 && !idAddressAttKf){
                  informMessage="Debe selecionar una direccion para obtener la informacion.";
                  typeOfMessage='warning';
              }else if($scope.manageDepto==0 && idAddressAttKf && response.status==404){ 
                  informMessage="La direccion seleccionada no presenta encargados registrados.";
                  typeOfMessage='info';
              }else if($scope.manageDepto==0 && !idAddressAttKf){ 
                  informMessage="Debe selecionar una direccion para obtener el listado de encargados asociados.";
                  typeOfMessage='warning';
              }else if($scope.manageDepto==0 && idAddressAttKf && response.status==404){ 
                  informMessage="La direccion seleccionada no presenta encargados registrados";
                  typeOfMessage='danger';
              }
              if(informMessage){
                inform.add(informMessage,{
                              ttl:4000, type: typeOfMessage
                });
              }
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
      if($scope.select.namesAdmin){
        var idUserComp = $scope.select.namesAdmin;
        /* Recorrer el Json Attendant para obtener datos */
        console.log("[getUserCompanyData]-->idUserComp: "+idUserComp);
        var length = $scope.listUser.length;
        for (i = 0; i < length; i++) {
            if($scope.listUser[i].idUser == idUserComp){
                $scope.localPhoneAdmin=$scope.listUser[i].phoneLocalNumberUser;
                $scope.movilPhoneAdmin=$scope.listUser[i].phoneNumberUser;
                $scope.emailAdmin     =$scope.listUser[i].emailUser;
                break;
            }
        }; 
      }else{
          $scope.localPhoneAdmin="";
          $scope.movilPhoneAdmin="";
          $scope.emailAdmin     ="";
          console.log("[getUserCompanyData]-->idUserComp: undefined");
      }
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
        //alert($scope.select.idAddressAtt);
        $scope.typeOfTenant = n;
        $scope.tenant.namesTenant      = "";
        $scope.tenant.addressTenant    = "";
        $scope.tenant.movilPhoneTenant = "";
        $scope.tenant.emailTenant      = "";
        $scope.tenant.localPhoneTenant = "";
        $scope.tenantNotFound = false;
      if(n && $scope.select.idAddressAtt){
          $scope.getDeparment(0, $scope.select.idAddressAtt);
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

    $scope.getDeptoFloor = function(){
      var idAddrr = $scope.sessionidAddress;
      /* Recorrer el Json para obtener datos */
      var length = $scope.ListDptoByTenant.length;
      //console.log($scope.deptoLength)
      var rsJSON = {depto: {}};
      for (i = 0; i < length; i++) {
          if($scope.ListDptoByTenant[i].idAdressKf == idAddrr){
              rsJSON.depto = $scope.ListDptoByTenant[i];
              //console.log(rsJSON);
              break;
          }
      }; 
      return rsJSON.depto.departmentFloor;
    }

    /**************************************************
    *                                                 *
    *LIST THE DEPARTMENT ASSIGNED TO THE OWNER TENANT *
    *                                                 *
    **************************************************/

    $scope.listUserDepto = function(value, idValue){
      //$scope.manageDepto=value;
      var idAddressTmp=idValue;
      var idTenantTmp = 0;
      var urlT="";
      idTenantTmp = $scope.sessionidProfile==3 || $scope.sessionidProfile==6 ? $scope.sessionidTenantUser : $scope.idTenantKf;
       if ($scope.sessionidProfile==3 || $scope.sessionidProfile==6){
            $scope.isCollapsed = false;$scope.collap=1;
            urlT=serverHost+serverBackend+"Department/byIdTenantYDireccion/"+idAddressTmp+"/"+idTenantTmp+"/"+'-1';
          }else{
            urlT=serverHost+serverBackend+"Department/byIdDireccion/"+idAddressTmp+"/"+'-1';
          }

      $http({
          method : "GET",
          url : urlT
        }).then(function mySuccess(response){
              //console.log(response.data);
              console.log("collap: "+$scope.collap+" / isCollapsed: "+$scope.isCollapsed);
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
                  
              }else if ($scope.sessionidProfile==3 || $scope.sessionidProfile==6){
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
      $http.post(serverHost+serverBackend+"Department/update",$scope._getData2AssignDepto(item1, item2),setHeaderRequest())
            .then(function(success, data) {
                if ($scope.sessionidTypeTenant>0 && fnAction==0){
                    inform.add('Departamento Asignado y pendiente por aprobacion por la administracion.',{
                      ttl:3000, type: 'success'
                    });
                    if($scope.sessionidProfile==3){
                      $scope.getAllAddressByIdTenant();
                      $scope.newDeparment=false;
                      $scope.sysCheckResult = false;
                      //$scope.viewOwnerDeptos(false);
                    }
                }
                if ($scope.sessionidProfile!=3 && fnAction==1){
                    $scope.approveDepto(item1);
                }else if ($scope.sessionidProfile!=3 && fnAction==2){
                    inform.add('Cancelada solicitud satisfactoriamente.',{
                      ttl:3000, type: 'success'
                    });
                }
                if (!$scope.sessionidTypeTenant>0){
                    $scope.listUserDepto(1, $scope.tmp.idAdressKf);
                }
            },function (error, data, status) {
                if(status == 404){alert("!Informacion "+status+data.error+"info");}
                else if(status == 203){alert("!Informacion "+status,data.error+"info");}
                else{alert("Error ! "+status+" Contacte a Soporte");}
               
            }); 
    }
    $scope._getData2AssignDepto = function (item1, item2) {
      var idTenantUsertmp =$scope.sessionidTypeTenant>0 ? $scope.sessionidTenantUser : $scope.idTenantKf
      var idDepartmentKf  = item1;
      var dpto =
              {
                   department: { 
                                idDepartment      : idDepartmentKf,
                                idUserKf          : idTenantUsertmp
                               }
              };
      return dpto;
    };
    /**************************************************/
    /**************************************************
    *                                                 *
    *   CANCEL DEPARTMENT REQUEST TO AN OWNER USER    *
    *                                                 *
    **************************************************/
    $scope.fnUnAssignDepto = function (item1, item2) {
      var fnAction= $scope.sessionidProfile==3 ? 0 : item2;
      console.log($scope.data2CancelDepto(item1));
      $http.post(serverHost+serverBackend+"Department/update",$scope.data2CancelDepto(item1),setHeaderRequest())
            .then(function(success, data) {
                if ($scope.sessionidProfile!=3 && fnAction==2){
                    inform.add('Cancelada solicitud satisfactoriamente.',{
                      ttl:3000, type: 'success'
                    });
                }
                if (!$scope.sessionidTypeTenant>0){
                    $scope.listUserDepto(1, $scope.selectIdAddressKf.selected.idAdress);
                }
            },function (error, data, status) {
                if(status == 404){alert("!Informacion "+status+data.error+"info");}
                else if(status == 203){alert("!Informacion "+status,data.error+"info");}
                else{alert("Error ! "+status+" Contacte a Soporte");}
               
            }); 
    }
    $scope.data2CancelDepto = function (item1) {
      var idDepartmentKf  = item1;
      var dpto =
              {
                   department: { 
                                idDepartment      : idDepartmentKf,
                                idUserKf          : null
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
          url : serverHost+serverBackend+"Department/aprobated/"+idDeptoKf
        }).then(function mySuccess(response) {
          
            if($scope.manageDepto==1 && $scope.collap==1){
              $scope.listUserDepto(1, $scope.tmp.idAdressKf);
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
    *      APPROVE DEPARTMENT TO AN OWNER USER        *
    *                                                 *
    **************************************************/
    $scope.approveOwnerDepto = function (idDepto) {
      userServices.approveOwnerDepto(idDepto).then(function(data) {
                $scope.approveDeptoResult= data;
                if($scope.approveDeptoResult){
                  inform.add('Propietario autorizado satisfactoriamente.',{
                              ttl:5000, type: 'success'
                  });
                  $scope.listUserDepto(1,$scope.selectIdAddressKf.selected.idAdress);
                  $scope.searchTenant('listTenant', idDepto);
                }else{
                  inform.add('Contacte con la administracion del consorcio.',{
                    ttl:6000, type: 'danger'
                  });
                }
              });
     };

    /**************************************************
    *                                                 *
    *     APPROVE DEPARTMENT TO AN TENANT USER        *
    *                                                 *
    **************************************************/
    $scope.approveTenantDepto = function (idUser, idStatus) {
      userServices.approveTenantDepto(idUser, idStatus).then(function(data) {
                $scope.approveDeptoResult= data;
                if($scope.approveDeptoResult){
                  inform.add('Habitante autorizado satisfactoriamente.',{
                              ttl:5000, type: 'success'
                  });
                  $scope.searchTenant('listTenant', $scope.idDeptoKf);
                }else{
                  inform.add('Contacte con la administracion del consorcio.',{
                    ttl:6000, type: 'danger'
                  });
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
          url : serverHost+serverBackend+"Department/desaprobated/"+idDeptoKf
        }).then(function mySuccess(response) {
                if($scope.manageDepto==1){
                  $scope.listUserDepto(1, $scope.selectIdAddressKf.selected.idAdress); 
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
          url : serverHost+serverBackend+"Department/requesLowByProp/"+idDeptoKf+'/'+rsRequest
        }).then(function mySuccess(response) {
            if($scope.manageDepto==1){
              $scope.listUserDepto(1, $scope.selectIdAddressKf.selected.idAdress);
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
    $scope.getDeparment = function (value, idValue){
        if($scope.sessionidProfile==1 && $scope.IsSystem){
            $scope.IsAttendant=$scope.sysReg.idTypeAttKf==2 || $scope.att.idTypeAttKf==2 ? true:false;
            //alert($scope.sysReg.idTypeAttKf);
        }
        console.log("idAdressKf: "+idValue);
       var idAddressTmp=idValue;
       $scope.select.idAddressAtt = idAddressTmp;
       var urlT="";
        $scope.manageDeptoTmp = $scope.manageDepto;
        $scope.manageDepto = value; //Variable usada en la gestion de departamento
          if ($scope.sessionidProfile!=1 && $scope.manageDepto==1){
             urlT=serverHost+serverBackend+"Department/byIdDireccion/"+idAddressTmp+"/"+'0';
          }
          if($scope.sessionidProfile!=3 && $scope.sessionidProfile!=5 && $scope.sessionidProfile!=6 && $scope.manageDepto>=0 || $scope.IsSystem){
            urlT=serverHost+serverBackend+"Department/byIdDireccion/"+idAddressTmp+"/"+'-1';
          }if (($scope.sessionidProfile==3 || $scope.sessionidProfile==5 || $scope.sessionidProfile==6) && $scope.manageDepto==0){
            urlT=serverHost+serverBackend+"Department/byIdTenantYDireccion/"+idAddressTmp+"/"+$scope.sessionidTenantUser+"/"+'1';
          }
          //console.log(urlT);
      $http({
          method : "GET",
          url : urlT
        }).then(function mySuccess(response){
              $scope.dptoNotFound=false;
              $scope.ListDpto = response.data;
              $scope.manageDepto = $scope.manageDeptoTmp;
              console.log("Manage depto: "+$scope.manageDepto)
              //if ($scope.sessionidProfile==3 || $scope.sessionidProfile==6){$scope.isCollapsed=!$scope.isCollapsed};
              //console.log(response.data);
        }, function myError (response){
            $scope.ListDpto ="";
            if (response.status=="404" || response.status=="500"){
              $scope.ListDpto ="";
              if ($scope.sessionidProfile!=0 && $scope.manageDepto>=0 && idAddressTmp){
                $scope.noRecordsFound=true;
                $scope.dptoNotFound=true;
                inform.add('No hay departamentos en esta direccion para ser asignados, Contacte al administrador.',{
                              ttl:5000, type: 'info'
                }); 
              }else if ($scope.sessionidProfile==3 && $scope.manageDepto==1 && !idAddressTmp){
                inform.add('Debe seleccionar una direccion para ver los departamentos asociados..',{
                              ttl:5000, type: 'warning'
                }); 
                $scope.dptoNotFound=true;
               }
              if (!idAddressTmp && $scope.manageDepto==0){
                inform.add('Debe seleccionar una direccion o contacte al administrador.',{
                      ttl:5000, type: 'warning'
                   }); 
               $scope.decrementStep();  
              }
            }
      });
    }
    /**************************************************/
    /**************************************************
    *                                                 *
    *           ALL DEPARTMENT BY  ADDRESS            *
    *                                                 *
    **************************************************/
    $scope.getAllDeparment = function (idValue){

        console.log("idAdressKf: "+idValue);
       var idAddressTmp=idValue;
       urlT=serverHost+serverBackend+"Department/allDepartment/";
         
      $http({
          method : "GET",
          url : urlT
        }).then(function mySuccess(response){
              $scope.deptoList = response.data;
        }, function myError (response){
            $scope.deptoList ="";
            if (response.status=="404" || response.status=="500"){
              $scope.deptoList ="";
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
      var url1=serverHost+serverBackend+"tenant/allByIdDepartament/"+idDepto;
      var url2=serverHost+serverBackend+"Tenant/tenanatByIdDepartament/"+idDepto+"/"+typeTenant;
      var urlT=$scope.sessionidProfile==3 ? url2 : url1;
      console.log(urlT)
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
            url : serverHost+serverBackend+"Department/find/"+$scope.idDeptoKf
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
            if ($scope.sessionidProfile!=0){
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
            $scope.o.email  = $scope.sessionMail;
          break;
          case "mngdepto":
            $scope.companyN = $scope.sessionNameCompany;
          break;
          case "dashboard":
            $scope.companyN = $scope.sessionNameCompany;
          break;
          case "sysParam":
           if($scope.parameterId==1){
                $scope.smtpMail = "";
                $scope.smtpMail= $scope.parameterValue
           }else if($scope.parameterId==2){
                $scope.smtpPwd="";
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
              $scope.salesMail = $scope.parameterValue;
           }else if($scope.parameterId==8){
              $scope.supportMail = $scope.parameterValue;
           }else if($scope.parameterId==9){
              $scope.payrollMail = $scope.parameterValue;
           }else if($scope.parameterId==10){
              $scope.adminMail = $scope.parameterValue;
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
    $scope.checkTicketTenant = function(idTenant){
      var msg1, msg2;
         $http({
            method : "GET",
            url : serverHost+serverBackend+"Ticket/verificateTicketByIdUser/"+idTenant
          }).then(function mySuccess(response) {
              $scope.isHasTicket = true;
              console.log("POSEE TICKETS")

              msg1="Tenes solicitudes pendientes, debes esperar a que finalice o cancelar para darte de baja.";
              msg2="El Habitante presenta solicitudes pendientes, se deben finalizar o cancelar para poder dar de baja.";
              $scope.messageInform = $scope.sessionidProfile!=1 && $scope.sessionidProfile!=4 ? msg1 : msg2;
                 inform.add($scope.messageInform,{
                            ttl:5000, type: 'warning'
                 });

            }, function myError(response) {
                $scope.isHasTicket = true;
                console.log("NO POSEE TICKETS --> SE PROCEDE A SOLICITAR LA CONFIRMACION PARA LA BAJA.");
                $('#confirmRequestModal').modal('toggle');
          });
      }
    /**************************************************/
    $scope.switchTab = function (value) {
      var typeT1 = $('#typeTenant1').is(':checked');
      var typeT2 = $('#typeTenant2').is(':checked');
        /*--------------*/
      var typeO1 = $('#typeOption1').is(':checked');
      var typeO2 = $('#typeOption2').is(':checked');

      if($scope.typeTenant && value==2){
        console.log("typeTenant: "+$scope.typeTenant+" / typeOption: "+$scope.typeOption);
        console.log("typeT1: "+typeT1+" / typeT2: "+typeT2);
        $scope.typeTenant=0;
        if(typeT1!=false || typeT2!=false){
          console.log("cleaning... the department radio button");
          document.getElementById("typeTenant1").checked=false;
          document.getElementById("typeTenant2").checked=false;
        }
      }else if($scope.typeOption && value==1){
        console.log("typeTenant: "+$scope.typeTenant+" / typeOption: "+$scope.typeOption);
        console.log("typeO1: "+typeO1+" / typeO2: "+typeO2);
        $scope.typeOption=0;
        if(typeO1!=false || typeO2!=false){
          console.log("cleaning... the building radio button");
          document.getElementById("typeOption1").checked=false;
          document.getElementById("typeOption2").checked=false;
        }
      }
      if ($scope.IsTicket){
        $scope.formValidated=false; 
        /*--------------------------------*/
        $scope.typeOption              =0;
        $scope.typeTenant              = "";
        $scope.select.idDepartmentKf   = "";
        $scope.tenant.namesTenant      = "";
        $scope.tenant.addressTenant    = "";
        $scope.tenant.movilPhoneTenant = "";
        $scope.tenant.emailTenant      = "";
        $scope.tenant.localPhoneTenant = "";
        $scope.tenantNotFound = false;
      }
      if(value==1){
          $scope.collap=1;
          $scope.listUserDepto(1,$scope.selectIdAddressKf.selected.idAdress);
      }else if(value==2){
          $scope.collap=2;
      }
      console.log("Collap : "+$scope.collap)
      console.log("isCollapsed : "+$scope.isCollapsed)
    };














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
            var isEditUser=0;
            console.log("==========================================");
                $scope.sysLoggedUser.fullNameUser         = $scope.profile.Names;
                $scope.sysLoggedUser.emailUser            = $scope.profile.Email;
                $scope.sysLoggedUser.phoneNumberUser      = $scope.profile.MovilPhoneNumber;
                $scope.sysLoggedUser.phoneLocalNumberUser = $scope.profile.PhonelocalNumber;
                $scope.sysLoggedUser.idProfileKf          = $scope.sessionidProfile;
                $scope.sysLoggedUser.idUser               = $scope.sessionIdUser;
                $scope.sysLoggedUser.isEdit               = 1;
                var user2Update={user:{}};
                user2Update.user=$scope.sysLoggedUser;
            console.log(user2Update)
            console.log("==========================================");
            $scope.modificarUsuario($http, $scope, isEditUser, user2Update);
            setTimeout(function() {
              tokenSystem.destroyTokenStorage(5);
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
          var isEditUser=1;
            console.log("==========================================");
              var pwd2Update={user:{}};
                $scope.sysLoggedUser.isEditUser   =1;
                $scope.sysLoggedUser.passwordUser =$scope.chg.newPwd2;
                pwd2Update.user=$scope.sysLoggedUser;
                console.log(pwd2Update);
            console.log("==========================================");
            $scope.modificarUsuario($http, $scope, isEditUser, pwd2Update);
            
        break;
        default:
      }
    }

  /**************************************************
  *                                                 *
  *               REGISTRO DE USUARIO               *
  *                                                 *
  **************************************************/
  $scope.sysRegisterFn = function(){
    console.clear();
    $scope.tmp.idDepartmentKf=$scope.sysReg.idDepartmentKf;
    console.log($scope.userData2Add());
      userServices.addUser($scope.userData2Add()).then(function(data){
      $scope.addUserResult = data;
        if($scope.addUserResult){
          console.log("REGISTERED SUCCESSFULLY");
          userServices.checkUserMail($scope.sysReg.email, "").then(function(data) {
                $scope.mailCheckResult= data;
                if($scope.mailCheckResult){
                    $scope.sysRegisteredUser = tokenSystem.getTokenStorage(3);
                  if(($scope.sysReg.idProfileKf==3 || $scope.sysReg.idProfileKf==6) && $scope.tmp.idDepartmentKf) {
                    var dpto =
                              {
                                   department: { 
                                                idDepartment      : $scope.tmp.idDepartmentKf,
                                                idUserKf          : $scope.sysRegisteredUser.idUser
                                               }
                              }; 
                    userServices.assignDepto(dpto).then(function(data) {
                      $scope.assignDeptoResult= data;
                      if($scope.assignDeptoResult){
                        userServices.approveDepto($scope.tmp.idDepartmentKf).then(function(data){
                          $scope.approvedResult = data;
                            if($scope.approvedResult){                  
                              
                            }
                        });
                      }
                    });
                  }else if($scope.sysReg.idProfileKf==5 && $scope.tmp.idDepartmentKf){
                    userServices.approveTenantDepto($scope.sysRegisteredUser.idUser,1).then(function(data) {
                      $scope.approveDeptoResult= data;
                      if($scope.approveDeptoResult){
                      }
                    });   


                  }
                }
          });
          
        }else{
          $('#RegisterModalUser').modal('hide');
          inform.add('Ocurrio un error en la creacion del usuario. Contacte al area de soporte',{
                        ttl:3000, type: 'success'
          });
        }
        inform.add('Usuario creado satisfactoriamente.',{
            ttl:3000, type: 'success'
        });
        tokenSystem.destroyTokenStorage(4);
        $('#RegisterModalUser').modal('hide');
        $scope.refresRowsInList();
      });
 
  }
  $scope.userData2Add = function () {
    $scope.sysReg.idAddressKf = $scope.sysReg.idProfileKf!=1 && $scope.sysReg.idProfileKf!=2 && $scope.sysReg.idProfileKf!=4 || $scope.sysReg.idProfileKf==6 && $scope.sysReg.idTypeAttKf!=1 ? $scope.sysRegIdAddressKf.selected.idAdress : null;
    $scope.sysReg.idCompanyKf = $scope.sysReg.idProfileKf==2 || $scope.sysReg.idProfileKf==4 || $scope.sysReg.idProfileKf==6 ? $scope.sysRegidCompanyKf.selected.idCompany : null;
    if($scope.sysReg.idProfileKf==3){
      $scope.sysReg.idTypeTenantKf ="1";
      $scope.sysReg.idDepartmentKf=null;
    }else if ($scope.sysReg.idProfileKf==5){
      $scope.sysReg.idTypeTenantKf ="2";
      $scope.sysReg.isDepartmentApproved = 0;
    }else if($scope.sysReg.idProfileKf==6){
        if($scope.sysReg.idTypeAttKf!=1 && $scope.att.ownerOption==1){
          $scope.sysReg.idTypeTenantKf=1;
          $scope.sysReg.isRequireAuthentication=1;
          $scope.sysReg.idDepartmentKf=null;
        }else{
          $scope.sysReg.idTypeTenantKf=2;
          $scope.sysReg.isRequireAuthentication=1;
          $scope.sysReg.isDepartmentApproved = 0;
        };
    }else{
      $scope.sysReg.idTypeTenantKf=null;
      $scope.sysReg.isRequireAuthentication=0;
      $scope.sysReg.idDepartmentKf=null;
      $scope.sysReg.isDepartmentApproved = null;
    }
    if ($scope.sessionidProfile==1 || $scope.sessionidProfile==4){$scope.isCreateByAdmin=1;}
    if(($scope.sysReg.idProfileKf==3 || $scope.sysReg.idProfileKf==5)  && $scope.sysRegIdAddressKf.selected.idAdress){
      $scope.sysReg.idCompanyKf = $scope.getCompanyFromAddress($scope.sysRegIdAddressKf.selected.idAdress);
    }
    var user =
          {
            user:{
                        fullNameUser            : $scope.sysReg.fname+' '+$scope.sysReg.lname,
                        emailUser               : $scope.sysReg.email,
                        phoneNumberUser         : $scope.sysReg.phoneMovilNumberUser,
                        phoneLocalNumberUser    : $scope.sysReg.phonelocalNumberUser,
                        passwordUser            : $scope.sysReg.password2,
                        idProfileKf             : $scope.sysReg.idProfileKf,
                        idCompanyKf             : $scope.sysReg.idCompanyKf,

                        idAddresKf              : $scope.sysReg.idAddressKf,
                        idTyepeAttendantKf      : $scope.sysReg.idTypeAttKf,
                        idTypeTenantKf          : $scope.sysReg.idTypeTenantKf,
                        descOther               : $scope.sysReg.typeOtherAtt,
                        idDepartmentKf          : $scope.sysReg.idDepartmentKf,
                        isEdit                  : 1,
                        isDepartmentApproved    : $scope.sysReg.isDepartmentApproved,
                        isCreateByAdmin         : $scope.isCreateByAdmin,
                        requireAuthentication   : $scope.sysReg.isRequireAuthentication
                  }
          };
    return user;
  };
  /**************************************************/

  /**************************************************
  *                                                 *
  *               ACTUALIZAR USUARIO                *
  *                                                 *
  **************************************************/
  $scope.sysUpdateFn = function(){
    console.clear();
    $scope.tmp.idDepartmentKf=$scope.sysUpdate.idDepartmentKf;
    console.log($scope.userData2Update());
      userServices.updateUser($scope.userData2Update()).then(function(data){
       $scope.updateUserResult = data;
        if($scope.updateUserResult){
          console.log("UPDATED SUCCESSFULLY");
          tokenSystem.destroyTokenStorage(4);
          userServices.checkUserMail($scope.sysUpdate.email, "").then(function(data) {
                $scope.mailCheckResult= data;
                if($scope.mailCheckResult){
                    $scope.sysRegisteredUser = tokenSystem.getTokenStorage(3);
                  if(($scope.sysUpdate.idProfileKf==3 || $scope.sysUpdate.idProfileKf==6) && $scope.tmp.idDepartmentKf) {
                    var dpto =
                              {
                                   department: { 
                                                idDepartment      : $scope.tmp.idDepartmentKf,
                                                idUserKf          : $scope.sysRegisteredUser.idUser
                                               }
                              }; 
                    userServices.assignDepto(dpto).then(function(data) {
                      $scope.assignDeptoResult= data;
                      if($scope.assignDeptoResult){
                        userServices.approveDepto($scope.tmp.idDepartmentKf).then(function(data){
                          $scope.approvedResult = data;
                            if($scope.approvedResult){                  
                              
                            }
                        });
                      }
                    });
                  }else if(($scope.sysUpdate.idProfileKf==5 || ($scope.sysUpdate.idProfileKf==6 && $scope.sysUpdate.idTypeTenantKf==2)) && $scope.tmp.idDepartmentKf){
                    userServices.approveTenantDepto($scope.sysRegisteredUser.idUser,1).then(function(data) {
                      $scope.approveDeptoResult= data;
                      if($scope.approveDeptoResult){
                      }
                    });   
                  }
                }
          });
        }else{
          $('#UpdateModalUser').modal('hide');
          inform.add('Ocurrio un error en la actualizacion de datos del usuario. Contacte al area de soporte',{
                        ttl:3000, type: 'success'
          });
        }
        inform.add('Datos actualizado satisfactoriamente.',{
            ttl:3000, type: 'success'
        });
        tokenSystem.destroyTokenStorage(4);
        $('#UpdateModalUser').modal('hide');
        $scope.CallFilterFormT();
      });
 
  }
  $scope.userData2Update = function () {
    $scope.sysUpdate.idProfileKf = $scope.tmp.idProfileKf;
    $scope.sysUpdate.idAddressKf = $scope.sysUpdate.idProfileKf!=1 && $scope.sysUpdate.idProfileKf!=2 && $scope.sysUpdate.idProfileKf!=4 || $scope.sysUpdate.idProfileKf==6 && $scope.sysUpdate.idTypeAttKf!=1 ? $scope.sysUpdateIdAddressKf.selected.idAdress : null;
    $scope.sysUpdate.idCompanyKf = $scope.sysUpdate.idProfileKf==2 || $scope.sysUpdate.idProfileKf==4 || $scope.sysUpdate.idProfileKf==6 ? $scope.sysUpdateidCompanyKf.selected.idCompany : null;
    if($scope.sysUpdate.idProfileKf==3){
      $scope.sysUpdate.idTypeTenantKf ="1";
      $scope.sysUpdate.idDepartmentKf=null;
    }else if ($scope.sysUpdate.idProfileKf==5){
      $scope.sysUpdate.idTypeTenantKf ="2";
      $scope.sysUpdate.isDepartmentApproved = "1";
    }else if($scope.sysUpdate.idProfileKf==6){
        if($scope.sysUpdate.idTypeAttKf!=1 && $scope.att.ownerOption==1){
          $scope.sysUpdate.idTypeTenantKf=1;
          $scope.sysUpdate.isRequireAuthentication=1;
        }else{
          $scope.sysUpdate.idTypeTenantKf=2;
          $scope.sysUpdate.isRequireAuthentication=1;
        }
    }else{
      $scope.sysUpdate.idTypeTenantKf=null;
      $scope.sysUpdate.isRequireAuthentication=0;
      $scope.sysUpdate.idDepartmentKf=null;
      $scope.sysUpdate.isDepartmentApproved = null;
    }
    if ($scope.sessionidProfile==1 || $scope.sessionidProfile==4){$scope.isCreateByAdmin=1;}
    if(($scope.sysUpdate.idProfileKf==3 || $scope.sysUpdate.idProfileKf==5)  && $scope.sysUpdateIdAddressKf.selected.idAdress){
      $scope.sysUpdate.idCompanyKf = $scope.getCompanyFromAddress($scope.sysUpdateIdAddressKf.selected.idAdress);
    }
    var user =
          {
            user:{
                        idUser                  : $scope.sysUpdate.idUser,
                        fullNameUser            : $scope.sysUpdate.names,
                        emailUser               : $scope.sysUpdate.email,
                        phoneNumberUser         : $scope.sysUpdate.phoneMovilNumberUser,
                        phoneLocalNumberUser    : $scope.sysUpdate.phonelocalNumberUser,
                        passwordUser            : $scope.sysUpdate.passwordUser,
                        idProfileKf             : $scope.sysUpdate.idProfileKf,
                        idCompanyKf             : $scope.sysUpdate.idCompanyKf,
                        /*-----------------------------------------*/
                        idAddresKf              : $scope.sysUpdate.idAddressKf,
                        idTyepeAttendantKf      : $scope.sysUpdate.idTypeAttKf,
                        idTypeTenantKf          : $scope.sysUpdate.idTypeTenantKf,
                        descOther               : $scope.sysUpdate.typeOtherAtt,
                        idDepartmentKf          : $scope.sysUpdate.idDepartmentKf,
                        isEdit                  : 1,
                        isDepartmentApproved    : $scope.sysUpdate.isDepartmentApproved,
                        requireAuthentication   : $scope.sysUpdate.requireAuthentication
                  }
          };
    return user;
  };
  /**************************************************/
  $scope.getAdressSelected = function(idAddress){
    /* Recorrer el Json para obtener datos */
    var length = $scope.ListAddress.length;
    var rsJSON = {address: {}};
      for (i = 0; i < length; i++) {
          if($scope.ListAddress[i].idAdress == idAddress){
              rsJSON.address = $scope.ListAddress[i];
              //console.log(rsJSON);
              break;
          }
      }; 
      return rsJSON;
  }
  $scope.getCompanyFromAddress = function(idAddress){
      var rsJSONAddress = $scope.getAdressSelected(idAddress);
      /* Recorrer el Json para obtener datos */
      var companyKf = "";
      var length = $scope.listCompany.length;
      for (i = 0; i < length; i++) {
          if($scope.listCompany[i].idCompany == rsJSONAddress.address.idCompanyKf){
              
              companyKf = $scope.listCompany[i].idCompany;
              //console.log($scope.listCompany[i]);
              break;
          }
      }; 
      return companyKf;
  }

  /**************************************************/

  /**************************************************
  *                                                 *
  *               MODIFICAR USUARIO                 *
  *                                                 *
  **************************************************/
    $scope.modificarUsuario = function ($http, $scope, itemOp, rsJSON){
      $scope.isPwdCh=itemOp;
      //console.log($scope._getData2Update($scope.isPwdCh));
      $http.post(serverHost+serverBackend+"User/update", rsJSON)
          .then(function (sucess, data) {
             if ($scope.isPwdCh==0){
              inform.add($scope.sessionNames +' Sus datos han sido actualizado.',{
                        ttl:3000, type: 'success'
              });
             }else if ($scope.isPwdCh==1){
                var names = $scope.sysToken ? $scope.sessionNames : $scope.tmp.fullNameUser;
                inform.add(names +' Su clave ha sido cambiada satisfactoriamente.',{
                        ttl:3000, type: 'success'
                });
                $('#PasswdModalUser').modal('hide');
              }else if ($scope.isPwdCh==2){
                inform.add(' Su clave ha sido cambiada satisfactoriamente.',{
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


        },function (response, error,status) {
                if(response.status == 404){
                  inform.add('Mensaje [' +response.status+ ']:'+response.data.error,{
                        ttl:3000, type: 'danger'
                  }); 
                  console.log(response);
                }
                else if(status == 500){
                  inform.add('Mensaje [' +response.status+ ']:'+response.data.error,{
                        ttl:3000, type: 'danger'
                  }); 
                  console.log(response);
                }
                else{
                  inform.add('Mensaje [' +response.status+ ']: Ponete en contacto con el area de soporte',{
                        ttl:3000, type: 'danger'
                  }); 
                  console.log(response);
                }
               
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
                                    isEdit               : 1
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
          url : serverHost+serverBackend+"User/inactive/"+itemId
        }).then(function mySuccess(response) {
            if($scope.IsSystem){
              $scope.refresRowsInList();
            }else if($scope.manageDepto==1){
              $scope.getAllAttendant($scope.selectIdAddressKf.selected.idAdress);
            }

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
          url : serverHost+serverBackend+"User/active/"+itemId
        }).then(function mySuccess(response) {
            if($scope.IsSystem){
              $scope.refresRowsInList();
            }else if($scope.manageDepto==1){
              $scope.getAllAttendant($scope.selectIdAddressKf.selected.idAdress);
            }
          }, function myError(response) {
        });
    };
    /**************************************************
    *                                                 *
    *                 UPDATE AN USER                  *
    *                                                 *
    **************************************************/
     $scope.sysUpdate = {};
     $scope.sysUpdateTmp = {};
     $scope.sysUpdateidCompanyKf= {};
     $scope.sysUpdateIdAddressKf = {};
     $scope.profileHasChange=false;
     $scope.tmp = {};
    $scope.selectUserDataFn = function (obj) {
      var obj2=obj;
       $scope.profileHasChange=false;
       $scope.att.ownerOption=null;
       $scope.tmp = {};
      $scope.tmp.idProfileKf                  = obj.idProfileKf;
      console.log("[selectUserDataFn]");
      console.log("|--->idUser              : "+ obj.idUser);
      console.log("|--->idProfile           : "+ $scope.tmp.idProfileKf);
      console.log("|--->idAdress            : "+ obj.idAddresKf);
      console.log("|--->idCompany           : "+ obj.idCompany);
      console.log("|--->phoneLocalNumberUser: "+ obj.phoneLocalNumberUser);
      console.log("|--->phoneMovilNumberUser: "+ obj.phoneNumberUser);
      console.log(obj);
      var informMsg = 'Usuario Perfil '+obj.nameProfile;
      $scope.sysUpdate                               = {};
      $scope.sysUpdateTmp                            = {};
      $scope.sysUpdateTmp                            = obj2;
      $scope.sysUpdateidCompanyKf.selected           = undefined;
      $scope.sysUpdateIdAddressKf.selected           = undefined;
    
      /*--------------------------------------------------------------*/
        $scope.sysUpdate = obj;
        $scope.tmp.idProfileKf                  = obj.idProfileKf;
        if(!obj.idCompanyKf && !obj.idCompany){
          inform.add('Debe seleccionar y asignar una empresa/administracion para el usuario '+obj.fullNameUser,{
              ttl:5000, type: 'info'
          });
        }else{
          var idCompanyTmp = !obj.idCompanyKf?obj.idCompany:obj.idCompanyKf;
          $scope.sysUpdateidCompanyKf.selected   = {idCompany: idCompanyTmp, nameCompany: obj.nameCompany, mail_admin: obj.mail_admin};
        }
        
        if(obj.idProfileKf==6 && idCompanyTmp){$scope.officeListByCompnayID($scope.sysUpdateidCompanyKf.selected.idCompany)}
        $scope.sysUpdate.idTypeAttKf           = obj.idTyepeAttendantKf;
        $scope.sysUpdateIdAddressKf.selected   = {idAdress: obj.idAddresKf, nameAdress: obj.nameAdress};
        $scope.sysUpdate.idDepartmentKf        = obj.idDepartmentKf;
        $scope.sysUpdate.typeOtherAtt          = obj.descOther;
        $scope.sysUpdate.names                 = obj.fullNameUser;
        $scope.sysUpdate.email                 = obj.emailUser;
        $scope.sysUpdate.emailTmp              = obj.emailUser;
        $scope.sysUpdate.phonelocalNumberUser  = obj.phoneLocalNumberUser;
        $scope.sysUpdate.phoneMovilNumberUser  = obj.phoneNumberUser;
        if(obj.idProfileKf==6 && obj.idTyepeAttendantKf!=1 && obj.idTypeTenantKf==1){$scope.att.ownerOption=1;}
        else if(obj.idProfileKf==6 && obj.idTyepeAttendantKf!=1 && obj.idTypeTenantKf==2){$scope.att.ownerOption=2;}
        if(obj.idProfileKf==6 && obj.idTyepeAttendantKf!=0 && !obj.idTypeTenantKf){$scope.att.ownerOption=3;}
        if(obj.idProfileKf!=2 && obj.idProfileKf!=4){$scope.getDeparment(0,$scope.sysUpdateIdAddressKf.selected.idAdress);}
        
        $('#UpdateModalUser').modal('toggle');
      //$('#EditModalUser').modal('toggle');
    };
    /**************************************************************************************/
    $scope.resultSuccess = false;
    $scope.sysCheckProfile = function(idProfile){
        $scope.profileHasChange=false;
        var info2Show ={};
        console.log("[sysCheckProfile]-->idProfile: "+idProfile);
        console.log("[sysCheckProfile]-->sysUpdateTmp.idProfileK: "+$scope.sysUpdateTmp.idProfileKf);
        console.log("[sysCheckProfile]-->sysUpdateTmp.idTypeTenantKf: "+$scope.sysUpdateTmp.idTypeTenantKf);

        if($scope.sysUpdateTmp.idProfileKf!=idProfile || $scope.sysUpdateTmp.idProfileKf==6 && $scope.att.ownerOption<=3){
          if ($scope.sysUpdateTmp.idProfileKf==6 || $scope.sysUpdateTmp.idProfileKf==3 || $scope.sysUpdateTmp.idProfileKf==5 ){
              info2Show = $scope.sysGetAddressAndDepto($scope.sysUpdateTmp);
          }else{
              //alert("entro al else");
              info2Show = false;
          }
            if(info2Show){
                var msg="";
                $scope.resultSuccess = true;
                msg=$scope.sysUpdateTmp.idTypeTenantKf==1?'propietario':'Habitante';
                inform.add('Disculpe, el usuario '+$scope.sysUpdateTmp.fullNameUser+' es '+msg+' del departamento:'+info2Show.deptoFloor+' en la direccion: '+info2Show.AddressName,{
                          ttl:5000, type: 'warning'
                });
                inform.add('Para cambiar el perfil del usuario tenes que dar de baja el departamento que tiene asignado.',{
                          ttl:5000, type: 'info'
                });
              
                $scope.tmp.idProfileKf=$scope.sysUpdateTmp.idProfileKf;
                console.log("[sysCheckProfile]-->tmp.idProfileKf: "+$scope.tmp.idProfileKf);
                if($scope.sysUpdateTmp.idProfileKf==idProfile && $scope.sysUpdate.idTypeTenantKf==1){
                  $scope.profileHasChange=false;
                  $scope.att.ownerOption=1;
                }else{
                   $scope.profileHasChange=false;
                  $scope.att.ownerOption=2;
                }
            }else if((!info2Show && $scope.sysUpdateTmp.idProfileKf != idProfile && !$scope.att.ownerOption) || (!info2Show && $scope.sysUpdateTmp.idProfileKf != idProfile && $scope.sysUpdate.idTypeTenantKf==$scope.att.ownerOption)){
              //alert("1")
              inform.add('Cambiando perfil del usuario.',{
                        ttl:5000, type: 'info'
              });
              $scope.profileHasChange=true;
              $scope.resultSuccess = false;
            }else if(!info2Show && $scope.sysUpdateTmp.idProfileKf == idProfile && $scope.att.ownerOption){
              //alert("2")
              inform.add('Cambiando el tipo de habitante.',{
                        ttl:5000, type: 'info'
              });
              $scope.profileHasChange=true;
              $scope.resultSuccess = false;
            }
        }
    }
    $scope.rsArrResult = {deptoFloor:'', AddressName:''};
    $scope.sysGetAddressAndDepto = function(objArr){
      console.log("[sysGetAddressAndDepto]-->case: "+objArr.idProfileKf);
        switch(objArr.idProfileKf){
          case "3":
              return $scope.fnGetADFromOwner(objArr);
          break;
          case "5":

            return $scope.fnGetADFromTenant(objArr);;

          break;
          case "6":
              console.log("[sysGetAddressAndDepto]-->ownerOption: "+$scope.att.ownerOption);
              console.log("[sysGetAddressAndDepto]-->idTypeTenantKf: "+objArr.idTypeTenantKf);

              if($scope.att.ownerOption && objArr.idTypeTenantKf==1){
                //alert("1");
                return $scope.fnGetADFromOwner(objArr);
              }else if($scope.att.ownerOption && objArr.idTypeTenantKf==2){
                //alert("2");
                return $scope.fnGetADFromTenant(objArr);
              }else{
                //alert("3");
                return false;
              }
          break;

          default:
        }
    }
    /**************************************************************************************/
    $scope.fnGetADFromOwner = function(rsArr){
      console.log("[fnGetADFromOwner]");
      console.log(rsArr);
      var length1 = 0;
      var length2 = 0;
      $scope.getAllDeparment(rsArr.idAddresKf);
      $scope.getAllAddress();
        length1 = $scope.deptoList.length;
        length2 = $scope.ListAddress.length;
      var idAddress = 0;
      var vSuccess=false;
        for (i = 0; i < length1; i++) {
          if($scope.deptoList[i].idUserKf==rsArr.idUser){
              $scope.rsArrResult.deptoFloor=$scope.deptoList[i].departmentFloor;
              idAddress = $scope.deptoList[i].idAdressKf;
              vSuccess=true;
              break;
          }else{
              vSuccess=false;
          }
        };
        if(idAddress && vSuccess){
          for (i = 0; i < length2; i++) {
            if($scope.ListAddress[i].idAdress==idAddress){
                $scope.rsArrResult.AddressName=$scope.ListAddress[i].nameAdress;

                break;
            }
          }; 
        }
        var rsDataReturn = !vSuccess?false:$scope.rsArrResult;
        console.log(rsDataReturn);
        return rsDataReturn;
    }
    /*************************************************/
    $scope.fnGetADFromTenant = function(rsArr){
      var length1 = 0;
      $scope.getAllAddress();
      length1 = $scope.ListAddress.length;
      var vSuccess=false;
      for (i = 0; i < length1; i++) {
        if($scope.ListAddress[i].idAdress==rsArr.idAddresKf){
            $scope.rsArrResult.AddressName=$scope.ListAddress[i].nameAdress;
            vSuccess=true;
            break;
        }else{
            vSuccess=false;
        }
      }; 
      if(vSuccess){$scope.rsArrResult.deptoFloor = $scope.getDeptoName(rsArr.idDepartmentKf);}
      var rsDataReturn = !vSuccess?false:$scope.rsArrResult;
      console.log(rsDataReturn);
      return rsDataReturn;
    }
    /**************************************************
    *                                                 *
    *           COMPANY USER BY ID COMPANY            *
    *                                                 *
    **************************************************/
    $scope.listUserCompany = [];
    $scope.companyUserByIdCompany = function (objIdCompany) {
      if(objIdCompany){
        var idCompany = objIdCompany;
        console.log("[companyUserByIdCompany]-->objIdCompany: "+objIdCompany);
          /* Recorrer el Json User para obtener datos*/
          var length = $scope.listUser.length;
          for (i = 0; i < length; i++) {
              if(($scope.listUser[i].idCompanyKf == idCompany && $scope.listUser[i].idProfileKf==2) || ($scope.listUser[i].idCompany == idCompany && $scope.listUser[i].idProfile==2)){
                  $scope.listUserCompany[i]=$scope.listUser[i];
              }
          }; 
          console.log($scope.listUserCompany);
      }else{
          console.log("No idCompany Recibido");
      }
    };
    /**************************************************
    *                                                 *
    *                 DELETE AN USER                  *
    *                                                 *
    **************************************************/
    $scope.deleteUser = function (itemId) {
      $http({
          method : "delete",
          url : serverHost+serverBackend+"User/delete/"+itemId
        }).then(function mySuccess(response) {
            $scope.refresRowsInList();
          }, function myError(response) {
        });
    };
    /**************************************************
    *            HIDE PROFILES FUNCTION               *
    *         USED IN THE USER REGISTER FORM          *
    **************************************************/
    $scope.filterProfileUser = function(item){
      //alert($scope.select.idCompanyKf);
      //console.log(item);
      return item.idProfile == 3 ||  item.idProfile == 5;
    };
    /**************************************************/ 
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
      $http.post(serverHost+serverBackend+"User/updatePass", $scope.requestNewPwd(),setHeaderRequest())
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
                  tokenSystem.setLoggedUserStorage($scope.listUser[i]);
                  
                  /*------------------------------------------------------------------------*/
                  break;
                  }
              };
              $scope.sysLoggedUser = tokenSystem.getTokenStorage(2);
              $scope.sysLoadLStorage();
              BindDataToForm('userProfile');
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
        $scope.user.idCompanyKf         = !obj.idCompanyKf?obj.idCompany : obj.idCompanyKf;

        console.log(obj);
      }
    /**************************************************/
    


    $scope.companyAddress = {};
    $scope.sysCompany     = {};
    $scope.selectCompanyDataFn = function (obj) {
      $scope.sysCompany     = {};
      $scope.companyAddress = "";
      console.log("[selectCompanyDataFn]");
      console.log("|--->idCompany           : "+ obj.idCompany);
      console.log("|--->nameCompany         : "+ obj.nameCompany);
      console.log("|--->mail_services       : "+ obj.mail_services);
      console.log("|--->mail_request        : "+ obj.mail_request);
      console.log("|--->mail_admin          : "+ obj.mail_admin);
      /*--------------------------------------------------------------*/
        $scope.sysCompany                       = obj;
        $scope.sysCompany.nameCompany           = obj.nameCompany;
        $scope.sysCompany.emailService          = obj.mail_services;
        $scope.sysCompany.emailRequest          = obj.mail_request;
        $scope.sysCompany.emailAdmin            = obj.mail_admin;
        //$scope.sysCompany.phonelocal            = obj.phoneLocalNumberUser;
        userServices.officeList(obj.idCompany).then(function(response) {
          $scope.companyAddress = response;
        });
        setTimeout(function() {
          console.log($scope.companyAddress);
        }, 500);
        setTimeout(function() {
          $('#UpdateModalCompany').modal('toggle');
        }, 300);
        
      //$('#EditModalUser').modal('toggle');
    };

    $scope.sysUpdateCompanyFn = function(){
      console.log("[sysUpdateCompanyFn]");
      userServices.updateCompany($scope.companyData2Update()).then(function(data) {
        $scope.companyUpdatedResult= data;
        if($scope.companyUpdatedResult){
          inform.add('Datos de la empresa '+$scope.sysCompany.nameCompany+' actualizados satisfactoriamente.',{
              ttl:3000, type: 'success'
          });
          $scope.CallFilterFormU();
          $('#UpdateModalCompany').modal('hide');
        }
      });  

    }
    $scope.companyData2Update = function(){
      var company =
          {
            company:{
                        idCompany               : $scope.sysCompany.idCompany,
                        nameCompany             : $scope.sysCompany.nameCompany,
                        mail_services           : $scope.sysCompany.emailService,
                        mail_request            : $scope.sysCompany.emailRequest,
                        mail_admin              : $scope.sysCompany.emailAdmin,
                        isEdit                  : 1
                  }
          };
      return company;
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
    $scope.sysFunctionsTenant = function(value, fnAction, idDepto){ //Funciones add, search, update, active, inactive Tenants
      var fnActionTenant= fnAction;
        switch (value) {
          case "open": //Opcion Utilizada para registrar un inquilino de cualquier tipo. 
            
            $scope.IsTenant                 =true;
            $scope.idDeptoKf                = idDepto ? idDepto: $scope.select.idDepartmentKf;
            console.log("[sysFunctionsTenant]->Departamento ID: "+$scope.idDeptoKf);
            $scope.IsAttendant              =false;
            mail2Search                     = "";
            $scope.ownerFound               =false;
            $scope.emailFound               =false,
            $scope.tmp.idTypeAttTmp         = "";
            $scope.att.idTypeAttKf          = "";
            $scope.idTypeTenantKf           = "";
            $scope.tenant.typeTenant        = "";
            $scope.emailT                   = "";
            $scope.phoneMovilT              = "";
            $scope.phonelocalT              = "";
            $scope.fullNameTenant           = "";
            $scope.idTypeTenantKf           = $scope.sessionidProfile==3?2:$scope.idTypeTenantKf;
            $scope.tenant= {namesTenant:'',localPhoneTenant: '',movilPhoneTenant: '',emailTenant: '', typeTenant: ''};
            $('#RegisterModalTenant').modal('toggle');
            $('#ModalListTenant').modal('hide');
          break;

          /*------------------------------------------------------------------------------*/
          case "search": //Buscamos en la tabla tb_tenant por el parametro email.
           /*ASIGNAMOS LOS DATOS DEL FORM TENANT A LAS VARIABLES GENERALES*/
            if ($scope.sysToken && $scope.IsTenant && $scope.manageDepto>=0 && fnActionTenant=="add"){
              $scope.t.fullNameTenant           = $scope.fullNameTenant;
              $scope.t.idTypeKf                 = !$scope.idTypeTenantKf ? $scope.typeTenant : $scope.idTypeTenantKf;
              $scope.t.phoneNumberTenant        = $scope.phoneMovilT;
              $scope.t.phoneNumberContactTenant = $scope.phonelocalT;
              $scope.t.emailTenant              = $scope.emailT;
              console.log($scope.t); 
            }else if ($scope.IsTenant && $scope.manageDepto>=0 && fnActionTenant=="edit"){                                              
              $scope.t.idTenant                 = $scope.idTenantKf;
              $scope.t.fullNameTenant           = $scope.tenant.namesTenant;
              $scope.t.idTypeKf                 = !$scope.typeTenant ? $scope.tenant.typeTenant : $scope.typeTenant;
              $scope.t.phoneNumberTenant        = $scope.tenant.movilPhoneTenant;
              $scope.t.phoneNumberContactTenant = $scope.tenant.localPhoneTenant;
              $scope.t.idDepartmentKf           = $scope.tenant.typeTenant==1 ? null : idDepto;
              $scope.t.emailTenant              = $scope.tenant.emailTenant;                            
            }
              console.log("[sysFunctionsTenant]--> search -->"+fnActionTenant);
              console.log("IMPRIMIMOS EL ARREGLO SEGUN LA DATA OBTENIDA");
              
            mail2Search=$scope.t.emailTenant;
            $scope.tSearch=true;
            $scope.searchTenantByMail(mail2Search);
          break;
          /*------------------------------------------------------------------------------*/
          case "edit":
            if (fnActionTenant=="ticket"){
              $scope.t.idDepartmentKf           = $scope.idDepto;
              $scope.t.idTenant                 = $scope.idTenantKf;
              $scope.t.fullNameTenant           = $scope.tenant.namesTenant;
              $scope.t.phoneNumberContactTenant = $scope.tenant.localPhoneTenant;
              $scope.t.phoneNumberTenant        = $scope.tenant.movilPhoneTenant;
              $scope.t.emailTenant              = $scope.tenant.emailTenant;
              $scope.t.idAddressKf              = $scope.select.idAddressAtt;
            }
              console.log(getData2UpdateTenant());
              console.log("[sysFunctionsTenant]-->"+fnActionTenant);
              console.log("IMPRIMIMOS EL ARREGLO SEGUN LA DATA OBTENIDA");
              console.log($scope.t); 
              $scope.editTenant($http, $scope);
          break;
          case "update": //Opcion Usada para actualizados datos de un inquilino de tipo propietario o un inqulino normal.
            if($scope.rsTenantData){
                if ($scope.sysToken){
                  $scope.t.idTenant  = "";
                  $scope.t.idTenant  = !$scope.rsTenantData.idUser ? $scope.idTenantKf : $scope.rsTenantData.idUser;
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
                  if($scope.t.idTypeKf==1){
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
          /*---------------------------------------------------------08004440087 MultiAsistencia--Marisol Rodriguez------------------*/
          default:
        };  
    }
    /**************************************************
    *                                                 *
    *         BUSCAR INQUILINO POR EL EMAIL           *
    *                                                 *
    **************************************************/

    $scope.searchTenantByMail = function (mailString){
      mail2Search = mailString ? mailString : mail2Search;
      $http({
            method : "GET",
            url : serverHost+serverBackend+"Tenant/findByEmail/"+mail2Search
          }).then(function mySuccess(response) {
                $scope.rsTenantData = response.data;
                console.log("<<<INQUILINO ENCONTRADO>>>");
                console.log("===> RESULTADO DE LA BUSQUEDA DEL INQUILINO ");
                console.log(response.data);
                /*VALIDACIONES SI LA PETICION NO ES DE BUSQUEDA*/
                if($scope.tSearch==false){
                  if($scope.manageDepto>=0){
                    $scope.idTenantKf              =  $scope.rsTenantData.idUser;
                    $scope.t.idTypeKf              =  $scope.rsTenantData.idTypeTenantKf;
                    $scope.tmp.idAdressKf          =  $scope.rsTenantData.idAddresKf;
                      if($scope.IsTicket==true){
                        console.log("<<<PROCESO DE GESTION DE TICKET>>>")
                        if($scope.IsTenant==true){
                          console.log("<<<CARGAMOS LOS DATOS SELECCIONADOS DEL TENANT AL FORMULARIO DEL ALTA/BAJA>>>");
                          $scope.tenant.namesTenant      =  $scope.rsTenantData.fullNameUser;
                          $scope.tenant.localPhoneTenant =  $scope.rsTenantData.phoneLocalNumberUser;
                          $scope.tenant.movilPhoneTenant =  $scope.rsTenantData.phoneNumberUser;
                          $scope.tenant.emailTenant      =  $scope.rsTenantData.emailUser;
                          $scope.enabledNextBtn();
                        }else if($scope.IsTenant==true && ($scope.deptoFloor=="Porteria" || $scope.deptoFloor=="porteria")){
                          $scope.tenant.namesTenant      =  $scope.rsTenantData.fullNameUser;
                          $scope.tenant.localPhoneTenant =  $scope.rsTenantData.phoneLocalNumberUser;
                          $scope.tenant.movilPhoneTenant =  $scope.rsTenantData.phoneNumberUser;
                          $scope.tenant.emailTenant      =  $scope.rsTenantData.emailUser;
                          $scope.enabledNextBtn();
                        }
                      }
                      if ($scope.manageDepto==0){$scope.tmp.idDeparmentKf=!$scope.IsAttendant ? $scope.select.idDepartmentKf : $scope.att.idDepartmentKf;}else
                    {$scope.tmp.idDeparmentKf=!$scope.IsAttendant ? $scope.idDeptoKf : $scope.att.idDepartmentKf;}
                      if(!$scope.IsAttendant && $scope.t.idTypeKf==1){
                        console.log("PASO 1, Function Add TENANT: "+$scope.IsTenant+" And Type Tenant: "+$scope.t.idTypeKf+" Department: "+$scope.tmp.idDeparmentKf);
                        $scope.consoleMessage="==>SE ASIGNA EL DEPTO: "+$scope.tmp.idDeparmentKf+" Y ES APROBADO AL PROPIETARIO: "+$scope.tenant.namesTenant+" SATISFACTORIAMENTE";
                      }else
                      if($scope.IsAttendant && $scope.t.idTypeKf==1){
                        console.log("PASO 1, Function Add ATT: "+$scope.IsAttendant+" And Type Tenant: "+$scope.t.idTypeKf+" Department: "+$scope.tmp.idDeparmentKf);
                        $scope.consoleMessage="==>SE ASIGNA EL DEPTO: "+$scope.tmp.idDeparmentKf+" Y ES APROBADO AL ENCARGADO/PROPIETARIO: "+$scope.t.fullNameTenant+" SATISFACTORIAMENTE";
                      }
                  }
                  if($scope.sessionidProfile!=3 && $scope.t.idTypeKf==1){
                     
                    console.log("<<<PROCESO DE ASIGNACIONDE DEPTO AL INQUILINO DE TIPO PROPIETARIO Y APROBACION>>>");
                    
                    
                    console.log($scope.consoleMessage);
                    $scope.fnAssignDepto($scope.tmp.idDeparmentKf,1);
                  }else{
                    console.log("<<<NO TIENE PRIVILEGIOS PARA ASIGNAR Y/O APROBAR UN DEPARTAMENTO>>>");
                  }
                }
                /*VALIDACIONES SI LA PETICION ES DE BUSQUEDA*/
                if($scope.tSearch==true){
                  if (!$scope.sysToken && $scope.rsTenantData.idTypeTenantKf==1){
                    console.log("==>USUARIO PROPIETARIO ENCONTRADO => SE ACTUALIZAN DATOS");
                    $scope.t.idTenant                 = $scope.rsTenantData.idUser;
                    $scope.t.idTypeKf                 = $scope.rsTenantData.idTypeTenantKf;
                    $scope.t.idDepartmentKf           = $scope.rsTenantData.idDepartmentKf;
                  }else if ($scope.sysToken && $scope.rsTenantData.idTypeTenantKf==1){
                    console.log("==>PROPIETARIO ENCONTRADO => SE ACTUALIZAN DATOS"); 
                  }else if ($scope.sysToken && $scope.rsTenantData.idTypeTenantKf==2){
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
                //console.clear();
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
      $http.post(serverHost+serverBackend+"User/", getTenantData2Add(),setHeaderRequest())
          .then(function (sucess, data) {
            console.log("DATA RECIBIDA Y REGISTRADA");
            console.log(getTenantData2Add());
            console.log("===>INQUILINO REGISTRADO SATISFACTORIAMENTE");
            if($scope.sessionidProfile!=0 && $scope.IsTicket==true && $scope.t.idTypeKf!=0 && $scope.manageDepto==0){
              console.log("=>BUSCAMOS LOS DATOS DEL INQUILINO REGISTRADO PARA CARGARLOS AL FORMULARIO DEL TICKET");
              $scope.tSearch=false;
              $scope.searchTenantByMail();
            }else
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
      if (!$scope.sysToken){
        $scope.t.idTypeKf       = 1;
      }else if($scope.sysToken && $scope.manageDepto>=0){
        $scope.t.idTypeKf             = 2;
        $scope.t.idProfileKf          = 5;
        $scope.t.idDepartmentKf       = !$scope.select.idDepartmentKf?$scope.idDeptoKf : $scope.select.idDepartmentKf;
        $scope.t.idAddressKf          = $scope.selectIdAddressKf.selected.idAdress;
        $scope.t.companyKf            = !$scope.selectIdCompanyKf.selected?$scope.sessionidCompany:$scope.selectIdCompanyKf.selected.idCompany;
        $scope.isCreateByOwner        = 1;
      }
    }else if($scope.sessionidProfile!=3 && $scope.manageDepto>=0 && !$scope.IsAttendant){
      $scope.t.idTypeKf              =!$scope.idTypeTenantKf ? $scope.typeTenant : $scope.idTypeTenantKf;
      $scope.t.idProfileKf           = $scope.t.idTypeKf==1 ? 3 : 5;
      $scope.t.idAddressKf           = $scope.selectIdAddressKf.selected.idAdress;
      $scope.t.companyKf             =!$scope.selectIdCompanyKf.selected?$scope.sessionidCompany:$scope.selectIdCompanyKf.selected.idCompany;
      $scope.isCreateByAdmin         = 1
    }else if($scope.sessionidProfile!=3 && $scope.manageDepto>=0 && $scope.IsAttendant){
      $scope.t.idProfileKf           = 6;
      $scope.t.idTypeKf              = 1;
      $scope.t.isDepartmentApproved  = 1;
    }
    /*VERIFICAMOS SI EL INQUILINO ES DE TIPO PROPIETARIO PARA NO LLENAR LA VARIABLE CON EL idDeparmentKf */
    if($scope.t.idTypeKf==1 && $scope.sessionidProfile != 3){
      $scope.t.idDepartmentKf =null;
    }else if($scope.t.idTypeKf==2 && $scope.sessionidProfile != 3){ 
      $scope.t.idDepartmentKf =!$scope.select.idDepartmentKf?$scope.idDeptoKf : $scope.select.idDepartmentKf;
    }
     if ($scope.sessionidProfile==1 || $scope.sessionidProfile==4){$scope.isCreateByAdmin=1;}
     $scope.t.password = "12345";
    /*
    $scope.t.fullNameTenant           =
    $scope.t.idTypeKf                 =
    $scope.t.phoneNumberTenant        =
    $scope.t.phoneNumberContactTenant =
    $scope.t.idDepartmentKf           =
    $scope.t.emailTenant              =*/
        var user =
              {
                user:{
                      fullNameUser            : $scope.t.fullNameTenant,
                      emailUser               : $scope.t.emailTenant ,
                      phoneNumberUser         : $scope.t.phoneNumberTenant  ,
                      phoneLocalNumberUser    : $scope.t.phoneNumberContactTenant,
                      passwordUser            : $scope.t.password,
                      idProfileKf             : $scope.t.idProfileKf,
                      idCompanyKf             : $scope.t.idCompanyKf,
                      /*-----------------------------------------*/
                      idAddresKf              : $scope.t.idAddressKf,
                      idTypeTenantKf          : $scope.t.idTypeKf,
                      idDepartmentKf          : $scope.t.idDepartmentKf,
                      isEdit                  : 1,
                      idCompanyKf             : $scope.t.companyKf,
                      isCreateByOwner         : $scope.isCreateByOwner,
                      isCreateByAdmin         : $scope.isCreateByAdmin
                      }
              };
        return user;
    };
    /**************************************************/


    /**************************************************
    *                                                 *
    *             ACTUALIZAR DE INQUILINO             *
    *                                                 *
    **************************************************/
    $scope.editTenant = function ($http, $scope){
      console.log(getData2UpdateTenant());
      $http.post(serverHost+serverBackend+"User/update", getData2UpdateTenant())
          .then(function (sucess, data) {
            console.log("Los Datos han sido actualizados");
            if($scope.manageDepto==1 && $scope.IsTenant==true){
              $scope.searchTenant('listTenant', $scope.idDeptoKf);
              $('#EditModalTenant').modal('hide');
            } 
            //$scope.getAllAttendant();
        },function (error, data,status) {
            if(status == 404){alert("!Informacion "+status+data.error+"info");}
            else if(status == 203){alert("!Informacion "+status,data.error+"info");}
            else{alert("Error !"+status+" Contacte a Soporte"+"error");}
               
        });
    };
    function getData2UpdateTenant () {
        var tenant =
                { 
                  user:   {
                          idUser                 : $scope.t.idTenant,
                          fullNameUser           : $scope.t.fullNameTenant,
                          emailUser              : $scope.t.emailTenant,
                          phoneNumberUser        : $scope.t.phoneNumberTenant,
                          phoneLocalNumberUser   : $scope.t.phoneNumberContactTenant,
                          idProfileKf            : $scope.tenantData.idProfileKf,
                          idCompanyKf            : $scope.tenantData.idCompanyKf,
                          idAddresKf             : $scope.tenantData.idAddresKf,
                          idTyepeAttendantKf     : $scope.tenantData.idTyepeAttendantKf,
                          idTypeTenantKf         : $scope.t.idTypeKf,
                          descOther              : $scope.tenantData.descOther,
                          idDepartmentKf         : $scope.t.idDepartmentKf,
                          isEdit                 : 1,
                          isDepartmentApproved   : $scope.tenantData.isDepartmentApproved,
                          requireAuthentication  : $scope.tenantData.isRequireAuthentication
                  },
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
              $scope.tenant.namesTenant      = "";
              $scope.tenant.addressTenant    = "";
              $scope.tenant.movilPhoneTenant = "";
              $scope.tenant.emailTenant      = "";
              $scope.tenant.localPhoneTenant = "";
              $scope.tenantNotFound = false;
              $scope.manageDepto=0;
              //alert($scope.typeTenant)
            if (!$scope.select.idDepartmentKf){
              inform.add('Debe seleccionar un departamento.',{
                              ttl:5000, type: 'warning'
                   }); 
            }else if (!$scope.typeTenant){
              inform.add('Debe seleccionar una opcion [Propietario/Inquilino].',{
                              ttl:5000, type: 'warning'
              });
            }else if($scope.sessionidProfile==3 && $scope.typeTenant==1){
                    $scope.getData(1);
            }else if($scope.sessionidProfile!=0 && $scope.typeTenant!=0){
              $scope.IsTenant=true;
              $scope.deptoHasOwner($scope.typeTenant, null, $scope.select.idDepartmentKf);
              console.log("$scope.typeTenant :"+$scope.typeTenant)
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
            console.log("Departamento ID a listar: "+idDpto)
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
          $scope.tenantData = obj;
          $scope.selectedTenant = obj;
          $scope.idDepto                 =  !obj.idDepartmentKf ? $scope.select.idDeparmentKf : obj.idDepartmentKf;
          $scope.idTenantKf              =  obj.idUser;
          $scope.tenant.namesTenant      =  obj.fullNameUser;
          $scope.tenant.localPhoneTenant =  obj.phoneLocalNumberUser;
          $scope.tenant.movilPhoneTenant =  obj.phoneNumberUser;
          $scope.tenant.emailTenant      =  obj.emailUser;
          $scope.t.idTypeKf              =  obj.idTypeTenantKf;
          $scope.IsTenant                = true;
          $scope.idTypeTenantKf          = "";
          $scope.ownerFound              = false;
          $scope.IsAttendant             = false;
          $('#ModalListTenant').modal('hide');
          console.log($scope.tenantData);
      }
    /*------------------------------------------------*/
    /**************************************************
    *                                                 *
    *       SELECCIONA DATA DE TENANT TO UPDATE       *
    *                                                 *
    **************************************************/
    $scope.tenant= {namesTenant:'',localPhoneTenant: '',movilPhoneTenant: '',emailTenant: '', typeTenant: ''};
      $scope.select2EditTenant = function (obj){
          $scope.isEditTenantByAdmin     =  true;
          $scope.tenantData = obj;
          //$scope.idDepto                 =  !obj.idDepartmentKf ? $scope.select.idDeparmentKf : obj.idDepartmentKf;
          $scope.idTenantKf              =  obj.idUser;
          $scope.tenant.namesTenant      =  obj.fullNameUser;
          $scope.tenant.localPhoneTenant =  obj.phoneLocalNumberUser;
          $scope.tenant.movilPhoneTenant =  obj.phoneNumberUser;
          $scope.tenant.emailTenant      =  obj.emailUser;
          $scope.tenant.typeTenant       =  obj.idTypeTenantKf;
          $scope.IsTenant                = true;
          $scope.idTypeTenantKf          = "";
          $scope.typeTenant              = "";
          $scope.ownerFound              = false;
          $scope.emailFound              = false;
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
      $http.post(serverHost+serverBackend+"Department/removeTenant",$scope._getData2RemoveTenant(),setHeaderRequest())
            .then(function(success, data) {
                if ($scope.manageDepto==1 && $scope.IsFnRemove==true){

                }
                  if (($scope.sessionidProfile==3 || $scope.sessionidProfile==6) && $scope.typeTenantKf==1){
                    inform.add('Se ha dado de baja satisfactoriamente.',{
                      ttl:3000, type: 'success'
                    });
                      $scope.listUserDepto(1, $scope.selectIdAddressKf.selected.idAdress);
                  }else if (($scope.sessionidProfile==3 || $scope.sessionidProfile==6) && $scope.typeTenantKf==2 || $scope.sessionidProfile!=3 && $scope.typeTenantKf!=0 ){
                    inform.add('El Inquilino ha sido dado de baja satisfactoriamente.',{
                      ttl:3000, type: 'success'
                    });
                    $scope.searchTenant('listTenant', $scope.idDeptoKf);
                    $scope.listUserDepto(1, $scope.selectIdAddressKf.selected.idAdress);
                  }
            },function (error, data, status) {
                if(status == 404){alert("!Informacion "+status+data.error+"info");}
                else if(status == 203){alert("!Informacion "+status,data.error+"info");}
                else{alert("Error ! "+status+" Contacte a Soporte");}
               
            });
    } 
    $scope.remove = {};
    $scope._getData2RemoveTenant = function () {
      $scope.remove.idUser         = $scope.idTenantKf;
      $scope.remove.idDeparmentKf  = $scope.idDeparmentKf;
      $scope.remove.typeTenantKf   = $scope.typeTenantKf;

      var tenant =
              {
                   info: { 
                                idUser              : $scope.idTenantKf,
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
          url : serverHost+serverBackend+"Tenant/inactive/"+itemId
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
        url : serverHost+serverBackend+"Tenant/active/"+itemId
      }).then(function mySuccess(response) {
          $scope.searchTenant('listTenant', $scope.idDeptoKf);
        }, function myError(response) {
      });
    };
    /**************************************************/

    /*************************************************/

    $scope.getDeptoName = function(deptoId){
      var deptoName="";
        /* Recorrer el Json User para obtener datos*/
        var length = $scope.deptoList.length;
        for (i = 0; i < length; i++) {
            if($scope.deptoList[i].idDepartment == deptoId){
                deptoName =  $scope.deptoList[i].departmentFloor;
                break;
            }
        };

      return deptoName;
    }


    /************************************************/

    /**************************************************
    *                                                 *
    *         CHECK IF THERE IS EXIST EMAIL           *
    *                                                 *
    **************************************************/
    $scope.checkEmail = function (inputElem) {
      $scope.emailFound = false;
      var $this=$("input[name='"+inputElem+"']");
      var emil2Check = $this.val();
      userServices.checkUserMail(emil2Check, "").then(function(data) {
        if(data){
          $scope.sysTmpUser    = tokenSystem.getTokenStorage(3);
          if ($scope.manageDepto>=0 && $scope.sysTmpUser.idTypeTenantKf==2 && !$scope.sysTmpUser.idDepartmentKf){
              inform.add('El Habitante '+$scope.sysTmpUser.fullNameUser+' esta registrado con el correo: '+$scope.sysTmpUser.emailUser,{
                      ttl:5000, type: 'warning'
              });
          }if ($scope.manageDepto>=0 && $scope.sysTmpUser.idTypeTenantKf==2 && $scope.sysTmpUser.idDepartmentKf){
              console.log($scope.sysTmpUser.idDepartmentKf);
              console.log($scope.getDeptoName($scope.sysTmpUser.idDepartmentKf));
              inform.add('El Habitante '+$scope.sysTmpUser.fullNameUser+' esta registrado con el correo: '+$scope.sysTmpUser.emailUser+' y se encuentra asignado al Departamento: '+$scope.getDeptoName($scope.sysTmpUser.idDepartmentKf)+' en ['+$scope.sysTmpUser.nameAdress+']',{
                      ttl:5000, type: 'warning'
              });
            $this.val('');
            tokenSystem.destroyTokenStorage(3);
          }
          console.log("::: EMAIL IS ALREADY USED BY ANOTHER USER :::");
          $scope.emailFound=true;
        }
      });
    }

    /************************************************/

    /**************************************************
    *                                                 *
    *           CHECK IF A DEPTO HAS OWNER            *
    *                                                 *
    **************************************************/
    $scope.tmpVar=0;
    $scope.deptoHasOwner = function (idTypeTenant, idTypeAttendant, idDepartment) {
      var dho_idTypeT=null,dho_idTypeA=null,dho_msgT=null;
      if(idTypeAttendant!=null){
        dho_idTypeA = idTypeAttendant;
      }
      if(idTypeTenant!=null){
        dho_idTypeT = idTypeTenant;
        dho_msgT     = dho_idTypeT==2 || dho_idTypeT==5 ? "Es de tipo Inquilino No Aplica":"Es propietario se procesa"
      }
      if (dho_idTypeT){console.log("Tipo de Inquilino: "+dho_idTypeT+" - "+dho_msgT); $scope.IsTenant=true;}else{$scope.IsTenant=false;}
      if (dho_idTypeA){console.log("Tipo de Encargado: "+dho_idTypeA); $scope.IsAttendant=true;}else{$scope.IsAttendant=false}
      $scope.tmp.idDepartment = idDepartment;
      console.log("dho_idTypeT: "+dho_idTypeT +" / "+ "$scope.IsTenant: "+$scope.IsTenant+" / "+ "dho_idTypeA: "+dho_idTypeA+" / "+"$scope.IsAttendant: "+$scope.IsAttendant)
      if($scope.tmp.idDepartment){
        if ((dho_idTypeT==1 || dho_idTypeT==3) || (dho_idTypeA>1)){
            console.log("$scope.tmp.idDepartment N#: "+$scope.tmp.idDepartment);
            console.log("deparmentName: "+$scope.getDeptoName($scope.tmp.idDepartment));
            var deparmentName = $scope.getDeptoName($scope.tmp.idDepartment);
            $scope.deptoFloor = deparmentName;
          if((deparmentName == "Porteria" || deparmentName == "porteria") && $scope.IsAttendant && $scope.tmpVar<=0){
             inform.add('Si el encargado posee un depto distinto a la porteria debera darse de alta desde su usuario.',{
                        ttl:6000, type: 'info'
                  });
             $scope.tmpVar++;
          }else if((deparmentName == "Porteria" || deparmentName == "porteria") && $scope.IsTenant){
            $scope.tmpVar=0;
            inform.add('Si desea registrar un propietario en el departamento: '+deparmentName+ ' debe seleccionar el perfil Encargado.',{
                        ttl:6000, type: 'warning'
            });
          }else{$scope.tmpVar=0;}
          $http({
            method : "GET",
            url : serverHost+serverBackend+"Department/chekDepartamenteOwner/"+$scope.tmp.idDepartment
          }).then(function mySuccess(response) {
                if (response.data=="true"){
                  $scope.ownerFound=true;
                  console.log("EL DEPTO: "+$scope.tmp.idDepartment+" Ya tiene un propietario Asignado");
                }else if(response.data=="false"){
                  $scope.ownerFound=false;
                  console.log("EL DEPTO: "+$scope.tmp.idDepartment+" No tiene un propietario Asignado");
                }
                  
            }, function myError(response) {
                if (!$scope.tmp.idDepartment){
                    inform.add('Debe seleccionar un departamento de la lista.',{
                        ttl:6000, type: 'warning'
                  });

                }else if(response.error==500){

                  inform.add('El Consorcio no ha cargado el departamento correspondiente a la porteria, por lo que no es posible asignar un Encargado.',{
                        ttl:6000, type: 'danger'
                  });
                }
              
          });
        }else{
          $scope.ownerFound=false;
        }
      }else{
          inform.add('Debe seleccionar un departamento de la lista.',{
                ttl:6000, type: 'warning'
          });
          $scope.ownerFound=false;
      }
    };

    $scope.modalCodeConfirmation = function(){
      $('#confirmCodeModal').modal({backdrop: 'static', keyboard: false});
      $('#confirmCodeModal').modal('show');
    }
    $scope.input  = {securityCode:''};
    $scope.manage = {};
    $scope.sysCheckResult=false;
    $scope.sysCheckCode = function(){
      $scope.manage = {};
      $scope.sysSecurityCode='';
      $scope.sysCheckResult=false;
      if($scope.input.securityCode){
        userServices.addressByCode($scope.input.securityCode).then(function(data) {
          $scope.sysSecurityCode= data;
          console.log($scope.sysSecurityCode.data);
          if(!$scope.sysSecurityCode.data.error){
            console.log($scope.sysSecurityCode.data[0].idAdress);
            $scope.manage.idAddrName = $scope.sysSecurityCode.data[0].nameAdress;
            $scope.manage.idAddrAttKf = $scope.sysSecurityCode.data[0].idAdress;
            $scope.getDeparment(1,$scope.manage.idAddrAttKf);
            $scope.sysCheckResult=true;
            $('#confirmCodeModal').modal('hide');
            $('#idDepartmentKf').focus();
            $scope.newDeparment=true;
          }else{
            $scope.sysSecurityCode={};
            inform.add('Codigo de seguridad invalido por favor valida nuevamente o comunicate con el area de soporte.',{
                        ttl:3000, type: 'danger'
            });
            $scope.input.securityCode="";
            $scope.sysCheckResult=false;
            $scope.newDeparment=false;
            $('#checkCode').focus();
          }
        });
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
    *                                              F U N C I O N E S    D E   E N C A R G A D O S                                               *
    *                                                                                                                                           *
    *                                                                                                                                           *
    ********************************************************************************************************************************************/ 
    /**************************************************
    *                                                 *
    *                MENU DE OPCIONES                 *
    *                                                 *
    **************************************************/
    $scope.userAtt = {attendant:{}};
    $scope.sysFunctionsAtt = function(value, obj){
      switch (value){
        case "open":
          $scope.getTypeAttendant();
          $scope.att.idTypeAttKf     = "";
          $scope.tmp.idTypeAttTmp    = "";
          $scope.att.idDepartmentKf  = "";
          $scope.ownerFound = false;
          if ($scope.manageDepto>=0 && $scope.sessionidProfile){
            $scope.select.idCompanyKf  = !$scope.selectIdCompanyKf.selected?$scope.sessionidCompany:$scope.selectIdCompanyKf.selected.idCompany;
            $scope.select.idAddressAtt = $scope.selectIdAddressKf.selected.idAdress;
            console.log("idCompanyKf: "+$scope.select.idCompanyKf);
            console.log("idAddressAtt: "+$scope.select.idAddressAtt);
            if($scope.collap==1){console.log("idDepartmentKf: "+obj.idDepartment);};
            console.log($scope.IsSystem);
            if (!$scope.selectIdAddressKf.selected.idAdress && !$scope.IsSystem && !$scope.select.idAddressAtt ) {
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
                  $scope.att={idAttendant:'', fullNamesAtt: '', idAddressAtt:'', idTypeAttKf: '',emailAtt:'', phonelocalAtt: '',phoneMovilAtt: '', hoursWork:'', idDepartmentKf: '', descOther: '' };
                  $scope.select.idCompanyKf  = !$scope.selectIdCompanyKf.selected?$scope.sessionidCompany:$scope.selectIdCompanyKf.selected.idCompany;
                  $scope.select.idAddressAtt = $scope.selectIdAddressKf.selected.idAdress;
                  $scope.att.idDepartmentKf  = $scope.collap==1?obj.idDepartment:null;
                  $('#RegisterModalAtt').modal('toggle');
            }
          }
        break;
        case "add":
              console.log(" ------------------------------ ");
              console.log("|                               |");
              console.log("|     CREATING ATTENDANT        |");
              console.log("|                               |");
              console.log(" ------------------------------ ");
          if($scope.manageDepto==0 && $scope.IsTicket){
            $scope.tmp.localPhoneAtt="";
            $scope.tmp.movilPhoneAtt="";
            $scope.tmp.emailAtt     ="";
          } 
            $scope.att.idTypeAttKf           = $scope.tmp.idTypeAttTmp;
            $scope.att.idCompanyKf           = $scope.sessionidProfile!=1 ? $scope.sessionidCompany : $scope.select.idCompanyKf;
            $scope.att.requireAuthentication = $scope.att.ownerOption>0 && $scope.att.ownerOption<3 ? 1 : 0;
            $scope.att.password              = $scope.att.ownerOption!=3 && $scope.att.idDepartmentKf ? 12345 : null;
              switch ($scope.att.ownerOption){
                case "1": 
                  $scope.att.idTypeTenantKf  =  1;
                break;
                case "2":
                  $scope.att.idTypeTenantKf  =  2;
                break;
                case "3":
                  $scope.att.idTypeTenantKf  =  0;
                break;
                default:

              }
            
            $scope.att.idProfileKf           = 6;
            $scope.att.idDepartmenTmp        = $scope.att.ownerOption==1 ? null : $scope.att.idDepartmentKf;
            $scope.att.isCreateByAdmin       = $scope.sessionidProfile==1 || $scope.sessionidProfile==4 ? 1 : null;
            //console.log($scope.att.ownerOption);
            //console.log($scope.att.idDepartmentKf);
            if ($scope.att.idTypeAttKf!=1){$scope.att.descOther=null;}
            console.log(getAttData2Add());
            //console.log($scope.att.idDepartmentKf);
            $scope.addAttendant($http, $scope);
        break;
            break;
        case "other":

          console.log("Tipo de Opcion seleccionada: "+$scope.typeOption);
          if($scope.manageDepto==0 && $scope.IsTicket && $scope.collap==2 && $scope.typeOption==3){
            $scope.att.fullNamesAtt    = $scope.other.fullNamesAtt;
            $scope.att.phonelocalAtt   = $scope.other.phonelocalAtt;
            $scope.att.phoneMovilAtt   = $scope.other.phoneMovilAtt;
            $scope.att.emailAtt        = $scope.other.emailAtt;
            $scope.att.descOther       = $scope.other.descOther;
            $scope.att.idTypeAttKf     = 1;
            console.log(getAttData2Add());
            $scope.IsAttendant=false;
            $scope.addAttendant($http, $scope);
          }else{
            $scope.newTicket("up");
          }
            
        break;
        case "save":
              console.log(" ------------------------------ ");
              console.log("|                               |");
              console.log("|     UPDATING ATTENDANT        |");
              console.log("|                               |");
              console.log(" ------------------------------ ");
              $scope.userAtt.attendant.emailUser            =$scope.att.emailAtt;
              $scope.userAtt.attendant.phoneNumberUser      =$scope.att.phoneMovilAtt;
              $scope.userAtt.attendant.phoneLocalNumberUser =$scope.att.phonelocalAtt;
              $scope.userAtt.attendant.descOther            =$scope.att.idTypeAttKf==1 ? $scope.att.descOther : null;
              $scope.userAtt.attendant.idCompanyKf          =$scope.select.idCompanyKf;
              $scope.userAtt.attendant.idTyepeAttendantKf   =$scope.att.idTypeAttKf;
              $scope.userAtt.attendant.idAddresKf           =$scope.select.idAddressAtt;
              $scope.userAtt.attendant.idDepartmentKf       =$scope.att.idDepartmentKf;
              $scope.userAtt.attendant.fullNameUser         =$scope.att.fullNamesAtt;
              console.log(getAttData2Update());
              $scope.updateAttendant($http, $scope);
        break;
        case "update":
          if($scope.manageDepto==0 && $scope.IsTicket){
            console.log("<<<DATOS DEL ENCARGADO A ACTUALIZAR>>>");
            if(option=="request"){
              console.log("=>REQUEST");
              $scope.userAtt.attendant.emailUser            =$scope.tmp.emailAtt;
              $scope.userAtt.attendant.phoneNumberUser      =$scope.tmp.movilPhoneAtt;
              $scope.userAtt.attendant.phoneLocalNumberUser =$scope.tmp.localPhoneAtt;
              $scope.userAtt.attendant.descOther            =$scope.userAtt.attendant.idTyepeAttendantKf==1 ? $scope.tmp.descOther : null;
            }else if(option=="delivery"){
              console.log("=>DELIVERY");
              console.log($scope.deliveryAtt);
              $scope.userAtt.attendant=$scope.deliveryAtt;
              $scope.userAtt.attendant.emailUser            =$scope.delivery.emailAtt;
              $scope.userAtt.attendant.phoneNumberUser      =$scope.delivery.movilPhoneAtt;
              $scope.userAtt.attendant.phoneLocalNumberUser =$scope.delivery.localPhoneAtt;
              $scope.userAtt.attendant.descOther            =$scope.userAtt.attendant.idTyepeAttendantKf==1 ? $scope.delivery.descOther : null;
            }
            console.log($scope.userAtt);
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
      $http.post(serverHost+serverBackend+"User/", getAttData2Add(),setHeaderRequest())
          .then(function (sucess, data) {
            inform.add('Encargado registrado satisfactoriamente',{
                    ttl:2000, type: 'success'
            });
            if($scope.att.idTypeTenantKf==1 && $scope.IsAttendant==true && ($scope.IsTicket==true || $scope.IsTicket==false) && $scope.manageDepto>=0){
              console.log("=>BUSCAMOS LOS DATOS DEL ENCARGADO REGISTRADO PARA ASIGNAR Y APROBAR LA PORTERIA O EL DEPTO DEL QUE ES PROPIETARIO.");
              $scope.tSearch=false;
              $scope.searchTenantByMail($scope.att.emailAtt);
            }
            /*if ($scope.manageDepto>=0 && $scope.att.idTypeAttKf==2 && $scope.IsAttendant){
              console.log("ENCARGADO DE TIPO TITULAR SE PROCEDE A REGISTRARLO COMO INQUILINO");
              $scope.t.fullNameTenant           = $scope.att.fullNamesAtt;
              $scope.t.phoneNumberTenant        = $scope.att.phoneMovilAtt;
              $scope.t.phoneNumberContactTenant = $scope.att.phonelocalAtt;
              $scope.t.emailTenant              = $scope.att.emailAtt;
              $scope.sysFunctionsTenant('search'); //CHECK THE TENANT TABLE IF THERE IS ALREADY REGISTERED
            }
            if ($scope.manageDepto==0 && $scope.IsTicket==true && $scope.att.idTypeAttKf==1){
                $scope.searchAttendantByMail($scope.att.emailAtt);
            }*/

            $('#RegisterModalAtt').modal('hide');
            $scope.getAllAttendant($scope.select.idAddressAtt);
        },function (error, data,status) {
                if(status == 404){alert("!Informacion "+status+data.error+"info");}
                else if(status == 203){alert("!Informacion "+status,data.error+"info");}
                else{alert("Error !"+status+" Contacte a Soporte"+"error");}
               
        });
    };


    function getAttData2Add () {
        var attendant =
                {
                  user:
                        {
                          fullNameUser         : $scope.att.fullNamesAtt,
                          emailUser            : $scope.att.emailAtt,
                          phoneNumberUser      : $scope.att.phoneMovilAtt,
                          phoneLocalNumberUser : $scope.att.phonelocalAtt,
                          idProfileKf          : $scope.att.idProfileKf,
                          idTyepeAttendantKf   : $scope.att.idTypeAttKf,
                          idAddresKf           : $scope.select.idAddressAtt,
                          idDepartmentKf       : $scope.att.idDepartmenTmp,
                          idCompanyKf          : $scope.att.idCompanyKf,
                          descOther            : $scope.att.descOther,
                          passwordUser         : $scope.att.password,
                          idTypeTenantKf       : $scope.att.idTypeTenantKf,
                          requireAuthentication: $scope.att.requireAuthentication,
                          isCreateByAdmin      : $scope.att.isCreateByAdmin,
                          isEdit               : 1

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
      $http.post(serverHost+serverBackend+"User/update", getAttData2Update(),setHeaderRequest())
          .then(function (sucess, data) {
            console.log(getAttData2Update());
            inform.add('Datos del Encargado actualizados satisfactoriamente',{
                    ttl:3000, type: 'success'
            });
            $scope.isAttUpdated = true;
            if ($scope.IsSystem){$scope.CallFilterFormT();}
            //$scope.getAllAttendant();
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
                    user:
                          {
                            fullNameUser         : $scope.userAtt.attendant.fullNameUser,
                            emailUser            : $scope.userAtt.attendant.emailUser,
                            phoneNumberUser      : $scope.userAtt.attendant.phoneNumberUser,
                            phoneLocalNumberUser : $scope.userAtt.attendant.phoneLocalNumberUser,
                            idProfileKf          : $scope.userAtt.attendant.idProfileKf,
                            idTyepeAttendantKf   : $scope.userAtt.attendant.idTyepeAttendantKf,
                            idAddresKf           : $scope.userAtt.attendant.idAddresKf,
                            idDepartmentKf       : $scope.userAtt.attendant.idDepartmentKf,
                            idCompanyKf          : $scope.userAtt.attendant.idCompanyKf,
                            descOther            : $scope.userAtt.attendant.descOther,
                            idTypeTenantKf       : $scope.userAtt.attendant.idTypeTenantKf,
                            requireAuthentication: $scope.userAtt.attendant.requireAuthentication,
                            idUser               : $scope.userAtt.attendant.idUser,
                            isEdit               : 1
                          }
                };
      return attendant;
    };
    /**************************************************
    *                                                 *
    *         BUSCAR ENCARGADO POR EL EMAIL           *
    *                                                 *
    **************************************************/

    $scope.searchAttendantByMail = function (mailAtt2Search){
      $http({
            method : "GET",
            url : serverHost+serverBackend+"user/findAttByEmail/"+mailAtt2Search
          }).then(function mySuccess(response) {
                $scope.rsAttData = response.data;
                console.log("<<<ENCARGADO ENCONTRADO>>>");
                console.log("--------Data del Encargado de tipo Other Registrado para la solicitud-------");
                console.log($scope.rsAttData);
                if($scope.IsTicket && $scope.manageDepto==0){
                  $scope.other.idAttendant  = $scope.rsAttData.idAttendant;
                  console.log("Id Encarado de tipo Otro: "+$scope.other.idAttendant);
                  $scope.newTicket("up");
                }
            }, function myError(response) {
               console.log("<<<ENCARGADO NO ENCONTRADO>>>");
          });
    };
    /**************************************************/
    $scope.switchOption = function (){
      $scope.editAttendant     = false;
      $scope.tmp.movilPhoneAtt = " ";
      $scope.tmp.localPhoneAtt = " ";
      $scope.tmp.emailAtt      = " ";
      $scope.tmp.descOther     = " ";
      $scope.att.idTypeAttKf   = " ";
      $scope.att.idAttendant   = " ";
      $scope.att.fullNamesAtt  = " ";
      $scope.att.idAddressAtt  = " ";
      $scope.att.descOther     = " ";

    }

    $scope.selectAnotherAtt = function(){
      $scope.btnClose=false;
      $scope.delivery.nameAtt=null;
      $scope.delivery.fullNamesAtt = "";
      //alert($scope.btnClose);
    }

    /**************************************************
    *                                                 *
    *   Select Function to bind the Attendant data    *
    *                                                 *
    **************************************************/
    $scope.select={nameAtt:''};
    $scope.getAttData = function(option){
      var length = $scope.listAttendant.length;
      var idAtt ="";
      //alert($scope.select.nameAtt)
      if(option=="request"){
        idAtt = $scope.select.nameAtt;
        if (idAtt){
          $scope.userAtt = {attendant:{}};
          if(idAtt){console.log("id del Encargado seleccionado: "+idAtt);}
          $scope.switchOption();
          /* Recorrer el Json Attendant para obtener datos */
          
          console.log("Cantidad total de Encargados segun la direccion seleccionada: "+length);
          for (i = 0; i < length; i++) {
              if($scope.listAttendant[i].idUser == idAtt){

                  $scope.userAtt.attendant=$scope.listAttendant[i];

                  $scope.tmp.movilPhoneAtt = $scope.listAttendant[i].phoneNumberUser;
                  $scope.tmp.localPhoneAtt = $scope.listAttendant[i].phoneLocalNumberUser;
                  $scope.tmp.emailAtt      = $scope.listAttendant[i].emailUser;
                  $scope.tmp.descOther     = $scope.listAttendant[i].descOther;
                  /*-------------------------------------------------------------------*/
                  $scope.att.idTypeAttKf   = $scope.listAttendant[i].idTyepeAttendantKf;
                  $scope.att.idAttendant   = $scope.listAttendant[i].idUser;
                  $scope.att.fullNamesAtt  = $scope.listAttendant[i].fullNameUser;
                  $scope.att.idAddressAtt  = $scope.listAttendant[i].idAddresKf;
                  $scope.att.descOther     = $scope.listAttendant[i].descOther;


                  //console.log($scope.userAtt);
                  break;
              }
          };
        }else{
          inform.add('Debe seleccionar un encargado de la lista',{
                    ttl:3000, type: 'info'
            });
        }
      }else if(option=="delivery"){
        idAtt = $scope.delivery.nameAtt;
        if (idAtt){
          $scope.deliveryAtt = {};
          if(idAtt){console.log("id del Encargado que recibira/retirara el pedido: "+idAtt);}
          /* Recorrer el Json Attendant para obtener datos */
          
          console.log("Cantidad total de Encargados segun la direccion seleccionada: "+length);
          for (i = 0; i < length; i++) {
              if($scope.listAttendant[i].idUser == idAtt){

                  $scope.deliveryAtt=$scope.listAttendant[i];

                  $scope.delivery.movilPhoneAtt = $scope.listAttendant[i].phoneNumberUser;
                  $scope.delivery.localPhoneAtt = $scope.listAttendant[i].phoneLocalNumberUser;
                  $scope.delivery.emailAtt      = $scope.listAttendant[i].emailUser;
                  $scope.delivery.descOther     = $scope.listAttendant[i].descOther;
                  /*-------------------------------------------------------------------*/
                  $scope.delivery.idTypeAttKf   = $scope.listAttendant[i].idTyepeAttendantKf;
                  $scope.delivery.idAttendant   = $scope.listAttendant[i].idUser;
                  $scope.delivery.fullNamesAtt  = $scope.listAttendant[i].fullNameUser;
                  $scope.delivery.idAddressAtt  = $scope.listAttendant[i].idAddresKf;
                  $scope.delivery.descOther     = $scope.listAttendant[i].descOther;
                  break;
              }
          };
        }else{
          inform.add('Debe seleccionar un encargado de la lista',{
                    ttl:3000, type: 'info'
            });
        }
      }
    }
    /**************************************************/

    /**************************************************
    *                                                 *
    *   FUNCTION TO CONCATENATE NAMES ATT IN SELECT   *
    *                                                 *
    **************************************************/

    $scope.combined = function(att){
        if(att.idTyepeAttendantKf == '1'){
            return att.fullNameUser+ " (" + att.nameTypeAttendant + ") Funcion: "+att.descOther;
        }
        else {
            return att.fullNameUser + " (" + att.nameTypeAttendant + ")";
        }
    }

    /**************************************************/
    /**************************************************
    *                                                 *
    *        SELECT DATA OF ATTENDANT TO UPDATE       *
    *                                                 *
    **************************************************/
      $scope.select2EditAtt = function (obj){
      //$scope.att={idAttendant:'', fullNamesAtt: '', idAddressAtt:'', idTypeAttKf: '',emailAtt:'', phonelocalAtt: '',phoneMovilAtt: '', hoursWork:'', idDepartmentKf: '' };
            $scope.userAtt.attendant    =  obj;
            $scope.att.idAttendant      =  obj.idUser;
            $scope.att.idTypeAttKf      =  obj.idTyepeAttendantKf;
            $scope.att.fullNamesAtt     =  obj.fullNameUser;
            $scope.att.emailAtt         =  obj.emailUser;
            $scope.att.emailAttTmp      =  obj.emailUser;
            $scope.att.phonelocalAtt    =  obj.phoneLocalNumberUser;
            $scope.att.phoneMovilAtt    =  obj.phoneNumberUser;
            $scope.att.hoursWork        =  obj.hoursWork;
            $scope.att.descOther        =  obj.descOther;
            $scope.att.idDepartmentKf   =  obj.idDepartmentKf;
            $scope.att.idDepartmentKfTmp=  obj.idDepartmentKf;
            $scope.select.idCompanyKf   =  obj.idCompanyKf;
            $scope.officeListByCompnayID(obj.idCompanyKf);
            $scope.select.idAddressAtt  =  obj.idAddresKf;
            $scope.IsAttendant          = true;
            $scope.tmp.idTypeAttTmp     ="";
            $scope.noTouched = true;
            $scope.ownerFound = false;
            $scope.getTypeAttendant();

        $('#UpdateModalAtt').modal('toggle');
        console.log("manageDepto: "+ $scope.manageDepto);
        console.log($scope.userAtt.attendant);
      }

    /*------------------------------------------------*/

    $scope.preCheckEmail = function(inputName, email, emailTmp){
      var mailSaved2Check=emailTmp;
        console.log("[preCheckEmail]--> mailSaved2Check: "+mailSaved2Check +' with email: '+email);
        if(mailSaved2Check && mailSaved2Check!=email || mailSaved2Check && mailSaved2Check!=email){
            $scope.checkEmail(inputName);
        }else{$scope.emailFound=false;}
    }
    $scope.preCheckDeptoHasOwner = function(attType, attDepto){
        if($scope.att.idDepartmentKfTmp!=attDepto){
          $scope.deptoHasOwner(null, attType, attDepto)
        }else{$scope.ownerFound=false;}
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
  /**************************************************
  *                                                 *
  *        ASSIGN DEPARMENT TO A TENANT USER        *
  *                                                 *
  **************************************************/
  $scope.tmpDpto = {idCompanyKf:'', idAddresKf:'',idDepartmentKf:''}
  $scope.sysAssignDep2Tenant = function(){
    console.clear();
    $scope.sysLoggedUser.idDepartmentKf       = $scope.select.idDepartmentKf;
    $scope.sysLoggedUser.idAddresKf           = $scope.manage.idAddrAttKf;
    $scope.sysLoggedUser.idCompanyKf          = $scope.getCompanyFromAddress($scope.manage.idAddrAttKf);
    $scope.sysLoggedUser.isDepartmentApproved = 0;
    var tmpLogged = {user:{}};
    tmpLogged.user=$scope.sysLoggedUser;
    console.log(tmpLogged);
    $scope.sysFnUserUpdateDepto(tmpLogged, 1);
    $scope.input.securityCode="";
    $scope.select.idDepartmentKf = null;

  }
  /**************************************************
  *                                                 *
  *       UASSIGN DEPARMENT TO A TENANT USER        *
  *                                                 *
  **************************************************/
  $scope.tmpDpto = {idCompanyKf:'', idAddresKf:'',idDepartmentKf:''}
  $scope.sysUnAssignDep2Tenant = function(){
    console.clear();
    $scope.sysLoggedUser.idDepartmentKf       = null;
    $scope.sysLoggedUser.idAddresKf           = null;
    $scope.sysLoggedUser.idCompanyKf          = null;
    $scope.sysLoggedUser.isDepartmentApproved = null;
    var tmpLogged = {user:{}};
    tmpLogged.user=$scope.sysLoggedUser;
    console.log(tmpLogged);
    $scope.sysFnUserUpdateDepto(tmpLogged, 2);
    $scope.sysCheckResult = false;
    $scope.deptoTenant = '';
    $scope.input.securityCode="";
    $scope.select.idDepartmentKf = null;

  }
  /**************************************************
  *                                                 *
  *     UPDATE THE DEPARTMENT TENANT USER FIELDS    *
  *                                                 *
  **************************************************/
  $scope.sysFnUserUpdateDepto = function(tmpLogged, opt){
      userServices.updateUser(tmpLogged).then(function(data){
       $scope.updateUserResult = data;
        if($scope.updateUserResult){
          
          $scope.refresSession($scope.sessionMail);
          if(opt==1){
            console.log("DEPARMENT ASSIGNED SUCCESSFULLY");
            inform.add('Departamento Asignado y pendiente por aprobacion por la administracion.',{
              ttl:3000, type: 'success'
            });
          }else if(opt==2){
            console.log("DEPARMENT UNASSIGNED SUCCESSFULLY");
            inform.add('Ha sido dado de baja del departamento de forma satisfactoria.',{
              ttl:3000, type: 'success'
            });
          }
        }
      });
  }
    /**************************************************
    *                                                 *
    *        REFRESH USER SESSION LOCAL STORAGE       *
    *                                                 *
    **************************************************/
    $scope.refresSession = function (sessionEmail) {
      $scope.sessionRefreshed = false;
      var emil2Check = sessionEmail;
      userServices.checkUserMail(emil2Check, "updatesession").then(function(data) {
        if(data){
          $scope.sysLoggedUser    = tokenSystem.getTokenStorage(2);
          $scope.sysLoadLStorage();
          //$scope.deptoTenant=!$scope.sessionidAddress?'':$scope.getDeptoName($scope.sessionIdDeparmentKf);
          $scope.sessionRefreshed=true;
        }
      });
    }

    /************************************************/

    $scope.viewOwnerDeptos = function(value){
      $scope.searchMyDeptos = value;
      $scope.newDeparment   = value;
      $scope.recordsFound   = false;
      $scope.select.idDepartmentKf = null;
      $scope.input.securityCode = "";
      $scope.selectIdAddressKf.selected = undefined;
      $scope.sysCheckResult = false;
    }





















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
    $scope.vConfirm = confirm;
    var tmpOpt=$scope.div2Open;
    //console.log(tmpOpt);
    $scope.mess2show="";
      switch ($scope.swMenu){
        case "tdown":
          if (confirm==0){
            console.log(confirm);
            $scope.mess2show="Desea Solicitar una nueva llave?";
            $('#confirmRequestModal').modal('toggle');
          }else if (confirm==1){
            $('.jumbotron [id^="m_"]').removeClass('active');
            $('#m_pedidos').addClass('active');
            $('#SubM_Pedidos').show();
            $scope.fnShowHide('rukeyup', 'open');
            $('#confirmRequestModal').modal('hide');
          }
          $('#confirmRequestModal').on('hide.bs.modal', function (e) {
            $scope.dhboard();
            $scope.fnShowHide('home','open');
          });
        break;
        case "removet":
          if (confirm==0){
              if (($scope.sessionidProfile!=3 && obj.idTypeTenantKf!=0) || ($scope.sessionidProfile==3 && obj.idTypeTenantKf==2) || ($scope.sessionidProfile==6 && obj.idTypeTenantKf==2)){
                $scope.mess2show="Esta seguro que desea dar de baja al Habitante?";
              }else if ($scope.sessionidProfile==3 || $scope.sessionidProfile==5 || $scope.sessionidProfile==6){
                $scope.mess2show="Esta seguro que desea darse de baja?";
              }
              if(($scope.sessionidProfile!=3 && obj.idTypeTenantKf!=0) || ($scope.sessionidProfile==3 && obj.idTypeTenantKf==2) || ($scope.sessionidProfile==6 && obj.idTypeTenantKf==2)){
                  $scope.idTenantKf     =  obj.idUser;
                  $scope.idDeparmentKf  =  $scope.idDeptoKf;
                  $scope.typeTenantKf   =  obj.idTypeTenantKf;
                  console.log("Manage Depto: "+$scope.manageDepto);
                  console.log('ID: '+$scope.idTenantKf+' ID DPTO: '+$scope.idDeparmentKf+' ID TIPO TENANT: '+$scope.typeTenantKf);
                  console.log("DATOS DEL INQUILINO O PROPIETARIO A DAR DE BAJA");
                  console.log(obj)
                  $scope.checkTicketTenant($scope.idTenantKf);
              }else if($scope.sessionidProfile==3 || $scope.sessionidProfile==6 || $scope.sessionidProfile==5){
                  console.log("::::::: REMOVE AN DEPTO OWNER :::::::");
                  $scope.idTenantKf     = $scope.sessionidTenantUser;
                  $scope.idDeparmentKf  = obj.idDepartment;
                  $scope.typeTenantKf   = $scope.sessionidTypeTenant;
                  console.log("Manage Depto: "+$scope.manageDepto);
                  console.log('ID: '+$scope.idTenantKf+' ID DPTO: '+$scope.idDeparmentKf+' ID TIPO TENANT: '+$scope.typeTenantKf);
                  console.log("DATOS DEL INQUILINO O PROPIETARIO A DAR DE BAJA");
                  console.log(obj)
                  $scope.checkTicketTenant($scope.idTenantKf);
              }
          }else if (confirm==1){
            $scope.IsFnRemove=true;
            if($scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){
              $scope.sysUnAssignDep2Tenant()
            }else{
                $scope.fnRemoveTenant($http, $scope);
            }
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
          }else if(confirm==0 && $scope.addrNoFound==0 && $scope.sessionidProfile!=0){ 
              if(tmpOpt=="rukeyup"){
                $scope.rukeyup = true;
                if ($scope.sessionidProfile==5 ||($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){
                  $scope.refresSession($scope.sessionMail);
                  $scope.idAddressAtt=$scope.sessionNameAdress;
                  $scope.namesTenant=$scope.sessionNames;
                  if($scope.sessionidAddress){
                    $scope.getKeyChains($scope.sessionidAddress); 
                    $scope.getServicesValues($scope.sessionidAddress);
                  }else{
                     $scope.idAddressAtt="Consorcio no asignado";
                  }
                  if($scope.sessionidAddress && (!$scope.sessionisDepartmentApproved || $scope.sessionisDepartmentApproved>=0)){
                    $scope.deptoTenant   =($scope.sessionidAddress && !$scope.sessionisDepartmentApproved) || ($scope.sessionidAddress && $scope.sessionisDepartmentApproved==0)?$scope.getDeptoName($scope.sessionIdDeparmentKf)+" (No aprobado)":$scope.getDeptoName($scope.sessionIdDeparmentKf)+" (Aprobado)";
                  }else{
                    $scope.deptoTenant = "Departamento no ha sido asignado."
                  }
                }
              }else if(tmpOpt=="rukeydown"){
                $scope.rukeydown = true;
              }else if(tmpOpt=="home"){
                $scope.home = true;
              }else if(tmpOpt=="rucost"){
                $scope.rucost=true;
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

    /**************************************************
    *                                                 *
    *   Select Function to bind the Attendant data    *
    *                                                 *
    **************************************************/

    $scope.getCompanyFromAdress = function(){
        var idAddrr = $scope.select.idAddressAtt;
        /* Recorrer el Json Attendant para obtener datos */
        var length = $scope.ListTenantAddress.length;
        for (i = 0; i < length; i++) {
            if($scope.ListTenantAddress[i].idAdress == idAddrr){
                
                $scope.tmp.idCompanyKf = $scope.ListTenantAddress[i].idCompanyKf;
                console.log($scope.ListTenantAddress[i].idCompanyKf);
                break;
            }
        }; 
    }
    /**************************************************/
    $scope.newTicket = function(opt){
      console.log("$scope.select.idDepartmentKf: "+$scope.select.idDepartmentKf);
      $scope.tk.idUserAdminKf      = 0;     //ADMINISTRADOR COFERBA
      $scope.tk.idTenantKf         = 0;    //INQUILINO
      $scope.tk.idOWnerKf          = 0;   //PROPIETARIO
      $scope.tk.idUserEnterpriceKf = 0;  //ADMIN. CONSORCIO
      $scope.tk.idAttendantKf      = 0; //ENCARGADO
      $scope.tk.idCompanyKf        = 0;//USUARIO EMPRESA
      $scope.tk.idTypeOfKeysKf     = {};
      var elem_input               = '';
      $scope.kItems={keys:[]}; 
        switch (opt) {
          case "up": // SOLOCITUD DE ALTA
                      $scope.tk.idTicket           = 1;
                  if(($scope.sessionidProfile==3||$scope.sessionidProfile==6) && $scope.typeOfTenant == 1){
                      $scope.tk.idOWnerKf          = $scope.sessionIdUser;
                      $scope.tk.idTenantKf         = $scope.sessionidTenantUser;
                      $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;
                      
                  }else if(($scope.sessionidProfile==3||$scope.sessionidProfile==6) && $scope.typeOfTenant == 2){
                      $scope.tk.idOWnerKf          = $scope.sessionIdUser;
                      $scope.tk.idTenantKf         = $scope.idTenantKf;
                      $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;

                  }else if($scope.sessionidProfile==5){
                      $scope.tk.idTenantKf         = $scope.sessionIdUser;
                      $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.sessionidAddress);
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;

                  }
                  if($scope.sessionidProfile==4 && $scope.typeOfTenant!=0){
                      $scope.tk.idUserEnterpriceKf = $scope.sessionIdUser;
                      $scope.tk.idCompanyKf        = $scope.sessionidCompany;
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;
                    if ($scope.collap==1){
                        //alert($scope.collap)
                        $scope.tk.idTenantKf       = $scope.idTenantKf;
                        $scope.tk.idProfileKf      = $scope.sessionidProfile;
                    }else if ($scope.collap==2){
                      //alert($scope.typeOption)
                        switch ($scope.typeOption){
                          case 1:
                            $scope.tk.idTypeOfOptionKf = 1;
                            //alert($scope.userAtt.attendant.idTyepeAttendantKf)
                            if($scope.userAtt.attendant.idTyepeAttendantKf==1){
                              $scope.tk.idOtherKf      = $scope.select.nameAtt;
                              $scope.tk.idAttendantKf  =null;
                            }else{
                              $scope.tk.idAttendantKf  = $scope.select.nameAtt;
                              $scope.tk.idOtherKf      =null;
                            }
                            
                          break;
                          case 2:
                            $scope.tk.idTypeOfOptionKf = 2;
                            
                          break;
                          case 3:
                            $scope.tk.idOtherKf        = $scope.other.idAttendant;
                            $scope.tk.idTypeOfOptionKf = 3;
                          break;
                          default:
                        }
                    }
                  }else if($scope.sessionidProfile==1 && $scope.typeOfTenant!=0){
                      $scope.tk.idUserAdminKf      = $scope.sessionIdUser;
                      $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;
                      if ($scope.collap==1){
                        $scope.tk.idTenantKf       = $scope.idTenantKf;
                      }else if ($scope.collap==2){
                        switch ($scope.typeOption){
                          case 1:
                            $scope.tk.idTypeOfOptionKf = 1;
                            if($scope.userAtt.attendant.idTyepeAttendantKf==1){
                              $scope.tk.idOtherKf      = $scope.select.nameAtt;
                            }else{
                              $scope.tk.idAttendantKf  = $scope.select.nameAtt;
                            }
                          break;
                          case 2:
                            $scope.tk.idTypeOfOptionKf = 2;
                            
                          break;
                          case 3:
                            $scope.tk.idOtherKf        = $scope.other.idAttendant;
                            $scope.tk.idTypeOfOptionKf = 3;
                          break;
                          default:
                        }
                    }
                  }
                   if($scope.select.whoPickUp==3){
                      $scope.tk.thirdNames         = $scope.third.names;
                      $scope.tk.thirdPhone         = $scope.third.movilPhone;
                      $scope.tk.thirdId            = $scope.third.dni;
                    }
                      $scope.tk.idDepartmentKf     = $scope.sessionidProfile==5 ? $scope.sessionIdDeparmentKf : $scope.select.idDepartmentKf;
                      $scope.tk.description        = $scope.txt.sruTenant;
                      $scope.tk.idTypeDeliveryKf   = $scope.delivery.idTypeDeliveryKf;
                      $scope.tk.idUserAttDelivery  = $scope.delivery.nameAtt;
                      $scope.tk.numberItemes       = $scope.quantity.qkuTenant;
                      $scope.tk.idAddresKf         = $scope.sessionidProfile==5 ? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                      $scope.tk.idBranchKf         = $scope.sessionidProfile==5 ? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                      $scope.tk.totalService       = $scope.cost.total;
                      $scope.tk.idTypeOfKeysKf     = $scope.dataK;
                      $scope.tk.sendNotify         = $scope.sessionidProfile!=1 ? null : $scope.sendNotify;
                      $scope.tk.isNew              = 1;
                      console.log("[newTicket]-->$scope.sendNotify: "+$scope.sendNotify);
                      
                  console.log("---------------------------------------");
                  console.log("DATOS DE LA SOLICITUD DE ALTA DE LLAVE");
                  console.log("---------------------------------------");
                  console.log('[newTicket]-->$scope.tk.idTypeOfKeysKf :'+$scope.dataK.length);
                  //console.log($scope.tk);
                  console.log($scope._getData2AddKey());
                  $scope.requestUpKey($http, $scope);
          break;
          case "down": // SOLOCITUD DE BAJA
                      $scope.tk.idTicket           = 2;
                  if(($scope.sessionidProfile==3||$scope.sessionidProfile==6) && $scope.typeOfTenant == 1){
                      $scope.tk.idOWnerKf          = $scope.sessionIdUser;
                      $scope.tk.idTenantKf         = $scope.sessionidTenantUser;
                      $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;
                  }else if(($scope.sessionidProfile==3||$scope.sessionidProfile==6) && $scope.typeOfTenant == 2){
                      $scope.tk.idOWnerKf          = $scope.sessionIdUser;
                      $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;
                  }else if($scope.sessionidProfile==5){
                      $scope.tk.idOWnerKf          = $scope.sessionIdUser;
                      $scope.tk.idTenantKf         = $scope.sessionidTenantUser;
                      $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.sessionidAddress);
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;

                  }
                  if($scope.sessionidProfile==4 && $scope.typeOfTenant!=0){
                      $scope.tk.idUserEnterpriceKf = $scope.sessionIdUser;
                      $scope.tk.idCompanyKf        = $scope.sessionidCompany;
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;
                    if ($scope.collap==1){
                      $scope.tk.idTenantKf         = $scope.idTenantKf;
                    }else if ($scope.collap==2){
                      switch ($scope.typeOption){
                          case 1:
                            $scope.tk.idTypeOfOptionKf = 1;
                          break;
                          case 2:
                            $scope.tk.idTypeOfOptionKf = 2;
                          break;
                          case 3:
                            $scope.tk.idOtherKf        = $scope.other.idAttendant;
                            $scope.tk.idTypeOfOptionKf = 3;
                          break;
                          default:
                        }
                    }
                  }else if($scope.sessionidProfile==1 && $scope.typeOfTenant!=0){
                      $scope.tk.idUserAdminKf      = $scope.sessionIdUser;
                      $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;
                      if ($scope.collap==1){
                        $scope.tk.idTenantKf       = $scope.idTenantKf;
                      }else if ($scope.collap==2){
                      switch ($scope.typeOption){
                          case 1:
                            $scope.tk.idTypeOfOptionKf = 1;
                          break;
                          case 2:
                            $scope.tk.idTypeOfOptionKf = 2;
                          break;
                          case 3:
                            $scope.tk.idOtherKf        = $scope.other.idAttendant;
                            $scope.tk.idTypeOfOptionKf = 3;
                          break;
                          default:
                        }
                    }
                  }
                  elem_input  = $("div.form-group").find(".key-codes");
                  for (var i = 0; i < $scope.quantity.qkuTenant; i++){
                          var kItems={idKeyKf:'', keyCode:''};
                          kItems.keyCode=elem_input[i].value;
                          switch (i){
                            case 0:kItems.idKeyKf=$scope.key.tk1;break;
                            case 1:kItems.idKeyKf=$scope.key.tk2;break;
                            case 2:kItems.idKeyKf=$scope.key.tk3;break;
                            case 3:kItems.idKeyKf=$scope.key.tk4;break;
                            case 4:kItems.idKeyKf=$scope.key.tk5;break;
                            case 5:kItems.idKeyKf=$scope.key.tk6;break;
                            case 6:kItems.idKeyKf=$scope.key.tk7;break;
                            case 7:kItems.idKeyKf=$scope.key.tk8;break;
                            case 8:kItems.idKeyKf=$scope.key.tk9;break;
                            case 9:kItems.idKeyKf=$scope.key.tk10;break;
                          }
                          $scope.kItems.keys.push(kItems);
                          
                          //console.log($scope.kItems.keys);
                  };
                      $scope.tk.idDepartmentKf         = $scope.sessionidProfile==5 ? $scope.sessionIdDeparmentKf : $scope.select.idDepartmentKf;
                      $scope.tk.idReasonDisabledItemKf = $scope.select.idTypeLostKf;
                      $scope.tk.idAttendantKf          = $scope.select.nameAtt;
                      $scope.tk.description            = $scope.txt.sruTenant;
                      $scope.tk.itemToDisabled         = $scope.kItems;
                      $scope.tk.numberItemes           = $scope.quantity.qkuTenant;
                      $scope.tk.idAddresKf             = $scope.sessionidProfile==5 ? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                      $scope.tk.idBranchKf             = $scope.sessionidProfile==5 ? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                      $scope.tk.idTypeOfOptionKf       = null;
                      $scope.tk.sendNotify             = $scope.sessionidProfile!=1 ? null : $scope.sendNotify;
                      $scope.tk.isNew                  =  1;
                  console.log("------------------------------------------");
                  console.log("| DATOS DE LA SOLICITUD DE BAJA DE LLAVE |");
                  console.log("------------------------------------------");
                  console.log($scope._getData2DelKey());
                  $scope.requestDownKey($http, $scope);
                
          break;
          case "srvs": // SOLOCITUD DE SERVICIOS
                  $scope.tk.idTicket           = 3;
                  if($scope.sessionidProfile==1){
                    $scope.tk.idUserAdminKf      = $scope.sessionIdUser;
                    $scope.tk.idUserCompany      = $scope.select.namesAdmin;
                    $scope.tk.idProfileKf        = $scope.sessionidProfile;
                    $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                  }else if($scope.sessionidProfile==2){
                    $scope.tk.idUserCompany      = $scope.sessionIdUser;
                    $scope.tk.idCompanyKf        = $scope.sessionidCompany;
                    $scope.tk.idProfileKf        = $scope.sessionidProfile;
                  }else if($scope.sessionidProfile==4){
                    $scope.tk.idUserEnterpriceKf = $scope.sessionIdUser;
                    $scope.tk.idCompanyKf        = $scope.sessionidCompany;
                    $scope.tk.idProfileKf        = $scope.sessionidProfile;
                  }
                    $scope.tk.idTypeServices     = $scope.select.idTypeServiceKf;
                    $scope.tk.descriptionOrder   = $scope.txt.detailSv;
                    $scope.tk.description        = $scope.txt.sruSv;
                    $scope.tk.idAddresKf         = $scope.sessionidProfile!=1 ? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                    $scope.tk.idBranchKf         = $scope.sessionidProfile!=1 ? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                    $scope.tk.sendNotify         = $scope.sessionidProfile!=1 ? null : $scope.sendNotify;
                    $scope.tk.isNew              = 1;
                console.log("DATOS DE LA SOLICITUD DEL SERVICIO");
                console.log($scope._getServiceData());
                $scope.requestService($http, $scope);
          break;
          case "other": // SOLOCITUD DE OTRA CONSULTA
                    $scope.tk.idTicket           = 4;
                  if($scope.sessionidProfile==3){
                      $scope.tk.idOWnerKf        = $scope.sessionIdUser;
                      $scope.tk.idProfileKf        = $scope.sessionidProfile;
                      $scope.tk.idCompanyKf      = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                  }else if($scope.sessionidProfile==2){
                    $scope.tk.idUserCompany      = $scope.sessionIdUser;
                    $scope.tk.idProfileKf        = $scope.sessionidProfile;
                    $scope.tk.idCompanyKf        = $scope.sessionidCompany;
                  }else if($scope.sessionidProfile==4){
                    $scope.tk.idUserEnterpriceKf = $scope.sessionIdUser;
                    $scope.tk.idProfileKf        = $scope.sessionidProfile;
                    $scope.tk.idCompanyKf        = $scope.sessionidCompany;
                  }
                    $scope.tk.idTypeOuther       = $scope.o.idTypeOutherKf;
                    $scope.tk.mailContactConsult = $scope.sessionMail;
                    $scope.tk.description        = $scope.o.detail;
                    $scope.tk.addressConsul      = $scope.sessionidProfile==5 ? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                    $scope.tk.idAddresKf         = $scope.sessionidProfile==5 ? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                    $scope.tk.isNew              = 1;
                console.log("DATOS DE LA SOLICITUD DE CONSULTA");
                console.log($scope._getData2RequestOther());
                $scope.otherRequest($http, $scope);
          break;

          default: 
        }


    }
    $scope.getNotify = function(value){
      $scope.sendNotify=value;
    }

    $scope.keyChains = {};
    $scope.getKeyChains = function(idAddressTmp){
      console.log("[getKeyChains]-> idAddressTmp: "+idAddressTmp);
      var urlT=serverHost+serverBackend+"Department/keyChainsByIdAddress/"+idAddressTmp;

      $http({
          method : "GET",
          url : urlT
        }).then(function mySuccess(response){
              $scope.keyChains=response.data;
              if($scope.rukeyup){
                $scope.bindKeyChainData();
                $scope.keyChainsQty=$scope.keyChains.length;
              }
              console.log("[getKeyChains] -> Data: ");
              console.log(response.data);
              console.log("Total keys: "+$scope.keyChains.length);
              $scope.keyChainsFound=true;
        }, function myError (response){
            if (response.status=="404" || response.status=="500"){
                  console.log("<<<NO HAY LLAVEROS REGISTRADOS>>>");
                  $scope.keyChainsFound=false;
            }
      });
    }
    $scope.bindKeyChainData = function(){
        /* Recorrer el Json Parameter para obtener datos*/
        var length = $scope.keyChains.length;
        for (var i = 0; i < length; i++){
          switch(i){
            case 0:
              $scope.keyName1=$scope.keyChains[i].item+'('+$scope.keyChains[i].value+')';
              $scope.keyValue1=$scope.keyChains[i].value;
              $scope.key.keyId1=$scope.keyChains[i].idKey;
            break;
            case 1:
              $scope.keyName2=$scope.keyChains[i].item+'('+$scope.keyChains[i].value+')';
              $scope.keyValue2=$scope.keyChains[i].value;
              $scope.key.keyId2=$scope.keyChains[i].idKey;
            break;
            case 2:
              $scope.keyName3=$scope.keyChains[i].item+'('+$scope.keyChains[i].value+')';
              $scope.keyValue3=$scope.keyChains[i].value;
              $scope.key.keyId3=$scope.keyChains[i].idKey;
            break;
            case 3:
              $scope.keyName4=$scope.keyChains[i].item+'('+$scope.keyChains[i].value+')';
              $scope.keyValue4=$scope.keyChains[i].value;
              $scope.key.keyId4=$scope.keyChains[i].idKey;
            break;
            case 4:
              $scope.keyName5=$scope.keyChains[i].item+'('+$scope.keyChains[i].value+')';
              $scope.keyValue5=$scope.keyChains[i].value;
              $scope.key.keyId5=$scope.keyChains[i].idKey;
            break;
          }
              
        }
    }
    $scope.dataK={keys:[]}; 
    var dataK={idKeyKf:'', keyQty:''};
    $scope.fnCheckKeys2 = function(idKey, keyQTY, ckBoxCheck){
      dataK={idKeyKf:'', keyQty:''};
      $scope.itemNotFound=true;
      /*console.log("$scope.dataK.keys.length: "+$scope.dataK.keys.length);
      console.log("$scope.checkBoxCheck: "+ckBoxCheck);
      console.log("keyQTY: "+keyQTY);
      console.log("idKey: "+idKey);*/
      if(ckBoxCheck==true && (keyQTY>0 || !keyQTY)){
        for (var i = 0; i < $scope.dataK.keys.length; i++){
            if(idKey==$scope.dataK.keys[i].idKeyKf){
              console.log("updating...");
              $scope.dataK.keys[i].keyQty=keyQTY;
              $scope.itemNotFound=false;
              break;
            }else{
              $scope.itemNotFound=true;
            }
        }
        if($scope.itemNotFound){
          dataK.idKeyKf=idKey;
          dataK.keyQty=keyQTY;
          console.log("pushing...");
          $scope.dataK.keys.push(dataK);
        }
        console.log($scope.dataK.keys);
      }else{
          for (var i = 0; i < $scope.dataK.keys.length; i++){
            if(idKey==$scope.dataK.keys[i].idKeyKf){
              $scope.dataK.keys.splice(i);
              //console.log("item deleted");
              //console.log($scope.dataK.keys);
              break;
            }
          }
      }
    }

    function NaN2Zero(n){
        return isNaN( n ) ? 0 : n; 
    }
    $scope.checkBoxCheck1=false;$scope.checkBoxCheck2=false;$scope.checkBoxCheck3=false;$scope.checkBoxCheck4=false;$scope.checkBoxCheck5=false;
    $scope.getTotalCostOfKeys = function(){
      var totalKeyCost=0;
      var totalKey1, totalKey2, totalKey3, totalKey4, totalKey5;
        if($("#keyChek1").prop('checked')){
          totalKey1 = NaN2Zero($scope.keyValue1)*NaN2Zero($scope.key.qty1);
          $scope.checkBoxCheck1=true; 
          $scope.fnCheckKeys2($scope.key.keyId1, $scope.key.qty1,  $scope.checkBoxCheck1);
        }else{totalKey1=0;$scope.key.qty1='';$scope.checkBoxCheck1=false; $scope.fnCheckKeys2($scope.key.keyId1, $scope.key.qty1,  $scope.checkBoxCheck1);}
        if($("#keyChek2").prop('checked')){
          totalKey2 = NaN2Zero($scope.keyValue2)*NaN2Zero($scope.key.qty2);
          $scope.checkBoxCheck2=true; 
          $scope.fnCheckKeys2($scope.key.keyId2, $scope.key.qty2,  $scope.checkBoxCheck2);
        }else{totalKey2=0;$scope.key.qty2='';$scope.checkBoxCheck2=false; $scope.fnCheckKeys2($scope.key.keyId2, $scope.key.qty2,  $scope.checkBoxCheck2);}
        if($("#keyChek3").prop('checked')){
          totalKey3 = NaN2Zero($scope.keyValue3)*NaN2Zero($scope.key.qty3);
          $scope.checkBoxCheck3=true;
          $scope.fnCheckKeys2($scope.key.keyId3, $scope.key.qty3,  $scope.checkBoxCheck3);
        }else{totalKey3=0;$scope.key.qty3='';$scope.checkBoxCheck3=false; $scope.fnCheckKeys2($scope.key.keyId3, $scope.key.qty3,  $scope.checkBoxCheck3);}
        if($("#keyChek4").prop('checked')){
          totalKey4 = NaN2Zero($scope.keyValue4)*NaN2Zero($scope.key.qty4);
          $scope.checkBoxCheck4=true;
          $scope.fnCheckKeys2($scope.key.keyId4, $scope.key.qty4,  $scope.checkBoxCheck4);
        }else{totalKey4=0;$scope.key.qty4='';$scope.checkBoxCheck4=false; $scope.fnCheckKeys2($scope.key.keyId4, $scope.key.qty4,  $scope.checkBoxCheck4);}
        if($("#keyChek5").prop('checked')){
          totalKey5 = NaN2Zero($scope.keyValue5)*NaN2Zero($scope.key.qty5);
          $scope.checkBoxCheck5=true; 
          $scope.fnCheckKeys2($scope.key.keyId5, $scope.key.qty5,  $scope.checkBoxCheck5);
        }else{totalKey5=0;$scope.key.qty5='';$scope.checkBoxCheck5=false; $scope.fnCheckKeys2($scope.key.keyId5, $scope.key.qty5,  $scope.checkBoxCheck5);}
        /*==============================================================*/
        totalKeyCost = totalKey1+totalKey2+totalKey3+totalKey4+totalKey5;
        $scope.quantity.qkuTenant = NaN2Zero($scope.key.qty1)+NaN2Zero($scope.key.qty2)+NaN2Zero($scope.key.qty3)+NaN2Zero($scope.key.qty4)+NaN2Zero($scope.key.qty5);
            //console.log("TOTAL KEY COST: "+totalKeyCost);
            $scope.cost.key = totalKeyCost;
      return totalKeyCost;
    }

    /**************************************************
    *                                                 *
    *                 SERVICE COST                    *
    *                                                 *
    **************************************************/
    $scope.getServicesValues = function(idAddressKf){
        $scope.getAllAddress();
       var idAdd = idAddressKf;
        $scope.cost.service       = 0;
        $scope.cost.key           = 0;
        $scope.cost.delivery      = 0;
        /* Recorrer el Json Attendant para obtener datos */
        var length = $scope.ListAddress.length;
        for (i = 0; i < length; i++) {
            if($scope.ListAddress[i].idAdress == idAdd){
                $scope.cost.service       = $scope.ListAddress[i].priceManagement;
                $scope.cost.delivery      = $scope.ListAddress[i].priceShipping;
                $scope.costDeliveryTmp    = $scope.ListAddress[i].priceShipping;
                break;
            }
        };

    }


    /**************************************************/
    /**************************************************/
    $scope.costDeliveryTmp = 0;
    $scope.showCount       = false;
    $scope.getTotalService = function (){
      /***************************************/
      $scope.cost.total    = 0;
      var costKey          = $scope.getTotalCostOfKeys();
      //console.log(costKey);
      var costService      = $scope.cost.service;
      var costDelivery     = $scope.delivery.idTypeDeliveryKf==1 ? 0 : $scope.costDeliveryTmp;
      $scope.cost.delivery = $scope.delivery.idTypeDeliveryKf==1 ? 0: $scope.costDeliveryTmp;
      /*CALCULATE THE TOTAL AMOUNT FOR SERVICE*/
      $scope.cost.total = Number(costKey)+Number(costService)+Number(costDelivery);
      if (costService==0 && ($scope.showCount==false || $scope.showCount==true)){
        //alert("FALSE");
        $("#inputService").popover('show');
        $scope.showCount=true;
      }else if (costService>0 && $scope.showCount==true) {
        $("#inputService").popover('hide');
        showCount=false;
      }
      if (costDelivery==0){
        $("#inputDelivery").tooltip('show');
      }else {$("#inputDelivery").tooltip('hide');}
    }

    /**************************************************
    *                                                 *
    *               ALTA DE LLAVE                     *
    *                                                 *
    **************************************************/
    $scope.requestUpKey = function ($http, $scope){
      $http.post(serverHost+serverBackend+"Ticket", $scope._getData2AddKey())
          .then(function (sucess, data) {
              closeAllDiv ();
              cleanForms();
           inform.add('Solicitud realizada con exito. ',{ttl:2000, type: 'success'});
           $scope.dhboard();
           $scope.fnShowHide('home','open');
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
      var newKey =
              {
                    ticket:
                            {
                                idTypeTicketKf    : $scope.tk.idTicket,
                                idUserEnterpriceKf: $scope.tk.idUserEnterpriceKf,
                                idUserTenantKf    : $scope.tk.idTenantKf,
                                idUserAdminKf     : $scope.tk.idUserAdminKf,
                                idOWnerKf         : $scope.tk.idOWnerKf,
                                idProfileKf       : $scope.tk.idProfileKf,
                                numberItemes      : $scope.tk.numberItemes,
                                idTypeDeliveryKf  : $scope.tk.idTypeDeliveryKf,
                                description       : $scope.tk.description,
                                idUserAttendantKf : $scope.tk.idAttendantKf,
                                totalService      : $scope.tk.totalService,
                                idAdressKf        : $scope.tk.idAddresKf,
                                idOtherKf         : $scope.tk.idOtherKf,
                                idDepartmentKf    : $scope.tk.idDepartmentKf,
                                idCompanyKf       : $scope.tk.idCompanyKf,
                                idTypeOfOptionKf  : $scope.tk.idTypeOfOptionKf,
                                thirdPersonNames  : $scope.tk.thirdNames,
                                thirdPersonPhone  : $scope.tk.thirdPhone,
                                thirdPersonId     : $scope.tk.thirdId,
                                idTypeOfKeysKf    : $scope.tk.idTypeOfKeysKf,
                                idUserAttKfDelive : $scope.tk.idUserAttDelivery,
                                sendNotify        : $scope.tk.sendNotify,
                                isNew             : $scope.tk.isNew

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
      //console.log($scope._getData2DelKey())
      $http.post(serverHost+serverBackend+"Ticket", $scope._getData2DelKey())
          .then(function (sucess, data) {
                closeAllDiv();
                cleanForms();
              inform.add('Solicitud realizada con exito. ',{ttl:2000, type: 'success'});
              $scope.modalConfirmation('tdown',0);

        },function (error, data,status) {
                if(status == 404){alert("!Informacion "+status+data.error+"info");}
                else if(status == 203){alert("!Informacion "+status,data.error+"info");}
                else{alert("Error !"+status+" Contacte a Soporte"+"error");}
               
        });
    };
    $scope.select={idTypeLostKf: ''};
    $scope._getData2DelKey={};
    $scope._getData2DelKey = function () {

      var delKey =
              {
                    ticket:
                            {
                                idTypeTicketKf        : $scope.tk.idTicket,
                                idUserEnterpriceKf    : $scope.tk.idUserEnterpriceKf,
                                idUserTenantKf        : $scope.tk.idTenantKf,
                                idUserAdminKf         : $scope.tk.idUserAdminKf,
                                idOWnerKf             : $scope.tk.idOWnerKf,
                                idProfileKf           : $scope.tk.idProfileKf,
                                numberItemes          : $scope.tk.numberItemes,
                                idDepartmentKf        : $scope.tk.idDepartmentKf,
                                description           : $scope.tk.description,
                                idAttendantKf         : $scope.tk.idAttendantKf,
                                idReasonDisabledItemKf: $scope.tk.idReasonDisabledItemKf,
                                itemToDisabled        : $scope.tk.itemToDisabled,
                                idAdressKf            : $scope.tk.idAddresKf,
                                idCompanyKf           : $scope.tk.idCompanyKf,
                                idTypeOfOptionKf      : $scope.tk.idTypeOfOptionKf,
                                sendNotify            : $scope.tk.sendNotify,
                                isNew                 : $scope.tk.isNew
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
      $http.post(serverHost+serverBackend+"Ticket", $scope._getServiceData())
          .then(function (sucess, data) {
              closeAllDiv ();
              cleanForms();
              inform.add('Solicitud realizada con exito. ',{ttl:2000, type: 'success'});
              $scope.fnShowHide('home','open');
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
      var reqService =
              {
                    ticket:
                            {
                                idTypeTicketKf    : $scope.tk.idTicket,
                                idUserCompany     : $scope.tk.idUserCompany,
                                idUserEnterpriceKf: $scope.tk.idUserEnterpriceKf,
                                idUserAdminKf     : $scope.tk.idUserAdminKf,
                                descriptionOrder  : $scope.tk.descriptionOrder,
                                description       : $scope.tk.description,
                                idAdressKf        : $scope.tk.idAddresKf,
                                idCompanyKf       : $scope.tk.idCompanyKf,
                                idTypeServicesKf  : $scope.tk.idTypeServices,
                                sendNotify        : $scope.tk.sendNotify,
                                isNew             : $scope.tk.isNew
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
      $http.post(serverHost+serverBackend+"Ticket", $scope._getData2RequestOther())
          .then(function (sucess, data) {
              closeAllDiv ();
              cleanForms();
              inform.add('Consulta realizada y enviada con exito. ',{
                      ttl:2000, type: 'success'
                 });
              $scope.fnShowHide('home','open');
        },function (error, data,status) {
                if(status == 404){alert("!Informacion "+status+data.error+"info");}
                else if(status == 203){alert("!Informacion "+status,data.error+"info");}
                else{alert("Error !"+status+" Contacte a Soporte"+"error");}
               
        });
    };
    $scope._getData2RequestOther = function () {

      var otherReq =
              {
                    ticket:
                            {
                                idTypeTicketKf      : $scope.tk.idTicket,
                                idUserCompany       : $scope.tk.idUserCompany,
                                idUserEnterpriceKf  : $scope.tk.idUserEnterpriceKf,
                                idOWnerKf           : $scope.tk.idOWnerKf,
                                idTypeOuther        : $scope.tk.idTypeOuther,
                                mailContactConsult  : $scope.tk.mailContactConsult,
                                addressConsul       : $scope.tk.addressConsul,
                                idAdressKf          : $scope.tk.idAddresKf,
                                idCompanyKf         : $scope.tk.idCompanyKf,
                                description         : $scope.tk.description,
                                isNew               : $scope.tk.isNew
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

    $scope.sysConfig = function(value, fnAction){
      $scope.sysReg={};
      $scope.companyFound=false;
      $scope.filterCompanyKf.selected           = undefined;
      $scope.filterAddressKf.selected           = undefined;
      switch (value){
        case "user":
          switch (fnAction){
            case "dash":
              $scope.sysContent = "";
              $scope.loadPagination($scope.listUser);
              $scope.sysContent = 'user';
            break;
            case "openW":
              $('#RegisterModalUser').modal('toggle');
            break;
            default:
          }
        break;
        case "tenant":
          switch (fnAction){
            case "dash":
              $scope.sysContent = "";
              $scope.loadPagination($scope.sysListTenant);
              $scope.sysContent = 'tenant';
            break;
            case "openW":
              $('#RegisterModalUser').modal('toggle');
            break;
            default:
          }
        break;
        case "att":
          switch (fnAction){
            case "dash":
              $scope.sysContent = "";
              $scope.loadPagination($scope.sysListAttendant);
              $scope.sysContent = 'att';
            break;
            case "openW":
              $('#RegisterModalUser').modal('toggle');
            break;
            default:
          }
        break;
        case "company":
          switch (fnAction){
            case "dash":
              $scope.sysContent = "";
              $scope.loadPagination($scope.listCompany);
              $scope.sysContent = 'company';
            break;
            default:
          }
        break;
        case "sys":
          switch (fnAction){
            case "dash":
              $scope.getSysData();
              $scope.getParameter();
              $scope.loadParameter(1, 11,'sysParam');
              $scope.sysContent = 'dashboard';
            break;
            case "openW":
              
            break;
            default:
          }
        break;
        case "smtp":
          if(fnAction=="open"){
            $scope.smtp.mail ="";
            $scope.smtp.password ="";
            $scope.loadParameter(1, 6,'sysParam');
            $('#ModalSMTPEmail').modal('show');
          }
          if(fnAction=="save"){
            $scope.smtpMail="";
            $scope.smtpPwd = "";
            $scope.updateMailSmtp($http, $scope);
          }
        break;
        case "mails":
          if(fnAction=="open"){
            $scope.sys.email ="";
            $scope.loadParameter(1, 6,'sysParam');
            $('#ModalSetupEmail').modal('show');

          }
          if(fnAction=="save"){
              $scope.salesMail    = "";
              $scope.payrollMail  = "";
              $scope.supportMail  = "";
              $scope.adminMail    = "";
            switch ($scope.sys.idTypeOutherKf){
              case "1":
                $scope.sysParam.idParam = 7;
                $scope.sysParam.msg="VENTAS";
              break;
              case "3":
                $scope.sysParam.idParam = 8;
                $scope.sysParam.msg="SERVICIO TECNICO";
              break;
              case "4":
                $scope.sysParam.idParam = 9;
                $scope.sysParam.msg="FACTURACION";
              break;
              case "5":
                $scope.sysParam.idParam = 10;
                $scope.sysParam.msg="ADMINISTRATIVO";
              break;
              default:
            }
            
            $scope.sysParam.value = $scope.sys.email;
            console.log($scope.sys.email);  
            $scope.updateSysParam($http, $scope);
          }
        break;
        case "services":
          if(fnAction=="open"){
            $scope.select.idCompanyKf="";
            $scope.select.idAddressAtt="";
            $('#ModalServiceCost').modal('show');
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
    $scope.filterSelect = function(prop, val){
        return function(item){
          if (item[prop] != val) return true;
        }
    }
   

    /**************************************************************************/
    $scope.filterProfileAtt = function(item){
      //alert($scope.select.idCompanyKf);
      //console.log(item);
      return item.idProfileKf == 6;
    };
    $scope.filterProfileTenant = function(item){
      //alert($scope.select.idCompanyKf);
      //console.log(item);
      return item.idProfileKf == 3 || item.idProfileKf == 5 ;
    };
    /**************************************************************************/
    $scope.getSysData = function(){
      $scope.CallFilterFormT();
      $scope.CallFilterFormU();
    }
    $scope.changeVar = function(sValue){
      if (sValue==1){$scope.changeSmtp=true}
    }
    /**************************************************
    *                                                 *
    *                MAIL PRINCIPAL                   *
    *                                                 *
    **************************************************/
    $scope.smtp={mail: '', password: ''};
    $scope.updateMailSmtp = function ($http, $scope){
      console.log($scope.getSmtpMail2Update());
      $http.post(serverHost+serverBackend+"User/updateMailSmtp", $scope.getSmtpMail2Update())
          .then(function (sucess, data) {
                $scope.smtpPwd="";
                $scope.smtpMail="";
                $scope.sysConfig('sys','dash');
              inform.add('Configuracion de smtp email realizada con exito. ',{
                      ttl:2000, type: 'success'
                 });
              $('#ModalSMTPEmail').modal('hide');
              $('#ModalSMTPEmail').on('hidden.bs.modal', function (e) {
                  $scope.sysConfig('sys','dash');
              }); 
              
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
    *                MAIL ALTERNOS                    *
    *                                                 *
    **************************************************/
    $scope.updateSysParam = function ($http, $scope){
      console.log($scope.getSysParam2Update());
      $http.post(serverHost+serverBackend+"User/updateParam", $scope.getSysParam2Update())
          .then(function (sucess, data) {
                $scope.sysConfig('sys','dash');
              inform.add('Configuracion Satisfactoria del correo del departamento de '+$scope.sysParam.msg,{
                      ttl:2000, type: 'success'
                 });
              $('#ModalSetupEmail').modal('hide');
              $('#ModalSetupEmail').on('hidden.bs.modal', function (e) {
                  $scope.sysConfig('sys','dash');
              }); 
              
        },function (error, data,status) {
                if(status == 404){alert("!Informacion "+status+data.error+"info");}
                else if(status == 203){alert("!Informacion "+status,data.error+"info");}
                else{alert("Error !"+status+" Contacte a Soporte"+"error");}
               
        });
    };

    $scope.getSysParam2Update = function () {

      var sysParam =
              {
                    param:
                            {
                                value       : $scope.sysParam.value,
                                idParam     : $scope.sysParam.idParam
                            }
              };
      return sysParam;
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
      $scope.sysToken = false;
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
        $scope.tmp                        = {};
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
        $scope.chg                        = {newPwd1:'', newPwd2:''}
        $scope.cost                       = {};
        $scope.txt                        = {};
        $scope.filterAddressKf            = {};
        $scope.filterCompanyKf            = {};
        $scope.selectIdAddressKf          = {};
        $scope.sysRegIdAddressKf          = {};
        $scope.selectIdCompanyKf          = {};
        $scope.select                     = {};
        $scope.dptoNotFound               = true;
        $scope.companyFound               = false;
        $scope.recordsFound               = false;
        $scope.rusysconfig                = false;
        $scope.noRecordsFound             = false;
        $scope.formValidated              = false;
        $scope.isEditTenantByAdmin        = false;
        $scope.lostPaswd                  = false;
        $scope.tenantNotFound             = false;
        $scope.isEditTenant               = false;
        $scope.showCount                  = false;
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
        $scope.saveTenant                 = false;
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
        $scope.isAttUpdated               = false;
        $scope.changeSmtp                 = false;
        $scope.isCollapsed                = true;
        $scope.typeOption                 = 0;
        $scope.emailFound                 = false;
        $scope.sendNotify                 = "";
        $scope.companykeychains = {};
        $scope.sysRegidCompanyKf = {};
        $scope.sysReg={};
        $scope.sys = {email: ''};
        $scope.third = {names:'', movilPhone:'', dni:''};
        $scope.sysParam = {idParam: '', value:'', msg: ''};
        $scope.o={idTypeOutherKf: '', email: '', detail: ''};
        $scope.other={idAttendant:'', fullNamesAtt: '', idAddressAtt:'', idTypeAttKf: '',emailAtt:'', phonelocalAtt: '',phoneMovilAtt: '', hoursWork:'', idDepartmentKf: '', descOther:'' };
        $scope.att  ={idAttendant:'', fullNamesAtt: '', idAddressAtt:'', idTypeAttKf: '',emailAtt:'', phonelocalAtt: '',phoneMovilAtt: '', hoursWork:'', idDepartmentKf: '', descOther:'' };
        $scope.t    ={idTenant:'', fullNameTenant:'', idTypeKf:'', phoneNumberTenant:'', phoneNumberContactTenant:'', idDepartmentKf: '', emailTenant:''};
        $scope.tk   ={idTypeTicketKf:'', idUserEnterpriceKf:'', idTenantKf:'', idUserAdminKf:'', idOWnerKf:'', idProfileKf:'', numberItemes:'', idTypeDeliveryKf: '', description:'', TotalService:'', idBranchKf:'', idOtherKf:'',idReasonDisabledItemKf:''  };
        $scope.dh = {filterSearch:'',filterTop:'',filterProfile:'',filterTenantKf: '',filterCompany: '',filterTypeTicket:'',filterAddress:'',filterStatus:'',filterOwnerKf:'',filterIdUser:''};
        $scope.key = {};
        $scope.dataK={keys:[]}; 
        $scope.kItems={keys:[]}; 
        $scope.sysCheckResult = false;
        $scope.searchMyDeptos = false;
        $scope.newDeparment   = false;

        /******Config Var*******/
        $scope.contentUser                = false;
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
      $scope.rucompany    = false;
      /* Variables usadas en las solicitudes */
      $scope.btnBack=false;
      $scope.btnShow=true;
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
      $('.jumbotron [id^="m_"]').removeClass('active');
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
                $scope.chg = {newPwd1:'', newPwd2:''}
                $('#PasswdModalUser').modal('toggle');
              }else{
                closeAllDiv();
              }
          break;
          case "rucompany":
              if(divAction=="open"){
                $('#ProfileModalCompany').modal('toggle');
                $scope.rucompany = true;
              }
          break;
          case "rukeyup":
                $('#m_pedidos').addClass('active');
                closeAllDiv();
                cleanForms();
                $scope.IsTicket = true;
                $scope.manageDepto = 0;
              if(divAction=="open"){
                if($scope.sessionidProfile!=1) {$scope.CompanyName=$scope.sessionNameCompany}
                if($scope.sessionidProfile==4) {$scope.officeListByCompnayID($scope.sessionidCompany);}
                if ($scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)){
                  $scope.getAllAddressByIdTenant();
                  selectSwitch ('t');
                }else if ($scope.sessionidProfile==5 ||($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){ 
                  selectSwitch ('i');
                  $scope.refresSession($scope.sessionMail);
                  $scope.getAllAddressByIdTenant();
                }else{$scope.rukeyup = true; selectSwitch ('t');}
                  
              }else{
                closeAllDiv();
              }
          break;
          case "rukeydown":
              $('#m_pedidos').addClass('active');
              closeAllDiv();
              cleanForms();
              $scope.IsTicket = true;
              $scope.manageDepto = 0;
            if(divAction=="open"){
              if($scope.sessionidProfile!=1) {$scope.CompanyName=$scope.sessionNameCompany;}
              if($scope.sessionidProfile==4) {$scope.officeListByCompnayID($scope.sessionidCompany);}
              if ($scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)){
                  $scope.getAllAddressByIdTenant();
                  selectSwitch ('t');
                }else if ($scope.sessionidProfile==5 ||($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){ 
                  selectSwitch ('i');
                  $scope.refresSession($scope.sessionMail);
                  $scope.getAllAddressByIdTenant();
                }else{$scope.rukeydown = true; selectSwitch ('t');}
            }else{
              closeAllDiv();
            }
          break;
          case "ruservice":
              $('#m_pedidos').addClass('active');
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
              $('#m_pedidos').addClass('active');
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
              $('#m_contact').addClass('active');
              closeAllDiv();
            if(divAction=="open"){
              $scope.rucontact = true;
            }else{
              closeAllDiv();
              $scope.rucontact = false;
            }
          break;
          case "managedepto":
              $('#m_depto').addClass('active');
              closeAllDiv();
              cleanForms();
              $scope.manageDepto = 1;
            if(divAction=="open"){
              if($scope.sessionidProfile!=1) {$scope.CompanyName=$scope.sessionNameCompany}
              if($scope.sessionidProfile==4) {$scope.officeListByCompnayID($scope.sessionidCompany);}
              if ($scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)){
                $scope.getAllAddressByIdTenant();
                $scope.rudepto = true;
              }else if ($scope.sessionidProfile==5 ||($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){ 
                $scope.rudepto = true;
                $scope.refresSession($scope.sessionMail);
                $scope.idAddressAtt=$scope.sessionNameAdress;
                $scope.namesTenant=$scope.sessionNames;
                $scope.deptoTenant=$scope.getDeptoName($scope.sessionIdDeparmentKf);
              }else{$scope.rudepto = true;}
                
            }else{
              closeAllDiv();
            }
          break;
          case "home":
              $('#m_monitor').addClass('active');
              closeAllDiv();
              cleanForms();
            if(divAction=="open"){
              if($scope.sessionidProfile!=1) {$scope.CompanyName=$scope.sessionNameCompany;};
              if ($scope.sessionidProfile==3 || $scope.sessionidProfile==5 || $scope.sessionidProfile==6){
                $scope.getAllAddressByIdTenant();
              }else {$scope.home = true;}
              //selectSwitch ('t');
            }else{
              closeAllDiv();
            }        
          break;
          case "frmcost":
              $('#m_pedidos').addClass('active');
              closeAllDiv();
              cleanForms();
            if(divAction=="open"){
              if($scope.sessionidProfile!=1) {$scope.CompanyName=$scope.sessionNameCompany;}
              if($scope.sessionidProfile==4) {$scope.officeListByCompnayID($scope.sessionidCompany);}
              if ($scope.sessionidProfile==3 || $scope.sessionidProfile==6){
                  $scope.getAllAddressByIdTenant();
                  $scope.rucost = true;
                  selectSwitch ('t');
                }else if ($scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){ 
                  selectSwitch ('i');
                  $scope.rucost = true;
                  $scope.idAddressAtt=$scope.sessionNameAdress;
                  $scope.namesTenant=$scope.sessionNames;
                  $scope.getKeyChains($scope.sessionidAddress); 
                  $scope.getCostServiceData(3, $scope.sessionidAddress);
                  }else{$scope.rucost = true;}
            }else{
              closeAllDiv();
            }
          break;
          case "sysConfig":
              $('#m_config').addClass('active');
              closeAllDiv();
              cleanForms();
              $scope.IsSystem=true;
              $scope.manageDepto = 0;
            if(divAction=="open"){
              $scope.sysConfig('sys','dash');
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

    /**************************************************/

    /**************************************************
    *                                                 *
    *    COMPARE TICKET DATE BETWEEN CURRENT DATE     *
    *                                                 *
    **************************************************/


    $scope.milisecondsPerDay = 1000 * 60 * 60 * 24;

    $scope.compareDaysIn2Dates = function(b){
      var day1 = new Date(b);
      var day2 = new Date();
      var utc1 = Date.UTC(day1.getFullYear(), day1.getMonth(), day1.getDate());
      var utc2 = Date.UTC(day2.getFullYear(), day2.getMonth(), day2.getDate());

       $scope.differentDays=Math.floor((utc2 - utc1) / $scope.milisecondsPerDay);
       console.log($scope.differentDays);

    }

    /**************************************************/

    /**************************************************
    *                                                 *
    *                    DASHBOARD                    * 
    *                                                 *
    **************************************************/
    $scope.listTickt = 0;
    $scope.filters={idTypeTicketKf: '', topDH: '', searchFilter:'', idCompany: '', idAddress: '', idStatusKf: ''};

    $scope.dhboard = function(){
    /******************************
    *                             *
    *       FILTER VARIABLES      *
    *                             *
    ******************************/
    //$scope.filters.idTypeTicketKf= !$scope.filters.idTypeTicketKf ? 0 : $scope.filters.idTypeTicketKf;
    //$scope.dh.filterAddress = 0;

    $scope.filters.idAddress   = ($scope.sessionidProfile==1 && $scope.dh.filterCompany!=$scope.select.idCompanyKf) || ($scope.sessionidProfile==4 && $scope.dh.filterCompany!=$scope.sessionidCompany) ? 0 : $scope.filters.idAddress;
    $scope.dh.filterAddress    = $scope.filters.idAddress;
    $scope.dh.filterSearch     = $scope.filters.searchFilter;
    $scope.dh.filterTop        = $scope.filters.topDH;
    $scope.dh.filterProfile    = $scope.sessionidProfile;
    $scope.dh.filterTenantKf   = $scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2) ?$scope.sessionIdUser:'';
    $scope.dh.filterCompany    = $scope.sessionidProfile == 2 || $scope.sessionidProfile == 4 ? $scope.sessionidCompany : $scope.select.idCompanyKf;
    $scope.dh.filterTypeTicket = $scope.filters.idTypeTicketKf;
    $scope.dh.filterStatus     = $scope.filters.idStatusKf;
    $scope.dh.filterOwnerKf    = $scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)?$scope.sessionIdUser:'';
    $scope.dh.filterIdUser     = $scope.sessionidProfile!=1 && $scope.sessionidProfile!=2 && $scope.sessionidProfile!=4?$scope.sessionIdUser:'';
      $searchFilter= 
      {
           idUser            : $scope.dh.filterIdUser,
           idOWnerKf           : $scope.dh.filterOwnerKf,
           searchFilter        : $scope.dh.filterSearch,
           topFilter           : $scope.dh.filterTop, 
           idProfileKf         : $scope.dh.filterProfile,
           idUserTenantKf      : $scope.dh.filterTenantKf,  
           idCompanyKf         : $scope.dh.filterCompany,
           idTypeTicketKf      : $scope.dh.filterTypeTicket,
           idAdress            : $scope.dh.filterAddress,
           idStatusTicketKf    : $scope.dh.filterStatus
      }
      //console.log($scope.sessionIdUser);
      //console.log($searchFilter);
      $http.post(serverHost+serverBackend+"Ticket/all", $searchFilter, setHeaderRequest)
      .then(function (sucess, data) {
             $scope.listTickt =  sucess.data.response;
             $scope.totalTickets = $scope.listTickt.length;

        },function (error, data,status) {
            if(error.status == 203 || error.status == 404){
              console.log("Error Codigo["+error.status+"] - "+error.data.error);
              $scope.listTickt =  "";
              $scope.totalTickets = 0;
            }else if(error.status==500){
              console.log("505: Internal Server Error")
              //console.log(error.data.error);
              $scope.listTickt =  "";
              $scope.totalTickets = 0;
            }
            if($scope.counterInformShow==1){
              inform.add('['+error.status+']: '+error.data.error,{
                      ttl:5000, type: 'warning'
              });
            }
            $scope.counterInformShow=1;
        });
    }

    $scope.cancelTicket = function(idTicket){
      if (confirm("Confirme Para Cancelar el Ticket!") == true) {
        $http({
          method : "GET",
          url : serverHost+serverBackend+"Ticket/cancel/"+idTicket
        }).then(function mySuccess(response) {
            $scope.dhboard();
          }, function myError(response) {
        });
      } else {
        
      } 
    }

    $scope.greaterThan = function(prop, val){
        return function(item){
          if (item[prop] > val) return true;
        }
    }

    $scope.checkBefore2Load = function(){
      $scope.refresSession($scope.sessionMail);
      cleanForms();
      if ($scope.sessionidProfile==3 || $scope.sessionidProfile==5 || $scope.sessionidProfile==6){
                $scope.getAllAddressByIdTenant();
      }
      $scope.companyN = $scope.sysLoggedUser.nameCompany;
        $scope.fnShowHide('home', 'open');
    }
     /*MOSTRAR EL MONITOR ACTIVO SIEMPRE AL ENTRAR AL SISTEMA*/









    $scope.fnLoadPhoneMask = function(){
        /**********************************************
        *               INPUT PHONE MASK              *
        **********************************************/
        $('.input--movil').mask('9999999999999999999999999');
        $('.input--local').mask('9999999999999999999999999');
        $('.input--dni').mask('99999999');
        $('.input--tel.input--dni').on('focus', function () {
          console.log($(this).val())
           if ($(this).val().length === 0) {
             $(this).val();
           }
        });
        
        $('.input--tel.input--dni').keydown(function (e) {
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
    var open = $('.open-nav'),
        close = $('.close'),
        overlay = $('.overlay');

    open.click(function() {
        overlay.show();
        $('#wrapper').addClass('toggled');
    });

    close.click(function() {
        overlay.hide();
        $('#wrapper').removeClass('toggled');
    });






}); /*Cierre del JS ANGULAR*/
































