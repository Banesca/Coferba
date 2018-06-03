$(document).ready(function() {
  $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
  $('body').popover({ selector: '[data-toggle="popover"]' });
  $('.input--tel').mask('(054) 9 99 9999-9999');
  
  $('.input--tel.only--numbers').on('focus', function () {
     if ($(this).val().length === 0) {
       $(this).val();
     }
  });
  
  $('.input--tel.only--numbers').keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
             (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
             (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


/* MENU ICONS*/
    $('#m_pedidos').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
    });
    $('#m_monitor').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
        
    });
    $('#m_depto').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
    });
    $('#m_report').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
    });
    $('#m_user').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
    });
     $('#m_config').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
    });
      $('#m_contact').click(function(){
        $('.jumbotron [id^="m_"]').removeClass('active');
        $(this).addClass('active');
    });
  /**************************************************/

});