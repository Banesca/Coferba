var tkSysService = angular.module("coferbaTokenSystem", []);
/**************************************************
*                                                 *
*        TOKEN SERVICE FOR USER LOGGED IN         *
*                                                 *
**************************************************/ 
tkSysService.service("tokenSystem",function(){
      var tokenStorageValue="";
      return {
          getTokenStorage: function(value) {
            switch (value){
              case 1:
                tokenStorageValue = localStorage.getItem("sysToken");
              break;
              case 2:
                tokenStorageValue = JSON.parse(localStorage.getItem("sysLoggedUser"));
              break;
              default:

            }
              return tokenStorageValue;
          },
          setTokenStorage: function(tksSystem, tkLoggedUser) {
              localStorage.setItem("sysToken", tksSystem);
              localStorage.setItem("sysLoggedUser", JSON.stringify(tkLoggedUser));
          },
          destroyTokenStorage: function() {
              localStorage.removeItem("sysToken");
              localStorage.removeItem("sysLoggedUser");
          },
      }
});

