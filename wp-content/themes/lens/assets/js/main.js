
/*!
 Autosize v1.17.8 - 2013-09-07
 Automatically adjust textarea height based on user input.
 (c) 2013 Jack Moore - http://www.jacklmoore.com/autosize
 license: http://www.opensource.org/licenses/mit-license.php
 */
(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(window.jQuery||window.$)})(function(e){var t,o={className:"autosizejs",append:"",callback:!1,resizeDelay:10},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],s=e(i).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&n.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function o(){var t,o;"getComputedStyle"in window?(t=window.getComputedStyle(u),o=u.getBoundingClientRect().width,e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){o-=parseInt(t[i],10)}),s.style.width=o+"px"):s.style.width=Math.max(p.width(),0)+"px"}function a(){var a={};if(t=u,s.className=i.className,d=parseInt(p.css("maxHeight"),10),e.each(n,function(e,t){a[t]=p.css(t)}),e(s).css(a),o(),window.chrome){var r=u.style.width;u.style.width="0px",u.offsetWidth,u.style.width=r}}function r(){var e,n;t!==u?a():o(),s.value=u.value+i.append,s.style.overflowY=u.style.overflowY,n=parseInt(u.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=f,n!==e&&(u.style.height=e+"px",w&&i.callback.call(u,u))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),f=0,w=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width();p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(f=p.outerHeight()-p.height()),c=Math.max(parseInt(p.css("minHeight"),10)-f||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word",resize:"none"===p.css("resize")||"vertical"===p.css("resize")?"none":"horizontal"}),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize")}),r())})):this}});

/* --- $DEBOUNCES RESIZE --- */

/* debouncedresize: special jQuery event that happens once after a window resize
 * https://github.com/louisremi/jquery-smartresize
 * Copyright 2012 @louis_remi
 * MIT License
 */
(function($){var $event=$.event,$special,resizeTimeout;$special=$event.special.debouncedresize={setup:function(){$(this).on("resize",$special.handler);},teardown:function(){$(this).off("resize",$special.handler);},handler:function(event,execAsap){var context=this,args=arguments,dispatch=function(){event.type="debouncedresize";$event.dispatch.apply(context,args);};if(resizeTimeout){clearTimeout(resizeTimeout);}execAsap?dispatch():resizeTimeout=setTimeout(dispatch,$special.threshold);},threshold:150};})(jQuery);


/* --- $DJAX --- */

/*
 * jQuery djax
 *
 * @version v0.122
 *
 * Copyright 2012, Brian Zeligson
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Homepage:
 *   http://beezee.github.com/djax.html
 *
 * Authors:
 *   Brian Zeligson
 *
 * Contributors:
 *  Gary Jones @GaryJones
 *
 * Maintainer:
 *   Brian Zeligson github @beezee
 *
 */

/*jslint browser: true, indent: 4, maxerr: 50, sub: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, noarg:true, noempty:true, nomen:true, nonew:true, onevar:true, plusplus:true, regexp:true, smarttabs:true, strict:true, trailing:true, undef:true, white:true, browser:true, jquery:true, indent:4, maxerr:50, */
/*global jQuery */

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name jquery.djax.js
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/jquery-1.7.js
// ==/ClosureCompiler==
// http://closure-compiler.appspot.com/home

(function ($, exports) {
	'use strict';

	$.support.cors = true;

	$.fn.djax = function (selector, exceptions, replaceBlockWithFunc) {

		// If browser doesn't support pushState, abort now
		if (!history.pushState) {
			return $(this);
		}

		var self = this,
			blockSelector = selector,
			excludes = (exceptions && exceptions.length) ? exceptions : [],
			replaceBlockWith = (replaceBlockWithFunc) ? replaceBlockWithFunc : $.fn.replaceWith,
			djaxing = false;

		// Ensure that the history is correct when going from 2nd page to 1st
		window.history.replaceState(
			{
				'url' : window.location.href,
				'title' : $('title').text()
			},
			$('title').text(),
			window.location.href
		);

		if (globalDebug) {console.log("djax::replaceState url:" + window.location.href);}

		self.clearDjaxing = function() {
			self.djaxing = false;
		}

		// Exclude the link exceptions
		self.attachClick = function (element, event) {

			var link = $(element),
				exception = false;

			$.each(excludes, function (index, exclusion) {
				if (link.attr('href').indexOf(exclusion) !== -1) {
					exception = true;
				}
				if (window.location.href.indexOf(exclusion) !== -1) {
					exception = true;
				}
			});

            if ( $(element).is('[target^=_blank], [rel^=external]') ) {
              exception = true;
            }

			// If the link is one of the exceptions, return early so that
			// the link can be clicked and a full page load as normal
			if (exception) {
				return $(element);
			}

			// From this point on, we handle the behaviour
			event.preventDefault();

			// If we're already doing djaxing, return now and silently fail
			if (self.djaxing) {
				setTimeout(self.clearDjaxing, 1000);
				return $(element);
			}

			$(window).trigger('djaxClick', [element]);
			self.reqUrl = link.attr('href');
			self.triggered = false;
			self.navigate(link.attr('href'), true);
		};

		// Handle the navigation
		self.navigate = function (url, add) {

			var blocks = $(blockSelector);

			self.djaxing = true;

			// Get the new page
			$(window).trigger(
				'djaxLoading',
				[{
					'url' : url
				}]
			);

			var replaceBlocks = function (response) {
				if (url !== self.reqUrl) {
					self.navigate(self.reqUrl, false);
					return true;
				}

				var result = $(response),
					newBlocks = $(result).find(blockSelector);

				if ( add === true ) {
					window.history.pushState(
						{
							'url' : url,
							'title' : $(result).filter('title').text()
						},
						$(result).filter('title').text(),
						url
					);

					if (globalDebug) {console.log("djax::pushState url:" + url);}
				}

				// Set page title as new page title
				// Set title cross-browser:
				// - $('title').text(title_text); returns an error on IE7
				//
				document.title = $(result).filter('title').text();

				// Loop through each block and find new page equivalent
				blocks.each(function () {

					var id = '#' + $(this).attr('id'),
						newBlock = newBlocks.filter(id),
						block = $(this);

					$('a:not([target])', newBlock).filter(function () {
						return this.hostname === location.hostname;
					}).addClass('dJAX_internal').on('click', function (event) {
						return self.attachClick(this, event);
					});

					if (newBlock.length) {
						if (block.html() !== newBlock.html()) {
							replaceBlockWith.call(block, newBlock);

						}
					} else {
						block.remove();
					}

				});

				// Loop through new page blocks and add in as needed
				$.each(newBlocks, function () {

					var newBlock = $(this),
						id = '#' + $(this).attr('id'),
						$previousSibling;

					// If there is a new page block without an equivalent block
					// in the old page, we need to find out where to insert it
					if (!$(id).length) {

						// Find the previous sibling
						$previousSibling = $(result).find(id).prev();

						if ($previousSibling.length) {
							// Insert after the previous element
							newBlock.insertAfter('#' + $previousSibling.attr('id'));
						} else {
							// There's no previous sibling, so prepend to parent instead
							newBlock.prependTo('#' + newBlock.parent().attr('id'));
						}

						// Only add a class to internal links
						$('a:not([target])', newBlock).filter(function () {
							return this.hostname === location.hostname;
						}).addClass('dJAX_internal').on('click', function (event) {
							return self.attachClick(this, event);
						});
					}

				});


				// Trigger djaxLoad event as a pseudo ready()
				if (!self.triggered) {
					$(window).trigger(
						'djaxLoad',
						[{
							'url' : url,
							'title' : $(result).filter('title').text(),
							'response' : response
						}]
					);
					self.triggered = true;
					self.djaxing = false;
				}

				// Trigger a djaxLoaded event when done
				$(window).trigger(
					'djaxLoaded',
					[{
						'url' : url,
						'title' : $(result).filter('title').text(),
						'response' : response
					}]
				);
			};

			$.ajax({
				'url' : url,
				'success' : function (response) {
					replaceBlocks(response);
				},
				'error' : function (response, textStatus, errorThrown) {
					// handle error
					console.log('error', response, textStatus, errorThrown);
					replaceBlocks(response['responseText']);
				}
			});
		}; /* End self.navigate */

		// Only add a class to internal links
		$(this).find('a:not([target])').filter(function () {
			return this.hostname === location.hostname;
		}).addClass('dJAX_internal').on('click', function (event) {
			return self.attachClick(this, event);
		});

		// On new page load
		$(window).bind('popstate', function (event) {
			self.triggered = false;
			if (event.originalEvent.state) {
				self.reqUrl = event.originalEvent.state.url;
				self.navigate(event.originalEvent.state.url, false);
			}
		});

	};

}(jQuery, window));

/* --- $GMAP3 ---*/

// GMap 3 v5.1.1 by DEMONTE Jean-Baptiste
// http://gmap3.net
// License GPLv3
(function(y,t){var z,i=0;function J(){if(!z){z={verbose:false,queryLimit:{attempt:5,delay:250,random:250},classes:{Map:google.maps.Map,Marker:google.maps.Marker,InfoWindow:google.maps.InfoWindow,Circle:google.maps.Circle,Rectangle:google.maps.Rectangle,OverlayView:google.maps.OverlayView,StreetViewPanorama:google.maps.StreetViewPanorama,KmlLayer:google.maps.KmlLayer,TrafficLayer:google.maps.TrafficLayer,BicyclingLayer:google.maps.BicyclingLayer,GroundOverlay:google.maps.GroundOverlay,StyledMapType:google.maps.StyledMapType,ImageMapType:google.maps.ImageMapType},map:{mapTypeId:google.maps.MapTypeId.ROADMAP,center:[46.578498,2.457275],zoom:2},overlay:{pane:"floatPane",content:"",offset:{x:0,y:0}},geoloc:{getCurrentPosition:{maximumAge:60000,timeout:5000}}}}}function k(M,L){return M!==t?M:"gmap3_"+(L?i+1:++i)}function d(L){var O=function(P){return parseInt(P,10)},N=google.maps.version.split(".").map(O),M;L=L.split(".").map(O);for(M=0;M<L.length;M++){if(N.hasOwnProperty(M)){if(N[M]<L[M]){return false}}else{return false}}return true}function n(P,L,N,Q,O){if(L.todo.events||L.todo.onces){var M={id:Q,data:L.todo.data,tag:L.todo.tag};if(L.todo.events){y.each(L.todo.events,function(R,U){var T=P,S=U;if(y.isArray(U)){T=U[0];S=U[1]}google.maps.event.addListener(N,R,function(V){S.apply(T,[O?O:N,V,M])})})}if(L.todo.onces){y.each(L.todo.onces,function(R,U){var T=P,S=U;if(y.isArray(U)){T=U[0];S=U[1]}google.maps.event.addListenerOnce(N,R,function(V){S.apply(T,[O?O:N,V,M])})})}}}function l(){var L=[];this.empty=function(){return !L.length};this.add=function(M){L.push(M)};this.get=function(){return L.length?L[0]:false};this.ack=function(){L.shift()}}function w(T,L,N){var R={},P=this,Q,S={latLng:{map:false,marker:false,infowindow:false,circle:false,overlay:false,getlatlng:false,getmaxzoom:false,getelevation:false,streetviewpanorama:false,getaddress:true},geoloc:{getgeoloc:true}};if(typeof N==="string"){N=M(N)}function M(V){var U={};U[V]={};return U}function O(){var U;for(U in N){if(U in R){continue}return U}}this.run=function(){var U,V;while(U=O()){if(typeof T[U]==="function"){Q=U;V=y.extend(true,{},z[U]||{},N[U].options||{});if(U in S.latLng){if(N[U].values){x(N[U].values,T,T[U],{todo:N[U],opts:V,session:R})}else{v(T,T[U],S.latLng[U],{todo:N[U],opts:V,session:R})}}else{if(U in S.geoloc){o(T,T[U],{todo:N[U],opts:V,session:R})}else{T[U].apply(T,[{todo:N[U],opts:V,session:R}])}}return}else{R[U]=null}}L.apply(T,[N,R])};this.ack=function(U){R[Q]=U;P.run.apply(P,[])}}function c(N){var L,M=[];for(L in N){M.push(L)}return M}function b(N,Q){var L={};if(N.todo){for(var M in N.todo){if((M!=="options")&&(M!=="values")){L[M]=N.todo[M]}}}var O,P=["data","tag","id","events","onces"];for(O=0;O<P.length;O++){A(L,P[O],Q,N.todo)}L.options=y.extend({},N.opts||{},Q.options||{});return L}function A(N,M){for(var L=2;L<arguments.length;L++){if(M in arguments[L]){N[M]=arguments[L][M];return}}}function r(){var L=[];this.get=function(S){if(L.length){var P,O,N,R,M,Q=c(S);for(P=0;P<L.length;P++){R=L[P];M=Q.length==R.keys.length;for(O=0;(O<Q.length)&&M;O++){N=Q[O];M=N in R.request;if(M){if((typeof S[N]==="object")&&("equals" in S[N])&&(typeof S[N]==="function")){M=S[N].equals(R.request[N])}else{M=S[N]===R.request[N]}}}if(M){return R.results}}}};this.store=function(N,M){L.push({request:N,keys:c(N),results:M})}}function e(Q,P,O,L){var N=this,M=[];z.classes.OverlayView.call(this);this.setMap(Q);this.onAdd=function(){var R=this.getPanes();if(P.pane in R){y(R[P.pane]).append(L)}y.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "),function(T,S){M.push(google.maps.event.addDomListener(L[0],S,function(U){y.Event(U).stopPropagation();google.maps.event.trigger(N,S,[U]);N.draw()}))});M.push(google.maps.event.addDomListener(L[0],"contextmenu",function(S){y.Event(S).stopPropagation();google.maps.event.trigger(N,"rightclick",[S]);N.draw()}))};this.getPosition=function(){return O};this.draw=function(){var R=this.getProjection().fromLatLngToDivPixel(O);L.css("left",(R.x+P.offset.x)+"px").css("top",(R.y+P.offset.y)+"px")};this.onRemove=function(){for(var R=0;R<M.length;R++){google.maps.event.removeListener(M[R])}L.remove()};this.hide=function(){L.hide()};this.show=function(){L.show()};this.toggle=function(){if(L){if(L.is(":visible")){this.show()}else{this.hide()}}};this.toggleDOM=function(){if(this.getMap()){this.setMap(null)}else{this.setMap(Q)}};this.getDOMElement=function(){return L[0]}}function f(O,L){function M(){this.onAdd=function(){};this.onRemove=function(){};this.draw=function(){};return z.classes.OverlayView.apply(this,[])}M.prototype=z.classes.OverlayView.prototype;var N=new M();N.setMap(O);return N}function F(ae,ao,aa){var an=false,ai=false,af=false,Z=false,W=true,V=this,N=[],T={},ad={},U={},aj=[],ah=[],O=[],ak=f(ao,aa.radius),Y,ap,am,P,Q;S();function L(aq){if(!aj[aq]){delete ah[aq].options.map;aj[aq]=new z.classes.Marker(ah[aq].options);n(ae,{todo:ah[aq]},aj[aq],ah[aq].id)}}this.getById=function(aq){if(aq in ad){L(ad[aq]);return aj[ad[aq]]}return false};this.rm=function(ar){var aq=ad[ar];if(aj[aq]){aj[aq].setMap(null)}delete aj[aq];aj[aq]=false;delete ah[aq];ah[aq]=false;delete O[aq];O[aq]=false;delete ad[ar];delete U[aq];ai=true};this.clearById=function(aq){if(aq in ad){this.rm(aq);return true}};this.clear=function(az,av,aA){var ar,ay,at,aw,au,ax=[],aq=C(aA);if(az){ar=ah.length-1;ay=-1;at=-1}else{ar=0;ay=ah.length;at=1}for(aw=ar;aw!=ay;aw+=at){if(ah[aw]){if(!aq||aq(ah[aw].tag)){ax.push(U[aw]);if(av||az){break}}}}for(au=0;au<ax.length;au++){this.rm(ax[au])}};this.add=function(aq,ar){aq.id=k(aq.id);this.clearById(aq.id);ad[aq.id]=aj.length;U[aj.length]=aq.id;aj.push(null);ah.push(aq);O.push(ar);ai=true};this.addMarker=function(ar,aq){aq=aq||{};aq.id=k(aq.id);this.clearById(aq.id);if(!aq.options){aq.options={}}aq.options.position=ar.getPosition();n(ae,{todo:aq},ar,aq.id);ad[aq.id]=aj.length;U[aj.length]=aq.id;aj.push(ar);ah.push(aq);O.push(aq.data||{});ai=true};this.todo=function(aq){return ah[aq]};this.value=function(aq){return O[aq]};this.marker=function(aq){if(aq in aj){L(aq);return aj[aq]}return false};this.markerIsSet=function(aq){return Boolean(aj[aq])};this.setMarker=function(ar,aq){aj[ar]=aq};this.store=function(aq,ar,at){T[aq.ref]={obj:ar,shadow:at}};this.free=function(){for(var aq=0;aq<N.length;aq++){google.maps.event.removeListener(N[aq])}N=[];y.each(T,function(ar){ac(ar)});T={};y.each(ah,function(ar){ah[ar]=null});ah=[];y.each(aj,function(ar){if(aj[ar]){aj[ar].setMap(null);delete aj[ar]}});aj=[];y.each(O,function(ar){delete O[ar]});O=[];ad={};U={}};this.filter=function(aq){am=aq;ag()};this.enable=function(aq){if(W!=aq){W=aq;ag()}};this.display=function(aq){P=aq};this.error=function(aq){Q=aq};this.beginUpdate=function(){an=true};this.endUpdate=function(){an=false;if(ai){ag()}};this.autofit=function(ar){for(var aq=0;aq<ah.length;aq++){if(ah[aq]){ar.extend(ah[aq].options.position)}}};function S(){ap=ak.getProjection();if(!ap){setTimeout(function(){S.apply(V,[])},25);return}Z=true;N.push(google.maps.event.addListener(ao,"zoom_changed",function(){al()}));N.push(google.maps.event.addListener(ao,"bounds_changed",function(){al()}));ag()}function ac(aq){if(typeof T[aq]==="object"){if(typeof(T[aq].obj.setMap)==="function"){T[aq].obj.setMap(null)}if(typeof(T[aq].obj.remove)==="function"){T[aq].obj.remove()}if(typeof(T[aq].shadow.remove)==="function"){T[aq].obj.remove()}if(typeof(T[aq].shadow.setMap)==="function"){T[aq].shadow.setMap(null)}delete T[aq].obj;delete T[aq].shadow}else{if(aj[aq]){aj[aq].setMap(null)}}delete T[aq]}function M(){var ay,ax,aw,au,av,at,ar,aq;if(arguments[0] instanceof google.maps.LatLng){ay=arguments[0].lat();aw=arguments[0].lng();if(arguments[1] instanceof google.maps.LatLng){ax=arguments[1].lat();au=arguments[1].lng()}else{ax=arguments[1];au=arguments[2]}}else{ay=arguments[0];aw=arguments[1];if(arguments[2] instanceof google.maps.LatLng){ax=arguments[2].lat();au=arguments[2].lng()}else{ax=arguments[2];au=arguments[3]}}av=Math.PI*ay/180;at=Math.PI*aw/180;ar=Math.PI*ax/180;aq=Math.PI*au/180;return 1000*6371*Math.acos(Math.min(Math.cos(av)*Math.cos(ar)*Math.cos(at)*Math.cos(aq)+Math.cos(av)*Math.sin(at)*Math.cos(ar)*Math.sin(aq)+Math.sin(av)*Math.sin(ar),1))}function R(){var aq=M(ao.getCenter(),ao.getBounds().getNorthEast()),ar=new google.maps.Circle({center:ao.getCenter(),radius:1.25*aq});return ar.getBounds()}function X(){var ar={},aq;for(aq in T){ar[aq]=true}return ar}function al(){clearTimeout(Y);Y=setTimeout(function(){ag()},25)}function ab(ar){var au=ap.fromLatLngToDivPixel(ar),at=ap.fromDivPixelToLatLng(new google.maps.Point(au.x+aa.radius,au.y-aa.radius)),aq=ap.fromDivPixelToLatLng(new google.maps.Point(au.x-aa.radius,au.y+aa.radius));return new google.maps.LatLngBounds(aq,at)}function ag(){if(an||af||!Z){return}var aE=[],aG={},aF=ao.getZoom(),aH=("maxZoom" in aa)&&(aF>aa.maxZoom),aw=X(),av,au,at,aA,ar=false,aq,aD,ay,az,aB,aC,ax;ai=false;if(aF>3){aq=R();ar=aq.getSouthWest().lng()<aq.getNorthEast().lng()}for(av=0;av<ah.length;av++){if(ah[av]&&(!ar||aq.contains(ah[av].options.position))&&(!am||am(O[av]))){aE.push(av)}}while(1){av=0;while(aG[av]&&(av<aE.length)){av++}if(av==aE.length){break}aA=[];if(W&&!aH){ax=10;do{az=aA;aA=[];ax--;if(az.length){ay=aq.getCenter()}else{ay=ah[aE[av]].options.position}aq=ab(ay);for(au=av;au<aE.length;au++){if(aG[au]){continue}if(aq.contains(ah[aE[au]].options.position)){aA.push(au)}}}while((az.length<aA.length)&&(aA.length>1)&&ax)}else{for(au=av;au<aE.length;au++){if(aG[au]){continue}aA.push(au);break}}aD={indexes:[],ref:[]};aB=aC=0;for(at=0;at<aA.length;at++){aG[aA[at]]=true;aD.indexes.push(aE[aA[at]]);aD.ref.push(aE[aA[at]]);aB+=ah[aE[aA[at]]].options.position.lat();aC+=ah[aE[aA[at]]].options.position.lng()}aB/=aA.length;aC/=aA.length;aD.latLng=new google.maps.LatLng(aB,aC);aD.ref=aD.ref.join("-");if(aD.ref in aw){delete aw[aD.ref]}else{if(aA.length===1){T[aD.ref]=true}P(aD)}}y.each(aw,function(aI){ac(aI)});af=false}}function a(M,L){this.id=function(){return M};this.filter=function(N){L.filter(N)};this.enable=function(){L.enable(true)};this.disable=function(){L.enable(false)};this.add=function(O,N,P){if(!P){L.beginUpdate()}L.addMarker(O,N);if(!P){L.endUpdate()}};this.getById=function(N){return L.getById(N)};this.clearById=function(P,O){var N;if(!O){L.beginUpdate()}N=L.clearById(P);if(!O){L.endUpdate()}return N};this.clear=function(P,Q,N,O){if(!O){L.beginUpdate()}L.clear(P,Q,N);if(!O){L.endUpdate()}}}function D(){var M={},N={};function L(P){return{id:P.id,name:P.name,object:P.obj,tag:P.tag,data:P.data}}this.add=function(R,Q,T,S){var P=R.todo||{},U=k(P.id);if(!M[Q]){M[Q]=[]}if(U in N){this.clearById(U)}N[U]={obj:T,sub:S,name:Q,id:U,tag:P.tag,data:P.data};M[Q].push(U);return U};this.getById=function(R,Q,P){if(R in N){if(Q){return N[R].sub}else{if(P){return L(N[R])}}return N[R].obj}return false};this.get=function(R,T,P,S){var V,U,Q=C(P);if(!M[R]||!M[R].length){return null}V=M[R].length;while(V){V--;U=M[R][T?V:M[R].length-V-1];if(U&&N[U]){if(Q&&!Q(N[U].tag)){continue}return S?L(N[U]):N[U].obj}}return null};this.all=function(S,Q,T){var P=[],R=C(Q),U=function(X){var V,W;for(V=0;V<M[X].length;V++){W=M[X][V];if(W&&N[W]){if(R&&!R(N[W].tag)){continue}P.push(T?L(N[W]):N[W].obj)}}};if(S in M){U(S)}else{if(S===t){for(S in M){U(S)}}}return P};function O(P){if(typeof(P.setMap)==="function"){P.setMap(null)}if(typeof(P.remove)==="function"){P.remove()}if(typeof(P.free)==="function"){P.free()}P=null}this.rm=function(S,Q,R){var P,T;if(!M[S]){return false}if(Q){if(R){for(P=M[S].length-1;P>=0;P--){T=M[S][P];if(Q(N[T].tag)){break}}}else{for(P=0;P<M[S].length;P++){T=M[S][P];if(Q(N[T].tag)){break}}}}else{P=R?M[S].length-1:0}if(!(P in M[S])){return false}return this.clearById(M[S][P],P)};this.clearById=function(S,P){if(S in N){var R,Q=N[S].name;for(R=0;P===t&&R<M[Q].length;R++){if(S===M[Q][R]){P=R}}O(N[S].obj);if(N[S].sub){O(N[S].sub)}delete N[S];M[Q].splice(P,1);return true}return false};this.objGetById=function(R){var Q;if(M.clusterer){for(var P in M.clusterer){if((Q=N[M.clusterer[P]].obj.getById(R))!==false){return Q}}}return false};this.objClearById=function(Q){if(M.clusterer){for(var P in M.clusterer){if(N[M.clusterer[P]].obj.clearById(Q)){return true}}}return null};this.clear=function(V,U,W,P){var R,T,S,Q=C(P);if(!V||!V.length){V=[];for(R in M){V.push(R)}}else{V=g(V)}for(T=0;T<V.length;T++){S=V[T];if(U){this.rm(S,Q,true)}else{if(W){this.rm(S,Q,false)}else{while(this.rm(S,Q,false)){}}}}};this.objClear=function(S,R,T,Q){if(M.clusterer&&(y.inArray("marker",S)>=0||!S.length)){for(var P in M.clusterer){N[M.clusterer[P]].obj.clear(R,T,Q)}}}}var m={},H=new r();function p(){if(!m.geocoder){m.geocoder=new google.maps.Geocoder()}return m.geocoder}function G(){if(!m.directionsService){m.directionsService=new google.maps.DirectionsService()}return m.directionsService}function h(){if(!m.elevationService){m.elevationService=new google.maps.ElevationService()}return m.elevationService}function q(){if(!m.maxZoomService){m.maxZoomService=new google.maps.MaxZoomService()}return m.maxZoomService}function B(){if(!m.distanceMatrixService){m.distanceMatrixService=new google.maps.DistanceMatrixService()}return m.distanceMatrixService}function u(){if(z.verbose){var L,M=[];if(window.console&&(typeof console.error==="function")){for(L=0;L<arguments.length;L++){M.push(arguments[L])}console.error.apply(console,M)}else{M="";for(L=0;L<arguments.length;L++){M+=arguments[L].toString()+" "}alert(M)}}}function E(L){return(typeof(L)==="number"||typeof(L)==="string")&&L!==""&&!isNaN(L)}function g(N){var M,L=[];if(N!==t){if(typeof(N)==="object"){if(typeof(N.length)==="number"){L=N}else{for(M in N){L.push(N[M])}}}else{L.push(N)}}return L}function C(L){if(L){if(typeof L==="function"){return L}L=g(L);return function(N){if(N===t){return false}if(typeof N==="object"){for(var M=0;M<N.length;M++){if(y.inArray(N[M],L)>=0){return true}}return false}return y.inArray(N,L)>=0}}}function I(M,O,L){var N=O?M:null;if(!M||(typeof M==="string")){return N}if(M.latLng){return I(M.latLng)}if(M instanceof google.maps.LatLng){return M}else{if(E(M.lat)){return new google.maps.LatLng(M.lat,M.lng)}else{if(!L&&y.isArray(M)){if(!E(M[0])||!E(M[1])){return N}return new google.maps.LatLng(M[0],M[1])}}}return N}function j(M){var N,L;if(!M||M instanceof google.maps.LatLngBounds){return M||null}if(y.isArray(M)){if(M.length==2){N=I(M[0]);L=I(M[1])}else{if(M.length==4){N=I([M[0],M[1]]);L=I([M[2],M[3]])}}}else{if(("ne" in M)&&("sw" in M)){N=I(M.ne);L=I(M.sw)}else{if(("n" in M)&&("e" in M)&&("s" in M)&&("w" in M)){N=I([M.n,M.e]);L=I([M.s,M.w])}}}if(N&&L){return new google.maps.LatLngBounds(L,N)}return null}function v(T,L,O,S,P){var N=O?I(S.todo,false,true):false,R=N?{latLng:N}:(S.todo.address?(typeof(S.todo.address)==="string"?{address:S.todo.address}:S.todo.address):false),M=R?H.get(R):false,Q=this;if(R){P=P||0;if(M){S.latLng=M.results[0].geometry.location;S.results=M.results;S.status=M.status;L.apply(T,[S])}else{if(R.location){R.location=I(R.location)}if(R.bounds){R.bounds=j(R.bounds)}p().geocode(R,function(V,U){if(U===google.maps.GeocoderStatus.OK){H.store(R,{results:V,status:U});S.latLng=V[0].geometry.location;S.results=V;S.status=U;L.apply(T,[S])}else{if((U===google.maps.GeocoderStatus.OVER_QUERY_LIMIT)&&(P<z.queryLimit.attempt)){setTimeout(function(){v.apply(Q,[T,L,O,S,P+1])},z.queryLimit.delay+Math.floor(Math.random()*z.queryLimit.random))}else{u("geocode failed",U,R);S.latLng=S.results=false;S.status=U;L.apply(T,[S])}}})}}else{S.latLng=I(S.todo,false,true);L.apply(T,[S])}}function x(Q,L,R,M){var O=this,N=-1;function P(){do{N++}while((N<Q.length)&&!("address" in Q[N]));if(N>=Q.length){R.apply(L,[M]);return}v(O,function(S){delete S.todo;y.extend(Q[N],S);P.apply(O,[])},true,{todo:Q[N]})}P()}function o(L,O,M){var N=false;if(navigator&&navigator.geolocation){navigator.geolocation.getCurrentPosition(function(P){if(N){return}N=true;M.latLng=new google.maps.LatLng(P.coords.latitude,P.coords.longitude);O.apply(L,[M])},function(){if(N){return}N=true;M.latLng=false;O.apply(L,[M])},M.opts.getCurrentPosition)}else{M.latLng=false;O.apply(L,[M])}}function K(T){var S=this,U=new l(),V=new D(),N=null,P;this._plan=function(Z){for(var Y=0;Y<Z.length;Y++){U.add(new w(S,R,Z[Y]))}Q()};function Q(){if(!P&&(P=U.get())){P.run()}}function R(){P=null;U.ack();Q.call(S)}function X(Y){if(Y.todo.callback){var Z=Array.prototype.slice.call(arguments,1);if(typeof Y.todo.callback==="function"){Y.todo.callback.apply(T,Z)}else{if(y.isArray(Y.todo.callback)){if(typeof Y.todo.callback[1]==="function"){Y.todo.callback[1].apply(Y.todo.callback[0],Z)}}}}}function O(Y,Z,aa){if(aa){n(T,Y,Z,aa)}X(Y,Z);P.ack(Z)}function L(aa,Y){Y=Y||{};if(N){if(Y.todo&&Y.todo.options){if(Y.todo.options.center){Y.todo.options.center=I(Y.todo.options.center)}N.setOptions(Y.todo.options)}}else{var Z=Y.opts||y.extend(true,{},z.map,Y.todo&&Y.todo.options?Y.todo.options:{});Z.center=aa||I(Z.center);N=new z.classes.Map(T.get(0),Z)}}this.map=function(Y){L(Y.latLng,Y);n(T,Y,N);O(Y,N)};this.destroy=function(Y){V.clear();T.empty();if(N){N=null}O(Y,true)};this.infowindow=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){if(Z.latLng){Z.opts.position=Z.latLng}Z.todo.values=[{options:Z.opts}]}y.each(Z.todo.values,function(ac,ad){var af,ae,ab=b(Z,ad);ab.options.position=ab.options.position?I(ab.options.position):I(ad.latLng);if(!N){L(ab.options.position)}ae=new z.classes.InfoWindow(ab.options);if(ae&&((ab.open===t)||ab.open)){if(Y){ae.open(N,ab.anchor?ab.anchor:t)}else{ae.open(N,ab.anchor?ab.anchor:(Z.latLng?t:(Z.session.marker?Z.session.marker:t)))}}aa.push(ae);af=V.add({todo:ab},"infowindow",ae);n(T,{todo:ab},ae,af)});O(Z,Y?aa:aa[0])};this.circle=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){Z.opts.center=Z.latLng||I(Z.opts.center);Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}y.each(Z.todo.values,function(ac,ad){var af,ae,ab=b(Z,ad);ab.options.center=ab.options.center?I(ab.options.center):I(ad);if(!N){L(ab.options.center)}ab.options.map=N;ae=new z.classes.Circle(ab.options);aa.push(ae);af=V.add({todo:ab},"circle",ae);n(T,{todo:ab},ae,af)});O(Z,Y?aa:aa[0])};this.overlay=function(aa,Z){var ab=[],Y="values" in aa.todo;if(!Y){aa.todo.values=[{latLng:aa.latLng,options:aa.opts}]}if(!aa.todo.values.length){O(aa,false);return}if(!e.__initialised){e.prototype=new z.classes.OverlayView();e.__initialised=true}y.each(aa.todo.values,function(ae,af){var ah,ag,ac=b(aa,af),ad=y(document.createElement("div")).css({border:"none",borderWidth:"0px",position:"absolute"});ad.append(ac.options.content);ag=new e(N,ac.options,I(ac)||I(af),ad);ab.push(ag);ad=null;if(!Z){ah=V.add(aa,"overlay",ag);n(T,{todo:ac},ag,ah)}});if(Z){return ab[0]}O(aa,Y?ab:ab[0])};this.getaddress=function(Y){X(Y,Y.results,Y.status);P.ack()};this.getlatlng=function(Y){X(Y,Y.results,Y.status);P.ack()};this.getmaxzoom=function(Y){q().getMaxZoomAtLatLng(Y.latLng,function(Z){X(Y,Z.status===google.maps.MaxZoomStatus.OK?Z.zoom:false,status);P.ack()})};this.getelevation=function(Z){var aa,Y=[],ab=function(ad,ac){X(Z,ac===google.maps.ElevationStatus.OK?ad:false,ac);P.ack()};if(Z.latLng){Y.push(Z.latLng)}else{Y=g(Z.todo.locations||[]);for(aa=0;aa<Y.length;aa++){Y[aa]=I(Y[aa])}}if(Y.length){h().getElevationForLocations({locations:Y},ab)}else{if(Z.todo.path&&Z.todo.path.length){for(aa=0;aa<Z.todo.path.length;aa++){Y.push(I(Z.todo.path[aa]))}}if(Y.length){h().getElevationAlongPath({path:Y,samples:Z.todo.samples},ab)}else{P.ack()}}};this.defaults=function(Y){y.each(Y.todo,function(Z,aa){if(typeof z[Z]==="object"){z[Z]=y.extend({},z[Z],aa)}else{z[Z]=aa}});P.ack(true)};this.rectangle=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}y.each(Z.todo.values,function(ac,ad){var af,ae,ab=b(Z,ad);ab.options.bounds=ab.options.bounds?j(ab.options.bounds):j(ad);if(!N){L(ab.options.bounds.getCenter())}ab.options.map=N;ae=new z.classes.Rectangle(ab.options);aa.push(ae);af=V.add({todo:ab},"rectangle",ae);n(T,{todo:ab},ae,af)});O(Z,Y?aa:aa[0])};function M(Z,aa,ab){var ac=[],Y="values" in Z.todo;if(!Y){Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}L();y.each(Z.todo.values,function(af,ah){var aj,ag,ae,ai,ad=b(Z,ah);if(ad.options[ab]){if(ad.options[ab][0][0]&&y.isArray(ad.options[ab][0][0])){for(ag=0;ag<ad.options[ab].length;ag++){for(ae=0;ae<ad.options[ab][ag].length;ae++){ad.options[ab][ag][ae]=I(ad.options[ab][ag][ae])}}}else{for(ag=0;ag<ad.options[ab].length;ag++){ad.options[ab][ag]=I(ad.options[ab][ag])}}}ad.options.map=N;ai=new google.maps[aa](ad.options);ac.push(ai);aj=V.add({todo:ad},aa.toLowerCase(),ai);n(T,{todo:ad},ai,aj)});O(Z,Y?ac:ac[0])}this.polyline=function(Y){M(Y,"Polyline","path")};this.polygon=function(Y){M(Y,"Polygon","paths")};this.trafficlayer=function(Y){L();var Z=V.get("trafficlayer");if(!Z){Z=new z.classes.TrafficLayer();Z.setMap(N);V.add(Y,"trafficlayer",Z)}O(Y,Z)};this.bicyclinglayer=function(Y){L();var Z=V.get("bicyclinglayer");if(!Z){Z=new z.classes.BicyclingLayer();Z.setMap(N);V.add(Y,"bicyclinglayer",Z)}O(Y,Z)};this.groundoverlay=function(Y){Y.opts.bounds=j(Y.opts.bounds);if(Y.opts.bounds){L(Y.opts.bounds.getCenter())}var aa,Z=new z.classes.GroundOverlay(Y.opts.url,Y.opts.bounds,Y.opts.opts);Z.setMap(N);aa=V.add(Y,"groundoverlay",Z);O(Y,Z,aa)};this.streetviewpanorama=function(Y){if(!Y.opts.opts){Y.opts.opts={}}if(Y.latLng){Y.opts.opts.position=Y.latLng}else{if(Y.opts.opts.position){Y.opts.opts.position=I(Y.opts.opts.position)}}if(Y.todo.divId){Y.opts.container=document.getElementById(Y.todo.divId)}else{if(Y.opts.container){Y.opts.container=y(Y.opts.container).get(0)}}var aa,Z=new z.classes.StreetViewPanorama(Y.opts.container,Y.opts.opts);if(Z){N.setStreetView(Z)}aa=V.add(Y,"streetviewpanorama",Z);O(Y,Z,aa)};this.kmllayer=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}y.each(Z.todo.values,function(ad,ae){var ag,af,ac,ab=b(Z,ae);if(!N){L()}ac=ab.options;if(ab.options.opts){ac=ab.options.opts;if(ab.options.url){ac.url=ab.options.url}}ac.map=N;if(d("3.10")){af=new z.classes.KmlLayer(ac)}else{af=new z.classes.KmlLayer(ac.url,ac)}aa.push(af);ag=V.add({todo:ab},"kmllayer",af);n(T,{todo:ab},af,ag)});O(Z,Y?aa:aa[0])};this.panel=function(ab){L();var ad,Y=0,ac=0,aa,Z=y(document.createElement("div"));Z.css({position:"absolute",zIndex:1000,visibility:"hidden"});if(ab.opts.content){aa=y(ab.opts.content);Z.append(aa);T.first().prepend(Z);if(ab.opts.left!==t){Y=ab.opts.left}else{if(ab.opts.right!==t){Y=T.width()-aa.width()-ab.opts.right}else{if(ab.opts.center){Y=(T.width()-aa.width())/2}}}if(ab.opts.top!==t){ac=ab.opts.top}else{if(ab.opts.bottom!==t){ac=T.height()-aa.height()-ab.opts.bottom}else{if(ab.opts.middle){ac=(T.height()-aa.height())/2}}}Z.css({top:ac,left:Y,visibility:"visible"})}ad=V.add(ab,"panel",Z);O(ab,Z,ad);Z=null};function W(aa){var af=new F(T,N,aa),Y={},ab={},ae=[],ad=/^[0-9]+$/,ac,Z;for(Z in aa){if(ad.test(Z)){ae.push(1*Z);ab[Z]=aa[Z];ab[Z].width=ab[Z].width||0;ab[Z].height=ab[Z].height||0}else{Y[Z]=aa[Z]}}ae.sort(function(ah,ag){return ah>ag});if(Y.calculator){ac=function(ag){var ah=[];y.each(ag,function(aj,ai){ah.push(af.value(ai))});return Y.calculator.apply(T,[ah])}}else{ac=function(ag){return ag.length}}af.error(function(){u.apply(S,arguments)});af.display(function(ag){var ai,aj,am,ak,al,ah=ac(ag.indexes);if(aa.force||ah>1){for(ai=0;ai<ae.length;ai++){if(ae[ai]<=ah){aj=ab[ae[ai]]}}}if(aj){al=aj.offset||[-aj.width/2,-aj.height/2];am=y.extend({},Y);am.options=y.extend({pane:"overlayLayer",content:aj.content?aj.content.replace("CLUSTER_COUNT",ah):"",offset:{x:("x" in al?al.x:al[0])||0,y:("y" in al?al.y:al[1])||0}},Y.options||{});ak=S.overlay({todo:am,opts:am.options,latLng:I(ag)},true);am.options.pane="floatShadow";am.options.content=y(document.createElement("div")).width(aj.width+"px").height(aj.height+"px").css({cursor:"pointer"});shadow=S.overlay({todo:am,opts:am.options,latLng:I(ag)},true);Y.data={latLng:I(ag),markers:[]};y.each(ag.indexes,function(ao,an){Y.data.markers.push(af.value(an));if(af.markerIsSet(an)){af.marker(an).setMap(null)}});n(T,{todo:Y},shadow,t,{main:ak,shadow:shadow});af.store(ag,ak,shadow)}else{y.each(ag.indexes,function(ao,an){af.marker(an).setMap(N)})}});return af}this.marker=function(aa){var Y="values" in aa.todo,ad=!N;if(!Y){aa.opts.position=aa.latLng||I(aa.opts.position);aa.todo.values=[{options:aa.opts}]}if(!aa.todo.values.length){O(aa,false);return}if(ad){L()}if(aa.todo.cluster&&!N.getBounds()){google.maps.event.addListenerOnce(N,"bounds_changed",function(){S.marker.apply(S,[aa])});return}if(aa.todo.cluster){var Z,ab;if(aa.todo.cluster instanceof a){Z=aa.todo.cluster;ab=V.getById(Z.id(),true)}else{ab=W(aa.todo.cluster);Z=new a(k(aa.todo.id,true),ab);V.add(aa,"clusterer",Z,ab)}ab.beginUpdate();y.each(aa.todo.values,function(af,ag){var ae=b(aa,ag);ae.options.position=ae.options.position?I(ae.options.position):I(ag);ae.options.map=N;if(ad){N.setCenter(ae.options.position);ad=false}ab.add(ae,ag)});ab.endUpdate();O(aa,Z)}else{var ac=[];y.each(aa.todo.values,function(af,ag){var ai,ah,ae=b(aa,ag);ae.options.position=ae.options.position?I(ae.options.position):I(ag);ae.options.map=N;if(ad){N.setCenter(ae.options.position);ad=false}ah=new z.classes.Marker(ae.options);ac.push(ah);ai=V.add({todo:ae},"marker",ah);n(T,{todo:ae},ah,ai)});O(aa,Y?ac:ac[0])}};this.getroute=function(Y){Y.opts.origin=I(Y.opts.origin,true);Y.opts.destination=I(Y.opts.destination,true);G().route(Y.opts,function(aa,Z){X(Y,Z==google.maps.DirectionsStatus.OK?aa:false,Z);P.ack()})};this.directionsrenderer=function(Y){Y.opts.map=N;var aa,Z=new google.maps.DirectionsRenderer(Y.opts);if(Y.todo.divId){Z.setPanel(document.getElementById(Y.todo.divId))}else{if(Y.todo.container){Z.setPanel(y(Y.todo.container).get(0))}}aa=V.add(Y,"directionsrenderer",Z);O(Y,Z,aa)};this.getgeoloc=function(Y){O(Y,Y.latLng)};this.styledmaptype=function(Y){L();var Z=new z.classes.StyledMapType(Y.todo.styles,Y.opts);N.mapTypes.set(Y.todo.id,Z);O(Y,Z)};this.imagemaptype=function(Y){L();var Z=new z.classes.ImageMapType(Y.opts);N.mapTypes.set(Y.todo.id,Z);O(Y,Z)};this.autofit=function(Y){var Z=new google.maps.LatLngBounds();y.each(V.all(),function(aa,ab){if(ab.getPosition){Z.extend(ab.getPosition())}else{if(ab.getBounds){Z.extend(ab.getBounds().getNorthEast());Z.extend(ab.getBounds().getSouthWest())}else{if(ab.getPaths){ab.getPaths().forEach(function(ac){ac.forEach(function(ad){Z.extend(ad)})})}else{if(ab.getPath){ab.getPath().forEach(function(ac){Z.extend(ac);""})}else{if(ab.getCenter){Z.extend(ab.getCenter())}else{if(ab instanceof a){ab=V.getById(ab.id(),true);if(ab){ab.autofit(Z)}}}}}}}});if(!Z.isEmpty()&&(!N.getBounds()||!N.getBounds().equals(Z))){if("maxZoom" in Y.todo){google.maps.event.addListenerOnce(N,"bounds_changed",function(){if(this.getZoom()>Y.todo.maxZoom){this.setZoom(Y.todo.maxZoom)}})}N.fitBounds(Z)}O(Y,true)};this.clear=function(Y){if(typeof Y.todo==="string"){if(V.clearById(Y.todo)||V.objClearById(Y.todo)){O(Y,true);return}Y.todo={name:Y.todo}}if(Y.todo.id){y.each(g(Y.todo.id),function(Z,aa){V.clearById(aa)||V.objClearById(aa)})}else{V.clear(g(Y.todo.name),Y.todo.last,Y.todo.first,Y.todo.tag);V.objClear(g(Y.todo.name),Y.todo.last,Y.todo.first,Y.todo.tag)}O(Y,true)};this.exec=function(Y){var Z=this;y.each(g(Y.todo.func),function(aa,ab){y.each(Z.get(Y.todo,true,Y.todo.hasOwnProperty("full")?Y.todo.full:true),function(ac,ad){ab.call(T,ad)})});O(Y,true)};this.get=function(aa,ad,ac){var Z,ab,Y=ad?aa:aa.todo;if(!ad){ac=Y.full}if(typeof Y==="string"){ab=V.getById(Y,false,ac)||V.objGetById(Y);if(ab===false){Z=Y;Y={}}}else{Z=Y.name}if(Z==="map"){ab=N}if(!ab){ab=[];if(Y.id){y.each(g(Y.id),function(ae,af){ab.push(V.getById(af,false,ac)||V.objGetById(af))});if(!y.isArray(Y.id)){ab=ab[0]}}else{y.each(Z?g(Z):[t],function(af,ag){var ae;if(Y.first){ae=V.get(ag,false,Y.tag,ac);if(ae){ab.push(ae)}}else{if(Y.all){y.each(V.all(ag,Y.tag,ac),function(ai,ah){ab.push(ah)})}else{ae=V.get(ag,true,Y.tag,ac);if(ae){ab.push(ae)}}}});if(!Y.all&&!y.isArray(Z)){ab=ab[0]}}}ab=y.isArray(ab)||!Y.all?ab:[ab];if(ad){return ab}else{O(aa,ab)}};this.getdistance=function(Y){var Z;Y.opts.origins=g(Y.opts.origins);for(Z=0;Z<Y.opts.origins.length;Z++){Y.opts.origins[Z]=I(Y.opts.origins[Z],true)}Y.opts.destinations=g(Y.opts.destinations);for(Z=0;Z<Y.opts.destinations.length;Z++){Y.opts.destinations[Z]=I(Y.opts.destinations[Z],true)}B().getDistanceMatrix(Y.opts,function(ab,aa){X(Y,aa===google.maps.DistanceMatrixStatus.OK?ab:false,aa);P.ack()})};this.trigger=function(Z){if(typeof Z.todo==="string"){google.maps.event.trigger(N,Z.todo)}else{var Y=[N,Z.todo.eventName];if(Z.todo.var_args){y.each(Z.todo.var_args,function(ab,aa){Y.push(aa)})}google.maps.event.trigger.apply(google.maps.event,Y)}X(Z);P.ack()}}function s(M){var L;if(!typeof M==="object"||!M.hasOwnProperty("get")){return false}for(L in M){if(L!=="get"){return false}}return !M.get.hasOwnProperty("callback")}y.fn.gmap3=function(){var M,O=[],N=true,L=[];J();for(M=0;M<arguments.length;M++){if(arguments[M]){O.push(arguments[M])}}if(!O.length){O.push("map")}y.each(this,function(){var P=y(this),Q=P.data("gmap3");N=false;if(!Q){Q=new K(P);P.data("gmap3",Q)}if(O.length===1&&(O[0]==="get"||s(O[0]))){if(O[0]==="get"){L.push(Q.get("map",true))}else{L.push(Q.get(O[0].get,true,O[0].get.full))}}else{Q._plan(O)}});if(L.length){if(L.length===1){return L[0]}else{return L}}return this}})(jQuery);


/* --- $HOVERDIR --- */

/**
 * jQuery.Hoverdir
 *
 * Modified version of https://github.com/codrops/DirectionAwareHoverEffect
 *
 * Modifications:
 * - Removed CSS3 transitions and Modernizr requirements.
 * - Applied CSS classes for improved flexibility via CSS.
 *
 * @copyright  2015 WebMan - Oliver Juhas, www.webmandesign.eu
 *
 * @link  https://github.com/webmandesign/jquery.hoverdir
 *
 * @version  1.1.2
 */

/**
 * jquery.hoverdir.js v1.1.2
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */


(function($) {

	$.HoverDir = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	$.HoverDir.defaults = {
		speed : 300,
		easing : 'ease',
		hoverDelay : 0,
		inverse : false
	};

	$.HoverDir.prototype = {

		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.HoverDir.defaults, options );
			// transition properties
			this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
			// support for CSS transitions
			this.support = Modernizr.csstransitions;
			// load the events
			this._loadEvents();

		},
		_loadEvents : function() {

			var self = this;

			this.$el.on( 'mouseenter.hoverdir, mouseleave.hoverdir', function( event ) {

				var $el = $( this ),
					$hoverElem = $el.find( 'div' ),
					direction = self._getDir( $el, { x : event.pageX, y : event.pageY } ),
					styleCSS = self._getStyle( direction );

				if( event.type === 'mouseenter' ) {

					$hoverElem.hide().css( styleCSS.from );
					clearTimeout( self.tmhover );

					self.tmhover = setTimeout( function() {
						$hoverElem.show( 0, function() {
							var $el = $( this );
							if( self.support ) {
								$el.css( 'transition', self.transitionProp );
							}
							self._applyAnimation( $el, styleCSS.to, self.options.speed );
						} );


					}, self.options.hoverDelay );

				}
				else {

					if( self.support ) {
						$hoverElem.css( 'transition', self.transitionProp );
					}
					clearTimeout( self.tmhover );
					self._applyAnimation( $hoverElem, styleCSS.from, self.options.speed );
				}
			} );
		},
		// credits : http://stackoverflow.com/a/3647634
		_getDir : function( $el, coordinates ) {

			// the width and height of the current div
			var w = $el.width(),
				h = $el.height(),

			// calculate the x and y to get an angle to the center of the div from that x and y.
			// gets the x value relative to the center of the DIV and "normalize" it
				x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
				y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),

			// the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
			// first calculate the angle of the point,
			// add 180 deg to get rid of the negative values
			// divide by 90 to get the quadrant
			// add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
				direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 ) % 4;
			return direction;
		},
		_getStyle : function( direction ) {

			var fromStyle, toStyle,
				slideFromTop = {transform: "translate3d(0,-50%, 0)"},
				slideFromBottom = {transform: "translate3d(0, 50%, 0)"},
				slideFromLeft = {transform: "translate3d(-20%, 0, 0)"},
				slideFromRight = {transform: "translate3d(20%, 0, 0)"},
				slideTop = {transform: "none"},
				slideLeft = {transform: "none"};

			switch( direction ) {
				case 0:
					// from top
					fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
					toStyle = slideTop;
					break;
				case 1:
					// from right
					fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
					toStyle = slideLeft;
					break;
				case 2:
					// from bottom
					fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
					toStyle = slideTop;
					break;
				case 3:
					// from left
					fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
					toStyle = slideLeft;
					break;
			};
			return { from : fromStyle, to : toStyle };
		},
		// apply a transition or fallback to jquery animate based on ModernizrModernizr.csstransitions support
		_applyAnimation : function( el, styleCSS, speed ) {
			$.fn.applyStyle = this.support ? $.fn.css : $.fn.animate;
			el.stop().applyStyle( styleCSS, $.extend( true, [], { duration : speed + 'ms' } ) );
		}
	};

	var logError = function( message ) {

		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.hoverdir = function( options ) {

		var instance = $.data( this, 'hoverdir' );

		if ( typeof options === 'string' ) {

			var args = Array.prototype.slice.call( arguments, 1 );

			this.each(function() {

				if ( !instance ) {
					logError( "cannot call methods on hoverdir prior to initialization; " +
						"attempted to call method '" + options + "'" );
					return;
				}

				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for hoverdir instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} else {
			this.each(function() {
				if ( instance ) {
					instance._init();
				} else {
					instance = $.data( this, 'hoverdir', new $.HoverDir( options, this ) );
				}
			});
		}
		return instance;
	};

})(jQuery);

/* --- $HOVERINTENT ---*/

/*!
 * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */

/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */

(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery);

/* Infinite Scroll
 from here: https://github.com/clockworkgeek/infinite-scroll - it is a fork of the original
 added localStorage history so it will try and regenerate on back in browser
 */

/*  !!!!!!!!!! Modified to include a startCallback !!!!!!!!!!!!! */

/*jshint undef: true */
/*global jQuery: true */

/*
 --------------------------------
 Infinite Scroll
 --------------------------------
 + https://github.com/paulirish/infinite-scroll
 + version 2.0b2.120519
 + Copyright 2011/12 Paul Irish & Luke Shumard
 + Licensed under the MIT license

 + Documentation: http://infinite-scroll.com/
 */

(function (window, $, undefined) {
	"use strict";

	$.infinitescroll = function infscr(options, callback, element) {
		this.element = $(element);

		// Flag the object in the event of a failed creation
		if (!this._create(options, callback)) {
			this.failed = true;
		}
	};

	$.infinitescroll.defaults = {
		loading: {
			finished: undefined,
			finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
			img: "data:image/gif;base64,R0lGODlh3AATAPQeAPDy+MnQ6LW/4N3h8MzT6rjC4sTM5r/I5NHX7N7j8c7U6tvg8OLl8uXo9Ojr9b3G5MfP6Ovu9tPZ7PT1+vX2+tbb7vf4+8/W69jd7rC73vn5/O/x+K243ai02////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgD/ACwAAAAA3AATAAAF/6AnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEj0BAScpHLJbDqf0Kh0Sq1ar9isdioItAKGw+MAKYMFhbF63CW438f0mg1R2O8EuXj/aOPtaHx7fn96goR4hmuId4qDdX95c4+RBIGCB4yAjpmQhZN0YGYGXitdZBIVGAsLoq4BBKQDswm1CQRkcG6ytrYKubq8vbfAcMK9v7q7EMO1ycrHvsW6zcTKsczNz8HZw9vG3cjTsMIYqQkCLBwHCgsMDQ4RDAYIqfYSFxDxEfz88/X38Onr16+Bp4ADCco7eC8hQYMAEe57yNCew4IVBU7EGNDiRn8Z831cGLHhSIgdFf9chIeBg7oA7gjaWUWTVQAGE3LqBDCTlc9WOHfm7PkTqNCh54rePDqB6M+lR536hCpUqs2gVZM+xbrTqtGoWqdy1emValeXKzggYBBB5y1acFNZmEvXAoN2cGfJrTv3bl69Ffj2xZt3L1+/fw3XRVw4sGDGcR0fJhxZsF3KtBTThZxZ8mLMgC3fRatCbYMNFCzwLEqLgE4NsDWs/tvqdezZf13Hvk2A9Szdu2X3pg18N+68xXn7rh1c+PLksI/Dhe6cuO3ow3NfV92bdArTqC2Ebd3A8vjf5QWfH6Bg7Nz17c2fj69+fnq+8N2Lty+fuP78/eV2X13neIcCeBRwxorbZrA1ANoCDGrgoG8RTshahQ9iSKEEzUmYIYfNWViUhheCGJyIP5E4oom7WWjgCeBFAJNv1DVV01MAdJhhjdkplWNzO/5oXI846njjVEIqR2OS2B1pE5PVscajkxhMycqLJghQSwT40PgfAl4GqNSXYdZXJn5gSkmmmmJu1aZYb14V51do+pTOCmA40AqVCIhG5IJ9PvYnhIFOxmdqhpaI6GeHCtpooisuutmg+Eg62KOMKuqoTaXgicQWoIYq6qiklmoqFV0UoeqqrLbq6quwxirrrLTWauutJ4QAACH5BAUKABwALAcABADOAAsAAAX/IPd0D2dyRCoUp/k8gpHOKtseR9yiSmGbuBykler9XLAhkbDavXTL5k2oqFqNOxzUZPU5YYZd1XsD72rZpBjbeh52mSNnMSC8lwblKZGwi+0QfIJ8CncnCoCDgoVnBHmKfByGJimPkIwtiAeBkH6ZHJaKmCeVnKKTHIihg5KNq4uoqmEtcRUtEREMBggtEr4QDrjCuRC8h7/BwxENeicSF8DKy82pyNLMOxzWygzFmdvD2L3P0dze4+Xh1Arkyepi7dfFvvTtLQkZBC0T/FX3CRgCMOBHsJ+EHYQY7OinAGECgQsB+Lu3AOK+CewcWjwxQeJBihtNGHSoQOE+iQ3//4XkwBBhRZMcUS6YSXOAwIL8PGqEaSJCiYt9SNoCmnJPAgUVLChdaoFBURN8MAzl2PQphwQLfDFd6lTowglHve6rKpbjhK7/pG5VinZP1qkiz1rl4+tr2LRwWU64cFEihwEtZgbgR1UiHaMVvxpOSwBA37kzGz9e8G+B5MIEKLutOGEsAH2ATQwYfTmuX8aETWdGPZmiZcccNSzeTCA1Sw0bdiitC7LBWgu8jQr8HRzqgpK6gX88QbrB14z/kF+ELpwB8eVQj/JkqdylAudji/+ts3039vEEfK8Vz2dlvxZKG0CmbkKDBvllRd6fCzDvBLKBDSCeffhRJEFebFk1k/Mv9jVIoIJZSeBggwUaNeB+Qk34IE0cXlihcfRxkOAJFFhwGmKlmWDiakZhUJtnLBpnWWcnKaAZcxI0piFGGLBm1mc90kajSCveeBVWKeYEoU2wqeaQi0PetoE+rr14EpVC7oAbAUHqhYExbn2XHHsVqbcVew9tx8+XJKk5AZsqqdlddGpqAKdbAYBn1pcczmSTdWvdmZ17c1b3FZ99vnTdCRFM8OEcAhLwm1NdXnWcBBSMRWmfkWZqVlsmLIiAp/o1gGV2vpS4lalGYsUOqXrddcKCmK61aZ8SjEpUpVFVoCpTj4r661Km7kBHjrDyc1RAIQAAIfkEBQoAGwAsBwAEAM4ACwAABf/gtmUCd4goQQgFKj6PYKi0yrrbc8i4ohQt12EHcal+MNSQiCP8gigdz7iCioaCIvUmZLp8QBzW0EN2vSlCuDtFKaq4RyHzQLEKZNdiQDhRDVooCwkbfm59EAmKi4SGIm+AjIsKjhsqB4mSjT2IOIOUnICeCaB/mZKFNTSRmqVpmJqklSqskq6PfYYCDwYHDC4REQwGCBLGxxIQDsHMwhAIX8bKzcENgSLGF9PU1j3Sy9zX2NrgzQziChLk1BHWxcjf7N046tvN82715czn9Pryz6Ilc4ACj4EBOCZM8KEnAYYADBRKnACAYUMFv1wotIhCEcaJCisqwJFgAUSQGyX/kCSVUUTIdKMwJlyo0oXHlhskwrTJciZHEXsgaqS4s6PJiCAr1uzYU8kBBSgnWFqpoMJMUjGtDmUwkmfVmVypakWhEKvXsS4nhLW5wNjVroJIoc05wSzTr0PtiigpYe4EC2vj4iWrFu5euWIMRBhacaVJhYQBEFjA9jHjyQ0xEABwGceGAZYjY0YBOrRLCxUp29QM+bRkx5s7ZyYgVbTqwwti2ybJ+vLtDYpycyZbYOlptxdx0kV+V7lC5iJAyyRrwYKxAdiz82ng0/jnAdMJFz0cPi104Ec1Vj9/M6F173vKL/feXv156dw11tlqeMMnv4V5Ap53GmjQQH97nFfg+IFiucfgRX5Z8KAgbUlQ4IULIlghhhdOSB6AgX0IVn8eReghen3NRIBsRgnH4l4LuEidZBjwRpt6NM5WGwoW0KSjCwX6yJSMab2GwwAPDXfaBCtWpluRTQqC5JM5oUZAjUNS+VeOLWpJEQ7VYQANW0INJSZVDFSnZphjSikfmzE5N4EEbQI1QJmnWXCmHulRp2edwDXF43txukenJwvI9xyg9Q26Z3MzGUcBYFEChZh6DVTq34AU8Iflh51Sd+CnKFYQ6mmZkhqfBKfSxZWqA9DZanWjxmhrWwi0qtCrt/43K6WqVjjpmhIqgEGvculaGKklKstAACEAACH5BAUKABwALAcABADOAAsAAAX/ICdyQmaMYyAUqPgIBiHPxNpy79kqRXH8wAPsRmDdXpAWgWdEIYm2llCHqjVHU+jjJkwqBTecwItShMXkEfNWSh8e1NGAcLgpDGlRgk7EJ/6Ae3VKfoF/fDuFhohVeDeCfXkcCQqDVQcQhn+VNDOYmpSWaoqBlUSfmowjEA+iEAEGDRGztAwGCDcXEA60tXEiCrq8vREMEBLIyRLCxMWSHMzExnbRvQ2Sy7vN0zvVtNfU2tLY3rPgLdnDvca4VQS/Cpk3ABwSLQkYAQwT/P309vcI7OvXr94jBQMJ/nskkGA/BQBRLNDncAIAiDcG6LsxAWOLiQzmeURBKWSLCQbv/1F0eDGinJUKR47YY1IEgQASKk7Yc7ACRwZm7mHweRJoz59BJUogisKCUaFMR0x4SlJBVBFTk8pZivTR0K73rN5wqlXEAq5Fy3IYgHbEzQ0nLy4QSoCjXLoom96VOJEeCosK5n4kkFfqXjl94wa+l1gvAcGICbewAOAxY8l/Ky/QhAGz4cUkGxu2HNozhwMGBnCUqUdBg9UuW9eUynqSwLHIBujePef1ZGQZXcM+OFuEBeBhi3OYgLyqcuaxbT9vLkf4SeqyWxSQpKGB2gQpm1KdWbu72rPRzR9Ne2Nu9Kzr/1Jqj0yD/fvqP4aXOt5sW/5qsXXVcv1Nsp8IBUAmgswGF3llGgeU1YVXXKTN1FlhWFXW3gIE+DVChApysACHHo7Q4A35lLichh+ROBmLKAzgYmYEYDAhCgxKGOOMn4WR4kkDaoBBOxJtdNKQxFmg5JIWIBnQc07GaORfUY4AEkdV6jHlCEISSZ5yTXpp1pbGZbkWmcuZmQCaE6iJ0FhjMaDjTMsgZaNEHFRAQVp3bqXnZED1qYcECOz5V6BhSWCoVJQIKuKQi2KFKEkEFAqoAo7uYSmO3jk61wUUMKmknJ4SGimBmAa0qVQBhAAAIfkEBQoAGwAsBwAEAM4ACwAABf/gJm5FmRlEqhJC+bywgK5pO4rHI0D3pii22+Mg6/0Ej96weCMAk7cDkXf7lZTTnrMl7eaYoy10JN0ZFdco0XAuvKI6qkgVFJXYNwjkIBcNBgR8TQoGfRsJCRuCYYQQiI+ICosiCoGOkIiKfSl8mJkHZ4U9kZMbKaI3pKGXmJKrngmug4WwkhA0lrCBWgYFCCMQFwoQDRHGxwwGCBLMzRLEx8iGzMMO0cYNeCMKzBDW19lnF9DXDIY/48Xg093f0Q3s1dcR8OLe8+Y91OTv5wrj7o7B+7VNQqABIoRVCMBggsOHE36kSoCBIcSH3EbFangxogJYFi8CkJhqQciLJEf/LDDJEeJIBT0GsOwYUYJGBS0fjpQAMidGmyVP6sx4Y6VQhzs9VUwkwqaCCh0tmKoFtSMDmBOf9phg4SrVrROuasRQAaxXpVUhdsU6IsECZlvX3kwLUWzRt0BHOLTbNlbZG3vZinArge5Dvn7wbqtQkSYAAgtKmnSsYKVKo2AfW048uaPmG386i4Q8EQMBAIAnfB7xBxBqvapJ9zX9WgRS2YMpnvYMGdPK3aMjt/3dUcNI4blpj7iwkMFWDXDvSmgAlijrt9RTR78+PS6z1uAJZIe93Q8g5zcsWCi/4Y+C8bah5zUv3vv89uft30QP23punGCx5954oBBwnwYaNCDY/wYrsYeggnM9B2Fpf8GG2CEUVWhbWAtGouEGDy7Y4IEJVrbSiXghqGKIo7z1IVcXIkKWWR361QOLWWnIhwERpLaaCCee5iMBGJQmJGyPFTnbkfHVZGRtIGrg5HALEJAZbu39BuUEUmq1JJQIPtZilY5hGeSWsSk52G9XqsmgljdIcABytq13HyIM6RcUA+r1qZ4EBF3WHWB29tBgAzRhEGhig8KmqKFv8SeCeo+mgsF7YFXa1qWSbkDpom/mqR1PmHCqJ3fwNRVXjC7S6CZhFVCQ2lWvZiirhQq42SACt25IK2hv8TprriUV1usGgeka7LFcNmCldMLi6qZMgFLgpw16Cipb7bC1knXsBiEAACH5BAUKABsALAcABADOAAsAAAX/4FZsJPkUmUGsLCEUTywXglFuSg7fW1xAvNWLF6sFFcPb42C8EZCj24EJdCp2yoegWsolS0Uu6fmamg8n8YYcLU2bXSiRaXMGvqV6/KAeJAh8VgZqCX+BexCFioWAYgqNi4qAR4ORhRuHY408jAeUhAmYYiuVlpiflqGZa5CWkzc5fKmbbhIpsAoQDRG8vQwQCBLCwxK6vb5qwhfGxxENahvCEA7NzskSy7vNzzzK09W/PNHF1NvX2dXcN8K55cfh69Luveol3vO8zwi4Yhj+AQwmCBw4IYclDAAJDlQggVOChAoLKkgFkSCAHDwWLKhIEOONARsDKryogFPIiAUb/95gJNIiw4wnI778GFPhzBKFOAq8qLJEhQpiNArjMcHCmlTCUDIouTKBhApELSxFWiGiVKY4E2CAekPgUphDu0742nRrVLJZnyrFSqKQ2ohoSYAMW6IoDpNJ4bLdILTnAj8KUF7UeENjAKuDyxIgOuGiOI0EBBMgLNew5AUrDTMGsFixwBIaNCQuAXJB57qNJ2OWm2Aj4skwCQCIyNkhhtMkdsIuodE0AN4LJDRgfLPtn5YDLdBlraAByuUbBgxQwICxMOnYpVOPej074OFdlfc0TqC62OIbcppHjV4o+LrieWhfT8JC/I/T6W8oCl29vQ0XjLdBaA3s1RcPBO7lFvpX8BVoG4O5jTXRQRDuJ6FDTzEWF1/BCZhgbyAKE9qICYLloQYOFtahVRsWYlZ4KQJHlwHS/IYaZ6sZd9tmu5HQm2xi1UaTbzxYwJk/wBF5g5EEYOBZeEfGZmNdFyFZmZIR4jikbLThlh5kUUVJGmRT7sekkziRWUIACABk3T4qCsedgO4xhgGcY7q5pHJ4klBBTQRJ0CeHcoYHHUh6wgfdn9uJdSdMiebGJ0zUPTcoS286FCkrZxnYoYYKWLkBowhQoBeaOlZAgVhLidrXqg2GiqpQpZ4apwSwRtjqrB3muoF9BboaXKmshlqWqsWiGt2wphJkQbAU5hoCACH5BAUKABsALAcABADOAAsAAAX/oGFw2WZuT5oZROsSQnGaKjRvilI893MItlNOJ5v5gDcFrHhKIWcEYu/xFEqNv6B1N62aclysF7fsZYe5aOx2yL5aAUGSaT1oTYMBwQ5VGCAJgYIJCnx1gIOBhXdwiIl7d0p2iYGQUAQBjoOFSQR/lIQHnZ+Ue6OagqYzSqSJi5eTpTxGcjcSChANEbu8DBAIEsHBChe5vL13G7fFuscRDcnKuM3H0La3EA7Oz8kKEsXazr7Cw9/Gztar5uHHvte47MjktznZ2w0G1+D3BgirAqJmJMAQgMGEgwgn5Ei0gKDBhBMALGRYEOJBb5QcWlQo4cbAihZz3GgIMqFEBSM1/4ZEOWPAgpIIJXYU+PIhRG8ja1qU6VHlzZknJNQ6UanCjQkWCIGSUGEjAwVLjc44+DTqUQtPPS5gejUrTa5TJ3g9sWCr1BNUWZI161StiQUDmLYdGfesibQ3XMq1OPYthrwuA2yU2LBs2cBHIypYQPPlYAKFD5cVvNPtW8eVGbdcQADATsiNO4cFAPkvHpedPzc8kUcPgNGgZ5RNDZG05reoE9s2vSEP79MEGiQGy1qP8LA4ZcdtsJE48ONoLTBtTV0B9LsTnPceoIDBDQvS7W7vfjVY3q3eZ4A339J4eaAmKqU/sV58HvJh2RcnIBsDUw0ABqhBA5aV5V9XUFGiHfVeAiWwoFgJJrIXRH1tEMiDFV4oHoAEGlaWhgIGSGBO2nFomYY3mKjVglidaNYJGJDkWW2xxTfbjCbVaOGNqoX2GloR8ZeTaECS9pthRGJH2g0b3Agbk6hNANtteHD2GJUucfajCQBy5OOTQ25ZgUPvaVVQmbKh9510/qQpwXx3SQdfk8tZJOd5b6JJFplT3ZnmmX3qd5l1eg5q00HrtUkUn0AKaiGjClSAgKLYZcgWXwocGRcCFGCKwSB6ceqphwmYRUFYT/1WKlOdUpipmxW0mlCqHjYkAaeoZlqrqZ4qd+upQKaapn/AmgAegZ8KUtYtFAQQAgAh+QQFCgAbACwHAAQAzgALAAAF/+C2PUcmiCiZGUTrEkKBis8jQEquKwU5HyXIbEPgyX7BYa5wTNmEMwWsSXsqFbEh8DYs9mrgGjdK6GkPY5GOeU6ryz7UFopSQEzygOGhJBjoIgMDBAcBM0V/CYqLCQqFOwobiYyKjn2TlI6GKC2YjJZknouaZAcQlJUHl6eooJwKooobqoewrJSEmyKdt59NhRKFMxLEEA4RyMkMEAjDEhfGycqAG8TQx9IRDRDE3d3R2ctD1RLg0ttKEnbY5wZD3+zJ6M7X2RHi9Oby7u/r9g38UFjTh2xZJBEBMDAboogAgwkQI07IMUORwocSJwCgWDFBAIwZOaJIsOBjRogKJP8wTODw5ESVHVtm3AhzpEeQElOuNDlTZ0ycEUWKWFASqEahGwYUPbnxoAgEdlYSqDBkgoUNClAlIHbSAoOsqCRQnQHxq1axVb06FWFxLIqyaze0Tft1JVqyE+pWXMD1pF6bYl3+HTqAWNW8cRUFzmih0ZAAB2oGKukSAAGGRHWJgLiR6AylBLpuHKKUMlMCngMpDSAa9QIUggZVVvDaJobLeC3XZpvgNgCmtPcuwP3WgmXSq4do0DC6o2/guzcseECtUoO0hmcsGKDgOt7ssBd07wqesAIGZC1YIBa7PQHvb1+SFo+++HrJSQfB33xfav3i5eX3Hnb4CTJgegEq8tH/YQEOcIJzbm2G2EoYRLgBXFpVmFYDcREV4HIcnmUhiGBRouEMJGJGzHIspqgdXxK0yCKHRNXoIX4uorCdTyjkyNtdPWrA4Up82EbAbzMRxxZRR54WXVLDIRmRcag5d2R6ugl3ZXzNhTecchpMhIGVAKAYpgJjjsSklBEd99maZoo535ZvdamjBEpusJyctg3h4X8XqodBMx0tiNeg/oGJaKGABpogS40KSqiaEgBqlQWLUtqoVQnytekEjzo0hHqhRorppOZt2p923M2AAV+oBtpAnnPNoB6HaU6mAAIU+IXmi3j2mtFXuUoHKwXpzVrsjcgGOauKEjQrwq157hitGq2NoWmjh7z6Wmxb0m5w66+2VRAuXN/yFUAIACH5BAUKABsALAcABADOAAsAAAX/4CZuRiaM45MZqBgIRbs9AqTcuFLE7VHLOh7KB5ERdjJaEaU4ClO/lgKWjKKcMiJQ8KgumcieVdQMD8cbBeuAkkC6LYLhOxoQ2PF5Ys9PKPBMen17f0CCg4VSh32JV4t8jSNqEIOEgJKPlkYBlJWRInKdiJdkmQlvKAsLBxdABA4RsbIMBggtEhcQsLKxDBC2TAS6vLENdJLDxMZAubu8vjIbzcQRtMzJz79S08oQEt/guNiyy7fcvMbh4OezdAvGrakLAQwyABsELQkY9BP+//ckyPDD4J9BfAMh1GsBoImMeQUN+lMgUJ9CiRMa5msxoB9Gh/o8GmxYMZXIgxtR/yQ46S/gQAURR0pDwYDfywoyLPip5AdnCwsMFPBU4BPFhKBDi444quCmDKZOfwZ9KEGpCKgcN1jdALSpPqIYsabS+nSqvqplvYqQYAeDPgwKwjaMtiDl0oaqUAyo+3TuWwUAMPpVCfee0cEjVBGQq2ABx7oTWmQk4FglZMGN9fGVDMCuiH2AOVOu/PmyxM630gwM0CCn6q8LjVJ8GXvpa5Uwn95OTC/nNxkda1/dLSK475IjCD6dHbK1ZOa4hXP9DXs5chJ00UpVm5xo2qRpoxptwF2E4/IbJpB/SDz9+q9b1aNfQH08+p4a8uvX8B53fLP+ycAfemjsRUBgp1H20K+BghHgVgt1GXZXZpZ5lt4ECjxYR4ScUWiShEtZqBiIInRGWnERNnjiBglw+JyGnxUmGowsyiiZg189lNtPGACjV2+S9UjbU0JWF6SPvEk3QZEqsZYTk3UAaRSUnznJI5LmESCdBVSyaOWUWLK4I5gDUYVeV1T9l+FZClCAUVA09uSmRHBCKAECFEhW51ht6rnmWBXkaR+NjuHpJ40D3DmnQXt2F+ihZxlqVKOfQRACACH5BAUKABwALAcABADOAAsAAAX/ICdyUCkUo/g8mUG8MCGkKgspeC6j6XEIEBpBUeCNfECaglBcOVfJFK7YQwZHQ6JRZBUqTrSuVEuD3nI45pYjFuWKvjjSkCoRaBUMWxkwBGgJCXspQ36Bh4EEB0oKhoiBgyNLjo8Ki4QElIiWfJqHnISNEI+Ql5J9o6SgkqKkgqYihamPkW6oNBgSfiMMDQkGCBLCwxIQDhHIyQwQCGMKxsnKVyPCF9DREQ3MxMPX0cu4wt7J2uHWx9jlKd3o39MiuefYEcvNkuLt5O8c1ePI2tyELXGQwoGDAQf+iEC2xByDCRAjTlAgIUWCBRgCPJQ4AQBFXAs0coT40WLIjRxL/47AcHLkxIomRXL0CHPERZkpa4q4iVKiyp0tR/7kwHMkTUBBJR5dOCEBAVcKKtCAyOHpowXCpk7goABqBZdcvWploACpBKkpIJI1q5OD2rIWE0R1uTZu1LFwbWL9OlKuWb4c6+o9i3dEgw0RCGDUG9KlRw56gDY2qmCByZBaASi+TACA0TucAaTteCcy0ZuOK3N2vJlx58+LRQyY3Xm0ZsgjZg+oPQLi7dUcNXi0LOJw1pgNtB7XG6CBy+U75SYfPTSQAgZTNUDnQHt67wnbZyvwLgKiMN3oCZB3C76tdewpLFgIP2C88rbi4Y+QT3+8S5USMICZXWj1pkEDeUU3lOYGB3alSoEiMIjgX4WlgNF2EibIwQIXauWXSRg2SAOHIU5IIIMoZkhhWiJaiFVbKo6AQEgQXrTAazO1JhkBrBG3Y2Y6EsUhaGn95hprSN0oWpFE7rhkeaQBchGOEWnwEmc0uKWZj0LeuNV3W4Y2lZHFlQCSRjTIl8uZ+kG5HU/3sRlnTG2ytyadytnD3HrmuRcSn+0h1dycexIK1KCjYaCnjCCVqOFFJTZ5GkUUjESWaUIKU2lgCmAKKQIUjHapXRKE+t2og1VgankNYnohqKJ2CmKplso6GKz7WYCgqxeuyoF8u9IQAgA7",
			msg: null,
			msgText: "<em>Loading the next set of posts...</em>",
			selector: null,
			speed: 'fast',
			start: undefined
		},
		state: {
			isDuringAjax: false,
			isInvalidPage: false,
			isDestroyed: false,
			isDone: false, // For when it goes all the way through the archive.
			isPaused: false,
			isBeyondMaxPage: false,
			currPage: 1
		},
		debug: false,
		behavior: undefined,
		binder: $(window), // used to cache the selector
		nextSelector: "div.navigation a:first",
		navSelector: "div.navigation",
		contentSelector: null, // rename to pageFragment
		extraScrollPx: 150,
		itemSelector: "div.post",
		animate: false,
		pathParse: undefined,
		dataType: 'html',
		appendCallback: true,
		bufferPx: 40,
		errorCallback: function () { },
		startCallback: function () { },
		infid: 0, //Instance ID
		pixelsFromNavToBottom: undefined,
		path: undefined, // Either parts of a URL as an array (e.g. ["/page/", "/"] or a function that takes in the page number and returns a URL
		prefill: false, // When the document is smaller than the window, load data until the document is larger or links are exhausted
		maxPage: undefined // to manually control maximum page (when maxPage is undefined, maximum page limitation is not work)
	};

	$.infinitescroll.prototype = {

		/*
		 ----------------------------
		 Private methods
		 ----------------------------
		 */

		// Bind or unbind from scroll
		_binding: function infscr_binding(binding) {

			var instance = this,
				opts = instance.options;

			opts.v = '2.0b2.120520';

			// if behavior is defined and this function is extended, call that instead of default
			if (!!opts.behavior && this['_binding_'+opts.behavior] !== undefined) {
				this['_binding_'+opts.behavior].call(this);
				return;
			}

			if (binding !== 'bind' && binding !== 'unbind') {
				this._debug('Binding value  ' + binding + ' not valid');
				return false;
			}

			if (binding === 'unbind') {
				(this.options.binder).unbind('smartscroll.infscr.' + instance.options.infid);
			} else {
				(this.options.binder)[binding]('smartscroll.infscr.' + instance.options.infid, function () {
					instance.scroll();
				});
			}

			this._debug('Binding', binding);
		},

		// Fundamental aspects of the plugin are initialized
		_create: function infscr_create(options, callback) {

			// Add custom options to defaults
			var opts = $.extend(true, {}, $.infinitescroll.defaults, options);
			this.options = opts;
			var $window = $(window);
			var instance = this;

			// Validate selectors
			if (!instance._validate(options)) {
				return false;
			}

			// Validate page fragment path
			var path = $(opts.nextSelector).attr('href');
			if (!path) {
				this._debug('Navigation selector not found');
				return false;
			}

			// Set the path to be a relative URL from root.
			opts.path = opts.path || this._determinepath(path);

			// contentSelector is 'page fragment' option for .load() / .ajax() calls
			opts.contentSelector = opts.contentSelector || this.element;

			// loading.selector - if we want to place the load message in a specific selector, defaulted to the contentSelector
			opts.loading.selector = opts.loading.selector || opts.contentSelector;

			// Define loading.msg
			opts.loading.msg = opts.loading.msg || $('<div id="infscr-loading"><img alt="Loading..." src="' + opts.loading.img + '" /><div>' + opts.loading.msgText + '</div></div>');

			// Preload loading.img
			(new Image()).src = opts.loading.img;

			// distance from nav links to bottom
			// computed as: height of the document + top offset of container - top offset of nav link
			if(opts.pixelsFromNavToBottom === undefined) {
				opts.pixelsFromNavToBottom = $(document).height() - $(opts.navSelector).offset().top;
				this._debug("pixelsFromNavToBottom: " + opts.pixelsFromNavToBottom);
			}

			var self = this;

			// determine loading.start actions
			opts.loading.start = opts.loading.start || function() {
				// user provided callback when starting
				opts.startCallback.call($(opts.contentSelector)[0],'starting');

				$(opts.navSelector).hide();
				opts.loading.msg
					.appendTo(opts.loading.selector)
					.show(opts.loading.speed, $.proxy(function() {
						this.beginAjax(opts);
					}, self));
			};

			// determine loading.finished actions
			opts.loading.finished = opts.loading.finished || function() {
				if (!opts.state.isBeyondMaxPage)
					opts.loading.msg.fadeOut(opts.loading.speed);
			};

			// callback loading
			opts.callback = function(instance, data, url) {
				if (!!opts.behavior && instance['_callback_'+opts.behavior] !== undefined) {
					instance['_callback_'+opts.behavior].call($(opts.contentSelector)[0], data, url);
				}

				if (callback) {
					callback.call($(opts.contentSelector)[0], data, opts, url);
				}

				if (opts.prefill) {
					$window.bind("resize.infinite-scroll", instance._prefill);
				}
			};

			if (options.debug) {
				// Tell IE9 to use its built-in console
				if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log === "object") {
					["log","info","warn","error","assert","dir","clear","profile","profileEnd"]
						.forEach(function (method) {
							console[method] = this.call(console[method], console);
						}, Function.prototype.bind);
				}
			}

			this._setup();

			// Setups the prefill method for use
			if (opts.prefill) {
				this._prefill();
			}

			// Return true to indicate successful creation
			return true;
		},

		_prefill: function infscr_prefill() {
			var instance = this;
			var $window = $(window);

			function needsPrefill() {
				return (instance.options.contentSelector.height() <= $window.height());
			}

			this._prefill = function() {
				if (needsPrefill()) {
					instance.scroll();
				}

				$window.bind("resize.infinite-scroll", function() {
					if (needsPrefill()) {
						$window.unbind("resize.infinite-scroll");
						instance.scroll();
					}
				});
			};

			// Call self after setting up the new function
			this._prefill();
		},

		// Console log wrapper
		_debug: function infscr_debug() {
			if (true !== this.options.debug) {
				return;
			}

			if (typeof console !== 'undefined' && typeof console.log === 'function') {
				// Modern browsers
				// Single argument, which is a string
				if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
					console.log( (Array.prototype.slice.call(arguments)).toString() );
				} else {
					console.log( Array.prototype.slice.call(arguments) );
				}
			} else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
				// IE8
				Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
			}
		},

		// find the number to increment in the path.
		_determinepath: function infscr_determinepath(path) {

			var opts = this.options;

			// if behavior is defined and this function is extended, call that instead of default
			if (!!opts.behavior && this['_determinepath_'+opts.behavior] !== undefined) {
				return this['_determinepath_'+opts.behavior].call(this,path);
			}

			if (!!opts.pathParse) {

				this._debug('pathParse manual');
				return opts.pathParse(path, this.options.state.currPage+1);

			} else if (path.match(/^(.*?)\b2\b(.*?$)/)) {
				path = path.match(/^(.*?)\b2\b(.*?$)/).slice(1);

				// if there is any 2 in the url at all.
			} else if (path.match(/^(.*?)2(.*?$)/)) {

				// page= is used in django:
				// http://www.infinite-scroll.com/changelog/comment-page-1/#comment-127
				if (path.match(/^(.*?page=)2(\/.*|$)/)) {
					path = path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
					return path;
				}

				path = path.match(/^(.*?)2(.*?$)/).slice(1);

			} else {

				// page= is used in drupal too but second page is page=1 not page=2:
				// thx Jerod Fritz, vladikoff
				if (path.match(/^(.*?page=)1(\/.*|$)/)) {
					path = path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
					return path;
				} else {
					this._debug('Sorry, we couldn\'t parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.');
					// Get rid of isInvalidPage to allow permalink to state
					opts.state.isInvalidPage = true;  //prevent it from running on this page.
				}
			}
			this._debug('determinePath', path);
			return path;

		},

		// Custom error
		_error: function infscr_error(xhr) {

			var opts = this.options;

			// if behavior is defined and this function is extended, call that instead of default
			if (!!opts.behavior && this['_error_'+opts.behavior] !== undefined) {
				this['_error_'+opts.behavior].call(this,xhr);
				return;
			}

			if (xhr !== 'destroy' && xhr !== 'end') {
				xhr = 'unknown';
			}

			this._debug('Error', xhr);

			if (xhr === 'end' || opts.state.isBeyondMaxPage) {
				this._showdonemsg();
			}

			opts.state.isDone = true;
			opts.state.currPage = 1; // if you need to go back to this instance
			opts.state.isPaused = false;
			opts.state.isBeyondMaxPage = false;
			this._binding('unbind');

		},

		_cache: function infscr_cache(url, data) {
			if (window.sessionStorage) {
				sessionStorage.setItem('infscr::'+url, data);
			}
		},

		// Load Callback
		_loadcallback: function infscr_loadcallback(box, data, url) {
			var opts = this.options,
				callback = this.options.callback, // GLOBAL OBJECT FOR CALLBACK
				result = (opts.state.isDone) ? 'done' : (!opts.appendCallback) ? 'no-append' : 'append',
				frag;

			// if behavior is defined and this function is extended, call that instead of default
			if (!!opts.behavior && this['_loadcallback_'+opts.behavior] !== undefined) {
				this['_loadcallback_'+opts.behavior].call(this,box,data);
				return;
			}

			switch (result) {
				case 'done':
					this._showdonemsg();
					return false;

				case 'no-append':
					if (opts.dataType === 'html') {
						data = '<div>' + data + '</div>';
						data = $(data).find(opts.itemSelector);
					}
					break;

				case 'append':
					var children = box.children();
					// if it didn't return anything
					if (children.length === 0) {
						return this._error('end');
					}

					// use a documentFragment because it works when content is going into a table or UL
					frag = document.createDocumentFragment();
					while (box[0].firstChild) {
						frag.appendChild(box[0].firstChild);
					}

					this._debug('contentSelector', $(opts.contentSelector)[0]);
					$(opts.contentSelector)[0].appendChild(frag);
					// previously, we would pass in the new DOM element as context for the callback
					// however we're now using a documentfragment, which doesn't have parents or children,
					// so the context is the contentContainer guy, and we pass in an array
					// of the elements collected as the first argument.

					data = children.get();
					break;
			}

			// loadingEnd function
			opts.loading.finished.call($(opts.contentSelector)[0],opts);

			// smooth scroll to ease in the new content
			if (opts.animate) {
				var scrollTo = $(window).scrollTop() + $(opts.loading.msg).height() + opts.extraScrollPx + 'px';
				$('html,body').animate({ scrollTop: scrollTo }, 800, function () { opts.state.isDuringAjax = false; });
			}

			if (!opts.animate) {
				// once the call is done, we can allow it again.
				opts.state.isDuringAjax = false;
			}

			callback(this, data, url);

			if (opts.prefill) {
				this._prefill();
			}
		},

		_nearbottom: function infscr_nearbottom() {

			var opts = this.options,
				pixelsFromWindowBottomToBottom = 0 + $(document).height() - (opts.binder.scrollTop()) - $(window).height();

			// if behavior is defined and this function is extended, call that instead of default
			if (!!opts.behavior && this['_nearbottom_'+opts.behavior] !== undefined) {
				return this['_nearbottom_'+opts.behavior].call(this);
			}

			this._debug('math:', pixelsFromWindowBottomToBottom, opts.pixelsFromNavToBottom);

			// if distance remaining in the scroll (including buffer) is less than the orignal nav to bottom....
			return (pixelsFromWindowBottomToBottom - opts.bufferPx < opts.pixelsFromNavToBottom);

		},

		// Pause / temporarily disable plugin from firing
		_pausing: function infscr_pausing(pause) {

			var opts = this.options;

			// if behavior is defined and this function is extended, call that instead of default
			if (!!opts.behavior && this['_pausing_'+opts.behavior] !== undefined) {
				this['_pausing_'+opts.behavior].call(this,pause);
				return;
			}

			// If pause is not 'pause' or 'resume', toggle it's value
			if (pause !== 'pause' && pause !== 'resume' && pause !== null) {
				this._debug('Invalid argument. Toggling pause value instead');
			}

			pause = (pause && (pause === 'pause' || pause === 'resume')) ? pause : 'toggle';

			switch (pause) {
				case 'pause':
					opts.state.isPaused = true;
					break;

				case 'resume':
					opts.state.isPaused = false;
					break;

				case 'toggle':
					opts.state.isPaused = !opts.state.isPaused;
					break;
			}

			this._debug('Paused', opts.state.isPaused);
			return false;

		},

		// Behavior is determined
		// If the behavior option is undefined, it will set to default and bind to scroll
		_setup: function infscr_setup() {

			var opts = this.options;

			// if behavior is defined and this function is extended, call that instead of default
			if (!!opts.behavior && this['_setup_'+opts.behavior] !== undefined) {
				this['_setup_'+opts.behavior].call(this);
				return;
			}

			this._binding('bind');

			this.restore();

			return false;

		},

		// Show done message
		_showdonemsg: function infscr_showdonemsg() {

			var opts = this.options;

			// if behavior is defined and this function is extended, call that instead of default
			if (!!opts.behavior && this['_showdonemsg_'+opts.behavior] !== undefined) {
				this['_showdonemsg_'+opts.behavior].call(this);
				return;
			}

			opts.loading.msg
				.find('img')
				.hide()
				.parent()
				.find('div').html(opts.loading.finishedMsg).animate({ opacity: 1 }, 2000, function () {
					$(this).parent().fadeOut(opts.loading.speed);
				});

			// user provided callback when done
			opts.errorCallback.call($(opts.contentSelector)[0],'done');
		},

		// grab each selector option and see if any fail
		_validate: function infscr_validate(opts) {
			for (var key in opts) {
				if (key.indexOf && key.indexOf('Selector') > -1 && $(opts[key]).length === 0) {
					this._debug('Your ' + key + ' found no elements.');
					return false;
				}
			}

			return true;
		},

		/*
		 ----------------------------
		 Public methods
		 ----------------------------
		 */

		// Bind to scroll
		bind: function infscr_bind() {
			this._binding('bind');
		},

		// Destroy current instance of plugin
		destroy: function infscr_destroy() {
			this.options.state.isDestroyed = true;
			this.options.loading.finished();
			return this._error('destroy');
		},

		// Set pause value to false
		pause: function infscr_pause() {
			this._pausing('pause');
		},

		// Set pause value to false
		resume: function infscr_resume() {
			this._pausing('resume');
		},

		beginAjax: function infscr_ajax(opts) {
			var instance = this,
				path = opts.path,
				box, desturl, method, condition;

			// increment the URL bit. e.g. /page/3/
			opts.state.currPage++;

			// Manually control maximum page
			if ( opts.maxPage != undefined && opts.state.currPage > opts.maxPage ){
				opts.state.isBeyondMaxPage = true;
				this.destroy();
				return;
			}

			// if we're dealing with a table we can't use DIVs
			box = $(opts.contentSelector).is('table, tbody') ? $('<tbody/>') : $('<div/>');

			desturl = (typeof path === 'function') ? path(opts.state.currPage) : path.join(opts.state.currPage);
			instance._debug('heading into ajax', desturl);

			method = (opts.dataType === 'html' || opts.dataType === 'json' ) ? opts.dataType : 'html+callback';
			if (opts.appendCallback && opts.dataType === 'html') {
				method += '+callback';
			}

			switch (method) {
				case 'html+callback':
					instance._debug('Using HTML via .load() method');
					box.load(desturl + ' ' + opts.itemSelector, undefined, function infscr_ajax_callback(responseText) {
						instance._loadcallback(box, responseText, desturl);
						instance._cache(desturl, responseText);
					});

					break;

				case 'html':
					instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
					$.ajax({
						// params
						url: desturl,
						dataType: opts.dataType,
						complete: function infscr_ajax_callback(jqXHR, textStatus) {
							condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
							if (condition) {
								instance._loadcallback(box, jqXHR.responseText, desturl);
								instance._cache(destUrl, jqXHR.responseText);
							} else {
								instance._error('end');
							}
						}
					});

					break;
				case 'json':
					instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
					$.ajax({
						dataType: 'json',
						type: 'GET',
						url: desturl,
						success: function (data, textStatus, jqXHR) {
							condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
							if (opts.appendCallback) {
								// if appendCallback is true, you must defined template in options.
								// note that data passed into _loadcallback is already an html (after processed in opts.template(data)).
								if (opts.template !== undefined) {
									var theData = opts.template(data);
									box.append(theData);
									if (condition) {
										instance._loadcallback(box, theData);
										instance._cache(desturl, jqXHR.responseText);
									} else {
										instance._error('end');
									}
								} else {
									instance._debug("template must be defined.");
									instance._error('end');
								}
							} else {
								// if appendCallback is false, we will pass in the JSON object. you should handle it yourself in your callback.
								if (condition) {
									instance._loadcallback(box, data, desturl);
									instance._cache(desturl, jqXHR.responseText);
								} else {
									instance._error('end');
								}
							}
						},
						error: function() {
							instance._debug("JSON ajax request failed.");
							instance._error('end');
						}
					});

					break;
			}
		},

		// Restore from sessionStorage if present, do nothing if content is generated some other way
		// Also requires window.JSON but any UA with sessionStorage will have it
		restore: function infscr_restore() {
			var opts = this.options;
			if (!window.sessionStorage || !!opts.behavior || opts.state.isDestroyed) {
				return;
			}

			// The following mimics beginAjax
			var instance = this,
				path = opts.path,
				box, desturl, method, data;

			desturl = (typeof path === 'function') ? path(opts.state.currPage+1) : path.join(opts.state.currPage+1);
			data = sessionStorage.getItem('infscr::'+desturl);
			if (!data) {
				instance._debug('sessionStorage does not have '+desturl);
				return;
			}

			// increment the URL bit. e.g. /page/3/
			opts.state.currPage++;

			// Manually control maximum page
			if ( opts.maxPage != undefined && opts.state.currPage > opts.maxPage ){
				opts.state.isBeyondMaxPage = true;
				this.destroy();
				return;
			}

			// if we're dealing with a table we can't use DIVs
			box = $(opts.contentSelector).is('table, tbody') ? $('<tbody/>') : $('<div/>');

			method = (opts.dataType === 'html' || opts.dataType === 'json' ) ? opts.dataType : 'html+callback';
			if (opts.appendCallback && opts.dataType === 'html') {
				method += '+callback';
			}

			switch (method) {
				case 'html':
				case 'html+callback':
					instance._debug('Using HTML from sessionStorage ('+desturl+')');
					box.html(!opts.itemSelector
						? data
						: $('<div>').append($(data)).find(opts.itemSelector));
					this._loadcallback(box, data, desturl);
					break;

				case 'json':
					instance._debug('Using JSON from sessionStorage ('+desturl+')');
					if (opts.appendCallback) {
						// if appendCallback is true, you must defined template in options.
						// note that data passed into _loadcallback is already an html (after processed in opts.template(data)).
						if (opts.template !== undefined) {
							var templateData = opts.template(JSON.parse(data));
							box.append(templateData);
							instance._loadcallback(box, templateData, desturl);
						}
						else {
							instance._debug('template must be defined.');
							instance._error('end');
						}
					}
					else {
						// if appendCallback is false, we will pass in the JSON object. you should handle it yourself in your callback.
						instance._loadcallback(box, JSON.parse(data), desturl);
					}
					break;
			}

			// Loaded content may end with navigation to more cached content. Load that too.
			instance.restore();
		},

		// Retrieve next set of content items
		retrieve: function infscr_retrieve(pageNum) {
			pageNum = pageNum || null;

			var instance = this,
				opts = instance.options;

			// if behavior is defined and this function is extended, call that instead of default
			if (!!opts.behavior && this['retrieve_'+opts.behavior] !== undefined) {
				this['retrieve_'+opts.behavior].call(this,pageNum);
				return;
			}

			// for manual triggers, if destroyed, get out of here
			if (opts.state.isDestroyed) {
				this._debug('Instance is destroyed');
				return false;
			}

			// we dont want to fire the ajax multiple times
			opts.state.isDuringAjax = true;

			opts.loading.start.call($(opts.contentSelector)[0],opts);
		},

		// Check to see next page is needed
		scroll: function infscr_scroll() {

			var opts = this.options,
				state = opts.state;

			// if behavior is defined and this function is extended, call that instead of default
			if (!!opts.behavior && this['scroll_'+opts.behavior] !== undefined) {
				this['scroll_'+opts.behavior].call(this);
				return;
			}

			if (state.isDuringAjax || state.isInvalidPage || state.isDone || state.isDestroyed || state.isPaused) {
				return;
			}

			if (!this._nearbottom()) {
				return;
			}

			this.retrieve();

		},

		// Toggle pause value
		toggle: function infscr_toggle() {
			this._pausing();
		},

		// Unbind from scroll
		unbind: function infscr_unbind() {
			this._binding('unbind');
		},

		// update options
		update: function infscr_options(key) {
			if ($.isPlainObject(key)) {
				this.options = $.extend(true,this.options,key);
			}
		}
	};


	/*
	 ----------------------------
	 Infinite Scroll function
	 ----------------------------

	 Borrowed logic from the following...

	 jQuery UI
	 - https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js

	 jCarousel
	 - https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

	 Masonry
	 - https://github.com/desandro/masonry/blob/master/jquery.masonry.js

	 */

	$.fn.infinitescroll = function infscr_init(options, callback) {


		var thisCall = typeof options;

		switch (thisCall) {

			// method
			case 'string':
				var args = Array.prototype.slice.call(arguments, 1);

				this.each(function () {
					var instance = $.data(this, 'infinitescroll');

					if (!instance) {
						// not setup yet
						// return $.error('Method ' + options + ' cannot be called until Infinite Scroll is setup');
						return false;
					}

					if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
						// return $.error('No such method ' + options + ' for Infinite Scroll');
						return false;
					}

					// no errors!
					instance[options].apply(instance, args);
				});

				break;

			// creation
			case 'object':

				this.each(function () {

					var instance = $.data(this, 'infinitescroll');

					if (instance) {

						// update options of current instance
						instance.update(options);

					} else {

						// initialize new instance
						instance = new $.infinitescroll(options, callback, this);

						// don't attach if instantiation failed
						if (!instance.failed) {
							$.data(this, 'infinitescroll', instance);
						}

					}

				});

				break;

		}

		return this;
	};



	/*
	 * smartscroll: debounced scroll event for jQuery *
	 * https://github.com/lukeshumard/smartscroll
	 * Based on smartresize by @louis_remi: https://github.com/lrbabe/jquery.smartresize.js *
	 * Copyright 2011 Louis-Remi & Luke Shumard * Licensed under the MIT license. *
	 */

	var event = $.event,
		scrollTimeout;

	event.special.smartscroll = {
		setup: function () {
			$(this).bind("scroll", event.special.smartscroll.handler);
		},
		teardown: function () {
			$(this).unbind("scroll", event.special.smartscroll.handler);
		},
		handler: function (event, execAsap) {
			// Save the context
			var context = this,
				args = arguments;

			// set correct event type
			event.type = "smartscroll";

			if (scrollTimeout) { clearTimeout(scrollTimeout); }
			scrollTimeout = setTimeout(function () {
				$(context).trigger('smartscroll', args);
			}, execAsap === "execAsap" ? 0 : 100);
		}
	};

	$.fn.smartscroll = function (fn) {
		return fn ? this.bind("smartscroll", fn) : this.trigger("smartscroll", ["execAsap"]);
	};


})(window, jQuery);
// Magnific Popup v1.1.0 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=image+iframe+gallery+retina+imagezoom
// MIT LICENSE
(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isLowIE=n.isIE8=document.all&&!document.addEventListener,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n.st.autoFocusLast&&n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(c,d){if(d===undefined||d===!1)return!0;e=c.split("_");if(e.length>1){var f=b.find(j+"-"+e[0]);if(f.length>0){var g=e[1];g==="replaceWith"?f[0]!==d[0]&&f.replaceWith(d):g==="img"?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(j+"-"+c).html(d)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C,D=function(b){if(b.data&&b.data.title!==undefined)return b.data.title;var c=n.st.image.titleSrc;if(c){if(a.isFunction(c))return c.call(n,b);if(b.el)return b.el.attr(c)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=n.st.image,d=".image";n.types.push("image"),w(g+d,function(){n.currItem.type==="image"&&c.cursor&&a(document.body).addClass(c.cursor)}),w(b+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),r.off("resize"+j)}),w("Resize"+d,n.resizeImage),n.isLowIE&&w("AfterChange",n.resizeImage)},resizeImage:function(){var a=n.currItem;if(!a||!a.img)return;if(n.st.image.verticalFit){var b=0;n.isLowIE&&(b=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",n.wH-b)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,C&&clearInterval(C),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(n.content&&n.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var b=0,c=a.img[0],d=function(e){C&&clearInterval(C),C=setInterval(function(){if(c.naturalWidth>0){n._onImageHasSize(a);return}b>200&&clearInterval(C),b++,b===3?d(10):b===40?d(50):b===100&&d(500)},e)};d(1)},getImage:function(b,c){var d=0,e=function(){b&&(b.img[0].complete?(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("ready")),b.hasSize=!0,b.loaded=!0,y("ImageLoadComplete")):(d++,d<200?setTimeout(e,100):f()))},f=function(){b&&(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("error",g.tError.replace("%url%",b.src))),b.hasSize=!0,b.loaded=!0,b.loadError=!0)},g=n.st.image,h=c.find(".mfp-img");if(h.length){var i=document.createElement("img");i.className="mfp-img",b.el&&b.el.find("img").length&&(i.alt=b.el.find("img").attr("alt")),b.img=a(i).on("load.mfploader",e).on("error.mfploader",f),i.src=b.src,h.is("img")&&(b.img=b.img.clone()),i=b.img[0],i.naturalWidth>0?b.hasSize=!0:i.width||(b.hasSize=!1)}return n._parseMarkup(c,{title:D(b),img_replaceWith:b.img},b),n.resizeImage(),b.hasSize?(C&&clearInterval(C),b.loadError?(c.addClass("mfp-loading"),n.updateStatus("error",g.tError.replace("%url%",b.src))):(c.removeClass("mfp-loading"),n.updateStatus("ready")),c):(n.updateStatus("loading"),b.loading=!0,b.hasSize||(b.imgHidden=!0,c.addClass("mfp-loading"),n.findImageSize(b)),c)}}});var E,F=function(){return E===undefined&&(E=document.createElement("p").style.MozTransform!==undefined),E};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return F()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}});var G="iframe",H="//about:blank",I=function(a){if(n.currTemplate[G]){var b=n.currTemplate[G].find("iframe");b.length&&(a||(b[0].src=H),n.isIE8&&b.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(G,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){n.types.push(G),w("BeforeChange",function(a,b,c){b!==c&&(b===G?I():c===G&&I(!0))}),w(b+"."+G,function(){I()})},getIframe:function(b,c){var d=b.src,e=n.st.iframe;a.each(e.patterns,function(){if(d.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?d=d.substr(d.lastIndexOf(this.id)+this.id.length,d.length):d=this.id.call(this,d)),d=this.src.replace("%id%",d),!1});var f={};return e.srcAction&&(f[e.srcAction]=d),n._parseMarkup(c,f,b),n.updateStatus("ready"),c}}});var J=function(a){var b=n.items.length;return a>b-1?a-b:a<0?b+a:a},K=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=n.st.gallery,d=".mfp-gallery";n.direction=!0;if(!c||!c.enabled)return!1;u+=" mfp-gallery",w(g+d,function(){c.navigateByImgClick&&n.wrap.on("click"+d,".mfp-img",function(){if(n.items.length>1)return n.next(),!1}),s.on("keydown"+d,function(a){a.keyCode===37?n.prev():a.keyCode===39&&n.next()})}),w("UpdateStatus"+d,function(a,b){b.text&&(b.text=K(b.text,n.currItem.index,n.items.length))}),w(f+d,function(a,b,d,e){var f=n.items.length;d.counter=f>1?K(c.tCounter,e.index,f):""}),w("BuildControls"+d,function(){if(n.items.length>1&&c.arrows&&!n.arrowLeft){var b=c.arrowMarkup,d=n.arrowLeft=a(b.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(m),e=n.arrowRight=a(b.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(m);d.click(function(){n.prev()}),e.click(function(){n.next()}),n.container.append(d.add(e))}}),w(h+d,function(){n._preloadTimeout&&clearTimeout(n._preloadTimeout),n._preloadTimeout=setTimeout(function(){n.preloadNearbyImages(),n._preloadTimeout=null},16)}),w(b+d,function(){s.off(d),n.wrap.off("click"+d),n.arrowRight=n.arrowLeft=null})},next:function(){n.direction=!0,n.index=J(n.index+1),n.updateItemHTML()},prev:function(){n.direction=!1,n.index=J(n.index-1),n.updateItemHTML()},goTo:function(a){n.direction=a>=n.index,n.index=a,n.updateItemHTML()},preloadNearbyImages:function(){var a=n.st.gallery.preload,b=Math.min(a[0],n.items.length),c=Math.min(a[1],n.items.length),d;for(d=1;d<=(n.direction?c:b);d++)n._preloadItem(n.index+d);for(d=1;d<=(n.direction?b:c);d++)n._preloadItem(n.index-d)},_preloadItem:function(b){b=J(b);if(n.items[b].preloaded)return;var c=n.items[b];c.parsed||(c=n.parseEl(b)),y("LazyLoad",c),c.type==="image"&&(c.img=a('<img class="mfp-img" />').on("load.mfploader",function(){c.hasSize=!0}).on("error.mfploader",function(){c.hasSize=!0,c.loadError=!0,y("LazyLoadError",c)}).attr("src",c.src)),c.preloaded=!0}}});var L="retina";a.magnificPopup.registerModule(L,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=n.st.retina,b=a.ratio;b=isNaN(b)?b():b,b>1&&(w("ImageHasSize."+L,function(a,c){c.img.css({"max-width":c.img[0].naturalWidth/b,width:"100%"})}),w("ElementParse."+L,function(c,d){d.src=a.replaceSrc(d,b)}))}}}}),A()});
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-applicationcache-audio-backgroundsize-borderimage-borderradius-boxshadow-canvas-canvastext-cssanimations-csscolumns-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-flexbox-fontface-generatedcontent-geolocation-hashchange-history-hsla-indexeddb-inlinesvg-input-inputtypes-localstorage-multiplebgs-opacity-postmessage-rgba-sessionstorage-smil-svg-svgclippaths-textshadow-touchevents-video-webgl-websockets-websqldatabase-webworkers-addtest-domprefixes-hasevent-mq-prefixed-prefixes-setclasses-shiv-testallprops-testprop-teststyles !*/
!function(e,t,n){function r(e){var t=E.className,n=Modernizr._config.classPrefix||"";if(k&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),k?E.className.baseVal=t:E.className=t)}function a(e,t){return typeof e===t}function o(){var e,t,n,r,o,i,s;for(var c in x)if(x.hasOwnProperty(c)){if(e=[],t=x[c],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=a(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)i=e[o],s=i.split("."),1===s.length?Modernizr[s[0]]=r:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=r),b.push((r?"":"no-")+s.join("-"))}}function i(e,t){if("object"==typeof e)for(var n in e)z(e,n)&&i(n,e[n]);else{e=e.toLowerCase();var a=e.split("."),o=Modernizr[a[0]];if(2==a.length&&(o=o[a[1]]),"undefined"!=typeof o)return Modernizr;t="function"==typeof t?t():t,1==a.length?Modernizr[a[0]]=t:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=t),r([(t&&0!=t?"":"no-")+a.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):k?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function c(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function l(e,t){return!!~(""+e).indexOf(t)}function d(){var e=t.body;return e||(e=s(k?"svg":"body"),e.fake=!0),e}function u(e,n,r,a){var o,i,c,l,u="modernizr",f=s("div"),p=d();if(parseInt(r,10))for(;r--;)c=s("div"),c.id=a?a[r]:u+(r+1),f.appendChild(c);return o=s("style"),o.type="text/css",o.id="s"+u,(p.fake?p:f).appendChild(o),p.appendChild(f),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),f.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",l=E.style.overflow,E.style.overflow="hidden",E.appendChild(p)),i=n(f,e),p.fake?(p.parentNode.removeChild(p),E.style.overflow=l,E.offsetHeight):f.parentNode.removeChild(f),!!i}function f(e,t){return function(){return e.apply(t,arguments)}}function p(e,t,n){var r;for(var o in e)if(e[o]in t)return n===!1?e[o]:(r=t[e[o]],a(r,"function")?f(r,n||t):r);return!1}function m(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function h(t,r){var a=t.length;if("CSS"in e&&"supports"in e.CSS){for(;a--;)if(e.CSS.supports(m(t[a]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];a--;)o.push("("+m(t[a])+":"+r+")");return o=o.join(" or "),u("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function g(e,t,r,o){function i(){u&&(delete H.style,delete H.modElem)}if(o=a(o,"undefined")?!1:o,!a(r,"undefined")){var d=h(e,r);if(!a(d,"undefined"))return d}for(var u,f,p,m,g,v=["modernizr","tspan","samp"];!H.style&&v.length;)u=!0,H.modElem=s(v.shift()),H.style=H.modElem.style;for(p=e.length,f=0;p>f;f++)if(m=e[f],g=H.style[m],l(m,"-")&&(m=c(m)),H.style[m]!==n){if(o||a(r,"undefined"))return i(),"pfx"==t?m:!0;try{H.style[m]=r}catch(y){}if(H.style[m]!=g)return i(),"pfx"==t?m:!0}return i(),!1}function v(e,t,n,r,o){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+W.join(i+" ")+i).split(" ");return a(t,"string")||a(t,"undefined")?g(s,t,r,o):(s=(e+" "+P.join(i+" ")+i).split(" "),p(s,t,n))}function y(e,t,r){return v(e,n,n,t,r)}var b=[],x=[],T={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){x.push({name:e,fn:t,options:n})},addAsyncTest:function(e){x.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=T,Modernizr=new Modernizr,Modernizr.addTest("applicationcache","applicationCache"in e),Modernizr.addTest("geolocation","geolocation"in navigator),Modernizr.addTest("history",function(){var t=navigator.userAgent;return-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone")?e.history&&"pushState"in e.history:!1}),Modernizr.addTest("postmessage","postMessage"in e),Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var w=!1;try{w="WebSocket"in e&&2===e.WebSocket.CLOSING}catch(S){}Modernizr.addTest("websockets",w),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}),Modernizr.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(t){return!1}}),Modernizr.addTest("websqldatabase","openDatabase"in e),Modernizr.addTest("webworkers","Worker"in e);var C=T._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];T._prefixes=C;var E=t.documentElement,k="svg"===E.nodeName.toLowerCase();k||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=b.elements;return"string"==typeof e?e.split(" "):e}function a(e,t){var n=b.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),b.elements=n+" "+e,l(t)}function o(e){var t=y[e[g]];return t||(t={},v++,e[g]=v,y[v]=t),t}function i(e,n,r){if(n||(n=t),u)return n.createElement(e);r||(r=o(n));var a;return a=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!a.canHaveChildren||m.test(e)||a.tagUrn?a:r.frag.appendChild(a)}function s(e,n){if(e||(e=t),u)return e.createDocumentFragment();n=n||o(e);for(var a=n.frag.cloneNode(),i=0,s=r(),c=s.length;c>i;i++)a.createElement(s[i]);return a}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return b.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(b,t.frag)}function l(e){e||(e=t);var r=o(e);return!b.shivCSS||d||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),u||c(e,r),e}var d,u,f="3.7.3",p=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",v=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){d=!0,u=!0}}();var b={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:f,shivCSS:p.shivCSS!==!1,supportsUnknownElements:u,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:l,createElement:i,createDocumentFragment:s,addElements:a};e.html5=b,l(t),"object"==typeof module&&module.exports&&(module.exports=b)}("undefined"!=typeof e?e:this,t);var _="Moz O ms Webkit",P=T._config.usePrefixes?_.toLowerCase().split(" "):[];T._domPrefixes=P;var z;!function(){var e={}.hasOwnProperty;z=a(e,"undefined")||a(e.call,"undefined")?function(e,t){return t in e&&a(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),T._l={},T.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},T._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){T.addTest=i});var N=function(){function e(e,t){var a;return e?(t&&"string"!=typeof t||(t=s(t||"div")),e="on"+e,a=e in t,!a&&r&&(t.setAttribute||(t=s("div")),t.setAttribute(e,""),a="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),a):!1}var r=!("onblur"in t.documentElement);return e}();T.hasEvent=N,Modernizr.addTest("hashchange",function(){return N("hashchange",e)===!1?!1:t.documentMode===n||t.documentMode>7}),Modernizr.addTest("audio",function(){var e=s("audio"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("canvas",function(){var e=s("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("canvastext",function(){return Modernizr.canvas===!1?!1:"function"==typeof s("canvas").getContext("2d").fillText}),Modernizr.addTest("video",function(){var e=s("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("webgl",function(){var t=s("canvas"),n="probablySupportsContext"in t?"probablySupportsContext":"supportsContext";return n in t?t[n]("webgl")||t[n]("experimental-webgl"):"WebGLRenderingContext"in e}),Modernizr.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",r="",a=0,o=C.length-1;o>a;a++)e=0===a?"to ":"",r+=t+C[a]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(r+=t+"-webkit-"+n);var i=s("a"),c=i.style;return c.cssText=r,(""+c.backgroundImage).indexOf("gradient")>-1}),Modernizr.addTest("multiplebgs",function(){var e=s("a").style;return e.cssText="background:url(https://),url(https://),red url(https://)",/(url\s*\(.*?){3}/.test(e.background)}),Modernizr.addTest("opacity",function(){var e=s("a").style;return e.cssText=C.join("opacity:.55;"),/^0.55$/.test(e.opacity)}),Modernizr.addTest("rgba",function(){var e=s("a").style;return e.cssText="background-color:rgba(150,255,150,.5)",(""+e.backgroundColor).indexOf("rgba")>-1}),Modernizr.addTest("inlinesvg",function(){var e=s("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var R=s("input"),$="autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),A={};Modernizr.input=function(t){for(var n=0,r=t.length;r>n;n++)A[t[n]]=!!(t[n]in R);return A.list&&(A.list=!(!s("datalist")||!e.HTMLDataListElement)),A}($);var O="search tel url email datetime date month week time datetime-local number range color".split(" "),j={};Modernizr.inputtypes=function(e){for(var r,a,o,i=e.length,s="1)",c=0;i>c;c++)R.setAttribute("type",r=e[c]),o="text"!==R.type&&"style"in R,o&&(R.value=s,R.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(r)&&R.style.WebkitAppearance!==n?(E.appendChild(R),a=t.defaultView,o=a.getComputedStyle&&"textfield"!==a.getComputedStyle(R,null).WebkitAppearance&&0!==R.offsetHeight,E.removeChild(R)):/^(search|tel)$/.test(r)||(o=/^(url|email)$/.test(r)?R.checkValidity&&R.checkValidity()===!1:R.value!=s)),j[e[c]]=!!o;return j}(O),Modernizr.addTest("hsla",function(){var e=s("a").style;return e.cssText="background-color:hsla(120,40%,100%,.5)",l(e.backgroundColor,"rgba")||l(e.backgroundColor,"hsla")});var L="CSS"in e&&"supports"in e.CSS,M="supportsCSS"in e;Modernizr.addTest("supports",L||M);var B={}.toString;Modernizr.addTest("svgclippaths",function(){return!!t.createElementNS&&/SVGClipPath/.test(B.call(t.createElementNS("http://www.w3.org/2000/svg","clipPath")))}),Modernizr.addTest("smil",function(){return!!t.createElementNS&&/SVGAnimate/.test(B.call(t.createElementNS("http://www.w3.org/2000/svg","animate")))});var F=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return u("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();T.mq=F;var D=T.testStyles=u;Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",C.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");D(r,function(e){n=9===e.offsetTop})}return n});var I=function(){var e=navigator.userAgent,t=e.match(/applewebkit\/([0-9]+)/gi)&&parseFloat(RegExp.$1),n=e.match(/w(eb)?osbrowser/gi),r=e.match(/windows phone/gi)&&e.match(/iemobile\/([0-9])+/gi)&&parseFloat(RegExp.$1)>=9,a=533>t&&e.match(/android/gi);return n||a||r}();I?Modernizr.addTest("fontface",!1):D('@font-face {font-family:"font";src:url("https://")}',function(e,n){var r=t.getElementById("smodernizr"),a=r.sheet||r.styleSheet,o=a?a.cssRules&&a.cssRules[0]?a.cssRules[0].cssText:a.cssText||"":"",i=/src/i.test(o)&&0===o.indexOf(n.split(" ")[0]);Modernizr.addTest("fontface",i)}),D('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}',function(e){Modernizr.addTest("generatedcontent",e.offsetHeight>=7)});var W=T._config.usePrefixes?_.split(" "):[];T._cssomPrefixes=W;var q=function(t){var r,a=C.length,o=e.CSSRule;if("undefined"==typeof o)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+t;for(var i=0;a>i;i++){var s=C[i],c=s.toUpperCase()+"_"+r;if(c in o)return"@-"+s.toLowerCase()+"-"+t}return!1};T.atRule=q;var V={elem:s("modernizr")};Modernizr._q.push(function(){delete V.elem});var H={style:V.elem.style};Modernizr._q.unshift(function(){delete H.style});var U=T.testProp=function(e,t,r){return g([e],n,t,r)};Modernizr.addTest("textshadow",U("textShadow","1px 1px")),T.testAllProps=v;var G,J=T.prefixed=function(e,t,n){return 0===e.indexOf("@")?q(e):(-1!=e.indexOf("-")&&(e=c(e)),t?v(e,t,n):v(e,"pfx"))};try{G=J("indexedDB",e)}catch(S){}Modernizr.addTest("indexeddb",!!G),G&&Modernizr.addTest("indexeddb.deletedatabase","deleteDatabase"in G),T.testAllProps=y,Modernizr.addTest("cssanimations",y("animationName","a",!0)),Modernizr.addTest("backgroundsize",y("backgroundSize","100%",!0)),Modernizr.addTest("borderimage",y("borderImage","url() 1",!0)),Modernizr.addTest("borderradius",y("borderRadius","0px",!0)),Modernizr.addTest("boxshadow",y("boxShadow","1px 1px",!0)),function(){Modernizr.addTest("csscolumns",function(){var e=!1,t=y("columnCount");try{(e=!!t)&&(e=new Boolean(e))}catch(n){}return e});for(var e,t,n=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],r=0;r<n.length;r++)e=n[r].toLowerCase(),t=y("column"+n[r]),("breakbefore"===e||"breakafter"===e||"breakinside"==e)&&(t=t||y(n[r])),Modernizr.addTest("csscolumns."+e,t)}(),Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),Modernizr.addTest("cssreflections",y("boxReflect","above",!0)),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&y("transform","scale(1)",!0)}),Modernizr.addTest("csstransforms3d",function(){var e=!!y("perspective","1px",!0),t=Modernizr._config.usePrefixes;if(e&&(!t||"webkitPerspective"in E.style)){var n,r="#modernizr{width:0;height:0}";Modernizr.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",D(r+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),Modernizr.addTest("csstransitions",y("transition","all",!0)),o(),r(b),delete T.addTest,delete T.addAsyncTest;for(var Z=0;Z<Modernizr._q.length;Z++)Modernizr._q[Z]();e.Modernizr=Modernizr}(window,document);
/* jquery.nicescroll
-- version 3.7.6
-- copyright 2017-07-19 InuYaksa*2017
-- licensed under the MIT
--
-- https://nicescroll.areaaperta.com/
-- https://github.com/inuyaksa/jquery.nicescroll
--
*/

/* jshint expr: true */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function (jQuery) {

    "use strict";

    // globals
    var domfocus = false,
        mousefocus = false,
        tabindexcounter = 0,
        ascrailcounter = 2000,
        globalmaxzindex = 0;

    var $ = jQuery,       // sandbox
        _doc = document,
        _win = window,
        $window = $(_win);

    var delegatevents = [];

    // http://stackoverflow.com/questions/2161159/get-script-path
    function getScriptPath() {
        var scripts = _doc.currentScript || (function () { var s = _doc.getElementsByTagName('script'); return (s.length) ? s[s.length - 1] : false; })();
        var path = scripts ? scripts.src.split('?')[0] : '';
        return (path.split('/').length > 0) ? path.split('/').slice(0, -1).join('/') + '/' : '';
    }

    // based on code by Paul Irish https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    var setAnimationFrame = _win.requestAnimationFrame || _win.webkitRequestAnimationFrame || _win.mozRequestAnimationFrame || false;
    var clearAnimationFrame = _win.cancelAnimationFrame || _win.webkitCancelAnimationFrame || _win.mozCancelAnimationFrame || false;

    if (!setAnimationFrame) {
        var anilasttime = 0;
        setAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - anilasttime));
            var id = _win.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            anilasttime = currTime + timeToCall;
            return id;
        };
        clearAnimationFrame = function (id) {
            _win.clearTimeout(id);
        };
    } else {
        if (!_win.cancelAnimationFrame) clearAnimationFrame = function (id) { };
    }

    var ClsMutationObserver = _win.MutationObserver || _win.WebKitMutationObserver || false;

    var now = Date.now || function () { return new Date().getTime(); };

    var _globaloptions = {
        zindex: "auto",
        cursoropacitymin: 0,
        cursoropacitymax: 1,
        cursorcolor: "#424242",
        cursorwidth: "6px",
        cursorborder: "1px solid #fff",
        cursorborderradius: "5px",
        scrollspeed: 40,
        mousescrollstep: 9 * 3,
        touchbehavior: false,   // deprecated
        emulatetouch: false,    // replacing touchbehavior
        hwacceleration: true,
        usetransition: true,
        boxzoom: false,
        dblclickzoom: true,
        gesturezoom: true,
        grabcursorenabled: true,
        autohidemode: true,
        background: "",
        iframeautoresize: true,
        cursorminheight: 32,
        preservenativescrolling: true,
        railoffset: false,
        railhoffset: false,
        bouncescroll: true,
        spacebarenabled: true,
        railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        disableoutline: true,
        horizrailenabled: true,
        railalign: "right",
        railvalign: "bottom",
        enabletranslate3d: true,
        enablemousewheel: true,
        enablekeyboard: true,
        smoothscroll: true,
        sensitiverail: true,
        enablemouselockapi: true,
        //      cursormaxheight:false,
        cursorfixedheight: false,
        directionlockdeadzone: 6,
        hidecursordelay: 400,
        nativeparentscrolling: true,
        enablescrollonselection: true,
        overflowx: true,
        overflowy: true,
        cursordragspeed: 0.3,
        rtlmode: "auto",
        cursordragontouch: false,
        oneaxismousemode: "auto",
        scriptpath: getScriptPath(),
        preventmultitouchscrolling: true,
        disablemutationobserver: false,
        enableobserver: true,
        scrollbarid: false,
        scrollCLass: false
    };

    var browserdetected = false;

    var getBrowserDetection = function () {

        if (browserdetected) return browserdetected;

        var _el = _doc.createElement('DIV'),
            _style = _el.style,
            _agent = navigator.userAgent,
            _platform = navigator.platform,
            d = {};

        d.haspointerlock = "pointerLockElement" in _doc || "webkitPointerLockElement" in _doc || "mozPointerLockElement" in _doc;

        d.isopera = ("opera" in _win); // 12-
        d.isopera12 = (d.isopera && ("getUserMedia" in navigator));
        d.isoperamini = (Object.prototype.toString.call(_win.operamini) === "[object OperaMini]");

        d.isie = (("all" in _doc) && ("attachEvent" in _el) && !d.isopera); //IE10-
        d.isieold = (d.isie && !("msInterpolationMode" in _style)); // IE6 and older
        d.isie7 = d.isie && !d.isieold && (!("documentMode" in _doc) || (_doc.documentMode === 7));
        d.isie8 = d.isie && ("documentMode" in _doc) && (_doc.documentMode === 8);
        d.isie9 = d.isie && ("performance" in _win) && (_doc.documentMode === 9);
        d.isie10 = d.isie && ("performance" in _win) && (_doc.documentMode === 10);
        d.isie11 = ("msRequestFullscreen" in _el) && (_doc.documentMode >= 11); // IE11+

        d.ismsedge = ("msCredentials" in _win);  // MS Edge 14+

        d.ismozilla = ("MozAppearance" in _style);

        d.iswebkit = !d.ismsedge && ("WebkitAppearance" in _style);

        d.ischrome = d.iswebkit && ("chrome" in _win);
        d.ischrome38 = (d.ischrome && ("touchAction" in _style)); // behavior changed in touch emulation
        d.ischrome22 = (!d.ischrome38) && (d.ischrome && d.haspointerlock);
        d.ischrome26 = (!d.ischrome38) && (d.ischrome && ("transition" in _style)); // issue with transform detection (maintain prefix)

        d.cantouch = ("ontouchstart" in _doc.documentElement) || ("ontouchstart" in _win); // with detection for Chrome Touch Emulation
        d.hasw3ctouch = (_win.PointerEvent || false) && ((navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)); //IE11 pointer events, following W3C Pointer Events spec
        d.hasmstouch = (!d.hasw3ctouch) && (_win.MSPointerEvent || false); // IE10 pointer events

        d.ismac = /^mac$/i.test(_platform);

        d.isios = d.cantouch && /iphone|ipad|ipod/i.test(_platform);
        d.isios4 = d.isios && !("seal" in Object);
        d.isios7 = d.isios && ("webkitHidden" in _doc);  //iOS 7+
        d.isios8 = d.isios && ("hidden" in _doc);  //iOS 8+
        d.isios10 = d.isios && _win.Proxy;  //iOS 10+

        d.isandroid = (/android/i.test(_agent));

        d.haseventlistener = ("addEventListener" in _el);

        d.trstyle = false;
        d.hastransform = false;
        d.hastranslate3d = false;
        d.transitionstyle = false;
        d.hastransition = false;
        d.transitionend = false;

        d.trstyle = "transform";
        d.hastransform = ("transform" in _style) || (function () {
            var check = ['msTransform', 'webkitTransform', 'MozTransform', 'OTransform'];
            for (var a = 0, c = check.length; a < c; a++) {
                if (_style[check[a]] !== undefined) {
                    d.trstyle = check[a];
                    break;
                }
            }
            d.hastransform = (!!d.trstyle);
        })();

        if (d.hastransform) {
            _style[d.trstyle] = "translate3d(1px,2px,3px)";
            d.hastranslate3d = /translate3d/.test(_style[d.trstyle]);
        }

        d.transitionstyle = "transition";
        d.prefixstyle = '';
        d.transitionend = "transitionend";

        d.hastransition = ("transition" in _style) || (function () {

            d.transitionend = false;
            var check = ['webkitTransition', 'msTransition', 'MozTransition', 'OTransition', 'OTransition', 'KhtmlTransition'];
            var prefix = ['-webkit-', '-ms-', '-moz-', '-o-', '-o', '-khtml-'];
            var evs = ['webkitTransitionEnd', 'msTransitionEnd', 'transitionend', 'otransitionend', 'oTransitionEnd', 'KhtmlTransitionEnd'];
            for (var a = 0, c = check.length; a < c; a++) {
                if (check[a] in _style) {
                    d.transitionstyle = check[a];
                    d.prefixstyle = prefix[a];
                    d.transitionend = evs[a];
                    break;
                }
            }
            if (d.ischrome26) d.prefixstyle = prefix[1];  // always use prefix

            d.hastransition = (d.transitionstyle);

        })();

        function detectCursorGrab() {
            var lst = ['grab', '-webkit-grab', '-moz-grab'];
            if ((d.ischrome && !d.ischrome38) || d.isie) lst = []; // force setting for IE returns false positive and chrome cursor bug
            for (var a = 0, l = lst.length; a < l; a++) {
                var p = lst[a];
                _style.cursor = p;
                if (_style.cursor == p) return p;
            }
            return 'url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize'; // thanks to https://cdnjs.com/ for the openhand cursor!
        }
        d.cursorgrabvalue = detectCursorGrab();

        d.hasmousecapture = ("setCapture" in _el);

        d.hasMutationObserver = (ClsMutationObserver !== false);

        _el = null; //memory released

        browserdetected = d;

        return d;
    };

    var NiceScrollClass = function (myopt, me) {

        var self = this;

        this.version = '3.7.6';
        this.name = 'nicescroll';

        this.me = me;

        var $body = $("body");

        var opt = this.opt = {
            doc: $body,
            win: false
        };

        $.extend(opt, _globaloptions);  // clone opts

        // Options for internal use
        opt.snapbackspeed = 80;

        if (myopt || false) {
            for (var a in opt) {
                if (myopt[a] !== undefined) opt[a] = myopt[a];
            }
        }

        if (opt.disablemutationobserver) ClsMutationObserver = false;

        this.doc = opt.doc;
        this.iddoc = (this.doc && this.doc[0]) ? this.doc[0].id || '' : '';
        this.ispage = /^BODY|HTML/.test((opt.win) ? opt.win[0].nodeName : this.doc[0].nodeName);
        this.haswrapper = (opt.win !== false);
        this.win = opt.win || (this.ispage ? $window : this.doc);
        this.docscroll = (this.ispage && !this.haswrapper) ? $window : this.win;
        this.body = $body;
        this.viewport = false;

        this.isfixed = false;

        this.iframe = false;
        this.isiframe = ((this.doc[0].nodeName == 'IFRAME') && (this.win[0].nodeName == 'IFRAME'));

        this.istextarea = (this.win[0].nodeName == 'TEXTAREA');

        this.forcescreen = false; //force to use screen position on events

        this.canshowonmouseevent = (opt.autohidemode != "scroll");

        // Events jump table
        this.onmousedown = false;
        this.onmouseup = false;
        this.onmousemove = false;
        this.onmousewheel = false;
        this.onkeypress = false;
        this.ongesturezoom = false;
        this.onclick = false;

        // Nicescroll custom events
        this.onscrollstart = false;
        this.onscrollend = false;
        this.onscrollcancel = false;

        this.onzoomin = false;
        this.onzoomout = false;

        // Let's start!
        this.view = false;
        this.page = false;

        this.scroll = {
            x: 0,
            y: 0
        };
        this.scrollratio = {
            x: 0,
            y: 0
        };
        this.cursorheight = 20;
        this.scrollvaluemax = 0;

        // http://dev.w3.org/csswg/css-writing-modes-3/#logical-to-physical
        // http://dev.w3.org/csswg/css-writing-modes-3/#svg-writing-mode
        if (opt.rtlmode == "auto") {
            var target = this.win[0] == _win ? this.body : this.win;
            var writingMode = target.css("writing-mode") || target.css("-webkit-writing-mode") || target.css("-ms-writing-mode") || target.css("-moz-writing-mode");

            if (writingMode == "horizontal-tb" || writingMode == "lr-tb" || writingMode === "") {
                this.isrtlmode = (target.css("direction") == "rtl");
                this.isvertical = false;
            } else {
                this.isrtlmode = (writingMode == "vertical-rl" || writingMode == "tb" || writingMode == "tb-rl" || writingMode == "rl-tb");
                this.isvertical = (writingMode == "vertical-rl" || writingMode == "tb" || writingMode == "tb-rl");
            }
        } else {
            this.isrtlmode = (opt.rtlmode === true);
            this.isvertical = false;
        }
        //    this.checkrtlmode = false;

        this.scrollrunning = false;

        this.scrollmom = false;

        this.observer = false;  // observer div changes
        this.observerremover = false;  // observer on parent for remove detection
        this.observerbody = false;  // observer on body for position change

        if (opt.scrollbarid !== false) {
            this.id = opt.scrollbarid;
        } else {
            do {
                this.id = "ascrail" + (ascrailcounter++);
            } while (_doc.getElementById(this.id));
        }

        this.rail = false;
        this.cursor = false;
        this.cursorfreezed = false;
        this.selectiondrag = false;

        this.zoom = false;
        this.zoomactive = false;

        this.hasfocus = false;
        this.hasmousefocus = false;

        //this.visibility = true;
        this.railslocked = false;  // locked by resize
        this.locked = false;  // prevent lost of locked status sets by user
        this.hidden = false; // rails always hidden
        this.cursoractive = true; // user can interact with cursors

        this.wheelprevented = false; //prevent mousewheel event

        this.overflowx = opt.overflowx;
        this.overflowy = opt.overflowy;

        this.nativescrollingarea = false;
        this.checkarea = 0;

        this.events = []; // event list for unbind

        this.saved = {};  // style saved

        this.delaylist = {};
        this.synclist = {};

        this.lastdeltax = 0;
        this.lastdeltay = 0;

        this.detected = getBrowserDetection();

        var cap = $.extend({}, this.detected);

        this.canhwscroll = (cap.hastransform && opt.hwacceleration);
        this.ishwscroll = (this.canhwscroll && self.haswrapper);

        if (!this.isrtlmode) {
            this.hasreversehr = false;
        } else if (this.isvertical) { // RTL mode with reverse horizontal axis
            this.hasreversehr = !(cap.iswebkit || cap.isie || cap.isie11);
        } else {
            this.hasreversehr = !(cap.iswebkit || (cap.isie && !cap.isie10 && !cap.isie11));
        }

        this.istouchcapable = false; // desktop devices with touch screen support

        //## Check WebKit-based desktop with touch support
        //## + Firefox 18 nightly build (desktop) false positive (or desktop with touch support)

        if (!cap.cantouch && (cap.hasw3ctouch || cap.hasmstouch)) {  // desktop device with multiple input
            this.istouchcapable = true;
        } else if (cap.cantouch && !cap.isios && !cap.isandroid && (cap.iswebkit || cap.ismozilla)) {
            this.istouchcapable = true;
        }

        //## disable MouseLock API on user request
        if (!opt.enablemouselockapi) {
            cap.hasmousecapture = false;
            cap.haspointerlock = false;
        }

        this.debounced = function (name, fn, tm) {
            if (!self) return;
            var dd = self.delaylist[name] || false;
            if (!dd) {
                self.delaylist[name] = {
                    h: setAnimationFrame(function () {
                        self.delaylist[name].fn.call(self);
                        self.delaylist[name] = false;
                    }, tm)
                };
                fn.call(self);
            }
            self.delaylist[name].fn = fn;
        };


        this.synched = function (name, fn) {
            if (self.synclist[name]) self.synclist[name] = fn;
            else {
                self.synclist[name] = fn;
                setAnimationFrame(function () {
                    if (!self) return;
                    self.synclist[name] && self.synclist[name].call(self);
                    self.synclist[name] = null;
                });
            }
        };

        this.unsynched = function (name) {
            if (self.synclist[name]) self.synclist[name] = false;
        };

        this.css = function (el, pars) { // save & set
            for (var n in pars) {
                self.saved.css.push([el, n, el.css(n)]);
                el.css(n, pars[n]);
            }
        };

        this.scrollTop = function (val) {
            return (val === undefined) ? self.getScrollTop() : self.setScrollTop(val);
        };

        this.scrollLeft = function (val) {
            return (val === undefined) ? self.getScrollLeft() : self.setScrollLeft(val);
        };

        // derived by by Dan Pupius www.pupius.net
        var BezierClass = function (st, ed, spd, p1, p2, p3, p4) {

            this.st = st;
            this.ed = ed;
            this.spd = spd;

            this.p1 = p1 || 0;
            this.p2 = p2 || 1;
            this.p3 = p3 || 0;
            this.p4 = p4 || 1;

            this.ts = now();
            this.df = ed - st;
        };
        BezierClass.prototype = {
            B2: function (t) {
                return 3 * (1 - t) * (1 - t) * t;
            },
            B3: function (t) {
                return 3 * (1 - t) * t * t;
            },
            B4: function (t) {
                return t * t * t;
            },
            getPos: function () {
                return (now() - this.ts) / this.spd;
            },
            getNow: function () {
                var pc = (now() - this.ts) / this.spd;
                var bz = this.B2(pc) + this.B3(pc) + this.B4(pc);
                return (pc >= 1) ? this.ed : this.st + (this.df * bz) | 0;
            },
            update: function (ed, spd) {
                this.st = this.getNow();
                this.ed = ed;
                this.spd = spd;
                this.ts = now();
                this.df = this.ed - this.st;
                return this;
            }
        };

        //derived from http://stackoverflow.com/questions/11236090/
        function getMatrixValues() {
            var tr = self.doc.css(cap.trstyle);
            if (tr && (tr.substr(0, 6) == "matrix")) {
                return tr.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, '').split(/, +/);
            }
            return false;
        }

        if (this.ishwscroll) {    // hw accelerated scroll

            this.doc.translate = {
                x: 0,
                y: 0,
                tx: "0px",
                ty: "0px"
            };

            //this one can help to enable hw accel on ios6 http://indiegamr.com/ios6-html-hardware-acceleration-changes-and-how-to-fix-them/
            if (cap.hastranslate3d && cap.isios) this.doc.css("-webkit-backface-visibility", "hidden"); // prevent flickering http://stackoverflow.com/questions/3461441/

            this.getScrollTop = function (last) {
                if (!last) {
                    var mtx = getMatrixValues();
                    if (mtx) return (mtx.length == 16) ? -mtx[13] : -mtx[5]; //matrix3d 16 on IE10
                    if (self.timerscroll && self.timerscroll.bz) return self.timerscroll.bz.getNow();
                }
                return self.doc.translate.y;
            };

            this.getScrollLeft = function (last) {
                if (!last) {
                    var mtx = getMatrixValues();
                    if (mtx) return (mtx.length == 16) ? -mtx[12] : -mtx[4]; //matrix3d 16 on IE10
                    if (self.timerscroll && self.timerscroll.bh) return self.timerscroll.bh.getNow();
                }
                return self.doc.translate.x;
            };

            this.notifyScrollEvent = function (el) {
                var e = _doc.createEvent("UIEvents");
                e.initUIEvent("scroll", false, false, _win, 1);
                e.niceevent = true;
                el.dispatchEvent(e);
            };

            var cxscrollleft = (this.isrtlmode) ? 1 : -1;

            if (cap.hastranslate3d && opt.enabletranslate3d) {
                this.setScrollTop = function (val, silent) {
                    self.doc.translate.y = val;
                    self.doc.translate.ty = (val * -1) + "px";
                    self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0)");
                    if (!silent) self.notifyScrollEvent(self.win[0]);
                };
                this.setScrollLeft = function (val, silent) {
                    self.doc.translate.x = val;
                    self.doc.translate.tx = (val * cxscrollleft) + "px";
                    self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0)");
                    if (!silent) self.notifyScrollEvent(self.win[0]);
                };
            } else {
                this.setScrollTop = function (val, silent) {
                    self.doc.translate.y = val;
                    self.doc.translate.ty = (val * -1) + "px";
                    self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
                    if (!silent) self.notifyScrollEvent(self.win[0]);
                };
                this.setScrollLeft = function (val, silent) {
                    self.doc.translate.x = val;
                    self.doc.translate.tx = (val * cxscrollleft) + "px";
                    self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
                    if (!silent) self.notifyScrollEvent(self.win[0]);
                };
            }
        } else {    // native scroll

            this.getScrollTop = function () {
                return self.docscroll.scrollTop();
            };
            this.setScrollTop = function (val) {
                self.docscroll.scrollTop(val);
            };

            this.getScrollLeft = function () {
                var val;
                if (!self.hasreversehr) {
                    val = self.docscroll.scrollLeft();
                } else if (self.detected.ismozilla) {
                    val = self.page.maxw - Math.abs(self.docscroll.scrollLeft());
                } else {
                    val = self.page.maxw - self.docscroll.scrollLeft();
                }
                return val;
            };
            this.setScrollLeft = function (val) {
                return setTimeout(function () {
                    if (!self) return;
                    if (self.hasreversehr) {
                        if (self.detected.ismozilla) {
                            val = -(self.page.maxw - val);
                        } else {
                            val = self.page.maxw - val;
                        }
                    }
                    return self.docscroll.scrollLeft(val);
                }, 1);
            };
        }

        this.getTarget = function (e) {
            if (!e) return false;
            if (e.target) return e.target;
            if (e.srcElement) return e.srcElement;
            return false;
        };

        this.hasParent = function (e, id) {
            if (!e) return false;
            var el = e.target || e.srcElement || e || false;
            while (el && el.id != id) {
                el = el.parentNode || false;
            }
            return (el !== false);
        };

        function getZIndex() {
            var dom = self.win;
            if ("zIndex" in dom) return dom.zIndex(); // use jQuery UI method when available
            while (dom.length > 0) {
                if (dom[0].nodeType == 9) return false;
                var zi = dom.css('zIndex');
                if (!isNaN(zi) && zi !== 0) return parseInt(zi);
                dom = dom.parent();
            }
            return false;
        }

        //inspired by http://forum.jquery.com/topic/width-includes-border-width-when-set-to-thin-medium-thick-in-ie
        var _convertBorderWidth = {
            "thin": 1,
            "medium": 3,
            "thick": 5
        };

        function getWidthToPixel(dom, prop, chkheight) {
            var wd = dom.css(prop);
            var px = parseFloat(wd);
            if (isNaN(px)) {
                px = _convertBorderWidth[wd] || 0;
                var brd = (px == 3) ? ((chkheight) ? (self.win.outerHeight() - self.win.innerHeight()) : (self.win.outerWidth() - self.win.innerWidth())) : 1; //DON'T TRUST CSS
                if (self.isie8 && px) px += 1;
                return (brd) ? px : 0;
            }
            return px;
        }

        this.getDocumentScrollOffset = function () {
            return {
                top: _win.pageYOffset || _doc.documentElement.scrollTop,
                left: _win.pageXOffset || _doc.documentElement.scrollLeft
            };
        };

        this.getOffset = function () {
            if (self.isfixed) {
                var ofs = self.win.offset();  // fix Chrome auto issue (when right/bottom props only)
                var scrl = self.getDocumentScrollOffset();
                ofs.top -= scrl.top;
                ofs.left -= scrl.left;
                return ofs;
            }
            var ww = self.win.offset();
            if (!self.viewport) return ww;
            var vp = self.viewport.offset();
            return {
                top: ww.top - vp.top,
                left: ww.left - vp.left
            };
        };

        this.updateScrollBar = function (len) {
            var pos, off;
            if (self.ishwscroll) {
                self.rail.css({
                    height: self.win.innerHeight() - (opt.railpadding.top + opt.railpadding.bottom)
                });
                if (self.railh) self.railh.css({
                    width: self.win.innerWidth() - (opt.railpadding.left + opt.railpadding.right)
                });
            } else {
                var wpos = self.getOffset();
                pos = {
                    top: wpos.top,
                    left: wpos.left - (opt.railpadding.left + opt.railpadding.right)
                };
                pos.top += getWidthToPixel(self.win, 'border-top-width', true);
                pos.left += (self.rail.align) ? self.win.outerWidth() - getWidthToPixel(self.win, 'border-right-width') - self.rail.width : getWidthToPixel(self.win, 'border-left-width');

                off = opt.railoffset;
                if (off) {
                    if (off.top) pos.top += off.top;
                    if (off.left) pos.left += off.left;
                }

                if (!self.railslocked) self.rail.css({
                    top: pos.top,
                    left: pos.left,
                    height: ((len) ? len.h : self.win.innerHeight()) - (opt.railpadding.top + opt.railpadding.bottom)
                });

                if (self.zoom) {
                    self.zoom.css({
                        top: pos.top + 1,
                        left: (self.rail.align == 1) ? pos.left - 20 : pos.left + self.rail.width + 4
                    });
                }

                if (self.railh && !self.railslocked) {
                    pos = {
                        top: wpos.top,
                        left: wpos.left
                    };
                    off = opt.railhoffset;
                    if (off) {
                        if (off.top) pos.top += off.top;
                        if (off.left) pos.left += off.left;
                    }
                    var y = (self.railh.align) ? pos.top + getWidthToPixel(self.win, 'border-top-width', true) + self.win.innerHeight() - self.railh.height : pos.top + getWidthToPixel(self.win, 'border-top-width', true);
                    var x = pos.left + getWidthToPixel(self.win, 'border-left-width');
                    self.railh.css({
                        top: y - (opt.railpadding.top + opt.railpadding.bottom),
                        left: x,
                        width: self.railh.width
                    });
                }

            }
        };

        this.doRailClick = function (e, dbl, hr) {
            var fn, pg, cur, pos;

            if (self.railslocked) return;

            self.cancelEvent(e);

            if (!("pageY" in e)) {
                e.pageX = e.clientX + _doc.documentElement.scrollLeft;
                e.pageY = e.clientY + _doc.documentElement.scrollTop;
            }

            if (dbl) {
                fn = (hr) ? self.doScrollLeft : self.doScrollTop;
                cur = (hr) ? ((e.pageX - self.railh.offset().left - (self.cursorwidth / 2)) * self.scrollratio.x) : ((e.pageY - self.rail.offset().top - (self.cursorheight / 2)) * self.scrollratio.y);
                self.unsynched("relativexy");
                fn(cur|0);
            } else {
                fn = (hr) ? self.doScrollLeftBy : self.doScrollBy;
                cur = (hr) ? self.scroll.x : self.scroll.y;
                pos = (hr) ? e.pageX - self.railh.offset().left : e.pageY - self.rail.offset().top;
                pg = (hr) ? self.view.w : self.view.h;
                fn((cur >= pos) ? pg : -pg);
            }

        };

        self.newscrolly = self.newscrollx = 0;

        self.hasanimationframe = ("requestAnimationFrame" in _win);
        self.hascancelanimationframe = ("cancelAnimationFrame" in _win);

        self.hasborderbox = false;

        this.init = function () {

            self.saved.css = [];

            if (cap.isoperamini) return true; // SORRY, DO NOT WORK!
            if (cap.isandroid && !("hidden" in _doc)) return true; // Android 3- SORRY, DO NOT WORK!

            opt.emulatetouch = opt.emulatetouch || opt.touchbehavior;  // mantain compatibility with "touchbehavior"

            self.hasborderbox = _win.getComputedStyle && (_win.getComputedStyle(_doc.body)['box-sizing'] === "border-box");

            var _scrollyhidden = { 'overflow-y': 'hidden' };
            if (cap.isie11 || cap.isie10) _scrollyhidden['-ms-overflow-style'] = 'none';  // IE 10 & 11 is always a world apart!

            if (self.ishwscroll) {
                this.doc.css(cap.transitionstyle, cap.prefixstyle + 'transform 0ms ease-out');
                if (cap.transitionend) self.bind(self.doc, cap.transitionend, self.onScrollTransitionEnd, false); //I have got to do something usefull!!
            }

            self.zindex = "auto";
            if (!self.ispage && opt.zindex == "auto") {
                self.zindex = getZIndex() || "auto";
            } else {
                self.zindex = opt.zindex;
            }

            if (!self.ispage && self.zindex != "auto" && self.zindex > globalmaxzindex) {
                globalmaxzindex = self.zindex;
            }

            if (self.isie && self.zindex === 0 && opt.zindex == "auto") { // fix IE auto == 0
                self.zindex = "auto";
            }

            if (!self.ispage || !cap.isieold) {

                var cont = self.docscroll;
                if (self.ispage) cont = (self.haswrapper) ? self.win : self.doc;

                self.css(cont, _scrollyhidden);

                if (self.ispage && (cap.isie11 || cap.isie)) { // IE 7-11
                    self.css($("html"), _scrollyhidden);
                }

                if (cap.isios && !self.ispage && !self.haswrapper) self.css($body, {
                    "-webkit-overflow-scrolling": "touch"
                }); //force hw acceleration

                var cursor = $(_doc.createElement('div'));
                cursor.css({
                    position: "relative",
                    top: 0,
                    "float": "right",
                    width: opt.cursorwidth,
                    height: 0,
                    'background-color': opt.cursorcolor,
                    border: opt.cursorborder,
                    'background-clip': 'padding-box',
                    '-webkit-border-radius': opt.cursorborderradius,
                    '-moz-border-radius': opt.cursorborderradius,
                    'border-radius': opt.cursorborderradius
                });

                cursor.addClass('nicescroll-cursors');

                self.cursor = cursor;

                var rail = $(_doc.createElement('div'));
                rail.attr('id', self.id);
                rail.addClass('nicescroll-rails nicescroll-rails-vr');

                if (opt.scrollCLass) {
                    rail.addClass(opt.scrollCLass);
                }

                var v, a, kp = ["left", "right", "top", "bottom"];  //**
                for (var n in kp) {
                    a = kp[n];
                    v = opt.railpadding[a] || 0;
                    v && rail.css("padding-" + a, v + "px");
                }

                rail.append(cursor);

                rail.width = Math.max(parseFloat(opt.cursorwidth), cursor.outerWidth());
                rail.css({
                    width: rail.width + "px",
                    zIndex: self.zindex,
                    background: opt.background,
                    cursor: "default"
                });

                rail.visibility = true;
                rail.scrollable = true;

                rail.align = (opt.railalign == "left") ? 0 : 1;

                self.rail = rail;

                self.rail.drag = false;

                var zoom = false;
                if (opt.boxzoom && !self.ispage && !cap.isieold) {
                    zoom = _doc.createElement('div');

                    self.bind(zoom, "click", self.doZoom);
                    self.bind(zoom, "mouseenter", function () {
                        self.zoom.css('opacity', opt.cursoropacitymax);
                    });
                    self.bind(zoom, "mouseleave", function () {
                        self.zoom.css('opacity', opt.cursoropacitymin);
                    });

                    self.zoom = $(zoom);
                    self.zoom.css({
                        cursor: "pointer",
                        zIndex: self.zindex,
                        backgroundImage: 'url(' + opt.scriptpath + 'zoomico.png)',
                        height: 18,
                        width: 18,
                        backgroundPosition: '0 0'
                    });
                    if (opt.dblclickzoom) self.bind(self.win, "dblclick", self.doZoom);
                    if (cap.cantouch && opt.gesturezoom) {
                        self.ongesturezoom = function (e) {
                            if (e.scale > 1.5) self.doZoomIn(e);
                            if (e.scale < 0.8) self.doZoomOut(e);
                            return self.cancelEvent(e);
                        };
                        self.bind(self.win, "gestureend", self.ongesturezoom);
                    }
                }

                // init HORIZ

                self.railh = false;
                var railh;

                if (opt.horizrailenabled) {

                    self.css(cont, {
                        overflowX: 'hidden'
                    });

                    cursor = $(_doc.createElement('div'));
                    cursor.css({
                        position: "absolute",
                        top: 0,
                        height: opt.cursorwidth,
                        width: 0,
                        backgroundColor: opt.cursorcolor,
                        border: opt.cursorborder,
                        backgroundClip: 'padding-box',
                        '-webkit-border-radius': opt.cursorborderradius,
                        '-moz-border-radius': opt.cursorborderradius,
                        'border-radius': opt.cursorborderradius
                    });

                    if (cap.isieold) cursor.css('overflow', 'hidden');  //IE6 horiz scrollbar issue

                    cursor.addClass('nicescroll-cursors');

                    self.cursorh = cursor;

                    railh = $(_doc.createElement('div'));
                    railh.attr('id', self.id + '-hr');
                    railh.addClass('nicescroll-rails nicescroll-rails-hr');
                    if (opt.scrollCLass) {
                        railh.addClass(opt.scrollCLass);
                    }

                    railh.height = Math.max(parseFloat(opt.cursorwidth), cursor.outerHeight());
                    railh.css({
                        height: railh.height + "px",
                        'zIndex': self.zindex,
                        "background": opt.background
                    });

                    railh.append(cursor);

                    railh.visibility = true;
                    railh.scrollable = true;

                    railh.align = (opt.railvalign == "top") ? 0 : 1;

                    self.railh = railh;

                    self.railh.drag = false;

                }

                if (self.ispage) {

                    rail.css({
                        position: "fixed",
                        top: 0,
                        height: "100%"
                    });

                    rail.css((rail.align) ? { right: 0 } : { left: 0 });

                    self.body.append(rail);
                    if (self.railh) {
                        railh.css({
                            position: "fixed",
                            left: 0,
                            width: "100%"
                        });

                        railh.css((railh.align) ? { bottom: 0 } : { top: 0 });

                        self.body.append(railh);
                    }
                } else {
                    if (self.ishwscroll) {
                        if (self.win.css('position') == 'static') self.css(self.win, { 'position': 'relative' });
                        var bd = (self.win[0].nodeName == 'HTML') ? self.body : self.win;
                        $(bd).scrollTop(0).scrollLeft(0);  // fix rail position if content already scrolled
                        if (self.zoom) {
                            self.zoom.css({
                                position: "absolute",
                                top: 1,
                                right: 0,
                                "margin-right": rail.width + 4
                            });
                            bd.append(self.zoom);
                        }
                        rail.css({
                            position: "absolute",
                            top: 0
                        });
                        rail.css((rail.align) ? { right: 0 } : { left: 0 });
                        bd.append(rail);
                        if (railh) {
                            railh.css({
                                position: "absolute",
                                left: 0,
                                bottom: 0
                            });
                            railh.css((railh.align) ? { bottom: 0 } : { top: 0 });
                            bd.append(railh);
                        }
                    } else {
                        self.isfixed = (self.win.css("position") == "fixed");
                        var rlpos = (self.isfixed) ? "fixed" : "absolute";

                        if (!self.isfixed) self.viewport = self.getViewport(self.win[0]);
                        if (self.viewport) {
                            self.body = self.viewport;
                            if (!(/fixed|absolute/.test(self.viewport.css("position")))) self.css(self.viewport, {
                                "position": "relative"
                            });
                        }

                        rail.css({
                            position: rlpos
                        });
                        if (self.zoom) self.zoom.css({
                            position: rlpos
                        });
                        self.updateScrollBar();
                        self.body.append(rail);
                        if (self.zoom) self.body.append(self.zoom);
                        if (self.railh) {
                            railh.css({
                                position: rlpos
                            });
                            self.body.append(railh);
                        }
                    }

                    if (cap.isios) self.css(self.win, {
                        '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
                        '-webkit-touch-callout': 'none'
                    }); // prevent grey layer on click

                    if (opt.disableoutline) {
                        if (cap.isie) self.win.attr("hideFocus", "true"); // IE, prevent dotted rectangle on focused div
                        if (cap.iswebkit) self.win.css('outline', 'none');  // Webkit outline
                    }

                }

                if (opt.autohidemode === false) {
                    self.autohidedom = false;
                    self.rail.css({
                        opacity: opt.cursoropacitymax
                    });
                    if (self.railh) self.railh.css({
                        opacity: opt.cursoropacitymax
                    });
                } else if ((opt.autohidemode === true) || (opt.autohidemode === "leave")) {
                    self.autohidedom = $().add(self.rail);
                    if (cap.isie8) self.autohidedom = self.autohidedom.add(self.cursor);
                    if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
                    if (self.railh && cap.isie8) self.autohidedom = self.autohidedom.add(self.cursorh);
                } else if (opt.autohidemode == "scroll") {
                    self.autohidedom = $().add(self.rail);
                    if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
                } else if (opt.autohidemode == "cursor") {
                    self.autohidedom = $().add(self.cursor);
                    if (self.railh) self.autohidedom = self.autohidedom.add(self.cursorh);
                } else if (opt.autohidemode == "hidden") {
                    self.autohidedom = false;
                    self.hide();
                    self.railslocked = false;
                }

                if (cap.cantouch || self.istouchcapable || opt.emulatetouch || cap.hasmstouch) {

                    self.scrollmom = new ScrollMomentumClass2D(self);

                    var delayedclick = null;

                    self.ontouchstart = function (e) {

                        if (self.locked) return false;

                        //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
                        if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return false;  // need test on surface!!

                        self.hasmoving = false;

                        if (self.scrollmom.timer) {
                            self.triggerScrollEnd();
                            self.scrollmom.stop();
                        }

                        if (!self.railslocked) {
                            var tg = self.getTarget(e);

                            if (tg) {
                                var skp = (/INPUT/i.test(tg.nodeName)) && (/range/i.test(tg.type));
                                if (skp) return self.stopPropagation(e);
                            }

                            var ismouse = (e.type === "mousedown");

                            if (!("clientX" in e) && ("changedTouches" in e)) {
                                e.clientX = e.changedTouches[0].clientX;
                                e.clientY = e.changedTouches[0].clientY;
                            }

                            if (self.forcescreen) {
                                var le = e;
                                e = {
                                    "original": (e.original) ? e.original : e
                                };
                                e.clientX = le.screenX;
                                e.clientY = le.screenY;
                            }

                            self.rail.drag = {
                                x: e.clientX,
                                y: e.clientY,
                                sx: self.scroll.x,
                                sy: self.scroll.y,
                                st: self.getScrollTop(),
                                sl: self.getScrollLeft(),
                                pt: 2,
                                dl: false,
                                tg: tg
                            };

                            if (self.ispage || !opt.directionlockdeadzone) {

                                self.rail.drag.dl = "f";

                            } else {

                                var view = {
                                    w: $window.width(),
                                    h: $window.height()
                                };

                                var page = self.getContentSize();

                                var maxh = page.h - view.h;
                                var maxw = page.w - view.w;

                                if (self.rail.scrollable && !self.railh.scrollable) self.rail.drag.ck = (maxh > 0) ? "v" : false;
                                else if (!self.rail.scrollable && self.railh.scrollable) self.rail.drag.ck = (maxw > 0) ? "h" : false;
                                else self.rail.drag.ck = false;

                            }

                            if (opt.emulatetouch && self.isiframe && cap.isie) {
                                var wp = self.win.position();
                                self.rail.drag.x += wp.left;
                                self.rail.drag.y += wp.top;
                            }

                            self.hasmoving = false;
                            self.lastmouseup = false;
                            self.scrollmom.reset(e.clientX, e.clientY);

                            if (tg&&ismouse) {

                                var ip = /INPUT|SELECT|BUTTON|TEXTAREA/i.test(tg.nodeName);
                                if (!ip) {
                                    if (cap.hasmousecapture) tg.setCapture();
                                    if (opt.emulatetouch) {
                                        if (tg.onclick && !(tg._onclick || false)) { // intercept DOM0 onclick event
                                            tg._onclick = tg.onclick;
                                            tg.onclick = function (e) {
                                                if (self.hasmoving) return false;
                                                tg._onclick.call(this, e);
                                            };
                                        }
                                        return self.cancelEvent(e);
                                    }
                                    return self.stopPropagation(e);
                                }

                                if (/SUBMIT|CANCEL|BUTTON/i.test($(tg).attr('type'))) {
                                    self.preventclick = {
                                        "tg": tg,
                                        "click": false
                                    };
                                }

                            }
                        }

                    };

                    self.ontouchend = function (e) {

                        if (!self.rail.drag) return true;

                        if (self.rail.drag.pt == 2) {
                            //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
                            if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return false;

                            self.rail.drag = false;

                            var ismouse = (e.type === "mouseup");

                            if (self.hasmoving) {
                                self.scrollmom.doMomentum();
                                self.lastmouseup = true;
                                self.hideCursor();
                                if (cap.hasmousecapture) _doc.releaseCapture();
                                if (ismouse) return self.cancelEvent(e);
                            }

                        }
                        else if (self.rail.drag.pt == 1) {
                            return self.onmouseup(e);
                        }

                    };

                    var moveneedoffset = (opt.emulatetouch && self.isiframe && !cap.hasmousecapture);

                    var locktollerance = opt.directionlockdeadzone * 0.3 | 0;

                    self.ontouchmove = function (e, byiframe) {

                        if (!self.rail.drag) return true;

                        if (e.targetTouches && opt.preventmultitouchscrolling) {
                            if (e.targetTouches.length > 1) return true; // multitouch
                        }

                        //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
                        if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return true;

                        if (self.rail.drag.pt == 2) {

                            if (("changedTouches" in e)) {
                                e.clientX = e.changedTouches[0].clientX;
                                e.clientY = e.changedTouches[0].clientY;
                            }

                            var ofy, ofx;
                            ofx = ofy = 0;

                            if (moveneedoffset && !byiframe) {
                                var wp = self.win.position();
                                ofx = -wp.left;
                                ofy = -wp.top;
                            }

                            var fy = e.clientY + ofy;
                            var my = (fy - self.rail.drag.y);
                            var fx = e.clientX + ofx;
                            var mx = (fx - self.rail.drag.x);

                            var ny = self.rail.drag.st - my;

                            if (self.ishwscroll && opt.bouncescroll) {
                                if (ny < 0) {
                                    ny = Math.round(ny / 2);
                                } else if (ny > self.page.maxh) {
                                    ny = self.page.maxh + Math.round((ny - self.page.maxh) / 2);
                                }
                            } else {
                                if (ny < 0) {
                                    ny = 0;
                                    fy = 0;
                                }
                                else if (ny > self.page.maxh) {
                                    ny = self.page.maxh;
                                    fy = 0;
                                }
                                if (fy === 0 && !self.hasmoving) {
                                    if (!self.ispage) self.rail.drag = false;
                                    return true;
                                }
                            }

                            var nx = self.getScrollLeft();

                            if (self.railh && self.railh.scrollable) {
                                nx = (self.isrtlmode) ? mx - self.rail.drag.sl : self.rail.drag.sl - mx;

                                if (self.ishwscroll && opt.bouncescroll) {
                                    if (nx < 0) {
                                        nx = Math.round(nx / 2);
                                    } else if (nx > self.page.maxw) {
                                        nx = self.page.maxw + Math.round((nx - self.page.maxw) / 2);
                                    }
                                } else {
                                    if (nx < 0) {
                                        nx = 0;
                                        fx = 0;
                                    }
                                    if (nx > self.page.maxw) {
                                        nx = self.page.maxw;
                                        fx = 0;
                                    }
                                }

                            }


                            if (!self.hasmoving) {

                                if (self.rail.drag.y === e.clientY && self.rail.drag.x === e.clientX) return self.cancelEvent(e);  // prevent first useless move event

                                var ay = Math.abs(my);
                                var ax = Math.abs(mx);
                                var dz = opt.directionlockdeadzone;

                                if (!self.rail.drag.ck) {
                                    if (ay > dz && ax > dz) self.rail.drag.dl = "f";
                                    else if (ay > dz) self.rail.drag.dl = (ax > locktollerance) ? "f" : "v";
                                    else if (ax > dz) self.rail.drag.dl = (ay > locktollerance) ? "f" : "h";
                                }
                                else if (self.rail.drag.ck == "v") {
                                    if (ax > dz && ay <= locktollerance) {
                                        self.rail.drag = false;
                                    }
                                    else if (ay > dz) self.rail.drag.dl = "v";

                                }
                                else if (self.rail.drag.ck == "h") {

                                    if (ay > dz && ax <= locktollerance) {
                                        self.rail.drag = false;
                                    }
                                    else if (ax > dz) self.rail.drag.dl = "h";

                                }

                                if (!self.rail.drag.dl) return self.cancelEvent(e);

                                self.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0);
                                self.hasmoving = true;
                            }

                            if (self.preventclick && !self.preventclick.click) {
                                self.preventclick.click = self.preventclick.tg.onclick || false;
                                self.preventclick.tg.onclick = self.onpreventclick;
                            }

                            if (self.rail.drag.dl) {
                                if (self.rail.drag.dl == "v") nx = self.rail.drag.sl;
                                else if (self.rail.drag.dl == "h") ny = self.rail.drag.st;
                            }

                            self.synched("touchmove", function () {
                                if (self.rail.drag && (self.rail.drag.pt == 2)) {
                                    if (self.prepareTransition) self.resetTransition();
                                    if (self.rail.scrollable) self.setScrollTop(ny);
                                    self.scrollmom.update(fx, fy);
                                    if (self.railh && self.railh.scrollable) {
                                        self.setScrollLeft(nx);
                                        self.showCursor(ny, nx);
                                    } else {
                                        self.showCursor(ny);
                                    }
                                    if (cap.isie10) _doc.selection.clear();
                                }
                            });

                            return self.cancelEvent(e);

                        }
                        else if (self.rail.drag.pt == 1) { // drag on cursor
                            return self.onmousemove(e);
                        }

                    };

                    self.ontouchstartCursor = function (e, hronly) {
                        if (self.rail.drag && self.rail.drag.pt != 3) return;
                        if (self.locked) return self.cancelEvent(e);
                        self.cancelScroll();
                        self.rail.drag = {
                            x: e.touches[0].clientX,
                            y: e.touches[0].clientY,
                            sx: self.scroll.x,
                            sy: self.scroll.y,
                            pt: 3,
                            hr: (!!hronly)
                        };
                        var tg = self.getTarget(e);
                        if (!self.ispage && cap.hasmousecapture) tg.setCapture();
                        if (self.isiframe && !cap.hasmousecapture) {
                            self.saved.csspointerevents = self.doc.css("pointer-events");
                            self.css(self.doc, { "pointer-events": "none" });
                        }
                        return self.cancelEvent(e);
                    };

                    self.ontouchendCursor = function (e) {
                        if (self.rail.drag) {
                            if (cap.hasmousecapture) _doc.releaseCapture();
                            if (self.isiframe && !cap.hasmousecapture) self.doc.css("pointer-events", self.saved.csspointerevents);
                            if (self.rail.drag.pt != 3) return;
                            self.rail.drag = false;
                            return self.cancelEvent(e);
                        }
                    };

                    self.ontouchmoveCursor = function (e) {
                        if (self.rail.drag) {
                            if (self.rail.drag.pt != 3) return;

                            self.cursorfreezed = true;

                            if (self.rail.drag.hr) {
                                self.scroll.x = self.rail.drag.sx + (e.touches[0].clientX - self.rail.drag.x);
                                if (self.scroll.x < 0) self.scroll.x = 0;
                                var mw = self.scrollvaluemaxw;
                                if (self.scroll.x > mw) self.scroll.x = mw;
                            } else {
                                self.scroll.y = self.rail.drag.sy + (e.touches[0].clientY - self.rail.drag.y);
                                if (self.scroll.y < 0) self.scroll.y = 0;
                                var my = self.scrollvaluemax;
                                if (self.scroll.y > my) self.scroll.y = my;
                            }

                            self.synched('touchmove', function () {
                                if (self.rail.drag && (self.rail.drag.pt == 3)) {
                                    self.showCursor();
                                    if (self.rail.drag.hr) self.doScrollLeft(Math.round(self.scroll.x * self.scrollratio.x), opt.cursordragspeed);
                                    else self.doScrollTop(Math.round(self.scroll.y * self.scrollratio.y), opt.cursordragspeed);
                                }
                            });

                            return self.cancelEvent(e);
                        }

                    };

                }

                self.onmousedown = function (e, hronly) {
                    if (self.rail.drag && self.rail.drag.pt != 1) return;
                    if (self.railslocked) return self.cancelEvent(e);
                    self.cancelScroll();
                    self.rail.drag = {
                        x: e.clientX,
                        y: e.clientY,
                        sx: self.scroll.x,
                        sy: self.scroll.y,
                        pt: 1,
                        hr: hronly || false
                    };
                    var tg = self.getTarget(e);

                    if (cap.hasmousecapture) tg.setCapture();
                    if (self.isiframe && !cap.hasmousecapture) {
                        self.saved.csspointerevents = self.doc.css("pointer-events");
                        self.css(self.doc, {
                            "pointer-events": "none"
                        });
                    }
                    self.hasmoving = false;
                    return self.cancelEvent(e);
                };

                self.onmouseup = function (e) {
                    if (self.rail.drag) {
                        if (self.rail.drag.pt != 1) return true;

                        if (cap.hasmousecapture) _doc.releaseCapture();
                        if (self.isiframe && !cap.hasmousecapture) self.doc.css("pointer-events", self.saved.csspointerevents);
                        self.rail.drag = false;
                        self.cursorfreezed = false;
                        if (self.hasmoving) self.triggerScrollEnd();
                        return self.cancelEvent(e);
                    }
                };

                self.onmousemove = function (e) {
                    if (self.rail.drag) {
                        if (self.rail.drag.pt !== 1) return;

                        if (cap.ischrome && e.which === 0) return self.onmouseup(e);

                        self.cursorfreezed = true;

                        if (!self.hasmoving) self.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0);

                        self.hasmoving = true;

                        if (self.rail.drag.hr) {
                            self.scroll.x = self.rail.drag.sx + (e.clientX - self.rail.drag.x);
                            if (self.scroll.x < 0) self.scroll.x = 0;
                            var mw = self.scrollvaluemaxw;
                            if (self.scroll.x > mw) self.scroll.x = mw;
                        } else {
                            self.scroll.y = self.rail.drag.sy + (e.clientY - self.rail.drag.y);
                            if (self.scroll.y < 0) self.scroll.y = 0;
                            var my = self.scrollvaluemax;
                            if (self.scroll.y > my) self.scroll.y = my;
                        }

                        self.synched('mousemove', function () {

                            if (self.cursorfreezed) {
                                self.showCursor();

                                if (self.rail.drag.hr) {
                                    self.scrollLeft(Math.round(self.scroll.x * self.scrollratio.x));
                                } else {
                                    self.scrollTop(Math.round(self.scroll.y * self.scrollratio.y));
                                }

                            }
                        });

                        return self.cancelEvent(e);
                    }
                    else {
                        self.checkarea = 0;
                    }
                };

                if (cap.cantouch || opt.emulatetouch) {

                    self.onpreventclick = function (e) {
                        if (self.preventclick) {
                            self.preventclick.tg.onclick = self.preventclick.click;
                            self.preventclick = false;
                            return self.cancelEvent(e);
                        }
                    };

                    self.onclick = (cap.isios) ? false : function (e) {  // it needs to check IE11 ???
                        if (self.lastmouseup) {
                            self.lastmouseup = false;
                            return self.cancelEvent(e);
                        } else {
                            return true;
                        }
                    };

                    if (opt.grabcursorenabled && cap.cursorgrabvalue) {
                        self.css((self.ispage) ? self.doc : self.win, {
                            'cursor': cap.cursorgrabvalue
                        });
                        self.css(self.rail, {
                            'cursor': cap.cursorgrabvalue
                        });
                    }

                } else {

                    var checkSelectionScroll = function (e) {
                        if (!self.selectiondrag) return;

                        if (e) {
                            var ww = self.win.outerHeight();
                            var df = (e.pageY - self.selectiondrag.top);
                            if (df > 0 && df < ww) df = 0;
                            if (df >= ww) df -= ww;
                            self.selectiondrag.df = df;
                        }
                        if (self.selectiondrag.df === 0) return;

                        var rt = -(self.selectiondrag.df*2/6)|0;
                        self.doScrollBy(rt);

                        self.debounced("doselectionscroll", function () {
                            checkSelectionScroll();
                        }, 50);
                    };

                    if ("getSelection" in _doc) { // A grade - Major browsers
                        self.hasTextSelected = function () {
                            return (_doc.getSelection().rangeCount > 0);
                        };
                    } else if ("selection" in _doc) { //IE9-
                        self.hasTextSelected = function () {
                            return (_doc.selection.type != "None");
                        };
                    } else {
                        self.hasTextSelected = function () { // no support
                            return false;
                        };
                    }

                    self.onselectionstart = function (e) {
                        //  More testing - severe chrome issues
                        /*
                          if (!self.haswrapper&&(e.which&&e.which==2)) {  // fool browser to manage middle button scrolling
                            self.win.css({'overflow':'auto'});
                            setTimeout(function(){
                              self.win.css({'overflow':'hidden'});
                            },10);
                            return true;
                          }
            */
                        if (self.ispage) return;
                        self.selectiondrag = self.win.offset();
                    };

                    self.onselectionend = function (e) {
                        self.selectiondrag = false;
                    };
                    self.onselectiondrag = function (e) {
                        if (!self.selectiondrag) return;
                        if (self.hasTextSelected()) self.debounced("selectionscroll", function () {
                            checkSelectionScroll(e);
                        }, 250);
                    };
                }

                if (cap.hasw3ctouch) { //IE11+
                    self.css((self.ispage) ? $("html") : self.win, { 'touch-action': 'none' });
                    self.css(self.rail, {
                        'touch-action': 'none'
                    });
                    self.css(self.cursor, {
                        'touch-action': 'none'
                    });
                    self.bind(self.win, "pointerdown", self.ontouchstart);
                    self.bind(_doc, "pointerup", self.ontouchend);
                    self.delegate(_doc, "pointermove", self.ontouchmove);
                } else if (cap.hasmstouch) { //IE10
                    self.css((self.ispage) ? $("html") : self.win, { '-ms-touch-action': 'none' });
                    self.css(self.rail, {
                        '-ms-touch-action': 'none'
                    });
                    self.css(self.cursor, {
                        '-ms-touch-action': 'none'
                    });
                    self.bind(self.win, "MSPointerDown", self.ontouchstart);
                    self.bind(_doc, "MSPointerUp", self.ontouchend);
                    self.delegate(_doc, "MSPointerMove", self.ontouchmove);
                    self.bind(self.cursor, "MSGestureHold", function (e) {
                        e.preventDefault();
                    });
                    self.bind(self.cursor, "contextmenu", function (e) {
                        e.preventDefault();
                    });
                } else if (cap.cantouch) { // smartphones/touch devices
                    self.bind(self.win, "touchstart", self.ontouchstart, false, true);
                    self.bind(_doc, "touchend", self.ontouchend, false, true);
                    self.bind(_doc, "touchcancel", self.ontouchend, false, true);
                    self.delegate(_doc, "touchmove", self.ontouchmove, false, true);
                }

                if (opt.emulatetouch) {
                    self.bind(self.win, "mousedown", self.ontouchstart, false, true);
                    self.bind(_doc, "mouseup", self.ontouchend, false, true);
                    self.bind(_doc, "mousemove", self.ontouchmove, false, true);
                }

                if (opt.cursordragontouch || (!cap.cantouch && !opt.emulatetouch)) {

                    self.rail.css({
                        cursor: "default"
                    });
                    self.railh && self.railh.css({
                        cursor: "default"
                    });

                    self.jqbind(self.rail, "mouseenter", function () {
                        if (!self.ispage && !self.win.is(":visible")) return false;
                        if (self.canshowonmouseevent) self.showCursor();
                        self.rail.active = true;
                    });
                    self.jqbind(self.rail, "mouseleave", function () {
                        self.rail.active = false;
                        if (!self.rail.drag) self.hideCursor();
                    });

                    if (opt.sensitiverail) {
                        self.bind(self.rail, "click", function (e) {
                            self.doRailClick(e, false, false);
                        });
                        self.bind(self.rail, "dblclick", function (e) {
                            self.doRailClick(e, true, false);
                        });
                        self.bind(self.cursor, "click", function (e) {
                            self.cancelEvent(e);
                        });
                        self.bind(self.cursor, "dblclick", function (e) {
                            self.cancelEvent(e);
                        });
                    }

                    if (self.railh) {
                        self.jqbind(self.railh, "mouseenter", function () {
                            if (!self.ispage && !self.win.is(":visible")) return false;
                            if (self.canshowonmouseevent) self.showCursor();
                            self.rail.active = true;
                        });
                        self.jqbind(self.railh, "mouseleave", function () {
                            self.rail.active = false;
                            if (!self.rail.drag) self.hideCursor();
                        });

                        if (opt.sensitiverail) {
                            self.bind(self.railh, "click", function (e) {
                                self.doRailClick(e, false, true);
                            });
                            self.bind(self.railh, "dblclick", function (e) {
                                self.doRailClick(e, true, true);
                            });
                            self.bind(self.cursorh, "click", function (e) {
                                self.cancelEvent(e);
                            });
                            self.bind(self.cursorh, "dblclick", function (e) {
                                self.cancelEvent(e);
                            });
                        }

                    }

                }

                if (opt.cursordragontouch && (this.istouchcapable || cap.cantouch)) {
                    self.bind(self.cursor, "touchstart", self.ontouchstartCursor);
                    self.bind(self.cursor, "touchmove", self.ontouchmoveCursor);
                    self.bind(self.cursor, "touchend", self.ontouchendCursor);
                    self.cursorh && self.bind(self.cursorh, "touchstart", function (e) {
                        self.ontouchstartCursor(e, true);
                    });
                    self.cursorh && self.bind(self.cursorh, "touchmove", self.ontouchmoveCursor);
                    self.cursorh && self.bind(self.cursorh, "touchend", self.ontouchendCursor);
                }

//        if (!cap.cantouch && !opt.emulatetouch) {
                if (!opt.emulatetouch && !cap.isandroid && !cap.isios) {

                    self.bind((cap.hasmousecapture) ? self.win : _doc, "mouseup", self.onmouseup);
                    self.bind(_doc, "mousemove", self.onmousemove);
                    if (self.onclick) self.bind(_doc, "click", self.onclick);

                    self.bind(self.cursor, "mousedown", self.onmousedown);
                    self.bind(self.cursor, "mouseup", self.onmouseup);

                    if (self.railh) {
                        self.bind(self.cursorh, "mousedown", function (e) {
                            self.onmousedown(e, true);
                        });
                        self.bind(self.cursorh, "mouseup", self.onmouseup);
                    }

                    if (!self.ispage && opt.enablescrollonselection) {
                        self.bind(self.win[0], "mousedown", self.onselectionstart);
                        self.bind(_doc, "mouseup", self.onselectionend);
                        self.bind(self.cursor, "mouseup", self.onselectionend);
                        if (self.cursorh) self.bind(self.cursorh, "mouseup", self.onselectionend);
                        self.bind(_doc, "mousemove", self.onselectiondrag);
                    }

                    if (self.zoom) {
                        self.jqbind(self.zoom, "mouseenter", function () {
                            if (self.canshowonmouseevent) self.showCursor();
                            self.rail.active = true;
                        });
                        self.jqbind(self.zoom, "mouseleave", function () {
                            self.rail.active = false;
                            if (!self.rail.drag) self.hideCursor();
                        });
                    }

                } else {

                    self.bind((cap.hasmousecapture) ? self.win : _doc, "mouseup", self.ontouchend);
                    if (self.onclick) self.bind(_doc, "click", self.onclick);

                    if (opt.cursordragontouch) {
                        self.bind(self.cursor, "mousedown", self.onmousedown);
                        self.bind(self.cursor, "mouseup", self.onmouseup);
                        self.cursorh && self.bind(self.cursorh, "mousedown", function (e) {
                            self.onmousedown(e, true);
                        });
                        self.cursorh && self.bind(self.cursorh, "mouseup", self.onmouseup);
                    } else {
                        self.bind(self.rail, "mousedown", function (e) { e.preventDefault(); });  // prevent text selection
                        self.railh && self.bind(self.railh, "mousedown", function (e) { e.preventDefault(); });
                    }

                }


                if (opt.enablemousewheel) {
                    if (!self.isiframe) self.mousewheel((cap.isie && self.ispage) ? _doc : self.win, self.onmousewheel);
                    self.mousewheel(self.rail, self.onmousewheel);
                    if (self.railh) self.mousewheel(self.railh, self.onmousewheelhr);
                }

                if (!self.ispage && !cap.cantouch && !(/HTML|^BODY/.test(self.win[0].nodeName))) {
                    if (!self.win.attr("tabindex")) self.win.attr({
                        "tabindex": ++tabindexcounter
                    });

                    self.bind(self.win, "focus", function (e) {  // better using native events
                        domfocus = (self.getTarget(e)).id || self.getTarget(e) || false;
                        self.hasfocus = true;
                        if (self.canshowonmouseevent) self.noticeCursor();
                    });
                    self.bind(self.win, "blur", function (e) {  // *
                        domfocus = false;
                        self.hasfocus = false;
                    });

                    self.bind(self.win, "mouseenter", function (e) {   // *
                        mousefocus = (self.getTarget(e)).id || self.getTarget(e) || false;
                        self.hasmousefocus = true;
                        if (self.canshowonmouseevent) self.noticeCursor();
                    });
                    self.bind(self.win, "mouseleave", function (e) {   // *
                        mousefocus = false;
                        self.hasmousefocus = false;
                        if (!self.rail.drag) self.hideCursor();
                    });

                }


                //Thanks to http://www.quirksmode.org !!
                self.onkeypress = function (e) {
                    if (self.railslocked && self.page.maxh === 0) return true;

                    e = e || _win.event;
                    var tg = self.getTarget(e);
                    if (tg && /INPUT|TEXTAREA|SELECT|OPTION/.test(tg.nodeName)) {
                        var tp = tg.getAttribute('type') || tg.type || false;
                        if ((!tp) || !(/submit|button|cancel/i.tp)) return true;
                    }

                    if ($(tg).attr('contenteditable')) return true;

                    if (self.hasfocus || (self.hasmousefocus && !domfocus) || (self.ispage && !domfocus && !mousefocus)) {
                        var key = e.keyCode;

                        if (self.railslocked && key != 27) return self.cancelEvent(e);

                        var ctrl = e.ctrlKey || false;
                        var shift = e.shiftKey || false;

                        var ret = false;
                        switch (key) {
                            case 38:
                            case 63233: //safari
                                self.doScrollBy(24 * 3);
                                ret = true;
                                break;
                            case 40:
                            case 63235: //safari
                                self.doScrollBy(-24 * 3);
                                ret = true;
                                break;
                            case 37:
                            case 63232: //safari
                                if (self.railh) {
                                    (ctrl) ? self.doScrollLeft(0) : self.doScrollLeftBy(24 * 3);
                                    ret = true;
                                }
                                break;
                            case 39:
                            case 63234: //safari
                                if (self.railh) {
                                    (ctrl) ? self.doScrollLeft(self.page.maxw) : self.doScrollLeftBy(-24 * 3);
                                    ret = true;
                                }
                                break;
                            case 33:
                            case 63276: // safari
                                self.doScrollBy(self.view.h);
                                ret = true;
                                break;
                            case 34:
                            case 63277: // safari
                                self.doScrollBy(-self.view.h);
                                ret = true;
                                break;
                            case 36:
                            case 63273: // safari
                                (self.railh && ctrl) ? self.doScrollPos(0, 0) : self.doScrollTo(0);
                                ret = true;
                                break;
                            case 35:
                            case 63275: // safari
                                (self.railh && ctrl) ? self.doScrollPos(self.page.maxw, self.page.maxh) : self.doScrollTo(self.page.maxh);
                                ret = true;
                                break;
                            case 32:
                                if (opt.spacebarenabled) {
                                    (shift) ? self.doScrollBy(self.view.h) : self.doScrollBy(-self.view.h);
                                    ret = true;
                                }
                                break;
                            case 27: // ESC
                                if (self.zoomactive) {
                                    self.doZoom();
                                    ret = true;
                                }
                                break;
                        }
                        if (ret) return self.cancelEvent(e);
                    }
                };

                if (opt.enablekeyboard) self.bind(_doc, (cap.isopera && !cap.isopera12) ? "keypress" : "keydown", self.onkeypress);

                self.bind(_doc, "keydown", function (e) {
                    var ctrl = e.ctrlKey || false;
                    if (ctrl) self.wheelprevented = true;
                });
                self.bind(_doc, "keyup", function (e) {
                    var ctrl = e.ctrlKey || false;
                    if (!ctrl) self.wheelprevented = false;
                });
                self.bind(_win, "blur", function (e) {
                    self.wheelprevented = false;
                });

                self.bind(_win, 'resize', self.onscreenresize);
                self.bind(_win, 'orientationchange', self.onscreenresize);

                self.bind(_win, "load", self.lazyResize);

                if (cap.ischrome && !self.ispage && !self.haswrapper) { //chrome void scrollbar bug - it persists in version 26
                    var tmp = self.win.attr("style");
                    var ww = parseFloat(self.win.css("width")) + 1;
                    self.win.css('width', ww);
                    self.synched("chromefix", function () {
                        self.win.attr("style", tmp);
                    });
                }


                // Trying a cross-browser implementation - good luck!

                self.onAttributeChange = function (e) {
                    self.lazyResize(self.isieold ? 250 : 30);
                };

                if (opt.enableobserver) {

                    if ((!self.isie11) && (ClsMutationObserver !== false)) {  // IE11 crashes  #568
                        self.observerbody = new ClsMutationObserver(function (mutations) {
                            mutations.forEach(function (mut) {
                                if (mut.type == "attributes") {
                                    return ($body.hasClass("modal-open") && $body.hasClass("modal-dialog") && !$.contains($('.modal-dialog')[0], self.doc[0])) ? self.hide() : self.show();  // Support for Bootstrap modal; Added check if the nice scroll element is inside a modal
                                }
                            });
                            if (self.me.clientWidth != self.page.width || self.me.clientHeight != self.page.height) return self.lazyResize(30);
                        });
                        self.observerbody.observe(_doc.body, {
                            childList: true,
                            subtree: true,
                            characterData: false,
                            attributes: true,
                            attributeFilter: ['class']
                        });
                    }

                    if (!self.ispage && !self.haswrapper) {

                        var _dom = self.win[0];

                        // redesigned MutationObserver for Chrome18+/Firefox14+/iOS6+ with support for: remove div, add/remove content
                        if (ClsMutationObserver !== false) {
                            self.observer = new ClsMutationObserver(function (mutations) {
                                mutations.forEach(self.onAttributeChange);
                            });
                            self.observer.observe(_dom, {
                                childList: true,
                                characterData: false,
                                attributes: true,
                                subtree: false
                            });
                            self.observerremover = new ClsMutationObserver(function (mutations) {
                                mutations.forEach(function (mo) {
                                    if (mo.removedNodes.length > 0) {
                                        for (var dd in mo.removedNodes) {
                                            if (!!self && (mo.removedNodes[dd] === _dom)) return self.remove();
                                        }
                                    }
                                });
                            });
                            self.observerremover.observe(_dom.parentNode, {
                                childList: true,
                                characterData: false,
                                attributes: false,
                                subtree: false
                            });
                        } else {
                            self.bind(_dom, (cap.isie && !cap.isie9) ? "propertychange" : "DOMAttrModified", self.onAttributeChange);
                            if (cap.isie9) _dom.attachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug
                            self.bind(_dom, "DOMNodeRemoved", function (e) {
                                if (e.target === _dom) self.remove();
                            });
                        }
                    }

                }

                //

                if (!self.ispage && opt.boxzoom) self.bind(_win, "resize", self.resizeZoom);
                if (self.istextarea) {
                    self.bind(self.win, "keydown", self.lazyResize);
                    self.bind(self.win, "mouseup", self.lazyResize);
                }

                self.lazyResize(30);

            }

            if (this.doc[0].nodeName == 'IFRAME') {
                var oniframeload = function () {
                    self.iframexd = false;
                    var doc;
                    try {
                        doc = 'contentDocument' in this ? this.contentDocument : this.contentWindow._doc;
                        var a = doc.domain;
                    } catch (e) {
                        self.iframexd = true;
                        doc = false;
                    }

                    if (self.iframexd) {
                        if ("console" in _win) console.log('NiceScroll error: policy restriced iframe');
                        return true; //cross-domain - I can't manage this
                    }

                    self.forcescreen = true;

                    if (self.isiframe) {
                        self.iframe = {
                            "doc": $(doc),
                            "html": self.doc.contents().find('html')[0],
                            "body": self.doc.contents().find('body')[0]
                        };
                        self.getContentSize = function () {
                            return {
                                w: Math.max(self.iframe.html.scrollWidth, self.iframe.body.scrollWidth),
                                h: Math.max(self.iframe.html.scrollHeight, self.iframe.body.scrollHeight)
                            };
                        };
                        self.docscroll = $(self.iframe.body);
                    }

                    if (!cap.isios && opt.iframeautoresize && !self.isiframe) {
                        self.win.scrollTop(0); // reset position
                        self.doc.height(""); //reset height to fix browser bug
                        var hh = Math.max(doc.getElementsByTagName('html')[0].scrollHeight, doc.body.scrollHeight);
                        self.doc.height(hh);
                    }
                    self.lazyResize(30);

                    self.css($(self.iframe.body), _scrollyhidden);

                    if (cap.isios && self.haswrapper) {
                        self.css($(doc.body), {
                            '-webkit-transform': 'translate3d(0,0,0)'
                        }); // avoid iFrame content clipping - thanks to http://blog.derraab.com/2012/04/02/avoid-iframe-content-clipping-with-css-transform-on-ios/
                    }

                    if ('contentWindow' in this) {
                        self.bind(this.contentWindow, "scroll", self.onscroll); //IE8 & minor
                    } else {
                        self.bind(doc, "scroll", self.onscroll);
                    }

                    if (opt.enablemousewheel) {
                        self.mousewheel(doc, self.onmousewheel);
                    }

                    if (opt.enablekeyboard) self.bind(doc, (cap.isopera) ? "keypress" : "keydown", self.onkeypress);

                    if (cap.cantouch) {
                        self.bind(doc, "touchstart", self.ontouchstart);
                        self.bind(doc, "touchmove", self.ontouchmove);
                    }
                    else if (opt.emulatetouch) {
                        self.bind(doc, "mousedown", self.ontouchstart);
                        self.bind(doc, "mousemove", function (e) {
                            return self.ontouchmove(e, true);
                        });
                        if (opt.grabcursorenabled && cap.cursorgrabvalue) self.css($(doc.body), {
                            'cursor': cap.cursorgrabvalue
                        });
                    }

                    self.bind(doc, "mouseup", self.ontouchend);

                    if (self.zoom) {
                        if (opt.dblclickzoom) self.bind(doc, 'dblclick', self.doZoom);
                        if (self.ongesturezoom) self.bind(doc, "gestureend", self.ongesturezoom);
                    }
                };

                if (this.doc[0].readyState && this.doc[0].readyState === "complete") {
                    setTimeout(function () {
                        oniframeload.call(self.doc[0], false);
                    }, 500);
                }
                self.bind(this.doc, "load", oniframeload);

            }

        };

        this.showCursor = function (py, px) {
            if (self.cursortimeout) {
                clearTimeout(self.cursortimeout);
                self.cursortimeout = 0;
            }
            if (!self.rail) return;
            if (self.autohidedom) {
                self.autohidedom.stop().css({
                    opacity: opt.cursoropacitymax
                });
                self.cursoractive = true;
            }

            if (!self.rail.drag || self.rail.drag.pt != 1) {
                if (py !== undefined && py !== false) {
                    self.scroll.y = (py / self.scrollratio.y) | 0;
                }
                if (px !== undefined) {
                    self.scroll.x = (px / self.scrollratio.x) | 0;
                }
            }

            self.cursor.css({
                height: self.cursorheight,
                top: self.scroll.y
            });
            if (self.cursorh) {
                var lx = (self.hasreversehr) ? self.scrollvaluemaxw - self.scroll.x : self.scroll.x;
                self.cursorh.css({
                    width: self.cursorwidth,
                    left: (!self.rail.align && self.rail.visibility) ? lx + self.rail.width : lx
                });
                self.cursoractive = true;
            }

            if (self.zoom) self.zoom.stop().css({
                opacity: opt.cursoropacitymax
            });
        };

        this.hideCursor = function (tm) {
            if (self.cursortimeout) return;
            if (!self.rail) return;
            if (!self.autohidedom) return;

            if (self.hasmousefocus && opt.autohidemode === "leave") return;
            self.cursortimeout = setTimeout(function () {
                if (!self.rail.active || !self.showonmouseevent) {
                    self.autohidedom.stop().animate({
                        opacity: opt.cursoropacitymin
                    });
                    if (self.zoom) self.zoom.stop().animate({
                        opacity: opt.cursoropacitymin
                    });
                    self.cursoractive = false;
                }
                self.cursortimeout = 0;
            }, tm || opt.hidecursordelay);
        };

        this.noticeCursor = function (tm, py, px) {
            self.showCursor(py, px);
            if (!self.rail.active) self.hideCursor(tm);
        };

        this.getContentSize =
            (self.ispage) ?
                function () {
                    return {
                        w: Math.max(_doc.body.scrollWidth, _doc.documentElement.scrollWidth),
                        h: Math.max(_doc.body.scrollHeight, _doc.documentElement.scrollHeight)
                    };
                } : (self.haswrapper) ?
                function () {
                    return {
                        w: self.doc[0].offsetWidth,
                        h: self.doc[0].offsetHeight
                    };
                } : function () {
                    return {
                        w: self.docscroll[0].scrollWidth,
                        h: self.docscroll[0].scrollHeight
                    };
                };

        this.onResize = function (e, page) {

            if (!self || !self.win) return false;

            var premaxh = self.page.maxh,
                premaxw = self.page.maxw,
                previewh = self.view.h,
                previeww = self.view.w;

            self.view = {
                w: (self.ispage) ? self.win.width() : self.win[0].clientWidth,
                h: (self.ispage) ? self.win.height() : self.win[0].clientHeight
            };

            self.page = (page) ? page : self.getContentSize();

            self.page.maxh = Math.max(0, self.page.h - self.view.h);
            self.page.maxw = Math.max(0, self.page.w - self.view.w);

            if ((self.page.maxh == premaxh) && (self.page.maxw == premaxw) && (self.view.w == previeww) && (self.view.h == previewh)) {
                // test position
                if (!self.ispage) {
                    var pos = self.win.offset();
                    if (self.lastposition) {
                        var lst = self.lastposition;
                        if ((lst.top == pos.top) && (lst.left == pos.left)) return self; //nothing to do
                    }
                    self.lastposition = pos;
                } else {
                    return self; //nothing to do
                }
            }

            if (self.page.maxh === 0) {
                self.hideRail();
                self.scrollvaluemax = 0;
                self.scroll.y = 0;
                self.scrollratio.y = 0;
                self.cursorheight = 0;
                self.setScrollTop(0);
                if (self.rail) self.rail.scrollable = false;
            } else {
                self.page.maxh -= (opt.railpadding.top + opt.railpadding.bottom);
                self.rail.scrollable = true;
            }

            if (self.page.maxw === 0) {
                self.hideRailHr();
                self.scrollvaluemaxw = 0;
                self.scroll.x = 0;
                self.scrollratio.x = 0;
                self.cursorwidth = 0;
                self.setScrollLeft(0);
                if (self.railh) {
                    self.railh.scrollable = false;
                }
            } else {
                self.page.maxw -= (opt.railpadding.left + opt.railpadding.right);
                if (self.railh) self.railh.scrollable = (opt.horizrailenabled);
            }

            self.railslocked = (self.locked) || ((self.page.maxh === 0) && (self.page.maxw === 0));
            if (self.railslocked) {
                if (!self.ispage) self.updateScrollBar(self.view);
                return false;
            }

            if (!self.hidden) {
                if (!self.rail.visibility) self.showRail();
                if (self.railh && !self.railh.visibility) self.showRailHr();
            }

            if (self.istextarea && self.win.css('resize') && self.win.css('resize') != 'none') self.view.h -= 20;

            self.cursorheight = Math.min(self.view.h, Math.round(self.view.h * (self.view.h / self.page.h)));
            self.cursorheight = (opt.cursorfixedheight) ? opt.cursorfixedheight : Math.max(opt.cursorminheight, self.cursorheight);

            self.cursorwidth = Math.min(self.view.w, Math.round(self.view.w * (self.view.w / self.page.w)));
            self.cursorwidth = (opt.cursorfixedheight) ? opt.cursorfixedheight : Math.max(opt.cursorminheight, self.cursorwidth);

            self.scrollvaluemax = self.view.h - self.cursorheight - (opt.railpadding.top + opt.railpadding.bottom);
            if (!self.hasborderbox) self.scrollvaluemax -= self.cursor[0].offsetHeight - self.cursor[0].clientHeight;

            if (self.railh) {
                self.railh.width = (self.page.maxh > 0) ? (self.view.w - self.rail.width) : self.view.w;
                self.scrollvaluemaxw = self.railh.width - self.cursorwidth - (opt.railpadding.left + opt.railpadding.right);
            }

            if (!self.ispage) self.updateScrollBar(self.view);

            self.scrollratio = {
                x: (self.page.maxw / self.scrollvaluemaxw),
                y: (self.page.maxh / self.scrollvaluemax)
            };

            var sy = self.getScrollTop();
            if (sy > self.page.maxh) {
                self.doScrollTop(self.page.maxh);
            } else {
                self.scroll.y = (self.getScrollTop() / self.scrollratio.y) | 0;
                self.scroll.x = (self.getScrollLeft() / self.scrollratio.x) | 0;
                if (self.cursoractive) self.noticeCursor();
            }

            if (self.scroll.y && (self.getScrollTop() === 0)) self.doScrollTo((self.scroll.y * self.scrollratio.y)|0);

            return self;
        };

        this.resize = self.onResize;

        var hlazyresize = 0;

        this.onscreenresize = function(e) {
            clearTimeout(hlazyresize);

            var hiderails = (!self.ispage && !self.haswrapper);
            if (hiderails) self.hideRails();

            hlazyresize = setTimeout(function () {
                if (self) {
                    if (hiderails) self.showRails();
                    self.resize();
                }
                hlazyresize=0;
            }, 120);
        };

        this.lazyResize = function (tm) { // event debounce

            clearTimeout(hlazyresize);

            tm = isNaN(tm) ? 240 : tm;

            hlazyresize = setTimeout(function () {
                self && self.resize();
                hlazyresize=0;
            }, tm);

            return self;

        };

        // derived by MDN https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference/wheel
        function _modernWheelEvent(dom, name, fn, bubble) {
            self._bind(dom, name, function (e) {
                e = e || _win.event;
                var event = {
                    original: e,
                    target: e.target || e.srcElement,
                    type: "wheel",
                    deltaMode: e.type == "MozMousePixelScroll" ? 0 : 1,
                    deltaX: 0,
                    deltaZ: 0,
                    preventDefault: function () {
                        e.preventDefault ? e.preventDefault() : e.returnValue = false;
                        return false;
                    },
                    stopImmediatePropagation: function () {
                        (e.stopImmediatePropagation) ? e.stopImmediatePropagation() : e.cancelBubble = true;
                    }
                };

                if (name == "mousewheel") {
                    e.wheelDeltaX && (event.deltaX = -1 / 40 * e.wheelDeltaX);
                    e.wheelDeltaY && (event.deltaY = -1 / 40 * e.wheelDeltaY);
                    !event.deltaY && !event.deltaX && (event.deltaY = -1 / 40 * e.wheelDelta);
                } else {
                    event.deltaY = e.detail;
                }

                return fn.call(dom, event);
            }, bubble);
        }



        this.jqbind = function (dom, name, fn) { // use jquery bind for non-native events (mouseenter/mouseleave)
            self.events.push({
                e: dom,
                n: name,
                f: fn,
                q: true
            });
            $(dom).on(name, fn);
        };

        this.mousewheel = function (dom, fn, bubble) { // bind mousewheel
            var el = ("jquery" in dom) ? dom[0] : dom;
            if ("onwheel" in _doc.createElement("div")) { // Modern browsers support "wheel"
                self._bind(el, "wheel", fn, bubble || false);
            } else {
                var wname = (_doc.onmousewheel !== undefined) ? "mousewheel" : "DOMMouseScroll"; // older Webkit+IE support or older Firefox
                _modernWheelEvent(el, wname, fn, bubble || false);
                if (wname == "DOMMouseScroll") _modernWheelEvent(el, "MozMousePixelScroll", fn, bubble || false); // Firefox legacy
            }
        };

        var passiveSupported = false;

        if (cap.haseventlistener) {  // W3C standard event model

            // thanks to https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
            try { var options = Object.defineProperty({}, "passive", { get: function () { passiveSupported = !0; } }); _win.addEventListener("test", null, options); } catch (err) { }

            this.stopPropagation = function (e) {
                if (!e) return false;
                e = (e.original) ? e.original : e;
                e.stopPropagation();
                return false;
            };

            this.cancelEvent = function(e) {
                if (e.cancelable) e.preventDefault();
                e.stopImmediatePropagation();
                if (e.preventManipulation) e.preventManipulation();  // IE10+
                return false;
            };

        } else {

            // inspired from https://gist.github.com/jonathantneal/2415137

            Event.prototype.preventDefault = function () {
                this.returnValue = false;
            };

            Event.prototype.stopPropagation = function () {
                this.cancelBubble = true;
            };

            _win.constructor.prototype.addEventListener = _doc.constructor.prototype.addEventListener = Element.prototype.addEventListener = function (type, listener, useCapture) {
                this.attachEvent("on" + type, listener);
            };
            _win.constructor.prototype.removeEventListener = _doc.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function (type, listener, useCapture) {
                this.detachEvent("on" + type, listener);
            };

            // Thanks to http://www.switchonthecode.com !!
            this.cancelEvent = function (e) {
                e = e || _win.event;
                if (e) {
                    e.cancelBubble = true;
                    e.cancel = true;
                    e.returnValue = false;
                }
                return false;
            };

            this.stopPropagation = function (e) {
                e = e || _win.event;
                if (e) e.cancelBubble = true;
                return false;
            };

        }

        this.delegate = function (dom, name, fn, bubble, active) {

            var de = delegatevents[name] || false;

            if (!de) {

                de = {
                    a: [],
                    l: [],
                    f: function (e) {
                        var lst = de.l, l = lst.length - 1;
                        var r = false;
                        for (var a = l; a >= 0; a--) {
                            r = lst[a].call(e.target, e);
                            if (r === false) return false;
                        }
                        return r;
                    }
                };

                self.bind(dom, name, de.f, bubble, active);

                delegatevents[name] = de;

            }

            if (self.ispage) {
                de.a = [self.id].concat(de.a);
                de.l = [fn].concat(de.l);
            } else {
                de.a.push(self.id);
                de.l.push(fn);
            }

        };

        this.undelegate = function (dom, name, fn, bubble, active) {
            var de = delegatevents[name]||false;
            if (de&&de.l) {  // quick fix #683
                for (var a=0,l=de.l.length;a<l;a++) {
                    if (de.a[a] === self.id) {
                        de.a.splice(a);
                        de.l.splice(a);
                        if (de.a.length===0) {
                            self._unbind(dom,name,de.l.f);
                            delegatevents[name] = null;
                        }
                    }
                }
            }
        };

        this.bind = function (dom, name, fn, bubble, active) {
            var el = ("jquery" in dom) ? dom[0] : dom;
            self._bind(el, name, fn, bubble || false, active || false);
        };

        this._bind = function (el, name, fn, bubble, active) { // primitive bind

            self.events.push({
                e: el,
                n: name,
                f: fn,
                b: bubble,
                q: false
            });

            (passiveSupported && (active || el == window.document || el == window.document.body || el == window)) ? el.addEventListener(name, fn, { passive: false, capture: bubble }) : el.addEventListener(name, fn, bubble || false);
        };

        this._unbind = function (el, name, fn, bub) { // primitive unbind
            if (delegatevents[name]) self.undelegate(el, name, fn, bub);
            else el.removeEventListener(name, fn, bub);
        };

        this.unbindAll = function () {
            for (var a = 0; a < self.events.length; a++) {
                var r = self.events[a];
                (r.q) ? r.e.unbind(r.n, r.f) : self._unbind(r.e, r.n, r.f, r.b);
            }
        };

        this.showRails = function () {
            return self.showRail().showRailHr();
        };

        this.showRail = function () {
            if ((self.page.maxh !== 0) && (self.ispage || self.win.css('display') != 'none')) {
                //self.visibility = true;
                self.rail.visibility = true;
                self.rail.css('display', 'block');
            }
            return self;
        };

        this.showRailHr = function () {
            if (self.railh) {
                if ((self.page.maxw !== 0) && (self.ispage || self.win.css('display') != 'none')) {
                    self.railh.visibility = true;
                    self.railh.css('display', 'block');
                }
            }
            return self;
        };

        this.hideRails = function () {
            return self.hideRail().hideRailHr();
        };

        this.hideRail = function () {
            //self.visibility = false;
            self.rail.visibility = false;
            self.rail.css('display', 'none');
            return self;
        };

        this.hideRailHr = function () {
            if (self.railh) {
                self.railh.visibility = false;
                self.railh.css('display', 'none');
            }
            return self;
        };

        this.show = function () {
            self.hidden = false;
            self.railslocked = false;
            return self.showRails();
        };

        this.hide = function () {
            self.hidden = true;
            self.railslocked = true;
            return self.hideRails();
        };

        this.toggle = function () {
            return (self.hidden) ? self.show() : self.hide();
        };

        this.remove = function () {
            self.stop();
            if (self.cursortimeout) clearTimeout(self.cursortimeout);
            for (var n in self.delaylist) if (self.delaylist[n]) clearAnimationFrame(self.delaylist[n].h);
            self.doZoomOut();
            self.unbindAll();

            if (cap.isie9) self.win[0].detachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug

            if (self.observer !== false) self.observer.disconnect();
            if (self.observerremover !== false) self.observerremover.disconnect();
            if (self.observerbody !== false) self.observerbody.disconnect();

            self.events = null;

            if (self.cursor) {
                self.cursor.remove();
            }
            if (self.cursorh) {
                self.cursorh.remove();
            }
            if (self.rail) {
                self.rail.remove();
            }
            if (self.railh) {
                self.railh.remove();
            }
            if (self.zoom) {
                self.zoom.remove();
            }
            for (var a = 0; a < self.saved.css.length; a++) {
                var d = self.saved.css[a];
                d[0].css(d[1], (d[2] === undefined) ? '' : d[2]);
            }
            self.saved = false;
            self.me.data('__nicescroll', ''); //erase all traces

            // memory leak fixed by GianlucaGuarini - thanks a lot!
            // remove the current nicescroll from the $.nicescroll array & normalize array
            var lst = $.nicescroll;
            lst.each(function (i) {
                if (!this) return;
                if (this.id === self.id) {
                    delete lst[i];
                    for (var b = ++i; b < lst.length; b++ , i++) lst[i] = lst[b];
                    lst.length--;
                    if (lst.length) delete lst[lst.length];
                }
            });

            for (var i in self) {
                self[i] = null;
                delete self[i];
            }

            self = null;

        };

        this.scrollstart = function (fn) {
            this.onscrollstart = fn;
            return self;
        };
        this.scrollend = function (fn) {
            this.onscrollend = fn;
            return self;
        };
        this.scrollcancel = function (fn) {
            this.onscrollcancel = fn;
            return self;
        };

        this.zoomin = function (fn) {
            this.onzoomin = fn;
            return self;
        };
        this.zoomout = function (fn) {
            this.onzoomout = fn;
            return self;
        };

        this.isScrollable = function (e) {
            var dom = (e.target) ? e.target : e;
            if (dom.nodeName == 'OPTION') return true;
            while (dom && (dom.nodeType == 1) && (dom !== this.me[0]) && !(/^BODY|HTML/.test(dom.nodeName))) {
                var dd = $(dom);
                var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
                if (/scroll|auto/.test(ov)) return (dom.clientHeight != dom.scrollHeight);
                dom = (dom.parentNode) ? dom.parentNode : false;
            }
            return false;
        };

        this.getViewport = function (me) {
            var dom = (me && me.parentNode) ? me.parentNode : false;
            while (dom && (dom.nodeType == 1) && !(/^BODY|HTML/.test(dom.nodeName))) {
                var dd = $(dom);
                if (/fixed|absolute/.test(dd.css("position"))) return dd;
                var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
                if ((/scroll|auto/.test(ov)) && (dom.clientHeight != dom.scrollHeight)) return dd;
                if (dd.getNiceScroll().length > 0) return dd;
                dom = (dom.parentNode) ? dom.parentNode : false;
            }
            return false;
        };

        this.triggerScrollStart = function (cx, cy, rx, ry, ms) {

            if (self.onscrollstart) {
                var info = {
                    type: "scrollstart",
                    current: {
                        x: cx,
                        y: cy
                    },
                    request: {
                        x: rx,
                        y: ry
                    },
                    end: {
                        x: self.newscrollx,
                        y: self.newscrolly
                    },
                    speed: ms
                };
                self.onscrollstart.call(self, info);
            }

        };

        this.triggerScrollEnd = function () {
            if (self.onscrollend) {

                var px = self.getScrollLeft();
                var py = self.getScrollTop();

                var info = {
                    type: "scrollend",
                    current: {
                        x: px,
                        y: py
                    },
                    end: {
                        x: px,
                        y: py
                    }
                };

                self.onscrollend.call(self, info);

            }

        };

        var scrolldiry = 0, scrolldirx = 0, scrolltmr = 0, scrollspd = 1;

        function doScrollRelative(px, py, chkscroll, iswheel) {

            if (!self.scrollrunning) {
                self.newscrolly = self.getScrollTop();
                self.newscrollx = self.getScrollLeft();
                scrolltmr = now();
            }

            var gap = (now() - scrolltmr);
            scrolltmr = now();

            if (gap > 350) {
                scrollspd = 1;
            } else {
                scrollspd += (2 - scrollspd) / 10;
            }

            px = px * scrollspd | 0;
            py = py * scrollspd | 0;

            if (px) {

                if (iswheel) { // mouse-only
                    if (px < 0) {  // fix apple magic mouse swipe back/forward
                        if (self.getScrollLeft() >= self.page.maxw) return true;
                    } else {
                        if (self.getScrollLeft() <= 0) return true;
                    }
                }

                var dx = px > 0 ? 1 : -1;

                if (scrolldirx !== dx) {
                    if (self.scrollmom) self.scrollmom.stop();
                    self.newscrollx = self.getScrollLeft();
                    scrolldirx = dx;
                }

                self.lastdeltax -= px;

            }

            if (py) {

                var chk = (function () {
                    var top = self.getScrollTop();
                    if (py < 0) {
                        if (top >= self.page.maxh) return true;
                    } else {
                        if (top <= 0) return true;
                    }
                })();

                if (chk) {
                    if (opt.nativeparentscrolling && chkscroll && !self.ispage && !self.zoomactive) return true;
                    var ny = self.view.h >> 1;
                    if (self.newscrolly < -ny) { self.newscrolly = -ny; py = -1; }
                    else if (self.newscrolly > self.page.maxh + ny) { self.newscrolly = self.page.maxh + ny; py = 1; }
                    else py = 0;
                }

                var dy = py > 0 ? 1 : -1;

                if (scrolldiry !== dy) {
                    if (self.scrollmom) self.scrollmom.stop();
                    self.newscrolly = self.getScrollTop();
                    scrolldiry = dy;
                }

                self.lastdeltay -= py;

            }

            if (py || px) {
                self.synched("relativexy", function () {

                    var dty = self.lastdeltay + self.newscrolly;
                    self.lastdeltay = 0;

                    var dtx = self.lastdeltax + self.newscrollx;
                    self.lastdeltax = 0;

                    if (!self.rail.drag) self.doScrollPos(dtx, dty);

                });
            }

        }

        var hasparentscrollingphase = false;

        function execScrollWheel(e, hr, chkscroll) {
            var px, py;

            if (!chkscroll && hasparentscrollingphase) return true;

            if (e.deltaMode === 0) { // PIXEL
                px = -(e.deltaX * (opt.mousescrollstep / (18 * 3))) | 0;
                py = -(e.deltaY * (opt.mousescrollstep / (18 * 3))) | 0;
            } else if (e.deltaMode === 1) { // LINE
                px = -(e.deltaX * opt.mousescrollstep * 50 / 80) | 0;
                py = -(e.deltaY * opt.mousescrollstep * 50 / 80) | 0;
            }

            if (hr && opt.oneaxismousemode && (px === 0) && py) { // classic vertical-only mousewheel + browser with x/y support
                px = py;
                py = 0;

                if (chkscroll) {
                    var hrend = (px < 0) ? (self.getScrollLeft() >= self.page.maxw) : (self.getScrollLeft() <= 0);
                    if (hrend) {  // preserve vertical scrolling
                        py = px;
                        px = 0;
                    }
                }

            }

            // invert horizontal direction for rtl mode
            if (self.isrtlmode) px = -px;

            var chk = doScrollRelative(px, py, chkscroll, true);

            if (chk) {
                if (chkscroll) hasparentscrollingphase = true;
            } else {
                hasparentscrollingphase = false;
                e.stopImmediatePropagation();
                return e.preventDefault();
            }

        }

        this.onmousewheel = function (e) {
            if (self.wheelprevented||self.locked) return false;
            if (self.railslocked) {
                self.debounced("checkunlock", self.resize, 250);
                return false;
            }
            if (self.rail.drag) return self.cancelEvent(e);

            if (opt.oneaxismousemode === "auto" && e.deltaX !== 0) opt.oneaxismousemode = false; // check two-axis mouse support (not very elegant)

            if (opt.oneaxismousemode && e.deltaX === 0) {
                if (!self.rail.scrollable) {
                    if (self.railh && self.railh.scrollable) {
                        return self.onmousewheelhr(e);
                    } else {
                        return true;
                    }
                }
            }

            var nw = now();
            var chk = false;
            if (opt.preservenativescrolling && ((self.checkarea + 600) < nw)) {
                self.nativescrollingarea = self.isScrollable(e);
                chk = true;
            }
            self.checkarea = nw;
            if (self.nativescrollingarea) return true; // this isn't my business
            var ret = execScrollWheel(e, false, chk);
            if (ret) self.checkarea = 0;
            return ret;
        };

        this.onmousewheelhr = function (e) {
            if (self.wheelprevented) return;
            if (self.railslocked || !self.railh.scrollable) return true;
            if (self.rail.drag) return self.cancelEvent(e);

            var nw = now();
            var chk = false;
            if (opt.preservenativescrolling && ((self.checkarea + 600) < nw)) {
                self.nativescrollingarea = self.isScrollable(e);
                chk = true;
            }
            self.checkarea = nw;
            if (self.nativescrollingarea) return true; // this is not my business
            if (self.railslocked) return self.cancelEvent(e);

            return execScrollWheel(e, true, chk);
        };

        this.stop = function () {
            self.cancelScroll();
            if (self.scrollmon) self.scrollmon.stop();
            self.cursorfreezed = false;
            self.scroll.y = Math.round(self.getScrollTop() * (1 / self.scrollratio.y));
            self.noticeCursor();
            return self;
        };

        this.getTransitionSpeed = function (dif) {

            return 80 + (dif / 72) * opt.scrollspeed |0;

        };

        if (!opt.smoothscroll) {
            this.doScrollLeft = function (x, spd) { //direct
                var y = self.getScrollTop();
                self.doScrollPos(x, y, spd);
            };
            this.doScrollTop = function (y, spd) { //direct
                var x = self.getScrollLeft();
                self.doScrollPos(x, y, spd);
            };
            this.doScrollPos = function (x, y, spd) { //direct
                var nx = (x > self.page.maxw) ? self.page.maxw : x;
                if (nx < 0) nx = 0;
                var ny = (y > self.page.maxh) ? self.page.maxh : y;
                if (ny < 0) ny = 0;
                self.synched('scroll', function () {
                    self.setScrollTop(ny);
                    self.setScrollLeft(nx);
                });
            };
            this.cancelScroll = function () { }; // direct

        } else if (self.ishwscroll && cap.hastransition && opt.usetransition && !!opt.smoothscroll) {

            var lasttransitionstyle = '';

            this.resetTransition = function () {
                lasttransitionstyle = '';
                self.doc.css(cap.prefixstyle + 'transition-duration', '0ms');
            };

            this.prepareTransition = function (dif, istime) {
                var ex = (istime) ? dif : self.getTransitionSpeed(dif);
                var trans = ex + 'ms';
                if (lasttransitionstyle !== trans) {
                    lasttransitionstyle = trans;
                    self.doc.css(cap.prefixstyle + 'transition-duration', trans);
                }
                return ex;
            };

            this.doScrollLeft = function (x, spd) { //trans
                var y = (self.scrollrunning) ? self.newscrolly : self.getScrollTop();
                self.doScrollPos(x, y, spd);
            };

            this.doScrollTop = function (y, spd) { //trans
                var x = (self.scrollrunning) ? self.newscrollx : self.getScrollLeft();
                self.doScrollPos(x, y, spd);
            };

            this.cursorupdate = {
                running: false,
                start: function () {
                    var m = this;

                    if (m.running) return;
                    m.running = true;

                    var loop = function () {
                        if (m.running) setAnimationFrame(loop);
                        self.showCursor(self.getScrollTop(), self.getScrollLeft());
                        self.notifyScrollEvent(self.win[0]);
                    };

                    setAnimationFrame(loop);
                },
                stop: function () {
                    this.running = false;
                }
            };

            this.doScrollPos = function (x, y, spd) { //trans

                var py = self.getScrollTop();
                var px = self.getScrollLeft();

                if (((self.newscrolly - py) * (y - py) < 0) || ((self.newscrollx - px) * (x - px) < 0)) self.cancelScroll(); //inverted movement detection

                if (!opt.bouncescroll) {
                    if (y < 0) y = 0;
                    else if (y > self.page.maxh) y = self.page.maxh;
                    if (x < 0) x = 0;
                    else if (x > self.page.maxw) x = self.page.maxw;
                } else {
                    if (y < 0) y = y / 2 | 0;
                    else if (y > self.page.maxh) y = self.page.maxh + (y - self.page.maxh) / 2 | 0;
                    if (x < 0) x = x / 2 | 0;
                    else if (x > self.page.maxw) x = self.page.maxw + (x - self.page.maxw) / 2 | 0;
                }

                if (self.scrollrunning && x == self.newscrollx && y == self.newscrolly) return false;

                self.newscrolly = y;
                self.newscrollx = x;

                var top = self.getScrollTop();
                var lft = self.getScrollLeft();

                var dst = {};
                dst.x = x - lft;
                dst.y = y - top;

                var dd = Math.sqrt((dst.x * dst.x) + (dst.y * dst.y)) | 0;

                var ms = self.prepareTransition(dd);

                if (!self.scrollrunning) {
                    self.scrollrunning = true;
                    self.triggerScrollStart(lft, top, x, y, ms);
                    self.cursorupdate.start();
                }

                self.scrollendtrapped = true;

                if (!cap.transitionend) {
                    if (self.scrollendtrapped) clearTimeout(self.scrollendtrapped);
                    self.scrollendtrapped = setTimeout(self.onScrollTransitionEnd, ms); // simulate transitionend event
                }

                self.setScrollTop(self.newscrolly);
                self.setScrollLeft(self.newscrollx);

            };

            this.cancelScroll = function () {
                if (!self.scrollendtrapped) return true;
                var py = self.getScrollTop();
                var px = self.getScrollLeft();
                self.scrollrunning = false;
                if (!cap.transitionend) clearTimeout(cap.transitionend);
                self.scrollendtrapped = false;
                self.resetTransition();
                self.setScrollTop(py); // fire event onscroll
                if (self.railh) self.setScrollLeft(px);
                if (self.timerscroll && self.timerscroll.tm) clearInterval(self.timerscroll.tm);
                self.timerscroll = false;

                self.cursorfreezed = false;

                self.cursorupdate.stop();
                self.showCursor(py, px);
                return self;
            };

            this.onScrollTransitionEnd = function () {

                if (!self.scrollendtrapped) return;

                var py = self.getScrollTop();
                var px = self.getScrollLeft();

                if (py < 0) py = 0;
                else if (py > self.page.maxh) py = self.page.maxh;
                if (px < 0) px = 0;
                else if (px > self.page.maxw) px = self.page.maxw;
                if ((py != self.newscrolly) || (px != self.newscrollx)) return self.doScrollPos(px, py, opt.snapbackspeed);

                if (self.scrollrunning) self.triggerScrollEnd();
                self.scrollrunning = false;

                self.scrollendtrapped = false;
                self.resetTransition();
                self.timerscroll = false;
                self.setScrollTop(py); // fire event onscroll
                if (self.railh) self.setScrollLeft(px); // fire event onscroll left

                self.cursorupdate.stop();
                self.noticeCursor(false, py, px);

                self.cursorfreezed = false;

            };

        } else {

            this.doScrollLeft = function (x, spd) { //no-trans
                var y = (self.scrollrunning) ? self.newscrolly : self.getScrollTop();
                self.doScrollPos(x, y, spd);
            };

            this.doScrollTop = function (y, spd) { //no-trans
                var x = (self.scrollrunning) ? self.newscrollx : self.getScrollLeft();
                self.doScrollPos(x, y, spd);
            };

            this.doScrollPos = function (x, y, spd) { //no-trans

                var py = self.getScrollTop();
                var px = self.getScrollLeft();

                if (((self.newscrolly - py) * (y - py) < 0) || ((self.newscrollx - px) * (x - px) < 0)) self.cancelScroll(); //inverted movement detection

                var clipped = false;

                if (!self.bouncescroll || !self.rail.visibility) {
                    if (y < 0) {
                        y = 0;
                        clipped = true;
                    } else if (y > self.page.maxh) {
                        y = self.page.maxh;
                        clipped = true;
                    }
                }
                if (!self.bouncescroll || !self.railh.visibility) {
                    if (x < 0) {
                        x = 0;
                        clipped = true;
                    } else if (x > self.page.maxw) {
                        x = self.page.maxw;
                        clipped = true;
                    }
                }

                if (self.scrollrunning && (self.newscrolly === y) && (self.newscrollx === x)) return true;

                self.newscrolly = y;
                self.newscrollx = x;

                self.dst = {};
                self.dst.x = x - px;
                self.dst.y = y - py;
                self.dst.px = px;
                self.dst.py = py;

                var dd = Math.sqrt((self.dst.x * self.dst.x) + (self.dst.y * self.dst.y)) | 0;
                var ms = self.getTransitionSpeed(dd);

                self.bzscroll = {};

                var p3 = (clipped) ? 1 : 0.58;
                self.bzscroll.x = new BezierClass(px, self.newscrollx, ms, 0, 0, p3, 1);
                self.bzscroll.y = new BezierClass(py, self.newscrolly, ms, 0, 0, p3, 1);

                var loopid = now();

                var loop = function () {

                    if (!self.scrollrunning) return;
                    var x = self.bzscroll.y.getPos();

                    self.setScrollLeft(self.bzscroll.x.getNow());
                    self.setScrollTop(self.bzscroll.y.getNow());

                    if (x <= 1) {
                        self.timer = setAnimationFrame(loop);
                    } else {
                        self.scrollrunning = false;
                        self.timer = 0;
                        self.triggerScrollEnd();
                    }

                };

                if (!self.scrollrunning) {
                    self.triggerScrollStart(px, py, x, y, ms);
                    self.scrollrunning = true;
                    self.timer = setAnimationFrame(loop);
                }

            };

            this.cancelScroll = function () {
                if (self.timer) clearAnimationFrame(self.timer);
                self.timer = 0;
                self.bzscroll = false;
                self.scrollrunning = false;
                return self;
            };

        }

        this.doScrollBy = function (stp, relative) {
            doScrollRelative(0, stp);
        };

        this.doScrollLeftBy = function (stp, relative) {
            doScrollRelative(stp, 0);
        };

        this.doScrollTo = function (pos, relative) {
            var ny = (relative) ? Math.round(pos * self.scrollratio.y) : pos;
            if (ny < 0) ny = 0;
            else if (ny > self.page.maxh) ny = self.page.maxh;
            self.cursorfreezed = false;
            self.doScrollTop(pos);
        };

        this.checkContentSize = function () {
            var pg = self.getContentSize();
            if ((pg.h != self.page.h) || (pg.w != self.page.w)) self.resize(false, pg);
        };

        self.onscroll = function (e) {
            if (self.rail.drag) return;
            if (!self.cursorfreezed) {
                self.synched('scroll', function () {
                    self.scroll.y = Math.round(self.getScrollTop() / self.scrollratio.y);
                    if (self.railh) self.scroll.x = Math.round(self.getScrollLeft() / self.scrollratio.x);
                    self.noticeCursor();
                });
            }
        };
        self.bind(self.docscroll, "scroll", self.onscroll);

        this.doZoomIn = function (e) {
            if (self.zoomactive) return;
            self.zoomactive = true;

            self.zoomrestore = {
                style: {}
            };
            var lst = ['position', 'top', 'left', 'zIndex', 'backgroundColor', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];
            var win = self.win[0].style;
            for (var a in lst) {
                var pp = lst[a];
                self.zoomrestore.style[pp] = (win[pp] !== undefined) ? win[pp] : '';
            }

            self.zoomrestore.style.width = self.win.css('width');
            self.zoomrestore.style.height = self.win.css('height');

            self.zoomrestore.padding = {
                w: self.win.outerWidth() - self.win.width(),
                h: self.win.outerHeight() - self.win.height()
            };

            if (cap.isios4) {
                self.zoomrestore.scrollTop = $window.scrollTop();
                $window.scrollTop(0);
            }

            self.win.css({
                position: (cap.isios4) ? "absolute" : "fixed",
                top: 0,
                left: 0,
                zIndex: globalmaxzindex + 100,
                margin: 0
            });
            var bkg = self.win.css("backgroundColor");
            if ("" === bkg || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(bkg)) self.win.css("backgroundColor", "#fff");
            self.rail.css({
                zIndex: globalmaxzindex + 101
            });
            self.zoom.css({
                zIndex: globalmaxzindex + 102
            });
            self.zoom.css('backgroundPosition', '0 -18px');
            self.resizeZoom();

            if (self.onzoomin) self.onzoomin.call(self);

            return self.cancelEvent(e);
        };

        this.doZoomOut = function (e) {
            if (!self.zoomactive) return;
            self.zoomactive = false;

            self.win.css("margin", "");
            self.win.css(self.zoomrestore.style);

            if (cap.isios4) {
                $window.scrollTop(self.zoomrestore.scrollTop);
            }

            self.rail.css({
                "z-index": self.zindex
            });
            self.zoom.css({
                "z-index": self.zindex
            });
            self.zoomrestore = false;
            self.zoom.css('backgroundPosition', '0 0');
            self.onResize();

            if (self.onzoomout) self.onzoomout.call(self);

            return self.cancelEvent(e);
        };

        this.doZoom = function (e) {
            return (self.zoomactive) ? self.doZoomOut(e) : self.doZoomIn(e);
        };

        this.resizeZoom = function () {
            if (!self.zoomactive) return;

            var py = self.getScrollTop(); //preserve scrolling position
            self.win.css({
                width: $window.width() - self.zoomrestore.padding.w + "px",
                height: $window.height() - self.zoomrestore.padding.h + "px"
            });
            self.onResize();

            self.setScrollTop(Math.min(self.page.maxh, py));
        };

        this.init();

        $.nicescroll.push(this);

    };

    // Inspired by the work of Kin Blas
    // http://webpro.host.adobe.com/people/jblas/momentum/includes/jquery.momentum.0.7.js
    var ScrollMomentumClass2D = function (nc) {
        var self = this;
        this.nc = nc;

        this.lastx = 0;
        this.lasty = 0;
        this.speedx = 0;
        this.speedy = 0;
        this.lasttime = 0;
        this.steptime = 0;
        this.snapx = false;
        this.snapy = false;
        this.demulx = 0;
        this.demuly = 0;

        this.lastscrollx = -1;
        this.lastscrolly = -1;

        this.chkx = 0;
        this.chky = 0;

        this.timer = 0;

        this.reset = function (px, py) {
            self.stop();
            self.steptime = 0;
            self.lasttime = now();
            self.speedx = 0;
            self.speedy = 0;
            self.lastx = px;
            self.lasty = py;
            self.lastscrollx = -1;
            self.lastscrolly = -1;
        };

        this.update = function (px, py) {
            var tm = now();
            self.steptime = tm - self.lasttime;
            self.lasttime = tm;
            var dy = py - self.lasty;
            var dx = px - self.lastx;
            var sy = self.nc.getScrollTop();
            var sx = self.nc.getScrollLeft();
            var newy = sy + dy;
            var newx = sx + dx;
            self.snapx = (newx < 0) || (newx > self.nc.page.maxw);
            self.snapy = (newy < 0) || (newy > self.nc.page.maxh);
            self.speedx = dx;
            self.speedy = dy;
            self.lastx = px;
            self.lasty = py;
        };

        this.stop = function () {
            self.nc.unsynched("domomentum2d");
            if (self.timer) clearTimeout(self.timer);
            self.timer = 0;
            self.lastscrollx = -1;
            self.lastscrolly = -1;
        };

        this.doSnapy = function (nx, ny) {
            var snap = false;

            if (ny < 0) {
                ny = 0;
                snap = true;
            } else if (ny > self.nc.page.maxh) {
                ny = self.nc.page.maxh;
                snap = true;
            }

            if (nx < 0) {
                nx = 0;
                snap = true;
            } else if (nx > self.nc.page.maxw) {
                nx = self.nc.page.maxw;
                snap = true;
            }

            (snap) ? self.nc.doScrollPos(nx, ny, self.nc.opt.snapbackspeed) : self.nc.triggerScrollEnd();
        };

        this.doMomentum = function (gp) {
            var t = now();
            var l = (gp) ? t + gp : self.lasttime;

            var sl = self.nc.getScrollLeft();
            var st = self.nc.getScrollTop();

            var pageh = self.nc.page.maxh;
            var pagew = self.nc.page.maxw;

            self.speedx = (pagew > 0) ? Math.min(60, self.speedx) : 0;
            self.speedy = (pageh > 0) ? Math.min(60, self.speedy) : 0;

            var chk = l && (t - l) <= 60;

            if ((st < 0) || (st > pageh) || (sl < 0) || (sl > pagew)) chk = false;

            var sy = (self.speedy && chk) ? self.speedy : false;
            var sx = (self.speedx && chk) ? self.speedx : false;

            if (sy || sx) {
                var tm = Math.max(16, self.steptime); //timeout granularity

                if (tm > 50) { // do smooth
                    var xm = tm / 50;
                    self.speedx *= xm;
                    self.speedy *= xm;
                    tm = 50;
                }

                self.demulxy = 0;

                self.lastscrollx = self.nc.getScrollLeft();
                self.chkx = self.lastscrollx;
                self.lastscrolly = self.nc.getScrollTop();
                self.chky = self.lastscrolly;

                var nx = self.lastscrollx;
                var ny = self.lastscrolly;

                var onscroll = function () {
                    var df = ((now() - t) > 600) ? 0.04 : 0.02;

                    if (self.speedx) {
                        nx = Math.floor(self.lastscrollx - (self.speedx * (1 - self.demulxy)));
                        self.lastscrollx = nx;
                        if ((nx < 0) || (nx > pagew)) df = 0.10;
                    }

                    if (self.speedy) {
                        ny = Math.floor(self.lastscrolly - (self.speedy * (1 - self.demulxy)));
                        self.lastscrolly = ny;
                        if ((ny < 0) || (ny > pageh)) df = 0.10;
                    }

                    self.demulxy = Math.min(1, self.demulxy + df);

                    self.nc.synched("domomentum2d", function () {

                        if (self.speedx) {
                            var scx = self.nc.getScrollLeft();
                            //              if (scx != self.chkx) self.stop();
                            self.chkx = nx;
                            self.nc.setScrollLeft(nx);
                        }

                        if (self.speedy) {
                            var scy = self.nc.getScrollTop();
                            //              if (scy != self.chky) self.stop();
                            self.chky = ny;
                            self.nc.setScrollTop(ny);
                        }

                        if (!self.timer) {
                            self.nc.hideCursor();
                            self.doSnapy(nx, ny);
                        }

                    });

                    if (self.demulxy < 1) {
                        self.timer = setTimeout(onscroll, tm);
                    } else {
                        self.stop();
                        self.nc.hideCursor();
                        self.doSnapy(nx, ny);
                    }
                };

                onscroll();

            } else {
                self.doSnapy(self.nc.getScrollLeft(), self.nc.getScrollTop());
            }

        };

    };


    // override jQuery scrollTop
    var _scrollTop = jQuery.fn.scrollTop; // preserve original function

    jQuery.cssHooks.pageYOffset = {
        get: function (elem, computed, extra) {
            var nice = $.data(elem, '__nicescroll') || false;
            return (nice && nice.ishwscroll) ? nice.getScrollTop() : _scrollTop.call(elem);
        },
        set: function (elem, value) {
            var nice = $.data(elem, '__nicescroll') || false;
            (nice && nice.ishwscroll) ? nice.setScrollTop(parseInt(value)) : _scrollTop.call(elem, value);
            return this;
        }
    };

    jQuery.fn.scrollTop = function (value) {
        if (value === undefined) {
            var nice = (this[0]) ? $.data(this[0], '__nicescroll') || false : false;
            return (nice && nice.ishwscroll) ? nice.getScrollTop() : _scrollTop.call(this);
        } else {
            return this.each(function () {
                var nice = $.data(this, '__nicescroll') || false;
                (nice && nice.ishwscroll) ? nice.setScrollTop(parseInt(value)) : _scrollTop.call($(this), value);
            });
        }
    };

    // override jQuery scrollLeft
    var _scrollLeft = jQuery.fn.scrollLeft; // preserve original function

    $.cssHooks.pageXOffset = {
        get: function (elem, computed, extra) {
            var nice = $.data(elem, '__nicescroll') || false;
            return (nice && nice.ishwscroll) ? nice.getScrollLeft() : _scrollLeft.call(elem);
        },
        set: function (elem, value) {
            var nice = $.data(elem, '__nicescroll') || false;
            (nice && nice.ishwscroll) ? nice.setScrollLeft(parseInt(value)) : _scrollLeft.call(elem, value);
            return this;
        }
    };

    jQuery.fn.scrollLeft = function (value) {
        if (value === undefined) {
            var nice = (this[0]) ? $.data(this[0], '__nicescroll') || false : false;
            return (nice && nice.ishwscroll) ? nice.getScrollLeft() : _scrollLeft.call(this);
        } else {
            return this.each(function () {
                var nice = $.data(this, '__nicescroll') || false;
                (nice && nice.ishwscroll) ? nice.setScrollLeft(parseInt(value)) : _scrollLeft.call($(this), value);
            });
        }
    };

    var NiceScrollArray = function (doms) {
        var self = this;
        this.length = 0;
        this.name = "nicescrollarray";

        this.each = function (fn) {
            $.each(self, fn);
            return self;
        };

        this.push = function (nice) {
            self[self.length] = nice;
            self.length++;
        };

        this.eq = function (idx) {
            return self[idx];
        };

        if (doms) {
            for (var a = 0; a < doms.length; a++) {
                var nice = $.data(doms[a], '__nicescroll') || false;
                if (nice) {
                    this[this.length] = nice;
                    this.length++;
                }
            }
        }

        return this;
    };

    function mplex(el, lst, fn) {
        for (var a = 0, l = lst.length; a < l; a++) fn(el, lst[a]);
    }
    mplex(
        NiceScrollArray.prototype, ['show', 'hide', 'toggle', 'onResize', 'resize', 'remove', 'stop', 'doScrollPos'],
        function (e, n) {
            e[n] = function () {
                var args = arguments;
                return this.each(function () {
                    this[n].apply(this, args);
                });
            };
        }
    );

    jQuery.fn.getNiceScroll = function (index) {
        if (index === undefined) {
            return new NiceScrollArray(this);
        } else {
            return this[index] && $.data(this[index], '__nicescroll') || false;
        }
    };

    var pseudos = jQuery.expr.pseudos || jQuery.expr[':'];  // jQuery 3 migration
    pseudos.nicescroll = function (a) {
        return $.data(a, '__nicescroll') !== undefined;
    };

    $.fn.niceScroll = function (wrapper, _opt) {
        if (_opt === undefined && typeof wrapper == "object" && !("jquery" in wrapper)) {
            _opt = wrapper;
            wrapper = false;
        }

        var ret = new NiceScrollArray();

        this.each(function () {
            var $this = $(this);

            var opt = $.extend({}, _opt); // cloning

            if (wrapper || false) {
                var wrp = $(wrapper);
                opt.doc = (wrp.length > 1) ? $(wrapper, $this) : wrp;
                opt.win = $this;
            }
            var docundef = !("doc" in opt);
            if (!docundef && !("win" in opt)) opt.win = $this;

            var nice = $this.data('__nicescroll') || false;
            if (!nice) {
                opt.doc = opt.doc || $this;
                nice = new NiceScrollClass(opt, $this);
                $this.data('__nicescroll', nice);
            }
            ret.push(nice);
        });

        return (ret.length === 1) ? ret[0] : ret;
    };

    _win.NiceScroll = {
        getjQuery: function () {
            return jQuery;
        }
    };

    if (!$.nicescroll) {
        $.nicescroll = new NiceScrollArray();
        $.nicescroll.options = _globaloptions;
    }

}));
/* ==== RESPOND JS ==== */

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia=window.matchMedia||function(a){"use strict";var c,d=a.documentElement,e=d.firstElementChild||d.firstChild,f=a.createElement("body"),g=a.createElement("div");return g.id="mq-test-1",g.style.cssText="position:absolute;top:-100em",f.style.background="none",f.appendChild(g),function(a){return g.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',d.insertBefore(f,e),c=42===g.offsetWidth,d.removeChild(f),{matches:c,media:a}}}(document);

/*! Respond.js v1.3.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(a){"use strict";function x(){u(!0)}var b={};if(a.respond=b,b.update=function(){},b.mediaQueriesSupported=a.matchMedia&&a.matchMedia("only all").matches,!b.mediaQueriesSupported){var q,r,t,c=a.document,d=c.documentElement,e=[],f=[],g=[],h={},i=30,j=c.getElementsByTagName("head")[0]||d,k=c.getElementsByTagName("base")[0],l=j.getElementsByTagName("link"),m=[],n=function(){for(var b=0;l.length>b;b++){var c=l[b],d=c.href,e=c.media,f=c.rel&&"stylesheet"===c.rel.toLowerCase();d&&f&&!h[d]&&(c.styleSheet&&c.styleSheet.rawCssText?(p(c.styleSheet.rawCssText,d,e),h[d]=!0):(!/^([a-zA-Z:]*\/\/)/.test(d)&&!k||d.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&m.push({href:d,media:e}))}o()},o=function(){if(m.length){var b=m.shift();v(b.href,function(c){p(c,b.href,b.media),h[b.href]=!0,a.setTimeout(function(){o()},0)})}},p=function(a,b,c){var d=a.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),g=d&&d.length||0;b=b.substring(0,b.lastIndexOf("/"));var h=function(a){return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+b+"$2$3")},i=!g&&c;b.length&&(b+="/"),i&&(g=1);for(var j=0;g>j;j++){var k,l,m,n;i?(k=c,f.push(h(a))):(k=d[j].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,f.push(RegExp.$2&&h(RegExp.$2))),m=k.split(","),n=m.length;for(var o=0;n>o;o++)l=m[o],e.push({media:l.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:f.length-1,hasquery:l.indexOf("(")>-1,minw:l.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:l.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}u()},s=function(){var a,b=c.createElement("div"),e=c.body,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",e||(e=f=c.createElement("body"),e.style.background="none"),e.appendChild(b),d.insertBefore(e,d.firstChild),a=b.offsetWidth,f?d.removeChild(e):e.removeChild(b),a=t=parseFloat(a)},u=function(b){var h="clientWidth",k=d[h],m="CSS1Compat"===c.compatMode&&k||c.body[h]||k,n={},o=l[l.length-1],p=(new Date).getTime();if(b&&q&&i>p-q)return a.clearTimeout(r),r=a.setTimeout(u,i),void 0;q=p;for(var v in e)if(e.hasOwnProperty(v)){var w=e[v],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?t||s():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?t||s():1)),w.hasquery&&(z&&A||!(z||m>=x)||!(A||y>=m))||(n[w.media]||(n[w.media]=[]),n[w.media].push(f[w.rules]))}for(var C in g)g.hasOwnProperty(C)&&g[C]&&g[C].parentNode===j&&j.removeChild(g[C]);for(var D in n)if(n.hasOwnProperty(D)){var E=c.createElement("style"),F=n[D].join("\n");E.type="text/css",E.media=D,j.insertBefore(E,o.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(c.createTextNode(F)),g.push(E)}},v=function(a,b){var c=w();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))},w=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}();n(),b.update=n,a.addEventListener?a.addEventListener("resize",x,!1):a.attachEvent&&a.attachEvent("onresize",x)}})(this);


/* --- $SALVATTORE --- */

var salvattoreStart;

/*
 * Salvattore 1.0.7 by @rnmp and @ppold
 * https://github.com/rnmp/salvattore
 *
 * MIT LICENSE
 *
 * Copyright (c) 2013-2014 Rolando Murillo and Giorgio Leveroni

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(root, factory) {
	if(typeof exports === 'object') {
		module.exports = factory();
	}
	else if(typeof define === 'function' && define.amd) {
		define('salvattore', [], factory);
	}
	else {
		root.salvattore = factory();
	}
}(this, function() {
	/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

	window.matchMedia || (window.matchMedia = function() {
		"use strict";

		// For browsers that support matchMedium api such as IE 9 and webkit
		var styleMedia = (window.styleMedia || window.media);

		// For those that don't support matchMedium
		if (!styleMedia) {
			var style       = document.createElement('style'),
				script      = document.getElementsByTagName('script')[0],
				info        = null;

			style.type  = 'text/css';
			style.id    = 'matchmediajs-test';

			script.parentNode.insertBefore(style, script);

			// 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
			info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

			styleMedia = {
				matchMedium: function(media) {
					var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

					// 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
					if (style.styleSheet) {
						style.styleSheet.cssText = text;
					} else {
						style.textContent = text;
					}

					// Test if media query is true or false
					return info.width === '1px';
				}
			};
		}

		return function(media) {
			return {
				matches: styleMedia.matchMedium(media || 'all'),
				media: media || 'all'
			};
		};
	}());
	;/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
	(function(){
		// Bail out for browsers that have addListener support
		if (window.matchMedia && window.matchMedia('all').addListener) {
			return false;
		}

		var localMatchMedia = window.matchMedia,
			hasMediaQueries = localMatchMedia('only all').matches,
			isListening     = false,
			timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
			queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
			handleChange    = function(evt) {
				// Debounce
				clearTimeout(timeoutID);

				timeoutID = setTimeout(function() {
					for (var i = 0, il = queries.length; i < il; i++) {
						var mql         = queries[i].mql,
							listeners   = queries[i].listeners || [],
							matches     = localMatchMedia(mql.media).matches;

						// Update mql.matches value and call listeners
						// Fire listeners only if transitioning to or from matched state
						if (matches !== mql.matches) {
							mql.matches = matches;

							for (var j = 0, jl = listeners.length; j < jl; j++) {
								listeners[j].call(window, mql);
							}
						}
					}
				}, 30);
			};

		window.matchMedia = function(media) {
			var mql         = localMatchMedia(media),
				listeners   = [],
				index       = 0;

			mql.addListener = function(listener) {
				// Changes would not occur to css media type so return now (Affects IE <= 8)
				if (!hasMediaQueries) {
					return;
				}

				// Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
				// There should only ever be 1 resize listener running for performance
				if (!isListening) {
					isListening = true;
					window.addEventListener('resize', handleChange, true);
				}

				// Push object only if it has not been pushed already
				if (index === 0) {
					index = queries.push({
						mql         : mql,
						listeners   : listeners
					});
				}

				listeners.push(listener);
			};

			mql.removeListener = function(listener) {
				for (var i = 0, il = listeners.length; i < il; i++){
					if (listeners[i] === listener){
						listeners.splice(i, 1);
					}
				}
			};

			return mql;
		};
	}());
	;// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
			|| window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); },
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}());
	;var salvattore = (function (global, document, undefined) {
		"use strict";

		var self = {},
			grids = [],
			add_to_dataset = function(element, key, value) {
				// uses dataset function or a fallback for <ie10
				if (element.dataset) {
					element.dataset[key] = value;
				} else {
					element.setAttribute("data-" + key, value);
				}
				return;
			};

		self.obtain_grid_settings = function obtain_grid_settings(element) {
			// returns the number of columns and the classes a column should have,
			// from computing the style of the ::before pseudo-element of the grid.

			var computedStyle = global.getComputedStyle(element, ":before")
				, content = computedStyle.getPropertyValue("content").slice(1, -1)
				, matchResult = content.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/)
				, numberOfColumns
				, columnClasses
				;

			if (matchResult) {
				numberOfColumns = matchResult[1];
				columnClasses = matchResult[2];
				columnClasses = columnClasses? columnClasses.split(".") : ["column"];
			} else {
				matchResult = content.match(/^\s*\.(.+)\s+(\d+)\s*$/);
				columnClasses = matchResult[1];
				numberOfColumns = matchResult[2];
				if (numberOfColumns) {
					numberOfColumns = numberOfColumns.split(".");
				}
			}

			return {
				numberOfColumns: numberOfColumns,
				columnClasses: columnClasses
			};
		};


		self.add_columns = function add_columns(grid, items) {
			// from the settings obtained, it creates columns with
			// the configured classes and adds to them a list of items.

			var settings = self.obtain_grid_settings(grid)
				, numberOfColumns = settings.numberOfColumns
				, columnClasses = settings.columnClasses
				, columnsItems = new Array(+numberOfColumns)
				, columnsFragment = document.createDocumentFragment()
				, i = numberOfColumns
				, selector
				;

			while (i-- !== 0) {
				selector = "[data-columns] > *:nth-child(" + numberOfColumns + "n-" + i + ")";
				columnsItems.push(items.querySelectorAll(selector));
			}

			columnsItems.forEach(function append_to_grid_fragment(rows) {
				var column = document.createElement("div")
					, rowsFragment = document.createDocumentFragment()
					;

				column.className = columnClasses.join(" ");

				Array.prototype.forEach.call(rows, function append_to_column(row) {
					rowsFragment.appendChild(row);
				});
				column.appendChild(rowsFragment);
				columnsFragment.appendChild(column);
			});

			grid.appendChild(columnsFragment);
			add_to_dataset(grid, 'columns', numberOfColumns);
		};


		self.remove_columns = function remove_columns(grid) {
			// removes all the columns from a grid, and returns a list
			// of items sorted by the ordering of columns.

			var range = document.createRange();
			range.selectNodeContents(grid);

			var columns = Array.prototype.filter.call(range.extractContents().childNodes, function filter_elements(node) {
				return node instanceof global.HTMLElement;
			});

			var numberOfColumns = columns.length
				, numberOfRowsInFirstColumn = columns[0].childNodes.length
				, sortedRows = new Array(numberOfRowsInFirstColumn * numberOfColumns)
				;

			Array.prototype.forEach.call(columns, function iterate_columns(column, columnIndex) {
				Array.prototype.forEach.call(column.children, function iterate_rows(row, rowIndex) {
					sortedRows[rowIndex * numberOfColumns + columnIndex] = row;
				});
			});

			var container = document.createElement("div");
			add_to_dataset(container, 'columns', 0);

			sortedRows.filter(function filter_non_null(child) {
				return !!child;
			}).forEach(function append_row(child) {
				container.appendChild(child);
			});

			return container;
		};


		self.recreate_columns = function recreate_columns(grid) {
			// removes all the columns from the grid, and adds them again,
			// it is used when the number of columns change.

			global.requestAnimationFrame(function render_after_css_media_query_change() {
				self.add_columns(grid, self.remove_columns(grid));
			});
		};


		self.media_query_change = function media_query_change(mql) {
			// recreates the columns when a media query matches the current state
			// of the browser.

			if (mql.matches) {
				Array.prototype.forEach.call(grids, self.recreate_columns);
			}
		};


		self.get_css_rules = function get_css_rules(stylesheet) {
			// returns a list of css rules from a stylesheet

			var cssRules;
			try {
				cssRules = stylesheet.sheet.cssRules || stylesheet.sheet.rules;
			} catch (e) {
				return [];
			}

			return cssRules || [];
		};


		self.get_stylesheets = function get_stylesheets() {
			// returns a list of all the styles in the document (that are accessible).

			return Array.prototype.concat.call(
				Array.prototype.slice.call(document.querySelectorAll("style[type='text/css']")),
				Array.prototype.slice.call(document.querySelectorAll("link[rel='stylesheet']"))
			);
		};


		self.media_rule_has_columns_selector = function media_rule_has_columns_selector(rules) {
			// checks if a media query css rule has in its contents a selector that
			// styles the grid.

			var i = rules.length
				, rule
				;

			while (i--) {
				rule = rules[i];
				if (rule.selectorText && rule.selectorText.match(/\[data-columns\](.*)::?before$/)) {
					return true;
				}
			}

			return false;
		};


		self.scan_media_queries = function scan_media_queries() {
			// scans all the stylesheets for selectors that style grids,
			// if the matchMedia API is supported.

			var mediaQueries = [];

			if (!global.matchMedia) {
				return;
			}

			self.get_stylesheets().forEach(function extract_rules(stylesheet) {
				Array.prototype.forEach.call(self.get_css_rules(stylesheet), function filter_by_column_selector(rule) {
					if (rule.media && self.media_rule_has_columns_selector(rule.cssRules)) {
						mediaQueries.push(global.matchMedia(rule.media.mediaText));
					}
				});
			});

			mediaQueries.forEach(function listen_to_changes(mql) {
				mql.addListener(self.media_query_change);
			});
		};


		self.next_element_column_index = function next_element_column_index(grid, fragments) {
			// returns the index of the column where the given element must be added.

			var children = grid.children
				, m = children.length
				, lowestRowCount = 0
				, child
				, currentRowCount
				, i
				, index = 0
				;
			for (i = 0; i < m; i++) {
				child = children[i];
				currentRowCount = child.children.length + fragments[i].children.length;
				if(lowestRowCount === 0) {
					lowestRowCount = currentRowCount;
				}
				if(currentRowCount < lowestRowCount) {
					index = i;
					lowestRowCount = currentRowCount;
				}
			}

			return index;
		};


		self.create_list_of_fragments = function create_list_of_fragments(quantity) {
			// returns a list of fragments

			var fragments = new Array(quantity)
				, i = 0
				;

			while (i !== quantity) {
				fragments[i] = document.createDocumentFragment();
				i++;
			}

			return fragments;
		};


		self.append_elements = function append_elements(grid, elements) {
			// adds a list of elements to the end of a grid

			var columns = grid.children
				, numberOfColumns = columns.length
				, fragments = self.create_list_of_fragments(numberOfColumns)
				;

			elements.forEach(function append_to_next_fragment(element) {
				var columnIndex = self.next_element_column_index(grid, fragments);
				fragments[columnIndex].appendChild(element);
			});

			Array.prototype.forEach.call(columns, function insert_column(column, index) {
				column.appendChild(fragments[index]);
			});
		};


		self.prepend_elements = function prepend_elements(grid, elements) {
			// adds a list of elements to the start of a grid

			var columns = grid.children
				, numberOfColumns = columns.length
				, fragments = self.create_list_of_fragments(numberOfColumns)
				, columnIndex = numberOfColumns - 1
				;

			elements.forEach(function append_to_next_fragment(element) {
				var fragment = fragments[columnIndex];
				fragment.insertBefore(element, fragment.firstChild);
				if (columnIndex === 0) {
					columnIndex = numberOfColumns - 1;
				} else {
					columnIndex--;
				}
			});

			Array.prototype.forEach.call(columns, function insert_column(column, index) {
				column.insertBefore(fragments[index], column.firstChild);
			});

			// populates a fragment with n columns till the right
			var fragment = document.createDocumentFragment()
				, numberOfColumnsToExtract = elements.length % numberOfColumns
				;

			while (numberOfColumnsToExtract-- !== 0) {
				fragment.appendChild(grid.lastChild);
			}

			// adds the fragment to the left
			grid.insertBefore(fragment, grid.firstChild);
		};


		self.register_grid = function register_grid (grid) {
			if (global.getComputedStyle(grid).display === "none") {
				return;
			}

			// retrieve the list of items from the grid itself
			var range = document.createRange();
			range.selectNodeContents(grid);

			var items = document.createElement("div");
			items.appendChild(range.extractContents());


			add_to_dataset(items, 'columns', 0);
			self.add_columns(grid, items);
			grids.push(grid);
		};


		salvattoreStart = function init() {
			// adds required CSS rule to hide 'content' based
			// configuration.

			var css = document.createElement("style");
			css.innerHTML = "[data-columns]::before{visibility:hidden;position:absolute;font-size:1px;}";
			document.head.appendChild(css);

			// scans all the grids in the document and generates
			// columns from their configuration.

			var gridElements = document.querySelectorAll("[data-columns]");
			Array.prototype.forEach.call(gridElements, self.register_grid);
			self.scan_media_queries();
		};

		//No auto init as we call it ourselves - wpGrade
		//self.init();

		return {
			append_elements: self.append_elements,
			prepend_elements: self.prepend_elements,
			register_grid: self.register_grid
		};

	})(window, window.document);

	return salvattore;
}));

/* --- $SHORTCODES - TABS --- */

/* ========================================================
 * bootstrap-tab.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#tabs
 * ========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function(a){var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f,g;d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;e=c.find(".active:last a")[0],g=a.Event("show",{relatedTarget:e}),b.trigger(g);if(g.isDefaultPrevented())return;f=a(d),this.activate(b.parent("li"),c),this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g(),e.removeClass("in")}};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");e||d.data("tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(window.jQuery)

/* ====== SHARED VARS ====== */

var phone, touch, ltie9, lteie9, wh, ww, dh, ar, fonts, ieMobile;

var ua = navigator.userAgent;
var winLoc = window.location.toString();

var is_webkit = ua.match(/webkit/i);
var is_firefox = ua.match(/gecko/i);
var is_newer_ie = ua.match(/msie (9|([1-9][0-9]))/i);
var is_older_ie = ua.match(/msie/i) && !is_newer_ie;
var is_ancient_ie = ua.match(/msie 6/i);
var is_mobile = ua.match(/mobile/i);
var is_OSX = (ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false);

var nua = navigator.userAgent;
var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));

var useTransform = true;
var use2DTransform = (ua.match(/msie 9/i) || winLoc.match(/transform\=2d/i));

var $html = jQuery('html');
var $body = jQuery('body');
var $gmap = jQuery('#gmap');

// To be used like this

// if (!use2DTransform) {
//     transformParam = 'translate3d(...)';
// } else {
//     transformParam = 'translateY(...)';
// }
var transform;

// setting up transform prefixes
var prefixes = {
	webkit: 'webkitTransform',
	firefox: 'MozTransform',
	ie: 'msTransform',
	w3c: 'transform'
};

if (useTransform) {
	if (is_webkit) {
		transform = prefixes.webkit;
	} else if (is_firefox) {
		transform = prefixes.firefox;
	} else if (is_newer_ie) {
		transform = prefixes.ie;
	}
}

/* --- To enable verbose debug add to Theme Options > Custom Code footer -> globalDebug=true; --- */
var globalDebug = false,
	timestamp;

(function($,window,undefined) {

	/* --- DETECT VIEWPORT SIZE --- */

	function browserSize(){
		wh = $(window).height();
		ww = $(window).width();
		dh = $(document).height();
		ar = ww/wh;
	}


	/* --- DETECT PLATFORM --- */

	function platformDetect(){
		$.support.touch = 'ontouchend' in document;
		var navUA = navigator.userAgent.toLowerCase(),
			navPlat = navigator.platform.toLowerCase();	


		var isiPhone = navPlat.indexOf("iphone"),
			isiPod = navPlat.indexOf("ipod"),
			isAndroidPhone = navPlat.indexOf("android"),
			safari = (navUA.indexOf('safari') != -1 && navUA.indexOf('chrome') == -1) ? true : false,
			svgSupport = (window.SVGAngle) ? true : false,
			svgSupportAlt = (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) ? true : false,
			ff3x = (/gecko/i.test(navUA) && /rv:1.9/i.test(navUA)) ? true : false;

		phone = (isiPhone > -1 || isiPod > -1 || isAndroidPhone > -1) ? true : false;
		touch = $.support.touch ? true : false;
		ltie9 = $.support.leadingWhitespace ? false : true;
		lteie9 = typeof window.atob === 'undefined' ? true : false;

		ieMobile = navigator.userAgent.match(/Windows Phone/i) ? true : false;

		if (touch || ieMobile) {
			$html.addClass('touch');
		}

		if (safari) $body.addClass('safari');
		if (phone) $body.addClass('phone');

	}

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


// /* ====== HELPER FUNCTIONS ====== */

//similar to PHP's empty function
function empty(data)
{
    if(typeof(data) == 'number' || typeof(data) == 'boolean')
    {
        return false;
    }
    if(typeof(data) == 'undefined' || data === null)
    {
        return true;
    }
    if(typeof(data.length) != 'undefined')
    {
        return data.length === 0;
    }
    var count = 0;
    for(var i in data)
    {
        // if(data.hasOwnProperty(i))
        // 
        // This doesn't work in ie8/ie9 due the fact that hasOwnProperty works only on native objects.
        // http://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
        // 
        // for hosts objects we do this
        if(Object.prototype.hasOwnProperty.call(data,i))
        {
            count ++;
        }
    }
    return count === 0;
}

/* --- Set Query Parameter--- */
function setQueryParameter(uri, key, value) {
	var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
	separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
		return uri + separator + key + "=" + value;
	}
}
// AddThis Init
/* --- Load AddThis Async --- */
function loadAddThisScript() {
	if (window.addthis) {
		if (globalDebug) {
			console.log("AddThis Load Script");
		}
		// Listen for the ready event
		addthis.addEventListener('addthis.ready', addthisReady);
		addthis.init();
	}
}

/* --- AddThis On Ready - The API is fully loaded --- */
//only fire this the first time we load the AddThis API - even when using ajax
function addthisReady() {
	if (globalDebug) {
		console.log("AddThis Ready");
	}
	addThisInit();
}

/* --- AddThis Init --- */
function addThisInit() {
	if (window.addthis) {
		if (globalDebug) {
			console.log("AddThis Toolbox INIT");
		}

		addthis.toolbox('.addthis_toolbox');
	}
}
/* --- GMAP Init --- */

function gmapInit() {
	if ( $gmap.length ) {

		var gmap_link, gmap_variables, gmap_zoom, gmap_style;
		gmap_link =  $gmap.data('url');
		gmap_style = typeof  $gmap.data('customstyle') !== "undefined" ? "style1" : google.maps.MapTypeId.ROADMAP;

		// Overwrite Math.log to accept a second optional parameter as base for logarhitm
		Math.log = (function() {
			var log = Math.log;
			return function(n, base) {
				return log(n)/(base ? log(base) : 1);
			};
		})();

		function get_url_parameter(needed_param, gmap_url) {
			var sURLVariables = (gmap_url.split('?'))[1];
			if (typeof sURLVariables === "undefined") {
				return sURLVariables;
			}
			sURLVariables = sURLVariables.split('&');
			for (var i = 0; i < sURLVariables.length; i++)  {
				var sParameterName = sURLVariables[i].split('=');
				if (sParameterName[0] == needed_param) {
					return sParameterName[1];
				}
			}
		}

		var gmap_coordinates = [],
			gmap_zoom;

		if (gmap_link) {
			//Parse the URL and load variables (ll = latitude/longitude; z = zoom)
			var gmap_variables = get_url_parameter('ll', gmap_link);
			if (typeof gmap_variables === "undefined") {
				gmap_variables = get_url_parameter('sll', gmap_link);
			}
			// if gmap_variables is still undefined that means the url was pasted from the new version of google maps
			if (typeof gmap_variables === "undefined") {

				if(gmap_link.split('!3d') != gmap_link){
					//new google maps old link type

					var split, lt, ln, dist, z;
					split = gmap_link.split('!3d');
					lt = split[1];
					split = split[0].split('!2d');
					ln = split[1];
					split = split[0].split('!1d');
					dist = split[1];
					gmap_zoom = 21 - Math.round(Math.log(Math.round(dist/218), 2));
					gmap_coordinates = [lt, ln];

				} else {
					//new google maps new link type

					var gmap_link_l;

					gmap_link_l = gmap_link.split('@')[1];
					gmap_link_l = gmap_link_l.split('z/')[0];

					gmap_link_l = gmap_link_l.split(',');

					var latitude = gmap_link_l[0];
					var longitude = gmap_link_l[1];
					var zoom = gmap_link_l[2];

					if(zoom.indexOf('z') >= 0)
						zoom = zoom.substring(0, zoom.length-1);

					gmap_coordinates[0] = latitude;
					gmap_coordinates[1] = longitude;
					gmap_zoom = zoom;
				}



			} else {
				gmap_zoom = get_url_parameter('z', gmap_link);
				if (typeof gmap_zoom === "undefined") {
					gmap_zoom = 10;
				}
				gmap_coordinates = gmap_variables.split(',');
			}
		}

		$("#gmap").gmap3({
			map:{
				options:{
					center: new google.maps.LatLng(gmap_coordinates[0], gmap_coordinates[1]),
					zoom: parseInt(gmap_zoom),
					mapTypeId: gmap_style,
					mapTypeControlOptions: {mapTypeIds: []},
					scrollwheel: false
				}
			},
			overlay:{
				latLng: new google.maps.LatLng(gmap_coordinates[0], gmap_coordinates[1]),
				options:{
					content:  '<div class="pin_ring pin_ring--outer">' +
						'<div class="pin_ring pin_ring--inner"></div>' +
						'</div>'
				}
			},
			styledmaptype:{
				id: "style1",
				options:{
					name: "Style 1"
				},
				styles: [
					{
						stylers: [
							{ saturation: -100 }
						]
					}
				]
			}
		});

		$(window).on('debouncedresize', function() {
			 $gmap.gmap3('get').setCenter(new google.maps.LatLng( gmap_coordinates[0], gmap_coordinates[1]));
		});
	}
}

// Check if it is suitable to make the Gmap Touchable
function gmapTouchable() {
	if ( $gmap.length ) {
		if ( Modernizr.touchevents && ( $gmap.outerHeight() >= ( wh - $('header').outerHeight() - 100 ) ) ) {
			$gmap.addClass('is--untouchable');
		} else {
			$gmap.removeClass('is--untouchable');
		}
	}
}

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



})(jQuery, window);
