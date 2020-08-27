var moduleMainApp = angular.module("module.MainCtrl", ["tokenSystem", 
                                                         "ngAnimate", 
                                                        "ngSanitize", 
                                                      "ui.bootstrap", 
                                                     "services.User",
                                                 "services.Profiles",
                                                 "services.Products",  
                                                   "services.Ticket", 
                                                  "services.Address",
                                                "services.Customers", 
                                               "systemServices.Mail",  
                                                         "ui.select",
                                                 "angularFileUpload", 
                                                "services.Utilities",
                                                       "ngclipboard",
                                                     "Service.Pager",
                             "angularUtils.directives.dirPagination",                                                     
                                                         "ngCookies"]);
/*FILTERS & DIRECTIVES */
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
  app.filter('commaToDecimal', function(){
      return function(value) {
          return value ? parseFloat(value).toFixed(2).toString().replace('.', ',') : null;
      };
  });
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
  moduleMainApp.directive('allowTyping', function () {
    return {
      restrict : 'A',
      link : function(scope, elem, attrs, ctrl) {
        var regex = attrs.allowTyping;
        elem.bind('keypress', function(event) {
          var pos =  event.target.selectionStart;
          var oldViewValue = elem.val();
          var input = newViewValue(oldViewValue, pos, event.key);
          console.log(input);
          var validator = new RegExp(regex);
          if (!validator.test(input)) {
            event.preventDefault();
            return false;
          }
        });
          function newViewValue(oldViewValue, pos, key) {
            if (!oldViewValue) return key;
            return   [oldViewValue.slice(0, pos), key, oldViewValue.slice(pos)].join('');
          } 
      }
    };
  });
  moduleMainApp.directive('limitLength', function () {
    return {
      restrict: "A",
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        attrs.$set("ngTrim", "false");
        var limitLength = parseInt(attrs.awLimitLength, 10);// console.log(attrs);
        scope.$watch(attrs.ngModel, function(newValue) {
          if(ngModel.$viewValue.length>limitLength){
            ngModel.$setViewValue( ngModel.$viewValue.substring(0, limitLength ) );
            ngModel.$render();
          }
        });
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
  moduleMainApp.directive('showCode', function () {
    return {
      scope: {
        jsFile: '@',
        htmlFile: '@'
      },
      templateUrl: 'show-code.html'
    };
  });

  moduleMainApp.directive('clickableLabel', function () {
    return {
      restrict: 'E',
      scope: {label: '='},
      replace: true,
      template: "<button ng-click='onclick(label)' style='cursor: pointer;'>click me - {{label}}</button>",
      link: function (scope, elem, attrs) {
        scope.onclick = function (label) {
          alert("I'm " + label);
        };
      }
    };
  });
  moduleMainApp.filter('unique', function () {

      return function (items, filterOn) {

          if (filterOn === false) {
              return items;
          }

          if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
              var hashCheck = {}, newItems = [];

              var extractValueToCompare = function (item) {
                  if (angular.isObject(item) && angular.isString(filterOn)) {
                      return item[filterOn];
                  } else {
                      return item;
                  }
              };

              angular.forEach(items, function (item) {
                  var valueToCheck, isDuplicate = false;

                  for (var i = 0; i < newItems.length; i++) {
                      if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                          isDuplicate = true;
                          break;
                      }
                  }
                  if (!isDuplicate) {
                      newItems.push(item);
                  }

              });
              items = newItems;
          }
          return items;
      };
  });

//Controller.$inject = ['$scope'];
moduleMainApp.controller('MainAppCtrl',  function($route, $scope, $location, $anchorScroll, $filter, $http, blockUI, $timeout, inform, inputService, userServices, ProfileServices, ProductsServices, ticketServices, addressServices, tokenSystem, mailServices, CustomerServices, serverHost, serverBackend, $window, FileUploader, UtilitiesServices, PagerService, $cookies){
    /**************************************************************/
      $scope.redirectSuccessfull = false;
      $scope.counT  =5;
      $scope.redirect ="#/login";
      tokenSystem.destroyTokenStorage(4);
      $scope.sysToken             = tokenSystem.getTokenStorage(1);
      $scope.sysLoggedUser        = tokenSystem.getTokenStorage(2);
      $scope.sysLoggedUserModules = tokenSystem.getTokenStorage(6);
      $scope.sysModules = {'idMonitor':false, 'idLlaveros':false, 'idEdificios':false, 'idConfiguracion':false, 'idPerfilUsuario':false, 'idCliente':false, 'idServicio':false, 'idProducto': false};
      for (var key in $scope.sysLoggedUserModules){
        switch ($scope.sysLoggedUserModules[key].idModuleFk){
          case "1":
            $scope.sysModules.idMonitor=true;
          break;
          case "2":
            $scope.sysModules.idLlaveros=true;
          break;
          case "3":
            $scope.sysModules.idEdificios=true;
          break;
          case "4":
            $scope.sysModules.idConfiguracion=true;
          break;
          case "5":
            $scope.sysModules.idPerfilUsuario=true;
          break;
          case "6":
            $scope.sysModules.idCliente=true;
          break;
          case "7":
            $scope.sysModules.idServicio=true;
          break;
          case "8":
            $scope.sysModules.idProducto=true;
          break;
          default:
        }
      }
      //console.log($scope.sysModules);
      //console.log($scope.sysLoggedUserModules);
      //$cookies.__SESSION = $scope.sysLoggedUser;
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
          //console.log("[selectTableRow]->item.idDepartment: "+idDeptoKf);
            if ($scope.dayDataCollapse === 'undefined') {
                $scope.dayDataCollapse = $scope.dayDataCollapseFn();
            } else {
                //console.log('Variable tableRowExpanded: '+$scope.tableRowExpanded);
                //console.log('Variable tableRowIndexCurrExpanded: '+$scope.tableRowIndexCurrExpanded);
                if ($scope.tableRowExpanded === false && $scope.tableRowIndexCurrExpanded === "") {
                    $scope.tableRowIndexPrevExpanded = "";
                    $scope.tableRowExpanded = true;
                    $scope.tableRowIndexCurrExpanded = $scope.vIndex;
                    //console.log('Id del Departamento: '+idDeptoKf+' / Index Id de la tabla: ' +$scope.vIndex);
                    $scope.searchTenant('listTenant', idDeptoKf);
                } else if ($scope.tableRowExpanded === true) {
                    if ($scope.tableRowIndexCurrExpanded === $scope.vIndex) {
                        $scope.tableRowExpanded = false;
                        $scope.tableRowIndexCurrExpanded = "";
                        //console.log('Id del Departamento: '+idDeptoKf+' / Index Id de la tabla: ' +$scope.vIndex);
                        //console.log("ENTRO EN EL ROWEXPANDED TRUE")
                        $scope.dayDataCollapse[$scope.vIndex] = true;
                        $scope.vIndex =null;
                    } else {
                        $scope.tableRowIndexPrevExpanded = $scope.tableRowIndexCurrExpanded;
                        $scope.tableRowIndexCurrExpanded = $scope.vIndex;
                        //console.log("ENTRO EN EL ELSE DEL ROWEXPANDED")
                        $scope.searchTenant('listTenant', idDeptoKf);
                        $scope.dayDataCollapse[$scope.tableRowIndexPrevExpanded] = true;
                        $scope.dayDataCollapse[$scope.tableRowIndexCurrExpanded] = false;
                    }
                } 
            }
        };
    /**************************************************/
    /********************************************************************************************************************************************
    *                                                                                                                                           *
    *                                                                                                                                           *
    *                                                             P A G I N A C I O N                                                           *
    *                                                                                                                                           *
    *                                                                                                                                           *
    ********************************************************************************************************************************************/
     
      $scope.loadPagination = function(item, orderBy, itemsByPage){
        //console.log("[loadPagination]");
        //console.log(item);
        var sortingOrder     = orderBy;
        var itemsPerPage     = itemsByPage;
        $scope.sortingOrder  = sortingOrder;
        $scope.reverse       = false;
        $scope.filteredItems = [];
        $scope.groupedItems  = [];
        $scope.itemsPerPage  = itemsPerPage;
        $scope.pagedItems    = [];
        $scope.currentPage   = 0;
        $scope.items         = [];
        $scope.items         = item;
        //console.log($scope.items);
        $scope.search();
      }
      

        // init the filtered items
        $scope.search = function (qvalue, vStrict) {          
            var queryValue = !qvalue?"Empty":qvalue;
              //console.log("[search]-->qvalue: "+queryValue);
              //console.log("[search]-->vStrict: "+vStrict);
              $scope.filteredItems = $filter("filter")($scope.items, qvalue, vStrict);
            //console.log($scope.filteredItems);
            // take care of the sorting order
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter("orderBy")($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
                //console.log($scope.filteredItems);
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
                //console.log($scope.pagedItems[Math.floor(i / $scope.itemsPerPage)]);
            }
            //console.log($scope.pagedItems);
            //console.log("PAGINATION LOADED");
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
            console.clear();
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
      $scope.pasos4= [
                    'PASO 1',
                    'PASO 2',
                    'DEPARTAMENTOS',
                    'FINALIZAR'
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
        }else if($scope.fSwitch=="c"){
          $scope.pasos=$scope.pasos4;
        }
        $scope.mySwitch = $scope.pasos[0];
        //console.log($scope.mySwitch);
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
        // Return true if there is a previous step, false if not
        return !_.isUndefined($scope.pasos[previousStep]);
      };

      $scope.incrementStep = function() {
        
        console.log("$scope.hasNextStep:"+$scope.hasNextStep())
        if ( $scope.hasNextStep() )
        {
          //console.log("$scope.getCurrentStepIndex:"+$scope.getCurrentStepIndex())
          var stepIndex = $scope.getCurrentStepIndex();
          var nextStep = stepIndex + 1;
          //console.log("nextStep: "+nextStep);
          $scope.stepIndexTmp = nextStep;
          //console.log("$scope.customer.update.idClientTypeFk: "+$scope.customer.update.idClientTypeFk)
          //console.log("$scope.customer.new.idClientTypeFk: "+$scope.customer.new.idClientTypeFk)
          if (($scope.customer.new.idClientTypeFk!=2 && $scope.customer.update.idClientTypeFk!=2) && nextStep==2){

            $scope.mySwitch = $scope.pasos[3];
            //console.log("entro al if  => "+$scope.mySwitch);
            nextStep=3;
          }else{
            //console.log("$scope.mySwitch => "+$scope.pasos[nextStep]);
            $scope.mySwitch = $scope.pasos[nextStep];
          }
          $scope.formValidated=false;
          $scope.btnBack=true;
          if($scope.fSwitch=="t"){
            if(nextStep>1){
              $scope.btnShow=false;
            }
          }else if($scope.fSwitch=="c"){
            //console.log("incrementStep: "+nextStep);
            if(nextStep>2){
              $scope.btnShow=false;
            }
          }else{
            if(nextStep==1){
              $scope.btnShow=false;
            }
          }
        }else{
          //console.log("$scope.hasNextStep:"+$scope.hasNextStep())
        }
      };

      $scope.decrementStep = function() {
        if ( $scope.hasPreviousStep() )
        {
          var stepIndex = $scope.getCurrentStepIndex();
          var previousStep = stepIndex - 1;
          $scope.stepIndexTmp = previousStep;
          if (($scope.customer.new.idClientTypeFk!=2 && $scope.customer.update.idClientTypeFk!=2) && previousStep==2){
            $scope.mySwitch = $scope.pasos[1];
          }else{
             $scope.mySwitch = $scope.pasos[previousStep];
          }
          $scope.formValidated=true;
          $scope.btnShow=true;
          if(previousStep<1){$scope.btnBack=false;}
        }
      };
      $scope.enabledNextBtn=function(item){
        //console.clear();
        $scope.select.idAddressAtt = !$scope.select.idAddressAtt?$scope.selectIdAddressKf.selected:$scope.select.idAddressAtt;
        $scope.formValidated=false;
        //console.log($scope.select.idAddressAtt);
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
              }else if ($scope.fSwitch=="c"){
                //console.log("ARRAY FIELDS");
                //console.log($scope.customer);
                //console.log("PHONE LIST");
                //console.log($scope.list_phones);
                //console.log("SCHEDULE LIST");
                //console.log($scope.list_schedule_atention);
                //$scope.customer.select.main = {'address':{}, 'department':{}, 'province':{}, 'location':{}}
                if($scope.isNewCustomer){
                    if($scope.customer.new.idClientTypeFk==1 || $scope.customer.new.idClientTypeFk==3){//ADMINISTRATION OR COMPANY CUSTOMER
                      //console.log("Validation Customer :::> Administration or Company [ok] ");
                        //console.log("Form Step :::> 1 [ok] ");
                        if($scope.customer.new.typeInmueble!=undefined && $scope.customer.new.name!='' && $scope.customer.new.idAgent!='' && $scope.customer.new.razonSocial!='' && 
                            $scope.customer.new.cuit!='' && ($scope.customer.new.idZonaFk!='' && $scope.customer.new.idZonaFk!=undefined) && $scope.list_schedule_atention.length>=1){
                            //console.log("First inputs :::> [ok] ");
                            if($scope.customer.new.typeInmueble==1){ //Validacion si es Inmueble :::>Department
                                console.log("Inmueble :::> Department [ok] ");
                                if (!$scope.customer.new.isNotCliente){
                                    //console.log("Building not registered :::> [ok] ");
                                    if ($scope.customer.select.main.location.selected!=undefined && $scope.customer.select.main.province.selected!=undefined && $scope.customer.new.nameAddress!='' && $scope.customer.new.floor!='' && $scope.customer.new.depto!=''){
                                      $scope.formValidated=true;
                                      //console.log("Address inputs :::> [ok] ");
                                      //console.log("$scope.formValidated: New "+$scope.formValidated);
                                    }else{
                                        //console.log("Address inputs :::> [Fail] ");
                                        $scope.formValidated=false;
                                    }
                                }else{
                                  //console.log("Building registered :::> [ok] ");
                                  //console.info($scope.customer.select.main.department);
                                  if (($scope.customer.select.main.department!=undefined && $scope.customer.select.main.department!='')  && $scope.customer.select.main.address.selected!=undefined){
                                    //console.log("Building Address :::> [ok] ");
                                    $scope.formValidated=true;
                                    //console.log("$scope.formValidated: New "+$scope.formValidated);
                                  }else{
                                    //console.log("Building Address :::> [Fail] ");
                                      $scope.formValidated=false;
                                  }
                                }
                            }else if($scope.customer.new.typeInmueble>1){ //Validacion si es Inmueble :::> Local/Casa
                                console.log("Inmueble :::> Local/Casa [ok] ");
                                if ($scope.customer.select.main.location.selected!=undefined && $scope.customer.select.main.province.selected!=undefined && $scope.customer.new.nameAddress!=''){
                                    $scope.formValidated=true;
                                    //console.log("$scope.formValidated: New "+$scope.formValidated);
                                }else{
                                      
                                      $scope.formValidated=false;
                                }
                            }
                        }else{
                            console.log("First inputs :::> [Fail] ");
                           $scope.formValidated=false;
                        }
                    }else if($scope.customer.new.idClientTypeFk==2){//BUILDING CUSTOMER
                      //console.log("Validation Customer :::> Edificio [ok] ");
                      if ($scope.stepIndexTmp==0){
                        //console.log("Form Step :::> 1 [ok] ");
                        if($scope.customer.select.company.selected!=undefined && ($scope.customer.new.idZonaFk!='' && $scope.customer.new.idZonaFk!=undefined) && $scope.list_schedule_atention.length>=1 && 
                           $scope.customer.select.main.location.selected!=undefined && $scope.customer.select.main.province.selected!=undefined  && ($scope.customer.new.nameAddress!='' && $scope.addrrSelected)) {
                            $scope.formValidated=true;
                            //console.log("First Steps inputs :::> [ok] ");
                        }else{
                            //console.log("First Steps inputs :::> [Fail] ");
                           $scope.formValidated=false;
                        }
                      }
                    }else if($scope.customer.new.idClientTypeFk==4){//BRANCH CUSTOMER
                      console.log("Validation Customer :::> Branch [ok] ");
                      if ($scope.stepIndexTmp==0){
                        //console.log("Form Step :::> 1 [ok] ");
                        if($scope.customer.new.typeInmueble!=undefined && $scope.customer.select.company.selected!=undefined && ($scope.customer.new.idZonaFk!='' && $scope.customer.new.idZonaFk!=undefined) && $scope.list_schedule_atention.length>=1) {
                            //console.log("First inputs :::> [ok] ");
                            if($scope.customer.new.typeInmueble==1){
                              //console.log("Inmueble :::> Department [ok] ");
                              if (!$scope.customer.new.isNotCliente){
                                  //console.log("Building not registered :::> [ok] ");
                                  if ($scope.customer.select.main.location.selected!=undefined && $scope.customer.select.main.province.selected!=undefined && $scope.customer.new.nameAddress!='' && $scope.customer.new.floor!='' && $scope.customer.new.depto!=''){
                                    $scope.formValidated=true;
                                    //console.log("Address inputs :::> [ok] ");
                                    ////console.log("$scope.formValidated: New "+$scope.formValidated);
                                  }else{
                                      //console.log("Address inputs :::> [Fail] ");
                                      $scope.formValidated=false;
                                  }
                              }else{
                                //console.log("Building registered :::> [ok] ");
                                //console.info($scope.customer.select.main.department);
                                if (($scope.customer.select.main.department!=undefined && $scope.customer.select.main.department!='')  && $scope.customer.select.main.address.selected!=undefined){
                                  //console.log("Building Address :::> [ok] ");
                                  $scope.formValidated=true;
                                  //console.log("$scope.formValidated: New "+$scope.formValidated);
                                }else{
                                  //console.log("Building Address :::> [Fail] ");
                                    $scope.formValidated=false;
                                }
                              }
                            }else if($scope.customer.new.typeInmueble>1){
                              console.log("Inmueble :::> Local/Casa [ok] ");
                              if ($scope.customer.select.main.location.selected!=undefined && $scope.customer.select.main.province.selected!=undefined && $scope.customer.new.nameAddress!=''){
                                  $scope.formValidated=true;
                                  //console.log("$scope.formValidated: New "+$scope.formValidated);
                                }else{
                                    $scope.formValidated=false;
                                }
                            }
                        }else{
                            console.log("First inputs :::> [Fail] ");
                           $scope.formValidated=false;
                        }
                      }
                    }else if($scope.customer.new.idClientTypeFk==5){//PARTICULAR CUSTOMER
                      //console.log("Validation Customer :::> Particular [ok] ");
                      if ($scope.stepIndexTmp==0){
                        //console.log("Form Step :::> 1 [ok] ");
                        //console.log($scope.customer.new);
                        if($scope.customer.new.name!='' && $scope.customer.new.idAgent!='' && 
                          $scope.customer.new.mail!='' && ($scope.customer.new.localPhone!='' || $scope.customer.new.mobile!='')){
                            //console.log("First inputs :::> [ok] ");
                            if($scope.list_address_particular.length>=1){
                              //console.log("Address inputs :::> [ok] ");
                              $scope.formValidated=true;
                            }else{
                              //console.log("Address inputs :::> [Fail] ");
                              $scope.formValidated=false;
                            }
                        }else{
                          $scope.formValidated=false;
                          //console.log("$scope.formValidated: New "+$scope.formValidated);
                        }
                      }
                    }else{
                        //console.log("First inputs :::> [Fail] ");
                       $scope.formValidated=false;
                    }
                }else{
                  if($scope.customer.update.nameLocation!='' && $scope.customer.update.nameState!='' && $scope.customer.update.nameAddress!='' && $scope.customer.update.cuit!='' &&
                      $scope.customer.update.razonSocial!='' && $scope.customer.update.idAgent!='' && $scope.customer.update.name!='' && $scope.customer.update.idClientTypeFk!='' &&
                      $scope.list_phones.length>=1 && ($scope.list_schedule_atention.length>=1 || $scope.customer.update.list_schedule_atention.length>=1) && 
                      ($scope.customer.update.mailFronKey!='' && $scope.customer.update.mailFronKey!=undefined) &&
                      ($scope.customer.update.mailServiceTecnic!='' && $scope.customer.update.mailServiceTecnic!=undefined) &&
                      ($scope.customer.update.mailCollection!='' && $scope.customer.update.mailCollection!=undefined)){
                      $scope.formValidated=true;
                      console.log("$scope.formValidated: Update "+$scope.formValidated);
                  }else{

                      $scope.formValidated=false;
                  }
                }
              }
          break;
          case 1:
            $scope.typeOption = item;
            //console.log("$scope.typeOption: "+$scope.typeOption);
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
                        console.log($scope.select.nameAtt);
                        $scope.formValidated=true;
                      }
                    }else{
                      console.log($scope.typeOption);
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
            }else if ($scope.fSwitch=="c"){
              if ($scope.isNewCustomer){
                if ($scope.customer.new.idClientTypeFk==1 ){//ADMINISTRATION CUSTOMER
                      //console.log("Validation Customer :::> Administration [ok] ");
                      //console.log("Form Step :::> 2 [ok] ");
                      if (($scope.list_mails_contact.length>=3) &&
                          $scope.list_phones.length>=1)
                      {
                           $scope.formValidated=true;
                         //console.log("Form Step Validation :::> 2 [ok] ");
                      }else{
                          console.log("Form Step Validation :::> [Fail] ");
                          $scope.formValidated=false;  
                      }
                }else if ($scope.customer.new.idClientTypeFk==2){//BUILDING CUSTOMER
                      console.log("Validation Customer :::> Building [ok] ");
                      console.log("Form Step :::> 2 [ok] ");
                      if ($scope.list_mails_contact.length>=3)
                      {
                           $scope.formValidated=true;
                          console.log("Form Step Validation :::> 2 [ok] ");
                      }else{
                          console.log("Form Step Validation :::> [Fail] ");
                          $scope.formValidated=false;  
                      }
                }else if ($scope.customer.new.idClientTypeFk==3){//COMPANY CUSTOMER
                      //console.log("Validation Customer :::> Company [ok] ");
                      //console.log("Form Step :::> 2 [ok] ");
                      if (($scope.list_mails_contact.length>=2) &&
                          $scope.list_phones.length>=1)
                      {
                           $scope.formValidated=true;
                         //console.log("Form Step Validation :::> 2 [ok] ");
                      }else{
                          //console.log("Form Step Validation :::> [Fail] ");
                          $scope.formValidated=false;  
                      }
                }else if ($scope.customer.new.idClientTypeFk==4){//BRANCH CUSTOMER
                      console.log("Validation Customer :::> Branch [ok] ");
                      console.log("Form Step :::> 2 [ok] ");
                      if (($scope.list_mails_contact.length>=2))
                      {
                           $scope.formValidated=true;
                         console.log("Form Step Validation :::> 2 [ok] ");
                      }else{
                          console.log("Form Step Validation :::> [Fail] ");
                          $scope.formValidated=false;  
                      }
                }
              }else{

              }
            }
          break;
          case 2:
            $scope.typeOption = item;
            //console.log("$scope.typeOption: "+$scope.typeOption);
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
                        console.log($scope.select.nameAtt);
                        $scope.formValidated=true;
                      }
                    }else{
                      console.log($scope.typeOption);
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
            }else if ($scope.fSwitch=="c"){
              if ($scope.isNewCustomer){
                if ($scope.customer.new.idClientTypeFk==1 ){//ADMINISTRATION CUSTOMER
                      //console.log("Validation Customer :::> Administration [ok] ");
                      //console.log("Form Step :::> 2 [ok] ");
                      if (($scope.list_mails_contact.length>=3) &&
                          $scope.list_phones.length>=1)
                      {
                           $scope.formValidated=true;
                         //console.log("Form Step Validation :::> 2 [ok] ");
                      }else{
                          console.log("Form Step Validation :::> [Fail] ");
                          $scope.formValidated=false;  
                      }
                }else if ($scope.customer.new.idClientTypeFk==2){//BUILDING CUSTOMER
                      console.log("Validation Customer :::> Building [ok] ");
                      console.log("Form Step :::> 3 [ok] ");
                      if ($scope.list_depto_floors.length>0)
                      {
                           $scope.formValidated=true;
                          console.log("Form Step Validation :::> 3 [ok] ");
                      }else{
                          console.log("Form Step Validation :::> [Fail] ");
                          $scope.formValidated=false;  
                      }
                }else if ($scope.customer.new.idClientTypeFk==3){//COMPANY CUSTOMER
                      //console.log("Validation Customer :::> Company [ok] ");
                      //console.log("Form Step :::> 2 [ok] ");
                      if (($scope.list_mails_contact.length>=2) &&
                          $scope.list_phones.length>=1)
                      {
                           $scope.formValidated=true;
                         //console.log("Form Step Validation :::> 2 [ok] ");
                      }else{
                          //console.log("Form Step Validation :::> [Fail] ");
                          $scope.formValidated=false;  
                      }
                }else if ($scope.customer.new.idClientTypeFk==4){//BRANCH CUSTOMER
                      console.log("Validation Customer :::> Branch [ok] ");
                      console.log("Form Step :::> 2 [ok] ");
                      if (($scope.list_mails_contact.length>=2) &&
                          $scope.list_phones.length>=1)
                      {
                           $scope.formValidated=true;
                         console.log("Form Step Validation :::> 2 [ok] ");
                      }else{
                          console.log("Form Step Validation :::> [Fail] ");
                          $scope.formValidated=false;  
                      }
                }
              }else{

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
           $scope.sessionidTenantUser         = $scope.sysLoggedUser.idProfileKf==3 || ($scope.sysLoggedUser.idProfileKf==6 && $scope.sysLoggedUser.idTypeTenantKf==1)?'':$scope.sysLoggedUser.idUser;
           $scope.sessionidTypeTenant         = $scope.sysLoggedUser.idTypeTenantKf;
           $scope.sessionidOwner              = $scope.sysLoggedUser.idProfileKf==5 || ($scope.sysLoggedUser.idProfileKf==6 && $scope.sysLoggedUser.idTypeTenant==2)?'':$scope.sysLoggedUser.idUser;
           $scope.sessionisDepartmentApproved = $scope.sysLoggedUser.isDepartmentApproved;
           $scope.sessionProfileRoleName      = $scope.sysLoggedUser.name;
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
    /**************************************************************/
      $scope.slider = {
          value: 10,
          options: {
              showSelectionBar: true
          }
      };    
    /**************************************************
    *            HIDE PROFILES FUNCTION               *
    *         USED IN THE USER REGISTER FORM          *
    **************************************************/
      $scope.filterProfile = function(item){
        //alert($scope.select.idCompanyKf);
        //console.log(item);
        return item.idProfile != 1;
      };
    /**************************************************
    *           SHOW USER COMPANY FUNCTION            *
    *        USED IN THE SERVICE REQUEST FORM         *
    **************************************************/
      $scope.hideTypeTenant = function(item){
        //console.log($scope.typeTenant);
        return $scope.hideTypeTenant= $scope.typeTenant;
      };
    /**************************************************/  

    /**************************************************
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
          }else{$scope.companyFound=false; console.log("idCompanyKf No recibido");}
        }

        $scope.filterAddressKf={};
        $scope.filterCompanyKf={};
        $scope.selectIdAddressKf = {};
        $scope.selectIdCompanyKf = {};
        $scope.onSelectCallback = function(){
          $scope.selectIdAddressKf.selected=undefined;
          $scope.filterAddressKf.selected=undefined;
          $scope.filterCustomerIdFk.selected=undefined;
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
              $scope.listOffice   = response.data;
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
              //if($scope.IsSystem && $scope.sysContent!="dashboard" && $scope.sysContent=="company"){$scope.loadPagination($scope.listCompany);}
            }, function myError(response) {
          });
      }

    /*************************************************/
   
    /**************************************************
    *                                                 *
    *                 USER  SERVICES                  *
    *  [userLists]: clientUser, attendants, tenants   *
    *               sysUser, companyUser              *
    **************************************************/ 
      $scope.rsList = [];
      $scope.getUserLists = function(opt, group){
        userServices.userLists().then(function(response) {
          console.log("[getUserList] ==> "+opt+" : "+group);
          $scope.rsList = response; 
          if(opt==1){
            switch (group){
              case "1":
                $scope.loadPagination($scope.rsList.sysUser, "idUser", "7");
              break;
              case "2":
                $scope.loadPagination($scope.rsList.companyUser, "idUser",  "7");
              break;
              case "3":
                $scope.loadPagination($scope.rsList.tenants, "idUser",  "7");
              break;
              case "4":
                $scope.loadPagination($scope.rsList.companyUser, "idUser",  "7");
              break;
              case "5":
                $scope.loadPagination($scope.rsList.tenants, "idUser",  "7");
              break;
              case "6":
                $scope.loadPagination($scope.rsList.attendants, "idUser",  "7");
              break;
              case "clients":
                 $scope.loadPagination($scope.rsList.clientUser, "idUser",  "7");
              break;
            }
            
          }
          //console.log($scope.rsList.tenants);           
        });
      }
    //console.log($scope.listOf);

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

              //if($scope.IsSystem && $scope.sysContent!="dashboard" && $scope.sysContent!="company"){$scope.loadPagination(arrList);}
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
        //console.log("[getAllAddressByIdTenant]=> "+ $scope.sessionidOwner)
        //console.log("[getAllAddressByIdTenant]=> "+ $scope.sessionidTenantUser)
        var url1="Direccion/byidTenant/"+$scope.sessionidTenantUser+"/"+$scope.sessionIdDeparmentKf+"/"+1;
        var url2="Direccion/byidTenant/"+$scope.sessionidOwner+"/"+0+"/"+1;
        var urlF=$scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2) ? url1 : url2;
        $http({
            method : "GET",
            url : serverHost+serverBackend+urlF,
          }).then(function mySuccess(response){
              $scope.ListTenantAddress  = response.data;
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
        console.log("[getTypeAttendant]: getting the attendant type list");
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
        if (n==1 && ($scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)) && !$scope.select.idDepartmentKf){
          inform.add('Debe seleccionar un departamento para continuar con la solicitud.',{
                                ttl:3000, type: 'info'
          }); 
        }
        if (n==1 && $scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)){
          $scope.typeTenant = 1;
          console.log("[getData] => Binding Owner data");
          BindDataToForm('ticketTenantData');
        }else if (n==2 && $scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)){
          console.log("[getData] => Select a department");
          $scope.typeTenant = 2;
        }else if(n==1 && $scope.sessionidProfile!=3 && $scope.sessionidProfile!=6){
          //alert($scope.select.idAddressAtt);
          $scope.typeTenant = 1;
          console.log("[getData] => typeTenant: "+$scope.typeTenant);
        }else if(n==2 && $scope.sessionidProfile!=3 && $scope.sessionidProfile!=6){
          $scope.typeTenant = 2;
          console.log("[getData] => typeTenant: "+$scope.typeTenant);
        }
        console.log("[getData] => TypeTenant Selected: "+$scope.typeTenant);
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
        console.log("['listUserDepto']==>"+value+" / "+idValue);
        //$scope.manageDepto=value;
        var idAddressTmp=idValue;
        var idTenantTmp = 0;
        var urlT="";
        idTenantTmp = $scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)? $scope.sessionidOwner : $scope.idTenantKf;
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
          console.log("[getDeparment] => From the idAdressKf: "+idValue);
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
            }if (($scope.sessionidProfile==5 || $scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2) && $scope.manageDepto==0){
              urlT=serverHost+serverBackend+"Department/byIdTenantYDireccion/"+idAddressTmp+"/"+$scope.sessionidTenantUser+"/"+'1';
            }else if (($scope.sessionidProfile==3 || $scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1) && $scope.manageDepto==0){
              urlT=serverHost+serverBackend+"Department/byIdTenantYDireccion/"+idAddressTmp+"/"+$scope.sessionidOwner+"/"+'1';
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
                if (!idAddressTmp && $scope.manageDepto==0 && !$scope.IsSystem){
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
        //console.log("idAdressKf: "+idValue);
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
        console.log(urlT);
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
        //console.log("typeTenant: "+$scope.typeTenant+" / typeOption: "+$scope.typeOption);
        //console.log("typeT1: "+typeT1+" / typeT2: "+typeT2);
        $scope.typeTenant=0;
        if(typeT1!=false || typeT2!=false){
          //console.log("cleaning... the department radio button");
          document.getElementById("typeTenant1").checked=false;
          document.getElementById("typeTenant2").checked=false;
        }
      }else if($scope.typeOption && value==1){
        //console.log("typeTenant: "+$scope.typeTenant+" / typeOption: "+$scope.typeOption);
        //console.log("typeO1: "+typeO1+" / typeO2: "+typeO2);
        $scope.typeOption=0;
        if(typeO1!=false || typeO2!=false){
          //console.log("cleaning... the building radio button");
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
      //console.log("Collap : "+$scope.collap)
      //console.log("isCollapsed : "+$scope.isCollapsed)
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
      $scope.sysFunctionsUser = function(sMenu, item){
        var isVarUser=item;
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
                          idSysProfileFk          : $scope.sysReg.idSysProfileFk,
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
      //console.log($scope.userData2Update());
        userServices.updateUser($scope.userData2Update()).then(function(data){
         $scope.updateUserResult = data;
          //console.log($scope.updateUserResult);
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
          if($scope.sysContent=='user'){
            $scope.getUserLists(1, "clients");
          }else if($scope.sysContent=='tenant' && $scope.sysUpdate.idProfileKf==6){
            $scope.getUserLists(1, '5');
          }else{
            $scope.getUserLists(1, $scope.sysUpdate.idProfileKf);
          }
          
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
          if($scope.sysUpdate.idTypeAttKf!=0 && $scope.att.ownerOption==1){
            $scope.sysUpdate.idTypeTenantKf=1;
            $scope.sysUpdate.isRequireAuthentication=1;
          }else if($scope.sysUpdate.idTypeAttKf!=0 && $scope.att.ownerOption==2){
            $scope.sysUpdate.idTypeTenantKf=2;
            $scope.sysUpdate.isRequireAuthentication=1;
          }else if($scope.sysUpdate.idTypeAttKf==1 && $scope.att.ownerOption==3){
            $scope.sysUpdate.idTypeTenantKf=null;
            $scope.sysUpdate.isRequireAuthentication=0;
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
                          idSysProfileFk          : $scope.sysUpdate.idSysProfileFk,
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
      $scope.disabledUser = function (item) {
        $http({
            method : "GET",
            url : serverHost+serverBackend+"User/inactive/"+item.idUser
          }).then(function mySuccess(response) {
              if($scope.IsSystem){
                $scope.getUserLists(1, item.idProfileKf);
                //$scope.refresRowsInList();
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
      $scope.enabledUser = function (item) {
        $http({
            method : "GET",
            url : serverHost+serverBackend+"User/active/"+item.idUser
          }).then(function mySuccess(response) {
              if($scope.IsSystem){
                $scope.getUserLists(1, item.idProfileKf);
                //$scope.refresRowsInList();
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
     $scope.getAttValue = function(){
        $scope.ariaAtt = $('#filterContent').attr('aria-expanded');
        if ($scope.ariaAtt=="false" || $scope.ariaAtt==undefined){
          $('#bodyContent').addClass('mb-collapsed-filter');
          $('#bodyContent').removeClass('margin-row-1');
          //console.log("$scope.ariaAtt: "+$scope.ariaAtt);
        }else{
          $('#bodyContent').removeClass('mb-collapsed-filter');
          $('#bodyContent').addClass('margin-row-1');
          //console.log("$scope.ariaAtt: "+$scope.ariaAtt);
        }

     }
    

    
    $scope.selectUserDataFn = function (obj) {
      $scope.getTypeAttendant(); 
      $scope.getAllAddress();
      var obj2=obj;
       $scope.profileHasChange=false;
       $scope.att.ownerOption=null;
       $scope.tmp = {};
       $scope.tmp.idProfileKf                  = obj.idProfileKf;
      console.log("[selectUserDataFn] ---> OBJ");
      console.log(obj);
      var informMsg = 'Usuario Perfil '+obj.nameProfile;
      $scope.sysUpdate                               = {};
      $scope.sysUpdateTmp                            = {};
      $scope.sysUpdateTmp                            = obj2;
      $scope.sysUpdateidCompanyKf.selected           = undefined;
      $scope.sysUpdateIdAddressKf.selected           = undefined;
      console.log("[selectUserDataFn] ---> OBJ2");
      console.log(obj2);
      /*--------------------------------------------------------------*/
        $scope.sysUpdate = obj;
        $scope.tmp.idProfileKf                  = obj.idProfileKf;
        if(($scope.sysUpdate.idProfileKf==2 || $scope.sysUpdate.idProfileKf==4 || ($scope.sysUpdate.idProfileKf==6 && $scope.sysUpdate.idTyepeAttendantKf==2)) && !obj.idCompanyKf && !obj.idCompany){
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
        else if(obj.idProfileKf==6 && obj.idTyepeAttendantKf!=0 && obj.idTypeTenantKf==2){$scope.att.ownerOption=2;}
        if(obj.idProfileKf==6 && obj.idTyepeAttendantKf!=0 && (!obj.idTypeTenantKf || obj.idTypeTenantKf==0)){$scope.att.ownerOption=3;}
        if(obj.idProfileKf!=2 && obj.idProfileKf!=4){$scope.getDeparment(0,$scope.sysUpdateIdAddressKf.selected.idAdress);}
        //Validamos si el usuario inquilino no tiene asignado un departamento.
        if(($scope.sysUpdate.idProfileKf==5 || ($scope.sysUpdate.idProfileKf==6 && $scope.sysUpdate.idTypeTenantKf==2)) && !$scope.sysUpdate.idDepartmentKf && $scope.sysUpdate.idAddresKf){
            inform.add('Para completar los datos selecciona el departamento que corresponde al usuario '+$scope.sysUpdate.names,{
              ttl:5000, type: 'warning'
            });
        //Validamos si el usuario inquilino no tiene seleccionado un consorcio y asignado un departamento.
        }else if(($scope.sysUpdate.idProfileKf==5 || ($scope.sysUpdate.idProfileKf==6 && $scope.sysUpdate.idTypeTenantKf==2)) && !$scope.sysUpdate.idDepartmentKf && !$scope.sysUpdate.idAddresKf){
            inform.add('Para completar los datos selecciona un consorcio y el departamento que corresponde al usuario '+$scope.sysUpdate.names,{
              ttl:5000, type: 'warning'
            });
        }
        //Validamos si el usuario no establecido ningun numero telefonico de contacto.
        if(!$scope.sysUpdate.phonelocalNumberUser && !$scope.sysUpdate.phoneMovilNumberUser){
            inform.add('Para completar los datos indica al menos un telefono de contacto del usuario '+$scope.sysUpdate.names,{
              ttl:5000, type: 'warning'
            });
        //Validamos si el usuario inquilino no tiene seleccionado un consorcio y asignado un departamento.
        }
        $('#UpdateModalUser').on('shown.bs.modal', function () {
          //$('#idDepartmentKf').trigger('focus');
          if(!$scope.sysUpdate.idDepartmentKf && $scope.sysUpdate.idAddresKf){
            $('#idDepartmentKf').focus();
          }else if(!$scope.sysUpdate.idDepartmentKf && !$scope.sysUpdate.idAddresKf){
            $scope.$broadcast('idAddressKf');
          }
          if(!$scope.sysUpdate.phonelocalNumberUser && !$scope.sysUpdate.phoneMovilNumberUser){
            $('#phoneLocal').focus();
          }
          //if($scope.sysUpdate.phoneMovilNumberUser){$('#phoneMovil').addClass('has-warning');}
          
        })
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
            }else if(!info2Show && $scope.sysUpdateTmp.idProfileKf == idProfile && ($scope.sysUpdateTmp.idTypeTenantKf==0 || $scope.sysUpdateTmp.idTypeTenantKf==null) && $scope.att.ownerOption!=3){
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
    $scope.deleteUser = function (item) {
      console.log(item);
      $http({
          method : "delete",
          url : serverHost+serverBackend+"User/delete/"+item.idUser
        }).then(function mySuccess(response) {
            //$scope.refresRowsInList();
            $scope.getUserLists(1, item.idProfileKf);
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
      if ($scope.sysContent=='tenant'){
        return item.idProfile == 3 ||  item.idProfile == 5 ||  item.idProfile == 6;
      }else if ($scope.sysContent=='att'){
        return item.idProfile == 6;
      }else{
        return item.idProfile!=0;
      }
      
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
      $scope.selecte={};
        $scope.selectTenant = function (obj){
            $scope.tenantData = obj;
            $scope.selectedTenant = obj;
            $scope.idDepto                 =  !obj.idDepartmentKf ? $scope.select.idDeparmentKf : obj.idDepartmentKf;
            $scope.idTenantKf              =  obj.idUser;
            $scope.idTenantKf2             =  obj.idUser;
            $scope.tenant.namesTenant      =  obj.fullNameUser;
            $scope.tenant.localPhoneTenant =  obj.phoneLocalNumberUser;
            $scope.tenant.movilPhoneTenant =  obj.phoneNumberUser;
            $scope.tenant.emailTenant      =  obj.emailUser;
            $scope.t.idTypeKf              =  obj.idTypeTenantKf;
            $scope.IsTenant                = true;
            $scope.idTypeTenantKf          = "";
            $scope.ownerFound              = false;
            $scope.IsAttendant             = false;
            switch (obj.idProfileKf){
              case "3":
                $scope.selecte.owner=obj;
              break;
              case "5":
                $scope.selecte.tenant=obj;
              break;
              case "6":
                $scope.selecte.atten=obj;
              break;
            }
            $('#ModalListTenant').modal('hide');
            console.log("[selectTenant] => $scope.selecte");
            console.log($scope.selecte);
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
            }else if ($scope.manageDepto>=0 && $scope.sysTmpUser.idTypeTenantKf==2 && $scope.sysTmpUser.idDepartmentKf){
                //console.log($scope.sysTmpUser.idDepartmentKf);
                //console.log($scope.getDeptoName($scope.sysTmpUser.idDepartmentKf));
                inform.add('El Habitante '+$scope.sysTmpUser.fullNameUser+' esta registrado con el correo: '+$scope.sysTmpUser.emailUser+' y se encuentra asignado al Departamento: '+$scope.getDeptoName($scope.sysTmpUser.idDepartmentKf)+' en ['+$scope.sysTmpUser.nameAdress+']',{
                        ttl:5000, type: 'warning'
                });
              $this.val('');
              tokenSystem.destroyTokenStorage(3);
            }else if ($scope.IsCustomer){
                var switchOption=$this[0].name;
                switch(switchOption){
                  case "mailFromKey":
                    console.log(switchOption);
                    $scope.mailServiceTecnic=false;
                    $scope.mailCollection=false;
                    $scope.mailCustomer=false;
                    $scope.mailFromKey=true;
                  break;
                  case "mailServiceTecnic":
                    console.log(switchOption);
                    $scope.mailFromKey=false;
                    $scope.mailCollection=false;
                    $scope.mailCustomer=false;
                    $scope.mailServiceTecnic=true;
                  break;
                  case "mailCollection":
                    console.log(switchOption);
                    $scope.mailFromKey=false;
                    $scope.mailServiceTecnic=false;
                    $scope.mailCustomer=false;
                    $scope.mailCollection=true;
                  break;
                  case "mailCustomer":
                    console.log(switchOption);
                    $scope.mailFromKey=false;
                    $scope.mailServiceTecnic=false;
                    $scope.mailCollection=false;
                    $scope.mailCustomer=true;
                  break;
                default:                
                }
                $scope.msgTimer=true;
                $scope.mailFoundNameUser = $scope.sysTmpUser.fullNameUser;
                setTimeout(function() {
                  $scope.msgTimer=false;
                }, 500);
      
            }
            //console.log("::: EMAIL IS ALREADY USED BY ANOTHER USER :::");
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
                  if (response.data==true){
                    $scope.ownerFound=true;
                    console.log("EL DEPTO: "+$scope.tmp.idDepartment+" Ya tiene un propietario Asignado");
                  }else if(response.data==false){
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
    /**************************************************
    *                                                 *
    *          MODAL CODE CONFIRMATION FUNTION        *
    *                                                 *
    **************************************************/
      $scope.modalCodeConfirmation = function(){
        $('#confirmCodeModal').modal({backdrop: 'static', keyboard: false});
        $('#confirmCodeModal').on('shown.bs.modal', function () {
          $('#checkCode').trigger('focus');
          $('#divCodeFrm').removeClass('has-error');
        })
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
      $scope.isMonitorActive = false;
      $scope.sysFunctionsAtt = function(value, option, obj){
        console.log("[sysFunctionsAtt] => value: "+value+" / option: "+option+" / isMonitorActive: "+$scope.isMonitorActive);
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
              //if($scope.collap==1){console.log("idDepartmentKf: "+obj.idDepartment);};
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
                    $scope.att.idDepartmentKf  = $scope.collap==1?obj:null;
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
            if($scope.isMonitorActive || ($scope.manageDepto==0 && $scope.IsTicket)) {
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
  *        LIST OF USER TO ASSIGN A DEPARMENT       *
  *                                                 *
  **************************************************/
    $scope.listUserWithoutDepto = null;
    $scope.sysFunctionsListOfUser2Assign = function(idDepto){

      userServices.usersWithoutDepto(idDepto).then(function(data) {
          if(data){
            $scope.listUserWithoutDepto = data;
            console.log($scope.listUserWithoutDepto);
            $("#ModalListUser2Assign").modal('show');
          }
      });
      
    }
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
        $scope.modalConfirmation = function(opt, confirm, obj, group){
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
                if (($scope.sessionidProfile!=3 && $scope.sessionidProfile!=5 && $scope.sessionidProfile!=6 && obj.idTypeTenantKf!=0) || ($scope.sessionidProfile==3 && obj.idTypeTenantKf==2) || ($scope.sessionidProfile==6 && obj.idTypeTenantKf==2)){
                  $scope.mess2show="Esta seguro que desea dar de baja al Habitante?";
                }else if ($scope.sessionidProfile==3 || $scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){
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
                  if ($scope.sessionidProfile==5 ||($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){
                    $scope.sysCheckAddrIsInDebt($scope.ListTenantAddress);
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
                  }else{
                    $scope.rukeyup = true;
                  }
                }else 
                if(tmpOpt=="rukeydown"){
                  if ($scope.sessionidProfile==5 ||($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){
                    $scope.sysCheckAddrIsInDebt($scope.ListTenantAddress);
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
                  }else{
                    $scope.rukeydown = true;
                  }
                }else 
                if(tmpOpt=="home"){
                  $scope.home = true;
                }else 
                if(tmpOpt=="rucost"){
                  $scope.rucost=true;
                }else
                if(tmpOpt=="ruother"){
                  $scope.ruother=true;
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
                  if (obj.idProfileKf){$scope.mess2show="El usuario ("+obj.fullNameUser+") bajo el perfil de "+obj.nameProfile+" sera Eliminado.     Confirmar?";}
                    $scope.idUserKf   =  obj.idUser;
                    $scope.argObj = obj;
                    console.log('Usuario a eliminar ID: '+$scope.idUserKf+' BAJO EL NOMBRE: '+obj.fullNameUser);
                    console.log("============================================================================")
                    console.log($scope.argObj);
                }      
              $('#confirmRequestModal').modal('toggle');
            }else if (confirm==1){
                  $scope.deleteUser($scope.argObj);
              $('#confirmRequestModal').modal('hide');
            }
          break;
          case "removeSysProf":
            if (confirm==0){
                if ($scope.sessionidProfile==1 && obj.idProfiles!=0){
                  $scope.idSysProf = obj.idProfiles;
                  $scope.mess2show="El Perfil "+obj.name+" sera Eliminado.     Confirmar?";
                    console.log('Usuario a eliminar ID: '+obj.idProfiles+' BAJO EL NOMBRE: '+obj.name);
                    console.log("============================================================================")
                    console.log(obj);
                }      
              $('#confirmRequestModal').modal('toggle');
            }else if (confirm==1){
                  $scope.deleteSysProfileFn($scope.idSysProf);
              $('#confirmRequestModal').modal('hide');
            }
          break;
          case "removeProduct":
            if (confirm==0){
                if ($scope.sessionidProfile==1 && obj.idProduct!=0){
                  $scope.idProducto = obj.idProduct;
                  $scope.mess2show="El Producto "+obj.descriptionProduct+" sera Eliminado.     Confirmar?";
                    console.log('Producto a eliminar ID: '+obj.idProduct+' DESCRIPCION: '+obj.descriptionProduct);
                    console.log("============================================================================")
                    console.log(obj);
                }      
              $('#confirmRequestModal').modal('toggle');
            }else if (confirm==1){
                  $scope.deleteProductFn($scope.idProducto);
              $('#confirmRequestModal').modal('hide');
            }
          break;
          case "closeCustomerWindow":
              if (confirm==0){
                if ($scope.isNewCustomer==true){
                  $scope.mess2show="Se perderan todos los datos cargados para el registro actual, esta seguro que desea cancelar el registro?";
                }else{
                  $scope.mess2show="Se perderan todos las modificaciones realizadas en el registro actual, esta seguro que desea cancelar la modificacion?";
                }    
                $('#confirmRequestModal').modal('toggle');
              }else if (confirm==1){
                $('#confirmRequestModal').modal('hide');
                $('#customerParticularAddress').modal('hide');
                $('#BuildingUnit').modal('hide');
                $("#AddressLatLon").modal('hide');
                $('#RegisterModalCustomer').modal('hide');
                $('#UpdateModalCustomer').modal('hide');
                $scope.loadPagination($scope.rsCustomerListData, "idClient", "10");
              }
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
    /**************************************************
    *                                                 *
    *      Get Type option to request down a key      *
    *                                                 *
    **************************************************/
      $scope.sendOpcion = function(value){
        $scope.tk.idOpcionLowTicketKf  = value;
        console.log("[sendOpcion] => "+ $scope.tk.idOpcionLowTicketKf);
      }
      /**************************************************/
      $scope.newTicket = function(opt){
        //console.log("$scope.select.idDepartmentKf: "+$scope.select.idDepartmentKf);
        $scope.tk.idUserAdminKf      = 0;    //ADMINISTRADOR_COFERBA
        $scope.tk.idTenantKf         = 0;   //INQUILINO
        $scope.tk.idOWnerKf          = 0;   //PROPIETARIO
        $scope.tk.idUserEnterpriceKf = 0;   //ADMIN._CONSORCIO
        $scope.tk.idAttendantKf      = 0;   //ENCARGADO
        $scope.tk.idCompanyKf        = 0;   //USUARIO_EMPRESA
        $scope.tk.idOtherKf          = 0;
        $scope.tk.idTypeOfKeysKf     = {};
        var elem_input               = '';
        $scope.kItems={keys:[]}; 
          switch (opt) {
            case "up": // SOLOCITUD DE ALTA
                    console.log("---------------------------------------");
                    console.log("DATOS DE LA SOLICITUD DE ALTA DE LLAVE");
                    console.log("---------------------------------------");
                    console.log("[New Ticket] => TypeTenant Selected: "+$scope.typeTenant );
                        $scope.tk.idTicket           = 1;
                    if(($scope.sessionidProfile==3 || $scope.sessionidProfile==6) &&  $scope.typeTenant == 1){
                        console.log("[New Ticket] => Propietario haciendo pedido.");
                        $scope.tk.idOWnerKf          = $scope.sessionIdUser;
                        $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                        $scope.tk.idProfileKf        = $scope.sessionidProfile;
                        
                    }else if(($scope.sessionidProfile==3 || $scope.sessionidProfile==6) &&  $scope.typeTenant == 2){
                        console.log("[New Ticket] => Propietario -> haciendo pedido a inquilino.");
                        $scope.tk.idOWnerKf          = $scope.sessionIdUser;
                        $scope.tk.idTenantKf         = $scope.selecte.tenant.idUser;
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
                          if ($scope.typeTenant==2){
                            $scope.tk.idTenantKf       = $scope.selecte.tenant.idUser;
                          }else{
                            $scope.tk.idOWnerKf        = $scope.selecte.owner.idUser;
                          }
                      }else if ($scope.collap==2){
                        //alert($scope.typeOption)
                          switch ($scope.typeOption){
                            case 1:
                              $scope.tk.idTypeOfOptionKf = 1;
                              //alert($scope.userAtt.attendant.idTyepeAttendantKf)
                              if($scope.userAtt.attendant.idTyepeAttendantKf==1){
                                $scope.tk.idOtherKf      = $scope.select.nameAtt;
                                $scope.tk.idAttendantKf  = null;
                              }else{
                                $scope.tk.idAttendantKf  = $scope.select.nameAtt;
                                $scope.tk.idOtherKf      = null;
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
                          if ($scope.typeTenant==2){
                            $scope.tk.idTenantKf       = $scope.selecte.tenant.idUser;
                          }else{
                            $scope.tk.idOWnerKf        = $scope.selecte.owner.idUser;
                          }
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
                        $scope.tk.idWhoPickUp        = $scope.select.whoPickUp;
                        $scope.tk.idAddresKf         = $scope.sessionidProfile==5 ? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                        $scope.tk.idBranchKf         = $scope.sessionidProfile==5 ? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                        $scope.tk.totalGestion       = parseFloat(Number($scope.cost.service)).toFixed(2);
                        $scope.tk.totalEnvio         = parseFloat(Number($scope.cost.delivery)).toFixed(2);
                        $scope.tk.totalLlave         = parseFloat(Number($scope.cost.key)).toFixed(2);
                        $scope.tk.totalService       = parseFloat(Number($scope.cost.total)).toFixed(2);
                        $scope.tk.idTypeOfKeysKf     = $scope.dataK;
                        $scope.tk.sendNotify         = $scope.sessionidProfile!=1 ? null : $scope.sendNotify;
                        $scope.tk.isNew              = 1;
                        $scope.tk.tkToken            = $scope.sysTokenFn(20);
                        if($scope.sessionidProfile==1){console.log("[newTicket] => [rKeyUp] => $scope.sendNotify: "+$scope.sendNotify);}
                    console.log('[newTicket] => [rKeyUp] =>$scope.tk.idTypeOfKeysKf :'+$scope.tk.idTypeOfKeysKf.length);
                    //console.log($scope.tk);
                    console.log($scope._getData2AddKey());
                    $scope.requestUpKey($http, $scope);
            break;
            case "down": // SOLOCITUD DE BAJA
                        $scope.tk.idTicket           = 2;
                    if($scope.sessionidProfile==3){
                        $scope.tk.idOWnerKf          = $scope.sessionIdUser;
                        $scope.tk.idTenantKf         = $scope.sessionidTenantUser;
                        $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                        $scope.tk.idProfileKf        = $scope.sessionidProfile;
                    }else if(($scope.sessionidProfile==3 || ($scope.sessionidProfile==6) && $scope.selecte.idTypeTenant == 2)){
                        $scope.tk.idOWnerKf          = $scope.sessionIdUser;
                        $scope.tk.idCompanyKf        = $scope.getCompanyFromAddress($scope.selectIdAddressKf.selected.idAdress);
                        $scope.tk.idProfileKf        = $scope.sessionidProfile;
                    }else if(($scope.sessionidProfile==6) && $scope.selecte.idTypeTenant == 1){
                        $scope.tk.idAttendantKf      = $scope.sessionIdUser;
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
                          if ($scope.typeTenant==2){
                            $scope.tk.idTenantKf       = $scope.idTenantKf2;
                          }else{
                            $scope.tk.idOWnerKf        = $scope.idTenantKf2;
                          }
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
                          if ($scope.typeTenant==2){
                            $scope.tk.idTenantKf       = $scope.idTenantKf2;
                          }else{
                            $scope.tk.idOWnerKf        = $scope.idTenantKf2;
                          }
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
                      $scope.tk.idAddresKf         = $scope.sessionidProfile!=1 && $scope.sessionidProfile!=2 && $scope.sessionidProfile!=4? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                      $scope.tk.idBranchKf         = $scope.sessionidProfile!=1 && $scope.sessionidProfile!=2 && $scope.sessionidProfile!=4? $scope.sessionidAddress : $scope.selectIdAddressKf.selected.idAdress;
                      $scope.tk.sendNotify         = $scope.sessionidProfile!=1 ? null : $scope.sendNotify;
                      $scope.tk.isNew              = 1;
                  console.log("DATOS DE LA SOLICITUD DEL SERVICIO");
                  console.log($scope._getServiceData());
                  $scope.requestService($http, $scope);
            break;
            case "other": // SOLOCITUD DE OTRA CONSULTA
                      $scope.tk.idTicket           = 4;
                      $scope.selectIdAddressKfTmp = ($scope.selectIdAddressKf.selected==undefined || !$scope.selectIdAddressKf.selected.idAdress) ? $scope.select.idAddressAtt : $scope.selectIdAddressKf.selected.idAdress; 
                    if($scope.sessionidProfile==3){
                        $scope.tk.idOWnerKf        = $scope.sessionIdUser;
                        $scope.tk.idProfileKf      = $scope.sessionidProfile;
                        $scope.tk.idCompanyKf      = $scope.getCompanyFromAddress($scope.selectIdAddressKfTmp);
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
                      $scope.tk.addressConsul      = $scope.sessionidProfile==5 ? $scope.sessionidAddress : $scope.selectIdAddressKfTmp;
                      $scope.tk.idAddresKf         = $scope.sessionidProfile==5 ? $scope.sessionidAddress : $scope.selectIdAddressKfTmp;
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
      $scope.commaToDecimal = function(value){
              return value ? parseFloat(value).toFixed(2).toString().replace('.', ',') : null;
      };
      $scope.keyChains = {};
      $scope.getKeyChains = function(idAddressTmp){
        console.log("[getKeyChains] => From the idAddressTmp: "+idAddressTmp);
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
                console.log("[getKeyChains] => From the Address: "+idAddressTmp+" Has: "+$scope.keyChains.length+" keys");
                //console.log(response.data);
                //console.log("Total keys: "+$scope.keyChains.length);
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
                $scope.keyName1=$scope.keyChains[i].item+'('+$scope.commaToDecimal($scope.keyChains[i].value)+')';
                $scope.keyValue1=$scope.keyChains[i].value;
                $scope.key.keyId1=$scope.keyChains[i].idKey;
              break;
              case 1:
                $scope.keyName2=$scope.keyChains[i].item+'('+$scope.commaToDecimal($scope.keyChains[i].value)+')';
                $scope.keyValue2=$scope.keyChains[i].value;
                $scope.key.keyId2=$scope.keyChains[i].idKey;
              break;
              case 2:
                $scope.keyName3=$scope.keyChains[i].item+'('+$scope.commaToDecimal($scope.keyChains[i].value)+')';
                $scope.keyValue3=$scope.keyChains[i].value;
                $scope.key.keyId3=$scope.keyChains[i].idKey;
              break;
              case 3:
                $scope.keyName4=$scope.keyChains[i].item+'('+$scope.commaToDecimal($scope.keyChains[i].value)+')';
                $scope.keyValue4=$scope.keyChains[i].value;
                $scope.key.keyId4=$scope.keyChains[i].idKey;
              break;
              case 4:
                $scope.keyName5=$scope.keyChains[i].item+'('+$scope.commaToDecimal($scope.keyChains[i].value)+')';
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
                //console.log("updating...");
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
            
            $scope.dataK.keys.push(dataK);
            console.log("Item Added");
          }
          //console.log("$scope.dataK.keys: ");
          //console.log($scope.dataK.keys);
        }else{
            for (var i = 0; i < $scope.dataK.keys.length; i++){
              if(idKey==$scope.dataK.keys[i].idKeyKf){
                $scope.dataK.keys.splice(i);
                console.log("item deleted");
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
    /**************************************************
    *                                                 *
    *           GET TOTAL COST OF KEY                 *
    *                                                 *
    **************************************************/
      $scope.keyRequired={key1:true, key2:false, key3:false, key4:false, key5:false}; //Se asigna para indicar el checkbox como requerido o no
      $scope.getTotalCostOfKeys = function(){
        var totalKeyCost=0;
        var totalKey1, totalKey2, totalKey3, totalKey4, totalKey5;
          if($("#keyChek1").prop('checked')){
            $scope.keyRequired.key1=true;  
            totalKey1 = NaN2Zero($scope.keyValue1)*NaN2Zero($scope.key.qty1);
            $scope.checkBoxCheck1=true; 
            $scope.fnCheckKeys2($scope.key.keyId1, $scope.key.qty1,  $scope.checkBoxCheck1);
          }else{
              if(!$scope.keyRequired.key2 && !$scope.keyRequired.key3 && !$scope.keyRequired.key4 && !$scope.keyRequired.key5){
                $scope.keyRequired.key1=true; 
              }else{
                $scope.keyRequired.key1=false;  
              }
              totalKey1=0;$scope.key.qty1='';$scope.checkBoxCheck1=false; $scope.fnCheckKeys2($scope.key.keyId1, $scope.key.qty1,  $scope.checkBoxCheck1);}
          if($("#keyChek2").prop('checked')){
            $scope.keyRequired.key2=true;  
            totalKey2 = NaN2Zero($scope.keyValue2)*NaN2Zero($scope.key.qty2);
            $scope.checkBoxCheck2=true; 
            $scope.fnCheckKeys2($scope.key.keyId2, $scope.key.qty2,  $scope.checkBoxCheck2);
          }else{
              if(!$scope.keyRequired.key1 && !$scope.keyRequired.key3 && !$scope.keyRequired.key4 && !$scope.keyRequired.key5){
                $scope.keyRequired.key2=true; 
              }else{
                $scope.keyRequired.key2=false;  
              } 
              totalKey2=0;$scope.key.qty2='';$scope.checkBoxCheck2=false; $scope.fnCheckKeys2($scope.key.keyId2, $scope.key.qty2,  $scope.checkBoxCheck2);}
          if($("#keyChek3").prop('checked')){
            $scope.keyRequired.key3=true;  
            totalKey3 = NaN2Zero($scope.keyValue3)*NaN2Zero($scope.key.qty3);
            $scope.checkBoxCheck3=true;
            $scope.fnCheckKeys2($scope.key.keyId3, $scope.key.qty3,  $scope.checkBoxCheck3);
          }else{
              if(!$scope.keyRequired.key1 && !$scope.keyRequired.key2 && !$scope.keyRequired.key4 && !$scope.keyRequired.key5){
                $scope.keyRequired.key3=true; 
              }else{
                $scope.keyRequired.key3=false;  
              }  
              totalKey3=0;$scope.key.qty3='';$scope.checkBoxCheck3=false; $scope.fnCheckKeys2($scope.key.keyId3, $scope.key.qty3,  $scope.checkBoxCheck3);}
          if($("#keyChek4").prop('checked')){
            $scope.keyRequired.key4=true;  
            totalKey4 = NaN2Zero($scope.keyValue4)*NaN2Zero($scope.key.qty4);
            $scope.checkBoxCheck4=true;
            $scope.fnCheckKeys2($scope.key.keyId4, $scope.key.qty4,  $scope.checkBoxCheck4);
          }else{$
              if(!$scope.keyRequired.key2 && !$scope.keyRequired.key3 && !$scope.keyRequired.key1 && !$scope.keyRequired.key5){
                $scope.keyRequired.key4=true; 
              }else{
                $scope.keyRequired.key4=false;  
              }  
              totalKey4=0;$scope.key.qty4='';$scope.checkBoxCheck4=false; $scope.fnCheckKeys2($scope.key.keyId4, $scope.key.qty4,  $scope.checkBoxCheck4);}
          if($("#keyChek5").prop('checked')){
            $scope.keyRequired.key5=true;  
            totalKey5 = NaN2Zero($scope.keyValue5)*NaN2Zero($scope.key.qty5);
            $scope.checkBoxCheck5=true; 
            $scope.fnCheckKeys2($scope.key.keyId5, $scope.key.qty5,  $scope.checkBoxCheck5);
          }else{
              if(!$scope.keyRequired.key2 && !$scope.keyRequired.key3 && !$scope.keyRequired.key4 && !$scope.keyRequired.key1){
                $scope.keyRequired.key5=true; 
              }else{
                $scope.keyRequired.key5=false;  
              }  
              totalKey5=0;$scope.key.qty5='';$scope.checkBoxCheck5=false; $scope.fnCheckKeys2($scope.key.keyId5, $scope.key.qty5,  $scope.checkBoxCheck5);}
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
    /**************************************************
    *                                                 *
    *           GET TOTAL COST OF SERVICE             *
    *                                                 *
    **************************************************/
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
              ticketServices.ticketByToken($scope._getData2AddKey().ticket.urlToken).then(function(data){
                if(data==1){
                  $scope.tk_mail=tokenSystem.getTokenStorage(5);
                  $scope.sysRouteMailFn($scope.tk_mail.tk_type_id, $scope.sessionidProfile);
                }
              });
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
                                  totalGestion      : $scope.tk.totalGestion,
                                  totalLlave        : $scope.tk.totalLlave,
                                  totalEnvio        : $scope.tk.totalEnvio,
                                  totalService      : $scope.tk.totalService,
                                  idAdressKf        : $scope.tk.idAddresKf,
                                  idOtherKf         : $scope.tk.idOtherKf,
                                  idDepartmentKf    : $scope.tk.idDepartmentKf,
                                  idCompanyKf       : $scope.tk.idCompanyKf,
                                  idTypeOfOptionKf  : $scope.tk.idTypeOfOptionKf,
                                  thirdPersonNames  : $scope.tk.thirdNames,
                                  thirdPersonPhone  : $scope.tk.thirdPhone,
                                  thirdPersonId     : $scope.tk.thirdId,
                                  idWhoPickUp       : $scope.tk.idWhoPickUp,
                                  idTypeOfKeysKf    : $scope.tk.idTypeOfKeysKf,
                                  idUserAttKfDelive : $scope.tk.idUserAttDelivery,
                                  sendNotify        : $scope.tk.sendNotify,
                                  urlToken          : $scope.tk.tkToken,
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
                if($scope.sessionidProfile!=1){$scope.modalConfirmation('tdown',0);}else{
                  $scope.dhboard();
                  $scope.fnShowHide('home','open');
                }

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
                                  idOpcionLowTicketKf   : $scope.tk.idOpcionLowTicketKf,
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
                                  idProfileKf       : $scope.tk.idProfileKf,
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
                                  idProfileKf         : $scope.tk.idProfileKf,
                                  mailContactConsult  : $scope.tk.mailContactConsult,
                                  addressConsul       : $scope.tk.addressConsul,
                                  idAdressKf          : $scope.tk.idAddresKf,
                                  idCompanyKf         : $scope.tk.idCompanyKf,
                                  descriptionOrder    : $scope.tk.description,
                                  isNew               : $scope.tk.isNew
                              }
                };
        return otherReq;
      };
    /**************************************************
    *                                                 *
    *                  OPEN A TICKET                  *
    *                                                 *
    **************************************************/
      $scope.tkupdate = {};
      $scope.tktmporal = {};
      $scope.rsData = {};
      $scope.openTicketFn = function(obj, option){
        $scope.tkupdate  = obj;
        $scope.tktmporal = obj;
        ticketServices.ticketByToken(obj.urlToken);
        //console.log(obj);
        $scope.editComment=false;
        ticketServices.ticketById($scope.tkupdate.idTicket).then(function(data){
            $scope.rsData.ticket = (data[0]);
              //console.log($scope.rsData);
        });
        switch(option){
          case 0:
            $('#UpdateModalTicket').modal('show');
          break;
          case 1:
            /**************************************************
            *                                                 *
            *                 DELIVERY TICKET                 *
            *                                                 *
            **************************************************/
            console.log("DELIVERY TICKET OPEN");
            $scope.delivery.idTypeDeliveryKf=null;
            $scope.select.whoPickUp         =null;
            $('#UpdateModalDelivery').modal('show');
          break;
          case 2:
            $scope.sysCheckTicketBeforeCancelFn($scope.tkupdate.idTicket);
          break;
        }
      }

    /**************************************************
    *                                                 *
    *                  APROBAR TICKET                 *
    *                                                 *
    **************************************************/
      $scope.sysApproveTicketFn = function(ticketID, idUser){
        console.clear();
          ticketServices.approvedTicket(ticketID, idUser).then(function(data){
           $scope.ticketResult = data;
            if($scope.ticketResult){
              console.log("TICKET APPROVED SUCCESSFULLY");
              inform.add('Ticket ha sido aprobado satisfactoriamente.',{
                ttl:3000, type: 'success'
              });
              $scope.dhboard();
            }else{
              inform.add('Ticket no ha sido aprobado conctate el area de soporte.',{
                ttl:3000, type: 'warning'
              });
            }
          });
      }

    /**************************************************
    *                                                 *
    *               CANCELAR TICKET                   *
    *                                                 *
    **************************************************/
      $scope.sysCancelTicketFn = function(data){
          console.clear();
          ticketServices.cancelTicket(data).then(function(data){
           $scope.ticketResult = data;
            if($scope.ticketResult){
              console.log("TICKET CANCELED SUCCESSFULLY");
              inform.add('Ticket ha sido cancelado satisfactoriamente.',{
                ttl:3000, type: 'success'
              });
              $scope.dhboard();

            }else{
              inform.add('Ticket no ha sido cancelado conctate el area de soporte.',{
                ttl:3000, type: 'warning'
              });
            }
          });
      }
    /**************************************************
    *                                                 *
    *       VERIFICAR TICKET ANTES DE CANCELAR        *
    *                                                 *
    **************************************************/
      $scope.cancelOption = 0;

      $scope.sysCheckTicketBeforeCancelFn = function(ticketID, idUser){
        console.clear();
          ticketServices.checkTicketBeforeCancel(ticketID).then(function(data){
           $scope.ticketResult = data;
            if($scope.ticketResult==1){
              inform.add('Se procede a cancelar el Ticket.',{
                ttl:3000, type: 'success'
              });
              $('#CancelNotificationModal').modal('show');
              $scope.cancelOption = 3;
            }else{
              $scope.cancelOption = 2;
              $('#CancelNotificationModal').modal('show');
              inform.add('Se inicia la cancelacion que sera enviada para aprobacion.',{
                ttl:3000, type: 'warning'
              });
            }
          });
      }
    /**************************************************
    *                                                 *
    *        CANCELACION DE  TICKET RECHAZADA         *
    *                                                 *
    **************************************************/
      $scope.sysRejectedChgOrCancelTicketFn = function(rsData ){
          console.clear();
          ticketServices.rejectedChOrCanTicket(rsData.idTicket, rsData.isChgOrCancel).then(function(data){
           $scope.ticketResult = data;
            if($scope.ticketResult){
                if(rsData.isChgOrCancel==1){
                  console.log("[sysRejectedCancelTicketFn] => TICKET CHANGE REJECTED SUCCESSFULLY");
                }else if(rsData.isChgOrCancel==0){
                  console.log("[sysRejectedCancelTicketFn] => TICKET CANCEL REJECTED SUCCESSFULLY");
                }
              $scope.dhboard();

            }else{
              inform.add('Ticket no ha sido cancelado conctate el area de soporte.',{
                ttl:3000, type: 'warning'
              });
            }
          });
      }
    /**************************************************
    *                                                 *
    *              CHANGE STATUS TICKET               *
    *                                                 *
    **************************************************/
      $scope.sysChangueStatusFn = function(ticketId, statusId){
          ticketServices.changueStatus(ticketId, statusId).then(function(data){});
      }
      /**************************************************
      *                                                 *
      *                   UPDATE TICKET                 *
      *                                                 *
      **************************************************/
      var isTotalHasChange = false;
      $scope.sysUpdateTicketFn = function(ticketID){
        console.clear();
        var updateTotalService = $scope.tkupdate.totalService;
        console.log("[sysUpdateTicketFn] -> updateTotalService: "+updateTotalService);
            if ($scope.delivery.idTypeDeliveryKf==1){
              isTotalHasChange = true;
              $scope.tkupdate.typeDelivery              ="RETIRO POR OFICINA";
              $scope.tkupdate.idUserAttendantKfDelivery = null;
              $scope.tkupdate.nameAttendantDelivery     = "";
              updateTotalService -=$scope.tkupdate.priceShipping;
              $scope.tkupdate.totalService = Number(updateTotalService);
            }else if($scope.delivery.idTypeDeliveryKf==2 && $scope.select.whoPickUp!=3){
              console.log("[sysUpdateTicketFn] -> $scope.deliveryAtt.fullNameUser: "+$scope.deliveryAtt.fullNameUser);
              $scope.tkupdate.typeDelivery              ="ENTREGA EN EL EDIFICIO";
              $scope.tkupdate.totalGestion              = 0;
              $scope.tkupdate.totalLlave                = 0;
              $scope.tkupdate.totalEnvio                = 0;
              $scope.tkupdate.totalService              = (isTotalHasChange==true || isTotalHasChange==false) && $scope.rsData.ticket.idTypeDeliveryKf!=$scope.delivery.idTypeDeliveryKf ? Number(updateTotalService)+Number($scope.tkupdate.priceShipping):updateTotalService;
              $scope.tkupdate.idUserAttendantKfDelivery = $scope.delivery.nameAtt;
              $scope.tkupdate.nameAttendantDelivery     = $scope.deliveryAtt.fullNameUser;
              isTotalHasChange = false;
            }

            /* THIRD PERSON FIELDS */
            $scope.tkupdate.idUserAttendantKfDelivery   = $scope.select.whoPickUp!=3?$scope.delivery.nameAtt:null;
            $scope.tkupdate.thirdPersonNames            = $scope.select.whoPickUp==3?$scope.third.names:null;
            $scope.tkupdate.thirdPersonPhone            = $scope.select.whoPickUp==3?$scope.third.movilPhone:null;
            $scope.tkupdate.thirdPersonId               = $scope.select.whoPickUp==3?$scope.third.dni:null;
            $scope.tkupdate.idTypeDeliveryKf            = $scope.delivery.idTypeDeliveryKf;
            $scope.tkupdate.idWhoPickUpKf               = $scope.select.whoPickUp;

            //$scope.tkupdate.idAdressKf                = !$scope.tkupdate.idAdressKf ? $scope.tkupdate.idAdress : $scope.tkupdate.idAdressKf;
            //$scope.tkupdate.idCompanyKf               = !$scope.tkupdate.idCompanyKf ? $scope.tkupdate.idCompany : $scope.tkupdate.idCompanyKf;
            //$scope.sendTicketData2Update($http, $scope);
            if (($scope.tkupdate.idStatusTicketKf==2 || $scope.tkupdate.idStatusTicketKf==3) && ($scope.tkupdate.SA_NRO_ORDER<=0 || $scope.tkupdate.SA_NRO_ORDER==null || !$scope.tkupdate.SA_NRO_ORDER)){
              console.log("UPDATING THE DELIVERY DATA");
              $scope.sendTicketData2Update($http, $scope);
            }else{
              console.log("ADDING TEMP DELIVERY DATA");
              $scope.sysTempDelivCancelDataFn(1);
            }
            
      }

      $scope.sendTicketData2Update = function($http, $scope){
            /* ASSIGN THE VALUES TO THE ROWS AFFECTED TO SAVE */

            $scope.rsData.ticket.totalService              = $scope.tkupdate.totalService;
            $scope.rsData.ticket.idUserAttendantKfDelivery = $scope.tkupdate.idUserAttendantKfDelivery;
            $scope.rsData.ticket.thirdPersonNames          = $scope.tkupdate.thirdPersonNames ;
            $scope.rsData.ticket.thirdPersonPhone          = $scope.tkupdate.thirdPersonPhone ;
            $scope.rsData.ticket.thirdPersonId             = $scope.tkupdate.thirdPersonId    ;
            $scope.rsData.ticket.idTypeDeliveryKf          = $scope.tkupdate.idTypeDeliveryKf ;
            $scope.rsData.ticket.idAdressKf                = $scope.tkupdate.idAdressKf       ;
            $scope.rsData.ticket.idCompanyKf               = $scope.tkupdate.idCompanyKf      ;
            $scope.rsData.ticket.idWhoPickUpKf             = $scope.tkupdate.idWhoPickUpKf    ;
            $scope.rsData.ticket.idUserHasChangeTicket     = $scope.sessionIdUser;
            /* PRINT THE ARRAY BEFORE UPDATE */
            //console.log($scope.rsData);
          ticketServices.updateTicket($scope.rsData).then(function(data){
           $scope.ticketResult = data;
            if($scope.ticketResult){
              console.log("TICKET UPDATED SUCCESSFULLY");
              inform.add('Ticket ha sido actualizado satisfactoriamente.',{
                ttl:3000, type: 'success'
              });
              $('#UpdateModalDelivery').modal('hide');
              $scope.dhboard();
            }else{
              inform.add('Ticket no ha sido actualizado, conctacta a el area de soporte.',{
                ttl:3000, type: 'warning'
              });
            }
          });
      }


    /**************************************************
    *                                                 *
    *          UPDATE TICKET DELIVERY DATA            *
    *                                                 *
    **************************************************/
      $scope.sysUpdateTmpTicketFn = function(data){
          console.clear();
          ticketServices.updateTmpTicket(data).then(function(data){
           $scope.ticketResult = data;
            if($scope.ticketResult){
              console.log("TICKET DELIVERY DATA UPDATED SUCCESSFULLY");
              inform.add('Envio actualizado satisfactoriamente.',{
                ttl:3000, type: 'success'
              });
              $scope.dhboard();

            }else{
              inform.add('Ticket no ha sido actualizado conctate el area de soporte.',{
                ttl:3000, type: 'warning'
              });
            }
          });
      }
    /**************************************************
    *                                                 *
    *          UPDATE TICKET DELIVERY DATA            *
    *                                                 *
    **************************************************/
      $scope.sysTmpChangeAppliedFn = function(id, value){
          ticketServices.changeApplied(id,value).then(function(data){});
      }
    /**************************************************
    *                                                 *
    *        TEMPORAL DELIVERY OR CANCEL DATA         *
    *                                                 *
    **************************************************/ 
      $scope.rsTemp = {};
      $scope.sysTempDelivCancelDataFn = function(option){
        switch (option){
          case 1:
            /* ASSIGN THE VALUES TO THE ROWS AFFECTED TO ADD THE TEMPORAL DATA */
            $scope.rsTemp.ticket                           = {};
            $scope.rsTemp.ticket.idTicketKf                = $scope.tkupdate.idTicket;
            $scope.rsTemp.ticket.idUserRequestChOrCancel   = $scope.sessionIdUser;
            $scope.rsTemp.ticket.totalGestion              = 0;
            $scope.rsTemp.ticket.totalLlave                = 0;
            $scope.rsTemp.ticket.totalEnvio                = 0;
            $scope.rsTemp.ticket.totalService              = $scope.tkupdate.totalService;
            $scope.rsTemp.ticket.idUserAttendantKfDelivery = $scope.tkupdate.idUserAttendantKfDelivery;
            $scope.rsTemp.ticket.thirdPersonNames          = $scope.tkupdate.thirdPersonNames ;
            $scope.rsTemp.ticket.thirdPersonPhone          = $scope.tkupdate.thirdPersonPhone ;
            $scope.rsTemp.ticket.thirdPersonId             = $scope.tkupdate.thirdPersonId    ;
            $scope.rsTemp.ticket.idTypeDeliveryKf          = $scope.tkupdate.idTypeDeliveryKf ;
            $scope.rsTemp.ticket.idWhoPickUpKf             = $scope.tkupdate.idWhoPickUpKf;
            $scope.tktmporal.isChangeDeliverylRequested    = 1;
            console.log($scope.rsTemp);
            $scope.sysAddDeliveryDataTmpFn($http, $scope, 1);
          break;
          case 2:
            $scope.rsTemp.ticket                           = {};
            $scope.rsTemp.ticket.idTicketKf                = $scope.tkupdate.idTicket;
            $scope.rsTemp.ticket.idUserRequestChOrCancel   = $scope.sessionIdUser;
            $scope.rsTemp.ticket.reasonForCancelTicket     = $scope.tkupdate.reasonForCancelTicket;
            $scope.tktmporal.isCancelRequested             = 1;
            console.log($scope.rsTemp);
            $scope.sysAddDeliveryDataTmpFn($http, $scope, 2); 
          break;
          case 3:
            $scope.rsTemp.ticket                           = {};
            $scope.rsTemp.ticket.idTicket                  = $scope.tkupdate.idTicket;
            $scope.rsTemp.ticket.idUserCancelTicket        = $scope.sessionIdUser;
            $scope.rsTemp.ticket.reasonForCancelTicket     = $scope.tkupdate.reasonForCancelTicket;
            $scope.rsTemp.ticket.idStatusTicketKfOld       = $scope.tkupdate.idStatusTicketKf;
            $scope.sysChangueStatusFn($scope.rsTemp.ticket.idTicket, 6);
            $scope.sysCancelTicketFn($scope.rsTemp);
          break;
        }
      }
      $scope.sysAddDeliveryDataTmpFn = function($http, $scope, option){
        /* PRINT THE ARRAY BEFORE UPDATE */
            console.log($scope.rsTemp);
          ticketServices.tmpDeliveryData($scope.rsTemp).then(function(data){
           $scope.ticketResult = data;
            if($scope.ticketResult){
              console.log("TEMPORAL DELIVERY DATA ADDED SUCCESSFULLY");
               if(option==1){
                $scope.rsData.ticket.isChangeDeliverylRequested = $scope.tktmporal.isChangeDeliverylRequested;
                $scope.rsData.ticket.idUserHasChangeTicket      = null;
               }else if(option==2){
                $scope.rsData.ticket.isCancelRequested = $scope.tktmporal.isCancelRequested;
                console.log($scope.rsData);
               }
                ticketServices.updateTicket($scope.rsData).then(function(data){
                   $scope.ticketResult = data;
                    if($scope.ticketResult){
                      if(option==1){
                        console.log("[isChangeDeliverylRequested] HAS BEEN SET TO 1");
                        inform.add('Solicitud de modificacion de envio ha sido enviada satisfactoriamente.',{
                        ttl:3000, type: 'success'
                        });
                        $('#UpdateModalDelivery').modal('hide');
                        $('#UpdateModalTicket').modal('hide');
                      }else if(option==2){
                        $('#UpdateModalTicket').modal('hide');
                        $('#CancelNotificationModal').modal('hide');
                        inform.add('Solicitud de cancelacion enviada satisfactoriamente.',{
                        ttl:3000, 
                        });
                      }
                      
                      $scope.dhboard();
                    }else{
                      inform.add('Ticket no ha sido actualizado, conctacta a el area de soporte.',{
                        ttl:3000, type: 'warning'
                      });
                    }
                });
            }else{
              inform.add('Ticket no ha sido actualizado, conctacta a el area de soporte.',{
                ttl:3000, type: 'warning'
              });
            }
          });
      }  
    /**************************************************
    *                                                 *
    *                  UPDATE COMMENT                 *
    *                                                 *
    **************************************************/ 
      $scope.sendTicketComment2Update = function(){
            /* ASSIGN THE VALUES TO THE ROWS AFFECTED TO SAVE */
            $scope.rsData.ticket.descriptionComment  = $scope.tkupdate.descriptionComment;
            $scope.rsData.ticket.isCommentOrDesccriptionChange = 1;

            /* PRINT THE ARRAY BEFORE UPDATE */
            console.log($scope.rsData);
            ticketServices.updateTicket($scope.rsData).then(function(data){
             $scope.ticketResult = data;
              if($scope.ticketResult){
                console.log("TICKET UPDATED SUCCESSFULLY");
                inform.add('El comentario sobre el ticket ha sido actualizado satisfactoriamente.',{
                  ttl:3000, type: 'success'
                });
                $scope.editComment = false;
                $scope.dhboard();
              }else{
                inform.add('Ticket no ha sido actualizado, conctacta a el area de soporte.',{
                  ttl:3000, type: 'warning'
                });
              }
          });
      }
    /**************************************************
    *                                                 *
    *              UPDATE DESCRIPTION                 *
    *                                                 *
    **************************************************/ 
      $scope.sendTicketDescription2Update = function(){
            /* ASSIGN THE VALUES TO THE ROWS AFFECTED TO SAVE */
            $scope.rsData.ticket.descriptionOrder  = $scope.tkupdate.descriptionOrder;
            $scope.rsData.ticket.isCommentOrDesccriptionChange = 1;

            /* PRINT THE ARRAY BEFORE UPDATE */
            console.log($scope.rsData);
            ticketServices.updateTicket($scope.rsData).then(function(data){
             $scope.ticketResult = data;
              if($scope.ticketResult){
                console.log("TICKET UPDATED SUCCESSFULLY");
                inform.add('La descripción del servicio ha sido actualizado satisfactoriamente.',{
                  ttl:3000, type: 'success'
                });
                $scope.editDescript = false;
                $scope.dhboard();
              }else{
                inform.add('Ticket no ha sido actualizado, conctacta a el area de soporte.',{
                  ttl:3000, type: 'warning'
                });
              }
          });
      }  
    /**************************************************
    *                                                 *
    *                ATTENDANT LIST                   *
    *                                                 *
    **************************************************/
      $scope.getAttendantList = function(obj){
        var idAddressTicket = !obj.idAdressKf?obj.idAdress:obj.idAdressKf;
        $scope.getAllAttendant(idAddressTicket);     
      }
    /**************************************************
    *                                                 *
    *               TICKET FILTER LIST                *
    *                                                 *
    **************************************************/
      $scope.ticketFiltered = function(){
          return function(item){
            if($scope.sessionidProfile!=1){
              while(item.sendUserNotification!=0){
                return true
              }
              return false;
            }else{
              return true;
            }
          }
      }

      $scope.removeFilterFn = function(option){
          switch(option){

            case 1:
              $scope.filterCompanyKf.selected=undefined;
              if($scope.filterAddressKf.selected){$scope.filterAddressKf.selected=undefined;}
            break; 
            case 2:
              $scope.filterAddressKf.selected=undefined;
            break;
            case 3:
            break;
            case 4:
            break; 
            case 5:
            break;
            case 6:
            break;                  
          }
          
      }
      $scope.systemChgValueFn = function(value, bol){
        switch(value){
          case "comment":
            $scope.editComment=bol;
            if(bol==true){
              $scope.tkupdate.descriptionCommentTmp=$scope.tkupdate.descriptionComment;
              $scope.tkupdate.descriptionComment="";
            }else{
              $scope.tkupdate.descriptionComment=$scope.tkupdate.descriptionCommentTmp;
            }
          break;
          case "descript":
            $scope.editDescript=bol;
            if(bol==true){
              $scope.tkupdate.descriptionOrderTmp=$scope.tkupdate.descriptionOrder;
                  $scope.tkupdate.descriptionOrder="";
            }else{
              $scope.tkupdate.descriptionOrder=$scope.tkupdate.descriptionOrderTmp;
            }
          break;
        }
      }
      $scope.rsTmp = {};
      $scope.rsJsonData = {};
      $scope.sysChkChangeOrCancel = function(value){
        $scope.rsJsonData = {};
        switch (value){
          case 0:
            /*TICKETS RECHAZADOS */
            ticketServices.getTickets2Check(0).then(function(data){
              $scope.rsJsonData = (data.tickets_all);
              //console.log($scope.rsJsonData);
              if($scope.rsJsonData){
               console.log("[sysChkChangeOrCancel] => Tickets with change or cancel rejected found"); 
                var listOfTicketsLength = $scope.rsJsonData.length;
                for (i = 0; i < listOfTicketsLength; i++) {
                  //console.log("for i: "+i);
                    if($scope.rsJsonData[i].isCancelRequested && $scope.rsJsonData[i].tmp_isCancelApproved==0){
                          $scope.rsTmp = {};
                          $scope.rsTmp.idTicket                    = $scope.rsJsonData[i].idTicket;
                          $scope.rsTmp.isChgOrCancel               = 0;

                          $scope.sysRejectedChgOrCancelTicketFn($scope.rsTmp);
                          console.log("[sysChkChangeOrCancel] => Cancel TIckets rejected Found => Updating tickets");
                           $scope.sysTmpChangeAppliedFn($scope.rsJsonData[i].idTmpDeliveryData,0);
                      
                    }else if($scope.rsJsonData[i].isChangeDeliverylRequested && $scope.rsJsonData[i].tmp_isChApproved==0){
                          $scope.rsTmp = {};
                          $scope.rsTmp.idTicket                    = $scope.rsJsonData[i].idTicket;
                          $scope.rsTmp.isChgOrCancel               = 1;
                          
                          $scope.sysRejectedChgOrCancelTicketFn($scope.rsTmp);
                          console.log("[sysChkChangeOrCancel] => Change TIckets Approved Found => Updating tickets");
                          $scope.sysTmpChangeAppliedFn($scope.rsJsonData[i].idTmpDeliveryData,0);
                    }
                };
              }else{
                console.log("[sysChkChangeOrCancel] => No changes or cancel Tickets rejected Found.");
              }
            });
          break;
          case 1:
            /*TICKETS APROBADOS */
            ticketServices.getTickets2Check(1).then(function(data){
              $scope.rsJsonData = (data.tickets_all);
              //console.log($scope.rsJsonData);
              if($scope.rsJsonData){
               console.log("[sysChkChangeOrCancel] => Tickets with change or cancel approved found"); 
                var listOfTicketsLength = $scope.rsJsonData.length;
                for (i = 0; i < listOfTicketsLength; i++) {
                  //console.log("for i: "+i);
                    if($scope.rsJsonData[i].isCancelRequested && $scope.rsJsonData[i].tmp_isCancelApproved==1){
                          $scope.rsTmp = {};
                          $scope.rsTmp.ticket                        = $scope.rsJsonData[i];
                          $scope.rsTmp.ticket.idTicket               = $scope.rsJsonData[i].idTicket;
                          $scope.rsTmp.ticket.idUserCancelTicket     = $scope.rsJsonData[i].tmp_idUserRequestChOrCancel;
                          $scope.rsTmp.ticket.reasonForCancelTicket  = $scope.rsJsonData[i].tmp_reasonForCancelTicket;

                          $scope.sysCancelTicketFn($scope.rsTmp);
                          console.log("[sysChkChangeOrCancel] => Cancel TIckets Approved Found => Updating tickets");
                          console.log($scope.rsTmp);
                          $scope.sysChangueStatusFn($scope.rsTmp.ticket.idTicket, 6);
                          $scope.sysTmpChangeAppliedFn($scope.rsJsonData[i].idTmpDeliveryData,1);
                      
                    }else if($scope.rsJsonData[i].isChangeDeliverylRequested && $scope.rsJsonData[i].tmp_isChApproved==1){
                          $scope.rsTmp = {};
                          $scope.rsTmp.ticket                            = $scope.rsJsonData[i];
                          $scope.rsTmp.ticket.idTicket                    = $scope.rsJsonData[i].idTicket;
                          $scope.rsTmp.ticket.idUserHasChangeTicket       = $scope.rsJsonData[i].tmp_idUserRequestChOrCancel;
                          $scope.rsTmp.ticket.thirdPersonNames            = $scope.rsJsonData[i].tmp_thirdPersonNames;
                          $scope.rsTmp.ticket.thirdPersonPhone            = $scope.rsJsonData[i].tmp_thirdPersonPhone;
                          $scope.rsTmp.ticket.thirdPersonId               = $scope.rsJsonData[i].tmp_thirdPersonId;
                          $scope.rsTmp.ticket.idUserAttendantKfDelivery   = $scope.rsJsonData[i].tmp_idUserAttendantKfDelivery;
                          $scope.rsTmp.ticket.idTypeDeliveryKf            = $scope.rsJsonData[i].tmp_idTypeDeliveryKf;
                          $scope.rsTmp.ticket.totalService                = $scope.rsJsonData[i].tmp_totalService;
                          $scope.rsTmp.ticket.idWhoPickUpKf               = $scope.rsJsonData[i].tmp_idWhoPickUpKf;
                          
                          $scope.sysUpdateTmpTicketFn($scope.rsTmp);
                          console.log("[sysChkChangeOrCancel] => Change TIckets Approved Found => Updating tickets");
                          console.log($scope.rsTmp);
                          $scope.sysTmpChangeAppliedFn($scope.rsJsonData[i].idTmpDeliveryData,1);
                    }
                };
              }else{
                console.log("[sysChkChangeOrCancel] => No changes or cancel Tickets Approved Found.");
              }
            });
          break;

        }
      }
    /**************************************************
    *                                                 *
    *                  SYS TOKEN GEN                  *
    *                                                 *
    **************************************************/      
      $scope.sysTokenFn = function(vLength){
          $scope.charters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.:';
          var randomString = '';
          for (i = 0; i < vLength; i++) {
              randomString += $scope.charters.charAt(Math.floor(Math.random() * $scope.charters.length));
          }
          return randomString;
      }
    /**************************************************
    *                                                 *
    *          CHECK IF AN ADDRESS IS IN DEBT         *
    *                                                 *
    **************************************************/
      $scope.sysCheckAddrIsInDebt = function(obj){
        $scope.rsResultData = null;
        if(obj!=null){
          console.log("[sysCheckAddrIsInDebt]==> IsInDebt:"+obj.IsInDebt);
          var selectAddress = $scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)? obj[0]:obj;
          addressServices.checkIfInDebt(selectAddress.idAdress).then(function(data){
            $scope.rsResultData = data;
            if($scope.rsResultData==1){
              
              $scope.selectIdAddressKf.selected=undefined;
              $scope.select.idAddressAtt = null;
              $scope.enabledNextBtn();
              console.log("CONSORCIO EN MORA.");
              $scope.msg1="Estimado usuario/a: "+$scope.sessionNames;
              $scope.msgUser="Cumplimos con informarle que el consorcio: "+selectAddress.nameAdress+", mantiene un caso administrativo con la empresa por lo tanto debera realizar la solicitud de su llavero comunicandose con la administracion de su consorcio.";
              $scope.msgAdm="Cumplimos con informarle que el consorcio: "+selectAddress.nameAdress+", se encuentra inhabilitado para realizar solicitudes de llaveros y/o servicios tecnicos, debido a retrasos de pagos de los abonos al dia y fecha, por favor comuniquese con nuestras oficinas comerciales para dar solucion al inconveniente.";
              $scope.msg2=$scope.sessionidProfile==4?$scope.msgAdm:$scope.msgUser;

                $('#notificationModal').modal('show');

              if($scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){
                $scope.rukeyup = false; 
                $scope.rukeydown = false;
                $('#notificationModal').on('hidden.bs.modal', function () {
                  $scope.fnShowHide('home', 'open');
                })
                
              }
              if(!$scope.sessionidProfile==5 || (!$scope.sessionidProfile==6 && !$scope.sessionidTypeTenant==2)){ 
                  inform.add('Selecione un consorcio por favor.',{
                      ttl:3000, type: 'warning'
                  });
              }
            }else{
              if($scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){
                switch($scope.div2Open){
                  case "rukeyup":
                    $scope.rukeyup = true;selectSwitch ('i');
                  break;
                  case "rukeydown":
                    $scope.rukeydown = true;selectSwitch ('i');
                  break;
                }
                
              }else{
              $scope.getDeparment(0,selectAddress.idAdress); 
              $scope.enabledNextBtn();
              $scope.getServicesValues(selectAddress.idAdress); 
              $scope.getKeyChains(selectAddress.idAdress); 
              }
            }
          });
        }
        
      }
    /**************************************************
    *                                                 *
    *      FUNCTION TO SEND TICKET NOTIFICATION       *
    *                                                 *
    **************************************************/
      $scope.mailFields={};
      $scope.sysRouteMailFn = function(tkTypeId, userProf){
        switch(tkTypeId){
          case "1":
            switch(userProf){
              case "1": //SYSTEM
                        console.log("---------------------------------------");
                        console.log("DATOS DE LA SOLICITUD DE ALTA DE LLAVE" );
                        console.log("           PARA ENVIAR EMAIL"           );
                        console.log("---------------------------------------");
                    
                        if($scope.tk_mail.u_owner){
                          //TO OWNER
                          console.log("Sending mail TO OWNER...");
                          $scope.mailFields.subject="NUEVO PEDIDO DE ALTA RECIBIDO &#45; AUTORIZADO"
                          $scope.mailFields.sendTo=" Propietario/a <strong>"+$scope.tk_mail.u_owner+"</strong>";
                          $scope.mailFields.mailTo=$scope.tk_mail.m_owner;
                          $scope.mailFields.body1="Le informamos que su pedido ha sido registrado y ya se encuentra autorizado.";
                          $scope.sysSendNotifyMail($scope.mailFields.sendTo, $scope.mailFields.mailTo, $scope.mailFields.subject, $scope.mailFields.body1);
                        }else if(!$scope.tk_mail.u_owner && $scope.tk_mail.u_tenant){
                          //TO TENANT
                          $scope.mailFields.subject="NUEVO PEDIDO DE ALTA RECIBIDO – AUTORIZADO"
                          $scope.mailFields.sendTo="coPropietario <strong>"+$scope.tk_mail.u_tenant+"</strong>";
                          $scope.mailFields.mailTo=$scope.tk_mail.m_tenant;
                          $scope.mailFields.body1="Le informamos que su pedido ha sido registrado y ya se encuentra autorizado."
                          $scope.sysSendNotifyMail($scope.mailFields.sendTo, $scope.mailFields.mailTo, $scope.mailFields.subject, $scope.mailFields.body1);
                        } 
                          console.log("Sending mail TO SYSTEM...");
                          setTimeout(function() {
                            $scope.mailFields.subject="NUEVO PEDIDO DE ALTA RECIBIDO &#45; AUTORIZADO"
                            $scope.mailFields.sendTo=" SISTEMA ONLINE <strong>"+$scope.tk_mail.u_system+"</strong>";
                            $scope.mailFields.mailTo="rexx84@gmail.com";
                            $scope.mailFields.body1="Le informamos que se ha sido registrado un nuevo pedido autorizado.";
                            $scope.sysSendNotifyMail($scope.mailFields.sendTo, $scope.mailFields.mailTo, $scope.mailFields.subject, $scope.mailFields.body1);
                          }, 200);
                          


                        //TO ATTENDANT
                        //TO ADMINISTRATION

              break;
              case "3": //OWNER
                        //FROM OWNER

                        //TO TENANT
                      $scope.mailFields.sendTo="coPropietario <strong>"+$scope.tk_mail.u_tenant+"</strong>";
                      $scope.mailFields.mailTo=$scope.tk_mail.m_tenant;
                      $scope.mailFields.body1="Le informamos que su pedido ha sido registrado, s&#243;lo debemos aguardar la autorizaci&#243;n por parte de la administraci&#243;n de su consorcio para poder gestionarlo.<br><br>";
              break;
              case "4": //FROM ADMIN CONSORCIO
                        //TO TENANT
                        //TO TENANT
              break;
              case "5": //TENANT
              break;
              case "6": //FROM ATTENDANT
                       //FROM OWNER

                       //TO TENANT
              break;
            }
          break;
          case "2":
          break;
        }
      }
    /**************************************************/
      $scope.sysSendNotifyMail = function(sendTo, mailTo, subject, body1){
        if($scope.tk_mail){

          /*subject of the email that will be send it*/
          $scope.mailTitle=subject;
          /*Email Address of the user who will received the notification*/
          $scope.mailTo=mailTo;
          $scope.mailBody="<div align='center' style='margin-left:auto; margin-right:auto'><table  border='0' cellpadding='0' cellspacing='0'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' bgcolor='#ffffff' width='100%' ><tbody><tr><td  align='center' valign='top' width='100%'><table align='center' border='0' cellpadding='0' cellspacing='0' width='1024'  style='width:1024px'><tbody><tr><td align='justify' valign='top' width='100%'><div style='padding:0px'>";
          $scope.mailBody+="<span style='text-align: left;'>Sr/a.";
          /*full User Names to who will received the email*/
          $scope.mailBody+=sendTo; 
          $scope.mailBody+="</span><br><br>" 
          $scope.mailBody+=body1;
          $scope.mailBody+="Recuerde que podr&#225; seguir el estado de su pedido desde el ";
          $scope.mailBody+="<a alt='Acceso al sistema' href='http://localhost/Coferba/Frond/sistema/'><strong>SISTEMA DE PEDIDOS ONLINE</strong></a> ";
          $scope.mailBody+=" en la secci&#243;n MONITOR DE PEDIDOS. Ante cualquier duda puede comunicarse con nosotros v&#237;a mail a llaveros@coferba.com.ar, telef&#243;nicamente al 5031-1207 o por whatsapp al n&#250;mero 11-5121-7919.";
          $scope.mailBody+="<br><br>Una vez que su pedido se encuentre listo para retirar en nuestras oficinas o asignado a la ruta de distribuci&#243;n para el env&#237;o seg&#250;n la opci&#243;n elegida por usted, se lo informaremos v&#237;a mail.";
          $scope.mailBody+="<br><br>A continuaci&#243;n encontrar&#225; la informaci&#243;n sobre su pedido:";
          $scope.mailBody+="<br><br><span style='padding-bottom: 1em;'><strong>DATOS DEL PEDIDO</strong></span>";
          $scope.mailBody+="<div style='font-size: 0.7em; line-height: 2em; padding: 15px 15px 15px 15px'>";
          $scope.mailBody+="<span>N&#218;MERO DE TICKET: "+$scope.tk_mail.tk_cod+"</span><br>";
          $scope.mailBody+="<span>DIRECCI&#211;N: "+$scope.tk_mail.rq_address+"</span><br>";
          $scope.mailBody+="<span>DESTINO: "+$scope.tk_mail.tk_type_delivery+"</span><br>";
          $scope.mailBody+="<span>DEPARTAMENTO: "+$scope.tk_mail.rq_deparment+ "</span><br> ";
          $scope.mailBody+="<span>"+$scope.tk_mail.tk_who_pickup+": ";
            if($scope.tk_mail.tk_type_delivery_id==2 && $scope.tk_mail.tk_who_pickup_id==2 && ($scope.tk_mail.tk_typeOfOption_id || $scope.tk_mail.tk_typeOfOption_id==null)){
              $scope.mailBody+=$scope.tk_mail.u_attend+"</span><br>";
            }else if(($scope.tk_mail.tk_type_delivery_id==1 && $scope.tk_mail.tk_who_pickup_id==1 && $scope.tk_mail.u_tenant) || ($scope.tk_mail.tk_type_delivery_id==1 && $scope.tk_mail.tk_who_pickup_id==1 && $scope.tk_mail.u_tenant && $scope.tk_mail.u_owner)){
              $scope.mailBody+=$scope.tk_mail.u_tenant+"</span><br>";
            }else if($scope.tk_mail.tk_type_delivery_id==1 && $scope.tk_mail.tk_who_pickup_id==1 && !$scope.tk_mail.u_tenant && $scope.tk_mail.u_owner){
              $scope.mailBody+=$scope.tk_mail.u_owner+"</span><br>";
            }
          $scope.mailBody+="<span>ADMINISTRACION: "+$scope.tk_mail.rq_company+"<br>";
          $scope.mailBody+="<span>TIPO DE PEDIDO: "+$scope.tk_mail.tk_type+"</span><br>";
          $scope.mailBody+="<span>CANTIDAD DE LLAVEROS DE "+$scope.tk_mail.tk_type+": "+$scope.tk_mail.tk_qtty+"</span></div>";
          $scope.mailBody+="<div style='font-size: 0.7em; line-height: 2em; padding: 15px 15px 15px 15px'><span>IMPORTE:</span><br>";
          $scope.mailBody+="<span>Gesti&#243;n: $"+$scope.tk_mail.tk_mgmt+"</span><br>";
          $scope.mailBody+="<span>Llaveros:     $"+$scope.tk_mail.tk_keys+"</span><br>";
          $scope.mailBody+="<span>Env&#237;o:   $"+$scope.tk_mail.tk_deliv+"</span><br><br>";
          $scope.mailBody+="<span>Total:        $"+$scope.tk_mail.tk_total+"</span></div><br>";
          $scope.mailBody+="</div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div>";
          
          mailServices.sendMail($scope.mailTo, $scope.mailTitle, $scope.mailBody).then(function(data){
            $scope.mailResult = data;
              if($scope.mailResult=="200"){
                  inform.add('Mail enviado con exito. ',{ttl:2000, type: 'success'});
              }else{
                  inform.add('Mail no enviado, contacte el area de soporte. ',{ttl:2000, type: 'danger'});
              }
          });
        }else{
                  inform.add('Mail no enviado, contacte el area de soporte. ',{ttl:2000, type: 'danger'});
        }

      }


    /**************************************************/
    /*                    ticket:
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
    +
    +
    +
    +
    +
    +
    +
    +
    +
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
    *                                                    F U N C I O N E S    D E   C L I E N T E S                                             *
    *                                                                                                                                           *
    *                                                                                                                                           *
    ********************************************************************************************************************************************/
    $scope.isNewCustomer=false;
    $scope.filterTypeOfClient='';
    $scope.defArrForCustomersFn = function(){
      $scope.btnBack=false;
      $scope.sysApiAddressNotFound=false;
      $scope.gobApiAddressNotFound=false;
      $scope.btnShow=true;
      $scope.stepIndexTmp=0;
      selectSwitch ("c"); 
      $scope.list_phones=[];
      $scope.list_depto_floors=[];
      $scope.list_phone_contact=[];
      $scope.list_schedule_atention =  [];
      $scope.list_departments = [];
      $scope.list_address_particular=[];
      $scope.list_mails_contact=[];
      $scope.list_mails=[];
      $scope.formValidated=false;
      $scope.idProvinceFk=null;
      $scope.rsAddress_API_Data_Main = [];
      $scope.rsAddress_API_Data_Payment = [];
      $scope.rsAddress_API_Data_PCA = [];
      $scope.geoLocation = {'address':'','addressLat':'', 'addressLon':'', 'option':''};
      $scope.tmpAddres = {'province':{},'location':{}};
      $scope.customer = {'new':{}, 'update':{}, 'info':{}, 'companyData':{}, 'particular':{}, 'select':{'main':{},'payment':{}, 'company':{}}};
      $scope.customer.select.main = {'address':{}, 'department':'', 'province':{'selected':undefined}, 'location':{'selected':undefined}, }
      $scope.customer.select.payment = {'address':{}, 'department':'', 'province':{'selected':undefined}, 'location':{'selected':undefined}}
      $scope.customer.particular    = {'isBuilding':false,'typeInmueble':'', 'nameAddress':'', 'address':'', 'floor':'','clarification':'', 'depto':'', 'select':{}}
      $scope.customer.particular.select = {'address':{}, 'depto':{}, 'province':{'selected':undefined}, 'location':{'selected':undefined}}
      $scope.customer.select.company={};
      $scope.customer.new = {
                            'idClientTypeFk':'', 
                            'name':'', 
                            'idAgentFk':'',
                            'businessName':'',
                            'CUIT':'', 
                            'observationOrderKey': '', 
                            'idDepartmentFk':'', 
                            'nameAddress':'', 
                            'idProvinceFk':'', 
                            'idLocationFk':'', 
                            'pageWeb':'', 
                            'observationSericeTecnic':'', 
                            'observationCollection':'', 
                            'observation':'', 
                            'isNotCliente':0, 
                            'localPhone':'', 
                            'mobilePhone':'', 
                            'mail':'',
                            'floor':'',
                            'department':'',
                            'idCategoryDepartamentFk':'',
                            'numberUNF':'',
                            'departmentUnit':'',
                            'idZonaFk':'',
                            'departmentCorrelation':'', 
                            'billing_information':{
                                'businessNameBilling':'', 
                                'cuitBilling':'', 
                                'nameAddress':'', 
                                'idLocationBillingFk':undefined, 
                                'idProvinceBillingFk':undefined, 
                                'idTypeTaxFk':''
                            }, 
                            'list_departament':{
                                'floor':'', 
                                'departament':'', 
                                'idCategoryDepartamentFk':'',
                                'numberUNF':''
                            },
                            'list_address_particular':{
                                'address':'',
                                'depto':'',
                                'isBuilding':'',
                                'idProvinceFk':'',
                                'idLocationFk':'',
                                'idDepartmentFk':'',
                                'clarification':'',
                                'idTipoInmuebleFk':'',
                                'idZonaFk':'',
                                'addressLat':'',
                                'addressLon':''

                            },
                            'list_emails':{
                                'mailTag':'',
                                'mailContact':'',
                                'idTipoDeMailFk':''
                            }                            
      };
    }
    $scope.cleanCustomerFieldFn = function(){
      $scope.btnBack=false;
      $scope.btnShow=true;
      $scope.sysApiAddressNotFound=false;
      $scope.gobApiAddressNotFound=false;
      $scope.stepIndexTmp=0;
      selectSwitch ("c"); 
      $scope.geoLocation = {'address':'','addressLat':'', 'addressLon':'', 'option':''};
      $scope.customer.new.billing_information={'businessNameBilling':'', 'cuitBilling':'', 'nameAddress':'', 'idLocationBillingFk':'', 'idProvinceBillingFk':'',  'idTypeTaxFk':''};
      $scope.customer.new.list_departament={'floor':'', 'departament':'', 'idCategoryDepartamentFk':'', 'numberUNF':''};
      $scope.customer.new.list_address_particular={'address':'', 'depto':'', 'isBuilding':'', 'idProvinceFk':'', 'idLocationFk':'', 'idDepartmentFk':'','clarification':'', 'idTipoInmuebleFk':''};
      $scope.customer.select.main = {'address':{}, 'department':'', 'province':{'selected':undefined}, 'location':{'selected':undefined}, }
      $scope.customer.select.payment = {'address':{}, 'department':'', 'province':{}, 'location':{}}
      $scope.customer.particular    = {'isBuilding':false,'typeInmueble':'', 'nameAddress':'', 'address':'', 'floor':'','clarification':'', 'depto':'', 'select':{}}
      $scope.customer.particular.select = {'address':{}, 'depto':{}, 'province':{'selected':undefined}, 'location':{'selected':undefined}}
      $scope.customer.select.company={};
      $scope.list_phones=[];
      $scope.list_department_multi={'garage':'','floor':'','departament':'','correlacion':undefined,'unidad':undefined, 'idCategoryDepartamentFk':''};
      $scope.list_depto_floors=[];
      $scope.list_phone_contact=[];
      $scope.list_schedule_atention =  [];
      $scope.setScheduleListFn();
      $scope.list_departments = [];
      $scope.list_address_particular=[];
      $scope.list_mails_contact=[];
      $scope.list_mails=[];
      $scope.idProvinceFk=null;
    }
    $scope.defArrForCustomersFn();   
    $scope.switchCustomersFn = function(opt1, fnObj, opt2){
      var cObj = !fnObj || fnObj==undefined ? null : fnObj;
      switch (opt1){
        case "dashboard":
          switch (opt2){
            case "registered":
              $scope.sysContent = "";
              $scope.getCustomerListFn("registered",1);
              $scope.filterTypeOfClient='';
              $scope.filterCustomerIdFk.selected=undefined;
              //$scope.customerPaginationFn($scope.rsCustomerListData, 10);
              $scope.loadPagination($scope.rsCustomerListData, "idClient", "10");
              $scope.sysContent = 'registeredCustomers';
            break;
            case "unregistered":
              $scope.sysContent = "";
              $scope.getCustomerListFn("notRegistered",1);
              $scope.filterTypeOfClient=undefined;
              $scope.filterCustomerIdFk.selected=undefined;
              $scope.loadPagination($scope.rsCustomerListData, "idClient", "10");
              $scope.sysContent = 'registeredNotCustomers';
            break;
          }
          
        break; 
        case "new":
          $scope.isNewCustomer=true;
          $scope.setScheduleListFn();
          $scope.defArrForCustomersFn();  
          $scope.getCustomerListFn("", 2);        
          $scope.customer.new.isNotCliente=false;
          $('#RegisterModalCustomer').modal({backdrop: 'static', keyboard: false});
            $('#RegisterModalCustomer').on('shown.bs.modal', function () {
                $('#customer_type').focus();
          });
        break;
        case "add":
          $scope.fnNewCustomerFn(cObj);
        break; 
        case "edit":
          $scope.isNewCustomer=false;
          $scope.setScheduleListFn();
          $scope.defArrForCustomersFn();
          $scope.getCustomerListFn("", 2);
          $scope.customer.update.isNotCliente=false;
          blockUI.start('Cargando datos del cliente '+cObj.ClientType);
          $timeout(function() {
            $scope.customerDataFn(cObj, 'edit');
          }, 1500); 
          
        break;
        case "update":
          $scope.customerDataFn(cObj, 'update');
        break;        
        case "enabled":
          //Enabled client function
        break; 
        case "disabled":
          //disabled client function
        break;
        case "remove":
          //remove client function
        break;
        case "phonesandschedule":
          $scope.customerDataFn(cObj,'phones');   
        break;  
        case "seemails":
          $scope.customerDataFn(cObj,'mails');
        break;
        case "departments":
          $scope.customerDataFn(cObj,'deptos');
        break;
        case "particularAddress":
          $scope.customerDataFn(cObj,'particularAddress');
        break;
        case "services":
          //Services client function
        break;                                      
        case "authUsers":
          $scope.getUserLists(); 
          $('#authorizedUsers').modal('toggle'); 
        break;
        case "uploadFiles":
          $('#attachCustomerFiles').modal('toggle');
        break;
        default:
      }
    }
    /**************************************************
    *                                                 *
    *                 ADD NEW CUSTOMER                *
    *                                                 *
    **************************************************/
        /******************************
        *    GETTING CUSTOMER DATA    *
        ******************************/    
          $scope.fnNewCustomerFn = function(client){
            var switchOption = client.idClientTypeFk;
            //console.log(switchOption);
            switch(switchOption){
              case "1": //ADMINISTRATION CUSTOMER
                    //Getting the customer schedule setting
                    $scope.customer.new.list_schedule_atention                    = $scope.list_schedule_time_orderBy;
                    //Getting the customer phones contact list
                    $scope.customer.new.list_phone_contact                        = $scope.list_phone_contact;
                    //Getting the customer Mail list
                    $scope.customer.new.list_emails                               = $scope.list_mails_contact;
                    //Getting the authorized user to the new customer
                    $scope.customer.new.list_client_user                          = $scope.list_client_user;
                    if ($scope.customer.new.typeInmueble==1 && $scope.customer.new.isNotCliente==true){
                      $scope.customer.new.idDepartmentFk                          = $scope.customer.select.main.department;
                      $scope.customer.new.address                                 = $scope.customer.select.main.address.selected.address;
                      $scope.customer.new.idProvinceFk                            = $scope.customer.select.main.address.selected.idProvinceFk;
                      $scope.customer.new.idLocationFk                            = $scope.customer.select.main.address.selected.idLocationFk;
                      $scope.customer.new.addressLat                              = $scope.customer.select.main.address.selected.addressLat;
                      $scope.customer.new.addressLon                              = $scope.customer.select.main.address.selected.addressLon;

                    }else{
                      $scope.customer.new.idDepartmentFk                          = null;
                      $scope.customer.new.idProvinceFk                            = $scope.customer.select.main.province.selected.idProvince;
                      $scope.customer.new.idLocationFk                            = $scope.customer.select.main.location.selected.idLocation;
                      $scope.customer.new.idCategoryDepartamentFk                 = "1";
                      $scope.customer.new.numberUNF                               = null;
                    }

                    $scope.customer.new.billing_information.idProvinceBillingFk   = $scope.customer.select.payment.province.selected.idProvince;
                    $scope.customer.new.billing_information.idLocationBillingFk   = $scope.customer.select.payment.location.selected.idLocation;
                    //Assigning the default value to 0
                    $scope.customer.new.isNotCliente                              = 0;
                    $scope.customer.new.idClientAdminFk                           = 0;
                    $scope.customer.new.idClientCompaniFk                         = 0;
                    $scope.customer.new.idTipoInmuebleFk                          = $scope.customer.new.typeInmueble;
                    //Printing the current array before add the customer
                    console.log($scope.customer.new);
                    //Send the customer data to the addcustomer service
                    $scope.fnAddCustomerFn($scope.customer.new);        
              break;
              case "2": //BUILDING CUSTOMER
                    //Getting the customer schedule setting
                    $scope.customer.new.list_schedule_atention                    = $scope.list_schedule_time_orderBy;
                    //Getting the customer phones contact list
                    $scope.customer.new.list_phone_contact                        = $scope.list_phone_contact;
                    //Getting the department that was created
                    $scope.selectDeptoDataFn();
                    $scope.customer.new.list_departament                          = $scope.list_departments;
                    //Getting the customer Mail list
                    $scope.customer.new.list_emails                               = $scope.list_mails_contact;
                    //Getting the authorized user to the new customer
                    $scope.customer.new.list_client_user                          = $scope.list_client_user;
                    $scope.customer.new.idProvinceFk                              = $scope.customer.select.main.province.selected.idProvince;
                    $scope.customer.new.idLocationFk                              = $scope.customer.select.main.location.selected.idLocation;
                    $scope.customer.new.billing_information.idProvinceBillingFk   = $scope.customer.select.payment.province.selected.idProvince;
                    $scope.customer.new.billing_information.idLocationBillingFk   = $scope.customer.select.payment.location.selected.idLocation;
                    //Assigning the default value to 0
                    $scope.customer.new.isNotCliente                              = 0;
                    $scope.customer.new.idClientAdminFk                           = $scope.customer.select.company.selected!=undefined?$scope.customer.companyData.idClient:null;
                    $scope.customer.new.idClientCompaniFk                         = null;
                    $scope.customer.new.idDepartmentFk                            = null;
                    $scope.customer.new.idTipoInmuebleFk                          = null;
                    $scope.customer.new.name                                      = $scope.customer.new.address;
                    $scope.customer.new.departmentUnit                            = $scope.list_department_multi.unidad;
                    $scope.customer.new.departmentCorrelation                     = $scope.list_department_multi.correlacion;
                    //Printing the current array before add the customer
                    console.log($scope.customer.new);
                    //Send the customer data to the addcustomer service
                    $scope.fnAddCustomerFn($scope.customer.new);                     
              break;
              case "3": //COMPANY CUSTOMER
                    //Getting the customer schedule setting
                    $scope.customer.new.list_schedule_atention                    = $scope.list_schedule_time_orderBy;
                    //Getting the customer phones contact list
                    $scope.customer.new.list_phone_contact                        = $scope.list_phone_contact;
                    //Getting the customer Mail list
                    $scope.customer.new.list_emails                               = $scope.list_mails_contact;
                    //Getting the authorized user to the new customer
                    $scope.customer.new.list_client_user                          = $scope.list_client_user;
                    if ($scope.customer.new.typeInmueble==1 && $scope.customer.new.isNotCliente==true){
                      $scope.customer.new.idDepartmentFk                          = $scope.customer.select.main.department;
                      $scope.customer.new.address                                 = $scope.customer.select.main.address.selected.address;
                      $scope.customer.new.idProvinceFk                            = $scope.customer.select.main.address.selected.idProvinceFk;
                      $scope.customer.new.idLocationFk                            = $scope.customer.select.main.address.selected.idLocationFk;
                      $scope.customer.new.addressLat                              = $scope.customer.select.main.address.selected.addressLat;
                      $scope.customer.new.addressLon                              = $scope.customer.select.main.address.selected.addressLon;

                    }else{
                      $scope.customer.new.idDepartmentFk                          = null;
                      $scope.customer.new.idProvinceFk                            = $scope.customer.select.main.province.selected.idProvince;
                      $scope.customer.new.idLocationFk                            = $scope.customer.select.main.location.selected.idLocation;
                      $scope.customer.new.idCategoryDepartamentFk                 = "1";
                      $scope.customer.new.numberUNF                               = null;
                    }
                    $scope.customer.new.billing_information.idProvinceBillingFk   = $scope.customer.select.payment.province.selected.idProvince;
                    $scope.customer.new.billing_information.idLocationBillingFk   = $scope.customer.select.payment.location.selected.idLocation;
                    //Assigning the value of the field isNotCliente to 0
                    $scope.customer.new.isNotCliente                              = 0;
                    $scope.customer.new.idClientAdminFk                           = null;
                    $scope.customer.new.idClientCompaniFk                         = null;
                    $scope.customer.new.idDepartmentFk                            = null;
                    $scope.customer.new.idTipoInmuebleFk                          = $scope.customer.new.typeInmueble;
                    //Printing the current array before add the customer
                    console.log($scope.customer.new);
                    //Send the customer data to the addcustomer service
                    $scope.fnAddCustomerFn($scope.customer.new);                      
              break;
              case "4": //BRANCH CUSTOMER
                    //Getting the customer schedule setting
                    $scope.customer.new.list_schedule_atention                    = $scope.list_schedule_time_orderBy;
                    //Getting the customer phones contact list
                    $scope.customer.new.list_phone_contact                        = $scope.customer.companyData.list_phone_contact;
                    //Getting the customer Mail list
                    $scope.customer.new.list_emails                               = $scope.list_mails_contact;
                    //Getting the authorized user to the new customer
                    $scope.customer.new.list_client_user                          = $scope.list_client_user;
                    if ($scope.customer.new.typeInmueble==1 && $scope.customer.new.isNotCliente==true){
                      $scope.customer.new.idDepartmentFk                          = $scope.customer.select.main.department;
                      $scope.customer.new.address                                 = $scope.customer.select.main.address.selected.address;
                      $scope.customer.new.idProvinceFk                            = $scope.customer.select.main.address.selected.idProvinceFk;
                      $scope.customer.new.idLocationFk                            = $scope.customer.select.main.address.selected.idLocationFk;
                      $scope.customer.new.addressLat                              = $scope.customer.select.main.address.selected.addressLat;
                      $scope.customer.new.addressLon                              = $scope.customer.select.main.address.selected.addressLon;

                    }else{
                      $scope.customer.new.idDepartmentFk                          = null;
                      $scope.customer.new.idProvinceFk                            = $scope.customer.select.main.province.selected.idProvince;
                      $scope.customer.new.idLocationFk                            = $scope.customer.select.main.location.selected.idLocation;
                      $scope.customer.new.idCategoryDepartamentFk                 = "1";
                      $scope.customer.new.numberUNF                               = null;
                    }
                    $scope.customer.new.billing_information.idProvinceBillingFk   = $scope.customer.select.payment.province.selected.idProvince;
                    $scope.customer.new.billing_information.idLocationBillingFk   = $scope.customer.select.payment.location.selected.idLocation;
                    //Assigning the value of the field isNotCliente to 0
                    $scope.customer.new.idClientAdminFk                           = 0;
                    $scope.customer.new.isNotCliente                              = 0;
                    $scope.customer.new.idClientCompaniFk                         = $scope.customer.select.company.selected!=undefined?$scope.customer.companyData.idClient:null;
                    $scope.customer.new.name                                      = $scope.customer.new.address;
                    $scope.customer.new.idTipoInmuebleFk                          = $scope.customer.new.typeInmueble;
                    //Printing the current array before add the customer
                    console.log($scope.customer.new);
                    //Send the customer data to the addcustomer service
                    $scope.fnAddCustomerFn($scope.customer.new);                      
              break;
              case "5": //PARTICULAR CUSTOMER
                    $scope.customer.new.list_address_particular                   = $scope.list_address_particular;
                    $scope.customer.new.billing_information.idProvinceBillingFk   = $scope.customer.select.payment.province.selected.idProvince;
                    $scope.customer.new.billing_information.idLocationBillingFk   = $scope.customer.select.payment.location.selected.idLocation;
                    //Assigning the value of the field isNotCliente to 0
                    $scope.customer.new.isNotCliente                              = 0;
                    $scope.customer.new.idTipoInmuebleFk                          = null;
                    $scope.list_phone_contact = [];
                    if ($scope.customer.new.mobilePhone!=''){
                      $scope.list_phone_contact.push({"phoneTag":"mobile", "phoneContact":$scope.customer.new.mobilePhone});
                    }
                    if ($scope.customer.new.localPhone!=''){
                      $scope.list_phone_contact.push({"phoneTag":"local", "phoneContact":$scope.customer.new.localPhone});
                    }

                    $scope.customer.new.list_phone_contact                        = $scope.list_phone_contact;
                    //Printing the current array before add the customer
                    console.log($scope.customer.new);
                    //Send the customer data to the addcustomer service
                    $scope.fnAddCustomerFn($scope.customer.new);                      
              break;                    
              default:
            }
          };
        /******************************
        *   ADDING NEW THE CUSTOMER   *
        ******************************/
          $scope.fnAddCustomerFn = function(client){
            CustomerServices.addCustomer(client).then(function(data){
                $scope.rsJsonData = data;
                //console.log($scope.rsJsonData);
                if($scope.rsJsonData.status==200){
                  console.log("Customer Successfully Created");
                  inform.add('Registro de cliente realizado con exito. ',{
                        ttl:2000, type: 'success'
                  });
                  $('#RegisterModalCustomer').modal('hide');
                }else if($scope.rsJsonData.status==203){
                  console.log("Customer already exist, contact administrator");
                  inform.add('INFO: Cliente ya se encuentra registrado. ',{
                        ttl:2000, type: 'warning'
                  });
                  //$('#RegisterModalCustomer').modal('hide');
                }else if($scope.rsJsonData.status==500){
                  console.log("Customer not Created, contact administrator");
                  inform.add('Error: [500] Contacta al area de soporte. ',{
                        ttl:2000, type: 'danger'
                  });
                  //$('#RegisterModalCustomer').modal('hide');
                }
                  $scope.getCustomerListFn("",1);
                //console.log($scope.rsLocations_API_Data);
            });
          };
    /**************************************************
    *                                                 *
    *                UPDATE CUSTOMER                  *
    *                                                 *
    **************************************************/
        /******************************
        *     SELECT CUSTOMER DATA    *
        ******************************/
          $scope.chekBox={row: {}};
          $scope.tmpVars ={};
          $scope.customerDataFn=function(obj, switchOption){
            console.info("-------------------------");
            console.info(" showCustomerAdminFields ");
            console.info("-------------------------");
            //console.log(obj);
            var subOption = obj.idClientTypeFk;
            switch (switchOption){
                case "edit":
                  switch (subOption){
                    case "1": //ADMINISTRATION CUSTOMER
                      $timeout(function() {
                        $scope.customer.update=obj;
                        $scope.tmpVars.list_schedule_atention=obj.list_schedule_atention;
                        $scope.customer.update.billing_information=obj.billing_information[0];
                        console.info($scope.customer.update);
                        var chekbDays = $scope.chekBox.row;
                        /*PUT ALL THE CHECKBOXES TO FALSE OR UNCHECKED STATE */
                        for (var key in chekbDays){
                            if (chekbDays[key]==true){
                              $scope.chekBox.row[key]=false;
                            }
                        }
                        var arrProvince  = [];
                        var arrLocation = [];                              
                        arrProvince = $scope.getCustomerProvinceNameFromIdFn($scope.customer.update.idProvinceFk);
                        arrLocation= $scope.getCustomerLocationNameFromIdFn($scope.customer.update.idLocationFk, $scope.customer.update.idProvinceFk);
                        $scope.customer.select.main.province.selected = {idProvince: arrProvince[0].idProvince, province: arrProvince[0].province};
                        $scope.customer.select.main.location.selected = {idLocation: arrLocation[0].idLocation, location: arrLocation[0].location};

                        $scope.customer.update.nameAddress=$scope.customer.update.idClientDepartamentFk==null||$scope.customer.update.idClientDepartamentFk==''?$scope.customer.update.address:'';
                        $scope.customer.select.main.address.selected=$scope.customer.update.idClientDepartamentFk!=null?{address:$scope.customer.update.address}:undefined;

                        if($scope.customer.update.idClientDepartamentFk){
                          $scope.getBuildingsDeptosFn($scope.customer.update.idClientDepartamentFk);
                          $scope.customer.select.main.department=$scope.customer.update.idClientDepartamentFk;
                        }else{
                          $scope.addrrSelected=true;
                        }
                        //blockUI.message('Cargando telefonos del cliente '+obj.list_phone_contact.length);
                        //PHONES
                        $scope.list_phone_contact=[];
                        $scope.list_phones=[];  
                        if (obj.list_phone_contact.length>0){
                          for (var key in  obj.list_phone_contact){
                            //console.log(obj.list_phone_contact[key]);
                            $scope.list_phone_contact.push(obj.list_phone_contact[key]);
                            $scope.list_phones.push(obj.list_phone_contact[key]);
                          }
                        }
                        //blockUI.message('Cargando correos del cliente '+obj.list_emails.length);
                        //MAILS
                        $scope.list_mails_contact=[];
                        $scope.list_mails=[];
                        var typeName = '';
                        if (obj.list_emails.length>0){
                          for (var key in  obj.list_emails){
                            for (var type in $scope.rsTypeOfMailsData){
                              if ($scope.rsTypeOfMailsData[type].idTipoMail==obj.list_emails[key].idTipoDeMailFk){
                                typeName= $scope.rsTypeOfMailsData[type].descripcion;
                              }
                            }
                            $scope.list_mails_contact.push({'idClientMail':obj.list_emails[key].idClientMail, 'idClientFk': obj.list_emails[key].idClientFk, 'mailTag':obj.list_emails[key].mailTag, 'mailContact':obj.list_emails[key].mailContact, 'idTipoDeMailFk': obj.list_emails[key].idTipoDeMailFk, 'status':obj.list_emails[key].status});
                            $scope.list_mails.push({'idClientMail':obj.list_emails[key].idClientMail, 'idClientFk': obj.list_emails[key].idClientFk, 'mailTag':obj.list_emails[key].mailTag, 'mailContact':obj.list_emails[key].mailContact, 'idTipoDeMailFk': obj.list_emails[key].idTipoDeMailFk, 'status':obj.list_emails[key].status});
                          }
                        }
                        //blockUI.message('Cargando horarios del cliente '+$scope.tmpVars.list_schedule_atention.length);
                        //SCHEDULE
                        for (var i = 0; i < $scope.tmpVars.list_schedule_atention.length; i++) {
                          if($scope.tmpVars.list_schedule_atention[i].day==$scope.list_schedule[i].day){
                            //Load the data to the list that will be render in the frontend
                            $scope.list_schedule[i].fronAm    = $scope.tmpVars.list_schedule_atention[i].fronAm;
                            $scope.list_schedule[i].toAm      = $scope.tmpVars.list_schedule_atention[i].toAm;
                            $scope.list_schedule[i].fronPm    = $scope.tmpVars.list_schedule_atention[i].fronPm;
                            $scope.list_schedule[i].toPm      = $scope.tmpVars.list_schedule_atention[i].toPm;
                            $scope.list_schedule[i].selected  = true;
                            //Load the data to a temp array to handle the schedule
                            $scope.list_schedule_atention.push({
                                'idScheduleAtention':$scope.tmpVars.list_schedule_atention[i].idScheduleAtention,
                                'idClienteFk':$scope.tmpVars.list_schedule_atention[i].idClienteFk, 
                                'day':$scope.tmpVars.list_schedule_atention[i].day, 
                                'fronAm':$scope.tmpVars.list_schedule_atention[i].fronAm, 
                                'toAm':$scope.tmpVars.list_schedule_atention[i].toAm, 
                                'fronPm':$scope.tmpVars.list_schedule_atention[i].fronPm, 
                                'toPm':$scope.tmpVars.list_schedule_atention[i].toPm});
                          }
                        }
                        //blockUI.message('Cargando usuarios autorizados del cliente '+obj.list_client_user.length);
                        //USERS
                        $scope.list_id_user = [];
                        $scope.list_users   = [];
                        if (obj.list_client_user.length>0){
                          for (var user in  obj.list_client_user){
                            //console.log(obj.list_client_user[key]);
                            $scope.list_client_user.push({'idUserFk':obj.list_client_user[user].idUser,'idClientFk': obj.list_emails[key].idClientFk});
                            $scope.list_users.push({'idUserFk':obj.list_client_user[user].idUser, 'fullNameUser':obj.list_client_user[user].fullNameUser,'idClientFk': obj.list_emails[key].idClientFk});
                          }
                        }
                        $('#UpdateModalCustomer').modal({backdrop: 'static', keyboard: false});
                        $('#UpdateModalCustomer').on('shown.bs.modal', function () {
                        });
                      blockUI.stop();                              
                      }, 1500);
                        $scope.enabledNextBtn();                   
                    break;
                    case "2": //BUILDING CUSTOMER
                      $timeout(function() {
                        $scope.customer.update=obj;
                        $scope.tmpVars.list_schedule_atention=obj.list_schedule_atention;
                        $scope.customer.update.billing_information=obj.billing_information[0];
                        console.info($scope.customer.update);
                        var chekbDays = $scope.chekBox.row;
                        //console.log($scope.tmpVars.billing_information);
                        /*PUT ALL THE CHECKBOXES TO FALSE OR UNCHECKED STATE */
                        for (var key in chekbDays){
                            if (chekbDays[key]==true){
                              $scope.chekBox.row[key]=false;
                            }
                        }
                        var arrProvince  = [];
                        var arrLocation = [];                              
                        arrProvince = $scope.getCustomerProvinceNameFromIdFn($scope.customer.update.idProvinceFk);
                        arrLocation= $scope.getCustomerLocationNameFromIdFn($scope.customer.update.idLocationFk, $scope.customer.update.idProvinceFk);
                        $scope.customer.select.main.province.selected = {idProvince: arrProvince[0].idProvince, province: arrProvince[0].province};
                        $scope.customer.select.main.location.selected = {idLocation: arrLocation[0].idLocation, location: arrLocation[0].location};

                        $scope.customer.update.nameAddress=$scope.customer.update.address;

                        //COMPANY RELATED
                        var arrCompany=[]
                        arrCompany=$scope.getCustomerBusinessNameByIdFn($scope.customer.update.idClientAdminFk);
                        //console.log(arrCompany[0]);
                        $scope.customer.select.company.selected= {'idClient':arrCompany[0].idClient, 'businessName':arrCompany[0].businessName}
                        if($scope.customer.update.idClientDepartamentFk){
                            $scope.getBuildingsDeptosFn($scope.customer.update.idClientDepartamentFk);
                            $scope.customer.select.main.department=$scope.customer.update.idClientDepartamentFk;
                        }else{
                            $scope.addrrSelected=true;
                        }
                        //PHONES
                        $scope.list_phone_contact=[];
                        $scope.list_phones=[];  
                        if (obj.list_phone_contact.length>0){
                          for (var key in  obj.list_phone_contact){
                            //console.log(obj.list_phone_contact[key]);
                            $scope.list_phone_contact.push({'idClientFk': obj.list_phone_contact[key].idClientFk,'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
                            $scope.list_phones.push({'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
                          }
                        }
                        //MAILS
                        $scope.list_mails_contact=[];
                        $scope.list_mails=[];
                        var typeName = '';
                        if (obj.list_emails.length>0){
                          for (var key in  obj.list_emails){
                            for (var type in $scope.rsTypeOfMailsData){
                              if ($scope.rsTypeOfMailsData[type].idTipoMail==obj.list_emails[key].idTipoDeMailFk){
                                typeName= $scope.rsTypeOfMailsData[type].descripcion;
                              }
                            }
                            $scope.list_mails_contact.push({'idClientMail':obj.list_emails[key].idClientMail, 'idClientFk': obj.list_emails[key].idClientFk, 'mailTag':obj.list_emails[key].mailTag, 'mailContact':obj.list_emails[key].mailContact, 'idTipoDeMailFk': obj.list_emails[key].idTipoDeMailFk, 'status':obj.list_emails[key].status});
                            $scope.list_mails.push({'idClientMail':obj.list_emails[key].idClientMail, 'idClientFk': obj.list_emails[key].idClientFk, 'mailTag':obj.list_emails[key].mailTag, 'mailContact':obj.list_emails[key].mailContact, 'idTipoDeMailFk': obj.list_emails[key].idTipoDeMailFk, 'status':obj.list_emails[key].status});
                          }
                        }
                        //SCHEDULE 
                        for (var i = 0; i < $scope.tmpVars.list_schedule_atention.length; i++) {
                          if($scope.tmpVars.list_schedule_atention[i].day==$scope.list_schedule[i].day){
                            //Load the data to the list that will be render in the frontend
                            $scope.list_schedule[i].fronAm    = $scope.tmpVars.list_schedule_atention[i].fronAm;
                            $scope.list_schedule[i].toAm      = $scope.tmpVars.list_schedule_atention[i].toAm;
                            $scope.list_schedule[i].fronPm    = $scope.tmpVars.list_schedule_atention[i].fronPm;
                            $scope.list_schedule[i].toPm      = $scope.tmpVars.list_schedule_atention[i].toPm;
                            $scope.list_schedule[i].selected  = true;
                            //Load the data to a temp array to handle the schedule
                            $scope.list_schedule_atention.push({
                                'idClienteFk':$scope.tmpVars.list_schedule_atention[i].idClienteFk, 
                                'day':$scope.tmpVars.list_schedule_atention[i].day, 
                                'fronAm':$scope.tmpVars.list_schedule_atention[i].fronAm, 
                                'toAm':$scope.tmpVars.list_schedule_atention[i].toAm, 
                                'fronPm':$scope.tmpVars.list_schedule_atention[i].fronPm, 
                                'toPm':$scope.tmpVars.list_schedule_atention[i].toPm});
                          }
                        }
                        //DEPARTMENTS
                        $scope.rolePermission="rw";
                        $scope.list_depto_floors=[];              
                        $scope.list_floor="";                                                
                        $scope.list_department_multi.unidad=$scope.customer.update.departmentUnit;
                        $scope.list_department_multi.correlacion=$scope.customer.update.departmentCorrelation;
                        var i=3;
                        //console.log($scope.customer.info.list_departament);
                        $scope.list_depto_floors.push({'id':0,'nameFloor':'co', 'deptos':[]});
                        $scope.list_depto_floors.push({'id':1,'nameFloor':'ba', 'deptos':[]});
                        $scope.list_depto_floors.push({'id':2,'nameFloor':'lo', 'deptos':[]});
                        $scope.list_depto_floors.push({'id':3,'nameFloor':'pb', 'deptos':[]});
                        for (var floor in $scope.customer.update.list_departament){
                          if ($scope.customer.update.list_departament[floor].floor!="co" && $scope.customer.update.list_departament[floor].floor!="ba" && $scope.customer.update.list_departament[floor].floor!="lo" && $scope.customer.update.list_departament[floor].floor!="pb"){
                            if($scope.customer.update.list_departament[floor].floor!=$scope.list_floor){
                              $scope.list_floor=$scope.customer.update.list_departament[floor].floor
                              $scope.list_depto_floors.push({'id':(i+1),'nameFloor':$scope.customer.update.list_departament[floor].floor, 'deptos':[]});
                              i++;
                            }
                          }
                        }console.log($scope.list_depto_floors);
                        var d=0;
                        for (arrList in $scope.list_depto_floors){
                           d=0;
                          for (var depto in $scope.customer.update.list_departament){

                              if($scope.customer.update.list_departament[depto].floor==$scope.list_depto_floors[arrList].nameFloor){
                                //$scope.list_depto_floors[d].deptos.push($scope.customer.update.list_departament[depto]);
                                $scope.list_depto_floors[arrList].deptos.push({'idClientFk':$scope.customer.update.list_departament[depto].idClientFk, 'idDepto':(d+1), 'unitNumber':$scope.customer.update.list_departament[depto].numberUNF, 'floor':$scope.customer.update.list_departament[depto].floor, 'departament':$scope.customer.update.list_departament[depto].departament, 'idCategoryDepartamentFk': $scope.customer.update.list_departament[depto].idCategoryDepartamentFk, 'enabled':false, 'categoryDepartament':[],'idFloor':$scope.list_depto_floors[arrList].id});
                              }
                              d++;
                          }
                        }console.log($scope.list_depto_floors);
                        //USERS
                        $scope.list_id_user = [];
                        $scope.list_users   = [];
                        if (obj.list_client_user.length>0){
                          for (var user in  obj.list_client_user){
                            //console.log(obj.list_client_user[key]);
                            $scope.list_client_user.push({'idUserFk':obj.list_client_user[user].idUser,'idClientFk': obj.list_emails[key].idClientFk});
                            $scope.list_users.push({'idUserFk':obj.list_client_user[user].idUser, 'fullNameUser':obj.list_client_user[user].fullNameUser,'idClientFk': obj.list_emails[key].idClientFk});
                          }
                        }                              
                        
                        $('#UpdateModalCustomer').modal({backdrop: 'static', keyboard: false});
                        $('#UpdateModalCustomer').on('shown.bs.modal', function () {
                        });

                      blockUI.stop();
                      }, 1500);
                        $scope.enabledNextBtn();                 
                    break;
                    case "3": //COMPANY CUSTOMER
                      $timeout(function() {
                        $scope.customer.update=obj;
                        $scope.tmpVars.list_schedule_atention=obj.list_schedule_atention;
                        $scope.customer.update.billing_information=obj.billing_information[0];
                        console.info($scope.customer.update);
                        var chekbDays = $scope.chekBox.row;
                        //console.log($scope.tmpVars.billing_information);
                        /*PUT ALL THE CHECKBOXES TO FALSE OR UNCHECKED STATE */
                        for (var key in chekbDays){
                            if (chekbDays[key]==true){
                              $scope.chekBox.row[key]=false;
                            }
                        }
                        var arrProvince  = [];
                        var arrLocation = [];                              
                        arrProvince = $scope.getCustomerProvinceNameFromIdFn($scope.customer.update.idProvinceFk);
                        arrLocation= $scope.getCustomerLocationNameFromIdFn($scope.customer.update.idLocationFk, $scope.customer.update.idProvinceFk);
                        $scope.customer.select.main.province.selected = {idProvince: arrProvince[0].idProvince, province: arrProvince[0].province};
                        $scope.customer.select.main.location.selected = {idLocation: arrLocation[0].idLocation, location: arrLocation[0].location};

                        $scope.customer.update.nameAddress=$scope.customer.update.idClientDepartamentFk==null||$scope.customer.update.idClientDepartamentFk==''?$scope.customer.update.address:'';
                        $scope.customer.select.main.address.selected=$scope.customer.update.idClientDepartamentFk!=null?{address:$scope.customer.update.address}:undefined;

                        if($scope.customer.update.idClientDepartamentFk){
                          $scope.getBuildingsDeptosFn($scope.customer.update.idClientDepartamentFk);
                          $scope.customer.select.main.department=$scope.customer.update.idClientDepartamentFk;
                        }else{
                          $scope.addrrSelected=true;
                        }
                        //PHONES
                        $scope.list_phone_contact=[];
                        $scope.list_phones=[];  
                        if (obj.list_phone_contact.length>0){
                          for (var key in  obj.list_phone_contact){
                            //console.log(obj.list_phone_contact[key]);
                            $scope.list_phone_contact.push({'idClientFk': obj.list_phone_contact[key].idClientFk,'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
                            $scope.list_phones.push({'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
                          }
                        }
                        //MAILS
                        $scope.list_mails_contact=[];
                        $scope.list_mails=[];
                        var typeName = '';
                        if (obj.list_emails.length>0){
                          for (var key in  obj.list_emails){
                            for (var type in $scope.rsTypeOfMailsData){
                              if ($scope.rsTypeOfMailsData[type].idTipoMail==obj.list_emails[key].idTipoDeMailFk){
                                typeName= $scope.rsTypeOfMailsData[type].descripcion;
                              }
                            }
                            $scope.list_mails_contact.push({'idClientMail':obj.list_emails[key].idClientMail, 'idClientFk': obj.list_emails[key].idClientFk, 'mailTag':obj.list_emails[key].mailTag, 'mailContact':obj.list_emails[key].mailContact, 'idTipoDeMailFk': obj.list_emails[key].idTipoDeMailFk, 'status':obj.list_emails[key].status});
                            $scope.list_mails.push({'idClientMail':obj.list_emails[key].idClientMail, 'idClientFk': obj.list_emails[key].idClientFk, 'mailTag':obj.list_emails[key].mailTag, 'mailContact':obj.list_emails[key].mailContact, 'idTipoDeMailFk': obj.list_emails[key].idTipoDeMailFk, 'status':obj.list_emails[key].status});
                          }
                        }

                        //SCHEDULE 
                        for (var i = 0; i < $scope.tmpVars.list_schedule_atention.length; i++) {
                          if($scope.tmpVars.list_schedule_atention[i].day==$scope.list_schedule[i].day){
                            //Load the data to the list that will be render in the frontend
                            $scope.list_schedule[i].fronAm    = $scope.tmpVars.list_schedule_atention[i].fronAm;
                            $scope.list_schedule[i].toAm      = $scope.tmpVars.list_schedule_atention[i].toAm;
                            $scope.list_schedule[i].fronPm    = $scope.tmpVars.list_schedule_atention[i].fronPm;
                            $scope.list_schedule[i].toPm      = $scope.tmpVars.list_schedule_atention[i].toPm;
                            $scope.list_schedule[i].selected  = true;
                            //Load the data to a temp array to handle the schedule
                            $scope.list_schedule_atention.push({
                                'idClienteFk':$scope.tmpVars.list_schedule_atention[i].idClienteFk, 
                                'day':$scope.tmpVars.list_schedule_atention[i].day, 
                                'fronAm':$scope.tmpVars.list_schedule_atention[i].fronAm, 
                                'toAm':$scope.tmpVars.list_schedule_atention[i].toAm, 
                                'fronPm':$scope.tmpVars.list_schedule_atention[i].fronPm, 
                                'toPm':$scope.tmpVars.list_schedule_atention[i].toPm});
                          }
                        }
                        //USERS
                        $scope.list_id_user = [];
                        $scope.list_users   = [];
                        if (obj.list_client_user.length>0){
                          for (var user in  obj.list_client_user){
                            //console.log(obj.list_client_user[key]);
                            $scope.list_client_user.push({'idUserFk':obj.list_client_user[user].idUser,'idClientFk': obj.list_emails[key].idClientFk});
                            $scope.list_users.push({'idUserFk':obj.list_client_user[user].idUser, 'fullNameUser':obj.list_client_user[user].fullNameUser,'idClientFk': obj.list_emails[key].idClientFk});
                          }
                        }
                        $('#UpdateModalCustomer').modal({backdrop: 'static', keyboard: false});
                        $('#UpdateModalCustomer').on('shown.bs.modal', function () {
                            
                        });
                        blockUI.stop();
                      }, 500);
                      $scope.enabledNextBtn();
                    break;
                    case "4": //BRANCH CUSTOMER
                      $timeout(function() {
                        $scope.customer.update=obj;
                        $scope.tmpVars.list_schedule_atention=obj.list_schedule_atention;
                        $scope.customer.update.billing_information=obj.billing_information[0];
                        console.info($scope.customer.update);
                        var chekbDays = $scope.chekBox.row;
                        //console.log($scope.tmpVars.billing_information);
                        /*PUT ALL THE CHECKBOXES TO FALSE OR UNCHECKED STATE */
                        for (var key in chekbDays){
                            if (chekbDays[key]==true){
                              $scope.chekBox.row[key]=false;
                            }
                        }
                        var arrProvince  = [];
                        var arrLocation = [];                              
                        arrProvince = $scope.getCustomerProvinceNameFromIdFn($scope.customer.update.idProvinceFk);
                        arrLocation= $scope.getCustomerLocationNameFromIdFn($scope.customer.update.idLocationFk, $scope.customer.update.idProvinceFk);
                        $scope.customer.select.main.province.selected = {idProvince: arrProvince[0].idProvince, province: arrProvince[0].province};
                        $scope.customer.select.main.location.selected = {idLocation: arrLocation[0].idLocation, location: arrLocation[0].location};

                        $scope.customer.update.nameAddress=$scope.customer.update.idClientDepartamentFk==null||$scope.customer.update.idClientDepartamentFk==''?$scope.customer.update.address:'';
                        $scope.customer.select.main.address.selected=$scope.customer.update.idClientDepartamentFk!=null?{address:$scope.customer.update.address}:undefined;

                        //COMPANY RELATED
                        var arrCompany=[]
                        arrCompany=$scope.getCustomerBusinessNameByIdFn($scope.customer.update.idClientCompaniFk);
                        //console.log(arrCompany[0]);
                        $scope.customer.select.company.selected= {'idClient':arrCompany[0].idClient, 'businessName':arrCompany[0].businessName}

                        if($scope.customer.update.idClientDepartamentFk){
                          $scope.getBuildingsDeptosFn($scope.customer.update.idClientDepartamentFk);
                          $scope.customer.select.main.department=$scope.customer.update.idClientDepartamentFk;
                        }else{
                          $scope.addrrSelected=true;
                        }
                        //PHONES
                        $scope.list_phone_contact=[];
                        $scope.list_phones=[];  
                        if (obj.list_phone_contact.length>0){
                          for (var key in  obj.list_phone_contact){
                            //console.log(obj.list_phone_contact[key]);
                            $scope.list_phone_contact.push({'idClientFk': obj.list_phone_contact[key].idClientFk,'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
                            $scope.list_phones.push({'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
                          }
                        }
                        //MAILS
                        $scope.list_mails_contact=[];
                        $scope.list_mails=[];
                        var typeName = '';
                        if (obj.list_emails.length>0){
                          for (var key in  obj.list_emails){
                            for (var type in $scope.rsTypeOfMailsData){
                              if ($scope.rsTypeOfMailsData[type].idTipoMail==obj.list_emails[key].idTipoDeMailFk){
                                typeName= $scope.rsTypeOfMailsData[type].descripcion;
                              }
                            }
                            $scope.list_mails_contact.push({'idClientMail':obj.list_emails[key].idClientMail, 'idClientFk': obj.list_emails[key].idClientFk, 'mailTag':obj.list_emails[key].mailTag, 'mailContact':obj.list_emails[key].mailContact, 'idTipoDeMailFk': obj.list_emails[key].idTipoDeMailFk, 'status':obj.list_emails[key].status});
                            $scope.list_mails.push({'idClientMail':obj.list_emails[key].idClientMail, 'idClientFk': obj.list_emails[key].idClientFk, 'mailTag':obj.list_emails[key].mailTag, 'mailContact':obj.list_emails[key].mailContact, 'idTipoDeMailFk': obj.list_emails[key].idTipoDeMailFk, 'status':obj.list_emails[key].status});
                          }
                        }

                        //SCHEDULE 
                        for (var i = 0; i < $scope.tmpVars.list_schedule_atention.length; i++) {
                          if($scope.tmpVars.list_schedule_atention[i].day==$scope.list_schedule[i].day){
                            //Load the data to the list that will be render in the frontend
                            $scope.list_schedule[i].fronAm    = $scope.tmpVars.list_schedule_atention[i].fronAm;
                            $scope.list_schedule[i].toAm      = $scope.tmpVars.list_schedule_atention[i].toAm;
                            $scope.list_schedule[i].fronPm    = $scope.tmpVars.list_schedule_atention[i].fronPm;
                            $scope.list_schedule[i].toPm      = $scope.tmpVars.list_schedule_atention[i].toPm;
                            $scope.list_schedule[i].selected  = true;
                            //Load the data to a temp array to handle the schedule
                            $scope.list_schedule_atention.push({
                                'idClienteFk':$scope.tmpVars.list_schedule_atention[i].idClienteFk, 
                                'day':$scope.tmpVars.list_schedule_atention[i].day, 
                                'fronAm':$scope.tmpVars.list_schedule_atention[i].fronAm, 
                                'toAm':$scope.tmpVars.list_schedule_atention[i].toAm, 
                                'fronPm':$scope.tmpVars.list_schedule_atention[i].fronPm, 
                                'toPm':$scope.tmpVars.list_schedule_atention[i].toPm});
                          }
                        }
                        //USERS
                        $scope.list_id_user = [];
                        $scope.list_users   = [];
                        if (obj.list_client_user.length>0){
                          for (var user in  obj.list_client_user){
                            //console.log(obj.list_client_user[key]);
                            $scope.list_client_user.push({'idUserFk':obj.list_client_user[user].idUser,'idClientFk': obj.list_emails[key].idClientFk});
                            $scope.list_users.push({'idUserFk':obj.list_client_user[user].idUser, 'fullNameUser':obj.list_client_user[user].fullNameUser,'idClientFk': obj.list_emails[key].idClientFk});
                          }
                        }
                        $('#UpdateModalCustomer').modal({backdrop: 'static', keyboard: false});
                        $('#UpdateModalCustomer').on('shown.bs.modal', function () {
                            
                        });                        
                        blockUI.stop();
                      }, 500);
                      $scope.enabledNextBtn();
                    break;
                    case "5": //PARTICULAR CUSTOMER
                      $timeout(function() {
                        $scope.customer.update=obj;
                        $scope.tmpVars.billing_information=obj.billing_information[0];
                        console.info($scope.customer.update);


                        //PHONES
                        $scope.list_phone_contact=[];
                        $scope.list_phones=[];  
                        if (obj.list_phone_contact.length>0){
                          for (var key in  obj.list_phone_contact){
                            if (obj.list_phone_contact[key].phoneTag=="mobile"){
                              $scope.customer.update.mobilePhone=obj.list_phone_contact[key].phoneContact;
                            }else{
                              $scope.customer.update.localPhone=obj.list_phone_contact[key].phoneContact;
                            }                                                                    
                          }
                        }
                        //PARTICULAR ADDRESS
                        $scope.list_address_particular=[];
                        //$scope.list_address_particular.push({"address":nameAddress, "idParticularDepartamentKf":idDepartment, "depto": department, "isBuilding":customerisBuilding, "idProvinceFk":idProvince, "idLocationFk":idLocation, "idTipoInmuebleFk":obj.typeInmueble, "clarification":obj.clarification, 'addressLat':addrLatitud,'addressLon':addrLongitud});
                        var typeName = '';
                        if (obj.list_address_particular.length>0){
                          for (var key in  obj.list_address_particular){
                            for (var type in $scope.rsCustomerTypeData){
                              if ($scope.rsCustomerTypeData[type].idClientType==obj.list_address_particular[key].idTipoInmuebleFk){
                                typeName= $scope.rsCustomerTypeData[type].ClientType;
                              }
                            }
                            $scope.list_address_particular.push(obj.list_address_particular[key]);                            
                          }
                        }                              
                        $('#UpdateModalCustomer').modal({backdrop: 'static', keyboard: false});
                        $('#UpdateModalCustomer').on('shown.bs.modal', function () {
                            
                        });
                        blockUI.stop();
                      }, 500);
                      $scope.enabledNextBtn();
                    break;                           
                    default:
                  }
                break;
                case "update":
                  switch (subOption){
                    case "1": //ADMINISTRATION CUSTOMER
                      //Getting the customer schedule setting
                      $scope.customer.update.list_schedule_atention                    = $scope.list_schedule_time_orderBy;
                      //Getting the customer phones contact list
                      $scope.customer.update.list_phone_contact                        = $scope.list_phone_contact;
                      //Getting the customer Mail list
                      $scope.customer.update.list_emails                               = $scope.list_mails_contact;
                      //Getting the authorized user to the new customer
                      $scope.customer.update.list_client_user                          = $scope.list_client_user;
                      if ($scope.customer.update.typeInmueble==1 && $scope.customer.update.isNotCliente==true){
                        $scope.customer.update.idClientDepartamentFk                   = $scope.customer.select.main.department;
                        $scope.customer.update.address                                 = $scope.customer.select.main.address.selected.address;
                        $scope.customer.update.idProvinceFk                            = $scope.customer.select.main.address.selected.idProvinceFk;
                        $scope.customer.update.idLocationFk                            = $scope.customer.select.main.address.selected.idLocationFk;
                        $scope.customer.update.addressLat                              = $scope.customer.select.main.address.selected.addressLat;
                        $scope.customer.update.addressLon                              = $scope.customer.select.main.address.selected.addressLon;

                      }else{
                        $scope.customer.update.idDepartmentFk                          = null;
                        $scope.customer.update.idProvinceFk                            = $scope.customer.select.main.province.selected.idProvince;
                        $scope.customer.update.idLocationFk                            = $scope.customer.select.main.location.selected.idLocation;
                        $scope.customer.update.idCategoryDepartamentFk                 = "1";
                        $scope.customer.update.numberUNF                               = null;
                      }

                      $scope.customer.update.billing_information.idProvinceBillingFk   =
                      $scope.customer.update.billing_information.idProvinceBillingFk   = $scope.customer.select.payment.province.selected.idProvince;
                      $scope.customer.update.billing_information.idLocationBillingFk   = $scope.customer.select.payment.location.selected.idLocation;
                      //Assigning the default value to 0
                      $scope.customer.update.isNotCliente                              = 0;
                      $scope.customer.update.idClientAdminFk                           = 0;
                      $scope.customer.update.idClientCompaniFk                         = 0;
                      //Printing the current array before add the customer
                      console.log($scope.customer.update);
                      //Send the customer data to the addcustomer service
                      $scope.updateCustomerFn($scope.customer.update);    
                    break;
                    case "3": //COMPANY CUSTOMER
                      //Getting the customer schedule setting
                      $scope.customer.update.list_schedule_atention                    = $scope.list_schedule_time_orderBy;
                      //Getting the customer phones contact list
                      $scope.customer.update.list_phone_contact                        = $scope.list_phone_contact;
                      //Getting the customer Mail list
                      $scope.customer.update.list_emails                               = $scope.list_mails_contact;
                      //Getting the authorized user to the new customer
                      $scope.customer.update.list_client_user                          = $scope.list_client_user;
                      if ($scope.customer.update.typeInmueble==1 && $scope.customer.update.isNotCliente==true){
                        $scope.customer.update.idClientDepartamentFk                   = $scope.customer.select.main.department;
                        $scope.customer.update.address                                 = $scope.customer.select.main.address.selected.address;
                        $scope.customer.update.idProvinceFk                            = $scope.customer.select.main.address.selected.idProvinceFk;
                        $scope.customer.update.idLocationFk                            = $scope.customer.select.main.address.selected.idLocationFk;
                        $scope.customer.update.addressLat                              = $scope.customer.select.main.address.selected.addressLat;
                        $scope.customer.update.addressLon                              = $scope.customer.select.main.address.selected.addressLon;

                      }else{
                        $scope.customer.update.idDepartmentFk                          = null;
                        $scope.customer.update.idProvinceFk                            = $scope.customer.select.main.province.selected.idProvince;
                        $scope.customer.update.idLocationFk                            = $scope.customer.select.main.location.selected.idLocation;
                        $scope.customer.update.idCategoryDepartamentFk                 = "1";
                        $scope.customer.update.numberUNF                               = null;
                      }

                      $scope.customer.update.billing_information.idProvinceBillingFk   =
                      $scope.customer.update.billing_information.idProvinceBillingFk   = $scope.customer.select.payment.province.selected.idProvince;
                      $scope.customer.update.billing_information.idLocationBillingFk   = $scope.customer.select.payment.location.selected.idLocation;
                      //Assigning the default value to 0
                      $scope.customer.update.isNotCliente                              = 0;
                      $scope.customer.update.idClientAdminFk                           = 0;
                      $scope.customer.update.idClientCompaniFk                         = 0;
                      //Printing the current array before add the customer
                      console.log($scope.customer.update);
                      //Send the customer data to the addcustomer service
                      $scope.updateCustomerFn($scope.customer.update);    
                    break;
                    case "4": //BRANCH CUSTOMER
                      //Getting the customer schedule setting
                      $scope.customer.update.list_schedule_atention                    = $scope.list_schedule_time_orderBy;
                      //Getting the customer phones contact list
                      $scope.customer.update.list_phone_contact                        = $scope.list_phone_contact;
                      //Getting the customer Mail list
                      $scope.customer.update.list_emails                               = $scope.list_mails_contact;
                      //Getting the authorized user to the new customer
                      $scope.customer.update.list_client_user                          = $scope.list_client_user;
                      //Getting the authorized user to the new customer
                      $scope.customer.update.list_client_user                          = $scope.list_client_user;
                      if ($scope.customer.update.typeInmueble==1 && $scope.customer.update.isNotCliente==true){
                        $scope.customer.update.idClientDepartamentFk                   = $scope.customer.select.main.department;
                        $scope.customer.update.address                                 = $scope.customer.select.main.address.selected.address;
                        $scope.customer.update.idProvinceFk                            = $scope.customer.select.main.address.selected.idProvinceFk;
                        $scope.customer.update.idLocationFk                            = $scope.customer.select.main.address.selected.idLocationFk;
                        $scope.customer.update.addressLat                              = $scope.customer.select.main.address.selected.addressLat;
                        $scope.customer.update.addressLon                              = $scope.customer.select.main.address.selected.addressLon;

                      }else{
                        $scope.customer.update.idDepartmentFk                          = null;
                        $scope.customer.update.idProvinceFk                            = $scope.customer.select.main.province.selected.idProvince;
                        $scope.customer.update.idLocationFk                            = $scope.customer.select.main.location.selected.idLocation;
                        $scope.customer.update.idCategoryDepartamentFk                 = "1";
                        $scope.customer.update.numberUNF                               = null;
                      }
                      $scope.customer.update.billing_information.idProvinceBillingFk   = $scope.customer.select.payment.province.selected.idProvince;
                      $scope.customer.update.billing_information.idLocationBillingFk   = $scope.customer.select.payment.location.selected.idLocation;
                      //Assigning the value of the field isNotCliente to 0
                      $scope.customer.update.idClientAdminFk                           = 0;
                      $scope.customer.update.isNotCliente                              = 0;
                      $scope.customer.update.idClientCompaniFk                         = $scope.customer.select.company.selected.idClient;
                      $scope.customer.update.name                                      = $scope.customer.update.address;                      
                      //Printing the current array before add the customer
                      console.log($scope.customer.update);
                      //Send the customer data to the addcustomer service
                      $scope.updateCustomerFn($scope.customer.update);                    
                    break;
                  }
                break;
                case "phones":
                  $scope.list_phone_contact=[];
                  $scope.list_phones=[];                      
                  $scope.customer.info = obj;
                  //console.log(obj.list_phone_contact);
                  if (obj.list_phone_contact.length>0){
                    for (var key in  obj.list_phone_contact){
                      //console.log(obj.list_phone_contact[key]);
                      $scope.list_phone_contact.push({'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
                      $scope.list_phones.push({'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
                    }
                  }else{
                    //console.log("obj.list_phone_contact is empty");
                  }
                  $('#customerPhonesContact').modal('toggle'); 
                break;
                case "mails":
                  $scope.list_mails_contact=[];
                  $scope.list_mails=[];                   
                  $scope.customer.info = obj;
                  var typeName = '';
                  if (obj.list_emails.length>0){
                    for (var key in  obj.list_emails){
                      for (var type in $scope.rsTypeOfMailsData){
                        if ($scope.rsTypeOfMailsData[type].idTipoMail==obj.list_emails[key].idTipoDeMailFk){
                          typeName= $scope.rsTypeOfMailsData[type].descripcion;
                        }
                      }
                      $scope.list_mails_contact.push({'mailTag':obj.list_emails[key].mailTag, 'mailContact':obj.list_emails[key].mailContact, 'idTipoDeMailFk': obj.list_emails[key].idTipoDeMailFk});
                      $scope.list_mails.push({'mailTag':obj.list_emails[key].mailTag, 'typeName':typeName, 'mailContact':obj.list_emails[key].mailContact, 'idTipoDeMailFk': obj.list_emails[key].idTipoDeMailFk}); 
                    }
                  }else{
                    //console.log("obj.list_phone_contact is empty");
                  }
                  $('#customerMailsContact').modal('toggle');                       
                break;
                case "deptos":
                  $scope.rolePermission="ro";
                  $scope.list_depto_floors=[];              
                  $scope.customer.info = obj;
                  $scope.list_floor="";
                  var i=0;
                  //console.log($scope.customer.info.list_departament);
                  for (var floor in $scope.customer.info.list_departament){
                    if($scope.customer.info.list_departament[floor].floor!=$scope.list_floor){
                      $scope.list_floor=$scope.customer.info.list_departament[floor].floor
                      $scope.list_depto_floors.push({'id':(i+1),'nameFloor':$scope.customer.info.list_departament[floor].floor, 'deptos':[]});
                      i++;
                    }
                    if($scope.customer.info.list_departament[floor].floor==$scope.list_floor){
                      $scope.list_depto_floors[i-1].deptos.push($scope.customer.info.list_departament[floor]);             
                    }
                  }
                  //console.log($scope.list_depto_floors);
                  $('#DepartmentsCustomer').modal('toggle');                      
                break;
                case "particularAddress":
                  $scope.list_address_particular=[];               
                  $scope.customer.info = obj;
                  var typeName = '';
                  if (obj.list_address_particular.length>0){
                    for (var key in  obj.list_address_particular){
                      for (var type in $scope.rsCustomerTypeData){
                        if ($scope.rsCustomerTypeData[type].idClientType==obj.list_address_particular[key].idTipoInmuebleFk){
                          typeName= $scope.rsCustomerTypeData[type].ClientType;
                        }
                      }
                      $scope.list_address_particular.push(obj.list_address_particular[key]);                            
                    }
                  }else{
                    //console.log("obj.list_phone_contact is empty");
                  }
                  $('#AddressParticularCustomer').modal('toggle');                       
                break;                                            
                default:
            }
          }
        /******************************
        *   UPDATE NEW THE CUSTOMER   *
        ******************************/
          $scope.updateCustomerFn = function(client){
            CustomerServices.updateCustomer(client).then(function(data){
                $scope.rsJsonData = data;
                //console.log($scope.rsJsonData);
                if($scope.rsJsonData.status==200){
                  console.log("Customer Successfully Updated");
                  inform.add('Actualizacion de cliente realizado con exito. ',{
                        ttl:2000, type: 'success'
                  });
                  $('#UpdateModalCustomer').modal('hide');
                }else if($scope.rsJsonData.status==500){
                  console.log("Customer not Created, contact administrator");
                  inform.add('Error: [500] Contacta al area de soporte. ',{
                        ttl:2000, type: 'danger'
                  });
                  //$('#RegisterModalCustomer').modal('hide');
                }
                  $scope.getCustomerListFn("",1);
                //console.log($scope.rsLocations_API_Data);
            });
          };                
        /******************************
        *    UTIL FOR CUSTOMER DATA   *
        ******************************/    
          $scope.getCustomerProvinceNameFromIdFn = function(ProvinceId){
            var arrProvinceSelect = [];
            for (var key in  $scope.rsStatesData){
                if ( $scope.rsStatesData[key].idProvince==ProvinceId){
                    arrProvinceSelect.push({'idProvince':$scope.rsStatesData[key].idProvince, 'province':$scope.rsStatesData[key].province});
                    break;
                }
            }
            //console.log(arrProvinceSelect);
            return arrProvinceSelect;
          }
          $scope.getCustomerLocationNameFromIdFn = function(LocationId, ProvinceId){
            var arrLocationSelect = [];
            for (var key in  $scope.rsLocations_All2){
                if ( $scope.rsLocations_All2[key].idLocation==LocationId && $scope.rsLocations_All2[key].idProvinceFK==ProvinceId){
                    arrLocationSelect.push({'idLocation':$scope.rsLocations_All2[key].idLocation, 'location':$scope.rsLocations_All2[key].location});
                    break;
                }
            }
            //console.log(arrLocationSelect);
            return arrLocationSelect;
          }
          $scope.getCustomerBusinessNameByIdFn = function(clientId){
            console.log("getCustomerBusinessNameByIdFn: "+clientId);
            var arrCompanySelect = [];
            //console.log($scope.rsCustomerListData);
            for (var key in  $scope.rsCustomerListData){
                if ($scope.rsCustomerListData[key].idClient==clientId){
                    arrCompanySelect.push({'idClient':$scope.rsCustomerListData[key].idClient, 'businessName':$scope.rsCustomerListData[key].businessName});
                    break;
                }
            }
            //console.log(arrCompanySelect);
            return arrCompanySelect;
          }                
    /**************************************************/
    /**************************************************
    *            SHOW ONLY ADMIN AND COMPANY          *
    *                 CUSTOMER OPTIONS                *
    **************************************************/
      $scope.filterCustomerType = function(item){
          return (item.idClientTypeFk == "1" ||  item.idClientTypeFk == "3");
      };
    /**************************************************
    *          SHOW ONLY CUSTOMER BY X TYPE OF        *
    *             ADMINISTRATION OR COMPANY           *
    **************************************************/
      $scope.filterCustomerByType = function(item){
        var objOpt = $scope.isNewCustomer==true?$scope.customer.new.idClientTypeFk:$scope.customer.update.idClientTypeFk;
        switch(objOpt){
          case "2":
            return item.idClientTypeFk == "1";
          break;
          case "4":
            return item.idClientTypeFk == "1" || item.idClientTypeFk == "3";
          break;
        }
         
      };       
    /**************************************************
    *                                                 *
    *           LIST CUSTOMER REGISTERED              *
    *                                                 *
    **************************************************/
      $scope.rsCustomerListData = [];
      $scope.rsFrmCustomerListData = [];
      $scope.rsCustomerListByTypeData = [];
      $scope.rsCustomerSelectData = [];
      $scope.jsonCustomerRegistered={
            "searchFilter":"",
            "isNotCliente":"0"
      };
      $scope.jsonCustomerNotRegistered={
            "searchFilter":"",
            "idClientTypeFk":"2",
            "isNotCliente":"1"
      };
      $scope.getCustomerListFn = function(search, opt){        
        $scope.rsCustomerListByTypeData = [];
        $scope.rsCustomerListData = [];
        var jsonSearch = !search || search=="" ||  search=="registered" ? $scope.jsonCustomerRegistered : $scope.jsonCustomerNotRegistered;
        console.log("getCustomerListFn => search: [searchFilter:"+jsonSearch.searchFilter+", isNotCliente:"+jsonSearch.isNotCliente+"] opcion: "+opt);
        CustomerServices.getCustomerList(jsonSearch).then(function(data){
            $scope.rsCustomerListData = data;
            $scope.rsCustomerSelectData = data;
            
            $scope.rsCustomerListByTypeData  = data.status==404?$scope.rsCustomerListByTypeData=[]:data;
            if(opt==1){$scope.loadPagination($scope.rsCustomerListData, "idClient", "10");}
            if(opt==2){$scope.rsFrmCustomerListData = data;}
            //console.log("rsCustomerListData");
            //
        });
      };
    /**************************************************
    *                                                 *
    *             LIST CUSTOMER BY TYPE               *
    *                                                 *
    **************************************************/
    
      $scope.getCustomersListByTypeFn = function(type){
         console.log("getCustomerListByTypeFn => type:"+type);
            $scope.rsCustomerListByTypeData=[];
            console.log($scope.rsCustomerSelectData);
            if (type!=undefined && type!='' && type!=null){
              for (var item in $scope.rsCustomerSelectData){
                if ($scope.rsCustomerSelectData[item].idClientTypeFk==type){
                  //console.log($scope.rsCustomerListData[item]);
                  $scope.rsCustomerListByTypeData.push($scope.rsCustomerSelectData[item]);
                  //console.log($scope.rsCustomerListByTypeData);
                }
              }
            }else{
               $scope.getCustomerListFn('registered',1);
            }
        //console.log($scope.rsCustomerListByTypeData);
      };
    /**************************************************
    *                                                 *
    *                GET TYPE OF CUSTOMER             *
    *                                                 *
    **************************************************/
      $scope.rsCustomerTypeData = {};
      $scope.rsCustomerTypeFilterData = [];
      $scope.getCustomerTypesFn = function(){
        CustomerServices.getCustomerType().then(function(data){
          for (var type in data){
            if(data[type].idClientType==1 || data[type].idClientType==3){
              $scope.rsCustomerTypeFilterData.push(data[type]);
            }
          }
           $scope.rsCustomerTypeData = data;
            //console.log($scope.rsCustomerTypeFilterData);
        });
      };
    /**************************************************
    *                                                 *
    *       GET LIST OF CUSTOMER BY CUSTOMER ID       *
    *                                                 *
    **************************************************/
      $scope.rsListCustomersOfCustomerData = {};
      $scope.getLisOfCustomersByIdFn = function(id){
        $scope.rsCustomerListData={};
        CustomerServices.getCustomersListByCustomerId(id).then(function(data){
          if(data.status!=404){
            $scope.rsCustomerListData = data;
          }else{
            $scope.rsCustomerListData = '';
          }
           $scope.loadPagination($scope.rsCustomerListData, "idClient", "10");
        //console.log($scope.rsCustomerListData);
        });
      };    
      $scope.list_id_user=[];
      $scope.list_client_user=[];
      $scope.list_users=[];
      $scope.isUserExist=null;
    
      $scope.sort = function(keyname){
          $scope.sortKey = keyname;   //set the sortKey to the param passed
          $scope.reverse = !$scope.reverse; //if true make it false and vice versa
      }

      $scope.customerPaginationFn = function(arrData, itemPerPage){
           $scope.paginationServiceFn(arrData, itemPerPage);
            $scope.vm.setPage(1)
            if (arrData.length>itemPerPage){
              $scope.showPagination=true;
            }else{
              $scope.showPagination=false;
            }
        }
    /**************************************************
    *                                                 *
    *                UPLOAD CUSTOMER FILES            *
    *                                                 *
    **************************************************/
      var uploader = $scope.uploader = new FileUploader({
          url: 'upload.php'
      });
      uploader.filters.push({
          name: 'customFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
              return this.queue.length < 10;
          }
      });
      // CALLBACKS
      uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
          //console.info('onWhenAddingFileFailed', item, filter, options);
      };
      uploader.onAfterAddingFile = function(fileItem) {
          //console.info('onAfterAddingFile', fileItem);
      };
      uploader.onAfterAddingAll = function(addedFileItems) {
          //console.info('onAfterAddingAll', addedFileItems);
      };
      uploader.onBeforeUploadItem = function(item) {
          //console.info('onBeforeUploadItem', item);
      };
      uploader.onProgressItem = function(fileItem, progress) {
          //console.info('onProgressItem', fileItem, progress);
      };
      uploader.onProgressAll = function(progress) {
          //console.info('onProgressAll', progress);
      };
      uploader.onSuccessItem = function(fileItem, response, status, headers) {
          //console.info('onSuccessItem', fileItem, response, status, headers);
      };
      uploader.onErrorItem = function(fileItem, response, status, headers) {
          //console.info('onErrorItem', fileItem, response, status, headers);
      };
      uploader.onCancelItem = function(fileItem, response, status, headers) {
          //console.info('onCancelItem', fileItem, response, status, headers);
      };
      uploader.onCompleteItem = function(fileItem, response, status, headers) {
          //console.info('onCompleteItem', fileItem, response, status, headers);
      };
      uploader.onCompleteAll = function() {
          //console.info('onCompleteAll');
      };
      //console.info('uploader', uploader);
    /**************************************************/
    /********************************************************************************************************************************************
    *                                                                                                                                           *
    *                                                                                                                                           *
    *                                                           U T I L I D A D E S                                                             *
    *                                                                                                                                           *
    *                                                                                                                                           *
    ********************************************************************************************************************************************/
    $scope.regexURL = '^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$';
    $scope.regexTIME='/([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/';
    $scope.regexDepto = '/([a-zA-Z]|[\d]){1,3}\b$/'
    /**************************************************
    *                                                 *
    *                SCHEDULE ATENTION                *
    *                                                 *
    **************************************************/
      $scope.setScheduleListFn = function(){
        $scope.list_schedule=[{
                            id    :1,
                            day   :'Lunes',
                            fronAm:'08:00',
                            toAm  :'12:00',
                            fronPm:'17:00',
                            toPm  :'20:00',
                            selected:false
                          },{
                            id    :2,                          
                            day   :'Martes',
                            fronAm:'',
                            toAm  :'',
                            fronPm:'',
                            toPm  :'',
                            selected:false                          
                          },{
                            id    :3,
                            day   :'Miercoles',
                            fronAm:'',
                            toAm  :'',
                            fronPm:'',
                            toPm  :'',
                            selected:false                          
                          },{
                            id    :4,
                            day   :'Jueves',
                            fronAm:'',
                            toAm  :'',
                            fronPm:'',
                            toPm  :'',
                            selected:false                          
                          },{
                            id    :5,
                            day   :'Viernes',
                            fronAm:'',
                            toAm  :'',
                            fronPm:'',
                            toPm  :'' ,
                            selected:false                         
                          },{
                            id    :6,
                            day   :'Sabado',
                            fronAm:'',
                            toAm  :'',
                            fronPm:'',
                            toPm  :'' ,
                            selected:false                         
                          },{
                            id    :7,
                            day   :'Domingo',
                            fronAm:'',
                            toAm  :'',
                            fronPm:'',
                            toPm  :'',
                            selected:false                          
                          }];
      }                        
      $scope.setScheduleListFn();
    $scope.tmpAddres = {'province':{},'location':{}};
    /**************************************************
    *                                                 *
    *          GET CURRENT ADDR/LOCAT VALUE           *
    *                                                 *
    **************************************************/
      $scope.getCurrentAddrVal = function(province, location){

            $scope.tmpAddres.province=province;
            //'idProvince': $scope.tmpAddres.province.idProvince, 'province': $scope.tmpAddres.province.province;
            
            $scope.tmpAddres.location=location;
            //'idLocation': $scope.tmpAddres.location.idLocation, 'location': $scope.tmpAddres.location.location;

        //console.log($scope.tmpAddres);
      }
    /**************************************************
    *                                                 *
    *        GET CURRENT COMPANY DATA & LOAD          *
    *                                                 *
    **************************************************/
      $scope.getCompanyDataFn = function(obj){
        console.log(obj);

          if (obj){
            var typeName = '';
            $scope.customer.companyData = obj;
            $scope.list_mails_contact=[];
            $scope.list_mails=[];
            for (var mail in $scope.customer.companyData.list_emails){
              $scope.list_mails_contact.push({'mailTag':obj.list_emails[mail].mailTag, 'mailContact':obj.list_emails[mail].mailContact, 'idTipoDeMailFk': obj.list_emails[mail].idTipoDeMailFk});
              for (var type in $scope.rsTypeOfMailsData){
                if ($scope.rsTypeOfMailsData[type].idTipoMail==obj.list_emails[mail].idTipoDeMailFk){
                  typeName= $scope.rsTypeOfMailsData[type].descripcion;
                  $scope.list_mails.push({'mailTag':obj.list_emails[mail].mailTag, 'typeName':typeName, 'mailContact':obj.list_emails[mail].mailContact, 'idTipoDeMailFk': obj.list_emails[mail].idTipoDeMailFk});
                }
              }
            }
            //console.log($scope.customer.companyData);
            var addrArr  = [];
            var locatArr = [];                              
            addrArr  = $scope.getCustomerProvinceNameFromIdFn($scope.customer.companyData.billing_information[0].idProvinceBillingFk);
            locatArr = $scope.getCustomerLocationNameFromIdFn($scope.customer.companyData.billing_information[0].idLocationBillingFk, $scope.customer.companyData.billing_information[0].idProvinceBillingFk);
            $scope.customer.companyData.provinceName  = addrArr[0].province;
            $scope.customer.companyData.locationName  = locatArr[0].location;

            if ($scope.customer.new.idClientTypeFk==4){
              $scope.list_phone_contact=[];
              $scope.list_phones=[];
                 /*Load phones list contacts */
                for (var key in  $scope.customer.companyData.list_phone_contact){
                  //console.log(obj.list_phone_contact[key]);
                  $scope.list_phone_contact.push({'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
                  $scope.list_phones.push({'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
                } 
                $scope.customer.new.billing_information.businessNameBilling    = $scope.customer.companyData.businessName;
                $scope.customer.new.billing_information.cuitBilling            = $scope.customer.companyData.CUIT;
                $scope.customer.select.payment.province.selected               = {idProvince: addrArr[0].idProvince, province: addrArr[0].province};
                $scope.customer.select.payment.location.selected               = {idLocation: locatArr[0].idLocation, location: locatArr[0].location};
                $scope.customer.new.billing_information.idTypeTaxFk            = $scope.customer.companyData.billing_information[0].idTypeTax;
            }
            
          }else{
            //console.log("erasing companyData");
            $scope.customer.companyData={};
          }
      }    
    /**************************************************
    *                                                 *
    *                     GET AGENTS                  *
    *                                                 *
    **************************************************/
      $scope.rsAgentsData = {};
      $scope.getAgentsFn = function(){
        UtilitiesServices.getAgents().then(function(data){
            $scope.rsAgentsData = data;
            //console.log($scope.rsProfileData);
        });
      };
    /**************************************************
    *                                                 *
    *                    GET ZONES                    *
    *                                                 *
    **************************************************/
      $scope.rsZonesData = {};
      $scope.getZonesFn = function(){
        UtilitiesServices.getZones().then(function(data){
            $scope.rsZonesData = data;
            //console.log($scope.rsProfileData);
        });
      };
    /**************************************************
    *                                                 *
    *                GET BUILDINGS                    *
    *                                                 *
    **************************************************/
      $scope.rsBuildingAddressData = {};
      $scope.getBuildingsFn = function(){
        addressServices.getBuildings().then(function(data){
            $scope.rsBuildingAddressData = data;
            //console.log($scope.rsProfileData);
        });
      };
    /**************************************************
    *                                                 *
    *                GET DEPTOS BY ID                 *
    *                                                 *
    **************************************************/
      $scope.getBuildingsDeptosFn = function(id){
        addressServices.getBuildingsDeptosFromDeptoId(id).then(function(data){
            $scope.rsBuildingDepartmentsData = data;
            //console.log($scope.rsProfileData);
        });
      };
    /**************************************************
    *                                                 *
    *        GET BUILDING DEPTOS BY DEPTO ID          *
    *                                                 *
    **************************************************/
      $scope.rsBuildingDepartmentsData = {};
      $scope.getBuildingsDeptosByDeptoIdFn = function(id){
        addressServices.getBuildingsDeptos(id).then(function(data){
            $scope.rsBuildingDepartmentsData = data;
            //console.log($scope.rsProfileData);
        });
      };      
    /**************************************************
    *                                                 *
    *                GET TYPE OF IVA                  *
    *                                                 *
    **************************************************/
      $scope.rsTypeOfIVAData = {};
      $scope.getTypeOfIVAFn = function(){
        UtilitiesServices.getTypeOfIVA().then(function(data){
            $scope.rsTypeOfIVAData = data;
            //console.log($scope.rsProfileData);
        });
      };
    /**************************************************
    *                                                 *
    *                GET TYPE OF MAILS                *
    *                                                 *
    **************************************************/
      $scope.rsTypeOfMailsData = {};
      $scope.getTypeOfMailsFn = function(){
        UtilitiesServices.typeOfMails().then(function(data){
            $scope.rsTypeOfMailsData = data;
            //console.log($scope.rsProfileData);
        });
      };
    /**************************************************
    *                                                 *
    *             GET TYPE OF Property                *
    *                                                 *
    **************************************************/
      $scope.rsTypeOfPropertyData = {};
      $scope.typeOfPropertyFn = function(){
        UtilitiesServices.typeOfProperty().then(function(data){
            $scope.rsTypeOfPropertyData = data;
            //console.log($scope.rsProfileData);
        });
      };       
    /**************************************************
    *                                                 *
    *                   GET STATES                    *
    *                   LOCAL API                     *
    *                                                 *
    **************************************************/
      $scope.rsStatesData = {};
      $scope.getStatesFn = function(){
        addressServices.getStates().then(function(data){
            $scope.rsStatesData = data;
            //console.log($scope.rsStatesData);
        });
      };
    /**************************************************
    *                                                 *
    *             GET LOCATION BY NAME                *
    *                  ARG GOB API                    *
    *                                                 *
    **************************************************/
      $scope.rsLocations_API_Data = {};
      console.info("Length: "+$scope.rsLocations_API_Data.length);
      $scope.getLocationByNameFn = function(name){
        addressServices.getLocationsByName(name).then(function(data){
            $scope.rsLocations_API_Data = data;
            //console.log($scope.rsLocations_API_Data);
        });
      };
    /**************************************************
    *                                                 *
    *                  GET LOCATION                   *
    *                   LOCAL API                     *
    *                                                 *
    **************************************************/
      $scope.rsLocations_Data = {};
      $scope.getLocationByIdFn = function(idProvince){
        addressServices.getLocations(idProvince).then(function(data){
            $scope.rsLocations_All = data;
            //console.log($scope.rsLocations_Data);
        });
      }; 
      $scope.getAllLocationsFn = function(){
        addressServices.getAllLocations().then(function(data){
            $scope.rsLocations_All = data;
            $scope.rsLocations_All2 = data;
            //console.log($scope.rsLocations_API_Data);
        });
      };        
    
    /**************************************************
    *                                                 *
    *         GET PROVINCE ID BY ADDRESS Name         *
    *                                                 *
    **************************************************/
      $scope.idProvinceFk=null;
     $scope.getAddressIdByNameFn = function(addressName, opt){
        //$scope.idProvinceFk=null;
        addressServices.getProvinceIdByName(addressName).then(function(data){
          $scope.idProvinceFk=data;
          switch(opt){
            case 'main':
              if (((!$scope.addrrSelected && $scope.customer.new.nameAddress!='') || !$scope.gobApiAddressNotFound) && $scope.customer.new.typeInmueble=='1') {
                $scope.getAddressByNameFn($scope.customer.new.nameAddress,'main');
              }
            break;
            case 'particular':
              if (((!$scope.addrrSelected && $scope.list_particular_address.nameAddress!='') || !$scope.gobApiAddressNotFound) && $scope.customer.particular.typeInmueble=='1'){
                $scope.getAddressByNameFn($scope.list_particular_address.nameAddress,'particular');
              }
            break;
            default:
             $scope.idProvinceFk=null;         
          }            
        });
     }
    /**************************************************
    *                                                 *
    *              GET ADDRESS BY Name                *
    *                   API LOCAL                     *
    **************************************************/
      var searchAddress={};
      var rsJsonData={};
      $scope.sysApiAddressNotFound=false;
      $scope.searchAddressByNameFn = function(item, opt1, opt2){
        if (!$scope.gobApiAddressNotFound){
          console.log("$scope.gobApiAddressNotFound: "+$scope.gobApiAddressNotFound);
          if ((($scope.customer.new.typeInmueble=='1' || $scope.customer.update.typeInmueble=='1') || $scope.customer.particular.typeInmueble=='1') || ($scope.customer.new.idClientTypeFk=='2' || $scope.customer.update.idClientTypeFk=='2')){
            var nameAddress=item.calle.nombre+" "+item.altura.valor;
            searchAddress.address=nameAddress;
            blockUI.start('Verificando direccion: '+nameAddress);
            $timeout(function() {
              addressServices.checkIfBuildingExistByAddressName(searchAddress).then(function(data){
                rsJsonData=data;
                console.log(rsJsonData)
                  if(rsJsonData.status==200){
                    blockUI.message('Direccion: '+nameAddress+' encontrada.');
                    $timeout(function() {
                      $scope.fillData(opt1, opt2, rsJsonData);
                    }, 1500);
                    $scope.sysApiAddressNotFound=false;
                  }else{
                    $scope.sysApiAddressNotFound=true;
                    blockUI.message('Direccion: '+nameAddress+' no encontrada en el sistema.');
                    $timeout(function() {
                      item.status=404;
                      $scope.fillData(opt1, opt2, item);
                    }, 1500);
                  } 
              });   
            }, 1500);
          }else{
            item.status=404;
            $scope.fillData(opt1, opt2, item);
          }
        }else{
            var nameAddress=item;
            searchAddress.address=nameAddress;
            blockUI.start('Verificando direccion: '+nameAddress);
            $timeout(function() {
              addressServices.checkIfBuildingExistByAddressName(searchAddress).then(function(data){
                rsJsonData=data;
                console.log(rsJsonData)
                  if(rsJsonData.status==200){
                    blockUI.message('Direccion: '+nameAddress+' encontrada.');
                    $timeout(function() {
                      $scope.fillData(opt1, opt2, rsJsonData);
                    }, 1500);
                    $scope.sysApiAddressNotFound=false;
                  }else{
                    $scope.sysApiAddressNotFound=true;
                    blockUI.message('Direccion: '+nameAddress+' no encontrada en el sistema.');
                    $timeout(function() {
                      blockUI.stop();
                        switch(opt2){
                          case "main":
                            $scope.customer.new.address=nameAddress.toUpperCase();
                            $scope.customer.new.nameAddress=nameAddress.toUpperCase(); 
                            $scope.customer.new.addressLat=null;
                            $scope.customer.new.addressLon=null;
                            $scope.geoLocation.option="main";
                            $scope.geoLocation.address=nameAddress.toUpperCase();
                            $scope.addrrSelected=true;
                            $("#AddressLatLon").modal({backdrop: 'static', keyboard: false});
                            $("#AddressLatLon").on('shown.bs.modal', function () {
                              $("#addr_Lat").focus();
                            });                  
                          break;
                          case "payment":

                              $scope.customer.new.billing_information.nameAddress=nameAddress.toUpperCase();
                          break;
                          case "particular":
                            $scope.customer.particular.address=nameAddress.toUpperCase();              
                            $scope.customer.particular.nameAddress=nameAddress.toUpperCase(); 
                            $scope.customer.particular.addressLat=null;
                            $scope.customer.particular.addressLon=null;
                            $scope.geoLocation.option="particular";
                            $scope.geoLocation.address=nameAddress.toUpperCase();
                            $scope.addrrSelected=true;
                            $("#AddressLatLon").modal({backdrop: 'static', keyboard: false});
                            $("#AddressLatLon").on('shown.bs.modal', function () {
                              $("#addr_Lat").focus();
                            });
                          break;
                        }                      
                    }, 1500);
                  } 
              });   
            }, 1500);
        }
      }
    /**************************************************
    *                                                 *
    *              GET ADDRESS BY Name                *
    *                   API GOB AR                    *
    **************************************************/
      $scope.registerAdddressNotFound = function(){
        $scope.gobApiAddressNotFound=false;
        $scope.addrrSelected=false;
        $scope.customer.new.nameAddress='';
      }
      $scope.gobApiAddressNotFound=false;
      $scope.addrrSelected=false;
      $scope.addressLatLonOpt='';
      $scope.addressName='';
      $scope.rsAddress_API_Data_Main = {}; $scope.rsAddress_API_Data_Payment = {}; $scope.rsAddress_API_Data_PCA = {};
      $scope.getAddressByNameFn = function(name, opt){
        var idProvinceFk=''
        $scope.rsAddress_API_Data_Main = {}; $scope.rsAddress_API_Data_Payment = {}; $scope.rsAddress_API_Data_PCA = {};
        var twoNumber_patt=/^(?=(?:\D*\d){2})[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/;
        idProvinceFk = $scope.idProvinceFk!=undefined || $scope.idProvinceFk!=null?$scope.idProvinceFk:null;
        if (twoNumber_patt.test(name)){
          addressServices.getAddressByName(name, idProvinceFk).then(function(data){
            if(data!=null){
              switch(opt){
                case "main":
                  $scope.rsAddress_API_Data_Main = data; //Main = Principal Customer Address
                break;
                case "payment":
                  $scope.rsAddress_API_Data_Payment = data; //Payment = Payment Customer Address
                break;
                case "particular":
                  $scope.rsAddress_API_Data_PCA = data;  //PCA = Particular Customer Address
                break;
              }
                //console.log($scope.rsProfileData);
                $scope.gobApiAddressNotFound=false;
                $scope.addrrSelected=false;
                $scope.enabledNextBtn();
            }else{
              $scope.gobApiAddressNotFound=true;
              $scope.geoLocation = {'address':'','addressLat':'', 'addressLon':'', 'option':''};
              inform.add('Direccion no encontrada en la API del Servicio de Normalizacion de Datos Geograficos. ',{
                  ttl:4000, type: 'danger'
              });

               $scope.searchAddressByNameFn(name,'address', opt);
            }
          });
        }else{
            switch(opt){
              case "main":
                $scope.rsAddress_API_Data_Main = null; //Main = Principal Customer Address
              break;
              case "payment":
                $scope.rsAddress_API_Data_Payment = null; //Payment = Payment Customer Address
              break;
              case "particular":
                $scope.rsAddress_API_Data_PCA = null;  //PCA = Particular Customer Address
              break;
            }
          $scope.addrrSelected=false;
          //console.info("expected 2 numbers at least");
          $scope.enabledNextBtn();
        }
      };
    
      $scope.closeAddressLatLonModal = function(){
        $("#AddressLatLon").modal('hide');
        $scope.geoLocation={};
      }
      $scope.setAddressLatLonFn = function(obj){
        switch(obj.option){
          case "main":
            $scope.customer.new.addressLat=obj.addressLat;
            $scope.customer.new.addressLon=obj.addressLon;
          break;
          case "particular":
            $scope.customer.particular.addressLat=obj.addressLat;
            $scope.customer.particular.addressLon=obj.addressLon;
          break;  
        }
          inform.add('Coordenadas de Lat:'+obj.addressLat+'/Lon:'+obj.addressLon+' han sido asignadas satisfactoriamente.. ',{
                    ttl:4000, type: 'success'
          });
          $("#AddressLatLon").modal('hide');
      }
    /**************************************************
    *                                                 *
    *               Fill Address Data                 *
    *                                                 *
    **************************************************/
      $scope.addrrSelected=false;
      $scope.fillData=function(opt1, opt2, obj){
        //console.log(obj);
        switch (opt1){
          case "address":
            switch(opt2){
              case "main":
              case "particular":
                if(obj.status==200){
                  if (opt2=="main"){
                    $scope.customer.new.isNotCliente=true;                  
                    $scope.customer.select.main.address.selected={address:obj.data.address};
                    $scope.rsAddress_API_Data_Main=null;
                  }else if (opt2=="particular"){
                    $scope.customer.particular.isBuilding=true;
                    //console.log(obj.data);                  
                    $scope.customer.particular.select.address.selected={address:obj.data.address};
                    $scope.rsAddress_API_Data_PCA=null;
                  }
                  $timeout(function() {
                    $scope.getBuildingsDeptosFn(obj.data.idClient);
                  }, 1500);
                  if ($scope.customer.new.idClientTypeFk!='2'){
                    blockUI.message('Cargando departamentos de '+obj.data.address);
                  }
                  $timeout(function() {
                      blockUI.stop();
                  }, 1500);
                  inform.add('La direccion '+obj.data.address+', se encuentra registrada. ',{
                      ttl:4000, type: 'success'
                  });
                  if ($scope.customer.new.idClientTypeFk=='2'){$scope.customer.new.nameAddress='';}
                }else{
                  //console.log(obj.status);
                  blockUI.message('Complete los campos restantes.');
                  if (opt2=="main"){
                    $scope.customer.new.nameAddress=obj.calle.nombre+" "+obj.altura.valor;              
                    $scope.customer.new.address=obj.calle.nombre+" "+obj.altura.valor;
                    $scope.customer.new.addressLat=obj.ubicacion.lat;
                    $scope.customer.new.addressLon=obj.ubicacion.lon;
                    $scope.rsAddress_API_Data_Main=null;
                  }else if (opt2=="particular"){
                    $scope.customer.particular.nameAddress=obj.calle.nombre+" "+obj.altura.valor;
                    //$scope.customer.particular.address=obj.calle.nombre+" "+obj.altura.valor;
                    $scope.customer.particular.addressLat=obj.ubicacion.lat;
                    $scope.customer.particular.addressLon=obj.ubicacion.lon;
                    $scope.rsAddress_API_Data_PCA=null;
                    $scope.addrrSelected=true;
                  }
                  $scope.addrrSelected=true;
                  $timeout(function() {
                    blockUI.stop();
                  }, 1500);
                }
                  $scope.enabledNextBtn();
              break;
              case "update":
                $scope.customer.update.nameAddress=obj.calle.nombre+" "+obj.altura.valor;
                $scope.customer.update.address=obj.calle.nombre+" "+obj.altura.valor;
                $scope.customer.update.addressLat=obj.ubicacion.lat;
                $scope.customer.update.addressLon=obj.ubicacion.lon;
                $scope.rsAddress_API_Data_Main=null;
              break;
              case "payment":
                //console.log(obj);
                if ($scope.isNewCustomer){
                  $scope.customer.new.billing_information.nameAddress=obj.calle.nombre+" "+obj.altura.valor;
                }else{
                  $scope.customer.update.billing_information.nameAddress=obj.calle.nombre+" "+obj.altura.valor;
                }
               
                $scope.rsAddress_API_Data_Payment=null;
                $scope.addrrSelected=true;
                $scope.enabledNextBtn();
              break;                          
            }
          break;        
          default:
        }

      }
      $scope.sysArrFound=false;
      $scope.rsStatesList={}; $scope.rsLocationsList={};
      $scope.rsStatesList2={}; $scope.rsLocationsList2={};
      $scope.sysFindInArrFn=function(string, objArr, opt){
        var nombre_1="";
        var nombre_2="";
        $scope.objArrTmp={};
        $scope.objArrTmp=objArr;
        console.log($scope.objArrTmp);
        var output=[];
        var i=0;
        if (string!=undefined && string!=""){
          angular.forEach($scope.objArrTmp,function(objTmp){
            console.log(objTmp);
            nombre_1=objTmp.province
            nombre_2=objTmp.location;
            var nameTmp=!nombre_1?nombre_2:nombre_1;
            console.info(nameTmp);
            if(nameTmp.toLowerCase().indexOf(string.toLowerCase())>=0){
              output.push({objTmp});
            }
          });
        }else{
              $scope.objArrTmp=null;
              $scope.sysArrFound=false;
        }
        switch (opt){
          case "states":
            $scope.rsStatesList=output;
            console.log($scope.rsStatesList);
          break;
          case "locations":
            $scope.rsLocationsList=output;
            console.log($scope.rsLocationsList);
          break;
          case "states2":
            $scope.rsStatesList2=output;
            console.log($scope.rsStatesList2);
          break;
          case "locations2":
            $scope.rsLocationsList2=output;
            console.log($scope.rsLocationsList2);
          break;        
          default:
        }   
      }
    /**************************************************
    *                                                 *
    *             AUTH USER FOR CUSTOMER              *
    *                                                 *
    **************************************************/    
      $scope.selectAuthUserDataFn=function(obj){
        $scope.list_id_user = [];
        $scope.list_users   = [];
        //console.log(obj.list_client_user);
        if (obj.list_client_user.length>0){
          for (var key in  obj.list_client_user){
            //console.log(obj.diviceOpening[key]);
            $scope.list_id_user.push({'idDiviceOpeningFk':obj.list_client_user[key].idUserFk});
            $scope.list_divices.push({'idDiviceOpeningFk':obj.diviceOpening[key].idUserFk, 'diviceOpening':obj.diviceOpening[key].diviceOpening});
          }
        }else{
          //console.log("obj.diviceOpening is empty");
        }
        $('#updateProduct').modal('show');
        //console.log(obj);
      }
      $scope.addAuthUserFn = function (obj, opt){
        if (opt=="new"){
          if ($scope.list_users.length<=0){            
            $scope.list_client_user.push({'idUserFk':obj.idUser});
            $scope.list_users.push({'idUserFk':obj.idUser, 'fullNameUser':obj.fullNameUser});
          }else{
            for (var key in  $scope.list_client_user){
             // console.log(key);
              //console.log("Validando: "+$scope.list_client_user[key].idUserFk+" == "+obj.idUser);
                if ( $scope.list_client_user[key].idUserFk==obj.idUser){
                  inform.add("El Usuario "+obj.fullNameUser+", ya se encuentra Autorizado.",{
                    ttl:5000, type: 'success'
                  });
                  $scope.isUserExist=true;
                  break;
                  //console.log($scope.isUserExist);
                }else{
                  $scope.isUserExist=false;
                  //console.log($scope.isUserExist);
                }
            }
              if(!$scope.isUserExist){
                  //console.log("ADD_NO_EXIST");
                $scope.list_client_user.push({'idUserFk':obj.idUser});
                $scope.list_users.push({'idUserFk':obj.idUser, 'fullNameUser':obj.fullNameUser});
              }
          }
        }else if (opt=="update"){
          if ($scope.list_users.length<=0){            
            $scope.list_client_user.push({'idUserFk':obj.idUser, 'idClientFk':$scope.customer.update.idClient,});
            $scope.list_users.push({'idUserFk':obj.idUser, 'fullNameUser':obj.fullNameUser, 'idClientFk':$scope.customer.update.idClient,});
          }else{
            for (var key in  $scope.list_client_user){
             // console.log(key);
              //console.log("Validando: "+$scope.list_client_user[key].idUserFk+" == "+obj.idUser);
                if ( $scope.list_client_user[key].idUserFk==obj.idUser){
                  inform.add("El Usuario "+obj.fullNameUser+", ya se encuentra Autorizado.",{
                    ttl:5000, type: 'success'
                  });
                  $scope.isUserExist=true;
                  break;
                  //console.log($scope.isUserExist);
                }else{
                  $scope.isUserExist=false;
                  //console.log($scope.isUserExist);
                }
            }
              if(!$scope.isUserExist){
                  //console.log("ADD_NO_EXIST");
                $scope.list_client_user.push({'idUserFk':obj.idUser, 'idClientFk':$scope.customer.update.idClient,});
                $scope.list_users.push({'idUserFk':obj.idUser, 'fullNameUser':obj.fullNameUser, 'idClientFk':$scope.customer.update.idClient,});
              }
          }
        }
        //console.log("OBJ A ADICIONAR:");
        //console.log(obj);
        //console.log("list_client_user:");
        //console.log($scope.list_client_user);
        //console.log("list_users:");
        //console.log($scope.list_users);
        $scope.authUser.selected=undefined;
      }
      $scope.removeAuthUserFn = function (obj){
        for (var key in  $scope.list_client_user){
            if ( $scope.list_client_user[key].idUserFk==obj.idUserFk){
                $scope.list_users.splice(key,1);
                $scope.list_client_user.splice(key,1);
            }
        }
        //console.log("OBJ A ELIMINAR:");
        //console.log(obj);
        //console.log($scope.list_client_user);
        //console.log($scope.list_users);
      }
      $scope.removeAllUsers = function(){
        for (var key in  $scope.list_users){
          $scope.list_users.splice(key,1);
          $scope.list_client_user.splice(key,1);
        }
      }          

    /**************************************************
    *                                                 *
    *                  CONTACT PHONES                 *
    *                                                 *
    **************************************************/
      $scope.list_phone_contact=[];
      $scope.list_phones=[];
      $scope.contactPhones={};
      $scope.isPhoneExist=null;
      $scope.addPhoneNumFn = function (obj, opt){
        //console.log("before addPhoneNumFn => $scope.list_phones.length: "+$scope.list_phones.length);
        //console.log($scope.list_phones);
        if (opt=="new"){
          if ($scope.list_phones.length<=0){
            console.log("length is equal 0 or less 0");
            $scope.list_phone_contact.push({'phoneTag':obj.phoneTag, 'phoneContact':obj.phoneContact});
            $scope.list_phones.push({'phoneTag':obj.phoneTag, 'phoneContact':obj.phoneContact});
          }else{
            for (var key in  $scope.list_phone_contact){
             // console.log(key);
              console.log("Validando: "+$scope.list_phone_contact[key].phoneContact+" == "+obj.phoneContact);
                if ($scope.list_phone_contact[key].phoneContact==obj.phoneContact && $scope.list_phone_contact[key].phoneTag==obj.phoneTag){
                  var tmpTag=$scope.list_phone_contact[key].phoneTag;
                  var ptag= tmpTag.toUpperCase();
                  inform.add("El Numero de contacto: "+obj.phoneContact+", se encuentra agregado como contacto "+ptag,{
                    ttl:5000, type: 'success'
                  });
                  $scope.isPhoneExist=true;
                  break;
                  //console.log($scope.isPhoneExist);
                }else{
                  $scope.isPhoneExist=false;
                  //console.log($scope.isPhoneExist);
                }
            }
            if(!$scope.isPhoneExist){
                console.log("ADD_NO_EXIST");
                  $scope.list_phone_contact.push({'phoneTag':obj.phoneTag, 'phoneContact':obj.phoneContact});
                  $scope.list_phones.push({'phoneTag':obj.phoneTag, 'phoneContact':obj.phoneContact});
            }
          }
        }else if (opt=="update"){
          //$scope.list_phone_contact.push({'idClientFk': obj.list_phone_contact[key].idClientFk,'phoneTag':obj.list_phone_contact[key].phoneTag, 'phoneContact':obj.list_phone_contact[key].phoneContact});
          if ($scope.list_phones.length<=0){
            //console.log("length is equal 0 or less 0");
            $scope.list_phone_contact.push({'idClientFk':$scope.customer.update.idClient,'phoneTag':obj.phoneTag, 'phoneContact':obj.phoneContact});
            $scope.list_phones.push({'phoneTag':obj.phoneTag, 'phoneContact':obj.phoneContact});
          }else{
            for (var key in  $scope.list_phone_contact){
             // console.log(key);
              //console.log("Validando: "+$scope.list_phone_contact[key].phoneContact+" == "+obj.phoneContact);
                if ($scope.list_phone_contact[key].phoneContact==obj.phoneContact && $scope.list_phone_contact[key].phoneTag==obj.phoneTag){
                  var tmpTag=$scope.list_phone_contact[key].phoneTag;
                  var ptag= tmpTag.toUpperCase();
                  inform.add("El Numero de contacto: "+obj.phoneContact+", se encuentra agregado como contacto "+ptag,{
                    ttl:5000, type: 'success'
                  });
                  $scope.isPhoneExist=true;
                  break;
                  //console.log($scope.isPhoneExist);
                }else{
                  $scope.isPhoneExist=false;
                  //console.log($scope.isPhoneExist);
                }
            }
            if(!$scope.isPhoneExist){
                //console.log("ADD_NO_EXIST");
                  $scope.list_phone_contact.push({'idClientFk':$scope.customer.update.idClient,'phoneTag':obj.phoneTag, 'phoneContact':obj.phoneContact});
                  $scope.list_phones.push({'phoneTag':obj.phoneTag, 'phoneContact':obj.phoneContact});
            }
          }      
        }
        //console.log("OBJ A ADICIONAR:");
        //console.log(obj);
        //console.log("list_phone_contact:");
        //console.log($scope.list_phone_contact);
        //console.log("list_phones:");
        //console.log($scope.list_phones);
        $scope.enabledNextBtn();
        //console.log("after addPhoneNumFn => $scope.list_phones.length: "+$scope.list_phones.length);
        //console.log($scope.list_phones);
        $scope.contactPhones={};
        $("#contactNumbers").focus();
      }
      $scope.removePhoneNumFn = function (obj){
        for (var key in  $scope.list_phone_contact){
            if ( $scope.list_phone_contact[key].phoneContact==obj.phoneContact){
                $scope.list_phones.splice(key,1);
                $scope.list_phone_contact.splice(key,1);
            }
        }
        //console.log("OBJ A ELIMINAR:");
        //console.log(obj);
        //console.log("list_phone_contact:");
        //console.log($scope.list_phone_contact);
        //console.log("list_phones:");
        //console.log($scope.list_phones);
        $scope.enabledNextBtn();
        $("#contactNumbers").focus();      
      }
      $scope.removeAllPhones = function(){
        for (var key in  $scope.list_phones){
          $scope.list_phones.splice(key,1);
          $scope.list_phone_contact.splice(key,1);
        }
        $("#contactNumbers").focus();
      }
    /**************************************************
    *                                                 *
    *                  CONTACT MAILS                  *
    *                                                 *
    **************************************************/
      $scope.list_mails_contact=[];
      $scope.list_mails=[];
      $scope.contactMails={};
      $scope.isMailExist=null;
      $scope.addMailContactFn = function (obj, opt){
        var typeName = '';
        for (var type in $scope.rsTypeOfMailsData){
          if ($scope.rsTypeOfMailsData[type].idTipoMail==obj.idTipoDeMailFk){
            typeName= $scope.rsTypeOfMailsData[type].descripcion;
          }
        }
        //console.log("before addMailContactFn => $scope.list_mails.length: "+$scope.list_mails.length);
        //console.log($scope.list_mails);
        if (opt=="new"){
          if ($scope.list_mails.length<=0){
            //console.log("length is equal 0 or less 0");
            $scope.list_mails_contact.push({'mailTag':null, 'mailContact':obj.mailContact, 'idTipoDeMailFk': obj.idTipoDeMailFk});
            $scope.list_mails.push({'mailTag':null, 'typeName':typeName, 'mailContact':obj.mailContact, 'idTipoDeMailFk': obj.idTipoDeMailFk});
          }else{
            for (var key in  $scope.list_mails_contact){
             // console.log(key);
                //console.log("Validando: "+$scope.list_mails_contact[key].mailContact+" == "+obj.idTipoDeMailFk);
                if ($scope.list_mails_contact[key].mailContact==obj.mailContact && $scope.list_mails_contact[key].idTipoDeMailFk==obj.idTipoDeMailFk){
                  var tmpTag=objMailTag;
                  var ptag= tmpTag.toUpperCase();
                  inform.add("El Correo: "+obj.mailContact+" ["+ptag+"], ya ha sido agregado.",{
                    ttl:5000, type: 'success'
                  });
                  $scope.isMailExist=true;
                  break;
                  //console.log($scope.isMailExist);
                }else{
                  $scope.isMailExist=false;
                  //console.log($scope.isMailExist);
                }
            }
            if(!$scope.isMailExist){
                //console.log("ADD_NO_EXIST");
                  $scope.list_mails_contact.push({'mailTag':null, 'mailContact':obj.mailContact, 'idTipoDeMailFk': obj.idTipoDeMailFk});
                  $scope.list_mails.push({'mailTag':null, 'typeName':typeName, 'mailContact':obj.mailContact, 'idTipoDeMailFk': obj.idTipoDeMailFk});
            }
          }
        }else if (opt=="update"){
          //$scope.list_mails_contact.push({'idClientFk': obj.list_mails_contact[key].idClientFk,'phoneTag':obj.list_mails_contact[key].phoneTag, 'phoneContact':obj.list_mails_contact[key].phoneContact});
          if ($scope.list_mails.length<=0){
            //console.log("length is equal 0 or less 0");
            $scope.list_mails_contact.push({'idClienteFk':$scope.customer.update.idClient, 'mailTag':null, 'mailContact':obj.mailContact, 'idTipoDeMailFk': obj.idTipoDeMailFk, 'status':obj.list_emails[key].status});
            $scope.list_mails.push({'idClienteFk':$scope.customer.update.idClient, 'mailTag':null, 'typeName':typeName, 'mailContact':obj.mailContact, 'idTipoDeMailFk': obj.idTipoDeMailFk, 'status':obj.list_emails[key].status});
          }else{
            for (var key in  $scope.list_mails_contact){
             // console.log(key);
                //console.log("Validando: "+$scope.list_mails_contact[key].mailContact+" == "+obj.idTipoDeMailFk);
                if ($scope.list_mails_contact[key].mailContact==obj.mailContact && $scope.list_mails_contact[key].idTipoDeMailFk==obj.idTipoDeMailFk){
                  var tmpTag=objMailTag;
                  var ptag= tmpTag.toUpperCase();
                  inform.add("El Correo: "+obj.mailContact+" ["+ptag+"], ya ha sido agregado.",{
                    ttl:5000, type: 'success'
                  });
                  $scope.isMailExist=true;
                  break;
                  //console.log($scope.isMailExist);
                }else{
                  $scope.isMailExist=false;
                  //console.log($scope.isMailExist);
                }
            }
            if(!$scope.isMailExist){
                //console.log("ADD_NO_EXIST");
                  $scope.list_mails_contact.push({'idClienteFk':$scope.customer.update.idClient,'mailTag':null, 'mailContact':obj.mailContact, 'idTipoDeMailFk': obj.idTipoDeMailFk, 'status':obj.list_emails[key].status});
                  $scope.list_mails.push({'idClienteFk':$scope.customer.update.idClient,'mailTag':null, 'typeName':typeName, 'mailContact':obj.mailContact, 'idTipoDeMailFk': obj.idTipoDeMailFk, 'status':obj.list_emails[key].status});
            }
          }      
        }
        //console.log("OBJ A ADICIONAR:");
        //console.log(obj);
        //console.log("list_mails_contact:");
        //console.log($scope.list_mails_contact);
        //console.log("list_mails:");
        //console.log($scope.list_mails);
        $scope.enabledNextBtn();
        //console.log("after addMailContactFn => $scope.list_mails.length: "+$scope.list_mails.length);
        //console.log($scope.list_mails);
        $scope.contactMails={};
        $("#contactMail").focus();
      }
      $scope.removemailNumFn = function (obj){
        for (var key in  $scope.list_mails_contact){
            if ( $scope.list_mails_contact[key].mailContact==obj.mailContact && $scope.list_mails_contact[key].idTipoDeMailFk==obj.idTipoDeMailFk){
                $scope.list_mails.splice(key,1);
                $scope.list_mails_contact.splice(key,1);
            }
        }
        //console.log("OBJ A ELIMINAR:");
        //console.log(obj);
        //console.log("list_mails_contact:");
        //console.log($scope.list_mails_contact);
        //console.log("list_mails:");
        //console.log($scope.list_mails);
        $scope.enabledNextBtn();
        $("#contactMail").focus();      
      }
    /**************************************************
    *                                                 *
    *                   SCHEDULE TIME                 *
    *                                                 *
    **************************************************/
      $scope.list_schedule_atention = [];
      $scope.list_schedule_Arr = [];
      $scope.list_input_first = {fronAm:'', toAm:'', fronPm: '', toPm:''};
      $scope.list_input_last = {fronAm:'', toAm:'', fronPm: '', toPm:''};
      $scope.dayOfWeek_list=[{}];
      $scope.setScheduleTimeFn = function(obj, opt){
        //console.log(obj);
        //console.log("================================================================");
        if (opt=="new"){
          if(obj.selected==true){
            //console.info("Checkbox selected = "+obj.selected);
            if ($scope.list_schedule_atention.length<=0 ){
              //console.log("length is equal 0 or less 0");
              $scope.list_schedule_atention.push({'day':obj.day, 'fronAm':obj.fronAm, 'toAm': obj.toAm, 'fronPm': obj.fronPm, 'toPm': obj.toPm});
              $scope.list_input_first.fronAm  = obj.fronAm;
              $scope.list_input_first.toAm    = obj.toAm;
              $scope.list_input_first.fronPm  = obj.fronPm;
              $scope.list_input_first.toPm    = obj.toPm;
            }else{
              for (var key in  $scope.list_schedule_atention){
               // console.log(key);
                //console.log("Validando: "+$scope.list_phone_contact[key].phoneContact+" == "+obj.idDiviceOpening);
                  if ($scope.list_schedule_atention[key].day==obj.day){
                      $scope.list_schedule_atention[key].fronAm   = obj.fronAm;
                      $scope.list_schedule_atention[key].toAm     = obj.toAm;
                      $scope.list_schedule_atention[key].fronPm   = obj.fronPm;
                      $scope.list_schedule_atention[key].toPm     = obj.toPm;
                      //Validate if there is only one item in the array.
                      if($scope.list_schedule_atention.length==1 || ($scope.list_schedule_atention[key].day==obj.day && obj.day=="Lunes")){
                        $scope.list_input_first.fronAm  = obj.fronAm;
                        $scope.list_input_first.toAm    = obj.toAm;
                        $scope.list_input_first.fronPm  = obj.fronPm;
                        $scope.list_input_first.toPm    = obj.toPm;
                      }

                    $scope.isSchedItemExist=true;
                    break;
                    
                  }else{
                    $scope.isSchedItemExist=false;
                  }
              }
              //console.log("isSchedItemExist: "+$scope.isSchedItemExist);
              if(!$scope.isSchedItemExist){
                  console.log("ADD_NO_EXIST");
                for (var key in  $scope.list_schedule){
                    if ( $scope.list_schedule[key].day==obj.day){
                      $scope.list_schedule[key].fronAm = $scope.list_input_first.fronAm;
                      $scope.list_schedule[key].toAm   = $scope.list_input_first.toAm;
                      $scope.list_schedule[key].fronPm = $scope.list_input_first.fronPm;
                      $scope.list_schedule[key].toPm   = $scope.list_input_first.toPm;
                    }
                }
                $scope.list_schedule_atention.push({'day':obj.day, 'fronAm':obj.fronAm, 'toAm': obj.toAm, 'fronPm': obj.fronPm, 'toPm': obj.toPm});
              }
            }
            //console.info($scope.list_schedule_atention);
          }else{
            //console.info("Checkbox selected = "+obj.selected);
            console.info("The arr Item id ["+obj.id+"] - "+obj.day+" Will be removed.");
            for (var key in  $scope.list_schedule_atention){
              if ($scope.list_schedule_atention[key].day==obj.day){
                $scope.list_schedule_atention.splice(key,1);
              }
            }
            for (var key in  $scope.list_schedule){
              if ( $scope.list_schedule[key].day==obj.day){
                $scope.list_schedule[key].fronAm = "";
                $scope.list_schedule[key].toAm   = "";
                $scope.list_schedule[key].fronPm = "";
                $scope.list_schedule[key].toPm   = "";
              }
            }
            //console.info($scope.list_schedule_atention);
          }
        }else{
          if(obj.selected==true){
            var list_schedule_atention_length=$scope.list_schedule_atention.length;
            //console.info("Checkbox selected = "+obj.selected);
            if (list_schedule_atention_length<=0 ){
              //console.log("length is equal 0 or less 0");
              $scope.list_schedule_atention.push({'idClienteFk':$scope.customer.update.idClient, 'day':obj.day, 'fronAm':obj.fronAm, 'toAm': obj.toAm, 'fronPm': obj.fronPm, 'toPm': obj.toPm});
              $scope.list_input_first.fronAm  = obj.fronAm;
              $scope.list_input_first.toAm    = obj.toAm;
              $scope.list_input_first.fronPm  = obj.fronPm;
              $scope.list_input_first.toPm    = obj.toPm;
            }else{
              for (var key in  $scope.list_schedule_atention){
                //Validate if there is one or more item in the array to pick up the first element value or the last one
                if(list_schedule_atention_length==1 || ($scope.list_schedule_atention[key].day==obj.day && obj.day=="Lunes")){
                  $scope.list_input_first.fronAm  = $scope.list_schedule_atention[key].fronAm;
                  $scope.list_input_first.toAm    = $scope.list_schedule_atention[key].toAm;
                  $scope.list_input_first.fronPm  = $scope.list_schedule_atention[key].fronPm;
                  $scope.list_input_first.toPm    = $scope.list_schedule_atention[key].toPm;
                }else if(list_schedule_atention_length>1 && ($scope.list_schedule_atention[key].day=="Lunes" || $scope.list_schedule_atention[key].day=="Martes" || $scope.list_schedule_atention[key].day=="Miercoles" || $scope.list_schedule_atention[key].day=="Jueves" || $scope.list_schedule_atention[key].day=="Viernes" || $scope.list_schedule_atention[key].day=="Sabado" || $scope.list_schedule_atention[key].day=="Domingo")){
                  $scope.list_input_last.fronAm  = $scope.list_schedule_atention[key].fronAm;
                  $scope.list_input_last.toAm    = $scope.list_schedule_atention[key].toAm;
                  $scope.list_input_last.fronPm  = $scope.list_schedule_atention[key].fronPm;
                  $scope.list_input_last.toPm    = $scope.list_schedule_atention[key].toPm;                      
                }
              }
              for (var key in  $scope.list_schedule_atention){
                  if ($scope.list_schedule_atention[key].day==obj.day){
                      $scope.list_schedule_atention[key].fronAm   = obj.fronAm;
                      $scope.list_schedule_atention[key].toAm     = obj.toAm;
                      $scope.list_schedule_atention[key].fronPm   = obj.fronPm;
                      $scope.list_schedule_atention[key].toPm     = obj.toPm;
                    $scope.isSchedItemExist=true;
                    break;
                    
                  }else{
                    $scope.isSchedItemExist=false;
                  }
              }
              //console.log("isSchedItemExist: "+$scope.isSchedItemExist);
              if(!$scope.isSchedItemExist){
                  //console.log("ADD_NO_EXIST");
                for (var key in  $scope.list_schedule){
                    if ( $scope.list_schedule[key].day==obj.day){
                      if (list_schedule_atention_length==1){
                        //console.log("adding the data of the first element of the array.");
                        $scope.list_schedule[key].fronAm = $scope.list_input_first.fronAm;
                        $scope.list_schedule[key].toAm   = $scope.list_input_first.toAm;
                        $scope.list_schedule[key].fronPm = $scope.list_input_first.fronPm;
                        $scope.list_schedule[key].toPm   = $scope.list_input_first.toPm;
                        $scope.list_schedule_atention.push({
                          'idClienteFk':$scope.customer.update.idClient, 
                          'day':obj.day, 
                          'fronAm':$scope.list_input_first.fronAm, 
                          'toAm': $scope.list_input_first.toAm, 
                          'fronPm': $scope.list_input_first.fronPm, 
                          'toPm': $scope.list_input_first.toPm});                      
                      }else if(list_schedule_atention_length>1){
                        //console.log("adding the data of the last element of the array.");
                        $scope.list_schedule[key].fronAm = $scope.list_input_last.fronAm;
                        $scope.list_schedule[key].toAm   = $scope.list_input_last.toAm;
                        $scope.list_schedule[key].fronPm = $scope.list_input_last.fronPm;
                        $scope.list_schedule[key].toPm   = $scope.list_input_last.toPm;
                        $scope.list_schedule_atention.push({
                          'idClienteFk':$scope.customer.update.idClient, 
                          'day':obj.day, 
                          'fronAm':$scope.list_input_last.fronAm, 
                          'toAm': $scope.list_input_last.toAm, 
                          'fronPm': $scope.list_input_last.fronPm, 
                          'toPm': $scope.list_input_last.toPm});
                      }
                    }
                }
                
              }
            }
            //console.info($scope.list_schedule_atention);
          }else{
            //console.info("Checkbox selected = "+obj.selected);
            //console.info("The arr Item id ["+obj.id+"] - "+obj.day+" Will be removed.");
            for (var key in  $scope.list_schedule_atention){
              if ($scope.list_schedule_atention[key].day==obj.day){
                $scope.list_schedule_atention.splice(key,1);
              }
            }
            for (var key in  $scope.list_schedule){
              if ( $scope.list_schedule[key].day==obj.day){
                $scope.list_schedule[key].fronAm = "";
                $scope.list_schedule[key].toAm   = "";
                $scope.list_schedule[key].fronPm = "";
                $scope.list_schedule[key].toPm   = "";
              }
            }
          }
        }
        
      }
      $scope.schedTime=[];
      $scope.list_schedule_time_orderBy=[];
      $scope.orderScheduleTimeFn = function(arr){
        $scope.schedTime = arr;
        $scope.list_schedule_time_orderBy=[];
        for (i=0;i<$scope.list_schedule.length;i++){
          j=0;
          for (j=0;j<$scope.schedTime.length;j++){
            if($scope.list_schedule[i].day==$scope.schedTime[j].day){
              //$scope.list_schedule_time_orderBy.push({'day':$scope.schedTime[j].day, 'fronAm':$scope.schedTime[j].fronAm, 'toAm': $scope.schedTime[j].toAm, 'fronPm': $scope.schedTime[j].fronPm, 'toPm': $scope.schedTime[j].toPm});
              $scope.list_schedule_time_orderBy.push($scope.schedTime[j]);              
              break;
            }
          }
        }
        console.info($scope.list_schedule_time_orderBy);
      }
    /**************************************************
    *                                                 *
    *     LOAD FIELDS TO NEXT REGISTRATION STEPS      *
    *                                                 *
    **************************************************/
      $scope.loadFieldsTo2Step = function(opt){
        if (opt =="new"){
          $scope.orderScheduleTimeFn($scope.list_schedule_atention);
          if ($scope.customer.new.idClientTypeFk!=4){
            if ($scope.customer.new.idClientTypeFk==1 || $scope.customer.new.idClientTypeFk==3){
              /*Load if the customer is administration or company*/
              $scope.customer.new.billing_information.businessNameBilling    = $scope.customer.new.businessName;           
              $scope.customer.new.billing_information.cuitBilling            = $scope.customer.new.CUIT;
              
              if (!$scope.customer.new.isNotCliente){ 
                /*load for all customer differents than building, branch and particular */
                $scope.addrrSelected=true;
                $scope.customer.new.billing_information.nameAddress            = $scope.customer.new.nameAddress;
                $scope.customer.select.payment.province.selected               = {idProvince: $scope.tmpAddres.province.idProvince, province: $scope.tmpAddres.province.province};
                $scope.customer.select.payment.location.selected               = {idLocation: $scope.tmpAddres.location.idLocation, location: $scope.tmpAddres.location.location};
              }else{
                $scope.addrrSelected=true;
                $scope.customer.new.billing_information.nameAddress            = $scope.customer.select.main.address.selected.address;
                $scope.customer.select.payment.province.selected               = {idProvince: $scope.customer.select.main.address.selected.idProvinceFk, province: $scope.customer.select.main.address.selected.province};
                $scope.customer.select.payment.location.selected               = {idLocation: $scope.customer.select.main.address.selected.idLocationFk, location: $scope.customer.select.main.address.selected.location};
              }  
            }else if ($scope.customer.new.idClientTypeFk==5){ 
              /*load the province and location data if there isn't a registered building for particular users*/ 
              $scope.customer.new.billing_information.businessNameBilling    = $scope.customer.new.name;        
              $scope.customer.new.billing_information.nameAddress            = $scope.customer.new.nameAddress;
            }else{
              $scope.customer.new.billing_information.businessNameBilling    = $scope.customer.new.nameAddress;
              $scope.customer.new.billing_information.nameAddress            = $scope.customer.new.nameAddress;
              $scope.customer.select.payment.province.selected               = {idProvince: $scope.tmpAddres.province.idProvince, province: $scope.tmpAddres.province.province};
              $scope.customer.select.payment.location.selected               = {idLocation: $scope.tmpAddres.location.idLocation, location: $scope.tmpAddres.location.location};
              $scope.addrrSelected=true;
            }
          }else{
            $scope.addrrSelected=true;
            $scope.customer.new.billing_information.businessNameBilling    = $scope.customer.companyData.businessName;
            $scope.customer.new.billing_information.cuitBilling            = $scope.customer.companyData.CUIT;
            $scope.customer.new.billing_information.nameAddress            = $scope.customer.companyData.address;
            $scope.customer.select.payment.province.selected               = {idProvince: $scope.customer.companyData.idProvinceFk, province: $scope.customer.companyData.provinceName};
            $scope.customer.select.payment.location.selected               = {idLocation: $scope.customer.companyData.idLocationFk, location: $scope.customer.companyData.locationName};
          }          
        }else if (opt=="update"){
              $scope.orderScheduleTimeFn($scope.list_schedule_atention);
              $scope.addrrSelected=true;
              $scope.customer.update.billing_information.businessNameBilling = $scope.customer.update.billing_information.businessNameBilling;           
              $scope.customer.update.billing_information.cuitBilling         = $scope.customer.update.billing_information.cuitBilling;
              $scope.customer.update.billing_information.nameAddress         = $scope.customer.update.billing_information.businessAddress;
              $scope.customer.update.billing_information.idTypeTaxFk         = $scope.customer.update.billing_information.idTypeTaxFk;
              $scope.customer.select.payment.province.selected               = {idProvince: $scope.customer.update.billing_information.idProvinceBillingFk, province: $scope.customer.update.billing_information.province};
              $scope.customer.select.payment.location.selected               = {idLocation: $scope.customer.update.billing_information.idLocationBillingFk, location: $scope.customer.update.billing_information.location};

        }
      }
    /**************************************************
    *                                                 *
    *                  DEPARTMENTS                    *
    *                                                 *
    **************************************************/
      /**************************************************
      *                SINGLE FUNCTION                  *
      ***************************************************/
        $scope.dptoPaginationFn = function(arrData, itemPerPage){
           $scope.paginationServiceFn(arrData, itemPerPage);
            if ($scope.vm.pager.totalPages > 1){
              $scope.vm.setPage($scope.vm.pager.totalPages)
            }
            if (arrData.length>5){
              $scope.showPagination=true;
            }else{
              $scope.showPagination=false;
            }
        }
        $scope.list_departments=[];
        $scope.list_depto=[];
        $scope.isDeptoExist=null;
        $scope.showPagination=false;
        $scope.addDeptoSingleFn = function (obj, opt){
          //console.log(obj);
          //console.log("addDeptoSingleFn => $scope.list_depto.length: "+$scope.list_depto.length);
          if (opt=="new"){
            if ($scope.list_depto.length<=0){
              //console.log("length is equal 0 or less 0");
              $scope.list_departments.push({'floor':obj.floor, 'departament':obj.departament, 'idCategoryDepartamentFk': obj.idCategoryDepartamentFk});
              $scope.list_depto.push({'floor':obj.floor, 'departament':obj.departament, 'idCategoryDepartamentFk': obj.idCategoryDepartamentFk});
            }else{
              for (var key in  $scope.list_departments){
               // console.log(key);
                //console.log("Validando PISO: "+$scope.list_departments[key].floor+" == "+obj.floor);
                //console.log("Validando DEPTO: "+$scope.list_departments[key].departament+" == "+obj.departament);
                  if ($scope.list_departments[key].floor==obj.floor && $scope.list_departments[key].departament==obj.departament){
                    var tmpFloor=obj.floor;
                    var tmpDepto=obj.departament;
                    var pDepto= tmpDepto.toUpperCase();
                    inform.add("El Departamento: ["+tmpFloor+" - "+pDepto+"] se encuentra registrado.",{
                      ttl:5000, type: 'warning'
                    });
                    $scope.isDeptoExist=true;
                    break;
                    //console.log($scope.isDeptoExist);
                  }else{
                    $scope.isDeptoExist=false;
                    //console.log($scope.isDeptoExist);
                  }
              }
              if(!$scope.isDeptoExist){
                  //console.log("ADD_NO_EXIST");
                    $scope.list_departments.push({'floor':obj.floor, 'departament':obj.departament, 'idCategoryDepartamentFk': obj.idCategoryDepartamentFk});
                    $scope.list_depto.push({'floor':obj.floor, 'departament':obj.departament, 'idCategoryDepartamentFk': obj.idCategoryDepartamentFk});
              }
            }
          }else if (opt=="update"){
            //$scope.list_departments.push({'idClientFk': obj.list_departments[key].idClientFk,'phoneTag':obj.list_departments[key].phoneTag, 'phoneContact':obj.list_departments[key].phoneContact});
            if ($scope.list_depto.length<=0){
              //console.log("length is equal 0 or less 0");
              $scope.list_departments.push({'idClientFk':$scope.customer.update.idClient,'floor':obj.floor, 'departament':obj.departament, 'idCategoryDepartamentFk': obj.idCategoryDepartamentFk});
              $scope.list_depto.push({'floor':obj.floor, 'departament':obj.departament, 'idCategoryDepartamentFk': obj.idCategoryDepartamentFk});
            }else{
              for (var key in  $scope.list_departments){
                  // console.log(key);
                  //console.log("Validando PISO: "+$scope.list_departments[key].floor+" == "+obj.floor);
                  //console.log("Validando DEPTO: "+$scope.list_departments[key].departament+" == "+obj.departament);
                  if ($scope.list_departments[key].floor==obj.floor && $scope.list_departments[key].departament==obj.departament){
                    var tmpFloor=obj.floor;
                    var tmpDepto=obj.departament;
                    var pDepto= tmpDepto.toUpperCase();
                    inform.add("El Departamento: ["+tmpFloor+" - "+pDepto+"] se encuentra registrado.",{
                      ttl:5000, type: 'success'
                    });
                    $scope.isDeptoExist=true;
                    break;
                    //console.log($scope.isDeptoExist);
                  }else{
                    $scope.isDeptoExist=false;
                    //console.log($scope.isDeptoExist);
                  }
              }
              if(!$scope.isDeptoExist){
                  //console.log("ADD_NO_EXIST");
                    $scope.list_departments.push({'idClientFk':$scope.customer.update.idClient,'floor':obj.floor, 'departament':obj.departament, 'idCategoryDepartamentFk': obj.idCategoryDepartamentFk});
                    $scope.list_depto.push({'floor':obj.floor, 'departament':obj.departament, 'idCategoryDepartamentFk': obj.idCategoryDepartamentFk});
              }
            }      
          }
          //console.log("OBJ A ADICIONAR:");
          //console.log(obj);
          //console.log("list_departments:");
          //console.log($scope.list_departments);
          //console.log("list_depto:");
          //console.log($scope.list_depto);
          $scope.enabledNextBtn();
          $scope.dptoPaginationFn($scope.list_departments, 5);
          console.info($scope.list_departments);
        }
        $scope.removeDeptoSingleFn = function (obj){
          //console.log(obj);
          for (var key in  $scope.list_departments){
              if ($scope.list_departments[key].floor==obj.floor && $scope.list_departments[key].departament==obj.departament){
                  $scope.list_depto.splice(key,1);
                  $scope.list_departments.splice(key,1);
              }
              $scope.dptoPaginationFn($scope.list_departments, 5);
          }
          //console.log("OBJ A ELIMINAR:");
          //console.log(obj);
          //console.log("list_departments:");
          //console.log($scope.list_departments);
          //console.log("list_depto:");
          //console.log($scope.list_depto);
          $scope.enabledNextBtn();      
        }
      /**************************************************
      *                MULTI FUNCTION                   *
      ***************************************************/  
          //$scope.loadMultiDeptosFn = function(){
          //  $scope.list_depto_floors=[];
          //  $scope.list_department_multi={'floor':'','departament':'','correlacion':undefined,'unidad':undefined, 'idCategoryDepartamentFk':''};
          //  departmentUnidad=0;
          //  $("#RegisterMultiDeptosModalCustomer").modal('toggle');
          //    $('#RegisterMultiDeptosModalCustomer').on('shown.bs.modal', function () {
          //      $('#garage_number').focus();
          //    });
          //}      
          $scope.list_department_multi={'garage':'','floor':'','departament':'','correlacion':undefined,'unidad':undefined, 'idCategoryDepartamentFk':''};
          $scope.list_depto_floors=[];
          $scope.deptoUnidades =  [{idUnidad:1, unidad:'Letras'},
                                   {idUnidad:2, unidad:'Numeros'}];
          $scope.deptoCorrelacion   =  [{id:1, nombre:'Letras A, B, C por piso', idUnidadKf: 1},
                                        {id:2, nombre:'Numeros correlativos', idUnidadKf: 2},
                                        {id:3, nombre:'Numeros correlativos por piso', idUnidadKf: 2}];   
          var arrLetras=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
          var departmentUnidad=0;  
        /**************************************************
        *              ADD FLOOR FUNCTION                 *
        ***************************************************/
          $scope.addFloorFn = function(){
            var nFloor= $scope.list_depto_floors.length;
            $scope.list_depto_floors.push({'id':(nFloor-1)+1,'nameFloor':(nFloor-4)+1, 'deptos':[]});
            if($scope.list_depto_floors.length>7){
              setTimeout(function() {
                $('.table-list-deptos > tbody > tr:last-child').find('.btn').focus();
              }, 100);  
            }
          }
        /**************************************************
        *              DEL FLOOR FUNCTION                 *
        ***************************************************/
          $scope.delFloorFn = function(floor){
            console.log("Piso seleccionado que sera Eliminado: "+floor.id);
            $scope.list_depto_floors.splice(floor.id, 1);
          }
        /**************************************************
        *          CREATE BUILDING & DEPTO FUNCTION       *
        ***************************************************/
          $scope.addDeptoMultiFn = function(obj, opt){
              $scope.list_department_multi.idCategoryDepartamentFk="1"; 
            if (opt=="new"){
              $scope.list_depto_floors=[];
              departmentUnidad=0;
              /*SUB FLOOR AND GARAGES */
              //ADD THE FLOOR 0 AS A SUB FLOOR 
              $scope.list_depto_floors.push({'id':0, 'nameFloor':'co', 'deptos':[]});
              $scope.list_depto_floors.push({'id':1,'nameFloor':'ba', 'deptos':[]});
              $scope.list_depto_floors.push({'id':2,'nameFloor':'lo', 'deptos':[]});
              //ADD THE FLOOR 0 AS A SUB FLOOR 
              /*CALCULATE THE AMOUNT OF GARAGE BEFORE CREATE */
              //var total_garage=obj.garage==""?(obj.departament*obj.floor):obj.garage;
              //for (var g=0; g<total_garage; g++){
              //  $scope.list_depto_floors[0].deptos.push({'idDepto':$scope.list_depto_floors[0].deptos.length+1, 'floor':$scope.list_depto_floors[0].nameFloor, 'departament':($scope.list_depto_floors[0].deptos.length+1), 'idCategoryDepartamentFk': '2', 'enabled':false, 'categoryDepartament':[]});
              //}
              //for (var d in  $scope.list_depto_floors[0].deptos){
              //  for (var item in $scope.rsCategoryDeptoData){
              //    $scope.list_depto_floors[0].deptos[d].categoryDepartament.push({'idCategoryDepartament':$scope.rsCategoryDeptoData[item].idCategoryDepartament, 'categoryDepartament':$scope.rsCategoryDeptoData[item].categoryDepartament});
              //  }
              //}
              /*SUB FLOOR AND GARAGES */
              //ADD THE FLOOR 1 AS A PB DEFAULT FLOOR
              $scope.list_depto_floors.push({'id':3,'nameFloor':'pb', 'deptos':[]});
              /*ALL FLOOR AND DEPTO AFTER LO */
              for ( var i=1; i<=obj.floor; i++){
                  $scope.list_depto_floors.push({'id':(i+3),'nameFloor':i.toString(), 'deptos':[]});
              }
              l=1;
              for (var i=3; i<$scope.list_depto_floors.length; i++){
                for (var j=0; j<obj.departament; j++){
                  /* UNIDAD LETRAS & CORRELATIVAS POR PISO*/
                  if (obj.unidad==1 && obj.correlacion==1){
                    departmentUnidad='';
                    departmentUnidad=arrLetras[j];
                    /* UNIDAD NUMEROS & CORRELATIVOS */
                  }else if(obj.unidad==2 && obj.correlacion==2) {
                    departmentUnidad=departmentUnidad+1;
                    /* UNIDAD NUMEROS & CORRELATIVOS POR PISO*/
                  }else if(obj.unidad==2 && obj.correlacion==3) {
                      if(departmentUnidad==obj.departament){departmentUnidad=1}else{departmentUnidad=departmentUnidad+1;}
                  }else{
                    departmentUnidad=''
                  }
                  $scope.list_depto_floors[i].deptos.push({'idDepto':j+1, 'unitNumber':'', 'floor':$scope.list_depto_floors[i].nameFloor, 'departament':departmentUnidad, 'idCategoryDepartamentFk': obj.idCategoryDepartamentFk, 'enabled':false, 'categoryDepartament':[], 'idFloor':$scope.list_depto_floors[i].id});             
                }
                l++;
              }
              for (var i=3; i<$scope.list_depto_floors.length; i++){
                for (var d in  $scope.list_depto_floors[i].deptos){
                  for (var item in $scope.rsCategoryDeptoData){

                    $scope.list_depto_floors[i].deptos[d].categoryDepartament.push({'idCategoryDepartament':$scope.rsCategoryDeptoData[item].idCategoryDepartament, 'categoryDepartament':$scope.rsCategoryDeptoData[item].categoryDepartament});
                  }
                }
              }          
              /*ALL FLOOR AND DEPTO AFTER PB */
              console.log("Building Floor Length  : "+$scope.list_depto_floors.length);
              console.log("Building garage floor  : "+$scope.list_depto_floors[0].deptos.length);
              console.log("Building storage floor : "+$scope.list_depto_floors[1].deptos.length);
              console.log("Building stores floor  : "+$scope.list_depto_floors[2].deptos.length);
              console.log("Building Main floor    : "+$scope.list_depto_floors[3].deptos.length);
              console.log($scope.list_depto_floors);
              $scope.enabledNextBtn();
            }else if (opt=="update"){
            }

            
          }
        /**************************************************
        *              ADD ONE DEPTO FUNCTION             *
        ***************************************************/
          $scope.porteriaCount=0; 
          $scope.addOneDeptoMultiFn = function(obj, argCategoryDepartament, deptoUnit){
            
            console.log("======================");
            console.log("|    Add One Depto   |")
            console.log("======================");
            console.log("floorId["+obj.id+"] => floor: "+obj.nameFloor);
            console.log("Qty of Units before add ["+obj.nameFloor+"]: "+obj.deptos.length);
            console.log("Category of unit to be add in the floor: ["+obj.nameFloor+"]: "+argCategoryDepartament);    

            var floorsLength       =  obj.deptos.length;
            if(obj.nameFloor!="co" && obj.nameFloor!="ba" && obj.nameFloor!="lo"){         
              if ($scope.list_depto_floors[obj.id].deptos.length==0){
                /* UNIDAD LETRAS & CORRELATIVAS POR PISO*/
                if ($scope.list_department_multi.unidad==1 && $scope.list_department_multi.correlacion==1){
                  departmentUnidad='';                        
                  departmentUnidad=arrLetras[0];
                }else if($scope.list_department_multi.unidad==2 && ($scope.list_department_multi.correlacion==2 || $scope.list_department_multi.correlacion==3)){
                  departmentUnidad=0;
                  departmentUnidad=departmentUnidad+1;
                }
                  if(argCategoryDepartament=="5"){
                    $scope.porteriaCount=($scope.porteriaCount+1)
                    $scope.list_depto_floors[obj.id].deptos.push({'idDepto':floorsLength+1, 'unitNumber':'', 'floor':obj.nameFloor, 'poNumber':$scope.porteriaCount, 'departament':'PO-'+$scope.porteriaCount, 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':false, 'categoryDepartament':[], 'idFloor':$scope.list_depto_floors[obj.id].id});
                  }else if(argCategoryDepartament=="6"){
                        $scope.list_depto_floors[obj.id].deptos.push({'idDepto':(floorsLength+1), 'unitNumber':'', 'floor':obj.nameFloor, 'departament':deptoUnit, 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':false, 'categoryDepartament':[],'idFloor':$scope.list_depto_floors[obj.id].id});
                  }else{
                    $scope.list_depto_floors[obj.id].deptos.push({'idDepto':floorsLength+1, 'unitNumber':'', 'floor':obj.nameFloor, 'departament':departmentUnidad, 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':false, 'categoryDepartament':[], 'idFloor':$scope.list_depto_floors[obj.id].id});
                  }
                  for (var d in  $scope.list_depto_floors[obj.id].deptos){
                    for (var item in $scope.rsCategoryDeptoData){
                      $scope.list_depto_floors[obj.id].deptos[d].categoryDepartament.push({'idCategoryDepartament':$scope.rsCategoryDeptoData[item].idCategoryDepartament, 'categoryDepartament':$scope.rsCategoryDeptoData[item].categoryDepartament});
                    }
                  }
                  // UNIDAD EN NUMEROS CORRELATIVOS EN EL EDIFICIO
                  if($scope.list_department_multi.unidad==2 && $scope.list_department_multi.correlacion==2){
                    departmentUnidad=0;                                               
                    for (var i=1; i<$scope.list_depto_floors.length; i++){
                      for (var d in  $scope.list_depto_floors[i].deptos){
                        if($scope.list_depto_floors[i].deptos[d].idCategoryDepartamentFk!="5" && $scope.list_depto_floors[i].deptos[d].idCategoryDepartamentFk!="6"){
                          departmentUnidad=departmentUnidad+1;
                          $scope.list_depto_floors[i].deptos[d].departament=departmentUnidad;
                        }
                      }
                    }   
                  }              
              }else{ //IF $scope.list_depto_floors[obj.nameFloor+1].deptos.length is bigger than 0
                if ($scope.list_department_multi.unidad==1 && $scope.list_department_multi.correlacion==1){
                  departmentUnidad='';               
                  $scope.poUnit=0;
                  for (var unit in $scope.list_depto_floors[obj.id].deptos){
                    if ($scope.list_depto_floors[obj.id].deptos[unit].idCategoryDepartamentFk=="5"){
                      $scope.poUnit=$scope.list_depto_floors[obj.id].deptos[unit].poNumber;
                    }else if ($scope.list_depto_floors[obj.id].deptos[unit].idCategoryDepartamentFk!="6"){
                      $scope.unitId=$scope.list_depto_floors[obj.id].deptos[unit].departament;
                    }
                  }
                  //var arrIndex = arrLetras.indexOf(obj.deptos[floorsLength-1].departament);
                  if(argCategoryDepartament=="5"){
                        $scope.list_depto_floors[obj.id].deptos.push({'idDepto':(floorsLength+1), 'unitNumber':'', 'floor':obj.nameFloor, 'poNumber':($scope.poUnit+1), 'departament':'PO-'+($scope.poUnit+1), 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':obj.deptos[floorsLength-1].categoryDepartament,'idFloor':$scope.list_depto_floors[obj.id].id});
                  }else if(argCategoryDepartament=="6"){
                        $scope.list_depto_floors[obj.id].deptos.push({'idDepto':(floorsLength+1), 'unitNumber':'', 'floor':obj.nameFloor, 'departament':deptoUnit, 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':obj.deptos[floorsLength-1].categoryDepartament,'idFloor':$scope.list_depto_floors[obj.id].id});
                  }else{
                    var indexArray=[],
                    arrIndex=0;
                    indexArray = arrLetras;
                    arrIndex   = indexArray.indexOf($scope.unitId);
                    departmentUnidad=arrLetras[arrIndex+1];
                    $scope.list_depto_floors[obj.id].deptos.push({'idDepto':(floorsLength+1), 'unitNumber':'', 'floor':obj.nameFloor, 'departament':departmentUnidad, 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':obj.deptos[floorsLength-1].categoryDepartament,'idFloor':$scope.list_depto_floors[obj.id].id});
                  }
                  //REORDEN DE LOS ID'S DE LAS UNIDADES DEL PISO
                  $scope.unitNumberId=0;
                  for (var uni in $scope.list_depto_floors[obj.id].deptos){
                    $scope.unitNumberId=($scope.unitNumberId+1);
                    $scope.list_depto_floors[obj.id].deptos[uni].idDepto=$scope.unitNumberId;
                  }                    
                  // UNIDAD EN NUMEROS CORRELATIVOS EN EL EDIFICIO
                }else if($scope.list_department_multi.unidad==2 && $scope.list_department_multi.correlacion==2){
                  departmentUnidad=0;
                  $scope.poUnit=0;
                  for (var unit in $scope.list_depto_floors[obj.id].deptos){
                    if ($scope.list_depto_floors[obj.id].deptos[unit].idCategoryDepartamentFk=="5"){
                      $scope.poUnit=$scope.list_depto_floors[obj.id].deptos[unit].poNumber;
                    }
                  }
                  if(argCategoryDepartament=="5"){
                        $scope.list_depto_floors[obj.id].deptos.push({'idDepto':(floorsLength+1), 'unitNumber':'', 'floor':obj.nameFloor, 'poNumber':($scope.poUnit+1), 'departament':'PO-'+($scope.poUnit+1), 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':obj.deptos[floorsLength-1].categoryDepartament,'idFloor':$scope.list_depto_floors[obj.id].id});
                  }else if(argCategoryDepartament=="6"){
                        $scope.list_depto_floors[obj.id].deptos.push({'idDepto':(floorsLength+1), 'unitNumber':'', 'floor':obj.nameFloor, 'departament':deptoUnit, 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':obj.deptos[floorsLength-1].categoryDepartament,'idFloor':$scope.list_depto_floors[obj.id].id});
                  }else{
                    $scope.list_depto_floors[obj.id].deptos.push({'idDepto':floorsLength-1+1, 'unitNumber':'', 'floor':obj.nameFloor, 'departament':'', 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':obj.deptos[floorsLength-1].categoryDepartament,'idFloor':$scope.list_depto_floors[obj.id].id});
                  }                    
                    //$scope.list_depto_floors[0].deptos.push({'idDepto':($scope.list_depto_floors[0].deptos.length+1), 'floor':$scope.list_depto_floors[0].nameFloor, 'departament':($scope.list_depto_floors[0].deptos.length+1), 'idCategoryDepartamentFk': '2', 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':obj.deptos[floorsLength-1].categoryDepartament});
                      for (var i=3; i<$scope.list_depto_floors.length; i++){
                        for (var d in  $scope.list_depto_floors[i].deptos){
                          if($scope.list_depto_floors[i].deptos[d].idCategoryDepartamentFk!="5" && $scope.list_depto_floors[i].deptos[d].idCategoryDepartamentFk!="6"){
                            departmentUnidad=departmentUnidad+1;
                            $scope.list_depto_floors[i].deptos[d].departament=departmentUnidad;
                          }
                        }
                      } 
                  //UNIDADES EN NUMEROS CORRELATIVAS POR PISO           
                }else if($scope.list_department_multi.unidad==2 && $scope.list_department_multi.correlacion==3) {
                  departmentUnidad=0;
                  $scope.poUnit=0;
                  for (var unit in $scope.list_depto_floors[obj.id].deptos){
                    if ($scope.list_depto_floors[obj.id].deptos[unit].idCategoryDepartamentFk=="5"){
                      $scope.poUnit=$scope.list_depto_floors[obj.id].deptos[unit].poNumber;
                    }else if ($scope.list_depto_floors[obj.id].deptos[unit].idCategoryDepartamentFk!="6"){
                      $scope.unitId=$scope.list_depto_floors[obj.id].deptos[unit].departament;
                    }
                  }
                  if(argCategoryDepartament=="5"){
                        $scope.list_depto_floors[obj.id].deptos.push({'idDepto':(floorsLength+1), 'unitNumber':'', 'floor':obj.nameFloor, 'poNumber':($scope.poUnit+1), 'departament':'PO-'+($scope.poUnit+1), 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':obj.deptos[floorsLength-1].categoryDepartament,'idFloor':$scope.list_depto_floors[obj.id].id});
                  }else if(argCategoryDepartament=="6"){
                        $scope.list_depto_floors[obj.id].deptos.push({'idDepto':(floorsLength+1), 'unitNumber':'', 'floor':obj.nameFloor, 'departament':deptoUnit, 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':obj.deptos[floorsLength-1].categoryDepartament,'idFloor':$scope.list_depto_floors[obj.id].id});
                  }else{
                    departmentUnidad=($scope.unitId+1);
                    $scope.list_depto_floors[obj.id].deptos.push({'idDepto':floorsLength+1, 'unitNumber':'', 'floor':obj.nameFloor, 'departament':departmentUnidad, 'idCategoryDepartamentFk': argCategoryDepartament, 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':obj.deptos[floorsLength-1].categoryDepartament,'idFloor':$scope.list_depto_floors[obj.id].id});
                  }
                  //REORDEN DE LOS ID'S DE LAS UNIDADES DEL PISO
                  $scope.unitNumberId=0;
                  for (var uni in $scope.list_depto_floors[obj.id].deptos){
                    $scope.unitNumberId=($scope.unitNumberId+1);
                    $scope.list_depto_floors[obj.id].deptos[uni].idDepto=$scope.unitNumberId;
                  }                    
                }else{
                    departmentUnidad=''
                }         
              }
              /* UNIDAD LETRAS & CORRELATIVAS POR PISO*/
            }else {
              var varCategoryDepartament="";
              var unitNumber="";
              console.log("argCategoryDepartament: "+argCategoryDepartament);
              console.log("deptoUnit: "+deptoUnit);
              varCategoryDepartament=argCategoryDepartament;
              unitNumber=deptoUnit;
                if ($scope.list_depto_floors[obj.id].deptos.length==0){
                   $scope.list_depto_floors[obj.id].deptos.push({'idDepto':($scope.list_depto_floors[obj.id].deptos.length+1), 'unitNumber':'', 'floor':$scope.list_depto_floors[obj.id].nameFloor, 'departament':unitNumber, 'idCategoryDepartamentFk': varCategoryDepartament, 'enabled':false, 'categoryDepartament':[], 'idFloor':$scope.list_depto_floors[obj.id].id});
                }else{
                  $scope.list_depto_floors[obj.id].deptos.push({'idDepto':(obj.deptos.length+1), 'floor':obj.nameFloor, 'unitNumber':'', 'departament':unitNumber, 'idCategoryDepartamentFk': varCategoryDepartament, 'enabled':obj.deptos[floorsLength-1].enabled, 'categoryDepartament':[], 'idFloor':$scope.list_depto_floors[obj.id].id});
                }        
            }     
            //console.info("Floor selected data:");
            //console.log(obj);
            //console.info("Deparments on the Floor selected:");
            //console.log(obj.deptos);
            //console.info("The last Depto Category Data:");
            //console.log(obj.deptos[floorsLength-1].categoryDepartament);
            //console.log("Department length: "+floorsLength);
            //ADD ONE DEPTO ON THE PB DEFAULT FLOOR
            //$scope.list_depto_floors[3].deptos.push({'idDepto':$scope.list_depto_floors[3].deptos.length+1, 'unitNumber':'', 'floor':$scope.list_depto_floors[3].nameFloor, 'departament':'pb'+($scope.list_depto_floors[3].deptos.length+1), 'idCategoryDepartamentFk': $scope.list_department_multi.idCategoryDepartamentFk, 'enabled':false, 'categoryDepartament':[], 'idFloor':$scope.list_depto_floors[3].id});
              //console.log($scope.rsCategoryDeptoData);
              //for (var item in $scope.rsCategoryDeptoData){
                //$scope.list_depto_floors[3].deptos[0].categoryDepartament.push({'idCategoryDepartament':$scope.rsCategoryDeptoData[item].idCategoryDepartament, 'categoryDepartament':$scope.rsCategoryDeptoData[item].categoryDepartament});
              //}
            console.log("-----------------------------------");
            console.log("Qty of Units before add ["+obj.nameFloor+"]: "+obj.deptos.length); 
            $scope.porteriaExist=$scope.checkIsPorteriaExistFn(obj);
          }
        /**************************************************
        *              DEL LAST DEPTO FUNCTION            *
        ***************************************************/
          $scope.deleteLastDeptoMultiFn = function(obj){

            //console.log(obj);
            var floorsLength  =  obj.deptos.length;
            var depto2Del     =  obj.deptos[floorsLength-1];
            console.log("======================");
            console.log("|  Remove Last Depto |")
            console.log("======================");
            console.log("floorId["+obj.id+"] => floor: "+obj.nameFloor);
            console.log("floorId["+obj.id+"] => floor["+obj.nameFloor+"] => depto: "+depto2Del.idDepto);
            if (obj.nameFloor=="co" || obj.nameFloor=="ba" || obj.nameFloor=="lo"){
              $scope.list_depto_floors[obj.id].deptos.splice(-1);
              console.log("Depto Successfully removed");
            }else{
              $scope.list_depto_floors[obj.id].deptos.splice(-1);
              /* UNIDAD EN NUMEROS CORRELATIVOS POR EDIFICIO*/
              if($scope.list_department_multi.unidad==2 && $scope.list_department_multi.correlacion==2) {
                departmentUnidad=0;                                               
                for (var i=3; i<$scope.list_depto_floors.length; i++){
                  for (var d in  $scope.list_depto_floors[i].deptos){
                    if($scope.list_depto_floors[i].deptos[d].idCategoryDepartamentFk!="5" && $scope.list_depto_floors[i].deptos[d].idCategoryDepartamentFk!="6"){
                      departmentUnidad=departmentUnidad+1;
                      $scope.list_depto_floors[i].deptos[d].departament=departmentUnidad;
                    }
                  }
                }               
              }
            }
             $("#btnDelDepto").tooltip('hide');
          }
        /**************************************************
        *            DEL SELECTED DEPTO FUNCTION          *
        ***************************************************/
          $scope.jsonMsg={'add':{},'delete':{}};
          $scope.deleteSelectedDeptoMultiFn = function(depto){
            console.log("=========================");
            console.log("| Remove selected Depto |")
            console.log("=========================");
            switch(depto.idCategoryDepartamentFk){
              case "1":
                $scope.jsonMsg.delete.unit="Departamento";
              break;
              case "2":
                $scope.jsonMsg.delete.unit="Cochera";
              break;
              case "3":
                $scope.jsonMsg.delete.unit="Baulera";
              break;
              case "4":
                $scope.jsonMsg.delete.unit="Local";
              break;
              case "5":
                $scope.jsonMsg.delete.unit="Porteria";
              break;
              case "6":
                $scope.jsonMsg.delete.unit="Departamento";
              break;
            }
            var floorUpper=depto.floor
            $scope.jsonMsg.delete.floor=floorUpper.toUpperCase();
            $scope.jsonMsg.delete.depto=depto.departament;
            $scope.jsonMsg.delete.msg="Eliminado del Piso:"+$scope.jsonMsg.delete.floor+", la unidad: "+$scope.jsonMsg.delete.unit+" - "+$scope.jsonMsg.delete.depto+".";
            console.log("floorId["+depto.idFloor+"] => floor["+depto.floor+"] => depto: "+depto.idDepto);
            objArr     = $scope.list_depto_floors[depto.idFloor].deptos;
            indexArray = objArr.map(function(o){return o.idDepto;});
            arrIndex   = indexArray.indexOf(depto.idDepto);
            if(depto.floor!="co" && depto.floor!="ba" && depto.floor!="lo"){
                departmentUnidad=0;
                $scope.list_depto_floors[depto.idFloor].deptos.splice(arrIndex, 1);
                /* UNIDAD LETRAS/NUMEROS CORRELATIVAS POR PISO*/
                /*if (($scope.list_department_multi.unidad==1 && $scope.list_department_multi.correlacion==1) || ($scope.list_department_multi.unidad==2 && $scope.list_department_multi.correlacion==3)){
                  for (var j=0; j<$scope.list_depto_floors[depto.idFloor].deptos.length;j++){
                    if($scope.list_department_multi.unidad==1 && $scope.list_department_multi.correlacion==1){
                      departmentUnidad='';
                      departmentUnidad=arrLetras[j];
                    }else if($scope.list_department_multi.unidad==2 && $scope.list_department_multi.correlacion==3){
                      departmentUnidad=departmentUnidad+1;
                    }

                    $scope.list_depto_floors[depto.idFloor].deptos[j].departament=departmentUnidad;
                  }*/   
                /* UNIDAD EN NUMEROS CORRELATIVOS POR EDIFICIO*/
              if($scope.list_department_multi.unidad==2 && $scope.list_department_multi.correlacion==2) {                                               
                  for (var i=3; i<$scope.list_depto_floors.length; i++){
                    for (var d in  $scope.list_depto_floors[i].deptos){
                      if($scope.list_depto_floors[i].deptos[d].idCategoryDepartamentFk!="5" && $scope.list_depto_floors[i].deptos[d].idCategoryDepartamentFk!="6"){
                        departmentUnidad=departmentUnidad+1;
                        $scope.list_depto_floors[i].deptos[d].departament=departmentUnidad;
                      }
                    }
                  }   
                
              }
            }else{
              $scope.list_depto_floors[depto.idFloor].deptos.splice(arrIndex, 1);
             // if (depto.floor=="pb"){
             //   departmentUnidad=0; 
             //   for (var d in  $scope.list_depto_floors[depto.idFloor].deptos){
             //     departmentUnidad=departmentUnidad+1;
             //     $scope.list_depto_floors[depto.idFloor].deptos[d].departament=departmentUnidad;
             //   }          
             //} 
            } 
            inform.add($scope.jsonMsg.delete.msg,{
                        ttl:6000, type: 'success'
            });
          }
        /**************************************************
        *            ASSIGN UNIT NUMBER FUNCTION          *
        ***************************************************/
          $scope.objFloor="";
          $scope.porteriaExist=false;
          $scope.objFloor=[];
          $scope.inputUnit="";
          $scope.inputUnit2="";
          var unitFound=false;
          var categoryDepartament="";
          var unitName="";
          $scope.assign2UnitFn = function(obj, opt, argDeptoCtgry, argBuildingUnit){
            console.log("$scope.inputUnit: "+$scope.inputUnit);
            unitFound=false;
            switch(opt){
              case "open":
                    $scope.objFloor=obj;
                    console.log($scope.objFloor);
                    var rsExistPort=$scope.checkIsPorteriaExistFn($scope.objFloor);
                if ($scope.objFloor.nameFloor=="co" || $scope.objFloor.nameFloor=="ba" || $scope.objFloor.nameFloor=="lo"){
                  $scope.isNotDeptoUnit=1;
                  $("#BuildingUnit").modal('toggle');
                }else{
                  $scope.isNotDeptoUnit=0;
                  //console.info("Porteria existe: "+rsExistPort);
                  if (rsExistPort){
                    $scope.porteriaExist=true;
                  }else{
                    $scope.porteriaExist=false;
                  }
                  $("#BuildingUnit").modal('toggle');
                }
              break;
              case "set":

                if($scope.isNotDeptoUnit==1){
                  if ($scope.objFloor.nameFloor=="co"){
                    unitName="La Cochera";
                    categoryDepartament="2"
                  }else if ($scope.objFloor.nameFloor=="ba"){
                    unitName="La Baulera";
                    categoryDepartament="3"
                  }else if ($scope.objFloor.nameFloor=="lo"){
                    unitName="El Local";
                    categoryDepartament="4"
                  }
                  if($scope.checkIsUnitExistFn($scope.objFloor, argBuildingUnit)){
                    unitFound=true;
                    inform.add(unitName+' Numero: '+argBuildingUnit+', Ya se encuentra asignada. ',{ttl:2000, type: 'warning'});
                  }
                }else if ($scope.isNotDeptoUnit==0 && argDeptoCtgry=="6"){
                      unitName="La unidad ";
                      categoryDepartament=argDeptoCtgry;
                  if ($scope.checkIsUnitExistFn($scope.objFloor, argBuildingUnit)){
                    unitFound=true;
                    inform.add(unitName+argBuildingUnit+', Ya se encuentra asignada. ',{ttl:2000, type: 'warning'});
                  }
                }else{
                    categoryDepartament=argDeptoCtgry;
                }
                if(!unitFound){
                  $scope.addOneDeptoMultiFn($scope.objFloor, categoryDepartament, argBuildingUnit);
                }
                $("#unit_number").val("");
                $("#unit_number").focus();
                $("#unit_number2").val("");
                $("#unit_number2").focus();

              break;
            }
          } 
          $scope.checkIsPorteriaExistFn = function(obj){
            for (var d in  obj.deptos){
                if (obj.deptos[d].idCategoryDepartamentFk=="5"){
                  var isPorteriaExist=true;
                  break;
                }else{
                  var isPorteriaExist=false;
                }
              }
              return isPorteriaExist;
          }
          $scope.checkIsUnitExistFn = function(obj, newUnit){
            for (var d in  obj.deptos){
                if (obj.deptos[d].departament==newUnit){
                  var isUnitExist=true;
                  break;
                }else{
                  var isUnitExist=false;
                }
              }
              return isUnitExist;
          }
        /**************************************************
        *          SET DEPARTMENT ARRAY FUNCTION          *
        ***************************************************/
          $scope.selectDeptoDataFn = function(){
            $scope.list_departments=[];
            for (var f in $scope.list_depto_floors){
              for (var d in  $scope.list_depto_floors[f].deptos){
                $scope.list_departments.push({'floor':$scope.list_depto_floors[f].deptos[d].floor, 'departament':$scope.list_depto_floors[f].deptos[d].departament, 'idCategoryDepartamentFk': $scope.list_depto_floors[f].deptos[d].idCategoryDepartamentFk, 'numberUNF':$scope.list_depto_floors[f].deptos[d].unitNumber});
              }
            }
            //$scope.dptoPaginationFn($scope.list_departments, 5);
            $scope.enabledNextBtn();
            //console.log($scope.list_departments);
          }
          $scope.closeBuildingUnitModal = function(){
            $("#BuildingUnit").modal('hide');
          }
          $scope.selectBuildingUnitFn = function(obj, opt, argBuildingUnit){
            if (opt=="open"){
              objFloor=obj;
              $("#BuildingUnit").modal('toggle');
            }else{
              $("#BuildingUnit").modal('hide');
              
            } 
          }
    /**************************************************
    *                                                 *
    *             OTHER FUNCTIONAL UNITS              *
    *                                                 *
    **************************************************/
      $scope.selectotherFNAddressId = {};
      $scope.otherFU = {'identificador':'','idTypeTaxFk':'','idProvinceFk':{}};
      $scope.list_ofu=[];
      $scope.otherFunctionalUnitsFn = function(opt, obj){
        switch(opt){
          case "openW":
            $("#otherFuntionalUnits").modal('toggle');
          break;
          case "add":
            $scope.otherFU = {'identificador':'','idTypeTaxFk':'','idProvinceFk':{}};
            $scope.addOtherFNFn(obj,"new");
          break;
          case "update":
            console.log(obj);
          break;
          case "remove":
            console.log(obj);
            $scope.removeOtherFNFn(obj);
          break;
        }
      }
      $scope.addOtherFNFn = function (obj, opt){
        //console.log(obj);
        //console.log("addDeptoSingleFn => $scope.list_depto.length: "+$scope.list_depto.length);
        if (opt=="new"){
          if ($scope.list_ofu.length<=0){
            //console.log("length is equal 0 or less 0");
            $scope.list_ofu.push({'identificador':obj.identificador, 'idTypeTaxFk':obj.idTypeTaxFk, 'idProvinceFk': obj.idProvinceFk.selected.idProvince});
          }else{
            for (var key in  $scope.list_ofu){
                 if ($scope.list_ofu[key].identificador==obj.identificador && $scope.list_ofu[key].idProvinceFk==obj.idProvinceFk.selected.idProvince){
                  var tmpIdentificador=obj.identificador;
                  var pIdentify= tmpIdentificador.toUpperCase();
                  inform.add("La Unidad funcional: ["+pIdentify+"] ya se encuentra cargada.",{
                    ttl:5000, type: 'warning'
                  });
                  $scope.isOfuExist=true;
                  break;
                }else{
                  $scope.isOfuExist=false;
                }
            }
            if(!$scope.isOfuExist){
                $scope.list_ofu.push({'identificador':obj.identificador, 'idTypeTaxFk':obj.idTypeTaxFk, 'idProvinceFk': obj.idProvinceFk.selected.idProvince});
            }
          }
        }else if (opt=="update"){
          if ($scope.list_ofu.length<=0){
            $scope.list_ofu.push({'identificador':obj.identificador, 'idTypeTaxFk':obj.idTypeTaxFk, 'idProvinceFk': obj.idProvinceFk.selected.idProvince});
          }else{
            for (var key in  $scope.list_ofu){
                if ($scope.list_ofu[key].identificador==obj.identificador && $scope.list_ofu[key].idProvinceFk==obj.idProvinceFk.selected.idProvince){
                  var tmpIdentificador=obj.identificador;
                  var pIdentify= tmpIdentificador.toUpperCase();
                  inform.add("La Unidad funcional: ["+pIdentify+"] ya se encuentra cargada.",{
                    ttl:5000, type: 'warning'
                  });
                  $scope.isOfuExist=true;
                  break;
                }else{
                  $scope.isOfuExist=false;
                }
            }
            if(!$scope.isOfuExist){
               $scope.list_ofu.push({'identificador':obj.identificador, 'idTypeTaxFk':obj.idTypeTaxFk, 'idProvinceFk': obj.idProvinceFk.selected.idProvince});
            }
          }      
        }
        //$scope.dptoPaginationFn($scope.list_ofu, 5);
        console.info($scope.list_ofu);
        $scope.otherFU = {'identificador':'','idTypeTaxFk':'','idProvinceFk':{}};
      }
      $scope.removeOtherFNFn = function (obj){
        //console.log(obj);
        for (var key in  $scope.list_ofu){
            if ($scope.list_ofu[key].identificador==obj.identificador && $scope.list_ofu[key].idProvinceFk==obj.idProvinceFk){
                $scope.list_ofu.splice(key,1);
            }
            //$scope.dptoPaginationFn($scope.list_ofu, 5);
        }    
      }   
    /**************************************************
    *                                                 *
    *               PAGINATION SERVICE                *
    *                                                 *
    **************************************************/
      $scope.vm = [{}];
      $scope.paginationServiceFn = function(arrObj, setPageSize){
          $scope.vm.listOfItems = arrObj;
          $scope.vm.pager = {};
          $scope.vm.setPage = setPage;
          $scope.vm.setPageSize=setPageSize;
          $scope.vm.setPage(1);

          function setPage(page) {
            if (page < 1 || page > $scope.vm.pager.totalPages) {
              return;
            }

            // get pager object from service
            $scope.vm.pager = PagerService.GetPager($scope.vm.listOfItems.length, page, $scope.vm.setPageSize);

            // get current page of items
            $scope.vm.items = $scope.vm.listOfItems.slice(
              $scope.vm.pager.startIndex,
              $scope.vm.pager.endIndex + 1
            );
          }
      }
    /**************************************************
    *                                                 *
    *            CUSTOMER PARTICULAR ADDRESS          *
    *                                                 *
    **************************************************/ 
      $scope.list_particular_address={};
      $scope.list_address_particular=[];
      $scope.isPCA=false;   
      $scope.newParticularAddressFn = function(){
        $scope.isPCA = true;
        $scope.customer.particular    = {'isBuilding':false,'typeInmueble':'', 'nameAddress':'', 'address':'', 'floor':'','clarification':'', 'depto':'', 'select':{}}
        $scope.customer.particular.select = {'address':{}, 'depto':{}, 'province':{'selected':undefined}, 'location':{'selected':undefined}}
        $("#customerParticularAddress").modal('toggle');
        $('#customerParticularAddress').on('shown.bs.modal', function () {
          $('#addrText').focus();
        });
      }
      $scope.addParticularAddressFn = function(opt, obj){
        $scope.isCpartAddrExist=false;
        console.log($scope.customer.particular);
        switch(obj.typeInmueble){
          case "1":
            var customerisBuilding=obj.isBuilding?1:0;
            var department  = customerisBuilding==0?obj.floor+"-"+obj.depto.toUpperCase():obj.select.depto.Depto;
            var idDepartment= customerisBuilding==0?null:obj.select.depto.idDepto;
            var nameAddress = customerisBuilding==0?obj.nameAddress:obj.select.address.selected.address;
            var idProvince  = customerisBuilding==0?obj.select.province.selected.idProvince:obj.select.address.selected.idProvinceFk;
            var idLocation  = customerisBuilding==0?obj.select.location.selected.idLocation:obj.select.address.selected.idLocationFk;
            var addrLatitud = customerisBuilding==0 && !$scope.gobApiAddressNotFound?obj.addressLat:null;
            var addrLongitud= customerisBuilding==0 && !$scope.gobApiAddressNotFound?obj.addressLon:null;
            addrLatitud     = customerisBuilding==0 && $scope.gobApiAddressNotFound?$scope.customer.particular.addressLat:obj.addressLat;
            addrLongitud    = customerisBuilding==0 && $scope.gobApiAddressNotFound?$scope.customer.particular.addressLon:obj.addressLon;
          break;
          case "2":
            var nameAddress = obj.nameAddress;
            var idProvince  = obj.select.province.selected.idProvince;
            var idLocation  = obj.select.location.selected.idLocation;
          break;
          case "3":
            var nameAddress = obj.nameAddress;
            var idProvince  = obj.select.province.selected.idProvince;
            var idLocation  = obj.select.location.selected.idLocation;
          break;
        }
        //{"address":"TEST", "depto":"depto", "isBuilding":1, "idProvinceFk":1, "idLocationFk":1, "clarification":"TEST"}
        if (opt=="new"){
          if ($scope.list_address_particular.length<=0){
            $scope.list_address_particular.push({"address":nameAddress, "idParticularDepartamentKf":idDepartment, "depto": department, "isBuilding":customerisBuilding, "idProvinceFk":idProvince, "idLocationFk":idLocation, "idTipoInmuebleFk":obj.typeInmueble, "clarification":obj.clarification, 'addressLat':addrLatitud,'addressLon':addrLongitud});
          }else{
            for (var key in  $scope.list_address_particular){
              if (obj.typeInmueble=="1"){
                $scope.validationRS=$scope.list_address_particular[key].idTipoInmuebleFk==obj.typeInmueble && $scope.list_address_particular[key].address==nameAddress && $scope.list_address_particular[key].depto==department?true:false;
              }else{
                $scope.validationRS=$scope.list_address_particular[key].idTipoInmuebleFk==obj.typeInmueble && $scope.list_address_particular[key].address==nameAddress?true:false;

              }
              if ($scope.validationRS){
                  //var typeInmueble=obj.typeInmueble;
                  //var pTypeInmueble= tmpDepartment.toUpperCase();
                  if (obj.typeInmueble=="1"){
                    inform.add("El Departamento: "+department+" en la direccion: "+nameAddress+" ya se encuentra registrado.",{
                    //inform.add("La direccion adicional: ("+nameAddress+") y el departamento ("+pIdentify+"), ya se encuentra registrado.",{
                      ttl:5000, type: 'warning'
                    });
                  }else if (obj.typeInmueble=="2"){
                    inform.add("La Casa en la direccion: "+nameAddress+" ya se encuentra registrada.",{
                    //inform.add("La direccion adicional: ("+nameAddress+") y el departamento ("+pIdentify+"), ya se encuentra registrado.",{
                      ttl:5000, type: 'warning'
                    });
                  }else{
                    inform.add("El Local en la direccion: "+nameAddress+" ya se encuentra registrado.",{
                    //inform.add("La direccion adicional: ("+nameAddress+") y el departamento ("+pIdentify+"), ya se encuentra registrado.",{
                      ttl:5000, type: 'warning'
                    });                    
                  }
                  $scope.isCpartAddrExist=true; /*Is Customer Particular Address exist */
                  break;
                }else{
                  $scope.isCpartAddrExist=false;
                }
            }
            if(!$scope.isCpartAddrExist){
                $scope.list_address_particular.push({"address":nameAddress, "idParticularDepartamentKf":idDepartment, "depto": department, "isBuilding":customerisBuilding, "idProvinceFk":idProvince, "idLocationFk":idLocation, "idTipoInmuebleFk":obj.typeInmueble, "clarification":obj.clarification, 'addressLat':addrLatitud,'addressLon':addrLongitud});
            }
          }
        }else if (opt=="update"){
          if ($scope.list_address_particular.length<=0){
            $scope.list_address_particular.push({"address":nameAddress, "idParticularDepartamentKf":idDepartment, "depto": department, "isBuilding":customerisBuilding, "idProvinceFk":idProvince, "idLocationFk":idLocation, "idTipoInmuebleFk":obj.typeInmueble, "clarification":obj.clarification, 'addressLat':addrLatitud,'addressLon':addrLongitud});
          }else{
            for (var key in  $scope.list_address_particular){
              if (obj.typeInmueble=="1"){
                $scope.validationRS=$scope.list_address_particular[key].idTipoInmuebleFk==obj.typeInmueble && $scope.list_address_particular[key].address==nameAddress && $scope.list_address_particular[key].depto==department?true:false;
              }else{
                $scope.validationRS=$scope.list_address_particular[key].idTipoInmuebleFk==obj.typeInmueble && $scope.list_address_particular[key].address==nameAddress?true:false;

              }
              if ($scope.validationRS){
                  //var typeInmueble=obj.typeInmueble;
                  //var pTypeInmueble= tmpDepartment.toUpperCase();
                  if (obj.typeInmueble=="1"){
                    inform.add("El Departamento: "+department+" en la direccion: "+nameAddress+" ya se encuentra registrado.",{
                    //inform.add("La direccion adicional: ("+nameAddress+") y el departamento ("+pIdentify+"), ya se encuentra registrado.",{
                      ttl:5000, type: 'warning'
                    });
                  }else if (obj.typeInmueble=="2"){
                    inform.add("La Casa en la direccion: "+nameAddress+" ya se encuentra registrada.",{
                    //inform.add("La direccion adicional: ("+nameAddress+") y el departamento ("+pIdentify+"), ya se encuentra registrado.",{
                      ttl:5000, type: 'warning'
                    });
                  }else{
                    inform.add("El Local en la direccion: "+nameAddress+" ya se encuentra registrado.",{
                    //inform.add("La direccion adicional: ("+nameAddress+") y el departamento ("+pIdentify+"), ya se encuentra registrado.",{
                      ttl:5000, type: 'warning'
                    });                    
                  }
                  $scope.isCpartAddrExist=true; /*Is Customer Particular Address exist */
                  break;
                }else{
                  $scope.isCpartAddrExist=false;
                }
            }
            if(!$scope.isCpartAddrExist){
                $scope.list_address_particular.push({"address":nameAddress, "idParticularDepartamentKf":idDepartment, "depto": department, "isBuilding":customerisBuilding, "idProvinceFk":idProvince, "idLocationFk":idLocation, "idTipoInmuebleFk":obj.typeInmueble, "clarification":obj.clarification, 'addressLat':addrLatitud,'addressLon':addrLongitud});
            }
          }              
        }
        if(!$scope.isCpartAddrExist){
          $("#customerParticularAddress").modal('hide');
        }
        console.log($scope.list_address_particular);
        $scope.enabledNextBtn();
      }
      $scope.removeParticularAddressFn = function (obj){
        console.log(obj);
          for (var key in  $scope.list_address_particular){
              if ($scope.list_address_particular[key].idTipoInmuebleFk==obj.idTipoInmuebleFk && $scope.list_address_particular[key].address==obj.address){
                    if (obj.idTipoInmuebleFk=="1"){
                    inform.add("El Departamento: "+obj.depto+" en la direccion: "+obj.address+" ha sido eliminado satisfactoriamente.",{
                      ttl:5000, type: 'success'
                    });
                  }else if (obj.idTipoInmuebleFk=="2"){
                    inform.add("La Casa en la direccion: "+obj.address+" ha sido eliminado satisfactoriamente.",{
                      ttl:5000, type: 'success'
                    });
                  }else{
                    inform.add("El Local en la direccion: "+obj.address+" ha sido eliminado satisfactoriamente.",{
                      ttl:5000, type: 'success'
                    });                    
                  } 
                  $scope.list_address_particular.splice(key,1);                  
              }
          } 
        $scope.enabledNextBtn();  
      }                
    /*************************************************/  
    /**************************************************
    *                                                 *
    *       GET CATEGORY TYPES OF BUILDING UNITS      *
    *                                                 *
    **************************************************/
      $scope.rsCategoryDeptoData = {};
      $scope.getCategoryDepartamentFn = function(){
        UtilitiesServices.categoryDepartament().then(function(data){
            $scope.rsCategoryDeptoData = data;
            //console.log($scope.rsProfileData);
        });
      };
      $scope.customerTypeCustomer = function(){
        $scope.customer.new.typeInmueble='';
        $scope.enabledNextBtn();
        console.info($scope.customer.new.idClientTypeFk);
        if ($scope.customer.new.idClientTypeFk==undefined){
          inform.add("Selecciona un tipo de cliente para continuar.",{
              ttl:5000, type: 'warning'
            });              
          $("#idProfileKf").focus();
        }else{
          $("#tipo_inmueble").focus();
          $("#schedule_info").fadeIn("slow");
          $timeout(function() {
                    $("#schedule_info").fadeOut("slow");
          }, 30000);          
        }
        
      }
      $scope.customerTypeInmueble = function(){
        $scope.customer.new.isNotCliente=false;
        $scope.enabledNextBtn();
        //$("#tipo_inmueble").focus();
        //$("#customer_address").focus();

      }
    /********************************************************************************************************************************************
    *                                                                                                                                           *
    *                                                                                                                                           *
    *                                           F U N C I O N E S    D E   A D M I N I S T R A C I O N                                          *
    *                                                                                                                                           *
    *                                                                                                                                           *
    ********************************************************************************************************************************************/

    $scope.sysConfig = function(val1, val2, fnAction){
      $scope.sysReg={};
      $scope.companyFound=false;
      $scope.filterCompanyKf.selected           = undefined;
      $scope.filterAddressKf.selected           = undefined;
      switch (val1){
        /*CUSTOMER USERS*/
        case "customers":
          $scope.getUserLists();   /* New Function using angular Services: userServices.userLists*/
          switch (val2){
              case "user":
                $scope.getAllAddress();
                switch (fnAction){
                  case "dash":
                    $scope.sysContent = "";
                    $scope.loadPagination($scope.rsList.clientUser, "idUser", "7");
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
                    $scope.loadPagination($scope.rsList.tenants, "idUser", "7");
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
                    $scope.loadPagination($scope.rsList.attendants, "idUser", "7");
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
                    $scope.loadPagination($scope.listCompany, "idCompany", "7");
                    $scope.sysContent = 'company';
                  break;
                  default:
                }
              break;
              case "clients":
                $scope.getCustomerListFn("",1);
                switch (fnAction){
                  case "new":                                       
                    $('#RegisterModalCustomer').modal('toggle');
                  break;
                  case "dash":
                    $scope.loadPagination($scope.rsCustomerListData, "idClient", "7");
                    //console.log($scope.rsCustomerListData);
                  break;                
                  default:
                }
              break;
          }
        break;
        /*CUSTOMER USERS*/
        /*SYSTEM USERS*/
        case "sys":
          switch (val2){
            case "dash":
              switch (fnAction){
                  case "open":
                    $scope.getSysData();
                    $scope.getParameter();
                    $scope.loadParameter(1, 11,'sysParam');
                    $scope.sysContent = 'dashboard';
                  break;
              }
            break;
            case "sysProfile":
                switch (fnAction){
                  case "dash":
                    $scope.sysContent = "";
                    $scope.loadPagination($scope.rsProfileData, "idProfiles", "10");
                    $scope.sysContent = 'sysProfile';
                  break;
                  case "newProfile":
                    $scope.sysProfile.Name="";
                    $scope.checkBoxes.modulo=false;
                    $('#newSysProfile').modal('show');
                  break;
                  case "updProfile2":
                    $scope.sysUpProfile.Name="";
                    $scope.filterSysProfile=null;
                    $scope.sysProfFound=false;
                    $('#updateSysProfile2').modal('show');
                  break;
                  default:
                }
            break;
            case "sysUsers":
                switch (fnAction){
                  case "dash":
                    $scope.sysContent = "";
                    console.log("sysUsers");
                    $scope.loadPagination($scope.rsList.sysUser, "idUser", "7");
                    $scope.sysContent = 'sysUsers';
                  break;
                  case "newSysUser":
                    $('#newSysUser').modal('show');
                  break;
                  case "updProfile2":
                    $scope.sysUpProfile.Name="";
                    $scope.filterSysProfile=null;
                    $scope.sysProfFound=false;
                    $('#updateSysProfile2').modal('show');
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
            case "products":
                switch (fnAction){
                  case "listProducts":
                    $scope.sysContent = "";
                    $scope.loadPagination($scope.rsProductsData, "idProduct", "7");
                    $scope.sysContent = 'products';
                  break;
                  case "newProduct":
                    $scope.newProduct={product:{}};
                      $scope.list_id_divice=[];
                      $scope.list_divices=[];
                      $scope.isDeviceExist=null;
                    $('#newProduct').modal('show');
                  break;
                  default:
                }
            break;
            default:
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
    *               LIST SYS PROFILE                  *
    *                                                 *
    **************************************************/
      $scope.rsProfileData = {};
      $scope.getSysProfilesFn = function(search){
        ProfileServices.listProfiles(search).then(function(data){
            $scope.rsProfileData = data;
            $scope.loadPagination($scope.rsProfileData, "idProfiles", "7");
            //console.log($scope.rsProfileData);
        });
      };
    /**************************************************
    *                                                 *
    *                 LIST PRODUCTS                   *
    *                                                 *
    **************************************************/
      $scope.rsProductsData = {};
      $scope.getProductsFn = function(search, opt){
        ProductsServices.listProducts(search).then(function(data){
            $scope.rsProductsData = data;
            if(opt==1){$scope.loadPagination($scope.rsProductsData, "idProduct", "10");}
            //console.log($scope.rsProfileData);
        });
      };

    /**************************************************
    *                                                 *
    *           CLASSIFICATION PRODUCTS               *
    *                                                 *
    **************************************************/
      $scope.rsClasProductsData = {};
      $scope.getProductClassificationFn = function(){
        ProductsServices.getProductClassification().then(function(data){
            $scope.rsClasProductsData = data;
            //$scope.loadPagination($scope.rsClasProductsData, "idProductClassification");
            //console.log($scope.rsClasProductsData);
        });
      };

    /**************************************************
    *                                                 *
    *             OPEN DEVICES PRODUCTS               *
    *                                                 *
    **************************************************/
      $scope.rsOpenDeviceProductsData = {};
      $scope.getDiviceOpening = function(){
        ProductsServices.getDiviceOpening().then(function(data){
            $scope.rsOpenDeviceProductsData = data;
            //$scope.loadPagination($scope.rsOpenDeviceProductsData, "idProductClassification");
            //console.log($scope.rsOpenDeviceProductsData);
        });
      };
      $scope.list_id_divice=[];
      $scope.list_divices=[];
      $scope.isDeviceExist=null;
      $scope.addDeviceOpeningFn = function (obj){
        if ($scope.list_divices.length<=0){
          //console.log("length is equal 0 or less 0");
          $scope.list_id_divice.push({'idDiviceOpeningFk':obj.idDiviceOpening});
          $scope.list_divices.push({'idDiviceOpeningFk':obj.idDiviceOpening, 'diviceOpening':obj.diviceOpening});

        }else{
          for (var key in  $scope.list_id_divice){
           // console.log(key);
            //console.log("Validando: "+$scope.list_id_divice[key].idDiviceOpeningFk+" == "+obj.idDiviceOpening);
              if ( $scope.list_id_divice[key].idDiviceOpeningFk==obj.idDiviceOpening){
                inform.add("El Dispositivo "+obj.diviceOpening+" Ya se encuentra agregado.",{
                  ttl:5000, type: 'success'
                });
                $scope.isDeviceExist=true;
                break;
                //console.log($scope.isDeviceExist);
              }else{
                $scope.isDeviceExist=false;
                //console.log($scope.isDeviceExist);
              }
          }
            if(!$scope.isDeviceExist){
                //console.log("ADD_NO_EXIST");
                $scope.list_id_divice.push({'idDiviceOpeningFk':obj.idDiviceOpening});
                $scope.list_divices.push({'idDiviceOpeningFk':obj.idDiviceOpening, 'diviceOpening':obj.diviceOpening});
            }
        }
        console.log("OBJ A ADICIONAR:");
        console.log(obj);
        console.log("list_id_divice:");
        console.log($scope.list_id_divice);
        console.log("list_divices:");
        console.log($scope.list_divices);
      }
      $scope.removeDeviceOpeningFn = function (obj){
        for (var key in  $scope.list_id_divice){
            if ( $scope.list_id_divice[key].idDiviceOpeningFk==obj.idDiviceOpeningFk){
                $scope.list_divices.splice(key,1);
                $scope.list_id_divice.splice(key,1);
            }
        }
        console.log("OBJ A ELIMINAR:");
        console.log(obj);
        console.log("list_id_divice:");
        console.log($scope.list_id_divice);
        console.log("list_divices:");
        console.log($scope.list_divices);
      }
      $scope.removeAllDevices = function(){
        for (var key in  $scope.list_divices){
          $scope.list_divices.splice(key,1);
          $scope.list_id_divice.splice(key,1);
        }
      }
    /**************************************************
    *                                                 *
    *                 NEW PRODUCT                     *
    *                                                 *
    **************************************************/
      $scope.newProduct={product:{}};
      $scope.addNewProductFn = function(){
        $scope.newProduct.product.list_id_divice       = $scope.newProduct.product.idProductClassificationFk==3?$scope.list_id_divice:null;
        $scope.newProduct.product.isNumberSerieFabric  = $scope.newProduct.product.isNumberSerieFabric==undefined?false:$scope.newProduct.product.isNumberSerieFabric;
        $scope.newProduct.product.isNumberSerieInternal= $scope.newProduct.product.isNumberSerieInternal==undefined?false:$scope.newProduct.product.isNumberSerieInternal
        $scope.newProduct.product.isDateExpiration     = $scope.newProduct.product.isDateExpiration==undefined?false:$scope.newProduct.product.isDateExpiration;
        $scope.newProduct.product.isControlSchedule    = $scope.newProduct.product.idProductClassificationFk==1?$scope.newProduct.product.isControlSchedule:null;
        console.log($scope.newProduct);
        ProductsServices.newProduct($scope.newProduct).then(function(data){
            $scope.rsNewProductData = data;
            $('#newProduct').modal('hide');
              if ($scope.rsNewProductData.status==200){
                inform.add("Producto Cargado Satisfactoriamente.",{
                  ttl:5000, type: 'success'
                });
              }
              $scope.getProductsFn("", 1);
        });
      }
    /**************************************************
    *                                                 *
    *                 UPDATE PRODUCT                  *
    *                                                 *
    **************************************************/
      $scope.selectProductDataFn=function(obj){
        $scope.list_id_divice = [];
        $scope.list_divices   = [];
        $scope.updateProduct.product.idProduct                 = obj.idProduct;
        $scope.updateProduct.product.descriptionProduct        = obj.descriptionProduct;
        $scope.updateProduct.product.codigoFabric              = obj.codigoFabric;
        $scope.updateProduct.product.brand                     = obj.brand;
        $scope.updateProduct.product.model                     = obj.model;
        $scope.updateProduct.product.priceFabric               = obj.priceFabric;
        $scope.updateProduct.product.isNumberSerieFabric       = obj.isNumberSerieFabric==1?true:false;
        $scope.updateProduct.product.isNumberSerieInternal     = obj.isNumberSerieInternal==1?true:false;
        $scope.updateProduct.product.isDateExpiration          = obj.isDateExpiration==1?true:false;
        $scope.updateProduct.product.isControlSchedule         = obj.isControlSchedule==1?true:false;
        $scope.updateProduct.product.idProductClassificationFk = obj.idProductClassificationFk;
        $scope.update_ProductTemp_diviceOpening                = obj.diviceOpening;
        
        //console.log(obj.diviceOpening);
        if (obj.diviceOpening.length>0){
          for (var key in  obj.diviceOpening){
            //console.log(obj.diviceOpening[key]);
            $scope.list_id_divice.push({'idDiviceOpeningFk':obj.diviceOpening[key].idDiviceOpening});
            $scope.list_divices.push({'idDiviceOpeningFk':obj.diviceOpening[key].idDiviceOpening, 'diviceOpening':obj.diviceOpening[key].diviceOpening});
          }
        }else{
          //console.log("obj.diviceOpening is empty");
        }
        $('#updateProduct').modal('show');
        //console.log(obj);
      }
      $scope.updateProduct={product:{}};
      $scope.updateProductFn = function(){
        $scope.updateProduct.product.list_id_divice       = $scope.updateProduct.product.idProductClassificationFk==3?$scope.list_id_divice:null;
        $scope.updateProduct.product.isNumberSerieFabric  = $scope.updateProduct.product.isNumberSerieFabric==undefined?false:$scope.updateProduct.product.isNumberSerieFabric;
        $scope.updateProduct.product.isNumberSerieInternal= $scope.updateProduct.product.isNumberSerieInternal==undefined?false:$scope.updateProduct.product.isNumberSerieInternal
        $scope.updateProduct.product.isDateExpiration     = $scope.updateProduct.product.isDateExpiration==undefined?false:$scope.updateProduct.product.isDateExpiration;
        $scope.updateProduct.product.isControlSchedule    = $scope.updateProduct.product.idProductClassificationFk==1?$scope.updateProduct.product.isControlSchedule:false;

        //console.log($scope.updateProduct);
        ProductsServices.updateProduct($scope.updateProduct).then(function(data){
            $scope.rsupdateProductData = data;
            $('#updateProduct').modal('hide');
              if ($scope.rsupdateProductData.status==200){
                inform.add("Producto Actualizado Satisfactoriamente.",{
                  ttl:5000, type: 'success'
                });
              }
              $scope.getProductsFn("",1);
        });
      }
      /**************************************************
    *                                                 *
    *                DELETE PRODUCT                   *
    *                                                 *
    **************************************************/
      $scope.deleteProductFn = function(idProduct){
        ProductsServices.deleteProduct(idProduct).then(function(data){
          $scope.rsDelProductData=data;
          console.log("STATUS: "+$scope.rsDelProductData.status);
          console.log("MSG   : "+$scope.rsDelProductData.statusText);
          console.log("DATA  : "+$scope.rsDelProductData.data);
          if ($scope.rsDelProductData.status==200){
            $scope.getProductsFn("",1);
            inform.add("Producto Eliminado satisfactoriamente",{
              ttl:5000, type: 'success'
            });
            
          }
          //console.log($scope.rsModulesData); 
        });
      }

    /**************************************************
    *                                                 *
    *                GET SYS MODULES                  *
    *                                                 *
    **************************************************/
      $scope.rsModulesData = {};
      $scope.getSysModulesFn = function(){
        $scope.rsModulesData = {};
        ProfileServices.getSysModules().then(function(data){
            $scope.rsModulesData = data;
            //console.log($scope.rsModulesData);
        });
      };
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
    *                NEW SYS PROFILE                  *
    *                                                 *
    **************************************************/
      $scope.checkBoxes={modulo: {}};
      $scope.sysProfile={Name:''};
      var newProfile={profile:{name:'', list_id_modules:[{}]}};
      var listOfModules=[];
      $scope.newSysProfileFn = function(){
        console.clear();
        i=0;
        listOfModules=[];
        var chkbModules = $scope.checkBoxes.modulo;
        var firArrItem=Object.keys(chkbModules).length==1?Object.keys(chkbModules)[0]:null;
        if ((Object.keys(chkbModules).length>1) || (Object.keys(chkbModules).length==1 && chkbModules[firArrItem]!=false)){
          for (var key in chkbModules){
            if (chkbModules[key]==true){
              listOfModules.push({'idModuleFk':key});
            }
          }
          if (listOfModules.length>0){
            newProfile.profile.name=$scope.sysProfile.Name;
            newProfile.profile.list_id_modules=listOfModules;
            //console.log("Sending data to the API...");
            ProfileServices.newSysProfile(newProfile).then(function(data){
              var rsNewProfileData = data;
              //console.log("STATUS: "+rsNewProfileData.status);
              //console.log("MSG   : "+rsNewProfileData.statusText);
              //console.log("DATA  : "+rsNewProfileData.data.response);
              //console.log($scope.rsModulesData);
              $('#newSysProfile').modal('hide');
              if (rsNewProfileData.status==200){
                inform.add("Perfil creado satisfactoriamente",{
                  ttl:5000, type: 'success'
                });
              }
              $scope.getSysProfilesFn("");
            });
            //console.log(newProfile);
          }else{
            inform.add('Selecciona un modulo como minimo para crear el perfil',{
              ttl:5000, type: 'warning'
            });
          }
          
        }else{
            inform.add('Selecciona un modulo como minimo para crear el perfil',{
              ttl:5000, type: 'warning'
            });
        }   
      }
    /**************************************************
    *                                                 *
    *               UPDATE SYS PROFILE                *
    *                                                 *
    **************************************************/
      $scope.chkBox={modulo: {}};
      $scope.sysUpProfile={Name:''};
      var updProfile={profile:{idProfiles:'', name:'', list_id_modules:[{}]}};
      $scope.tmpSysModules = [];
      $scope.selectProfileDataFn=function(obj){
        console.clear();
        $scope.tmpSysModules=obj;
        console.log($scope.tmpSysModules);
        var chkbModules = $scope.chkBox.modulo;
        console.log($scope.chkBox.modulo);
        /*PUT ALL THE CHECKBOXES TO FALSE OR UNCHECKED STATE */
        for (var key in chkbModules){
            if (chkbModules[key]==true){
              $scope.chkBox.modulo[key]=false;
            }
        }
        $scope.sysUpProfile.Name=$scope.tmpSysModules.name;  
        $('#updateSysProfile').modal('show');
        console.log($scope.tmpSysModules.modules);
        //console.log($scope.tmpSysModules.length);
        $scope.chkBox.modulo.row
        for (var i = 0; i < $scope.tmpSysModules.modules.length; i++) {
          $scope.chkBox.modulo[$scope.tmpSysModules.modules[i].idModule]=true;
        }
        //console.log($scope.checkBoxes);
      }
      $scope.data2UpdateSysProfileFn=function(){
        console.clear();
        i=0;
        var listOfModules=[];
        var chkbModules = $scope.chkBox.modulo;
        var firArrItem=Object.keys(chkbModules).length==1?Object.keys(chkbModules)[0]:null;
        if ((Object.keys(chkbModules).length>1) || (Object.keys(chkbModules).length==1 && chkbModules[firArrItem]!=false)){
          for (var key in chkbModules){
            if (chkbModules[key]==true){
              listOfModules.push({'idModuleFk':key});
            }
          }
          if (listOfModules.length>0){
            updProfile.profile.idProfiles=$scope.tmpSysModules.idProfiles;
            updProfile.profile.name=$scope.sysUpProfile.Name;
            updProfile.profile.list_id_modules=listOfModules;
            console.log("Sending data to the API...");
            $scope.updateSysProfileFn(updProfile,1);
            //console.log(updProfile);
          }else{
            inform.add('Selecciona un modulo como minimo para crear el perfil',{
              ttl:5000, type: 'warning'
            });
          }
          
        }else{
            inform.add('Selecciona un modulo como minimo para crear el perfil',{
              ttl:5000, type: 'warning'
            });
        } 
      }
      $scope.chkBox2={modulo: {}};
      $scope.sysProfFound=false;
      $scope.sysFindFn=function(string){
        var output=[{idProfiles:'', nameProf: ''}];
        var i=0;
        if (string!=undefined && string!=""){
          angular.forEach($scope.rsProfileData,function(sysProfile){
            var sysIdProfile=sysProfile.name;
            if(sysIdProfile.toLowerCase().indexOf(string.toLowerCase())>=0){
              output.push({sysProfile});
            }
          });
        }else{
              $scope.filterSysProfile=null;
              $scope.sysProfFound=false;
        }
        $scope.filterSysProfile=output;
        console.info($scope.filterSysProfile);
      }
      $scope.fillTextbox=function(item){
        $scope.tmpSysModules=item;
        $scope.sysUpProfile.Name=item.name;
        var chkbModules = $scope.chkBox2.modulo;
        /*PUT ALL THE CHECKBOXES TO FALSE OR UNCHECKED STATE */
        for (var key in chkbModules){
            if (chkbModules[key]==true){
              $scope.chkBox2.modulo[key]=false;
            }
        }
        console.log(item);
        for (var i = 0; i < item.modules.length; i++) {
          $scope.chkBox2.modulo[item.modules[i].idModule]=true;
        }
        $scope.filterSysProfile=null;
        $scope.sysProfFound=true;
      }
      $scope.data2UpdateSysProfile2Fn=function(item){
        console.clear();
        i=0;
        var listOfModules=[];
        var chkbModules = $scope.chkBox2.modulo;
        var firArrItem=Object.keys(chkbModules).length==1?Object.keys(chkbModules)[0]:null;
        if ((Object.keys(chkbModules).length>1) || (Object.keys(chkbModules).length==1 && chkbModules[firArrItem]!=false)){
          for (var key in chkbModules){
            if (chkbModules[key]==true){
              listOfModules.push({'idModuleFk':key});
            }
          }
          if (listOfModules.length>0){
            updProfile.profile.idProfiles=$scope.tmpSysModules.idProfiles;
            updProfile.profile.name=$scope.sysUpProfile.Name;
            updProfile.profile.list_id_modules=listOfModules;
            console.log("Sending data to the API...");
            $scope.updateSysProfileFn(updProfile,2);
          }else{
            inform.add('Selecciona un modulo como minimo para crear el perfil',{
              ttl:5000, type: 'warning'
            });
          }
          
        }else{
            inform.add('Selecciona un modulo como minimo para crear el perfil',{
              ttl:5000, type: 'warning'
            });
        } 
      }
      $scope.rsUpdProfileData={};
      $scope.updateSysProfileFn = function(dataProfile, opt){
        ProfileServices.updateSysProfile(dataProfile).then(function(data){
          $scope.rsUpdProfileData=data;
          console.log("STATUS: "+$scope.rsUpdProfileData.status);
          console.log("MSG   : "+$scope.rsUpdProfileData.statusText);
          console.log("DATA  : "+$scope.rsUpdProfileData.data);
          switch(opt){
            case 1:
              if ($scope.rsUpdProfileData.status==200){
                $scope.getSysProfilesFn("");
                $scope.tmpSysModules={};
                $('#updateSysProfile').modal('hide');
                inform.add("Perfil Actualizado satisfactoriamente",{
                  ttl:5000, type: 'success'
                });
                
              }
            break;
            case 2:
            if ($scope.rsUpdProfileData.status==200){
                inform.add("Perfil Actualizado satisfactoriamente",{
                  ttl:5000, type: 'success'
                });
                $scope.getSysProfilesFn("");
                $scope.filterSysProfile=null;
                $scope.sysProfFound=false;
                $scope.sysUpProfile.Name="";
                $scope.tmpSysModules={};
                $("#sysIdProfileKf").focus();
              }
            break;
          }
          //console.log($scope.rsModulesData); 
        });
      }
      $scope.deleteSysProfileFn = function(idProfile){
        ProfileServices.deleteSysProfile(idProfile).then(function(data){
          $scope.rsDelProfileData=data;
          console.log("STATUS: "+$scope.rsDelProfileData.status);
          console.log("MSG   : "+$scope.rsDelProfileData.statusText);
          console.log("DATA  : "+$scope.rsDelProfileData.data);
          if ($scope.rsDelProfileData.status==200){
            $scope.getSysProfilesFn("");
            inform.add("Perfil Eliminado satisfactoriamente",{
              ttl:5000, type: 'success'
            });
            
          }
          //console.log($scope.rsModulesData); 
        });
      }

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
          $scope.selectCustomerAdministrationId = {};
          $scope.filterCompanyKf            = {};
          $scope.selectIdAddressKf          = {};
          $scope.selectCustomerAddressId    = {};
          $scope.selectCustomerLocationId   = {};
          $scope.selectnameProvinceBillingFk= {};
          $scope.selectnameLocationBillingFk= {};
          $scope.sysRegIdAddressKf          = {};
          $scope.selectIdCompanyKf          = {};
          $scope.authUser                   = {};
          $scope.select                     = {};
          $scope.locationsId                = {};
          $scope.statesId                   = {};
          $scope.filterCustomerIdFk         = {};
          $scope.list_particular_address    = {};
          $scope.dptoNotFound               = true;
          $scope.companyFound               = false;
          $scope.recordsFound               = false;
          $scope.rusysconfig                = false;
          $scope.ruclient                   = false;
          $scope.noRecordsFound             = false;
          $scope.formValidated              = false;
          $scope.isEditTenantByAdmin        = false;
          $scope.lostPaswd                  = false;
          $scope.tenantNotFound             = false;
          $scope.isEditTenant               = false;
          $scope.showCount                  = false;
          $scope.stepIndexTmp               = 0;
          $scope.removeOwnerDepto           = 0;
          $scope.manageTenantUser           = 0;
          $scope.listTenant                 = "";
          $scope.filterMTenant              = "";
          $scope.idDepartmentKf             = "";
          $scope.select.idCompanyKf         = "";
          $scope.select.idAddressAtt        = "";
          $scope.select.idDepartmentKf      = "";
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
          $scope.idDeptoKf                  = "";
          $scope.IsSystem                   = false;
          $scope.isMonitorActive            = false;
          $scope.disabledSelect             = false;
          $scope.isAttUpdated               = false;
          $scope.changeSmtp                 = false;
          $scope.isCollapsed                = true;
          $scope.showInputs                 = false;
          $scope.typeOption                 = 0;
          $scope.emailFound                 = false;
          $scope.idOpcionLowTicketKf        = 0;
          $scope.sendNotify                 = "";
          $scope.companykeychains           = {};
          $scope.sysRegidCompanyKf          = {};
          $scope.sysReg                     = {};
          $scope.sys                        = {email: ''};
          $scope.third                      = {names:'', movilPhone:'', dni:''};
          $scope.sysParam                   = {idParam: '', value:'', msg: ''};
          $scope.o                          = {idTypeOutherKf: '', email: '', detail: ''};
          $scope.other                      = {idAttendant:'', fullNamesAtt: '', idAddressAtt:'', idTypeAttKf: '',emailAtt:'', phonelocalAtt: '',phoneMovilAtt: '', hoursWork:'', idDepartmentKf: '', descOther:'' };
          $scope.att                        = {idAttendant:'', fullNamesAtt: '', idAddressAtt:'', idTypeAttKf: '',emailAtt:'', phonelocalAtt: '',phoneMovilAtt: '', hoursWork:'', idDepartmentKf: '', descOther:'' };
          $scope.t                          = {idTenant:'', fullNameTenant:'', idTypeKf:'', phoneNumberTenant:'', phoneNumberContactTenant:'', idDepartmentKf: '', emailTenant:''};
          $scope.tk                         = {};
          $scope.dh                         = {filterSearch:'',filterTop:'',filterProfile:'',filterTenantKf: '',filterCompany: '',filterTypeTicket:'',filterAddress:'',filterStatus:'',filterOwnerKf:'',filterIdUser:''};
          $scope.key                        = {};
          $scope.dataK                      = {keys:[]}; 
          $scope.kItems                     = {keys:[]}; 
          $scope.sysCheckResult             = false;
          $scope.searchMyDeptos             = false;
          $scope.newDeparment               = false;
          $scope.editComment                = false;
          $scope.customerIdAddressKf        = "";
          /******Config Var*******/
          $scope.contentUser                = false;
          $scope.sysContent                 = "";
          $scope.msgTimer                   = false;
          $scope.mailFromKey                = false;
          $scope.mailServiceTecnic          = false;
          $scope.mailCollection             = false;

          $scope.allowAction                ={'edit':{}, 'delete':{}}
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
        $scope.rucustomer   = false;
        $scope.ruproduct    = false;
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
                  if($scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)){
                    $scope.refresSession($scope.sessionMail);
                    $scope.getAllAddressByIdTenant();
                    selectSwitch ('t');
                  }else if ($scope.sessionidProfile==5 ||($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){ 
                    selectSwitch ('i');
                    $scope.refresSession($scope.sessionMail);
                    $scope.getAllAddressByIdTenant();
                  }else{
                    $scope.rukeyup = true; selectSwitch ('t');
                  }
                    
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
                if($scope.sessionidProfile!=1) {$scope.CompanyName=$scope.sessionNameCompany;}
                if($scope.sessionidProfile==4) {$scope.officeListByCompnayID($scope.sessionidCompany);}
                if ($scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)){
                    $scope.getAllAddressByIdTenant();
                  }else if ($scope.sessionidProfile==5 ||($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){ 
                    $scope.refresSession($scope.sessionMail);
                    $scope.getAllAddressByIdTenant();
                  }else{$scope.ruother = true;}
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
                $scope.isMonitorActive = $scope.sysModules.idMonitor?true:false;
              if(divAction=="open"){
                if($scope.sessionidProfile!=1) {$scope.CompanyName=$scope.sessionNameCompany;};
                if ($scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)){
                  $scope.getAllAddressByIdTenant();
                }
                if ($scope.sessionidProfile==3 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1)){
                  $scope.getAllAddressByIdTenant();
                }else{
                  $scope.home = true;
                }
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
                $scope.sysConfig('sys','dash', 'open');
                $scope.rusysconfig = true;
                $scope.getSysProfilesFn("");
                $scope.getProductClassificationFn();
                $scope.getDiviceOpening();
                $scope.getProductsFn("",0);
                $scope.getSysModulesFn();
              }else{
                closeAllDiv();
                $scope.rusysconfig = false;
              }
              
            break;
            case "products":
                $('#m_product').addClass('active');
                closeAllDiv();
                cleanForms();
                $scope.sysContent = "";
                $scope.IsProduct=true;
              if(divAction=="open"){
                $scope.ruproduct = true;
              }else{
                closeAllDiv();
                $scope.ruproduct = false;
              }
              
            break;
            case "customers":
                $('#m_customers').addClass('active');
                closeAllDiv();
                cleanForms();
                $scope.IsCustomer=true;
                $scope.manageDepto = 0;
              if(divAction=="open"){
                $scope.rucustomer = true;selectSwitch ("c");         

              }else{
                closeAllDiv();
                $scope.rucustomer = false;
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
         //console.log($scope.differentDays);

      }

    /**************************************************/

    /**************************************************
    *                                                 *
    *                    DASHBOARD                    * 
    *                                                 *
    **************************************************/
      $scope.listTickt = 0;
      $scope.filters={typeTicket: '', topDH: '', searchFilter:'', idCompany: '', idAddress: '', ticketStatus: ''};

      $scope.dhboard = function(){
        /**********CHECK IF THERE ARE TMP DELIVERY OR CANCEL DATA APPROVED TO APPLY TO THE TICKETS ***********/
        $scope.sysChkChangeOrCancel(0);
        $scope.sysChkChangeOrCancel(1);
        /******************************
        *                             *
        *       FILTER VARIABLES      *
        *                             *
        ******************************/
        //$scope.filters.idTypeTicketKf= !$scope.filters.idTypeTicketKf ? 0 : $scope.filters.idTypeTicketKf;
        //$scope.dh.filterAddress = 0;
        
        $scope.filters.idAddress   = ($scope.sessionidProfile==1 && (!$scope.filterCompanyKf.selected || !$scope.filterAddressKf.selected)) || (($scope.sessionidProfile!=1)  && !$scope.filterAddressKf.selected) ? "" : $scope.filterAddressKf.selected.idAdress;
        $scope.dh.filterAddress    = $scope.filters.idAddress;
        $scope.dh.filterSearch     = $scope.filters.searchFilter;
        $scope.dh.filterTop        = $scope.filters.topDH;
        $scope.dh.filterProfile    = $scope.sessionidProfile;
        $scope.dh.filterTenantKf   = $scope.sessionidProfile==5 || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2) ? $scope.sessionIdUser :'';
        if(($scope.sessionidProfile!=2  && $scope.sessionidProfile!=5) || ($scope.sessionidTypeTenant==6 && $scope.sessionidTypeTenant==1)){
          $scope.filters.idCompany   = !$scope.filterCompanyKf.selected? "" : $scope.filterCompanyKf.selected.idCompany;
        }
        $scope.dh.filterCompany    = $scope.sessionidProfile == 2 || $scope.sessionidProfile == 4 ? $scope.sessionidCompany : $scope.filters.idCompany;
        $scope.dh.filterTypeTicket = !$scope.filters.typeTicket?"":$scope.filters.typeTicket.idTypeTicket;
        $scope.dh.filterStatus     = !$scope.filters.ticketStatus?"":$scope.filters.ticketStatus.idStatus;
        $scope.dh.filterOwnerKf    = $scope.sessionidProfile==3?$scope.sessionIdUser:'';
        $scope.dh.filterIdUser     = $scope.sessionidProfile!=1 && $scope.sessionidProfile!=2 && $scope.sessionidProfile!=4?$scope.sessionIdUser:'';
        $scope.dh.filterIdAtt      = ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==1) || ($scope.sessionidProfile==6 && $scope.sessionidTypeTenant==2)?$scope.sessionIdUser:'';
        //console.log($scope.dh);
          $searchFilter= 
          {
               idUser            : $scope.dh.filterIdUser,
               idOWnerKf           : $scope.dh.filterOwnerKf,
               searchFilter        : $scope.dh.filterSearch,
               topFilter           : $scope.dh.filterTop, 
               idProfileKf         : $scope.dh.filterProfile,
               idUserTenantKf      : $scope.dh.filterTenantKf,
               idUserAttendantKf   : $scope.dh.filterIdAtt, 
               idCompanyKf         : $scope.dh.filterCompany,
               idTypeTicketKf      : $scope.dh.filterTypeTicket,
               idAdress            : $scope.dh.filterAddress,
               idStatusTicketKf    : $scope.dh.filterStatus
          }
          //console.log($scope.sessionIdUser);   
          // N° de pedido EASY : 5420689
          //console.log($searchFilter);
          $http.post(serverHost+serverBackend+"Ticket/all", $searchFilter,setHeaderRequest())
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

      $scope.greaterThan = function(prop, val){
          return function(item){
            if (item[prop] > val) return true;
          }
      }
      $scope.differentThan = function(prop, val){
          return function(item){
            if (item[prop] != val) return true;
          }
      }
    $scope.checkBefore2Load = function(){
      $scope.sysLoadLStorage(); 
      $scope.refresSession($scope.sessionMail);
      $scope.getUserLists(); /* New Function using angular Services: userServices.userLists*/
      $scope.CallFilterFormU(); 
      $scope.CallFilterFormT(); 
      $scope.getAllAddress(); 
      $scope.getParameter();  
      $scope.getAllDeparment($scope.sessionIdAddress);
      $scope.getSysProfilesFn("");
      $scope.getProductClassificationFn();
      $scope.getDiviceOpening();
      $scope.getProductsFn("",0);
      $scope.getSysModulesFn();
          /*PENDIENTE PASAR TODOS ESTOS DATOS A VARIABLES LOCALES PARA MEJORAR LA PERFORMANCE */
              $scope.getAllLocationsFn();             
              $scope.getBuildingsFn();
              $scope.getTypeOfMailsFn();
              $scope.getStatesFn();
              $scope.getTypeOfIVAFn();
              $scope.getCategoryDepartamentFn();
              $scope.getCustomerListFn("",1);
              $scope.getCustomerTypesFn();
          /*PENDIENTE PASAR TODOS ESTOS DATOS A VARIABLES LOCALES PARA MEJORAR LA PERFORMANCE */        

      cleanForms();
      if ($scope.sessionidProfile==3 || $scope.sessionidProfile==5 || $scope.sessionidProfile==6){
                $scope.getAllAddressByIdTenant();
      }
      $scope.companyN = $scope.sysLoggedUser.nameCompany;
      $scope.addressN = $scope.sysLoggedUser.nameAdress;
        $scope.isMonitorActive = $scope.sysModules.idMonitor?true:false;
        console.log("[$scope.isMonitorActive] => "+$scope.isMonitorActive);
        if ($scope.isMonitorActive){$scope.fnShowHide('home', 'open');}
    }
     /*MOSTRAR EL MONITOR ACTIVO SIEMPRE AL ENTRAR AL SISTEMA*/
    $scope.fnLoadPhoneMask = function(){
        /**********************************************
        *               INPUT PHONE MASK              *
        **********************************************/
        $('.input--movil').mask('9999999999999999999999999');
        $('.input--local').mask('9999999999999999999999999');
        $('.input--phone').mask('9999999999999999999999999');
        $('.input--time').mask('00:00');
        $('.input--dni').mask('99999999');
        $('.input--number').mask('99');
        $('.input--tel.input--dni').on('focus', function () {
          //console.log($(this).val());
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
}); /*Cierre del JS ANGULAR*/
