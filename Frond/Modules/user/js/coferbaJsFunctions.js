

$(window).on('load', function() { // makes sure the whole site is loaded 
  $('#loader').fadeOut(); // will first fade out the loading animation 
  $('#wLoader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(450).css({'overflow':'visible'});
})
/*JQUERY SHOW/HIDE FUNCTIONS */
$(document).ready(function() {


    $(this).scrollTop(0);
    $('.main_container [id^="frm_"]').hide();
    $('#sytemHead').hide(); 
    $('form').each(function(){this.reset();});
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
    /*Request UP key*/
    $('[href^="#Alta"]').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('#frm_rkuu').fadeIn(1500);
        $('form').each(function(){this.reset();});
        $('#loginRegister').hide();
    });
    /*Request DOWN key*/
    $('[href^="#Baja"]').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('#frm_rkdu').fadeIn(1500);
        $('form').each(function(){this.reset();});
        $('#loginRegister').hide();
    });
    /*Request SERVICE */
    $('[href^="#Servicio"]').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('#frm_rusvc').fadeIn(1500);
        $('form').each(function(){this.reset();});
        $('#loginRegister').hide();
    });
    /*Request OTHER QUERIES */
    $('[href^="#Otros"]').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('#frm_ruoqry').fadeIn(1500);
        $('form').each(function(){this.reset();});
        $('#loginRegister').hide();
    });

    $('#logout').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('#frm_loginU').show();
        $('#sytemHead').hide();
        $('form').each(function(){this.reset();});
    });
    /*Close Form*/
    $('.frmclose').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('form').each(function(){this.reset();});
    });
    $('.frmcloseLogin').click(function(){
        $('.main_container [id^="frm_"]').hide();
        $('form').each(function(){this.reset();});
        $(location).attr('href', 'sistema.html')
    });
    /*Button Reset*/
    $('#breset').click(function(){
        $('#loginRegister').show();
        $('.main_container [id^="frm_"]').hide();
        
    });
});