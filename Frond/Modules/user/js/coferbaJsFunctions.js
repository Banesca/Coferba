

$(window).on('load', function() { // makes sure the whole site is loaded  #14162B
  $('#loader').fadeOut(); // will first fade out the loading animation 
  $('#wLoader').delay(250).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(350).css({'overflow':'visible'});
})
/*JQUERY SHOW/HIDE FUNCTIONS */
$(document).ready(function() {
    $('#SubM_Pedidos').hide();
    
    /* MENU ICONS*/
    $('.jumbotron [id^="m_"]').click(function(){
    });
    $('#m_pedidos').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
        $('#SubM_Pedidos').show();
    });
    $('#m_monitor').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
         $('#SubM_Pedidos').hide();
        
    });
    $('#m_depto').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
         $('#SubM_Pedidos').hide();
    });
    $('#m_report').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
         $('#SubM_Pedidos').hide();
    });
    $('#m_user').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
         $('#SubM_Pedidos').hide();
    });
     $('#m_config').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
         $('#SubM_Pedidos').hide();
    });
      $('#m_contact').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
         $('#SubM_Pedidos').hide();
    });
  /**************************************************/
});