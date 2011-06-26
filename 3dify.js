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
		add_object : function(objects_list) {
			$.each( objects_list.objects, function(index, display_object) {
				this.url = display_object.url;
				this.image = undefined;
				this.x = parseFloat(display_object.x);
				this.y = parseFloat(display_object.y);
				this.depth = parseFloat(display_object.depth);

				if(width) { this.width = parseFloat(width); }
				if(height) { this.height = parseFloat(height); }
				display_objects.push(this);
			} );
			return canvas_element;
		},
		start : function() {
			display_objects = $.fn.threedeeify('quick_sort', display_objects);
			var canvas = canvas_element.get(0);
			var ctx = canvas.getContext('2d');
			
			$(window).load(function () {
				$.each( display_objects, function(index, display_object ) {
					var img = new Image();
					img.src = display_object.url;
					display_object.image = img;
					ctx.drawImage( img, display_object.x, display_object.y );
				});
			});
			
			$(canvas_element).mousemove(function(e){
				ctx.clearRect(0,0,canvas_element.width(),canvas_element.height());
				
				mouseX = e.pageX - this.offsetLeft - (canvas_element.width() / 2);
				mouseY = -(e.pageY - this.offsetTop - (canvas_element.height() / 2));
				if(debug != undefined) { $.fn.threedeeify('debug'); }
				
				$.each( display_objects, function(index, display_object ) {
					ctx.drawImage( display_object.image, display_object.x - (mouseX / display_object.depth), display_object.y + (mouseY / display_object.depth) );
				});
			});
			return canvas_element;
		},
		debug : function() {
			if(debug == undefined) {
				canvas_element.parent().append( '<p id="threedeeified_debug"></p>' );
				debug = $('#threedeeified_debug');
			}
			debug.text(mouseX + " " + mouseY);
			return canvas_element;
		},
		quick_sort : function(arr) {
		    if (arr.length == 0)
		        return [];

		    var left = new Array();
		    var right = new Array();
		    var pivot = arr[0];

		    for (var i = 1; i < arr.length; i++) {
		        if (arr[i].depth > pivot.depth) {
		           left.push(arr[i]);
		        } else {
		           right.push(arr[i]);
		        }
		    }
		    return $.fn.threedeeify('quick_sort', left).concat(pivot, $.fn.threedeeify('quick_sort', right));
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