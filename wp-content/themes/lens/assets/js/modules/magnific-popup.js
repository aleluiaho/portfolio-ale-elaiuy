
/* --- Magnific Popup Initialization --- */

function magnificPopupInit() {
	if (globalDebug) {console.log("Magnific Popup - Init");}

	$('.js-gallery').each(function() { // the containers for all your galleries should have the class gallery
		$(this).magnificPopup({
			delegate: '.mosaic__item.magnific-link a, .masonry__item--image__container a', // the container for each your gallery items
			removalDelay: 500,
			mainClass: 'mfp-fade',
			image: {
				titleSrc: function (item){
					var output = '';
					if ( typeof item.el.attr('data-title') !== "undefined" && item.el.attr('data-title') !== "") {
						output = item.el.attr('data-title');
					}
					if ( typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
						output += '<small>'+item.el.attr('data-alt')+'</small>';
					}
					return output;
				}
			},
			iframe: {
				markup:
					'<div class="mfp-figure mfp-figure--video">'+
						'<button class="mfp-close"></button>'+
						'<div>'+
						'<div class="mfp-iframe-scaler">'+
						'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						'</div>'+
						'</div>'+
						'<div class="mfp-bottom-bar">'+
						'<div class="mfp-title mfp-title--video"></div>'+
						'<div class="mfp-counter"></div>'+
						'</div>'+
						'</div>',
				patterns: {
					youtube: {
						index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
						id: function(url){
							var video_id = url.split('v=')[1];
							var ampersandPosition = video_id.indexOf('&');
							if(ampersandPosition != -1) {
								video_id = video_id.substring(0, ampersandPosition);
							}

							return video_id;
						}, // String that splits URL in a two parts, second part should be %id%
						// Or null - full URL will be returned
						// Or a function that should return %id%, for example:
						// id: function(url) { return 'parsed id'; }
						src: '//www.youtube.com/embed/%id%' // URL that will be set as a source for iframe.
					},
					youtu_be: {
						index: 'youtu.be/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
						id: '.be/', // String that splits URL in a two parts, second part should be %id%
						// Or null - full URL will be returned
						// Or a function that should return %id%, for example:
						// id: function(url) { return 'parsed id'; }
						src: '//www.youtube.com/embed/%id%' // URL that will be set as a source for iframe.
					},

					vimeo: {
						index: 'vimeo.com/',
						id: '/',
						src: '//player.vimeo.com/video/%id%'
					},
					gmaps: {
						index: '//maps.google.',
						src: '%id%&output=embed'
					}
					// you may add here more sources
				},
				srcAction: 'iframe_src' // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
			},
			gallery:{
				enabled:true,
				navigateByImgClick: true,
				// arrowMarkup: '<a href="#" class="mfp-arrow mfp-arrow-%dir% control-item arrow-button arrow-button--%dir%"></a>',
				tPrev: 'Previous (Left arrow key)', // title for left button
				tNext: 'Next (Right arrow key)', // title for right button
				// tCounter: '<div class="gallery-control gallery-control--popup"><div class="control-item count js-gallery-current-slide"><span class="js-unit">%curr%</span><sup class="js-gallery-slides-total">%total%</sup></div></div>'
				tCounter: '<div class="gallery-control gallery-control--popup"><a href="#" class="control-item arrow-button arrow-button--left js-arrow-popup-prev"></a><div class="control-item count js-gallery-current-slide"><span class="js-unit">%curr%</span><sup class="js-gallery-slides-total">%total%</sup></div><a href="#" class="control-item arrow-button arrow-button--right js-arrow-popup-next"></a></div>'
			},
			callbacks:{
				elementParse: function(item) {
					$(item).find('iframe').each(function(){
						var url = $(this).attr("src");
						$(this).attr("src", setQueryParameter(url, "wmode", "transparent"));
					});

					if(this.currItem != undefined){
						item = this.currItem;
					}

					var output = '';
					if ( typeof item.el.attr('data-title') !== "undefined" && item.el.attr('data-title') !== "") {
						output = item.el.attr('data-title');
					}
					if ( typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
						output += '<small>'+item.el.attr('data-alt')+'</small>';
					}

					$('.mfp-title--video').html(output);
				},
				change: function(item) {
					$(this.content).find('iframe').each(function(){
						var url = $(this).attr("src");
						$(this).attr("src", setQueryParameter(url, "wmode", "transparent"));
					});

					var output = '';
					if ( typeof item.el.attr('data-title') !== "undefined" && item.el.attr('data-title') !== "") {
						output = item.el.attr('data-title');
					}
					if ( typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
						output += '<small>'+item.el.attr('data-alt')+'</small>';
					}

					$('.mfp-title--video').html(output);
				},
				open: function() {
					niceScrollDestroy();
				},
				close: function() {
					if ( smoothScroll && ! touch && ! is_OSX ) {
						niceScrollStart();
					}
				},
			}
		});
	});

	// hide title on hover over images so we don't have that ugly tooltip
	// replace when hover leaves
	var tempGalleryTitle = '';
	$('.js-gallery a').hover(
		function () {
			tempGalleryTitle = $(this).attr('title');
			$(this).attr({'title':''});
		},
		function () {
			$(this).attr({'title':tempGalleryTitle});
		}
	);

	$('.js-project-gallery').each(function() { // the containers for all your galleries should have the class gallery
		$(this).magnificPopup({
			delegate: 'a[href$=".jpg"], a[href$=".png"], a[href$=".gif"], .mfp-iframe', // the container for each your gallery items
			type: 'image',
			removalDelay: 500,
			mainClass: 'mfp-fade',
			image: {
				titleSrc: function (item){
					var output = '';
					if ( typeof item.el.attr('data-title') !== "undefined" && item.el.attr('data-title') !== "") {
						output = item.el.attr('data-title');
					}
					if ( typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
						output += '<small>'+item.el.attr('data-alt')+'</small>';
					}
					return output;
				}
			},
			iframe: {
				markup:
					'<div class="mfp-figure mfp-figure--video">'+
						'<div>'+
						'<div class="mfp-close"></div>'+
						'<div class="mfp-iframe-scaler">'+
						'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						'</div>'+
						'</div>'+
						'<div class="mfp-bottom-bar">'+
						'<div class="mfp-title mfp-title--video"></div>'+
						'<div class="mfp-counter"></div>'+
						'</div>'+
						'</div>',
				patterns: {
					youtube: {
						index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
						id: 'v=', // String that splits URL in a two parts, second part should be %id%
						// Or null - full URL will be returned
						// Or a function that should return %id%, for example:
						// id: function(url) { return 'parsed id'; }
						src: '//www.youtube.com/embed/%id%' // URL that will be set as a source for iframe.
					},
					vimeo: {
						index: 'vimeo.com/',
						id: '/',
						src: '//player.vimeo.com/video/%id%'
					},
					gmaps: {
						index: '//maps.google.',
						src: '%id%&output=embed'
					}
					// you may add here more sources
				},
				srcAction: 'iframe_src' // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
			},
			gallery:{
				enabled:true,
				navigateByImgClick: true,
				tPrev: 'Previous (Left arrow key)', // title for left button
				tNext: 'Next (Right arrow key)', // title for right button
				tCounter: '<div class="gallery-control gallery-control--popup"><a href="#" class="control-item arrow-button arrow-button--left js-arrow-popup-prev"></a><div class="control-item count js-gallery-current-slide"><span class="js-unit">%curr%</span><sup class="js-gallery-slides-total">%total%</sup></div><a href="#" class="control-item arrow-button arrow-button--right js-arrow-popup-next"></a></div>'
			},
			callbacks:{
				elementParse: function(item) {
					$(item).find('iframe').each(function(){
						var url = $(this).attr("src");
						$(this).attr("src", url+"?wmode=transparent");
					});

					if(this.currItem != undefined){
						item = this.currItem;
					}

					var output = '';
					if ( typeof item.el.attr('data-title') !== "undefined" && item.el.attr('data-title') !== "") {
						output = item.el.attr('data-title');
					}
					if ( typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
						output += '<small>'+item.el.attr('data-alt')+'</small>';
					}

					$('.mfp-title--video').html(output);
				},
				change: function(item) {
					$(this.content).find('iframe').each(function(){
						var url = $(this).attr("src");
						$(this).attr("src", url+"?wmode=transparent");
					});

					var output = '';
					if ( typeof item.el.attr('data-title') !== "undefined" && item.el.attr('data-title') !== "") {
						output = item.el.attr('data-title');
					}
					if ( typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
						output += '<small>'+item.el.attr('data-alt')+'</small>';
					}

					$('.mfp-title--video').html(output);
				}
			}
		});
	});

	//Magnific Popup for any other <a> tag that links to an image
	function blog_posts_popup(e) {
		if (jQuery().magnificPopup) {
			e.magnificPopup({
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				removalDelay: 500,
				mainClass: 'mfp-fade',
				image: {
					titleSrc: function (item){
						var output = '';
						if ( typeof item.el.attr('data-title') !== "undefined" && item.el.attr('data-title') !== "") {
							output = item.el.attr('data-title');
						}
						if ( typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
							output += '<small>'+item.el.attr('data-alt')+'</small>';
						}
						return output;
					}
				},
				gallery: {
					enabled:true,
					navigateByImgClick: true,
					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<div class="gallery-control gallery-control--popup"><a href="#" class="control-item arrow-button arrow-button--left js-arrow-popup-prev"></a><div class="control-item count js-gallery-current-slide"><span class="js-unit">%curr%</span><sup class="js-gallery-slides-total">%total%</sup></div><a href="#" class="control-item arrow-button arrow-button--right js-arrow-popup-next"></a></div>'
				},
				callbacks:{
					elementParse: function(item) {
						$(item).find('iframe').each(function(){
							var url = $(this).attr("src");
							$(this).attr("src", url+"?wmode=transparent");
						});

						if(this.currItem != undefined){
							item = this.currItem;
						}

						var output = '';
						if ( typeof item.el.attr('data-title') !== "undefined" && item.el.attr('data-title') !== "") {
							output = item.el.attr('data-title');
						}
						if ( typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
							output += '<small>'+item.el.attr('data-alt')+'</small>';
						}

						$('.mfp-title--video').html(output);
					},
					change: function(item) {
						$(this.content).find('iframe').each(function(){
							var url = $(this).attr("src");
							$(this).attr("src", url+"?wmode=transparent");
						});

						var output = '';
						if ( typeof item.el.attr('data-title') !== "undefined" && item.el.attr('data-title') !== "") {
							output = item.el.attr('data-title');
						}
						if ( typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
							output += '<small>'+item.el.attr('data-alt')+'</small>';
						}

						$('.mfp-title--video').html(output);
					}
				}
			});
		}
	}

	var blog_posts_images = $('.post a[href$=".jpg"], .post a[href$=".png"], .post a[href$=".gif"], .page a[href$=".jpg"], .page a[href$=".png"], .page a[href$=".gif"]');
	if(blog_posts_images.length) { blog_posts_popup(blog_posts_images); }

	$('.popup-video').magnificPopup({
		type: 'iframe',
		closeOnContentClick: false,
		closeBtnInside: false,
		removalDelay: 500,
		mainClass: 'mfp-fade',

		iframe: {
			markup:
				'<div class="mfp-figure mfp-figure--video">'+
					'<div>'+
					'<div class="mfp-close"></div>'+
					'<div class="mfp-iframe-scaler">'+
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					'</div>'+
					'</div>'+
					'<div class="mfp-bottom-bar">'+
					'<div class="mfp-title mfp-title--video"></div>'+
					'<div class="mfp-counter"></div>'+
					'</div>'+
					'</div>',
			patterns: {
				youtube: {
					index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
					id: 'v=', // String that splits URL in a two parts, second part should be %id%
					// Or null - full URL will be returned
					// Or a function that should return %id%, for example:
					// id: function(url) { return 'parsed id'; }
					src: '//www.youtube.com/embed/%id%' // URL that will be set as a source for iframe.
				},
				vimeo: {
					index: 'vimeo.com/',
					id: '/',
					src: '//player.vimeo.com/video/%id%'
				},
				gmaps: {
					index: '//maps.google.',
					src: '%id%&output=embed'
				}
				// you may add here more sources
			},
			srcAction: 'iframe_src' // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
		},
		callbacks:{
//			elementParse: function(item) {
//				$(item).find('iframe').each(function(){
//					var url = $(this).attr("src");
//					$(this).attr("src", url+"?wmode=transparent");
//				});
//
//				if(this.currItem != undefined){
//					item = this.currItem;
//				}
//
//				var output = '';
//				var $image = $(item.el).children("img:first");
//				if ($image.length) {
//					if ( typeof $image.attr('title') !== "undefined" && $image.attr('title') !== "") {
//						output = $image.attr('title');
//					}
//					if ( typeof $image.attr('alt') !== "undefined" && $image.attr('alt') !== "") {
//						output += '<small>'+$image.attr('alt')+'</small>';
//					}
//				}
//
//				$('.mfp-title--video').html(output);
//			},
//			change: function(item) {
//				$(this.content).find('iframe').each(function(){
//					var url = $(this).attr("src");
//					$(this).attr("src", url+"?wmode=transparent");
//				});
//
//				var output = '';
//				if ( typeof item.el.attr('data-title') !== "undefined" && item.el.attr('data-title') !== "") {
//					output = item.el.attr('data-title');
//				}
//				if ( typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
//					output += '<small>'+item.el.attr('data-alt')+'</small>';
//				}
//
//				$('.mfp-title--video').html(output);
//			}
		}
	});

	// hide title on hover over images so we don't have that ugly tooltip
	// replace when hover leaves
	var tempProjectTitle = '';
	$('.js-project-gallery a').hover(
		function () {
			tempProjectTitle = $(this).attr('title');
			$(this).attr({'title':''});
		},
		function () {
			$(this).attr({'title':tempProjectTitle});
		}
	);

	//for the PixProof galleries in case they are used
	$('.js-pixproof-lens-gallery').each(function() { // the containers for all your galleries should have the class gallery
		$(this).magnificPopup({
			delegate: 'a.zoom-action', // the container for each your gallery items
			type: 'image',
			mainClass: 'mfp-fade',
			closeOnBgClick: false,
			image: {
				markup: '<button class="mfp-close">x</button>'+
					'<div class="mfp-figure">'+
					'<div class="mfp-img"></div>'+
					'</div>'+
					'<div class="mfp-bottom-bar">'+
					'<div class="mfp-title"></div>'+
					'<div class="mfp-counter"></div>'+
					'</div>',
				titleSrc: function(item) {
					var text = $('#' + item.el.data('photoid')).hasClass('selected') == true ? 'Deselect' : 'Select';

					return '<a class="meta__action  meta__action--popup  select-action"  id="popup-selector" href="#" data-photoid="' + item.el.data('photoid') + '"><span class="button-text">' + text + '</span></a>';
				}
			},
			gallery:{
				enabled:true,
				navigateByImgClick: true,
				tPrev: 'Previous (Left arrow key)', // title for left button
				tNext: 'Next (Right arrow key)', // title for right button
				tCounter: '<div class="gallery-control gallery-control--popup"><a href="#" class="control-item arrow-button arrow-button--left js-arrow-popup-prev"></a><a href="#" class="control-item arrow-button arrow-button--right js-arrow-popup-next"></a></div>'
			}
		});
	});
}
