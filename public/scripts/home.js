$(document).ready(function(){
  $('.featured-slider').slick({
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 2000
  });
});

$('.featured-slider').slick("unslick");
 $('.featured-slider').slick('slickAdd', '<div><img><div>');

$(document).ready(function(){
  $('.featured-slider').slick({
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 2000
  });
});

/*  $('.featured-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 2000	    
});*/

