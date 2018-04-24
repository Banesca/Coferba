var app = angular.module('coferbaApp', ["blockUI", "ngRoute", "inform", "inform-exception", "showdown", "coferbaServices", "ngAnimate", "ui.bootstrap", "angularCSS"]);

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
        .otherwise({
            redirectTo: '/login/'
        });
}]);


app.constant("serverHost","http://localhost/");
app.constant("serverBackend","Coferba/Back/index.php/");

app.controller('MainCtrl', function($scope, $rootScope, $location, $http, blockUI, $timeout, tokenService, inform, $window){
	$scope.counT;
	$scope.redirect;
	
	$scope.redirectSuccessfull = false;
	$scope.sysToken = false;
    //tokenService.setTokenStorage("true");
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

/**************************************************************************
*                                                                         *
*    Funcion para validar segun el valor agregar / remover clase css      *
*                                                                         *
***************************************************************************/
$('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('active');
    else
      $this.removeClass('active');
  });
});