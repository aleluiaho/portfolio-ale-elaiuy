
/* --- MOSAIC INIT --- */


//global mosaic variables
var $mosaic_container,
	max_mosaic_pages,
	is_everything_loaded,
	mosaic_page_counter;

function mosaicInit() {
	if (globalDebug) {console.log("Mosaic - Init");}

	//initialize global variables
	$mosaic_container = $('.mosaic');

	if ( !empty($mosaic_container)) {
		max_mosaic_pages = $mosaic_container.data('maxpages');
		is_everything_loaded = false;
	}

	mixitUpRun();

	//force the infinite scroll to wait for the first images to lead before doing it's thing
	if ($mosaic_container.hasClass('infinite_scroll')) {
//		$mosaic_container.imagesLoaded(function(){
		mosaicInfiniteScrollingInit($mosaic_container);
//		});
	}

	// Call Direction Aware Hover Effect
	if(!touch) {
		$('.mosaic__item .image_item-meta--portfolio .image_item-table').each(function() {
			$(this).hoverdir();
		});
	}
}

/* --- Mosaic Update --- */

function mosaicUpdateLayout() {
	if (globalDebug) {console.log("Mosaic Update Layout");}

	if ( !empty($mosaic_container) && $mosaic_container.length ) {
		$mosaic_container.isotope( 'layout');
	}
}

/* --- Mosaic Destroy --- */

function mosaicDestroy() {
	if (globalDebug) {console.log("Mosaic Destroy");}

	if ( !empty($mosaic_container) && $mosaic_container.length ) {
		$mosaic_container.isotope( 'destroy');
	}
}


/* --- Layout Refresh --- */

function layoutRefresh() {
	if (globalDebug) {console.log("Mosaic Layout Refresh");}

	mosaicUpdateLayout();
}

/* --- MixitUp Run --- */

function mixitUpRun() {
	if (!empty($mosaic_container) && $mosaic_container.length) {
		if (globalDebug) {console.log("Mosaic Initialization (mixitUpRun)");}
		// MixitUp init
		$mosaic_container.mixitup({
			targetSelector: '.mosaic__item',
			filterSelector: '.mosaic__filter-item',
			sortSelector: '.mosaic__sort-item',
			effects: ['fade','scale'],
			easing: 'snap',
			transitionSpeed: 850
		});

		//Mixitup 2 config
//		$mosaic_container.mixItUp({
//			selectors: {
//				target: '.mosaic__item',
//				filter: '.mosaic__filter-item'
//			},
//			animation:  {
//				enable: true,
//				effects: 'fade scale',
//				easing: 'snap',
//				duration: 850
//			}
//
//		});

	}
}

/* -- Mosaic Infinite Scrolling Initialization --- */

function mosaicInfiniteScrollingInit($container) {
	if (globalDebug) {console.log("Mosaic Infinite Scroll Init");}

	max_mosaic_pages = $container.data('maxpages');
	mosaic_page_counter = 1;

	$container.infinitescroll({
			navSelector  : '.mosaic__pagination',    // selector for the paged navigation
			nextSelector : '.mosaic__pagination a.next',  // selector for the NEXT link
			itemSelector : '.mosaic__item',     // selector for all items you'll retrieve
			loading: {
				finished: undefined,
				finishedMsg: '',
				img: '',
				msg: null,
				msgText: '',
				selector: null,
				speed: 'fast',
				start: undefined
			},
			debug: globalDebug,
			//animate      : true,
			//extraScrollPx: 500,
			prefill: true,
			maxPage: max_mosaic_pages,
			errorCallback: function(){
				$html.removeClass('loading');
			},
			startCallback: function(){
				$html.addClass('loading');
			}
			// called when a requested page 404's or when there is no more content
			// new in 1.2
		},
		// a callback when all is fetched
		function( newElements ) {

			var $newElems = $( newElements );

			initializeDjax();

			//refresh all there is to refresh
			infiniteScrollingRefreshComponents($container);

			if (globalDebug) {console.log("Mosaic Infinite Scroll - Adding new "+$newElems.length+" items to the DOM");}

			if (globalDebug) {console.log("Mosaic Infinite Scroll Loaded Next Page");}

			mosaic_page_counter++;

			if (mosaic_page_counter == max_mosaic_pages) {
				$('.load-more__container').fadeOut('slow');
			} else {
				$('.load-more__container .load-more__button').removeClass('loading');
			}

			$html.removeClass('loading');
		});

	if ($container.hasClass('infinite_scroll_with_button')) {
		infiniteScrollingOnClick($container);
	}
}

function infiniteScrollingOnClick($container) {
	if (globalDebug) {console.log("Infinite Scroll Init - ON CLICK");}

	// unbind normal behavior. needs to occur after normal infinite scroll setup.
	$(window).unbind('.infscr');

	$('.load-more__container .load-more__button').click(function(){

		$html.addClass('loading');

		$container.infinitescroll('retrieve');

		return false;
	});

	// remove the paginator when we're done.
	$(document).ajaxError(function(e,xhr,opt){
		if (xhr.status == 404) {
			$('.load-more__container').fadeOut('slow');
		}
	});
}

//in case you need to control infinitescroll
function infiniteScrollingPause() {
	if (globalDebug) {console.log("Infinite Scroll Pause");}

	$mosaic_container.infinitescroll('pause');
}
function infiniteScrollingResume() {
	if (globalDebug) {console.log("Infinite Scroll Resume");}

	$mosaic_container.infinitescroll('resume');
}
function infiniteScrollingDestroy() {
	if (globalDebug) {console.log("Infinite Scroll Destroy");}

	$mosaic_container.infinitescroll('destroy');
}

function infiniteScrollingRefreshComponents($container) {
	if (globalDebug) {console.log("Infinite Scroll - Refresh Components");}

	lazyLoad();

	mixitUpRun();

	// Call Direction Aware Hover Effect
	if(!touch) {
		$('.mosaic__item .image_item-meta--portfolio .image_item-table').each(function() {
			$(this).hoverdir();
		});
	}

	animateGallery('in');
}
