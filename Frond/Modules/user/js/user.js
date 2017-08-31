 var app = angular.module('coferbaApp', []);

app.controller('coferbaCtrl', function($scope, $http) {
     $userType=0;
     $urlAddT='http://localhost/Coferba/Back/index.php/Tenant';
     $urlAddU='http://localhost/Coferba/Back/index.php/User';
     /*Validate if the user is a company */
     $scope.getSelectedData = function(){$scope.selectedItem=$scope.idProfileKf;
        if ($scope.selectedItem==2){$scope.cpnyinput=true;}else{$scope.cpnyinput=false;}
     }

    $scope.CallListForm = function(){
         $http({
            method : "GET",
            url : "http://localhost/Coferba/Back/index.php/User"
          }).then(function mySuccess(response) {
              $scope.listUsers = response.data;
            }, function myError(response) {
          });
      }

      $scope.CallFilterForm = function(){
         $http({
            method : "GET",
            url : "http://localhost/Coferba/Back/index.php/User/filterForm"
          }).then(function mySuccess(response) {
              $scope.listProfile = response.data.profile;
              $scope.listType = response.data.type;
            }, function myError(response) {
          });
      }


      $scope.addUser = function ($uType){
        $userType = $uType;
        var urlAdd= "";
        if ($userType==1){urlAdd=$urlAddU;}else if ($userType==2){urlAdd=urlAddT;}
        $http.post(urlAdd, $scope._setuser())
            .then(function (sucess, data) {

             alert("Registrado ");

          },function (error, data,status) {
                  if(status == 404){alert("!Informacion "+status+data.error+"info");}
                  else if(status == 203){alert("!Informacion "+status,data.error+"info");}
                  else{alert("Error !"+status+" Contacte a Soporte"+"error");}
                 
          });
      }
     $scope._setuser = function () {
      var itemSelected="";
       if ($scope.selectedItem==2){itemSelected=$scope.razonSocial;}
       if ($userType==1){
        var user =
                {
                      user:
                              {
                                  fullNameUser: $scope.fname+' '+$scope.lname,
                                  emailUser: $scope.emailUser,
                                  phoneNumberUser: $scope.phoneNumberUser,
                                  addresUser: $scope.addresUser,
                                  passwordUser: $scope.passwordUser,
                                  idProfileKf: $scope.idProfileKf,
                                  razonSocial: itemSelected
                              }
                };
        }else if($userType==2){
           var user =
                {
                      user:
                              {
                                  fullNameTenant: $scope.fname+$scope.lname,
                                  phoneNumberTenant: $scope.phoneNumberUser,
                                  emailTenant: $scope.emailUser

                              }
                };
        }
        return user;
    };
    $scope.get = function() {
       
         $http({
            method : "GET",
            url : "http://127.0.0.1/baoli/Api/index.php/Client"
          }).then(function mySuccess(response) {
              $scope.listClient = response.data;
            }, function myError(response) {
             //alert(response.statusText);
          });
    }

}); /*Cierre del JS ANGULAR*/

/*JQUERY SHOW/HIDE */
$(document).ready(function() {
    $(this).scrollTop(0);
    $('.main_container [id^="frm_"]').hide();
    $('.p-r').hide();
    $('.jumbotron [id^="m_"]').removeClass('active');
    
    /* MENU ICONS*/
    $('.jumbotron [id^="m_"]').click(function(){
        $('.main_container [id^="frm_"]').hide();
    });
    $('#m_pedidos').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
        $('.p-r').hide();
        $('#SubM_Pedidos').show();
    });
    $('#m_monitor').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
        $('.p-r').hide();
        $('#SubM_Monitor').show();
    });
    $('#m_report').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
        $('.p-r').hide();
    });
    $('#m_user').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
        $('.p-r').hide();
        $('#SubM_user ').show();
    });
     $('#m_config').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
        $('.p-r').hide();
    });
      $('#m_contact').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
        $('.p-r').hide();
    });
    /*SUB MENU*/
    $('#lr1').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('#frm_loginU').show();
        $('#loginRegister').hide();  
    });
    /*Login Button*/
    $('#lr1').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('#frm_loginU').show();
        $('#loginRegister').hide(); 
    });
    /*Register Button*/
    $('#lr2').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('#frm_registerU').show();
        $('#loginRegister').hide();  
    });
    $('[href^="#Alta"]').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('#frm_rku').fadeIn(1500);
        $('#loginRegister').hide();
    });
    $('[href^="#Baja"]').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('#frm_rkd').fadeIn(1500);
        $('#loginRegister').hide();
    });
    /*Close Form*/
    $('.frmclose').click(function(){
        $('#loginRegister').show();
        $('.main_container [id^="frm_"]').hide();
    });
    /*Button Reset*/
    $('#breset').click(function(){
        $('#loginRegister').show();
        $('.main_container [id^="frm_"]').hide();
        
    });
});