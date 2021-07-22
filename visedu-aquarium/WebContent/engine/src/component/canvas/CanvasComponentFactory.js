function CanvasComponentFactory() {}

CanvasComponentFactory.prototype.getRotateComponent = function() {
	return new CanvasRotateComponent().initialize(0);
}

CanvasComponentFactory.prototype.getScaleComponent = function() {
	return new CanvasScaleComponent().initialize(1, 1);
}

CanvasComponentFactory.prototype.getTranslateComponent = function() {
	return new CanvasTranslateComponent().initialize(0, 0);
}