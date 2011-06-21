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
			
			display_objects = [ $.fn.threedeeify('add_object', -5,-5,80,'https://github.com/images/modules/404/parallax_bg.jpg'),
								$.fn.threedeeify('add_object', 300,100,20,'https://github.com/images/modules/404/parallax_octocat.png'),
								$.fn.threedeeify('add_object', 310,310,21,'https://github.com/images/modules/404/parallax_octocatshadow.png'),
								$.fn.threedeeify('add_object', 370,150,30,'https://github.com/images/modules/404/parallax_speeder.png'),
								$.fn.threedeeify('add_object', 370,260,31,'https://github.com/images/modules/404/parallax_speedershadow.png'),
								$.fn.threedeeify('add_object', 470,100,50,'https://github.com/images/modules/404/parallax_building_1.png'),
								$.fn.threedeeify('add_object', 700,100,65,'https://github.com/images/modules/404/parallax_building_2.png')];
			return chained_this;
		},
		add_object : function(x, y, depth, url, width, height) {
			this.url = url;
			$.get(url, function(data) {
			  alert('Load was performed.');
			});
			this.image = new Image();
			this.image.src = url;
			this.x = parseFloat(x);
			this.y = parseFloat(y);
			this.depth = parseFloat(depth);

			if(width) { this.width = parseFloat(width); }
			if(height) { this.height = parseFloat(height); }
			this.report = function() {
				return this.x + ":" + this.y + " " + this.depth + "<br />";
			}
			return this;
		},
		start : function() {
			$(canvas_element).mousemove(function(e){
				mouseX = e.pageX - this.offsetLeft - (canvas_element.width() / 2);
				mouseY = -(e.pageY - this.offsetTop - (canvas_element.height() / 2));
				if(debug != undefined) { $.fn.threedeeify('debug'); }
			});
			
			var canvas = canvas_element.get(0);
			var ctx = canvas.getContext('2d');
			//ctx.clearRect(0,0,canvas_element.width(),canvas_element.height());
			
			for(var i=0; i<display_objects.length;i++){
				alert(display_objects[i]);
				var x = display_objects[i].x;
				var y = display_objects[i].y;
				var width = display_objects[i].width;
				var height = display_objects[i].height;
				var depth = display_objects[i].depth;
				ctx.drawImage(display_objects[i].image, x, y);
			}
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