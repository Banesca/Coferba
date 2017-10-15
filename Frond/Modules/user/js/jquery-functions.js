$(document).ready(function() {
	var $isActive = 0;
	//$('.banner-w3text').hide();
	/*function hideIframe (){$('#frameYoutube').hide(1000); $('.banner-w3text').show(1500);}
    setTimeout(hideIframe, 42000);*/
    function showBanner(){$('.banner-w3text').show();}
    function hideBanner(){$('.banner-w3text').hide();}
    $('#closeVideo').click(function() {
  		$('#video').hide();
		$("#videoYoutube").attr("src","");

	});
	$('#video').click(function() {
  		$('#video').hide();
  		$("#videoYoutube").attr("src","");
	});

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
$('.servicios-backg [id^="img_"]').hide();
$('.container [id^="txt_"]').hide();

function hideServicios (){
	$('#op1').attr('src','./images/option1.png');
	$('#op2').attr('src','./images/option2.png');
	$('#op3').attr('src','./images/option3.png');
	$('#bkg_display').removeAttr('src');
	$('#bkg_display').attr('src','./images/residencial.png');

	$('.container [id^="txt_"]').hide(1500);
}

/* CLOSE SERVICES MESSAGE*/
$('.closemsg').click(function(){
	$('.txt_op [id^="txt_"]').hide(1500);
});

$('#op1').mouseover(function(){$('#op1').attr('src','./images/option1_active.png');});
$('#op2').mouseover(function(){$('#op2').attr('src','./images/option2_active.png');});
$('#op3').mouseover(function(){$('#op3').attr('src','./images/option3_active.png');});

$('#op1').mouseout(function(){
	if ($isActive!==1){$('#op1').attr('src','./images/option1.png');}
});
$('#op2').mouseout(function(){
	if ($isActive!==2){$('#op2').attr('src','./images/option2.png');}
});
$('#op3').mouseout(function(){
	if ($isActive!==3){$('#op3').attr('src','./images/option3.png');}
});


$('#op1').click(function(){
	$isActive=1;
	$('#bkg_display').attr('src','./images/service1.png');
	$('.container [id^="txt_"]').hide();
	$('#txt_op1').fadeIn(1000);
	$('#op1').attr('src','./images/option1_active.png');
	$('#op2').attr('src','./images/option2.png');
	$('#op3').attr('src','./images/option3.png');
});
$('#op2').click(function(){
	$isActive=2;
	$('#bkg_display').attr('src','./images/service2.png');
	$('.container [id^="txt_"]').hide();
	$('#txt_op2').fadeIn(1000);
	$('#op2').attr('src','./images/option2_active.png');
	$('#op1').attr('src','./images/option1.png');
	$('#op3').attr('src','./images/option3.png');
});
$('#op3').click(function(){
	$isActive=3;
	$('#bkg_display').attr('src','./images/service3.png');
	$('.container [id^="txt_"]').hide();
	$('#txt_op3').fadeIn(1000);
	$('#op3').attr('src','./images/option3_active.png');
	$('#op2').attr('src','./images/option2.png');
	$('#op1').attr('src','./images/option1.png');
});

});