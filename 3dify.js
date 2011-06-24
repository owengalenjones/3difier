(function( $ ) {
	var canvas_element = undefined;
	var chained_this = undefined;
	var debug = undefined;
	var mouseX = 0;
	var mouseY = 0;
	var display_objects = [];
	
	var methods = {
		init : function( width_arg, height_arg ) { 
			chained_this = this;
			if( this.is("canvas") ) {
				canvas_element = this;
			} else {
				width = 900;
				height = 400;
				if( width_arg != undefined ) {
					width = width_arg
				}
				if( height_arg != undefined ) {
					height = height_arg
				}
				this.append( '<canvas id="threedeeified_canvas" width="' + width + '" height="' + height + '"></canvas>' );
				canvas_element = $( "#threedeeified_canvas" );
			}		
			return chained_this;
		},
		add_object : function(x, y, depth, url, width, height) {
			this.url = url;
			var img = new Image();
			img.src = url;
			this.image = img;
			this.x = parseFloat(x);
			this.y = parseFloat(y);
			this.depth = parseFloat(depth);

			if(width) { this.width = parseFloat(width); }
			if(height) { this.height = parseFloat(height); }
			//alert(this.serialize());
			display_objects.push(this);
			return this;
		},
		start : function() {
			$(canvas_element).mousemove(function(e){
				mouseX = e.pageX - this.offsetLeft - (canvas_element.width() / 2);
				mouseY = -(e.pageY - this.offsetTop - (canvas_element.height() / 2));
				if(debug != undefined) { $.fn.threedeeify('debug'); }
			});
			

			
			$.each( display_objects, function(index, display_object ) {
				var canvas = canvas_element.get(0);
				var ctx = canvas.getContext('2d');
				
				var img = new Image();
				img.src = display_object.url;
				img.onload = function() {
					ctx.drawImage( img, display_object.x, display_object.y );
				}
			});
		},
		debug : function() {
			if(debug == undefined) {
				canvas_element.parent().append( '<p id="threedeeified_debug"></p>' );
				debug = $('#threedeeified_debug');
			}
			debug.text(mouseX + " " + mouseY);
		}
	};
	
	$.fn.threedeeify = function(method) {
		if( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.threedeeify' );
		}
	};
})( jQuery );