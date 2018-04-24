var myService = angular.module("coferbaServices", []);
myService.service("tokenService",function(){
      var tokenStorageValue="";
      return {
          getStorageValues: function() {
              tokenStorageValue = localStorage.getItem("sysToken");
              return tokenStorageValue;
          },
          setStorageValues: function(value) {
              localStorage.setItem("sysToken", value);
          },
      }
});

myService.factory("loggedUser",function(){
      var loggedUserStorage="";
      return {
          getTokenStorage: function() {
              loggedUserStorage = localStorage.getItem("sysLoggedUser");
              return loggedUserStorage;
          },
          setTokenStorage: function(value) {
              localStorage.setItem("sysLoggedUser", value);
          },
      }
});