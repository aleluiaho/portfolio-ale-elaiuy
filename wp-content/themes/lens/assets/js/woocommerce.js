(function($){

	$(document).ready(function(){
		$(".woocommerce").on("change", "input.qty", function() {
			$(this.form).find("button[data-quantity]").attr("data-quantity", this.value);
		});

		$(document.body).on("adding_to_cart", function(event, element) {
			$( element ).hide();
		});
	});

	/**
	 * Remove items from cart with ajax
	 */
	$(document).on('click','.product-remove .remove', function(e) {
		e.preventDefault();

		var $thisbutton = $(this);

		$.ajax({
			url: woocommerce_params.ajax_url,
			type: 'POST',
			data: {
				action: 		'woopix_remove_from_cart',
				remove_item: 	$thisbutton.data('item_key'),
				remove_nonce:   $thisbutton.data('remove_nonce')
			},
			success: function( response ) {

				$result = JSON.parse(response);

				if ( $result.success == true ) {

					var item_title = ' ' + $thisbutton.parent().siblings('.product-name').children('a').html();
//					var message = '</br><i class="pixcode--icon  icon-info  square  small"></i>'+ l10n.item_label + item_title + l10n.remove_msg;
					var message = '<div><i class="pixcode--icon  icon-info  square  small"></i>Item <b>'+ item_title +'</b> has been removed!</div>';
					if ( $('.woocommerce-message').length > 0 ){
						$('.woocommerce-message').append(message);
					} else {
						$('.woocommerce .cart-form').before('<div class="woocommerce-message">'+ message +'</div>');
					}

					$thisbutton.parents('.cart_item').remove();

					// update total
					var $shipping_handler = $('select.shipping_method, input[name^=shipping_method]');
					//if the shipping selection is enabled
					if ( $shipping_handler.length ) {
						$shipping_handler.trigger('change');
					} else {
						woopix_update_cart_total();
					}
				}
			}
		});

	});

	/**
	 * Update cart with ajax
	 */
	$(document).on('change', '.cart_item .qty', function(e){
		e.preventDefault();

		var $thisbutton = $(this);

		$.ajax({
			url: woocommerce_params.ajax_url,
			type: 'POST',
			data: {
				action: 		'woopix_update_cart',
				remove_item: 	$thisbutton.data('item_key'),
				qty: 			$thisbutton.val()
			},
			success: function( response ) {
				var result = JSON.parse( response );

				if ( result.success == true ) {

					var message = '<i class="pixcode--icon  icon-info  square  small"></i>Cart updated!';
					if ( $('.woocommerce-message').length > 0 ){
						$('.woocommerce-message').html(message);
					} else {
						$('.woocommerce .cart-form').before('<div class="woocommerce-message">'+ message +'</div>');
					}

					if ( typeof result.cart_items !== 'undefined' ) {
						$('.woocommerce .shop_table.cart tbody .cart_item').remove();
						$('.woocommerce .shop_table.cart tbody').prepend(result.cart_items);
					}

					if ( typeof result.totals !== 'undefined' ) {
						$('.cart-subtotal.cart-totals, .shipping.cart-totals, .total.total-row.cart-totals').remove();
						$('.woocommerce .cart-buttons').before(result.totals);

					}
				}

				$(document).trigger('change');
				// update total
				var $shipping_handler = $('select.shipping_method, input[name^=shipping_method]');
				//if the shipping selection is enabled
				if ( $shipping_handler.length ) {
					$shipping_handler.trigger('change');
				} else {
					woopix_update_cart_total();
				}
			}
		});

	});

	//We replicate here the update_shipping_method logic but without any shipping methods
	function woopix_update_cart_total() {
		// wc_cart_params is required to continue, ensure the object exists
		if ( typeof wc_cart_params === 'undefined' ) {
			return false;
		}

		var shipping_methods = [];

		$( 'div.cart_totals' ).block({
			message: null,
			overlayCSS: {
				background: '#fff',
				opacity: 0.6
			}
		});

		var data = {
			security: wc_cart_params.update_shipping_method_nonce,
			shipping_method: shipping_methods
		};

		$.post( wc_cart_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'update_shipping_method' ), data, function( response ) {
			$( 'div.cart_totals' ).replaceWith( response );
		});
	}

	woocommerce_events_handlers = function () {
		// tell woocommerce if this is a cart page or not
		if ( $('body' ).hasClass('woocommerce-cart') ) {
			wc_add_to_cart_params.is_cart = 1;
		} else {
			wc_add_to_cart_params.is_cart = 0;
		}

		// woocommerce events
		var variations_form = $( '.variations_form' );
		if ( variations_form.length > 0 ) {
			variations_form.wc_variation_form();
		}
	};

	// we need to rebuild the minicart whenever the page is updated
	// so we copy the functionality from woocommerce/assets/js/frontend/cart-fragments.js
	// and call it when we need it

	$( document ).on( 'mini_cart_handle', function() {

		// wc_cart_fragments_params is required to continue, ensure the object exists
		if ( typeof wc_cart_fragments_params === 'undefined' ) {
			return false;
		}

		/** Cart Handling */
		try {
			$supports_html5_storage = ( 'sessionStorage' in window && window.sessionStorage !== null );

			window.sessionStorage.setItem( 'wc', 'test' );
			window.sessionStorage.removeItem( 'wc' );
		} catch ( err ) {
			$supports_html5_storage = false;
		}

		$fragment_refresh = {
			url: wc_cart_fragments_params.ajax_url,
			type: 'POST',
			data: {action: 'woocommerce_get_refreshed_fragments'},
			success: function( data ) {
				if ( data && data.fragments ) {

					$.each( data.fragments, function( key, value ) {
						$( key ).replaceWith( value );
					} );

					if ( $supports_html5_storage ) {
						sessionStorage.setItem( wc_cart_fragments_params.fragment_name, JSON.stringify( data.fragments ) );
						sessionStorage.setItem( 'wc_cart_hash', data.cart_hash );
					}

					$( 'body' ).trigger( 'wc_fragments_refreshed' );
				}
			}
		};

		if ( $supports_html5_storage ) {

			$( 'body' ).bind( 'added_to_cart', function( event, fragments, cart_hash ) {
				sessionStorage.setItem( wc_cart_fragments_params.fragment_name, JSON.stringify( fragments ) );
				sessionStorage.setItem( 'wc_cart_hash', cart_hash );
			} );

			try {
				var wc_fragments = $.parseJSON( sessionStorage.getItem( wc_cart_fragments_params.fragment_name ) ),
					cart_hash = sessionStorage.getItem( 'wc_cart_hash' ),
					cookie_hash = $.cookie( 'woocommerce_cart_hash' );

				if ( cart_hash === null || cart_hash === undefined || cart_hash === '' ) {
					cart_hash = '';
				}

				if ( cookie_hash === null || cookie_hash === undefined || cookie_hash === '' ) {
					cookie_hash = '';
				}

				if ( wc_fragments && wc_fragments['div.widget_shopping_cart_content'] && cart_hash == cookie_hash ) {

					$.each( wc_fragments, function( key, value ) {
						$( key ).replaceWith( value );
					} );

					$( 'body' ).trigger( 'wc_fragments_loaded' );

				} else {
					throw 'No fragment';
				}

			} catch ( err ) {
				$.ajax( $fragment_refresh );
			}

		} else {
			$.ajax( $fragment_refresh );
		}

		/* Cart hiding */
		if ( $.cookie( 'woocommerce_items_in_cart' ) > 0 ) {
			$( '.hide_cart_widget_if_empty' ).closest( '.widget_shopping_cart' ).show();
		} else {
			$( '.hide_cart_widget_if_empty' ).closest( '.widget_shopping_cart' ).hide();
		}

		$( 'body' ).bind( 'adding_to_cart', function() {
			$( '.hide_cart_widget_if_empty' ).closest( '.widget_shopping_cart' ).show();
		} );

	});

})(jQuery);
