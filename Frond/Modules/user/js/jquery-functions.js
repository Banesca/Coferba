$(document).ready(function() {
/*******************************************/
/*										   */
/*              SCROLL FUNCTIONS           */
/*										   */
/*******************************************/
	// <--start-smooth-scrolling -->	
		// Select all links with hashes
		$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
		// On-page links
		if (
		  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		  && 
		  location.hostname == this.hostname
		) {
		  // Figure out element to scroll to
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		  // Does a scroll target exist?
		  if (target.length) {
		    // Only prevent default if animation is actually gonna happen
		    event.preventDefault();
		    $('html, body').animate({
		      scrollTop: target.offset().top
		    }, 1000, function() {
		      // Callback after animation
		      // Must change focus!
		      var $target = $(target);
		      $target.focus();
		      if ($target.is(":focus")) { // Checking if the target was focused
		        return false;
		      } else {
		        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
		        $target.focus(); // Set focus again
		      };
		    });
		  }
		}
		});	
		// <--end-smooth-scrolling -->	
		//<!-- smooth-scrolling-of-move-up -->
		var defaults = {
				containerID: 'toTop', // fading element id
				containerHoverID: 'toTopHover', // fading element hover id
				scrollSpeed: 1200,
				easingType: 'linear' 
			};
			
			$().UItoTop({ easingType: 'easeOutQuart' });
		//<!-- //smooth-scrolling-of-move-up --> 

/*==========================================================================================*/
$('.consorcio-backg [id^="img_"]').hide();
$('.consorcio-backg [id^="txt_"]').hide();


$('#op1').mouseover(function(){
		$('#img_llave').fadeIn(1500);
		$('#img_cerradura').fadeIn(1500);
		$('#txt_op1').fadeIn(1500);
});
$('#op1').mouseout(function(){
		$('.consorcio-backg [id^="img_"]').hide(1000);
		$('.consorcio-backg [id^="txt_"]').hide();
});
$('#op2').mouseover(function(){
		$('#img_llave').fadeIn(1500);
		$('#img_leftcamera').fadeIn(1500);
		$('#img_cerradura').fadeIn(1500);
		$('#img_rightcamera2').fadeIn(1500);
		$('#txt_op2').fadeIn(1500);
});
$('#op2').mouseout(function(){
		$('.consorcio-backg [id^="img_"]').hide(1000);
		$('.consorcio-backg [id^="txt_"]').hide();
});
$('#op3').mouseover(function(){
		$('#img_llave').fadeIn(1500);
		$('#img_leftcamera').fadeIn(1500);
		$('#img_cerradura').fadeIn(1500);
		$('#img_rightcamera').fadeIn(1500);
		$('#img_rightcamera2').fadeIn(1500);
		$('#txt_op3').fadeIn(1500);
});
$('#op3').mouseout(function(){
		$('.consorcio-backg [id^="img_"]').hide(1000);
		$('.consorcio-backg [id^="txt_"]').hide();
});
});