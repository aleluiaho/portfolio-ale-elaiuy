/* === Functions that require jQuery but have no place on this Earth, yet === */

/* --- NICESCROLL INIT--- */
var debouncedResizeNiceScroll = debounce( niceScrollResize, 100 );
var smoothScroll = $body.data( 'smoothscrolling' ) !== undefined;

function niceScrollInit() {
	if (globalDebug) {console.log("NiceScroll - Init");}

	function observeMutations() {
		if ( window.MutationObserver ) {
			var config = { attributes: false, childList: true, subtree: true };
			var mutationObsrv = new window.MutationObserver( function() {
				debouncedResizeNiceScroll();
			} );
			mutationObsrv.observe( document.body, config );
		}
	}

	function observeResize() {
		if ( window.ResizeObserver ) {
			var resizeObsrv = new window.ResizeObserver( function() {
				debouncedResizeNiceScroll();
			} );
			var content = document.getElementById( 'main' );
			if ( !! content ) {
				resizeObsrv.observe( content );
			}
		}
	}

	if ( $( '.site-navigation' ).length ) {
		var offset = $( '.site-navigation' ).offset();
		mobile = offset.left > ww;
	}

	if ( smoothScroll && ! touch && ! is_OSX ) {

		niceScrollStart();

		$( window ).on( 'load', debouncedResizeNiceScroll );
		$( window ).on( 'djaxLoad', debouncedResizeNiceScroll );
		$( window ).on( 'resize', debouncedResizeNiceScroll );

		observeMutations();
		observeResize();

		niceScrollResize();
	}
}

function niceScrollResize() {

	if ( smoothScroll && ! touch && ! is_OSX ) {

		$( '[data-smoothscrolling]' ).getNiceScroll().resize();

		if ( ww < 901 ) {
			niceScrollHide();
		} else {
			niceScrollShow();
		}
	}
}

function niceScrollShow() {
	$html.addClass( 'nicescroll' );
	$( '[data-smoothscrolling]' ).getNiceScroll().show();
}

function niceScrollHide() {
	$html.removeClass( 'nicescroll' );
	$( '[data-smoothscrolling]' ).getNiceScroll().hide();
}

function niceScrollDestroy() {
	if( smoothScroll ) {
		$( '[data-smoothscrolling]' ).getNiceScroll().remove();
	}
}

function niceScrollStart() {
	$( '[data-smoothscrolling]' ).niceScroll( {
		zindex: 9999,
		cursoropacitymin: 0.3,
		cursorwidth: 7,
		cursorborder: 0,
		mousescrollstep: 40,
		scrollspeed: 100,
		cursorcolor: '#000000'
	} );
}

/* --- PROGRESSBAR INIT --- */

function progressbarInit() {
	if (globalDebug) {console.log("ProgressBar - Init");}

	var progressbar_shc = $('.progressbar');
	progressbar_shc.addClass('is-visible');
	if (progressbar_shc.length) {
		progressbar_shc.each(function() {
			var self = $(this).find('.progressbar__progress');
			self.css({'width': self.data('value')});
		});;
	}
}

/* --- $VIDEOS --- */

function initVideos() {
	if (globalDebug) {console.log("Videos - Init");}

	var videos = $('.video-wrap iframe, .entry__wrap iframe, video');

	// Figure out and save aspect ratio for each video
	videos.each(function() {
		$(this).data('aspectRatio', this.width / this.height)
			// and remove the hard coded width/height
			.removeAttr('height')
			.removeAttr('width');
	});

	// Firefox Opacity Video Hack
	$('.video-wrap iframe').each(function(){
		var url = $(this).attr("src");

		$(this).attr("src", setQueryParameter(url, "wmode", "transparent"));
	});
}


function resizeVideos() {

	var videos = $('.video-wrap iframe, .entry__wrap iframe, video');

	videos.each(function() {
		var video = $(this),
			ratio = video.data('aspectRatio'),
			w = video.css('width', '100%').width(),
			h = w/ratio;
		video.height(h);
	});
}

/* --- FOOTER VOODOO MAGIC --- */

function placeFooter() {

	var wh = $(window).height(),
		sh = $('.header .sidebar--header').height() || 0,
		hh = $('.site-header').outerHeight(true) || 0,
		fh = $('.site-footer').outerHeight(true) || 0;

	if (wh < hh + fh + sh) {
		$('.site-footer').css({
			"position": "static",
			"margin-left": 0
		});
	} else {
		$('.site-footer').css({
			"position": "",
			"margin-left": ""
		});
	}
}

/* --- DJAX CLEANUP - Do all the cleanup that is needed when going to another page with dJax --- */

function cleanupBeforeDJax() {
	if (globalDebug) {console.group("CleanUp before dJax");}

	/* --- KILL ROYALSLIDER ---*/
	var sliders = $('.js-pixslider');
	if (!empty(sliders)) {
		sliders.each(function() {
			var slider = $(this).data('royalSlider');
			slider.destroy();
		});
	}

	/* --- KILL MAGNIFIC POPUP ---*/
	//when hitting back or forward we need to make sure that there is no rezidual Magnific Popup
	$.magnificPopup.close(); // Close popup that is currently opened (shorthand)

	infiniteScrollingDestroy();
}

// here we change the link of the Edit button in the Admin Bar
// to make sure it reflects the current page
function adminBarEditFix(id, editString, taxonomy) {
	//get the admin ajax url and clean it
	var baseEditURL = ajaxurl.replace('admin-ajax.php','post.php'),
		baseExitTaxURL = ajaxurl.replace('admin-ajax.php','edit-tags.php'),
		$editButton = $('#wp-admin-bar-edit a');

	if ( !empty($editButton) ) {
		if ( id !== undefined && editString !== undefined ) { //modify the current Edit button
			if (!empty(taxonomy)) { //it seems we need to edit a taxonomy
				$editButton.attr('href', baseExitTaxURL + '?tag_ID=' + id + '&taxonomy=' + taxonomy + '&action=edit');
			} else {
				$editButton.attr('href', baseEditURL + '?post=' + id + '&action=edit');
			}
			$editButton.html(editString);
		} else { //we have found an edit button but right now we don't need it anymore since we have no id
			$('#wp-admin-bar-edit').remove();
		}
	} else { //upss ... no edit button
		//lets see if we need one
		if ( id !== undefined && editString !== undefined ) { //we do need one after all
			//locate the New button because we need to add stuff after it
			var $newButton = $('#wp-admin-bar-new-content');

			if (!empty($newButton)) {
				if (!empty(taxonomy)) { //it seems we need to generate a taxonomy edit thingy
					$newButton.after('<li id="wp-admin-bar-edit"><a class="ab-item dJAX_internal" href="' + baseExitTaxURL + '?tag_ID=' + id + '&taxonomy=' + taxonomy + '&action=edit">' + editString + '</a></li>');
				} else { //just a regular edit
					$newButton.after('<li id="wp-admin-bar-edit"><a class="ab-item dJAX_internal" href="' + baseEditURL + '?post=' + id + '&action=edit">' + editString + '</a></li>');
				}
			}
		}
	}
}

function copyrightOverlayAnimation(direction, x, y){
    switch (direction){
        case 'in':{
            if (globalDebug) {timestamp = ' [' + Date.now() + ']';console.log("Animate Copyright Overlay - IN"+timestamp);}

                    $('.copyright-overlay').css({top: y, left: x});
                    $body.addClass('is--active-copyright-overlay');
                    $('.copyright-overlay').fadeIn();

            break;
        }

        case 'out':{
            if (globalDebug) {timestamp = ' [' + Date.now() + ']';console.log("Animate Copyright Overlay - OUT"+timestamp);}

                    $('.copyright-overlay').fadeOut();
                    $body.removeClass('is--active-copyright-overlay');

            break;
        }

        default: break;
    }
}

function copyrightOverlayInit(){
    $(document).on('contextmenu', '.pixslider--gallery.js-pixslider, .mfp-container, .mosaic-wrapper, img, a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]', function(e){
        if( !empty($('.copyright-overlay'))){
            e.preventDefault();
            e.stopPropagation();

            copyrightOverlayAnimation('in', e.clientX, e.clientY);
        }
    });

	$('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]').bind('click', function(e){
		if (e.ctrlKey || e.metaKey){
			e.preventDefault();
			e.stopPropagation();

			copyrightOverlayAnimation('in', e.clientX, e.clientY);
		}
	});

    $(document).on('mousedown', function(){
        if($body.hasClass('is--active-copyright-overlay'))
            copyrightOverlayAnimation('out');
    });
}

function checkIfSiteBrandingFits() {
	checkIfSiteTitleFits();
	checkIfSiteLogoFits();
}

function checkIfSiteTitleFits() {
	var $logo = $( '.site-logo--text' );
	var $text = $logo.find( '.site-home-link span' );

	if ( $logo.length && $text.length ) {
		$text.css({
			display: '',
			fontSize: '',
		});

		var logoWidth = $logo.width();
		var textWidth = $text.outerWidth();

		if ( textWidth > logoWidth ) {
			var fontSize = parseInt( $text.css( 'fontSize' ), 10 );
			var newFontSize = fontSize * logoWidth / textWidth;
			$text.css({
				display: 'block',
				fontSize: newFontSize,
			});
		}
	}
}

function checkIfSiteLogoFits() {
	var $logo = $( '.site-logo--image' );
	var $image = $logo.find( 'img' );

	if ( $logo.length && $image.length ) {
		$image.css({
			width: '',
			height: ''
		});

		var imageWidth = $image.width();
		var imageHeight = $image.height();
		var logoWidth = $logo.width();

		if ( imageWidth > logoWidth ) {
			$image.css({
				width: logoWidth,
				height: imageHeight * logoWidth / imageWidth
			});
		}
	}
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
