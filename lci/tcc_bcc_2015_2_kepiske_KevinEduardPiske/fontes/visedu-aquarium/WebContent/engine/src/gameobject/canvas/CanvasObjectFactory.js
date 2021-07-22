function CanvasObjectFactory() {}

CanvasObjectFactory.prototype.getBoxObject = function(points, width, height, fillStyle, fillStroke) {
	return new BoxObject().initialize(points.x, points.y, 0, width, height, fillStyle, fillStroke);
}

CanvasObjectFactory.prototype.getCircleObject = function(points, radius, fillStyle, fillStroke) {
	return new CircleObject().initialize(points.x, points.y, 0, radius, fillStyle, fillStroke);
}

CanvasObjectFactory.prototype.getPolygonObject = function(point, points, faces, fillStyle, fillStroke) {
	return new PolygonObject().initialize(point.x, point.y, 0, points, faces, fillStyle, fillStroke);	
}