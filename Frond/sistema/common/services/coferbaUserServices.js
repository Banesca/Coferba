var moduleUserServices = angular.module("coferbaServices.User", ["coferbaTokenSystem"]);

moduleUserServices.service("userServices", ['$http', 'tokenSystem', '$timeout', 'serverHost', 'serverBackend', 'serverHeaders', 
  function($http, tokenSystem, $timeout, serverHost, serverBackend, serverHeaders){
      var checkResult=0;
      var attempsToken = {emailAttempted:'', attempsCount: 0};
      var loginResult="";
      var rsJSON;
      return {
          /* FIND USER BY EMAIL */
          checkUserMail: function(userMail, typeOfCheck) {
            var mail2Search=userMail;
            console.log("Email a verificar: "+userMail);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"user/findUserByEmail/"+mail2Search
                  }).then(function mySuccess(response) {
                      checkResult = 1;
                      //console.log("Email registrado: "+response.data.emailUser);
                      tokenSystem.temporalStorage(response.data);
                      return checkResult;
                      //console.log(response.data)
                  },function myError(response) { 
                    //console.log(response.data.error); 
                    if (typeOfCheck=="login" || typeOfCheck=="forgotPwd"){
                      var attempsTkn=!JSON.parse(localStorage.getItem("attempsToken"))? false :JSON.parse(localStorage.getItem("attempsToken"));
                        if(attempsTkn==false || attempsTkn==undefined){
                            attempsToken['attempsCount']=0;
                            attempsToken['attempsCount']++;
                            attempsToken['emailAttempted']=userMail;
                        }else if(userMail!==attempsTkn.emailAttempted) {
                            localStorage.removeItem("attempsToken");
                            attempsToken['attempsCount']=0;
                            attempsToken['attempsCount']++;
                            attempsToken['emailAttempted']=userMail;
                        }else{
                            attempsToken['attempsCount']=attempsTkn.attempsCount+1;
                            attempsToken['emailAttempted']=attempsTkn.emailAttempted;
                        }  
                      }else if (typeOfCheck=='register'){
                            localStorage.removeItem("attempsToken");
                            attempsToken['attempsCount']=0;
                            attempsToken['emailAttempted']=userMail;
                      }
                        localStorage.setItem("attempsToken", JSON.stringify(attempsToken));
                        checkResult = 0;
                    return checkResult;
            });   
          },
          /* RESTORE PASSWORD */
          recoverPwd: function(userPwd2Recover) {
            var rsTmpUser=tokenSystem.getTokenStorage(3);
              console.log("Cuenta a restablecer: "+rsTmpUser.emailUser);
              return $http.post(serverHost+serverBackend+"User/updatePass",userPwd2Recover)
                .then(function mySucess(response, status, data) {
                  checkResult = 1;
                  return checkResult;
              },function myError(response) { 
                console.log(response.data.error); 
                checkResult = 0;
                return checkResult;
              });
          },
          /* UPDATE AN USER AND CHANGE PASSWORD */
          updateUser: function(userData2Change) {
            var data2update = userData2Change;
            //console.log(serverHeaders);
            console.log(data2update);
              return $http.post(serverHost+serverBackend+"User/update",data2update)
                .then(function mySucess(response, status, data) {
                  checkResult = 1;
                  return checkResult;
              },function myError(response, error) { 
                console.log("Error: "+response.data); 
                checkResult = 0;
                return checkResult;
              });
          },
          /* ADD AN USER */
          addUser: function(userData2Add) {
            //console.log(serverHeaders);
              console.log(userData2Add);
              return $http.post(serverHost+serverBackend+"User/", userData2Add)
                .then(function mySucess(response, status, data) {
                  checkResult = 1;
                  return checkResult;
              },function myError(response, error) { 
                console.log("Error: "+response.data); 
                checkResult = 0;
                return checkResult;
              });
          },
          /* LOGIN SERVICE */
          letLogin: function(jsonLogin) {
            var jsonUser=jsonLogin.user.fullNameUser;
              console.log("Login con el email: "+jsonUser);
              return $http.post(serverHost+serverBackend+"User/auth",jsonLogin)
                .then(function mySucess(response, status) {
                  rsJSON=response.data.response;
                  if(rsJSON){console.log(rsJSON.fullNameUser);}
                    switch (response.status){
                      case 200:
                        localStorage.removeItem("attempsToken");
                        if(rsJSON.idProfileKf==6 && rsJSON.requireAuthentication==0){
                           console.log('is an Attendant without login premission');
                          tokenSystem.temporalStorage(rsJSON);
                          loginResult = 10;
                          return loginResult; 
                        }else if(rsJSON.isConfirmatedMail==0){
                          console.log('Confirm Email Required');
                          tokenSystem.temporalStorage(rsJSON);
                          loginResult = 3;
                          return loginResult;
                        }else if(rsJSON.isConfirmatedMail==1 && rsJSON.idStatusKf==0){ 
                          console.log('Account Inactive, please contact support');
                          tokenSystem.temporalStorage(rsJSON);
                          loginResult = 4;
                          return loginResult;
                        }else if(rsJSON.isConfirmatedMail==1 && rsJSON.idStatusKf==1 && rsJSON.resetPasword==1){
                          console.log('Change Password Required');
                          tokenSystem.temporalStorage(rsJSON);
                          loginResult = 2;
                          return loginResult;
                        }else  if(rsJSON.resetPasword==0 && rsJSON.idStatusKf==1){
                        tokenSystem.destroyTokenStorage(4);
                        tokenSystem.setTokenStorage(true, rsJSON);
                        $timeout(function() {
                            var jsonTokenUser = tokenSystem.getTokenStorage(2);
                            console.log('Login Successfully', jsonTokenUser.emailUser);
                        }, 1500);
                        loginResult = 1;
                        return loginResult;
                      }
                      break;

                      case 203:
                        //tokenSystem.temporalStorage(rsJSON);
                        var jsonTokenUser = tokenSystem.getTokenStorage(3);
                        console.log('<<<Incorrect Password>>>');
                        console.log("Error: " + response.data.error);
                          var attempsTkn=!JSON.parse(localStorage.getItem("attempsToken"))? false :JSON.parse(localStorage.getItem("attempsToken"));
                          if(attempsTkn==false || attempsTkn==undefined){
                              attempsToken['attempsCount']=0;
                              attempsToken['attempsCount']++;
                              attempsToken['emailAttempted']=jsonUser;
                          }else if(jsonUser!==attempsTkn.emailAttempted) {
                              localStorage.removeItem("attempsToken");
                              attempsToken['attempsCount']=0;
                              attempsToken['attempsCount']++;
                              attempsToken['emailAttempted']=jsonUser;
                          }else{
                              attempsToken['attempsCount']=attempsTkn.attempsCount+1;
                              attempsToken['emailAttempted']=attempsTkn.emailAttempted;
                          }  
                        localStorage.setItem("attempsToken", JSON.stringify(attempsToken));
                        loginResult = 5;
                        return loginResult;
                      break;
                      default:
                    }
                },function myError(response) {
                  alert(status);
                    if(respone.status == 404){
                      console.log("!Informacion: "+response.data.error+"info");
                      /*inform.add(response.data.error,{
                        ttl:5000, type: 'warning'
                      }); */
                    }
                    else{
                      console.log("!Informacion: "+response.data.error+"info");
                      /*inform.add(response.data.error,{
                        ttl:5000, type: 'warning'
                      }); */
                    }
              })   
          },
          /*/LOGIN SERVICE*/
          /* ADD AN USER */
          approveDepto: function(idDepto) {
            //console.log(serverHeaders);
              console.log("[Service][approveDepto]---> idDepto: "+idDepto);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Department/aprobated/"+idDepto
                  }).then(function mySuccess(response) {
                      console.log("[Service][approveDepto]---> idDepto: "+idDepto+" (Successfully Approved)");
                      return response;

                  },function myError(response, error) { 
                      console.log("Error: "+response.data.error); 
                      return response;
                  });
          },
          approveOwnerDepto: function(idDepto) {
            //console.log(serverHeaders);
              console.log("[Service][approveOwnerDepto]---> idDepto: "+idDepto);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Department/aprobated/"+idDepto
                  }).then(function mySuccess(response) {
                      console.log("[Service][approveOwnerDepto]---> idDepto: "+idDepto+" (Successfully Approved)");
                      return response;

                  },function myError(response, error) { 
                      console.log("Error: "+response.data.error); 
                      return response;
                  });
          },
          approveTenantDepto: function(idUser, idStatus) {
            //console.log(serverHeaders);
              console.log("[Service][approveTenantDepto]---> idDepto: "+idUser+' / idStatus: '+idStatus);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Department/deptoTenantStatus/"+idUser+"/"+idStatus
                  }).then(function mySuccess(response) {
                      console.log("[Service][approveTenantDepto]---> idDepto: "+idUser+" (Successfully Approved)");
                      return response;

                  },function myError(response, error) { 
                      console.log("Error: "+response.data.error); 
                      return response;
                  });
          },
          assignDepto: function(userData2Assign) {
              console.log("[Service][assignDepto]---> Department to Assign: "+userData2Assign.department.idDepartment);
              return $http.post(serverHost+serverBackend+"Department/update",userData2Assign)
                .then(function mySucess(response) {
                  console.log("[Service][assignDepto]---> Department N°: "+userData2Assign.department.idDepartment+" (Successfully Assigned)");
                  return response;
              },function myError(response) { 
                  console.log("Error: "+response.data.error); 
                  return response
              });
          },
          /*GET OFFICES BY COMPANY ID*/
          officeList: function(idCompany) {
              var rsData = {};
              console.log("[Service][officeList]---> idCompany: "+idCompany);
              return $http({
                    method : "GET",
                    url : serverHost+serverBackend+"Direccion/addressListByCompanyid/"+idCompany
                  }).then(function mySuccess(response) {
                      rsData = response.data;
                      //console.log(rsData);
                      return rsData;

                  },function myError(response, error) { 
                      console.log("Error: "+response.data.error); 
                      return response;
                  });
          },
          /*/GET OFFICES BY COMPANY ID*/
          /*UPDATE COMPANY*/
          updateCompany: function(companyData2Update) {
              var rsData = {};
              console.log("[Service][updateCompany]---> idCompany: "+companyData2Update.company.idCompany);
              return $http.post(serverHost+serverBackend+"user/updatecompany",companyData2Update)
                .then(function mySuccess(response) {
                    checkResult = 1;
                    return checkResult;

                },function myError(response, error) { 
                    console.log("Error: "+response.data.error); 
                    return response;
                });
          },
          /*/GET OFFICES BY COMPANY ID*/
      }
}]);