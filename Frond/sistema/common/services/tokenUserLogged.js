var tkUserService = angular.module("coferbaTokenLoggedUser", []);
tkUserService.service("tokenLoggedUser",function(){
      var loggedUserStorage="";
      return {
          getStorageValues: function() {
              loggedUserStorage = JSON.parse(localStorage.getItem("sysLoggedUser"));
              return loggedUserStorage;
          },
          setStorageValues: function(value) {
              localStorage.setItem("sysLoggedUser", JSON.stringify(value));
          },
          destroyStorageValues: function(value) {
              localStorage.removeItem("sysLoggedUser");
          },
      }
});