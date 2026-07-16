
/* ====== INITIALIZE ====== */
function initializeDjax() {
	/* INSTANTIATE DJAX */
	if ($body.data('ajaxloading') !== undefined) {

		var djax_transition = function($newEl) {
			if (globalDebug) {console.group("djax Transition");}

			var $oldEl = this;
			$oldEl.replaceWith($newEl);
			// we should make sure initial transition ended

			$html.removeClass('is--gallery-fullscreen');
			$html.removeClass('is--gallery-grid');

			if(!empty($newEl.find('.pixslider--gallery-fs'))){
				$html.addClass('is--gallery-fullscreen');
			}

			if(!empty($newEl.find('.gallery-grid'))){
				$html.addClass('is--gallery-grid');
			}

			setTimeout(function() {
				$html.removeClass('loading');
			});

			// when the main content is updated
			if ( $newEl.attr('id') === 'main' ) {
				$(document).trigger('mini_cart_handle');
			}

			if (globalDebug) {console.groupEnd();}
		};

		$('.dJAX_internal').off('click').removeClass('.dJAX_internal');
		$(window).unbind('popstate');

		var ignored_links = ['.pdf','.doc','.eps','.png','.zip','admin','wp-','wp-admin','feed','#', '?lang=', '&lang=', '&add-to-cart=', '?add-to-cart=', '?remove_item'];

		// djax_ignored_links is localized in /inc/functions/callbacks/woocommerce.php
		// if there are localized ignored links, add them
		if ( typeof djax_ignored_links === "object" ) {
			ignored_links = ignored_links.concat( djax_ignored_links );
		}

		$body.djax('.djax-updatable', ignored_links, djax_transition);
	}
}

function init() {
	if (globalDebug) {console.group("Init");}

	/* GLOBAL VARS */
	touch = false;

	/* GET BROWSER DIMENSIONS */
	browserSize();

	/* DETECT PLATFORM */
	platformDetect();

	initializeDjax();

	placeFooter();

	if (is_android || window.opera) {
		$html.addClass('android-browser').removeClass('no-android-browser');
	}

	var is_retina = (window.retina || window.devicePixelRatio > 1);

	if (is_retina && $('.site-logo--image-2x').length) {
		var image = $('.site-logo--image-2x').find('img');

		if (image.data('logo2x') !== undefined) {
			image.attr('src', image.data('logo2x'));
		}
	}

    $html.addClass('loaded');

	if(!empty($('.pixslider--gallery-fs'))) {
		$html.addClass('is--gallery-fullscreen');
	}

	if(!empty($('.gallery-grid'))){
		$html.addClass('is--gallery-grid');
	}

	/* ONE TIME EVENT HANDLERS */
	eventHandlersOnce();

	/* INSTANTIATE EVENT HANDLERS */
	eventHandlers();

	if (globalDebug) {console.groupEnd();}
};

/* ====== CONDITIONAL LOADING ====== */

function loadUp() {
	if (globalDebug) {console.group("LoadUp");}

	// always
	niceScrollInit();
	initVideos();
	resizeVideos();
	progressbarInit();

	//Set textarea from contact page to autoresize
	if($("textarea").length) { $("textarea").autosize(); }

	// if blog archive
	if ($('.masonry').length && !lteie9 && !is_android) {
		salvattoreStart();
	}

	// royal slider must initialize after salavottre
	// for the layout to show up properly
	royalSliderInit();

	// if gallery
	magnificPopupInit();

	// if gallery grid or portfolio
	mosaicInit();

	// if contact
	$gmap = $('#gmap');
	gmapInit();
	debouncedResizeNiceScroll();

	$(".pixcode-tabs").tab();

	$('.pixcode--tabs__nav li').on('click', function() {
		// Search for a slider in tabs and force its
		// resize when switching between tabs because
		// it would have a height of 0
		var $that = $(this);
		var $theSlider = $that.closest('.pixcode--tabs').find(".js-pixslider");
		if( $theSlider.length != 0 ) {
			setTimeout(function () {
				$theSlider.data('royalSlider').updateSliderSize("true");
			}, 10);
		}
	});

	checkIfSiteBrandingFits();

	/* --- ANIMATE STUFF IN --- */
	animateGallery('in');
	animateBlog('in');

	gmapTouchable();

	if (globalDebug) {console.groupEnd();}
}


/* ====== EVENT HANDLERS ====== */

function eventHandlersOnce() {
	if (globalDebug) {console.group("Event Handlers Once");}

	// $('.js-nav-trigger').on('click', function(e) {
	//        var hh = $('.header').height(),
	//            ch = $('.navigation--mobile').height(),
	//            max = Math.max(wh,ch,hh);
	//            // console.log(max);
	//        if ($html.hasClass('navigation--is-visible')) {
	//            $('#page').css({'height': ''});
	//        } else {
	//            $('#page').css({'height': max});
	//        }

	//        $html.toggleClass('navigation--is-visible');
	//    });

	var windowHeigth = $(window).height();

	$('.js-nav-trigger').on('click touchstart', function(e) {
		e.preventDefault();
		e.stopPropagation();

		if($html.hasClass('navigation--is-visible')){
			$('#page').css('height', '');
			$html.removeClass('navigation--is-visible');

		} else {
			$('#page').height(windowHeigth);
			$html.addClass('navigation--is-visible');
		}
	});

	$('.wrapper').on('click', function(e) {
		if ($html.hasClass('navigation--is-visible')) {

			e.preventDefault();
			e.stopPropagation();

			$('#page').css('height', '');
			$html.removeClass('navigation--is-visible');
		}
	});

    copyrightOverlayInit();

	// Loads the addThis script - this should be run just once
	loadAddThisScript();


//	if (typeof once_woocommerce_events_handlers == 'function') {
//		once_woocommerce_events_handlers();
//	}

	if (globalDebug) {console.groupEnd();}
};


function likeBoxAnimation(){
	$(document).on('click', '.can_like .like-link', function(e){
		e.preventDefault();
		var $iElem = $(this).find('i');
		$iElem.addClass('animate-like').delay(1000).queue(function(){$(this).addClass('like-complete');});
		// $(this).addClass('animate-like');
	});
}


/* --- GLOBAL EVENT HANDLERS --- */

function magnificPrev(e) {
	if (globalDebug) {console.log("Magnific Popup Prev");}

	e.preventDefault();
	var magnificPopup = $.magnificPopup.instance;
	magnificPopup.prev();
	return false;
}

function magnificNext(e) {
	if (globalDebug) {console.log("Magnific Popup Next");}

	e.preventDefault();
	var magnificPopup = $.magnificPopup.instance;
	magnificPopup.next();
	return false;
}

$(window).bind('beforeunload', function(event) {
	if (globalDebug) {console.log("ON BEFORE UNLOAD");}

//	event.stopPropagation();

//	animateBlog('out');
});

function eventHandlers() {
	if (globalDebug) {console.group("Event Handlers");}
	/*
	 * Woocommerce Events support
	 * */
	$( function() {
		if ( typeof wc_add_to_cart_variation_params !== 'undefined' ) {
			$( '.variations_form' ).each( function() {
				$( this ).wc_variation_form().find('.variations select:eq(0)').change();
			});
		}
	});

	if (typeof woocommerce_events_handlers == 'function') {
		woocommerce_events_handlers();
		// needed for the floating ajax cart
		$body.trigger('added_to_cart');
	}

	$body.off('click', '.js-arrow-popup-prev', magnificPrev).on('click', '.js-arrow-popup-prev', magnificPrev);
	$body.off('click', '.js-arrow-popup-next', magnificNext).on('click', '.js-arrow-popup-next', magnificNext);

	/* @todo: change classes so style and js don't interfere */
	$('.menu-item--parent').hoverIntent({
		over: function() {
			$(this).addClass('js--is-active');
			$(this).children('.site-navigation__sub-menu').slideDown(200, 'easeInOutSine', function(){
				placeFooter();
			});
		},
		out: function() {
			if(!($(this).hasClass('current-menu-item')) &&
				!($(this).hasClass('current-menu-ancestor')) &&
				!($(this).hasClass('current-menu-parent'))){
				$(this).removeClass('js--is-active');
				$(this).children('.site-navigation__sub-menu').slideUp(200, 'easeInOutSine');
			}
		},
		timeout: 1000
	});


	likeBoxAnimation();

	let filterHandler;

	if(touch) {
		filterHandler = 'click';
	} else {
		filterHandler = 'mouseenter mouseleave';
	}

	if(ieMobile) filterHandler = 'click';

	$('.sticky-button__btn').on(filterHandler, function(){
		$(this).toggleClass('sticky-button--active');
	});

	$('.cart__btn1').on(filterHandler, function(){
		$(this).toggleClass('cart--active');
	});

	addThisInit();

	if (globalDebug) {console.groupEnd();}
};



/* ====== ON DOCU READY ====== */

$(function(){
	if (globalDebug) {console.group("OnDocumentReady");}

	/* --- INITIALIZE --- */

	init();

	/* --- CONDITIONAL LOADING --- */

	loadUp();

	/* --- VISUAL LOADING --- */


	if (globalDebug) {console.groupEnd();}
});





/* --- $LAZY LOADING INIT --- */

/**
 *
 * When an image finished loaded add class to parent for
 * the image to fade in
 *
 **/
function lazyLoad() {

	var $images = $( '.js-lazy-load' ).filter( function( index, obj ) {
		var $img = $( obj );
		var src = $img.data( 'src' );

		return typeof src !== "undefined";
	} );

	$images.each( function( i, obj ) {

		var $img = $( obj ),
			src = $img.attr( 'data-src' );

		$img.attr( 'src', src );

		$img.imagesLoaded( function( instance, image ) {
			$img.closest( '.mosaic__item' ).addClass( 'js--is-loaded' );
			$img.removeData( 'src' );
		} );

	} );
};



/* ====== ON WINDOW LOAD ====== */

$(window).on('load', function(){
	if (globalDebug) {console.group("OnWindowLoad");}

	lazyLoad();

	$html.removeClass('loading');

	if (globalDebug) {console.groupEnd();}
});


/* --- Animation Functions --- */

function animateGallery(direction) {
	if (globalDebug) {console.log("Animate Gallery " + direction);}

	direction = direction == "in" ? direction : "out";

	$('.mosaic__item').each(function(){
		var $item = $(this);
		setTimeout(function() {
			$item.addClass('slide-' + direction);
		}, 80 * Math.floor((Math.random()*5)+1));
	});

}


function animateBlog(direction) {
	if (globalDebug) {console.log("Animate Blog " + direction);}

	if (!is_android) {

		direction = direction == "in" ? direction : "out";

		var sizes = new Array();
		var columns = new Array();
		var items = $('.masonry .span .masonry__item').length;

		$('.masonry .span').each(function(i, e){
			columns[i] = $(this).children('.masonry__item');
			sizes[i] = columns[i].length;
		});

		var max = Math.max.apply(null, sizes);

		for (var item = 0; item < max; item++) {

			$(columns).each(function(column) {

				if (columns[column][item] !== undefined) {

					if (direction == "in") {

						var $item = $(columns[column][item]),
							timeout = item * columns.length + column;

						setTimeout(function() {
							$item.addClass('is-loaded');
						}, 100 * timeout);

					} else {

						var $item = $(columns[column][item]),
							timeout = items - (item * columns.length + column);

						setTimeout(function() {
							$item.removeClass('is-loaded');
						}, 100 * timeout);
					}
				}
			});
		}
	}
}





/* ====== ON DJAX REQUEST ====== */

$(window).bind('djaxClick', function(e, data) {
	if (globalDebug) {console.group("On-dJaxClick");}

    $html.removeClass('noanims');

	$html.addClass('loading');
	$('html, body').animate({scrollTop: 0}, 300);

	if ($html.hasClass('navigation--is-visible')) {
		$('#page').css({'height': ''});
		$html.removeClass('navigation--is-visible');
		// $(window).trigger('resize');
	}

	/* --- ANIMATE STUFF OUT --- */
	animateGallery('out');
	animateBlog('out');

	if($('.rsVideoFrameHolder').length) $('.rsVideoFrameHolder').remove();

	if (globalDebug) {console.groupEnd();}
});





/* ====== ON DJAX LOAD ====== */

$(window).bind('djaxLoad', function(e, data) {
	if (globalDebug) {console.group("On-dJaxLoad");}

	// get data and replace the body tag with a nobody tag
	// because jquery strips the body tag when creating objects from data
	data = data.response.replace(/(<\/?)body( .+?)?>/gi,'$1NOTBODY$2>', data);
	// get the nobody tag's classes
	var nobodyClass = $(data).filter('notbody').attr("class");
	// set it to current body tag
	$body.attr("class", nobodyClass);
	// let the party begin
	$html.removeClass('loading');

    setTimeout(function(){
        $html.addClass('noanims');
    }, 700);

	// progressbars ?

	eventHandlers();

	browserSize();
	resizeVideos();

	lazyLoad();
	loadUp();

	//need to get the id and edit string from the data attributes
	var curPostID = $(data).filter('notbody').data("curpostid"),
		curPostTax = $(data).filter('notbody').data("curtaxonomy"),
		curPostEditString = $(data).filter('notbody').data("curpostedit");

	adminBarEditFix(curPostID, curPostEditString, curPostTax);

	//lets do some Google Analytics Tracking
	if (window._gaq) {
		_gaq.push(['_trackPageview']);
	}

	if (globalDebug) {console.groupEnd();}
});




// /* ====== ON DJAX LOADING!!! ====== */

$(window).bind('djaxLoading', function(e, data) {
	if (globalDebug) {console.group("On-dJaxLoading");}

	cleanupBeforeDJax();

	if (globalDebug) {console.groupEnd();}
});




/* ====== ON RESIZE ====== */

$( window ).on( "debouncedresize", function( e ) {
	if ( globalDebug ) {
		console.group( "OnResize" );
	}

	browserSize();
	resizeVideos();
	placeFooter();

	gmapTouchable();
	checkIfSiteBrandingFits();

	if ( globalDebug ) {
		console.groupEnd();
	}
} );






/* ====== ON SCROLL ======  */

$(window).scroll(function(e){


	if ($('.entry__likes').length) {

		var likes = $('.entry__likes'),
			likesOffset = likes.offset(),
			likesh = likes.height(),
			likesTop = likesOffset.top,
			likesBottom = likesTop + likesh,
			post = $('.post .entry__wrap'),
			posth = post.height(),
			postOffset = post.offset(),
			postTop = postOffset.top,
			postBottom = postTop + posth,
			scroll = $body.scrollTop();

		if (ww > 1599) {

			// hacky way to get scroll consisten in chrome / firefox
			if (scroll == 0) scroll = $html.scrollTop();

			// if scrolled past the top of the container but not below the bottom of it
			if (scroll > postTop && scroll + likesh < postBottom) {

				// insert after content for fixed position to work properly
				// set left value to the box's initial left offset
				likes.insertAfter('.content').css({
					position: 'fixed',
					top: 0,
					left: likesOffset.left
				});

				// the box should follow scroll anymore
			} else {

				// we are below the container's bottom
				// so we have to move to box back up while scrolling down
				if (scroll + likesh > postBottom) {

					likes.insertAfter('.content').css({
						top: postBottom - scroll - likesh
					});

					// we are back up so we must put the box back in it's place
				} else {

					likes.prependTo('.entry__wrap').css({
						position: '',
						top: 0,
						left: ''
					});

				}
			}

		} else {

			// make sure that the box is in it's lace when resizing the browser
			likes.prependTo('.entry__wrap').css({
				position: '',
				top: 0,
				left: ''
			});

		}
	}
});
