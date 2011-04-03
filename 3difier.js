jQuery(document).ready(function(){
	var object_incrementer = 0;
	var canvas_width = 800;
	var canvase_height = 400;
	init();
	
	$('#display_objects_form').append(create_display_object_form(0));
	
	$("canvas").mousemove(function(e){
		var mouseX = e.pageX - this.offsetLeft - 300;
		var mouseY = e.pageY - this.offsetTop - 100;
	     //$('#status').html(mouseX +', '+ mouseY); // debugging
		move(mouseX, mouseY);
	});

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
		$('#depth0').val(10);
		for (var increment = 1; increment < 6; increment++){
			//$('#display_objects').append(create_display_object_form(increment));
			$('#more').click();
			$('#url'+increment).val('http://cvcl.mit.edu/hybrid/cat2.jpg');
			$('#x'+increment).val((increment+1)  * 10);
			$('#y'+increment).val((increment+1) * 10);
			$('#depth'+increment).val((increment+1)  * 10);
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
			var height = $('#height').val();
			var depth = $('#depth'+ i).val();
			display_objects[i] = new display_object(x, y, depth, url);
		}
		display_objects = quick_sort(display_objects);
		init();
	});
	
	// DEBUG
	// REPORTS ALL THE DISPLAY_OBJECTS IN THE ARRAY
	$('#debug').click(function() {
		$('#status').html('<h2>Debug</h2>' + 'Count: ' + display_objects.length + "<br />");
		for(var i=0; i<display_objects.length;i++){
			$('#status').append("<stong>"+i+"</strong>" + ": " + display_objects[i].report());
		}
	});
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
	this.x = parseFloat(x);
	this.y = parseFloat(y);
	if(width) {
		this.width = width;
	}
	if(height) {
		this.height = height;
	}
	this.depth = parseFloat(depth);
	this.url = url;
	
	this.report = function() {
		return this.x + ":" + this.y + " " + this.depth + "<br />";
	}
}

var display_objects = [ new display_object(50,130,10,'http://cvcl.mit.edu/hybrid/cat2.jpg',40,40),
 						new display_object(300,100,50,'http://cvcl.mit.edu/hybrid/cat2.jpg',30,30),
						new display_object(200,50,100,'http://cvcl.mit.edu/hybrid/cat2.jpg',20,20)];
	
function init() {
	$('#canvas_holder').html('<canvas id="canvas" width="800" height="400" style="border: 3px solid black;">Image</canvas>');
	move(0,0);
}

function move(x,y) {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var oppX = -x;
	var oppY = -y;
	
	ctx.clearRect(0,0,600,200);
	$('#status').html('');
	$('#status').append("<strong>" + oppX +', '+ oppY + '</strong><br />');
	
	for(var i=0; i<display_objects.length;i++){
		var url = display_objects[i].url;
		var x = display_objects[i].x;
		var y = display_objects[i].y;
		var width = display_objects[i].width;
		var height = display_objects[i].height;
		var depth = display_objects[i].depth;
		
		$('#status').append(i +"["+ url + "]: "+ (x + (oppX / depth)).toFixed(2) + " " + (y + (oppY / depth)).toFixed(2) + "<br />");
		
		var img = new Image();
		img.src = url;
		if(width && height) {
			ctx.drawImage(img, x + (oppX / depth), y + (oppY / depth), width, height);
		} else {
			ctx.drawImage(img, x + (oppX / depth), y + (oppY / depth));
		}
		//ctx.fillRect(x + (oppX / depth),y + (oppY / depth),10,10);  // SOMETHING FREAKS OUT WHEN - IS CHANGED TO +
		//ctx.fillRect (x + (oppX / display_objects[i].getDepth()), y + (oppY / depth), 10, 10);	// DOESNT SEEM TO WORK FOR DYNAMIC OBJECTS WTF?
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