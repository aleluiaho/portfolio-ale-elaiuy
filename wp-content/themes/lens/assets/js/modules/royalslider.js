
/* --- Royal Slider Init --- */

function royalSliderInit() {
	if (globalDebug) {console.log("Royal Slider - Init");}

	// Helper function
	// examples
	// console.log(padLeft(23,5));       //=> '00023'
	// console.log(padLeft(23,5,'>>'));  //=> '>>>>>>23'
	function padLeft(nr, n, str){
		return Array(n-String(nr).length+1).join(str||'0')+nr;
	}

	// create the markup for the slider from the gallery shortcode
	// take all the images and insert them in the .gallery <div>
	$('.wp-gallery').each(function() {
		var $old_gallery = $(this),
			$images = $old_gallery.find('img'),
			$new_gallery = $('<div class="pixslider js-pixslider">');
		$images.prependTo($new_gallery).addClass('rsImg');
		$old_gallery.replaceWith($new_gallery);

		var gallery_data = $(this).data();
		$new_gallery.data(gallery_data);
	});

	$('.js-pixslider').each(function(){

		var $slider = $(this),
			rs_arrows = typeof $slider.data('arrows') !== "undefined",
			rs_bullets = typeof $slider.data('bullets') !== "undefined" ? "bullets" : "none",
			rs_autoheight = typeof $slider.data('autoheight') !== "undefined",
			rs_customArrows = typeof $slider.data('customarrows') !== "undefined",
			rs_slidesSpacing = typeof $slider.data('slidesspacing') !== "undefined" ? parseInt($slider.data('slidesspacing')) : 0,
			rs_keyboardNav  = typeof $slider.data('fullscreen') !== "undefined",
			rs_enableCaption = typeof $slider.data('enablecaption') !== "undefined",
			rs_imageScale  = typeof $slider.data('imagescale') !== "undefined" && $slider.data('imagescale') != '' ? $slider.data('imagescale') : 'fill',
			rs_imageAlignCenter  = typeof $slider.data('imagealigncenter') !== "undefined",
			rs_transition = typeof $slider.data('slidertransition') !== "undefined" && $slider.data('slidertransition') != '' ? $slider.data('slidertransition') : 'move',
			rs_autoPlay = typeof $slider.data('sliderautoplay') !== "undefined" ? true : false,
			rs_delay = typeof $slider.data('sliderdelay') !== "undefined" && $slider.data('sliderdelay') != '' ? $slider.data('sliderdelay') : '1000',
			rs_pauseOnHover = typeof $slider.data('sliderpauseonhover') !== "undefined" ? true : false,
			rs_visibleNearby = typeof $slider.data('visiblenearby') !== "undefined" ? true : false,
			rs_drag = true;


		var $children = $( this ).children();

		if ( $children.length == 1 ) {
			rs_arrows = false;
			rs_bullets = 'none';
			rs_customArrows = false;
			rs_keyboardNav = false;
			rs_drag = false;
			rs_transition = 'fade';
		}

		// make sure default arrows won't appear if customArrows is set
		if (rs_customArrows) arrows = false;

		//the main params for Royal Slider
		var royalSliderParams = {
			loop: true,
			imageScaleMode: rs_imageScale,
			imageAlignCenter: rs_imageAlignCenter,
			slidesSpacing: rs_slidesSpacing,
			arrowsNav: rs_arrows,
			controlNavigation: rs_bullets,
			keyboardNavEnabled: rs_keyboardNav,
			arrowsNavAutoHide: false,
			sliderDrag: rs_drag,
			transitionType: rs_transition,
			globalCaption: rs_enableCaption,
			numImagesToPreload: 2,
			autoPlay: {
				enabled: rs_autoPlay,
				stopAtAction: true,
				pauseOnHover: rs_pauseOnHover,
				delay: rs_delay
			},
			video: {
				// stop showing related videos at the end
				youTubeCode: '<iframe src="//www.youtube.com/embed/%id%?rel=0&autoplay=1&showinfo=0&wmode=transparent" frameborder="no"></iframe>'
			}
		};

		if (rs_autoheight) {
            royalSliderParams['autoHeight'] = true;
            royalSliderParams['autoScaleSlider'] = false;
            royalSliderParams['imageScaleMode'] = 'none';
            royalSliderParams['imageAlignCenter'] = false;
		} else {
			royalSliderParams['autoHeight'] = false;
			royalSliderParams['autoScaleSlider'] = true;
		}

		if (rs_visibleNearby) {
			royalSliderParams['visibleNearby'] = {
				enabled: true,
//				centerArea: 0.7,
//				center: true,
				breakpoint: 650,
				breakpointCenterArea: 0.64,
				navigateByCenterClick: false
			}
		}

		//fire it up!!!!
		$slider.royalSlider(royalSliderParams);

		var royalSlider = $slider.data('royalSlider');
		var slidesNumber = royalSlider.numSlides;

		if(slidesNumber == 1) $slider.addClass('single-slide');

		// create the markup for the customArrows
		if(slidesNumber > 1)
			if (royalSlider && rs_customArrows) {
				var $gallery_control = $(
					'<div class="gallery-control js-gallery-control">' +
						'<a href="#" class="control-item arrow-button arrow-button--left js-slider-arrow-prev"></a>' +
						'<div class="control-item count js-gallery-current-slide">' +
						'<span class="highlighted js-decimal">0</span><span class="js-unit">1</span>' +
						'<sup class="js-gallery-slides-total">0</sup>' +
						'</div>' +
						'<a href="#" class="control-item arrow-button arrow-button--right js-slider-arrow-next"></a>'+
						'</div>'
				);

				if ($slider.data('customarrows') == "left") {
					$gallery_control.addClass('gallery-control--left');
				}

				$gallery_control.insertAfter($slider);

				// write the total number of slides inside the markup created above
				// make sure it is left padded with 0 in case it is lower than 10
				slidesNumber = (slidesNumber < 10) ? padLeft(slidesNumber, 2) : slidesNumber;
				$gallery_control.find('.js-gallery-slides-total').html(slidesNumber);

				// add event listener to change the current slide number on slide change
				royalSlider.ev.on('rsBeforeAnimStart', function(event) {
					var currentSlide = royalSlider.currSlideId + 1;
					if(currentSlide < 10){
						$gallery_control.find('.js-gallery-current-slide .js-decimal').html('0');
						$gallery_control.find('.js-gallery-current-slide .js-unit').html(currentSlide);
					} else {
						$gallery_control.find('.js-gallery-current-slide .js-decimal').html(Math.floor(currentSlide / 10));
						$gallery_control.find('.js-gallery-current-slide .js-unit').html(currentSlide % 10);
					}
				});

				$gallery_control.on('click', '.js-slider-arrow-prev', function(event){
					event.preventDefault();
					royalSlider.prev();
				});

				$gallery_control.on('click', '.js-slider-arrow-next', function(event){
					event.preventDefault();
					royalSlider.next();
				});
			}

		var $frameHolderParent = null,
			$frameHolder	   = null;

		var $sliderObj = $(this);

		royalSlider.ev.on('rsVideoPlay', function() {

			if($('.single-gallery-fullscreen').length) {
				$html.addClass('video-active');
			}

			$frameHolder = $('.rsVideoFrameHolder');

			$frameHolder.height($sliderObj.height());
			$frameHolder.width($sliderObj.width());

			if($html.hasClass('no-touch') && $body.hasClass('single-gallery-fullscreen')) {
				$frameHolderParent = $frameHolder.parent();

				$frameHolder.appendTo( 'body' );
			}

		});

		royalSlider.ev.on('rsVideoStop', function() {
			if($('.single-gallery-fullscreen').length)
				$html.removeClass('video-active');

			$frameHolder.appendTo($frameHolderParent);
		});

	});

	// While watching a video in RoyalSlider on gallery fullscreen,
	// if directly navigating without stopping using RoyalSlider,
	// to allow the event written above ^ to take place,
	// the <html/> has the class .video-active, making the header transparent.
	// So it needs to be removed.
	if($html.hasClass('video-active')) $html.removeClass('video-active');
};
