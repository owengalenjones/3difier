var canvas_width = 900;
var canvas_height = 400;

var display_objects = [ new display_object(-5,-5,80,'https://github.com/images/modules/404/parallax_bg.jpg'),
 						new display_object(300,100,20,'https://github.com/images/modules/404/parallax_octocat.png'),
						new display_object(310,310,21,'https://github.com/images/modules/404/parallax_octocatshadow.png'),
						new display_object(370,150,30,'https://github.com/images/modules/404/parallax_speeder.png'),
						new display_object(370,260,31,'https://github.com/images/modules/404/parallax_speedershadow.png'),
						new display_object(470,100,50,'https://github.com/images/modules/404/parallax_building_1.png'),
						new display_object(700,100,65,'https://github.com/images/modules/404/parallax_building_2.png')];
						
$(function(){
	$('#status').hide();
	$('#no_debug').hide();
	display_objects = quick_sort(display_objects);
	var object_incrementer = 0;
	$('#canvas_holder').html('<canvas id="canvas" width="' + canvas_width + '" height="' + canvas_height + '" style="border: 3px solid black;">Image</canvas>');
	
	$('#display_objects_form').append(create_display_object_form(0));
	
	$("canvas").mousemove(function(e){
		var mouseX = e.pageX - this.offsetLeft - 300;
		var mouseY = e.pageY - this.offsetTop - 100;
		move(mouseX, mouseY);
	});
	
	init();
	
	// CALLED WHEN MORE BUTTON IS HIT				
	$('#more').click(function() {
		object_incrementer += 1;
		$('#display_objects_form').append(create_display_object_form(object_incrementer));
	});
	
	// THIS IS JUST FOR FILLING THE IN THE FORM QUICKLY FOR TESTING
	$('#fill').click(function() {
		$('#url0').val('http://cvcl.mit.edu/hybrid/cat2.jpg');
		$('#x0').val(10);
		$('#y0').val(10);
		$('#width0').val(60);
		$('#height0').val(60);
		$('#depth0').val(10);
		for (var increment = 1; increment < 6; increment++){
			//$('#display_objects').append(create_display_object_form(increment));
			$('#more').click();
			$('#url'+increment).val('http://cvcl.mit.edu/hybrid/cat2.jpg');
			$('#x'+increment).val((increment+1)  * 20);
			$('#y'+increment).val((increment+1) * 20);
			$('#width'+increment).val((6 - increment) * 10);
			$('#height'+increment).val((6 - increment) * 10);
			$('#depth'+increment).val((increment+1)  * 20);
		}	
	});
	
	// CALLED ON SUBMIT
	$('#3dify').click(function() {
		// NEEDS TO INCREMENT THROUGH THE FORM GRABBING THE VALUES AS IT GOES
		display_objects = [];
		for(var i=0; i<=object_incrementer;i++){
			var url = $('#url'+ i).val();
			var x = $('#x'+ i).val();
			var y = $('#y'+ i).val();
			var width = $('#width' + i).val();
			var height = $('#height' + i).val();
			var depth = $('#depth'+ i).val();
			display_objects[i] = new display_object(x, y, depth, url, width, height);
			display_objects[i].draw(display_objects[i].url, i);
		}
		display_objects = quick_sort(display_objects);
		$(window).load(function () {
			init();
		});
	});
	
	// DEBUG
	// REPORTS ALL THE DISPLAY_OBJECTS IN THE ARRAY
	$('#debug').click(function() {
		$('#status').show();
		$('#no_debug').show();
		$('#debug').hide();
	});
	$('#no_debug').click(function() {
		$('#status').hide();
		$('#debug').show();
		$('#no_debug').hide();
	})
});

function create_display_object_form(object_id) {
	var display_object_form_html = '<div>'+
	'<label for="url'+ object_id +'">url '+ object_id +': </label>'+
			'<input type="text" name="url'+ object_id +'" id="url'+ object_id +'" class="text" /> '+
		'<label for="x'+ object_id +'">x: </label>'+
			'<input type="text" maxlength="3" id="x'+ object_id +'" name="x'+ object_id +'" class="text" style="width: 40px;" /> '+
		'<label for="y'+ object_id +'">y: </label>'+
			'<input type="text" maxlength="3" id="y'+ object_id +'" name="y'+ object_id +'" class="text" style="width: 40px;" /> '+
		'<label for="width'+ object_id +'">width: </label>'+
			'<input type="text" maxlength="3" id="width'+ object_id +'" name="width'+ object_id +'" class="text" style="width: 40px;" />'+
		'<label for="height'+ object_id +'">height: </label>'+
			'<input type="text" maxlength="3" id="height'+ object_id +'" name="height'+ object_id +'" class="text" style="width: 40px;" />'+
		'<label for="depth'+ object_id +'">depth: </label>'+
			'<input type="text" maxlength="3" id="depth'+ object_id +'" name="depth'+ object_id +'" class="text" style="width: 40px;" />'+
	'</div>';
	return display_object_form_html;
}

function display_object(x, y, depth, url, width, height) {
	//this.name = name;
	this.url = url;
	this.x = parseFloat(x);
	this.y = parseFloat(y);
	this.depth = parseFloat(depth);
	
	this.draw = function(url, id) {
		$("#canvas").after(function() {
			return '<img src="'+url+'" id="display_object_img'+id+'"/>';
		});
		$('#display_object_img'+id).css("visibility", "hidden");
		$('#display_object_img'+id).css("position", "absolute");
	}
	
	if(width) { this.width = parseFloat(width); }
	if(height) { this.height = parseFloat(height); }
	this.report = function() {
		return this.x + ":" + this.y + " " + this.depth + "<br />";
	}
}
	
function init() {
	var canvas = $('canvas').get(0);
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,canvas_width,canvas_height);
	
	for(var i=0; i<display_objects.length;i++){
		display_objects[i].draw(display_objects[i].url, i);
	}
	
	$(window).load(function () {
		for(var i=0; i<display_objects.length;i++){
			var x = display_objects[i].x;
			var y = display_objects[i].y;
			var width = display_objects[i].width;
			var height = display_objects[i].height;
			var depth = display_objects[i].depth;

			if(width && height) {
				ctx.drawImage(($('#display_object_img'+i).get(0)), x, y, width, height);
			} else {
				ctx.drawImage(($('#display_object_img'+i).get(0)), x, y);
			}
		}
	});
}

function move(x,y) {
	var canvas = $('canvas').get(0);
	var ctx = canvas.getContext('2d');
	
	var oppX = -x;
	var oppY = -y;
	
	ctx.clearRect(0,0,canvas_width,canvas_height);
	
	$('#status').html('');
	$('#status').append("<strong>" + oppX +', '+ oppY + '</strong><br />');
	
	for(var i=0; i<display_objects.length;i++){
		var x = display_objects[i].x;
		var y = display_objects[i].y;
		var width = display_objects[i].width;
		var height = display_objects[i].height;
		var depth = display_objects[i].depth;

		if(width && height) {
			ctx.drawImage($('#display_object_img'+i).get(0), x + (oppX / depth), y + (oppY / depth), width, height);
		} else {
			ctx.drawImage($('#display_object_img'+i).get(0), x + (oppX / depth), y + (oppY / depth));
		}
	}
}

function quick_sort(arr)
{
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
    return quick_sort(left).concat(pivot, quick_sort(right));
}