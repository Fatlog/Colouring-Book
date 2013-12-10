function Sketcher( canvasID, brushImage ) {
	this.renderFunction = this.updateCanvasByLine;
	this.brush = brushImage;
	this.canvasID = canvasID;
	this.canvas = $("#"+canvasID);
	this.context = this.canvas.get(0).getContext("2d");		
	this.lastMousePoint = {x:0, y:0};
	
	// default brush color
	this.context.strokeStyle = "red";
	
	// default brush width
	this.context.lineWidth = 10;
    
	this.mouseDownEvent = "touchstart";
	this.mouseMoveEvent = "touchmove";
	this.mouseUpEvent = "touchend";
	
	this.canvas.bind( this.mouseDownEvent, this.onCanvasMouseDown() );
}

Sketcher.prototype.setBrushColor = function(color) {
	this.context.strokeStyle = color;
}

Sketcher.prototype.setBrushWidth = function(width) {
	this.context.lineWidth = width;
}

Sketcher.prototype.onCanvasMouseDown = function () {
	var self = this;
	return function(event) {
		self.mouseMoveHandler = self.onCanvasMouseMove()
		self.mouseUpHandler = self.onCanvasMouseUp()

		$(document).bind( self.mouseMoveEvent, self.mouseMoveHandler );
		$(document).bind( self.mouseUpEvent, self.mouseUpHandler );
		
		self.updateMousePosition( event );
		self.renderFunction( event );
	}
}

Sketcher.prototype.onCanvasMouseMove = function () {
	var self = this;
	return function(event) {

		self.renderFunction( event );
     	event.preventDefault();
    	return false;
	}
}

Sketcher.prototype.onCanvasMouseUp = function (event) {
	var self = this;
	return function(event) {

		$(document).unbind( self.mouseMoveEvent, self.mouseMoveHandler );
		$(document).unbind( self.mouseUpEvent, self.mouseUpHandler );
		
		self.mouseMoveHandler = null;
		self.mouseUpHandler = null;
	}
}

Sketcher.prototype.updateMousePosition = function (event) {
 	var target;
	target = event.originalEvent.touches[0]
	
	var offset = this.canvas.offset();
	this.lastMousePoint.x = target.pageX - offset.left;
	this.lastMousePoint.y = target.pageY - offset.top;

}

Sketcher.prototype.updateCanvasByLine = function (event) {

	this.context.beginPath();
	this.context.moveTo( this.lastMousePoint.x, this.lastMousePoint.y );
	this.updateMousePosition( event );
	this.context.lineTo( this.lastMousePoint.x, this.lastMousePoint.y );
	this.context.stroke();
}

Sketcher.prototype.clear = function () {

	var c = this.canvas[0];
	//this.context.clearRect( 0, 0, c.width, c.height );
	c.width = c.width;
}
			