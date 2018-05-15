var app = angular.module('coferbaApp', ["coferbaApp.LoginUser",
                                     "coferbaApp.RegisterUser",
                                           "coferbaApp.NewPwd",
                                        "coferbaApp.ForgotPwd",
                                        "coferbaServices.User",
                                                     "blockUI",  
                                                     "ngRoute",   
                                                      "inform", 
                                            "inform-exception", 
                                                    "showdown", 
                                          "coferbaTokenSystem",
                                                   "ngAnimate", 
                                                "ui.bootstrap",
                                                "angularCSS"]);
/**************************************************************************
*                                                                         *
*               Servicio para validar si tiene un valor para              *
*                                                                         *
*                      agregar o remover la clase css                     *
***************************************************************************/
app.service("inputService",function(){
      return {
          setClass: function(value, obj) {
                if (value!==""){
                    //console.log(value);
                    //console.log(obj);
                    obj.addClass('active');
                }else{
                    obj.removeClass('active');
                }
          },
      }
});

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

     $routeProvider
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl',
            css: 'views/login/style-login.css'

        })
        .when('/register', {
            templateUrl: 'views/register/register.html',
            controller: 'RegisterUserCtrl',
            css: 'views/login/style-login.css'
        })
        .when('/forgotpwd', {
            templateUrl: 'views/forgotpwd/forgotpwd.html',
            controller: 'ForgotPwdCtrl',
            css: 'views/login/style-login.css'
        })
        .when('/newpwd', {
            templateUrl: 'views/newpwd/newpwd.html',
            controller: 'NewPwdCtrl',
            css: 'views/login/style-login.css'
        })
        .when('/mainApp', {
            templateUrl: 'views/newpwd/mainapp.html',
            controller: 'MainAppCtrl',
            css: 'views/login/style-login.css'
        })
        .otherwise({
            redirectTo: '/login/'
        });
}]);


app.constant("serverHost","http://192.168.0.6/");
app.constant("serverBackend","Coferba/Back/index.php/");
app.constant("serverHeaders", {'headers':{'Content-Type': 'application/json; charset=utf-8' }});

app.directive('passwordConfirm', ['$parse', function ($parse) {
 return {
    restrict: 'A',
    scope: {
      matchTarget: '=',
    },
    require: 'ngModel',
    link: function link(scope, elem, attrs, ctrl) {
      var validator = function (value) {
        ctrl.$setValidity('match', value === scope.matchTarget);
        return value;
      }
 
      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.push(validator);
      
      // This is to force validator when the original password gets changed
      scope.$watch('matchTarget', function(newval, oldval) {
        validator(ctrl.$viewValue);
      });

    }
  };
}]);
app.controller('MainCtrl', function($scope, $rootScope, $location, serverHost, serverBackend, serverHeaders, $http, blockUI, $timeout, tokenSystem, inform, $window){
    $scope.counT;
    $scope.redirect;
    $scope.wLoader  = false;
    $scope.sysToken = false;
   $scope.launchLoader = function(){
     $scope.wLoader  = true;
      $timeout(function() {
        $('#loader').fadeOut();
        $('#wLoader').delay(350).fadeOut('slow'); 
        $scope.wLoader  = false;
      }, 1500);
      
    }   
/**************************************************
*                                                 *
*         SET THE JSON CONTENT TYPE HEADER        *
*                                                 *
**************************************************/ 
    $scope.setHeaderRequest = function(){
       return  { headers: { 'Content-Type': 'application/json; charset=utf-8' }}
    }

/**************************************************
*                                                 *
*         COUNT DOWN FUNCTION TO REDIRECT         *
*                                                 *
**************************************************/ 
    $scope.countDownRedirect = function(redirect, count){
        
        if(count > 0){
            count--;

            $scope.time2Redirect = count;
              $timeout(function() {
                    
                    $scope.countDownRedirect(redirect, count);  
                }, 1000);
              //console.log(count+1)
            
        }else{
            $scope.redirectSuccessfull = false;
            location.href = redirect;
        }
    }


});