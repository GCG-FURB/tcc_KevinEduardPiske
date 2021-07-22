function ThreeJSObjectFactory() {}

ThreeJSObjectFactory.prototype.getBoxObject = function(point, width, height, fillStyle, fillStroke) {
	return new BoxObject().initialize(point.x, point.y, point.z, width, height, fillStyle, fillStroke);
}

ThreeJSObjectFactory.prototype.getCircleObject = function(point, radius, fillStyle, fillStroke) {
	return new CircleObject().initialize(point.x, point.y, point.z, radius, fillStyle, fillStroke);
}

ThreeJSObjectFactory.prototype.getPolygonObject = function(point, points, faces, fillStyle, fillStroke) {
	return new PolygonObject().initialize(point.x, point.y, point.z, points, faces, fillStyle, fillStroke);	
}
