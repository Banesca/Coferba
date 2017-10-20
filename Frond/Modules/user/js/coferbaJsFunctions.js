

$(window).on('load', function() { // makes sure the whole site is loaded 
  $('#loader').fadeOut(); // will first fade out the loading animation 
  $('#wLoader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(450).css({'overflow':'visible'});
})
/*JQUERY SHOW/HIDE FUNCTIONS */
$(document).ready(function() {
    $('.jumbotron [id^="m_"]').removeClass('active');
    
    /* MENU ICONS*/
    $('.jumbotron [id^="m_"]').click(function(){
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
  /**************************************************/
});