jQuery(document).ready(function(){
	var object_incrementer = 0;
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
		$('#url0').val('blah');
		$('#x0').val(10);
		$('#y0').val(10);
		$('#depth0').val(10);
		for (var increment = 1; increment < 6; increment++){
			//$('#display_objects').append(create_display_object_form(increment));
			$('#more').click();
			$('#url'+increment).val('blah');
			$('#x'+increment).val((increment+1)  * 10);
			$('#y'+increment).val((increment+1) * 10);
			$('#depth'+increment).val((increment+1)  * 10);
		}	
	});
	
	// CALLED ON SUBMIT
	$('#3dify').click(function() {
		// NEEDS TO INCREMENT THROUGH THE FORM GRABBING THE VALUES AS IT GOES
		// MIGHT HAVE TO NOT BE A RESET AS THAT KILLS THE PAGE AND PARSING ATTRIBUTES SEEMS LIKE A PAIN
		for(var i=0; i<=object_incrementer;i++){
			var url = $('#url'+ i).val();
			var x = $('#x'+ i).val();
			var y = $('#y'+ i).val();
			var depth = $('#depth'+ i).val();
			display_objects[i] = new display_object(x, y, depth, 200);
			//$('#status').html(new_display_object.getX() +'<br />');
			//display_objects.push(new_display_object);
		//	display_objects.push(new display_object(
		//		$('#x' + i).val(),
		//		$('#i' + i).val(),
		//		$('#depth' + i).val(),
		//		200));
			//init();
			//$('#status').append($('#url'+ i).val() + '<br />');
		}
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
		'<label for="depth'+ object_id +'">depth: </label>'+
			'<input type="text" maxlength="3" id="depth'+ object_id +'" name="depth'+ object_id +'" class="text" style="width: 40px;" />'+
	'</div>';
	return display_object_form_html;
}

function display_object(x, y, depth, color) {
	//this.name = name;
	this.x = parseFloat(x);
	this.y = parseFloat(y);
	this.depth = parseFloat(depth);
	this.color = color;
	
	this.getX = function() {
		return this.x;
	}
	
	this.getY = function() {
		return this.y;
	}
	
	this.getDepth = function() {
		return this.depth;
	}
	
	this.report = function() {
		return this.x + ":" + this.y + " " + this.depth + "<br />";
	}
}
	
function init() {
	move(0,0);
}

var display_objects = [ new display_object(50,130,10,40),
 						new display_object(300,100,50,40),
						new display_object(200,50,100,40)];

function move(x,y) {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var oppX = -x;
	var oppY = -y;
	
	ctx.clearRect(0,0,600,200);
	$('#status').html('');
	$('#status').append("<strong>" + oppX +', '+ oppY + '</strong><br />');
	
	for(var i=0; i<display_objects.length;i++){
		var x = display_objects[i].x;
		var y = display_objects[i].y;
		var depth = display_objects[i].depth;
		
		$('#status').append(i +": "+ (x + (oppX / depth)).toFixed(2) + " " + (y + (oppY / depth)).toFixed(2) + "<br />");
		// TODO I THINK THE PROBLEM MIGHT BE THAT oppX AND oppY ARE HOLDING VALUES AND CREATING THIS IN A WEIRD PLACE
	
		ctx.fillStyle = "rgb(200,0,0)";
		ctx.fillRect(x + (oppX / depth),y + (oppY / depth),10,10);  // SOMETHING FREAKS OUT WHEN - IS CHANGED TO +
		//ctx.fillRect (x + (oppX / display_objects[i].getDepth()), y + (oppY / depth), 10, 10);	// DOESNT SEEM TO WORK FOR DYNAMIC OBJECTS WTF?
	}
}