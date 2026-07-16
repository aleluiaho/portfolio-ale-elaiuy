;
(function ($) {
	$(document).ready(function () {

		// classify the gallery number
		$('#pixgallery').on('html-change-post', function() {
			var $gallery = $( this ).children('ul'),
				nr_of_images = $gallery.children('li').length,
				metabox_class = '';

			if ( nr_of_images == 0 ) {
				metabox_class = 'no-image';
			} else if ( nr_of_images == 1 ) {
				metabox_class = 'single-image';
			} else {
				metabox_class = 'multiple-images';
			}

			if ( metabox_class !== '' ) {
				$( '#lens_gallery, #portfolio_gallery')
					.removeClass('no-image single-image multiple-images')
					.addClass(metabox_class);
			}

		});

	});


	$(window).on('load', function() {

		// slight fix for lens customizer
		$('#customize-control-lens_options-use_google_fonts label, #customize-control-lens_options-header_inverse label' ).css('color', '#b1b5b9');

		check_typography_use( $('#customize-control-lens_options-use_google_fonts input')[0] );

		$('#customize-control-lens_options-use_google_fonts input' ).change( function(){
			check_typography_use( this );
		});

	});

	var check_typography_use = function ( el ) {
		var val = $(el).prop("checked");

		if ( val ) {
			$( '#customize-control-lens_options-google_main_font, #customize-control-lens_options-google_body_font, #customize-control-lens_options-google_menu_font' ).show();
		} else {
			$( '#customize-control-lens_options-google_main_font, #customize-control-lens_options-google_body_font, #customize-control-lens_options-google_menu_font' ).hide();
		}

	};

	// Redefines jQuery.fn.html() to add custom events that are triggered before and after a DOM element's innerHtml is changed
	// html-change-pre is triggered before the innerHtml is changed
	// html-change-post is triggered after the innerHtml is changed
	var eventName = 'html-change';
	// Save a reference to the original html function
	jQuery.fn.originalHtml = jQuery.fn.html;
	// Let's redefine the html function to include a custom event
	jQuery.fn.html = function() {
		var currentHtml = this.originalHtml();
		if(arguments.length) {
			this.trigger(eventName + '-pre', jQuery.merge([currentHtml], arguments));
			jQuery.fn.originalHtml.apply(this, arguments);
			this.trigger(eventName + '-post', jQuery.merge([currentHtml], arguments));
			return this;
		} else {
			return currentHtml;
		}
	};

})(jQuery, window);


