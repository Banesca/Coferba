var app = angular.module('coferbaApp', ["blockUI", "inform", "inform-exception", "showdown", "ngAnimate", "ui.bootstrap"]);
app.controller('coferbaConnect', function($scope) {	
	$scope.serverHost="http://coferba.com.ar/";
});