This script allows users to dynamically create a Javascript Parallax image a la https://github.com/404 or https://github.com/500.

## REQUIREMENTS ##

1.	jQuery
2.	HTML5 support for canvas elements.

## USE ##

1.	Create a JSON array called objects
>	Each object requires a x and y coordinate, a depth corresponding to how far "into" the image the object is and the url of an image.  Optional parameters include width and height and invert\_x and invert\_y.
2.	Initialize the 3difier: this\_element.threedeeify('init').  this\_element can either be an existing canvas element or if not one will be appended into it.  If appending pass in JSON parameters for width and height or default 900 by 400 will be used.  Optional parameters include invert\_x and invert\_y.
3.	Next add the JSON array of objects: threedeeify('add_object', objects) where objects is the JSON array.
4.	Begin tracking mouse movements: threedeeify('start').
5.	OPTIONAL Debug can help with object x, y coordinate placement: threedeeify('debug').

All of these methods can be chained, ie: $('#test').threedeeify('init',{"width": "900", "height": "400"}).threedeeify('add_object', objects).threedeeify('start').threedeeify('debug');